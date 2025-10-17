import { test, expect } from '../fixtures/test-base';
import { users, messages } from '../utils/data';

test.describe('Login', () => {
  test('Login realizado com sucesso', async ({ loginPage }) => {
    await loginPage.goto('/');
    await loginPage.preencherDadosLogin(users.dadosValidos.email, users.dadosValidos.password);
    await loginPage.validarLoginRealizado(users.dadosValidos.email);
  });

  test('Login não realizado quando email for inválido', async ({ loginPage }) => {
    await loginPage.goto('/');
    await loginPage.preencherDadosLogin(users.emailInvalido.email, users.emailInvalido.password);
    await loginPage.validarLoginInvalido(messages.msgEmailInvalido);
  });

  test('Login não realizado quando senha for inválida', async ({ loginPage }) => {
    await loginPage.goto('/');
    await loginPage.preencherDadosLogin(users.passwordInvalido.email, users.passwordInvalido.password);
    await loginPage.validarLoginInvalido(messages.msgCredenciaisIncorretas);
  });

  test('Login não realizado quando todos os dados estiverem em branco', async ({ loginPage }) => {
    await loginPage.goto('/');
    await loginPage.preencherDadosLogin('', '');
    await loginPage.validarLoginInvalido(messages.msgContaInvalida);
  });
});
