import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  async backToHome() {
    await this.page.locator('img[alt="Tricentis Demo Web Shop"]').click();
  }

  async openUserLink(email: string) {
    await this.page.getByRole('link', { name: email }).click();
  }
}
