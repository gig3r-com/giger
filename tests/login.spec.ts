import { test, expect } from "@playwright/test";
import { BASE_URL, AUTHS, USERS } from "./testData";

const auth = AUTHS[6];
const user = USERS.find((user) => user.Handle === auth.Username);

test.describe("UserLogin", () => {
  test("SuccessfulLogin", async ({ page }) => {
    await page.goto(BASE_URL);
    await page
      .getByPlaceholder("Username")
      .fill(auth.Username);
    await page
      .getByPlaceholder("Password")
      .fill(auth.Password);
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
  await page
    .getByPlaceholder("Username")
    .fill(auth.Username);
  await page
    .getByPlaceholder("Password")
    .fill("Wr0nG_P@$$w0rd");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(
    page.getByText("Wrong username or password provided")
  ).toHaveText("Wrong username or password provided");

});
