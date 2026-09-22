import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

/**
 * Shared Cucumber World for all apps. Kept app-agnostic on purpose: page
 * objects are stashed in `store` by step files instead of being typed here,
 * so this file never has to import from any apps/<app>/POM.
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  store: Record<string, unknown> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
