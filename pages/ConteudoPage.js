export class ConteudoPage {
  constructor(page) {
    this.page = page;
    this.btnAdicionar = page.getByRole('button', { name: 'Adicionar Conteúdo' });
    this.inputNome = page.getByRole('textbox', { name: 'Nome do conteúdo: *' });
    this.btnDisciplina = page.getByRole('button', { name: 'Disciplina' });
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
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
    const input = this.page.getByPlaceholder('Pesquisar conteúdo...');
    await input.clear();
    await input.fill(nome);
    await this.page.waitForTimeout(1500);
    await this.page.waitForLoadState('networkidle');
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
    await this.page.getByRole('button', { name: 'Excluir' }).click();
    await this.page.waitForLoadState('networkidle');
  }
}