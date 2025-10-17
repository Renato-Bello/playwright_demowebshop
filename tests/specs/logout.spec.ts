import { test } from '../fixtures/test-base';
import { users } from '../utils/data';

test.describe('Logout', () => {
  test('Logout realizado com sucesso', async ({ loginPage, logoutPage }) => {
    await loginPage.goto('/');
    await loginPage.preencherDadosLogin(users.dadosValidos.email, users.dadosValidos.password);
    await logoutPage.logout();
  });
});
