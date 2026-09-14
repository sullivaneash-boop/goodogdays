import { expect, test } from "@playwright/test";

const journeys = [
  ["neighborhood-walk", "Get Started", "Walking + Enrichment"],
  ["good-dog-session", "Get Started", "Walking + Enrichment"],
  ["routine-care", "Check Sitting Availability", "In-Home Pet Sitting"],
  ["in-home-stay", "Check Sitting Availability", "In-Home Pet Sitting"],
  ["two-hour-adventure", "Request an Adventure", "Good Dog Adventures"],
  ["half-day-adventure", "Request an Adventure", "Good Dog Adventures"],
  ["ultimate-good-dog-day", "Request an Adventure", "Good Dog Adventures"],
];

for (const [id, label, category] of journeys) {
  test(`${id} reaches the shared intake with the right category`, async ({ page }) => {
    await page.goto("/services");
    await page.locator(`#${id}`).getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`service=${id}#inquiry`));
    await expect(page.getByRole("radio", { name: new RegExp(category.replace("+", "\\+")) })).toBeChecked();
    await expect(page.getByRole("radio")).toHaveCount(4);
  });
}

test("mobile family anchors, disclosure, and menu work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/services");
  for (const [id, threeDay, fiveDay] of [["neighborhood-walk", "85", "135"], ["good-dog-session", "180", "290"]]) {
    const service = page.locator(`#${id}`);
    await service.locator("summary").click();
    await expect(service.getByText(`3-Day Weekly Plan: $${threeDay}/week (3 visits)`)).toBeVisible();
    await expect(service.getByText(`5-Day Weekly Plan: $${fiveDay}/week (5 visits)`)).toBeVisible();
  }
  await page.locator('.pricing-doors a[href="#bigger-days"]').click();
  await expect(page).toHaveURL(/#bigger-days$/);
  await expect(page.getByRole("heading", { name: "Good Dog Adventures", exact: true })).toBeInViewport();
  const fullDay = page.locator("#ultimate-good-dog-day");
  await fullDay.locator("summary").click();
  await expect(fullDay.getByText("Second dog from the same household: +$125")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByLabel("Open navigation").click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Get Started" }).click();
  await expect(page.locator(".mobile-nav")).not.toHaveAttribute("open");
  await expect(page.getByRole("radio", { name: /Not Sure/ })).toBeChecked();
});

test("Adventure inquiry retains duration and permits retry after a server failure", async ({ page }) => {
  let attempts = 0;
  let payload: Record<string, unknown> = {};
  await page.route("https://formspree.io/f/xbgjqyyz", async route => {
    payload = route.request().postDataJSON();
    attempts++;
    await route.fulfill({ status: attempts === 1 ? 500 : 200, contentType: "application/json", body: JSON.stringify({ ok: attempts > 1 }) });
  });
  await page.goto("/?service=half-day-adventure#inquiry");
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByLabel("Dog’s name").fill("Rufus");
  await page.getByLabel("Age or best guess").fill("4 years");
  // The optional personality checklist should not block a qualified inquiry.
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByLabel("When or how often do you need help?").selectOption("A one-time outing or Adventure");
  await page.getByLabel("Dates or schedule details (optional)").fill("Next Saturday");
  await page.getByLabel("Your name").fill("Test Owner");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Mobile number").fill("7705550123");
  await page.getByLabel("ZIP code").fill("30040");
  await page.getByRole("button", { name: "Send Request" }).click();
  await expect(page.locator("#inquiry").getByRole("alert")).toContainText("didn’t make it through");
  await page.getByRole("button", { name: "Send Request" }).click();
  await expect(page.getByRole("heading", { name: "Good things ahead for Rufus." })).toBeVisible();
  expect(payload).toMatchObject({ serviceNeed: "bigger-day", requestedService: "half-day-adventure", personality: [], timing: "A one-time outing or Adventure — Next Saturday" });
});
