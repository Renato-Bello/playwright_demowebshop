import { expect, Page } from "@playwright/test";

export class LogoutPage {

    constructor(private page: Page) { }
    async NavigationHistoryEntry() {
        await this.page.goto('https://demowebshop.tricentis.com/register/');
        await this.page.locator("a.ico-login").click();
        await this.page.locator("input.email").fill("rs-sdb@hotmail.com");
        await this.page.locator("input.password").fill("Renato12345");
        await this.page.getByRole('button', { name: 'Log in' }).click();

    }

    async realizarLogout() {
        await this.page.locator("a.ico-logout").click();
    }

}