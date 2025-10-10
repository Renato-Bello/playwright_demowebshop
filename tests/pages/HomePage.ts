import { expect, Page } from "@playwright/test";

export class HomePage {

   constructor(private page: Page) { }
   async voltarParaHome(){
    await this.page.locator('img[alt="Tricentis Demo Web Shop"]').click();
   }

   async acessarMenu() {
        await this.page.getByRole('link', { name: 'rs-sdb@hotmail.com' }).click();
    }

}