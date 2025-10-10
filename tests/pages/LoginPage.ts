import { expect, Page } from "@playwright/test";

export class LoginPage {

    constructor(private page: Page) { }

    async acessarAPagina() {
        await this.page.goto('https://demowebshop.tricentis.com/register/');
        await this.page.locator("a.ico-login").click();
        await this.page.locator("input.email").fill("rs-sdb@hotmail.com");
        await this.page.locator("input.password").fill("Renato12345");
        await this.page.getByRole('button', { name: 'Log in' }).click();

    }

    async NavigationHistoryEntry() {
        await this.page.goto('https://demowebshop.tricentis.com/');

    }

    async acessarFormularioLogin() {
        await this.page.locator("a.ico-login").click();
    }

    async PreencherFormularioLogin(email: string, password: string) {
        await this.page.locator("input.email").fill(email);
        await this.page.locator("input.password").fill(password);

    }

    async clicarBotaoLogin() {
        await this.page.getByRole('button', { name: 'Log in' }).click();
        
    }

    async validarLoginRealizado() {
        await expect(this.page.getByRole('link', { name: 'rs-sdb@hotmail.com' })).toBeVisible();
    }

    async validarMsgLoginInvalido(msgErro: string) {
        await expect(this.page.getByText(msgErro)).toBeVisible();
    }

    async validarMsgLoginUsuarioInvalido(msgErro: string) {
        await expect(this.page.getByText(msgErro)).toBeVisible();
    }

    async validarObrigatoriedadeEmail(msgErro: string) {
        await expect(this.page.getByText(msgErro)).toBeVisible();
    }



}