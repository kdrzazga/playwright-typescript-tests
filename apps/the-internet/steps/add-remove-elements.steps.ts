import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../../support/world';
import { AddRemoveElementsPage } from '../POM/AddRemoveElementsPage';

Given('I am on Add Remove Elements page', async function (this: CustomWorld) {
  const page = new AddRemoveElementsPage(this.page);
  await page.goto();
  this.store.addRemoveElementsPage = page;
});

When("I click 'Add Element' button {int} times", async function (this: CustomWorld, times: number){
  await(this.store.addRemoveElementsPage as AddRemoveElementsPage).clickAddElementButton(times);
});
