import { expect, Page } from "@playwright/test";
import { commonLocators } from "../objectsRepository/commonLocators";
import { itemDescriptionLocators } from "../objectsRepository/itemDescription";

export const addItemToCart = async (
  page: Page,
  size?: string,
  color?: "Black" | "Blue" | "Red" | "Orange" | "Yellow"
) => {
  await page
    .locator(commonLocators.noticeAlert, {
      hasText: "You need to choose options for your item.",
    })
    .isVisible();

  const itemName = await page.textContent(itemDescriptionLocators.itemName);

  await page.isVisible(itemDescriptionLocators.addedItemImg);
  await page.isVisible(itemDescriptionLocators.itemName);
  await expect(page.locator(itemDescriptionLocators.itemName)).not.toBeEmpty();
  await page.isVisible(itemDescriptionLocators.itemPrice);
  await (
    await page.isVisible(itemDescriptionLocators.hiddenQuantityInput)
  ).valueOf();

  await page.locator(`[option-tooltip-value=${size}]`).click();
  await page.locator(`[aria-label='${color}']`).click();
  await page
    .locator(itemDescriptionLocators.addToCartButton, {
      hasText: "Add to Cart",
    })
    .click();
  await page
    .locator(commonLocators.successfulAlert, {
      hasText: `You added ${itemName} to your shopping cart.`,
    })
    .isVisible();
  await page
    .locator(commonLocators.noticeAlert, {
      hasText: "You have no items in your wish list",
    })
    .isVisible();
};
