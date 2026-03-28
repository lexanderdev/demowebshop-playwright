import { expect, type Locator, type Page } from '@playwright/test';
import { Address } from '../models/address';
import { PaymentCard } from '../models/payment_card';

export class CheckoutPage {
  readonly page: Page;
  readonly orderConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderConfirmation = page.locator('.order-completed');
  }

  async fillBillingAddress(address: Address) {
    const countrySelect = this.page.locator('#BillingNewAddress_CountryId');
    if (await countrySelect.isVisible()) {
      await countrySelect.selectOption({ label: address.country });
      await this.page.locator('#BillingNewAddress_City').fill(address.city);
      await this.page.locator('#BillingNewAddress_Address1').fill(address.address);
      await this.page.locator('#BillingNewAddress_ZipPostalCode').fill(address.zip);
      if (address.phoneNumber) {
        await this.page.locator('#BillingNewAddress_PhoneNumber').fill(address.phoneNumber);
      }
    }
  }

  async selectShippingMethod() {
    await this.page.locator('#PickUpInStore').check();
  }

  async selectPaymentMethod() {
    await this.page.locator('#paymentmethod_2').check();
  }

  async continueBilling() {
    await this.page.locator('input[onclick="Billing.save()"]').click();
  }

  async continueShipping() {
    await this.page.locator('input[onclick="Shipping.save()"]').click();
  }

  async continuePaymentMethod() {
    await this.page.locator('input.payment-method-next-step-button').click();
  }

  async continuePaymentInfo() {
    await this.page.locator('input.payment-info-next-step-button').click();
  }

  async confirmOrder() {
    await this.page.locator('input[value="Confirm"]').click();
  }

  async fillCreditCard(card: PaymentCard) {
    await this.page.locator('#CreditCardType').selectOption({ value: card.cardType });
    await this.page.locator('#CardholderName').fill(card.cardholderName);
    await this.page.locator('#CardNumber').fill(card.cardNumber);
    await this.page.locator('#ExpireMonth').selectOption({ label: card.expirationMonth });
    await this.page.locator('#ExpireYear').selectOption({ value: card.expirationYear });
    await this.page.locator('#CardCode').fill(card.cardCode);
  }

  async validateSuccessMessage() {
    await expect(
      this.page.locator('.title').filter({ hasText: 'Your order has been successfully processed!' }),
      'Debería ver "Your order has been successfully processed!"'
    ).toBeVisible();
  }
}
