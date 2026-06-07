import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { TurmasPage } from '../../pages/TurmasPage.js';
import { GrupoCorretoresPage } from '../../pages/GrupoCorretoresPage.js';
import { RedacaoPage } from '../../pages/RedacaoPage.js';

const CURSO          = 'curso-1779898293684';
const GRUPO          = 'g-redacao-grupo-corretores';
const TURMA_BUSCA    = `3º DS | ${CURSO}`;
const TITULO         = 'g-teste-redação';
const TITULO_EDITADO = 'g-teste-redação-editado';

test('CRUD de Redação', async ({ page }) => {
  const menu    = new MenuPage(page);
  const turmas  = new TurmasPage(page);
  const grupo   = new GrupoCorretoresPage(page);
  const redacao = new RedacaoPage(page);

  await menu.irParaGruposDeCorrecao();
  await grupo.criar({
    nome: GRUPO,
    corretor: '#106 - E2e Super Teacher 37',
  });
  await expect(page.getByText(GRUPO).first()).toBeVisible();

  await menu.irParaTurmas();
  await turmas.criar({
    curso: CURSO,
    ano: '2025',
    serie: '3ª Série / 3º Semestre',
    turno: 'Integral',
    sala: '08',
    descricao: 'DS',
  });

  await menu.irParaRedacoes();
  await redacao.criar({
    titulo: TITULO,
    matriz: 'Matriz atual do ENEM',
    turma: TURMA_BUSCA,
    grupo: GRUPO,
    dataEntrega: '05/06/2026',
    anonima: true,
    revisao: true,
    tema: 'Desafios para a valorização da herança africana no Brasil',
    textos: [
      'TEXTO 1:\n\nHerança - o legado de crenças, conhecimentos, técnicas, costumes, tradições, transmitido por um grupo social de geração para geração; cultura.\n\nHOUAISS, A: VILLAR M S Dicionário Houaiss da língua portuguesa Rio de Janeira Objetiva, 2009 (adaptado)',
      'As culturas africanas o afro-brasileiras foram relegadas ao campo do folclore com o propósito de confiná-las ao gueto fossilizado da memória Folclorizar, nesse caso, é reduzir uma cultura a um conjunto de representações estereotipadas, via de regra, alheias ao contexto que produziu essa cultura.\n\nOLIVEIRA, E. D. A epistemologia da ancestralidade. Entrelugares: revista de sociopoética e abordagens afins. 2009',
      'História afro-brasileira nas escolas: professoras comentam avanços e dificuldades\n\nAs aulas sobre escravidão eram motivo de vergonha para uma professora quando ela estudava em uma escola municipal na zona sul de São Paulo.\n\nDisponível em: https://jornal.unesp.br. Acesso em: 3 jun 2024 (adaptado).',
      'Histórias para ninar gente grande\nG.R.E.S. Estação Primeira de Manqueira\n(samba-enredo de 2019)\n\nBrasil, meu nego\nDeixa eu te contar\nA história que a história não conta\n\nDisponível em: https://mangueira.com.br/site/sambas-enredo/\nAcesso em: 30 maio 2024 (fragmento)',
    ],
  });
  await expect(page.getByText(TITULO, { exact: true }).first()).toBeVisible();

  await redacao.editar({
    titulo: TITULO_EDITADO,
    dataEntrega: '05/07/2026',
    anonima: false,
    revisao: false,
    tema: 'Desafios para a valorização da herança africana no Brasil (editada)',
    textos: [
      { conteudo: 'Herança - o legado de crenças',    novoConteudo: 'Herança - o legado de crenças, conhecimentos, técnicas, costumes, tradições, transmitido por um grupo social de geração para geração; cultura.\n\nHOUAISS, A: VILLAR M S Dicionário Houaiss da língua portuguesa Rio de Janeira Objetiva, 2009 (adaptado) (editado)' },
      { conteudo: 'As culturas africanas o afro-',    novoConteudo: 'As culturas africanas o afro-brasileiras foram relegadas ao campo do folclore com o propósito de confiná-las ao gueto fossilizado da memória Folclorizar, nesse caso, é reduzir uma cultura a um conjunto de representações estereotipadas, via de regra, alheias ao contexto que produziu essa cultura.\n\nOLIVEIRA, E. D. A epistemologia da ancestralidade. Entrelugares: revista de sociopoética e abordagens afins. 2009 (editado)' },
      { conteudo: 'História afro-brasileira nas',     novoConteudo: 'História afro-brasileira nas escolas: professoras comentam avanços e dificuldades\n\nAs aulas sobre escravidão eram motivo de vergonha para uma professora quando ela estudava em uma escola municipal na zona sul de São Paulo.\n\nDisponível em: https://jornal.unesp.br. Acesso em: 3 jun 2024 (adaptado). (editado)' },
      { conteudo: 'Histórias para ninar gente',       novoConteudo: 'Histórias para ninar gente grande\nG.R.E.S. Estação Primeira de Manqueira\n(samba-enredo de 2019)\n\nBrasil, meu nego\nDeixa eu te contar\nA história que a história não conta\n\nDisponível em: https://mangueira.com.br/site/sambas-enredo/\nAcesso em: 30 maio 2024 (fragmento) (editado)' },
    ],
  });
  await expect(page.getByText(TITULO_EDITADO, { exact: true }).first()).toBeVisible();

  await redacao.excluir();
  await expect(page.getByText(TITULO_EDITADO, { exact: true })).not.toBeVisible();

  await menu.irParaTurmas();
  await turmas.excluir();

  await menu.irParaGruposDeCorrecao();
  await grupo.excluirPorNome(GRUPO);
  await page.waitForLoadState('networkidle');
});