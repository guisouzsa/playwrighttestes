import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { AreaPage } from '../../pages/AreaPage.js';

const NOME_VALIDO = 'g-area-teste';
const ERRO_VAZIO = 'Este campo é obrigatório';
const ERRO_DUPLICADO = 'Já existe uma área com o nome';

test.beforeEach(async ({ page }) => {
  await new MenuPage(page).irParaAreas();
});

test('não deve criar área com nome vazio', async ({ page }) => {
  const area = new AreaPage(page);

  await area.btnAdicionar.click();
  await area.btnSalvar.click();

  await expect(page.getByText(ERRO_VAZIO)).toBeVisible();

  await page.keyboard.press('Escape');
});

test('não deve criar área com nome duplicado', async ({ page }) => {
  const area = new AreaPage(page);

  await area.criar(NOME_VALIDO);
  await area.criar(NOME_VALIDO);

  await expect(page.getByText(ERRO_DUPLICADO)).toBeVisible();

  await page.keyboard.press('Escape');
  await area.excluir(NOME_VALIDO);
});