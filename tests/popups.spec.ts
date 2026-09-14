import { expect, test, type Locator } from "@playwright/test";

async function contrast(locator: Locator) {
  return locator.evaluate(el => {
    const style = getComputedStyle(el);
    const luminance = (color: string) => {
      const rgb = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => {
        const channel = value / 255;
        return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
      });
      return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
    };
    const a = luminance(style.color);
    const b = luminance(style.backgroundColor);
    return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  });
}

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 568 }]) {
  test(`popup styling and callback states at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/services");
    await page.evaluate(() => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * .65, behavior: "instant" }));
    const offer = page.getByLabel("Help finding the right service");
    await expect(offer).toBeVisible();
    await expect(offer.getByRole("heading")).toHaveCSS("font-size", "24px");
    const cta = offer.getByRole("link", { name: /Get Started/ });
    expect(await contrast(cta)).toBeGreaterThanOrEqual(4.5);
    await cta.hover();
    expect(await contrast(cta)).toBeGreaterThanOrEqual(4.5);
    expect(await offer.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.screenshot({ path: `/tmp/gdd-popups/offer-${viewport.width}.png` });
    await offer.getByRole("button", { name: "Dismiss offer" }).click();
    // Exit intent is desktop-pointer-only; narrow widths also exercise its layout
    // when a desktop browser is resized or zoomed.
    await page.waitForTimeout(8100);
    await page.mouse.move(150, 400);
    await page.mouse.move(150, 1);
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading")).toHaveCSS("font-size", viewport.width >= 640 ? "32px" : "30px");
    expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    // Visibility begins before the entrance animation settles; measure its final bounds.
    await expect(async () => {
      const box = await dialog.boundingBox();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
    }).toPass();
    const submit = dialog.getByRole("button", { name: "Text me about availability" });
    expect(await contrast(submit)).toBeGreaterThanOrEqual(4.5);
    await submit.click();
    await expect(dialog.getByRole("alert")).toContainText("valid 10-digit");
    await page.screenshot({ path: `/tmp/gdd-popups/modal-${viewport.width}.png` });
    let attempts = 0;
    await page.route("https://formspree.io/f/xbgjqyyz", async route => {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 400));
      await route.fulfill({ status: attempts === 1 ? 500 : 200, contentType: "application/json", body: JSON.stringify({ ok: attempts > 1 }) });
    });
    await dialog.getByLabel("Mobile number").fill("7705550199");
    await dialog.getByRole("checkbox").check();
    await submit.click();
    const sending = dialog.getByRole("button", { name: "Sending…" });
    await expect(sending).toBeDisabled();
    expect(await contrast(sending)).toBeGreaterThanOrEqual(4.5);
    await expect(dialog.getByRole("alert")).toContainText("didn’t send");
    await submit.click();
    const done = dialog.getByRole("button", { name: "Done" });
    await expect(done).toBeFocused();
    expect(await contrast(done)).toBeGreaterThanOrEqual(4.5);
    await page.keyboard.press("Tab");
    await expect(dialog.getByRole("button", { name: "Close availability form" })).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(done).toBeFocused();
    await page.screenshot({ path: `/tmp/gdd-popups/success-${viewport.width}.png` });
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
}
