import { test, expect } from "@playwright/test";
import {BASE_URL} from '../testData';
import {usersByTransactionLimits} from '../testData';


// test.describe ("Bank Transaction Limits - Negative Tests", () => {
//   for (const user of usersByTransactionLimits) {
//     test (`Bank Transaction Limits - validate transaction limit exceeded for permission: ${user.permissions}`, async ({ page }) => {
//     await page.goto(BASE_URL);
//     await page.getByPlaceholder('Username').fill(user.username);
//     await page.getByPlaceholder('Password').fill(user.password);
//     await page.getByRole('button', { name: 'Log in' }).click();
//     await expect(page).toHaveURL(/\/giger\/?$/);
//     const authToken = await page.evaluate(() =>
//       localStorage.getItem("authToken")
//   );
//    const bank = await page.getByRole('link', { name: 'bank' })
//    console.log('bank: ', bank);
//    await bank.click();
//     await page.getByRole('button', { name: 'Transfer' }).click();
//     await page.getByPlaceholder('Amount').fill(String(user.transactionAmount));
//     await page.getByPlaceholder('Title').fill('invalidTransactionAmount');
//     await page.getByText('0_connor').click();
//     await page.getByRole('button', { name: 'Transfer' }).click();
//     await page.getByText('0_connor').click();
//     await page.locator('div').filter({ hasText: /^0_connor$/ }).locator('label').click();
//   await page.getByRole('button', { name: 'Transfer' }).click();
//     await expect(page.getByText('TRANSFER_FAILED').first()).toBeVisible();
//   });
// }
// });

// test.describe ("Bank Transaction Limits - Positive Tests", () => {
//   for (const user of usersByTransactionLimits) {
//     test (`Bank Transaction Limits - verify transaction within or under allowed limit exceeded for permission: ${user.permissions}`, async ({ page }) => {
//     await page.goto(BASE_URL);
//     await page.getByPlaceholder('Username').fill(user.username);
//     await page.getByPlaceholder('Password').fill(user.password);
//     await page.getByRole('button', { name: 'Log in' }).click();
//     await expect(page).toHaveURL(/\/giger\/?$/);
//     const authToken = await page.evaluate(() =>
//       localStorage.getItem("authToken")
//   );

//    //await page.locator('li.main-menu__option a[href="/bank"]').click();
//    //await page.getByText('bank').first().click();
//    let bank = await page.locator('a', { hasText: 'bank' });
//    console.log('bank: ', bank);
//    await bank.click();

//    const accountBalanceText = await page.locator('.bank__private-balance--active').innerText();
//    const accountBalance = parseFloat(accountBalanceText.replace(/[^0-9.-]+/g, ''));
//    if (accountBalance >= user.transactionLimit) {

//     await page.getByRole('button', { name: 'Transfer' }).click();
//     await page.getByPlaceholder('Amount').fill(String(user.transactionLimit));
//     await page.getByPlaceholder('Title').fill('validTransactionLimit');
//     await page.getByText('0_connor').click();
//     await page.getByRole('button', { name: 'Transfer' }).click();
//     await page.getByText('0_connor').click();
//     await page.locator('div').filter({ hasText: /^0_connor$/ }).locator('label').click();
//   await page.getByRole('button', { name: 'Transfer' }).click();
//     await expect(page.getByText('TRANSFER_FAILED').first()).toBeVisible();

//   } else {
//     console.log("Insufficient funds: The account balance is insufficient for this transaction.");
//   }
//   });
// }
// });