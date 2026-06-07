import { expect } from '@playwright/test';

export class CursosPage {
  constructor(page) {
    this.page = page;
    this.btnAdicionar = page.getByRole('button', { name: 'Adicionar Curso' });
    this.inputNome    = page.getByRole('textbox', { name: 'Nome do Curso: *' });
    this.btnNivel     = page.getByRole('button', { name: 'Nível de Escolaridade' });
    this.btnSalvar    = page.getByRole('button', { name: 'Salvar' });
    this.inputBuscar  = page.getByRole('textbox', { name: 'Pesquisar curso...' });
  }

  async pesquisar(nome) {
    await this.inputBuscar.fill(nome);
    await expect(this.page.getByRole('button', { name: 'Editar' })).toHaveCount(1, { timeout: 10000 });
  }

  async criar({ nome, nivel }) {
    await this.btnAdicionar.click();
    await this.inputNome.fill(nome);
    await this.btnNivel.click();
    await this.page.getByRole('option', { name: nivel }).click();
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async editar({ nome, nivel }) {
    await this.page.getByRole('button', { name: 'Editar' }).click();
    if (nome) await this.inputNome.fill(nome);
    if (nivel) {
      await this.btnNivel.click();
      await this.page.getByRole('option', { name: nivel }).click();
    }
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fecharDialogo() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  async excluir(nome) {
    await this.pesquisar(nome);
    await this.page.getByRole('button', { name: 'Excluir' }).click();
    await this.page.getByRole('button', { name: 'Excluir' }).click();
    await expect(this.page.getByRole('dialog', { name: 'Confirmar Exclusão' })).not.toBeVisible({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }
}