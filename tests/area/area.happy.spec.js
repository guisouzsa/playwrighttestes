import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { AreaPage } from '../../pages/AreaPage.js';

test('CRUD de Área', async ({ page }) => {
  const menu = new MenuPage(page);
  const area = new AreaPage(page);

  const nome = `g-teste-area-${Date.now()}`;
  const editado = `${nome}-editado`;

  await menu.irParaAreas();

  await area.criar(nome);
  await expect(page.getByText(nome)).toBeVisible({ timeout: 15000 });

  await area.pesquisar(nome);
  await area.editar(editado);
  await expect(page.getByText(editado)).toBeVisible({ timeout: 15000 });

  await area.excluir(editado);
  await expect(page.getByText(editado)).not.toBeVisible({ timeout: 15000 });
});