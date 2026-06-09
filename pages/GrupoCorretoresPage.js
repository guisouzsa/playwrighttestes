export class GrupoCorretoresPage {
  constructor(page) {
    this.page      = page;
    this.inputNome = page.getByRole('textbox', { name: 'Nome do Grupo: *' });
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
    this._nomeAtual = null;
  }

  async #abrirMenu(nome) {
    const row = this.page.getByRole('row').filter({ hasText: nome }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.getByRole('button').last().click();
  }

  #extrairNumeroCorretor(corretor) {
    return corretor.replace('#', '').split(' ')[0];
  }

  async criar({ nome, corretor }) {
    this._nomeAtual = nome;

    await this.page.getByRole('button', { name: 'Adicionar grupo de corretores' }).click();
    await this.inputNome.fill(nome);
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');

    await this.#abrirMenu(nome);
    await this.page.getByRole('menuitem', { name: 'Ver participantes' }).click();
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', { name: 'Adicionar membro' }).click();
    await this.page.getByRole('button', { name: 'Professor' }).click();
    await this.page.getByPlaceholder('Buscar...').waitFor({ state: 'visible' });

    const numero = this.#extrairNumeroCorretor(corretor);
    await this.page.getByPlaceholder('Buscar...').fill(numero);
    await this.page.getByRole('option').filter({ hasText: numero }).first().click();

    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', { name: 'Ir para grupos de corretores' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async editar({ nome: nomeNovo }) {
    await this.#abrirMenu(this._nomeAtual);
    await this.page.getByRole('menuitem', { name: 'Editar' }).click();
    await this.inputNome.press('ControlOrMeta+a');
    await this.inputNome.fill(nomeNovo);
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
    this._nomeAtual = nomeNovo;
  }

  async excluir() {
    await this.#abrirMenu(this._nomeAtual);
    await this.page.getByRole('menuitem', { name: 'Excluir' }).click();

    const modal = this.page.getByLabel('Confirmar Exclusão');
    await modal.waitFor({ state: 'visible', timeout: 15000 });
    await modal.getByRole('button', { name: 'Excluir' }).click();
    await modal.waitFor({ state: 'hidden', timeout: 15000 });

    await this.page.waitForLoadState('networkidle');
  }

  async excluirPorNome(nome) {
    this._nomeAtual = nome;
    await this.excluir();
  }
}