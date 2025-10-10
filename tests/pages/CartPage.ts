import { expect, Page } from "@playwright/test";

export class CartPage {

  constructor(private page: Page) { }
  async NavigationHistoryEntry() {
    await this.page.goto('https://demowebshop.tricentis.com/register/');
    await this.page.locator("a.ico-login").click();
    await this.page.locator("input.email").fill("rs-sdb@hotmail.com");
    await this.page.locator("input.password").fill("Renato12345");
    await this.page.getByRole('button', { name: 'Log in' }).click();

  }

  async selecionarCategoria(categoria: string) {
    await this.page.waitForLoadState('domcontentloaded');
    const link = this.page.locator(`ul.top-menu a:has-text("${categoria}")`);
    await link.waitFor({ state: 'visible' });
    await link.scrollIntoViewIfNeeded();
    await link.click();
  }

  async selecionarSubcategoria(subcategoria: string) {
    const link = this.page.locator('.sub-category-item a', { hasText: subcategoria });
    await link.waitFor({ state: 'visible' });
    await link.scrollIntoViewIfNeeded();
    await link.click();
  }

  async selecionarProduto(produto: string) {
    const card = this.page.locator('.product-item, .item-box').filter({
      has: this.page.locator('.product-title a', { hasText: new RegExp(`^${produto}$`, 'i') })
    });

    const titleLink = card.locator('.product-title a', { hasText: new RegExp(`^${produto}$`, 'i') });

    await titleLink.waitFor({ state: 'visible' });
    await titleLink.scrollIntoViewIfNeeded();

    await this.page.mouse.move(0, 0);

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      titleLink.click()
    ]);

    await expect(this.page.getByRole('heading', { name: new RegExp(produto, 'i') })).toBeVisible();
  }

  async adicionarAoCarrinho() {
    await this.page.waitForLoadState('domcontentloaded');

    // 1) Seleciona 1 opção por grupo de radio (Processor, RAM, HDD, OS)
    const radios = this.page.locator('.attributes input[type="radio"]');
    const groupNames: string[] = await radios.evaluateAll(nodes =>
      Array.from(new Set(nodes.map(n => (n as HTMLInputElement).name)))
    );

    for (const name of groupNames) {
      const opt = this.page.locator(`.attributes input[type="radio"][name="${name}"]:not([disabled])`).first();
      await opt.scrollIntoViewIfNeeded();
      await opt.check({ force: true });
    }

    // 2) Se houver selects, escolhe a primeira opção diferente da default
    const selects = this.page.locator('.attributes select');
    for (let i = 0; i < await selects.count(); i++) {
      const sel = selects.nth(i);
      await sel.selectOption({ index: 1 }).catch(async () => { await sel.selectOption({ index: 0 }); });
    }

    // 3) Descobre o botão (ID varia por produto); escopa pelo painel
    const addBtn = this.page.locator('.add-to-cart-panel .add-to-cart-button').first();

    // 4) Clica e espera o POST + notificação de sucesso
   await Promise.all([
  this.page.waitForResponse(
    res => res.url().includes('/addproducttocart') && res.status() === 200,
    { timeout: 15000 } // ⬅️ aqui está o aumento do tempo de espera
  ),
  addBtn.click()
]);

    await this.page.locator('.bar-notification.success').waitFor({ state: 'visible', timeout: 10000 })
      .catch(async () => {
        // 5) Se não veio sucesso, exponha o erro de validação para facilitar o debug
        const err = this.page.locator('.message-error.validation-summary-errors, .field-validation-error');
        if (await err.count()) {
          const txt = (await err.first().innerText()).trim();
          throw new Error('Falha ao adicionar: ' + txt);
        }
        throw new Error('Falha ao adicionar: não houve resposta/notification de sucesso.');
      });
  }

  async navegarParaCarrinho() {
    // Navega para o carrinho de compras
    await this.page.getByRole('link', { name: 'shopping cart', exact: true }).click();
  }

  async validarProdutoNoCarrinho(produto: string) {
    // Valida se o produto está no carrinho
    await expect(this.page.getByRole('link', { name: produto })).toBeVisible();

  }

  async excluirTodosProdutosDoCarrinho() {
    // Aguarda a página do carrinho carregar
    await this.page.waitForLoadState('domcontentloaded');

    // Localiza todas as checkboxes de remoção
    const checkboxes = this.page.locator('input[name="removefromcart"]');
    const count = await checkboxes.count();

    // Marca todas
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }

    // Clica no botão de atualizar carrinho
    const updateButton = this.page.locator('input[name="updatecart"]');
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      updateButton.click(),
    ]);

    // (opcional) Valida carrinho vazio
    await this.page.getByText('Your Shopping Cart is empty!').waitFor({ state: 'visible' });
  }

  async validarMsgSeletorObrigatorio(produto: string) {

    await expect(this.page.locator('.bar-notification.success')).toBeVisible();

  }

  async validarMsgSeletorObrigatorio2(msgErro: string) {
    this.page.locator('.add-to-cart-panel .add-to-cart-button').click();
    await expect(this.page.getByText(msgErro)).toBeVisible();

  }

}