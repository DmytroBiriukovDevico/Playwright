import { Page } from "@playwright/test";
import { homePageLocators } from "../objectsRepository/homepageLocators";
import { createAccountLocators } from "../objectsRepository/createAccountLocators";
import { faker } from "@faker-js/faker";
import { DataForNewUser } from "../interfaces/commonInterfaces";

export const defaultDataPreparation = async (data: DataForNewUser) => {
  data.firstName = faker.name.firstName();
  data.lastName = faker.name.lastName();
  data.email = faker.internet.email();
  data.password = `${faker.internet.password(15, true, /[A-Z]/)}$Qm1`;
  data.passwordConfirmation = data.password;
};

export const openAccountCreationForm = async (page: Page) => {
  await page.click(homePageLocators.createAnAcconutLink);
  await page
    .locator(homePageLocators.createAnAcconutLink, {
      hasText: "Create New Customer Account",
    })
    .isVisible();
};

export const createNewAccount = async (page: Page, data: DataForNewUser) => {
  const {
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    passwordConfirmationInput,
    createAnAccountButton,
  } = createAccountLocators;

  await page.fill(firstNameInput, data.firstName);
  await page.fill(lastNameInput, data.lastName);
  await page.fill(emailInput, data.email);
  await page.fill(passwordInput, data.password);
  await page.fill(passwordConfirmationInput, data.passwordConfirmation);
  await page.click(createAnAccountButton);

  await page.isVisible(createAccountLocators.createdAccountMessage);
};
