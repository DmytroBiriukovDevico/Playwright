import { expect, Page } from "@playwright/test";
import { createAccountLocators } from "../objectsRepository/createAccountLocators";
import {
  accountSettingsLocators,
  resetPasswordLocators,
} from "../objectsRepository/accountSettingsLocators";
import { DataForNewUser } from "../interfaces/commonInterfaces";
import { faker } from "@faker-js/faker";
import { commonLocators } from "../objectsRepository/commonLocators";
import { wishlistLocators } from "../objectsRepository/wishlistLocators";
import { cartLocators } from "../objectsRepository/cartLocators";

export const logOutFromAccount = async (
  page: Page,
  link: string = "Sign Out"
) => {
  // this reload helps us to undestand that we still logged in after refreshing
  await page.reload();
  await page.isVisible(accountSettingsLocators.loggedInText);

  await page.locator(createAccountLocators.customerMenuToggle).click();
  await page.click(
    `//div[contains(@class,'panel')]//*[@class='customer-menu']//ul//a[contains(text(),'${link}')]`
  );
  await page.isVisible(accountSettingsLocators.signedOutAccountMessage);
  await page.textContent(
    `${accountSettingsLocators.signedOutAccountMessage}:has-text('You are signed out')`
  );
};

export const resetAccount = async (
  page: Page,
  data: DataForNewUser,
  {
    currentPassword,
    newPassword,
    confirmPassword,
  }: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  } = {
    currentPassword: data.password,
    newPassword: `${faker.internet.password(15, true, /[A-Z]/)}$Qm2`,
    confirmPassword: "",
  }
) => {
  confirmPassword = newPassword;

  await page
    .locator(accountSettingsLocators.changePasswordLink, {
      hasText: "Change Password",
    })
    .click();

  await page.fill(resetPasswordLocators.currentPassword, currentPassword);
  await page.fill(resetPasswordLocators.newPassword, newPassword);
  await page.fill(
    resetPasswordLocators.confirmCurrentPassword,
    confirmPassword
  );
  await page.click(resetPasswordLocators.saveButton);

  await page
    .locator(commonLocators.successfulAlert, {
      hasText: "You saved the account information",
    })
    .isVisible();
};

export const prequalAddItemToCart = async (page: Page) => {
  await page.waitForLoadState("domcontentloaded");
  await page.isVisible(wishlistLocators.addedItemImg);
  await expect(page.locator(wishlistLocators.itemName)).not.toBeEmpty();
  await expect(page.locator(wishlistLocators.itemPrice)).not.toBeEmpty();
  await page.hover(wishlistLocators.itemName);
  await page.waitForSelector(wishlistLocators.hiddenEditItemLink);
  await page.isVisible(wishlistLocators.hiddenDeleteItemLink);
  await page.isVisible(wishlistLocators.hiddenQuantityInput);
  await page
    .locator(wishlistLocators.hiddenAddToCartButton, { hasText: "Add to Cart" })
    .click();
};

export const checkCartItems = async (page: Page, quantity: string) => {
  await page
    .locator(wishlistLocators.addedToCartItemQuantity, {
      hasText: quantity,
    })
    .click();
  await page.getByText("View and Edit Cart").click();
  await page.locator(cartLocators.cartItemLine).isVisible();
};
