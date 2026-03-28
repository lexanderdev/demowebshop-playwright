import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('input.add-to-cart-button');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
