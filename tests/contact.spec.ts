import { expect, test, devices } from "@playwright/test";

const defaultMessage = "Hey Sully! I found Good Dog Days through your website and I'm interested in getting some help with my dog. Their name is ___ and I'm located in ___.";

for (const device of ["iPhone 13", "Pixel 7"]) {
  test(`${device}: SMS recipient, message, tracking and mobile layout`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ ...devices[device], baseURL });
    const page = await context.newPage();
    // Observe clicks without launching an external app or sending a message.
    await page.addInitScript(() => document.addEventListener("click", event => {
      if ((event.target as Element)?.closest('a[href^="sms:"]')) event.preventDefault();
    }));
    await page.goto("/");
    const sticky = page.locator('.mobile-cta a[data-track-event="sms_click"]');
    await expect(sticky).toBeVisible();
    await sticky.click();
    const href = await sticky.getAttribute("href");
    expect(href).toMatch(new RegExp(`^sms:\\+17656218980${device === "iPhone 13" ? "&" : "\\?"}body=`));
    expect(decodeURIComponent(href!.split("body=")[1])).toBe(defaultMessage);
    await expect.poll(() => page.evaluate(() => window.dataLayer?.filter(e => e.event === "sms_click").length)).toBe(1);
    await page.locator('#inquiry').scrollIntoViewIfNeeded();
    await expect(page.locator('.mobile-cta')).toHaveCount(0);
    await page.goto("/services");
    for (const [id, phrase] of [["neighborhood-walk", "a Neighborhood Walk"], ["good-dog-session", "a Good Dog Session"], ["routine-care", "Pet Sitting Visits"], ["two-hour-adventure", "a Good Dog Adventure"]]) {
      const link = page.locator(`#${id} a[data-track-event="sms_click"]`);
      await link.click();
      const message = decodeURIComponent((await link.getAttribute("href"))!.split("body=")[1]);
      expect(message).toContain(`I'm interested in ${phrase}`);
      expect(message).toContain("Their name is ___ and I'm located in ___.");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  });
}

test("business identity, desktop contact and conversion events", async ({ page }) => {
  await page.goto("/");
  const schema = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n => JSON.parse(n.textContent!)));
  const business = schema.find(s => s["@type"] === "Organization");
  expect(business).toMatchObject({ name: "Good Dog Days", telephone: "+17656218980", url: "https://www.goodogdays.com/", contactPoint: { telephone: "+17656218980" } });
  expect(business.logo).toMatch(/^https:\/\/www.goodogdays.com\//);
  expect(business.areaServed.name).toContain("Forsyth County");
  expect(business.sameAs[0]).toContain("0x636515dd5223fc57");
  expect(business).not.toHaveProperty("address");
  await page.evaluate(() => document.addEventListener("click", event => {
    if ((event.target as Element)?.closest('a[href^="sms:"], a[data-track-event="google_profile_click"]')) event.preventDefault();
  }));
  await page.locator('footer a[data-contact-number]').click();
  await expect(page.locator('footer a[data-contact-number]')).toHaveText("765-621-8980");
  await page.locator('footer a[data-track-event="google_profile_click"]').click();
  await page.locator('footer a[href="/#inquiry"]').click();
  const events = await page.evaluate(() => window.dataLayer?.map(e => e.event));
  expect(events).toEqual(expect.arrayContaining(["sms_click", "phone_click", "google_profile_click", "get_started_click", "service_cta_click"]));
});
