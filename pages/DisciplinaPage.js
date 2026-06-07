export class DisciplinaPage {
  constructor(page) {
    this.page = page;
    this.btnAdicionar = page.getByRole('button', { name: 'Adicionar disciplina' });
    this.inputNome = page.getByRole('textbox', { name: 'Nome da disciplina: *' });
    this.btnArea = page.getByRole('button', { name: 'Selecione a área da disciplina' });
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
  }

  async criar(nome, area) {
    await this.btnAdicionar.click();
    await this.inputNome.fill(nome);
    await this.btnArea.click();
    await this.page.getByLabel('Suggestions').getByText(area).click();
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async pesquisar(nome) {
    const input = this.page.getByPlaceholder('Pesquisar disciplina...');
    const existe = await input.count();
    if (existe > 0) {
      await input.clear();
      await input.fill(nome);
      await this.page.waitForTimeout(1500);
      await this.page.waitForLoadState('networkidle');
    } else {
      await this.page.getByRole('button', { name: 'ID' }).click();
      await this.page.getByRole('button', { name: 'ID' }).click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async editar(nome, novoNome) {
    await this.pesquisar(nome);
    const row = this.page.getByRole('row').filter({ hasText: nome }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.getByRole('button', { name: 'Editar' }).click();
    await this.inputNome.fill(novoNome);
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async excluir(nome) {
    await this.pesquisar(nome);
    const row = this.page.getByRole('row').filter({ hasText: nome }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.getByRole('button', { name: 'Excluir' }).click();
    await this.page.getByRole('button', { name: 'Excluir' }).click();
    await this.page.waitForLoadState('networkidle');
  }
}