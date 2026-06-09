export class TurmasPage {
  constructor(page) {
    this.page = page;
    this.btnAdicionarTurma = page.getByRole('button', { name: 'Adicionar nova turma' });
    this.inputAno = page.getByRole('textbox', { name: 'Ano: *' });
    this.selectSerie = page.getByRole('combobox', { name: 'Série ou semestre da turma:' });
    this.selectTurno = page.getByRole('combobox', { name: 'Turno: campo obrigatório' });
    this.inputSala = page.getByRole('textbox', { name: 'Sala:' });
    this.inputDescricao = page.getByRole('textbox', { name: 'Descrição:' });
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
    this.btnCancelar = page.getByRole('button', { name: 'Cancelar' });
    this._descricaoAtual = null;
  }

  get menuItemEditar() {
    return this.page.getByRole('menuitem', { name: 'Editar' });
  }

  get menuItemExcluir() {
    return this.page.getByRole('menuitem', { name: 'Excluir' });
  }

  async #abrirMenu(descricao) {
    await this.page
      .locator('tr')
      .filter({ has: this.page.getByRole('cell', { name: descricao, exact: true }) })
      .getByRole('button', { name: 'Opções' })
      .click();
  }

  async selecionarCurso(nomeCurso) {
    await this.page.getByRole('button', { name: 'Curso' }).click();
    const opcao = this.page.getByLabel('Suggestions').getByText(nomeCurso, { exact: true });
    await opcao.waitFor({ state: 'visible' });
    await opcao.click();
  }

  async #selecionarSerie(serie) {
    await this.selectSerie.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.selectSerie).not.toBeDisabled({ timeout: 15000 });
    await this.selectSerie.click();
    await this.page.getByRole('option').filter({ hasText: serie }).first().click();
  }

  async #selecionarTurno(turno) {
    await this.selectTurno.waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.selectTurno).not.toBeDisabled({ timeout: 15000 });
    await this.selectTurno.click();
    await this.page.getByRole('option').filter({ hasText: turno }).first().click();
  }

  async criar({ curso, ano, serie, turno, sala, descricao }) {
    this._descricaoAtual = descricao;

    await this.btnAdicionarTurma.click();
    if (curso) await this.selecionarCurso(curso);
    await this.inputAno.fill(ano);
    if (serie) await this.#selecionarSerie(serie);
    if (turno) await this.#selecionarTurno(turno);
    if (sala) await this.inputSala.fill(sala);
    if (descricao) await this.inputDescricao.fill(descricao);
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async cancelarExclusao() {
    await this.#abrirMenu(this._descricaoAtual);
    await this.menuItemExcluir.click({ force: true });
    await this.btnCancelar.click();
  }

  async editar({ ano, serie, turno, sala, descricao }) {
    await this.#abrirMenu(this._descricaoAtual);
    await this.menuItemEditar.click({ force: true });
    if (ano) await this.inputAno.fill(ano);
    if (serie) await this.#selecionarSerie(serie);
    if (turno) await this.#selecionarTurno(turno);
    if (sala) await this.inputSala.fill(sala);
    if (descricao) {
      await this.inputDescricao.fill(descricao);
      this._descricaoAtual = descricao;
    }
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async excluir() {
    await this.#abrirMenu(this._descricaoAtual);
    await this.menuItemExcluir.click({ force: true });

    const modal = this.page.getByLabel('Confirmar Exclusão');
    await modal.waitFor({ state: 'visible', timeout: 15000 });
    await modal.getByRole('button', { name: 'Excluir' }).click();
    await modal.waitFor({ state: 'hidden', timeout: 15000 });

    await this.page.waitForLoadState('networkidle');
  }
}