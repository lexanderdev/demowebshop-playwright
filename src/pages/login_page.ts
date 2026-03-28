import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('#Email');
    this.passwordField = page.locator('#Password');
    this.loginButton = page.locator('input[value="Log in"]');
  }

  async goto() {
    await this.page.locator('a.ico-login').click();
  }

  async doLogin(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
