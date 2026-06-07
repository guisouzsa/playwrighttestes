import { test, expect } from '@playwright/test';
import { AvaliacaoPage } from '../../pages/AvaliacaoPage.js';

const DESCRICAO    = 'g-avalição-humanas-teste-edge';
const TURMA        = '1º C | Ensino Regular |';
const DATA_VALIDA  = '27/07/2026';
const DATA_PASSADO = '27/07/2006';
const ERRO_DATA    = 'Data de aplicação não pode';

test('Edge — avaliação com data no passado', async ({ page }) => {
  const avaliacao = new AvaliacaoPage(page);

  await avaliacao.menu.irParaAvaliacoes();
  await avaliacao.btnCriarAvaliacao.click();
  await avaliacao.inputDescricao.fill(DESCRICAO);
  await page.locator('div').filter({ hasText: /^Selecionar turmas$/ }).nth(2).click();
  await page.getByRole('option', { name: TURMA }).click();
  await page.keyboard.press('Escape');
  await page.getByText('Selecionar marcadores').click();
  await page.getByRole('option', { name: 'Avaliação Bimestral' }).click();
  await page.keyboard.press('Escape');
  await page.getByRole('combobox', { name: 'Forma ordenação: campo' }).click();
  await page.getByLabel('Misturar questões do bloco', { exact: true }).getByText('Misturar questões do bloco').click();
  await avaliacao.inputData.fill(DATA_PASSADO);
  await page.getByRole('button', { name: 'Professor' }).click();
  await page.getByText('E2e Super Teacher 20').click();
  await page.keyboard.press('Escape');
  await page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
  await page.getByRole('option', { name: 'Filosofia' }).click();
  await avaliacao.btnSalvar.click();
  await expect(page.getByText(ERRO_DATA)).toBeVisible();

  await avaliacao.inputData.fill(DATA_VALIDA);
  await avaliacao.btnSalvar.click();
  await page.waitForLoadState('networkidle');

  await avaliacao.pesquisar(DESCRICAO);
  await expect(page.getByText(DESCRICAO)).toBeVisible();

  await avaliacao.excluir(DESCRICAO);
  await expect(page.getByText(DESCRICAO)).not.toBeVisible();
});