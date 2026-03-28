import { When } from '@cucumber/cucumber';
import { fixture } from '../hooks/pageFixture';
import { ProductPage } from '../pages/product_page';
import { CatalogPage } from '../pages/catalog_page';
import { HomePage } from '../pages/home_page';
import { CartPage } from '../pages/cart_page';

let catalogPage: CatalogPage;
let productPage: ProductPage;
let homePage: HomePage;
let cartPage: CartPage;

When('selecciono la categoría {string}', async (category: string) => {
  homePage = new HomePage(fixture.page);
  await homePage.navigateToCategory(category);
});

When('selecciono la subcategoría {string}', async (subCategory: string) => {
  homePage = new HomePage(fixture.page);
  await homePage.navigateToCategory(subCategory);
});

When('agrego al carrito el producto {string}', async (productName: string) => {
  catalogPage = new CatalogPage(fixture.page);
  productPage = new ProductPage(fixture.page);
  await catalogPage.addToCartFromCatalog(productName);
});

When('confirmo agregar al carrito desde la página del producto', async () => {
  productPage = new ProductPage(fixture.page);
  await productPage.addToCart();
});

When('voy al carrito de compras', async () => {
  cartPage = new CartPage(fixture.page);
  await cartPage.goto();
});
