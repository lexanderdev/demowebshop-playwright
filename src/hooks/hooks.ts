import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { fixture } from './pageFixture';

setDefaultTimeout(60000);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({
    channel: process.env.CI ? undefined : 'chrome',
    headless: !!process.env.CI,
  });
});

Before(async function () {
  context = await browser.newContext({
    baseURL: process.env.BASE_URL ?? 'https://demowebshop.tricentis.com/',
  });
  fixture.page = await context.newPage();
});

After(async function () {
  await fixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
