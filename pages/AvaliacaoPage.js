import { MenuPage } from './MenuPage.js';

export class AvaliacaoPage {
  constructor(page) {
    this.page = page;
    this.menu = new MenuPage(page);

    this.btnCriarAvaliacao = page.getByRole('button', { name: 'Criar Avaliação' });
    this.inputBuscar       = page.getByRole('textbox', { name: 'Pesquisar' });
    this.inputDescricao    = page.getByRole('textbox', { name: 'Descrição da avaliação: *' });
    this.inputData         = page.getByRole('textbox', { name: 'Data de aplicação' });
    this.btnSalvar         = page.getByRole('button', { name: 'Salvar avaliação' });
    this.btnAplicar        = page.getByRole('button', { name: 'Aplicar' });
    this.btnLimpar         = page.getByRole('button', { name: 'Limpar' });
  }

  async #fecharDropdown() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  async pesquisar(nome) {
    await this.inputBuscar.fill(nome);
    await this.btnAplicar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async #abrirMenu(nome) {
    await this.pesquisar(nome);
    await this.page.waitForLoadState('networkidle');
    await this.page
      .getByRole('button', { name: 'Mais Ações' })
      .first()
      .click();
  }

  async #preencherFormularioObjetivo({ descricao, turma, data }) {
    await this.inputDescricao.fill(descricao);

    await this.page.getByRole('combobox', { name: 'Turmas' }).click();
    await this.page.getByRole('option', { name: turma }).click();
    await this.#fecharDropdown();

    await this.page.getByText('Selecionar marcadores').click();
    await this.page.getByRole('option', { name: 'Avaliação Bimestral' }).click();
    await this.#fecharDropdown();

    await this.page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
    await this.page.getByRole('option', { name: 'Misturar questões do bloco', exact: true }).click();

    await this.page.getByRole('combobox', { name: 'Qtd. ordenações: campo' }).click();
    await this.page.getByRole('option', { name: '(Azul | Branco | Rosa | Verde)' }).click();

    await this.inputData.fill(data);

    await this.page.getByRole('combobox', { name: 'Modo: campo obrigatório' }).click();
    await this.page.getByRole('option', { name: 'ENEM' }).click();

    await this.page.getByRole('combobox', { name: 'Blocos objetivos:' }).click();
    await this.page.getByRole('option', { name: '1', exact: true }).click();

    await this.page.getByRole('combobox', { name: 'Áreas' }).click();
    await this.page.getByRole('option', { name: 'Ciências humanas e suas' }).click();

    await this.page.getByRole('button', { name: 'Professor' }).click();
    await this.page.getByRole('option', { name: 'E2e Super Teacher 20' }).click();
    await this.#fecharDropdown();

    await this.page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
    await this.page.getByRole('option', { name: 'Filosofia' }).click();
  }

  async #preencherFormularioDiscursivo({ descricao, turma, data }) {
    await this.inputDescricao.fill(descricao);

    await this.page.locator('div').filter({ hasText: /^Selecionar turmas$/ }).nth(2).click();
    await this.page.getByRole('option', { name: turma }).click();
    await this.#fecharDropdown();

    await this.page.getByText('Selecionar marcadores').click();
    await this.page.getByRole('option', { name: 'Avaliação Bimestral' }).click();
    await this.#fecharDropdown();

    await this.page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
    await this.page.getByLabel('Misturar questões do bloco', { exact: true })
      .getByText('Misturar questões do bloco').click();

    await this.page.getByRole('combobox', { name: 'Qtd. ordenações: campo' }).click();
    await this.page.getByRole('option', { name: '(Azul | Branco | Rosa | Verde)' }).click();

    await this.inputData.fill(data);

    await this.page.getByRole('combobox', { name: 'Blocos discursivos:' }).click();
    await this.page.getByLabel('1', { exact: true }).getByText('1', { exact: true }).click();

    await this.page.getByRole('combobox', { name: 'Blocos objetivos:' }).click();
    await this.page.getByRole('option', { name: '0', exact: true }).click();

    await this.page.getByRole('combobox', { name: 'Áreas' }).click();
    await this.page.getByPlaceholder('Buscar...').fill('h');
    await this.page.getByRole('option', { name: 'Ciências humanas e suas' }).click();

    await this.page.getByRole('button', { name: 'Professor' }).click();
    await this.page.getByRole('option', { name: 'E2e Super Teacher 20' }).click();
    await this.#fecharDropdown();

    await this.page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
    await this.page.getByRole('option', { name: 'Filosofia' }).click();
  }

  async criarObjetivo({ descricao, turma, data }) {
    await this.menu.irParaAvaliacoes();
    await this.btnCriarAvaliacao.click();
    await this.#preencherFormularioObjetivo({ descricao, turma, data });
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async criarDiscursiva({ descricao, turma, data }) {
    await this.menu.irParaAvaliacoes();
    await this.btnCriarAvaliacao.click();
    await this.#preencherFormularioDiscursivo({ descricao, turma, data });
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }

  async editar(nomeAtual, nomeNovo, novaData) {
    await this.menu.irParaAvaliacoes();
    await this.#abrirMenu(nomeAtual);
    await this.page.getByRole('menuitem', { name: 'Editar' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.inputDescricao.clear();
    await this.inputDescricao.fill(nomeNovo);
    if (novaData) {
      await this.inputData.clear();
      await this.inputData.fill(novaData);
    }
    await this.page.getByRole('button', { name: 'Salvar Alterações' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async excluir(nome) {
    await this.menu.irParaAvaliacoes();
    await this.#abrirMenu(nome);
    await this.page.getByRole('menuitem', { name: 'Excluir' }).click();
    await this.page.getByRole('button', { name: 'Excluir' }).click();
    await this.page.waitForLoadState('networkidle');
  }
}