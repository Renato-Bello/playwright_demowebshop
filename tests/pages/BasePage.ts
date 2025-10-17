import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async clickByRole(role: 'button'|'link', name: string) {
    await this.page.getByRole(role as any, { name }).click();
  }

  async fill(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }

  async waitForUrl(partial: string) {
    await this.page.waitForURL(`**/${partial}**`);
  }

  async errorMessageText() {
    const err = this.page.locator('.message-error.validation-summary-errors, .field-validation-error');
    if (await err.count()) {
      return (await err.first().innerText()).trim();
    }
    return '';
  }
}
