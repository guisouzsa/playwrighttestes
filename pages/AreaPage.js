export class AreaPage {
  constructor(page) {
    this.page = page;
    this.btnAdicionar = page.getByRole('button', { name: 'Adicionar área' });
    this.inputNome = page.getByRole('textbox', { name: 'Nome da Área:' });
    this.inputPesquisa = page.getByRole('textbox', { name: 'Pesquisar área...' });
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
  }

  async criar(nome) {
    await this.btnAdicionar.waitFor({ state: 'visible', timeout: 30000 }); // 👈
    await this.btnAdicionar.click();
    await this.inputNome.fill(nome);
    await this.btnSalvar.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.pesquisar(nome);
  }

  async pesquisar(nome) {
    await this.inputPesquisa.clear();
    await this.inputPesquisa.fill(nome);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async editar(novoNome) {
    await this.page.getByRole('button', { name: 'Editar', exact: true }).first().click();
    await this.inputNome.fill(novoNome);
    await this.btnSalvar.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async excluir(nome) {
    await this.pesquisar(nome);
    await this.page.getByRole('row').filter({ hasText: nome }).getByRole('button', { name: 'Excluir', exact: true }).click();
    await this.page.getByRole('button', { name: 'Excluir' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.inputPesquisa.clear();
  }
}