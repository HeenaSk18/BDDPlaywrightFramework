import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixtures/bdd-fixtures';

const { When, Then } = createBdd(test);

When('I add {string} to the cart', async ({ inventoryPage }, productName: string) => {
  await inventoryPage.addProductToCart(productName);
});

Then('I see cart badge count as {string}', async ({ inventoryPage }, count: string) => {
  await expect(inventoryPage.cartBadge).toHaveText(count);
});

Then('I see {string} in the cart', async ({ inventoryPage }, productName: string) => {
  const cartItem = await inventoryPage.getCartItemByName(productName);
  await expect(cartItem).toBeVisible();
});

// ---------- Checkout steps ----------

When('I proceed to checkout', async ({ page }) => {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
});

When(
  'I fill in checkout information with {string} {string} {string}',
  async ({ page }, firstName: string, lastName: string, postalCode: string) => {
    await page.locator('[data-test="firstName"]').fill(firstName);
    await page.locator('[data-test="lastName"]').fill(lastName);
    await page.locator('[data-test="postalCode"]').fill(postalCode);
    await page.locator('[data-test="continue"]').click();
  }
);

When('I finish the checkout', async ({ page }) => {
  await page.locator('[data-test="finish"]').click();
});

Then('I see the order confirmation page', async ({ page }) => {
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
});