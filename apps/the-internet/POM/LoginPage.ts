import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly flashMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectFlashMessageToContain(text: string): Promise<void> {
    await expect(this.flashMessage).toContainText(text);
  }
}
