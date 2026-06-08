import { test, expect } from '@playwright/test';
import { QuestoesPage } from '../../pages/QuestoesPage.js';

const CONTEUDO = 'g-discursiva-importa-manual-teste-associação-resistores';

const TEXTO_IMPORT = `Um circuito tem 3 resistores idênticos, dois deles colocados em paralelo entre si, e ligados em série com o terceiro resistor e com uma fonte de 12 V. A corrente que passa pela fonte é de 5,0 mA. Qual é a resistência de cada resistor, em kΩ?

a) 0,60
b) 0,80
c) 1,2
d) 1,6
e) 2,4`;

test('Questão Importação — criar, editar e excluir', async ({ page }) => {
    const questoes = new QuestoesPage(page);

    await questoes.navegarParaQuestoes();

    await questoes.criarQuestaoImport({
        banca: 'PUC-RJ',
        ano: '2018',
        nivel: 'Ensino médio',
        disciplina: 'Física',
        conteudo: CONTEUDO,
        texto: TEXTO_IMPORT,
    });

    await expect(
        page.getByText('Um circuito tem 3 resistores idênticos').first()
    ).toBeVisible({ timeout: 15000 });

    await questoes.editarUltima({
        banca: 'PUC-RJ (editado)',
        enunciado: 'Um circuito tem 3 resistores idênticos (editado)',
        a: '0,60 (editado)',
        b: '0,80 (editado)',
        c: '1,2 (editado)',
        d: '1,6 (editado)',
        e: '2,4 (editado)',
    });

    await expect(
        page.getByText('Um circuito tem 3 resistores idênticos (editado)').first()
    ).toBeVisible({ timeout: 15000 });

    await questoes.excluirUltima();

    await expect(
        page.getByText('Um circuito tem 3 resistores idênticos (editado)')
    ).not.toBeVisible({ timeout: 15000 });
});