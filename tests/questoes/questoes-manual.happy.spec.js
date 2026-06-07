import { test, expect } from '@playwright/test';
import { QuestoesPage } from '../../pages/QuestoesPage.js';

const CONTEUDO = 'g-discursiva-importa-manual-teste-associação-resistores';
const TS = Date.now();
const ENUNCIADO = `A associação de resistores em paralelo é usada nas situações em que, caso ocorra queima de algum dos resistores, todos os outros não sejam queimados. Então, dentre as alternativas abaixo, em qual delas não temos a aplicação de associações de resistores em paralelo? ${TS}`;

test('Questão Manual — criar, editar e excluir', async({ page }) => {
    const questoes = new QuestoesPage(page);

    await questoes.navegarParaQuestoes();

    await questoes.criarQuestaoManual({
        banca: 'PUC-SP',
        ano: '2026',
        nivel: 'Ensino médio',
        disciplina: 'Física',
        conteudo: CONTEUDO,
        enunciado: ENUNCIADO,
        a: 'A) Circuitos elétricos.',
        b: 'B) Iluminação pública.',
        c: 'C) Equipamentos eletrônicos.',
        d: 'D) Luzes residenciais.',
        e: 'E) Pisca-pisca.',
    });

    await expect(
        page.getByText(`A associação de resistores em paralelo é usada nas situações em que, caso ocorra queima de algum dos resistores, todos os outros não sejam queimados. Então, dentre as alternativas abaixo, em qual delas não temos a aplicação de associações de resistores em paralelo? ${TS}`).first()
    ).toBeVisible({ timeout: 15000 });

    await questoes.editarUltima({
        banca: 'PUC-SP (editado)',
        enunciado: `${ENUNCIADO} (editado)`,
        a: 'A) Circuitos elétricos. (editado)',
        b: 'B) Iluminação pública. (editado)',
        c: 'C) Equipamentos eletrônicos. (editado)',
        d: 'D) Luzes residenciais. (editado)',
        e: 'E) Pisca-pisca. (editado)',
    });

    await expect(
        page.getByText(`${ENUNCIADO} (editado)`).first()
    ).toBeVisible({ timeout: 15000 });

    await questoes.excluirUltima();

    await expect(
        page.getByText(`${ENUNCIADO} (editado)`)
    ).not.toBeVisible({ timeout: 15000 });

    await questoes.excluirConteudoNaPagina(CONTEUDO);
});