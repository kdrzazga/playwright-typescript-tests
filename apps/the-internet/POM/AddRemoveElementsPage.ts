import { Page, Locator, expect } from '@playwright/test';

export class AddRemoveElementsPage {
  private readonly page: Page;
  private readonly header: Locator;
  private readonly addElementButton: Locator;

  constructor(page: Page) {
    this.page = page
    this.header = page.locator('#content > h3')
    this.addElementButton = page.getByRole('button', { name: 'Add Element' })
  }

  async goto(): Promise<void>{
        await this.page.goto('https://the-internet.herokuapp.com/add_remove_elements/')
      }

  async clickAddElementButton(times: number){
      for(let i = 0; i < times; i++)
          await this.addElementButton.click()
      }
}
