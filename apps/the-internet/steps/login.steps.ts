import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../../support/world';
import { LoginPage } from '../POM/LoginPage';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
  this.store.loginPage = loginPage;
});

When(
  'I log in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await (this.store.loginPage as LoginPage).login(username, password);
  },
);

Then('I should see a message containing {string}', async function (this: CustomWorld, text: string) {
  await (this.store.loginPage as LoginPage).expectFlashMessageToContain(text);
});
