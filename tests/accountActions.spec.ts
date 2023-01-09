import test from "@playwright/test";
import { launchApplication } from "../pages/commonFunctions.page";
import {
  openAccountCreationForm,
  createNewAccount,
  defaultDataPreparation,
} from "../pages/createAccount.page";
import {
  logOutFromAccount,
  resetAccount,
} from "../pages/accountSesstings.page";
import * as data from "../fixtures/loginData.json";

test.describe("Account actions", () => {
  test.beforeEach(async ({ page }) => {
    await defaultDataPreparation(data);
    await launchApplication(page);
  });
  test("Make new account and sign out from it", async ({ page }) => {
    await openAccountCreationForm(page);
    await createNewAccount(page, data);
    await logOutFromAccount(page);
  });
  test("Reset password", async ({ page }) => {
    await openAccountCreationForm(page);
    await createNewAccount(page, data);
    await resetAccount(page, data);
  });
});
