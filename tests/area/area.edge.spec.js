import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { AreaPage } from '../../pages/AreaPage.js';

const NOME_VALIDO = 'g-area-teste';
const SQL_INJECTION = "' OR '1'='1";
const ERRO_INVALIDO = 'Conteúdo inválido detectado';

test.beforeEach(async ({ page }) => {
  await new MenuPage(page).irParaAreas();
});

test('não deve criar área com SQL injection', async ({ page }) => {
  const area = new AreaPage(page);

  await area.criar(SQL_INJECTION);

  await expect(
    page.getByRole('alert').filter({ hasText: ERRO_INVALIDO })
  ).toBeVisible();

  await page.keyboard.press('Escape');
});

test('não deve editar área com SQL injection', async ({ page }) => {
  const area = new AreaPage(page);

  await area.criar(NOME_VALIDO);
  await area.pesquisar(NOME_VALIDO);
  await area.editar(SQL_INJECTION);

  await expect(
    page.getByRole('alert').filter({ hasText: ERRO_INVALIDO })
  ).toBeVisible();

  await page.keyboard.press('Escape');
  await area.excluir(NOME_VALIDO);
});