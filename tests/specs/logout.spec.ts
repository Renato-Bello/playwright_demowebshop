import {test, expect} from '@playwright/test';
import { LogoutPage } from '../pages/LogoutPage';


test.describe('Testes de logout', () => {
    let logoutPage: LogoutPage;

    test.beforeEach(async ({page}) => {
        logoutPage = new LogoutPage(page);
        await logoutPage.NavigationHistoryEntry();
});

test('Logout realizado com sucesso', async () => {
    await logoutPage.realizarLogout();
});

});