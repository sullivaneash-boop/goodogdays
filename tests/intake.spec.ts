import { expect, test } from "@playwright/test";

test.describe("initial lead inquiry", () => {
  test("validates each step, collects fit details, and handles success", async ({ page }) => {
    const consoleErrors: string[] = [];
    let submittedInquiry: Record<string, unknown> | undefined;

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.route("https://formspree.io/f/xbgjqyyz", async (route) => {
      submittedInquiry = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/#inquiry");
    await expect(page.getByRole("heading", { name: "What can we help with?" })).toBeVisible();
    await expect(page.getByLabel("Quick action")).toHaveCount(0);

    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByText("Choose what you need help with.")).toBeVisible();
    await page.getByText("A regular walk", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await page.getByLabel("Dog’s name").fill("Rufus");
    await page.getByLabel("Age or best guess").fill("4 years");
    await page.getByText("Large", { exact: true }).click();
    await page.getByText("Professional sniffer", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await page.getByLabel("When or how often do you need help?").fill("Weekdays around lunch");
    await page.getByLabel("Your name").fill("Sam Owner");
    await page.getByLabel("Email").fill("sam@example.com");
    await page.getByLabel("Mobile number").fill("7705550123");
    await page.getByLabel("ZIP code").fill("30040");
    await page.getByText("Text me", { exact: true }).click();
    await page.getByRole("button", { name: "Tell Us About Your Dog" }).click();

    await expect(page.getByRole("heading", { name: "Good things ahead for Rufus." })).toBeVisible();
    expect(submittedInquiry).toMatchObject({
      serviceNeed: "regular-walk",
      petName: "Rufus",
      age: "4 years",
      size: "large",
      personality: ["professional-sniffer"],
      timing: "Weekdays around lunch",
      phone: "7705550123",
      zipCode: "30040",
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

    await expect(page.getByLabel("Help finding the right service")).toBeVisible();
    await expect(page.getByRole("link", { name: /Find Their Fit/ })).toBeVisible();
  });

  test("captures exit intent with a simple availability text request", async ({ page }) => {
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

    const dialog = page.getByRole("dialog", { name: /Want us to text you/ });
    await expect(dialog).toBeVisible();
    await dialog.getByLabel("Mobile number").fill("7705550199");
    await dialog.getByRole("checkbox").check();
    await dialog.getByRole("button", { name: /Text me about availability/ }).click();
    await expect(page.getByRole("heading", { name: /We’ll text you about availability/ })).toBeVisible();
  });

  test("keeps service links prefilled without skipping the first choice", async ({ page }) => {
    await page.goto("/?service=in-home-stay#inquiry");
    await expect(page.getByRole("radio", { name: /Care while I’m away/ })).toBeChecked();
  });
});
