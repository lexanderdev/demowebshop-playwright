import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly termsOfService: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');
    this.termsOfService = page.locator('#termsofservice');
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async proceedToCheckout() {
    await this.termsOfService.waitFor({ state: 'visible' });
    await this.termsOfService.check();
    await this.checkoutButton.click();
  }
}
