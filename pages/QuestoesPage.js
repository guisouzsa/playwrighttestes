export class QuestoesPage {
    constructor(page) {
        this.page = page;
        this.btnAdicionarObjetiva = page.getByRole('button', { name: 'Adicionar nova questão objetiva' });
        this.btnAdicionarDiscursiva = page.getByRole('button', { name: 'Adicionar nova questão discursiva' });
        this.inputBanca = page.getByRole('textbox', { name: 'Banca da questão' });
        this.inputAno = page.getByRole('textbox', { name: 'Ano da questão:' });
        this.btnNivel = page.getByRole('button', { name: 'Nível' });
        this.btnDisciplina = page.getByRole('button', { name: 'Disciplina' });
        this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
    }

    async navegarParaQuestoes() {
        await this.page.goto('https://app.avaliei.com.br/questoes');
    }

    async preencherInfos({ banca, ano, nivel, disciplina }) {
        await this.inputBanca.fill(banca);
        await this.inputAno.fill(ano);
        await this.btnNivel.click();
        await this.page.getByText(nivel).click();
        await this.btnDisciplina.click();
        await this.page.getByRole('option', { name: disciplina, exact: true }).click();
    }

    async selecionarConteudo(nome) {
        await this.page.getByRole('combobox', { name: 'Conteúdos' }).click();
        const input = this.page.getByPlaceholder('Buscar conteúdos...');
        await input.waitFor({ state: 'visible' });
        await input.fill('g');
        await this.page.getByRole('option', { name: nome }).click();
    }

    async criarConteudo(nome, disciplina) {
        await this.page.getByRole('button', { name: 'Não encontrou o conteúdo' }).click();
        await this.page.getByRole('textbox', { name: 'Nome do conteúdo: *' }).fill(nome);
        await this.page.getByRole('button', { name: 'Disciplina' }).click();
        await this.page.getByRole('option', { name: disciplina, exact: true }).click();
        await this.btnSalvar.click();
        await this.page.getByRole('button', { name: 'Voltar' }).click();
    }

    async criarQuestaoDiscursiva({ banca, ano, nivel, disciplina, conteudo, enunciado }) {
        await this.btnAdicionarDiscursiva.click();
        await this.preencherInfos({ banca, ano, nivel, disciplina });
        await this.criarConteudo(conteudo, disciplina);
        await this.selecionarConteudo(conteudo);
        await this.page.getByRole('group', { name: 'Enunciado' }).getByRole('textbox').fill(enunciado);
        await this.btnSalvar.click();
        await this.page.waitForLoadState('networkidle');
    }

    async criarQuestaoImport({ banca, ano, nivel, disciplina, conteudo, texto }) {
        await this.btnAdicionarObjetiva.click();
        await this.preencherInfos({ banca, ano, nivel, disciplina });
        await this.selecionarConteudo(conteudo);
        await this.page.getByRole('button', { name: 'Importar Questão' }).click();
        await this.page.getByRole('region', { name: 'Ferramentas de IA e Importação' }).getByRole('textbox').fill(texto);
        await this.page.getByRole('button', { name: 'Preencher' }).click();
        await this.btnSalvar.click();
        await this.page.waitForLoadState('networkidle');
    }

    async criarQuestaoManual({ banca, ano, nivel, disciplina, conteudo, enunciado, a, b, c, d, e }) {
        await this.btnAdicionarObjetiva.click();
        await this.preencherInfos({ banca, ano, nivel, disciplina });
        await this.selecionarConteudo(conteudo);
        await this.page.getByRole('group', { name: 'Enunciado' }).getByRole('textbox').fill(enunciado);
        await this.page.getByRole('textbox').nth(3).fill(a);
        await this.page.getByRole('textbox').nth(4).fill(b);
        await this.page.getByRole('textbox').nth(5).fill(c);
        await this.page.getByRole('textbox').filter({ hasText: /^$/ }).nth(2).fill(d);
        await this.page.getByLabel('Detalhes adicionais').getByRole('textbox').filter({ hasText: /^$/ }).fill(e);
        await this.btnSalvar.click();
        await this.page.waitForLoadState('networkidle');
    }

    async editarUltima({ banca, enunciado, a, b, c, d, e }) {
        await this.page.getByRole('button', { name: 'Opções' }).first().click();
        await this.page.getByRole('menuitem', { name: 'Editar Questão' }).click();
        if (banca) await this.inputBanca.fill(banca);
        if (enunciado) {
            await this.page.getByRole('group', { name: 'Enunciado' }).getByRole('textbox').fill(enunciado);
        }
        if (a) await this.page.getByLabel('Detalhes adicionais').getByText(a.replace(' (editado)', '')).fill(a);
        if (b) await this.page.getByLabel('Detalhes adicionais').getByText(b.replace(' (editado)', '')).fill(b);
        if (c) await this.page.getByLabel('Detalhes adicionais').getByText(c.replace(' (editado)', '')).fill(c);
        if (d) await this.page.getByLabel('Detalhes adicionais').getByText(d.replace(' (editado)', '')).fill(d);
        if (e) await this.page.getByLabel('Detalhes adicionais').getByText(e.replace(' (editado)', '')).fill(e);
        await this.btnSalvar.click();
        await this.page.waitForLoadState('networkidle');
    }

    async excluirUltima() {
        await this.page.getByRole('button', { name: 'Opções' }).first().click();
        await this.page.getByRole('menuitem', { name: 'Excluir Questão' }).click();
        await this.page.getByRole('button', { name: 'Excluir' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async excluirConteudoNaPagina(nome) {
        await this.page.goto('https://app.avaliei.com.br/conteudos');
        await this.page.getByLabel('Disciplina').click();
        await this.page.getByRole('checkbox', { name: 'Física', exact: true }).click();
        await this.page.keyboard.press('Escape');
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('combobox').click();
        await this.page.getByRole('option', { name: '100' }).click();
        await this.page.waitForLoadState('networkidle');
        const row = this.page.getByRole('row').filter({ hasText: nome }).first();
        await row.waitFor({ state: 'visible', timeout: 15000 });
        await row.getByRole('button', { name: 'Excluir', exact: true }).click();
        await this.page.getByRole('button', { name: 'Excluir' }).click();
        await this.page.waitForLoadState('networkidle');
    }
}