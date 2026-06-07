import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { GrupoCorretoresPage } from '../../pages/GrupoCorretoresPage.js';

const NOME_VALIDO   = 'g-edge-grupo-corretores';
const SQL_INJECTION = `' OR '1'='1`;
const ERRO_INVALIDO = 'Conteúdo inválido detectado';

test.beforeEach(async ({ page }) => {
  await new MenuPage(page).irParaGruposDeCorrecao();
});

test('Edge — SQL injection no nome é bloqueado', async ({ page }) => {
  const grupo = new GrupoCorretoresPage(page);

  await page.getByRole('button', { name: 'Adicionar grupo de corretores' }).click();
  await page.getByRole('textbox', { name: 'Nome do Grupo: *' }).fill(SQL_INJECTION);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(ERRO_INVALIDO)).toBeVisible();

  await page.getByRole('button', { name: 'Adicionar grupo de corretores' }).click();
  await page.getByRole('textbox', { name: 'Nome do Grupo: *' }).fill(NOME_VALIDO);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.waitForLoadState('networkidle');

  await page.locator('tr, li, [role="listitem"], [role="row"]')
    .filter({ hasText: NOME_VALIDO })
    .getByRole('button').last().click();
  await page.getByRole('menuitem', { name: 'Editar' }).click();
  await page.getByRole('textbox', { name: 'Nome do Grupo: *' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Nome do Grupo: *' }).fill(SQL_INJECTION);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText(ERRO_INVALIDO)).toBeVisible();

  await page.keyboard.press('Escape');
  await grupo.excluirPorNome(NOME_VALIDO);
  await expect(page.getByText(NOME_VALIDO)).not.toBeVisible();
});