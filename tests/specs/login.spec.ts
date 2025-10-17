<<<<<<< HEAD
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
=======
import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Testes de login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.NavigationHistoryEntry();
});

test('Login realizado com sucesso', async () => {
    await loginPage.acessarFormularioLogin();
    await loginPage.PreencherFormularioLogin("rs-sdb@hotmail.com", "Renato12345");
    await loginPage.clicarBotaoLogin();
    await loginPage.validarLoginRealizado();
});

test('Login não realizado quando email estiver em branco', async () => {
    await loginPage.acessarFormularioLogin();
    await loginPage.PreencherFormularioLogin("", "Renato12345");
    await loginPage.clicarBotaoLogin();
    await loginPage.validarMsgLoginUsuarioInvalido("No customer account found");
});

test('Login não realizado quando email for invalido', async () => {
    await loginPage.acessarFormularioLogin();
    await loginPage.PreencherFormularioLogin("rs-sdb@hotmailcom", "Renato12345");
    await loginPage.clicarBotaoLogin();
    await loginPage.validarMsgLoginUsuarioInvalido("Please enter a valid email address.");
});

test('Login não realizado quando senha estiver em branco', async () => {
    await loginPage.acessarFormularioLogin();
    await loginPage.PreencherFormularioLogin("rs-sdb@hotmail.com", "");
    await loginPage.clicarBotaoLogin();
    await loginPage.validarMsgLoginUsuarioInvalido("The credentials provided are incorrect");
});

test('Login não realizado quando senha for invalida', async () => {
    await loginPage.acessarFormularioLogin();
    await loginPage.PreencherFormularioLogin("rs-sdb@hotmail.com", "Renat123");
    await loginPage.clicarBotaoLogin();
    await loginPage.validarMsgLoginUsuarioInvalido("The credentials provided are incorrect");
});

test('Login não realizado quando todos os dados estiverem em branco', async () => {
    await loginPage.acessarFormularioLogin();
    await loginPage.PreencherFormularioLogin("", "");
    await loginPage.clicarBotaoLogin();
    await loginPage.validarMsgLoginUsuarioInvalido("No customer account found");
});

});
>>>>>>> 7ab1fa764544cb409e0cf3e4798fee680969656f
