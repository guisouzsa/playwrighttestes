import { test, expect } from '@playwright/test';
import { CursosPage } from '../../pages/CursosPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

const NOME_VALIDO = `g-curso-teste-sad-${Date.now()}`;
const ERRO_VAZIO  = 'Este campo é obrigatório';

test('Sad — criar curso sem nome', async ({ page }) => {
  const menu   = new MenuPage(page);
  const cursos = new CursosPage(page);

  await menu.irParaCursos();

  await page.getByRole('button', { name: 'Adicionar Curso' }).click();
  await page.getByRole('button', { name: 'Nível de Escolaridade' }).click();
  await page.getByRole('option', { name: 'Extensão' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(ERRO_VAZIO)).toBeVisible();

  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(NOME_VALIDO);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  await cursos.pesquisar(NOME_VALIDO);
  await page.getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill('');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(ERRO_VAZIO)).toBeVisible();

  await page.getByRole('textbox', { name: 'Nome do Curso: *' }).fill(NOME_VALIDO);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  await cursos.excluir(NOME_VALIDO);
  await expect(page.getByText(NOME_VALIDO)).not.toBeVisible();
});