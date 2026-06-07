import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { ConteudoPage } from '../../pages/ConteudoPage.js';

test.describe('Edge Cases - Conteúdo', () => {

  test('não deve salvar conteúdo com nome extremamente longo contendo caracteres inválidos', async ({ page }) => {
    const menu = new MenuPage(page);
    const conteudo = new ConteudoPage(page);

    const nomeInvalido = 'A'.repeat(150) + '<script>alert("xss")</script>';

    await menu.irParaConteudos();
    await conteudo.btnAdicionar.click();
    await conteudo.inputNome.fill(nomeInvalido);
    await conteudo.btnDisciplina.click();
    await page.getByRole('option', { name: 'Química', exact: true }).click();
    await conteudo.btnSalvar.click();

    await expect(
      page.getByText('Conteúdo inválido detectado. Apenas letras, números e formatação básica são permitidos.')
    ).toBeVisible({ timeout: 10000 });
  });

  test('não deve salvar conteúdo com código JavaScript injetado', async ({ page }) => {
    const menu = new MenuPage(page);
    const conteudo = new ConteudoPage(page);

    const nomeInvalido = `<script>alert('xss')</script>`;

    await menu.irParaConteudos();
    await conteudo.btnAdicionar.click();
    await conteudo.inputNome.fill(nomeInvalido);
    await conteudo.btnDisciplina.click();
    await page.getByRole('option', { name: 'Química', exact: true }).click();
    await conteudo.btnSalvar.click();

    await expect(
      page.getByText('Conteúdo inválido detectado. Apenas letras, números e formatação básica são permitidos.')
    ).toBeVisible({ timeout: 10000 });
  });

});