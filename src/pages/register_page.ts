import { expect, type Locator, type Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.firstNameField = page.locator('#FirstName');
    this.lastNameField = page.locator('#LastName');
    this.emailField = page.locator('#Email');
    this.passwordField = page.locator('#Password');
    this.confirmPasswordField = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.successMessage = page.locator('.result');
  }

  async goto() {
    await this.page.locator('a.ico-register').click();
  }

  async fillForm(gender: string, firstName: string, lastName: string, email: string, password: string) {
    if (gender === 'F') {
      await this.genderFemale.check();
    } else {
      await this.genderMale.check();
    }
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
  }

  async submit() {
    await this.registerButton.click();
  }

  async validateRegistered() {
    await expect(
      this.successMessage,
      'Debería ver el mensaje "Your registration completed"'
    ).toHaveText('Your registration completed');
  }
}
