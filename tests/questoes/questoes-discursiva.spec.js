import { test, expect } from '@playwright/test';
import { QuestoesPage } from '../../pages/QuestoesPage.js';

const CONTEUDO = `g-discursiva-importa-manual-teste-associação-resistores-${Date.now()}`;
const ENUNCIADO = 'Em um laboratório de eletrônica de uma faculdade, três resistores são associados em série em um circuito elétrico. Os valores das resistências são 10 Ω, 20 Ω e 30 Ω. Explique como determinar a resistência equivalente desse circuito e descreva a diferença entre associações em série e em paralelo, destacando aplicações práticas de cada uma.';

test('Questão Discursiva — criar, editar e excluir', async ({ page }) => {
    const questoes = new QuestoesPage(page);

    await questoes.navegarParaQuestoes();

    await questoes.criarQuestaoDiscursiva({
        banca: 'INEP',
        ano: '2026',
        nivel: 'Ensino médio',
        disciplina: 'Física',
        conteudo: CONTEUDO,
        enunciado: ENUNCIADO,
    });

    await expect(
        page.getByRole('row').filter({ hasText: CONTEUDO }).getByText(ENUNCIADO.substring(0, 50))
    ).toBeVisible();

    await questoes.editarUltima({
        enunciado: `${ENUNCIADO} (editada)`,
    });

    await expect(
        page.getByRole('row').filter({ hasText: CONTEUDO }).getByText('(editada)')
    ).toBeVisible();

    await questoes.excluirUltima();

    await expect(
        page.getByRole('row').filter({ hasText: CONTEUDO })
    ).not.toBeVisible();
});