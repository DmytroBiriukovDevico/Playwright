import test from "@playwright/test";
import { launchApplication } from "../pages/commonFunctions.page";
import {
  openAccountCreationForm,
  createNewAccount,
  defaultDataPreparation,
} from "../pages/createAccount.page";
import {
  prequalAddItemToCart,
  logOutFromAccount,
  resetAccount,
  checkCartItems,
} from "../pages/accountSesstings.page";
import * as data from "../fixtures/loginData.json";
import { addItemToWishList } from "../pages/homePage.page";
import { addItemToCart } from "../pages/itemDescription.page";

test.describe("Add items to cart", () => {
  test.beforeEach(async ({ page }) => {
    await defaultDataPreparation(data);
    await launchApplication(page);
    await openAccountCreationForm(page);
    await createNewAccount(page, data);
  });
  test("Add item to cart", async ({ page }) => {
    await addItemToWishList(page);
    await prequalAddItemToCart(page);
    await addItemToCart(page, "XL", "Blue");
    await checkCartItems(page, "1");
  });
});
