import { test, expect } from '@playwright/test';
import { AvaliacaoPage } from '../../pages/AvaliacaoPage.js';

test('CRUD Avaliação Objetiva ENEM - Filosofia', async ({ page }) => {
  const avaliacao = new AvaliacaoPage(page);

  const turma   = '1º C | Ensino Regular |';
  const nome    = `g-teste-objetiva-filosofia-${Date.now()}`;
  const editado = `${nome}-editado`;

  await avaliacao.criarObjetivo({ descricao: nome, turma, data: '27/06/2026' });
  await avaliacao.pesquisar(nome);
  await expect(page.getByText(nome)).toBeVisible();

  await avaliacao.editar(nome, editado, '30/06/2026');
  await avaliacao.pesquisar(editado);
  await expect(page.getByText(editado)).toBeVisible();

  await avaliacao.excluir(editado);
  await expect(page.getByText(editado)).not.toBeVisible();
});