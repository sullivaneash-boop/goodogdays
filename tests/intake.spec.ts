import { expect, test } from "@playwright/test";

test.describe("premium lead intake", () => {
  test("validates each step, recommends a service, and handles success", async ({ page }) => {
    const consoleErrors: string[] = [];
    let submittedProfile: Record<string, unknown> | undefined;

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.route("https://formspree.io/f/xbgjqyyz", async (route) => {
      submittedProfile = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/#inquiry");
    await expect(page.getByRole("heading", { name: "Who are we planning for?" })).toBeVisible();
    await expect(page.getByLabel("Quick action")).toHaveCount(0);

    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByText("Tell us your dog’s name.")).toBeVisible();
    await expect(page.getByText(/Add a breed/)).toBeVisible();

    await page.getByLabel("Dog’s name").fill("Rufus");
    await page.getByLabel("Breed or mix").fill("Golden retriever");
    await page.getByText("Large", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await expect(page.getByRole("heading", { name: "What are Rufus’s primary goals?" })).toBeVisible();
    await page.getByText("Double-coated / sheds", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await expect(page.getByText("Coat Care + Movement Plan")).toBeVisible();
    await page.getByLabel("Your name").fill("Sam Owner");
    await page.getByLabel("Email").fill("sam@example.com");
    await page.getByLabel("Mobile number").fill("7705550123");
    await page.getByText("Text me", { exact: true }).click();
    await page.getByRole("button", { name: "Send pet profile" }).click();

    await expect(page.getByRole("heading", { name: "Rufus is on our radar." })).toBeVisible();
    expect(submittedProfile).toMatchObject({
      petName: "Rufus",
      size: "large",
      recommendedService: "Coat Care + Movement Plan",
      phone: "7705550123",
      preferredContactMethod: "text",
    });
    expect(consoleErrors).toEqual([]);
  });

  test("reveals the contextual offer after 60 percent scroll depth", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: scrollable * 0.65, behavior: "instant" });
    });

    await expect(page.getByLabel("Personalized service offer")).toBeVisible();
    await expect(page.getByRole("link", { name: /Build a pet profile/ })).toBeVisible();
  });

  test("captures exit intent with a two-field priority request", async ({ page }) => {
    await page.route("https://formspree.io/f/xbgjqyyz", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.goto("/");
    await page.waitForTimeout(8_100);
    await page.mouse.move(500, 600);
    await page.mouse.move(500, 1);

    const dialog = page.getByRole("dialog", { name: /Too busy to finish booking/ });
    await expect(dialog).toBeVisible();
    await dialog.getByLabel("Mobile number").fill("7705550199");
    await dialog.getByRole("checkbox").check();
    await dialog.getByRole("button", { name: /Text me priority availability/ }).click();
    await expect(page.getByRole("heading", { name: /We’ll text you about availability/ })).toBeVisible();
  });
});
