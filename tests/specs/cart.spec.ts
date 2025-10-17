import { test } from '../fixtures/test-base';

test.describe('Carrinho', () => {
  test('Adicionar e validar produto no carrinho', async ({ cartPage }) => {
    await cartPage.goto('/');
    await cartPage.selecionarCategoria('COMPUTERS');
    await cartPage.selecionarSubcategoria('Desktops');
    await cartPage.selecionarProduto('Simple Computer');
    await cartPage.adicionarNoCarrinho();
    await cartPage.irParaCarrinho();
    await cartPage.validarProdutoNoCarrinho('Simple Computer');
  });

  test('Remover produtos do carrinho', async ({ cartPage }) => {
    await cartPage.goto('/');
    await cartPage.selecionarCategoria('COMPUTERS');
    await cartPage.selecionarSubcategoria('Desktops');
    await cartPage.selecionarProduto('Simple Computer');
    await cartPage.adicionarNoCarrinho();
    await cartPage.irParaCarrinho();
    await cartPage.removerProdutosDoCarrinho();
  });

  test('Validar mensagem de campo obrigatório de produto', async ({ cartPage }) => {
    await cartPage.goto('/');
    await cartPage.selecionarCategoria('COMPUTERS');
    await cartPage.selecionarSubcategoria('Desktops');
    await cartPage.selecionarProduto('Simple Computer');
    await cartPage.validarMensagemSeletorObrigatorio('Please select Processor');
  });
});
