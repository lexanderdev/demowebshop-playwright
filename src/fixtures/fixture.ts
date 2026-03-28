import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { RegisterPage } from '../pages/register_page';
import { HomePage } from '../pages/home_page';
import { CatalogPage } from '../pages/catalog_page';
import { ProductPage } from '../pages/product_page';
import { CartPage } from '../pages/cart_page';
import { CheckoutPage } from '../pages/checkout_page';
import { getUser } from '../helpers/db';

type MyFixtures = {
  userSelected: string;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<MyFixtures>({
  userSelected: ['defaultUser', { option: true }],

  loginPage: async ({ page, userSelected }, use) => {
    const userData = await getUser(userSelected);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.doLogin(userData.user, userData.password);
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  homePage: async ({ loginPage }, use) => {
    await use(new HomePage(loginPage.page));
  },

  catalogPage: async ({ loginPage }, use) => {
    await use(new CatalogPage(loginPage.page));
  },

  productPage: async ({ loginPage }, use) => {
    await use(new ProductPage(loginPage.page));
  },

  cartPage: async ({ loginPage }, use) => {
    await use(new CartPage(loginPage.page));
  },

  checkoutPage: async ({ loginPage }, use) => {
    await use(new CheckoutPage(loginPage.page));
  },
});

export { expect } from '@playwright/test';
