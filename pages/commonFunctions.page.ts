import { expect, Page } from "@playwright/test";

export const launchApplication = async (page: Page) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://magento.softwaretestingboard.com/");
};
