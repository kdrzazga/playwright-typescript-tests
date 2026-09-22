import { Before, After, BeforeAll, AfterAll, Status, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADED !== 'true' });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { result }: ITestCaseHookParameter) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, 'image/png');
  }
  await this.context.close();
});
