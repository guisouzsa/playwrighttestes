import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { GrupoCorretoresPage } from '../../pages/GrupoCorretoresPage.js';

const CORRETOR   = '#106 - E2e Super Teacher 37';
const ERRO_VAZIO = 'Este campo é obrigatório';

test.beforeEach(async ({ page }) => {
  await new MenuPage(page).irParaGruposDeCorrecao();
});

test('não deve criar grupo com nome vazio', async ({ page }) => {
  await page.getByRole('button', { name: 'Adicionar grupo de corretores' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();

  await expect(page.getByText(ERRO_VAZIO)).toBeVisible();

  await page.keyboard.press('Escape');
});

test('Sad — corretor já cadastrado não aparece na busca ao adicionar novamente', async ({ page }) => {
  const grupo = new GrupoCorretoresPage(page);
  const nome  = `g-sad-duplicado-${Date.now()}`;

  await grupo.criar({ nome, corretor: CORRETOR });

  await page.locator('tr, li, [role="listitem"], [role="row"]')
    .filter({ hasText: nome })
    .getByRole('button').last().click();
  await page.getByRole('menuitem', { name: 'Ver participantes' }).click();
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

  await page.getByRole('button', { name: 'Adicionar membro' }).click();
  await page.getByRole('button', { name: 'Professor' }).click();
  await page.getByPlaceholder('Buscar...').waitFor({ state: 'visible' });
  await page.getByPlaceholder('Buscar...').fill(CORRETOR);

  await expect(
    page.getByRole('listbox', { name: 'Suggestions' }).getByText('Nenhum resultado encontrado.')
  ).toBeVisible();

  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Opções' }).click();
  await page.getByRole('menuitem', { name: 'Excluir' }).click();
  await page.getByRole('button', { name: 'Excluir' }).click();
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

  await page.getByRole('button', { name: 'Ir para grupos de corretores' }).click();
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
});