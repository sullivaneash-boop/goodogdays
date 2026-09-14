import { expect, test } from "@playwright/test";
import { resolveSiteOrigin } from "../src/lib/site-origin";
import { flushAnalyticsQueue, trackEvent } from "../src/lib/analytics";

test("canonical origins use the confirmed domain and reject malformed configuration", () => {
  expect(resolveSiteOrigin()).toBe("https://www.goodogdays.com");
  expect(resolveSiteOrigin(" https://www.goodogdays.com/ ")).toBe("https://www.goodogdays.com");
  for (const invalid of ["not a url", "http://example.com", "https://example.com/path", "https://example.com?key=1", "https://user:password@example.com"]) {
    expect(() => resolveSiteOrigin(invalid)).toThrow();
  }
});

test("analytics forwards queued and subsequent events to GA exactly once", () => {
  const original = globalThis.window;
  const calls: unknown[][] = [];
  const mock = { dataLayer: [], dispatchEvent: () => true } as unknown as Window & typeof globalThis;
  globalThis.window = mock;
  try {
    trackEvent("inquiry_start", { selected_service: "bigger-day" });
    mock.gtag = (...args) => { calls.push(args); };
    flushAnalyticsQueue();
    trackEvent("inquiry_submit", { selected_service: "bigger-day" });
    flushAnalyticsQueue();
    expect(calls).toEqual([
      ["event", "inquiry_start", { selected_service: "bigger-day" }],
      ["event", "inquiry_submit", { selected_service: "bigger-day" }],
    ]);
  } finally {
    globalThis.window = original;
  }
});

test("every page has the production canonical, shared preview and valid internal links", async ({ page, request }) => {
  const links = new Set<string>();
  for (const path of ["/", "/services", "/privacy", "/thank-you"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical?.replace(/\/$/, "")).toBe(`https://www.goodogdays.com${path === "/" ? "" : path}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://www.goodogdays.com/uploads/social/gdd-banner.png");
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", "https://www.goodogdays.com/uploads/social/gdd-banner.png");
    if (path === "/thank-you") await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const json = await page.locator('script[type="application/ld+json"]').allTextContents();
    json.forEach(text => expect(() => JSON.parse(text)).not.toThrow());
    if (path === "/services") {
      const graph = JSON.parse(json[0])["@graph"];
      expect(graph).toHaveLength(7);
      expect(graph.map((service: { offers: { price: string }[] }) => service.offers[0].price)).toEqual(["30", "65", "95", "175", "175", "295", "495"]);
      expect(graph.slice(0, 2).map((service: { offers: { price: string }[] }) => service.offers.slice(1).map(offer => offer.price))).toEqual([["85", "135"], ["180", "290"]]);
    }
    const hrefs = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => (node as HTMLAnchorElement).getAttribute("href")!));
    for (const href of hrefs) {
      if (href.startsWith("/") || href.startsWith("#")) links.add(new URL(href, `https://www.goodogdays.com${path}`).pathname + new URL(href, `https://www.goodogdays.com${path}`).hash);
    }
  }
  for (const path of new Set([...links].map(link => link.split("#")[0]))) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
    const html = await response.text();
    for (const link of [...links].filter(link => link.startsWith(`${path}#`))) {
      expect(html, link).toContain(`id="${link.split("#")[1]}"`);
    }
  }
  const legacy = await request.get("/services?service=not-sure", { headers: { host: "goodogdays.vercel.app" }, maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe("https://www.goodogdays.com/services?service=not-sure");
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("vercel.app");
  expect((await request.get("/a-page-that-does-not-exist")).status()).toBe(404);
  await page.goto("/a-page-that-does-not-exist");
  await expect(page.getByRole("heading", { name: "Let’s get you back." })).toBeVisible();
});

test("tablet navigation is available and service engagement is measurable", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  await page.getByLabel("Open navigation").click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Services & Pricing" }).click();
  await page.locator('#away .pricing-category-header').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.dataLayer?.filter(e => e.event === "service_view").map(e => e.service_family))).toContain("away");
  await page.getByRole("link", { name: "Get Started", exact: true }).first().click();
  await expect.poll(() => page.evaluate(() => window.dataLayer?.filter(e => e.event === "service_cta_click").length ?? 0)).toBeGreaterThan(0);
});

test("mobile inquiry has no premature errors, preserves answers, and submits", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let payload: Record<string, unknown> | undefined;
  await page.route("https://formspree.io/f/xbgjqyyz", async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/?service=two-hour-adventure#inquiry");
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByLabel("Dog’s name", { exact: true }).fill("Q");
  await page.getByLabel("Age or best guess").fill("2 years");
  await page.getByRole("button", { name: /Continue/ }).click();
  await expect(page.locator('#inquiry [role="alert"]')).toHaveCount(0);
  expect(payload).toBeUndefined();
  await page.getByLabel("When or how often do you need help?").selectOption("Not sure yet — help me plan");
  await page.getByLabel("Your name", { exact: true }).fill("Test Owner");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByLabel("Mobile number", { exact: true }).fill("7705550123");
  await page.getByLabel("ZIP code", { exact: true }).fill("30040");
  await page.getByRole("button", { name: /Back/ }).click();
  await expect(page.getByLabel("Dog’s name", { exact: true })).toHaveValue("Q");
  await page.getByRole("button", { name: /Continue/ }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("Test Owner");
  await page.getByRole("button", { name: "Send Request" }).click();
  await expect(page.getByRole("heading", { name: "Good things ahead for Q." })).toBeVisible();
  expect(payload).toMatchObject({ petName: "Q", timing: "Not sure yet — help me plan", requestedService: "two-hour-adventure" });
});

test("hero video is only fetched after an explicit play action", async ({ page }) => {
  const videos: string[] = [];
  page.on("request", request => { if (request.url().endsWith(".mp4")) videos.push(request.url()); });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Play background video" })).toBeVisible();
  await expect(page.locator("video")).toHaveCount(0);
  expect(videos).toHaveLength(0);
  await page.getByRole("button", { name: "Play background video" }).click();
  await expect(page.locator("video")).toHaveCount(1);
  await expect.poll(() => videos.length).toBeGreaterThan(0);
});
