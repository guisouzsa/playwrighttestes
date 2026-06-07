import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { ConteudoPage } from '../../pages/ConteudoPage.js';

test.describe('Sad Cases - Conteúdo', () => {

  test.beforeEach(async ({ page }) => {
    const menu = new MenuPage(page);
    await menu.irParaConteudos();
    await expect(page).toHaveURL(/conteudos/);
  });

  test('não deve criar conteúdo sem nome', async ({ page }) => {
    const conteudo = new ConteudoPage(page);

    await conteudo.btnAdicionar.click();
    await conteudo.btnSalvar.click();

    await expect(page.locator('#content-nome-error')).toHaveText('Este campo é obrigatório');
    await page.getByRole('button', { name: 'Close' }).click();
  });

  test('não deve criar conteúdo sem disciplina', async ({ page }) => {
    const conteudo = new ConteudoPage(page);

    await conteudo.btnAdicionar.click();
    await conteudo.inputNome.fill(`g-teste-conteudo-${Date.now()}`);
    await conteudo.btnSalvar.click();

    await expect(page.locator('#content-disciplina-error')).toHaveText('Este campo é obrigatório');
    await page.getByRole('button', { name: 'Close' }).click();
  });

  test('não deve criar conteúdo com caracteres especiais inválidos', async ({ page }) => {
    const conteudo = new ConteudoPage(page);

    await conteudo.btnAdicionar.click();
    await conteudo.inputNome.fill('%¨%&*¨%*&¨(%*&%$%#$%%%%#@!!!0');
    await conteudo.btnDisciplina.click();
    await page.getByRole('option', { name: 'Física', exact: true }).click();
    await conteudo.btnSalvar.click();

    await expect(
      page.getByText('Conteúdo inválido detectado na requisição.')
    ).toBeVisible({ timeout: 10000 });
  });

});