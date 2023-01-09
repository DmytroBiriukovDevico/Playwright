import { Page } from "@playwright/test";
import { commonLocators } from "../objectsRepository/commonLocators";
import { homePageLocators } from "../objectsRepository/homepageLocators";

export const addItemToWishList = async (page: Page) => {
  await page.click(homePageLocators.mainLogo);
  await page.hover(homePageLocators.firstItem);
  await page.click(homePageLocators.addToWishListLink);
  await page
    .locator(commonLocators.successfulAlert, {
      hasText:
        "Radiant Tee has been added to your Wish List. Click here to continue shopping",
    })
    .isVisible();
};
