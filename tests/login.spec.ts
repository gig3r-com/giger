import { test, expect } from "@playwright/test";
import { randomSuccessfulLogin, randomUnSuccessfulLogin } from "./testData";
import { BASE_URL } from "./testData";

test.describe("UserLogin", () => {
  test("SuccessfulLogin", async ({ page }) => {
    await page.goto(BASE_URL);
    await page
      .getByPlaceholder("Username")
      .fill(randomSuccessfulLogin.username);
    await page
      .getByPlaceholder("Password")
      .fill(randomSuccessfulLogin.password);
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page).toHaveURL(/\/giger\/?$/);
    const authToken = await page.evaluate(() =>
      localStorage.getItem("authToken")
    );
    expect(authToken).toBeDefined();
    expect(authToken).not.toBe("");
  });
});

test("UnsuccesfullLogin", async ({ page }) => {
  await page.goto(BASE_URL);
  for (const user of randomUnSuccessfulLogin){
  await page
    .getByPlaceholder("Username")
    .fill(user.username);
  await page
    .getByPlaceholder("Password")
    .fill(user.password);}
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(
    page.getByText("Wrong username or password provided")
  ).toHaveText("Wrong username or password provided");

});
