import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8080/"

test.describe("UserLogin", () => {
  test("SuccesfullLogin", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByPlaceholder("Username").fill("0_connor");
    await page.getByPlaceholder("Username").press("Tab");
    await page.getByPlaceholder("Password").fill("chip");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.click('//a[text()="my.id"]');

    await expect(page.getByText("O'connor")).toHaveText("O'connor");
  });
});

test("UnsuccesfullLogin", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByPlaceholder("Username").fill("O_connor");
  await page.getByPlaceholder("Password").fill("chip");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(
    page.getByText("Wrong username or password provided")
  ).toHaveText("Wrong username or password provided");
});
