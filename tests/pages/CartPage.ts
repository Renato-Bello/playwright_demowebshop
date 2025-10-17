import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
  async selecionarCategoria(name: string) {
    await this.page.waitForLoadState('domcontentloaded');
    const link = this.page.locator('ul.top-menu a', { hasText: name });
    await link.waitFor({ state: 'visible' });
    await link.scrollIntoViewIfNeeded();
    await link.click();
  }

  async selecionarSubcategoria(name: string) {
    const link = this.page.locator('.sub-category-item a', { hasText: name });
    await link.waitFor({ state: 'visible' });
    await link.scrollIntoViewIfNeeded();
    await link.click();
  }

  async selecionarProduto(title: string) {
    const titleLink = this.page.locator('.product-title a', { hasText: new RegExp(`^${title}$`, 'i') });
    await titleLink.waitFor({ state: 'visible' });
    await titleLink.scrollIntoViewIfNeeded();
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      titleLink.click(),
    ]);
    await expect(this.page.getByRole('heading', { name: new RegExp(title, 'i') })).toBeVisible();
  }

  async adicionarNoCarrinho() {
    // Select one option from each radio group if present
    const radios = this.page.locator('.attributes input[type="radio"]');
    const names = await radios.evaluateAll(nodes => Array.from(new Set((nodes as HTMLInputElement[]).map(n => n.name))));
    for (const name of names) {
      const opt = this.page.locator(`.attributes input[type="radio"][name="${name}"]:not([disabled])`).first();
      await opt.scrollIntoViewIfNeeded();
      await opt.check({ force: true });
    }

    // If selects exist, choose first non-default option
    const selects = this.page.locator('.attributes select');
    for (let i = 0; i < await selects.count(); i++) {
      const sel = selects.nth(i);
      await sel.selectOption({ index: 1 }).catch(async () => { await sel.selectOption({ index: 0 }); });
    }

    const addBtn = this.page.locator('.add-to-cart-panel .add-to-cart-button').first();

    await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/addproducttocart') && res.status() === 200, { timeout: 15000 }),
      addBtn.click(),
    ]);

    await this.page.locator('.bar-notification.success').waitFor({ state: 'visible', timeout: 10000 }).catch(async () => {
      const err = this.page.locator('.message-error.validation-summary-errors, .field-validation-error');
      if (await err.count()) {
        const txt = (await err.first().innerText()).trim();
        throw new Error('Falha ao adicionar: ' + txt);
      }
      throw new Error('Falha ao adicionar: não houve resposta/notification de sucesso.');
    });
  }

  async irParaCarrinho() {
    await this.page.getByRole('link', { name: 'shopping cart', exact: true }).click();
  }

  async validarProdutoNoCarrinho(title: string) {
    await expect(this.page.getByRole('link', { name: new RegExp(title, 'i') })).toBeVisible();
  }

  async removerProdutosDoCarrinho() {
    await this.page.waitForLoadState('domcontentloaded');
    const checkboxes = this.page.locator('input[name="removefromcart"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }
    const updateButton = this.page.locator('input[name="updatecart"]');
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      updateButton.click(),
    ]);
    await this.page.getByText('Your Shopping Cart is empty!').waitFor({ state: 'visible' });
  }

  async validarMensagemSeletorObrigatorio(msg: string) {
    await this.page.locator('.add-to-cart-panel .add-to-cart-button').click();
    await expect(this.page.getByText(msg)).toBeVisible();
  }
}
