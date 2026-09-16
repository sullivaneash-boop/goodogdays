import { expect, test } from "@playwright/test";

// Load the real Google tag, but intercept collection so automated tests do not
// become business traffic. This verifies the actual tag's outbound payloads.
test("production GA tag loads once and sends business events without form data", async ({ page }) => {
  const hits: string[] = [];
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.route(/https:\/\/[^/]*google-analytics\.com\/.*collect/, async route => {
    hits.push(route.request().url() + "&" + (route.request().postData() ?? ""));
    await route.fulfill({ status: 204 });
  });
  await page.addInitScript(() => document.addEventListener("click", event => {
    if ((event.target as Element)?.closest('a[href^="sms:"], a[data-track-event="google_profile_click"]')) event.preventDefault();
  }));
  await page.goto("/");
  await expect(page.locator('script[src*="googletagmanager.com/gtag/js?id=G-2FFYPC1K8G"]')).toHaveCount(1);
  await expect.poll(() => hits.some(hit => hit.includes("en=page_view"))).toBe(true);
  const commands = () => page.evaluate(() => (window.dataLayer ?? []).filter(item => item[0] === "config" && item[1] === "G-2FFYPC1K8G").length);
  expect(await commands()).toBe(1);
  await page.locator('footer a[data-contact-number]').click();
  await page.locator('footer a[data-track-event="google_profile_click"]').click();
  await page.locator('footer a[href="/services"]').click();
  await expect(page).toHaveURL(/\/services$/);
  await page.locator('#good-dog-session a[data-track-event="service_cta_click"]').click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByLabel("Dog’s name", { exact: true }).fill("Analytics Test Dog");
  await page.getByLabel("Age or best guess").fill("3 years");
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByLabel("When or how often do you need help?").selectOption("Not sure yet — help me plan");
  await page.getByLabel("Your name", { exact: true }).fill("Analytics Test Owner");
  await page.getByLabel("Email", { exact: true }).fill("analytics-test@example.com");
  await page.getByLabel("Mobile number", { exact: true }).fill("7705550123");
  await page.getByLabel("ZIP code", { exact: true }).fill("30040");
  let succeed = false;
  await page.route("https://formspree.io/f/xbgjqyyz", route => route.fulfill({ status: succeed ? 200 : 500, contentType: "application/json", body: JSON.stringify({ ok: succeed }) }));
  await page.getByRole("button", { name: "Send Request" }).click();
  await expect(page.locator('#inquiry [role="alert"]')).toBeVisible();
  expect(await page.evaluate(() => window.dataLayer?.filter(e => e.event === "intake_submit").length)).toBe(0);
  succeed = true;
  // The deliberate 500 above is expected; capture only errors from here onward.
  const expectedErrors = errors.filter(error => error.includes("500"));
  await page.getByRole("button", { name: "Send Request" }).click();
  await expect(page.getByRole("heading", { name: "Good things ahead for Analytics Test Dog." })).toBeVisible();
  const expected = ["get_started_click", "text_sully_click", "phone_click", "intake_start", "intake_submit", "google_profile_click", "service_interest"];
  for (const event of expected) {
    await expect.poll(() => hits.some(hit => hit.includes(`en=${event}`)), { timeout: 15000 }).toBe(true);
  }
  const events = await page.evaluate(() => (window.dataLayer ?? []).filter(e => typeof e.event === "string"));
  expect(events.filter(e => e.event === "intake_submit")).toHaveLength(1);
  expect(events.filter(e => e.event === "intake_start")).toHaveLength(1);
  expect(events.find(e => e.event === "service_interest")).toMatchObject({ service_name: "Good Dog Session" });
  expect(await commands()).toBe(1);
  await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(1);
  const sent = JSON.stringify(hits);
  for (const privateValue of ["Analytics Test Dog", "Analytics Test Owner", "analytics-test@example.com", "7705550123"]) {
    expect(decodeURIComponent(sent)).not.toContain(privateValue);
  }
  expect(errors.filter(error => !expectedErrors.includes(error))).toEqual([]);
});
