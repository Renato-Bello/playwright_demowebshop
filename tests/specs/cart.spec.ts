import {test, expect} from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Testes no carrinho de compras', () => {
    let loginPage: LoginPage;
    let cartPage: CartPage;
    

    test.beforeEach(async ({page}) => {
        cartPage = new CartPage(page);
        loginPage = new LoginPage(page);
        await loginPage.acessarAPagina();
});

test('Adicionar produtos ao carrinho', async () => {
    await cartPage.selecionarCategoria('COMPUTERS');
    await cartPage.selecionarSubcategoria('Desktops');
    await cartPage.selecionarProduto('Simple Computer');
    await cartPage.adicionarAoCarrinho();
    await cartPage.navegarParaCarrinho();
    await cartPage.validarProdutoNoCarrinho('Simple Computer')
  });

  test('Remover produtos do carrinho', async () => {
    await cartPage.selecionarCategoria('COMPUTERS');
    await cartPage.selecionarSubcategoria('Desktops');
    await cartPage.selecionarProduto('Simple Computer');
    await cartPage.adicionarAoCarrinho();
    await cartPage.selecionarCategoria('DIGITAL DOWNLOADS');
    await cartPage.selecionarProduto('3rd Album');
    await cartPage.adicionarAoCarrinho();
    await cartPage.navegarParaCarrinho();
    await cartPage.validarProdutoNoCarrinho('Simple Computer')
    await cartPage.validarProdutoNoCarrinho('3rd Album')
    await cartPage.excluirTodosProdutosDoCarrinho()
  });

    test('Validar se produto não é adicionado no carrinho quando campo obrigatório não for preenchido', async () => {
    await cartPage.selecionarCategoria('COMPUTERS');
    await cartPage.selecionarSubcategoria('Desktops');
    await cartPage.selecionarProduto('Simple Computer');
    await cartPage.validarMsgSeletorObrigatorio2('Please select Processor');

  });

});