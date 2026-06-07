export class RedacaoPage {
    constructor(page) {
        this.page = page;
        this._tituloAtual = null;
    }

    async #abrirMenu(titulo) {
        await this.page
            .locator('tr, li, [role="listitem"], [role="row"]')
            .filter({ hasText: titulo })
            .getByRole('button')
            .last()
            .click();
    }

    async criar({ titulo, matriz, turma, grupo, dataEntrega, anonima, revisao, tema, textos }) {
        this._tituloAtual = titulo;

        await this.page.getByRole('button', { name: 'Adicionar redação' }).click();

        await this.page.getByRole('textbox', { name: 'Título:' }).fill(titulo);

        await this.page.getByRole('button', { name: 'Matriz de Correção' }).click();
        await this.page.getByText(matriz).click();

        await this.page.locator('div').filter({ hasText: /^Selecionar turmas$/ }).nth(2).click();
        await this.page.getByPlaceholder('Buscar turmas...').fill(turma);
        await this.page.getByRole('option', { name: new RegExp(turma) }).first().click();

        await this.page.getByRole('button', { name: 'Grupo de Corretores' }).click();
        await this.page.getByRole('option', { name: grupo, exact: true }).first().click();

        await this.page.getByRole('textbox', { name: 'Data de Entrega' }).fill(dataEntrega);

        await this.page.getByRole('radio', { name: anonima ? 'Sim' : 'Não' }).first().click();
        await this.page.getByRole('radio', { name: revisao ? 'Sim' : 'Não' }).nth(1).click();

        await this.page.getByRole('textbox', { name: 'Tema (Comando da Redação):' }).fill(tema);

        await this.page.getByRole('textbox').nth(3).fill(textos[0]);

        for (let i = 1; i < textos.length; i++) {
            await this.page.getByRole('button', { name: '+ Adicionar Texto Motivador' }).click();
            await this.page.getByRole('textbox').nth(3 + i).fill(textos[i]);
        }

        await this.page.getByRole('button', { name: 'Salvar Redação' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async editar({ titulo: tituloNovo, dataEntrega, anonima, revisao, tema, textos }) {
        await this.#abrirMenu(this._tituloAtual);
        await this.page.getByRole('menuitem', { name: 'Editar' }).click();
        await this.page.waitForLoadState('networkidle');

        if (tituloNovo !== undefined) {
            const input = this.page.getByRole('textbox', { name: 'Título:' });
            await input.clear();
            await input.fill(tituloNovo);
        }

        if (dataEntrega !== undefined) {
            const input = this.page.getByRole('textbox', { name: 'Data de Entrega' });
            await input.clear();
            await input.fill(dataEntrega);
        }

        if (anonima !== undefined) {
            await this.page.getByRole('radio', { name: anonima ? 'Sim' : 'Não' }).first().click();
        }

        if (revisao !== undefined) {
            await this.page.getByRole('radio', { name: revisao ? 'Sim' : 'Não' }).nth(1).click();
        }

        if (tema !== undefined) {
            const input = this.page.getByRole('textbox', { name: 'Tema (Comando da Redação):' });
            await input.clear();
            await input.fill(tema);
        }

        if (textos && textos.length > 0) {
            for (const { conteudo, novoConteudo } of textos) {
                const textarea = this.page.getByRole('textbox').filter({ hasText: conteudo });
                await textarea.clear();
                await textarea.fill(novoConteudo);
            }
        }

        await this.page.getByRole('button', { name: 'Atualizar Redação' }).click();
        await this.page.waitForResponse(res =>
            res.url().includes('/redacao') && res.status() === 200
        );
        await this.page.waitForLoadState('networkidle');

        if (tituloNovo !== undefined) {
            this._tituloAtual = tituloNovo;
        }
    }

    async excluir() {
        await this.#abrirMenu(this._tituloAtual);
        await this.page.getByText('Excluir').click();

        const modal = this.page.getByRole('dialog');
        await modal.waitFor({ state: 'visible' });
        await modal.getByRole('button', { name: 'Excluir' }).click();
        await modal.waitFor({ state: 'hidden' });

        await this.page.waitForLoadState('networkidle');
    }
}