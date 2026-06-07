import { test, expect } from '@playwright/test';
import { CursosPage } from '../../pages/CursosPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

const NOME_VALIDO   = `g-curso-teste-edge-${Date.now()}`;
const NOME_EMOJI    = 'curso 👁️‍🗨️ 🏳️‍🌈 👨‍👩‍👧‍👦 🧑‍💻 🏴󠁧󠁢󠁳󠁣󠁴󠁿 🤦🏿‍♂️ 🫶🏽 👩‍🔬 🐻‍❄️ ⛹🏾‍♀️-!@#$%¨&*()(*&¨%$#@#$%¨&*(';
const ERRO_INVALIDO = 'Conteúdo inválido detectado';

test('Edge — criar curso com emojis e caracteres especiais', async ({ page }) => {
  const menu   = new MenuPage(page);
  const cursos = new CursosPage(page);

  await menu.irParaCursos();

  await cursos.criar({ nome: NOME_EMOJI, nivel: 'Extensão' });
  await expect(page.getByText(ERRO_INVALIDO)).toBeVisible();

  await cursos.criar({ nome: NOME_VALIDO, nivel: 'Extensão' });
  await page.waitForLoadState('networkidle');

  await cursos.pesquisar(NOME_VALIDO);
  await cursos.editar({ nome: NOME_EMOJI });
  await expect(page.getByText(ERRO_INVALIDO)).toBeVisible();

  await cursos.fecharDialogo();

  await cursos.excluir(NOME_VALIDO);
  await expect(page.getByText(NOME_VALIDO)).not.toBeVisible();
});