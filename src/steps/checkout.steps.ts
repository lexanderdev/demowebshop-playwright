import { When, Then } from '@cucumber/cucumber';
import { fixture } from '../hooks/pageFixture';
import { CartPage } from '../pages/cart_page';
import { CheckoutPage } from '../pages/checkout_page';
import { getAddress, getPaymentCard } from '../helpers/db';

let checkoutPage: CheckoutPage;

// Navega al carrito, acepta términos y da clic en Checkout
When('inicio el proceso de checkout', async () => {
  const cartPage = new CartPage(fixture.page);
  checkoutPage = new CheckoutPage(fixture.page);
  await cartPage.proceedToCheckout();
});

// Llena el formulario de dirección de facturación con datos de Firestore
// Si el usuario ya tiene una dirección guardada, omite el formulario
When('completo la dirección de envío con {string}', async (addressKey: string) => {
  const address = await getAddress(addressKey);
  await checkoutPage.fillBillingAddress(address);
  await checkoutPage.continueBilling();
});

// Selecciona "Pick Up in Store" y continúa al paso de pago
When('selecciono el método de envío {string}', async (_method: string) => {
  await checkoutPage.selectShippingMethod();
  await checkoutPage.continueShipping();
});

// Selecciona "Credit Card" y continúa al formulario de tarjeta
When('selecciono el método de pago {string}', async (_method: string) => {
  await checkoutPage.selectPaymentMethod();
  await checkoutPage.continuePaymentMethod();
});

// Llena el formulario de tarjeta de crédito con datos de Firestore y continúa
When('completo los datos de pago con {string}', async (cardKey: string) => {
  const card = await getPaymentCard(cardKey);
  await checkoutPage.fillCreditCard(card);
  await checkoutPage.continuePaymentInfo();
});

// Confirma la orden en el paso de revisión final
When('confirmo la orden', async () => {
  await checkoutPage.confirmOrder();
});

// Valida el mensaje de éxito tras confirmar la compra
Then('debería ver el mensaje "Your order has been successfully processed!"', async () => {
  await checkoutPage.validateSuccessMessage();
});
