import { type Page } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCartFromCatalog(productName: string) {
    await this.page
      .locator('.product-item')
      .filter({ hasText: productName })
      .locator('input.product-box-add-to-cart-button')
      .click();
  }
}
