import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('input.add-to-cart-button');
    this.successNotification = page.locator('#bar-notification .content');
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.successNotification.waitFor({ state: 'visible' });
  }
}
