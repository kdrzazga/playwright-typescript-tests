Run cucumber tests:
npx cucumber-js --tags @add-remove-elements


Run tests from tests (spec files):
npm run  test:headed


----
npm test / npm run test:headed (Playwright's own test runner) — driven by the projects array in playwright.config.ts, which has three entries: chromium, firefox, webkit. By default, Playwright runs every test against every project in that array, so one npm test run = 3x execution (once per browser). You narrow it to one with --project=chromium (or firefox/webkit), or by commenting out entries in the config.

npx cucumber-js — there's no multi-browser concept at all. The BeforeAll hook in support/hooks.ts launches exactly one browser for the entire run (whatever BROWSER resolves to, chromium by default now), and every scenario in that invocation uses that single instance. Running cucumber once never covers multiple browsers — to test the same scenarios across chromium, firefox, and webkit, you'd need to invoke the command three separate times with different BROWSER values, since nothing loops that for you.

STARTUP:

**Install Node.js and init project**

Make sure Node.js 18+ is installed. Then create a project folder and run `npm init -y` to generate a package.json. This gives you a place to manage dependencies and scripts.

**Install TypeScript and a test framework**

For Playwright (recommended): run 

`npm init playwright@latest` 

— this scaffolds a TS project automatically with config, example tests, and browsers installed. For a manual setup with Selenium instead, run 

`npm install -D typescript selenium-webdriver @types/selenium-webdriver @types/node mocha @types/mocha ts-node chromedriver`.

**Add tsconfig.json**

If not auto-generated, create one with 

`npx tsc --init`

Key settings for test automation: `"target": "ES2020"`, `"module": "commonjs"` (or `"esnext"` if using ESM), `"strict": true`, `"esModuleInterop": true`, `"outDir": "./dist"`, and `"types": ["node"]`.

**Organize project structure**


Use a clear layout: `/tests` for spec files, `/pages` for Page Object Model classes, `/fixtures` or `/data` for test data, and `/utils` for helpers like waits or custom assertions. This keeps automation maintainable as the suite grows.


**Write a sample test**

Playwright example: 

import { test, expect } from '@playwright/test';
 
test('homepage has title', async ({ page }) => {

await page.goto('https://example.com'); 

await expect(page).toHaveTitle(/Example/); 

});

— Playwright's test runner handles TS compilation on the fly, no separate build step needed.


Configure test runner options

In `playwright.config.ts`, set base URL, browsers (chromium/firefox/webkit), retries, parallelism, and reporters (HTML, list, JUnit for CI). For Selenium+Mocha, configure `.mocharc.js` with `require: 'ts-node/register'` so TS files run directly.


**Add npm scripts**


In package.json add: `"test": "playwright test"`, `"test:headed": "playwright test --headed"`, `"test:debug": "playwright test --debug"`. This gives your team a consistent, memorable way to run the suite locally and in CI.

**Wire into CI**


Add a GitHub Actions / GitLab CI / Jenkins job that runs 

`npm ci` 

then 

`npx playwright install --with-deps`

and 

`npm test` 

Publish the HTML report as a build artifact so failures are easy to review.
