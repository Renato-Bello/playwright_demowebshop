import { BasePage } from './BasePage';

export class LogoutPage extends BasePage {
  async logout() {
    await this.page.locator('a.ico-logout').click();
  }
}
