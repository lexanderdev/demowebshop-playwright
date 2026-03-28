import { type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToCategory(category: string) {
    await this.page.locator(`li.inactive a[href="/${category.toLowerCase()}"]`).click();
  }
}
