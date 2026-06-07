import { test, expect } from '@playwright/test';
import { AvaliacaoPage } from '../../pages/AvaliacaoPage.js';

const DESCRICAO   = 'g-avaliação-humanas-teste-sad';
const TURMA       = '1º C | Ensino Regular |';
const DATA_VALIDA = '27/06/2026';
const ERRO_TURMA  = 'Selecione pelo menos uma turma';

test('Sad — avaliação sem turma selecionada', async ({ page }) => {
  const avaliacao = new AvaliacaoPage(page);

  await avaliacao.menu.irParaAvaliacoes();
  await avaliacao.btnCriarAvaliacao.click();
  await avaliacao.inputDescricao.fill(DESCRICAO);
  await page.getByText('Selecionar marcadores').click();
  await page.getByRole('option', { name: 'Avaliação Bimestral' }).click();
  await page.keyboard.press('Escape');
  await page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
  await page.getByLabel('Misturar questões do bloco', { exact: true }).getByText('Misturar questões do bloco').click();
  await page.getByRole('combobox', { name: 'Qtd. ordenações: campo' }).click();
  await page.getByRole('option', { name: '(Azul | Branco)' }).click();
  await avaliacao.inputData.fill(DATA_VALIDA);
  await page.getByRole('button', { name: 'Professor' }).click();
  await page.getByText('E2e Super Teacher 20').click();
  await page.keyboard.press('Escape');
  await page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
  await page.getByLabel('Filosofia').getByText('Filosofia').click();
  await avaliacao.btnSalvar.click();
  await expect(page.getByText(ERRO_TURMA)).toBeVisible();

  await page.locator('div').filter({ hasText: /^Selecionar turmas$/ }).nth(2).click();
  await page.getByRole('option', { name: TURMA }).click();
  await page.keyboard.press('Escape');
  await avaliacao.btnSalvar.click();
  await page.waitForLoadState('networkidle');

  await avaliacao.pesquisar(DESCRICAO);
  await expect(page.getByText(DESCRICAO)).toBeVisible();

  await avaliacao.excluir(DESCRICAO);
  await expect(page.getByText(DESCRICAO)).not.toBeVisible();
});