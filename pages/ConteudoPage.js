import { expect } from '@playwright/test';

export class ConteudoPage {
  constructor(page) {
    this.page = page;
    this.btnAdicionar = page.getByRole('button', { name: 'Adicionar Conteúdo' });
    this.inputNome = page.getByRole('textbox', { name: 'Nome do conteúdo: *' });
    this.btnDisciplina = page.getByRole('button', { name: 'Disciplina' });
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
    this.inputPesquisa = page.getByPlaceholder('Pesquisar conteúdo...');
  }

  async criar(nome, disciplina) {
    await this.btnAdicionar.click();
    await this.inputNome.fill(nome);
    await this.btnDisciplina.click();
    await this.page.getByRole('option', { name: disciplina, exact: true }).click();
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
    await this.pesquisar(nome);
  }

  async pesquisar(nome) {
    await this.inputPesquisa.clear();
    await this.inputPesquisa.fill(nome);
    await this.page.waitForLoadState('networkidle'); // 👈 reativo, sem waitForTimeout fixo
  }

  async editar(nomeAtual, nomeNovo) {
    await this.pesquisar(nomeAtual);
    const row = this.page.getByRole('row').filter({ hasText: nomeAtual }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.getByRole('button', { name: 'Editar', exact: true }).click();
    await this.inputNome.clear();
    await this.inputNome.fill(nomeNovo);
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
    await this.pesquisar(nomeNovo);
  }

  async excluir(nome) {
    await this.pesquisar(nome);
    const row = this.page.getByRole('row').filter({ hasText: nome }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.getByRole('button', { name: 'Excluir', exact: true }).click();

    const modal = this.page.getByLabel('Confirmar Exclusão');
    await modal.waitFor({ state: 'visible', timeout: 15000 });
    await modal.getByRole('button', { name: 'Excluir' }).click();
    await modal.waitFor({ state: 'hidden', timeout: 15000 });

    await this.page.waitForLoadState('networkidle');
    await this.inputPesquisa.clear(); // 👈 limpa busca após excluir
  }
}