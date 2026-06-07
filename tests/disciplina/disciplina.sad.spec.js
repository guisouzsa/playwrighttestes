import { test, expect } from '@playwright/test';
import { DisciplinaPage } from '../../pages/DisciplinaPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

const NOME_VALIDO = `g-disciplina-humanas-sad-${Date.now()}`;
const NOME_LONGO  = 'a'.repeat(126);
const ERRO_LONGO  = 'O campo nome da disciplina nã';

test('Sad — disciplina com nome acima do limite de caracteres', async ({ page }) => {
  const menu       = new MenuPage(page);
  const disciplina = new DisciplinaPage(page);

  await menu.irParaDisciplinas();

  await disciplina.criar(NOME_LONGO, 'Ciências humanas e suas');
  await expect(page.getByText(ERRO_LONGO)).toBeVisible();

  await disciplina.criar(NOME_VALIDO, 'Ciências humanas e suas');
  await disciplina.pesquisar(NOME_VALIDO);
  await expect(page.getByText(NOME_VALIDO)).toBeVisible();

  await disciplina.editar(NOME_VALIDO, NOME_LONGO);
  await expect(page.getByText(ERRO_LONGO)).toBeVisible();

  await disciplina.excluir(NOME_VALIDO);
  await expect(page.getByText(NOME_VALIDO)).not.toBeVisible();
});