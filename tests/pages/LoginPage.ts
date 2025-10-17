import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  async openLoginForm() {
    await this.page.locator('a.ico-login').click();
  }

  async preencherDadosLogin(email: string, password: string) {
    await this.openLoginForm();
    await this.page.locator('input.email').fill(email);
    await this.page.locator('input.password').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async validarLoginRealizado(email: string) {
    await expect(this.page.getByRole('link', { name: email })).toBeVisible();
  }

  async validarLoginInvalido(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}
