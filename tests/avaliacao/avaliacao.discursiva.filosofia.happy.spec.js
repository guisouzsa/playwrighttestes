import { test, expect } from '@playwright/test';
import { AvaliacaoPage } from '../../pages/AvaliacaoPage.js';

test('CRUD Avaliação Discursiva - Filosofia', async ({ page }) => {
  const avaliacao = new AvaliacaoPage(page);

  const turma   = '1º C | Ensino Regular |';
  const nome    = `g-teste-discursiva-filosofia-${Date.now()}`;
  const editado = `${nome}-editado`;

  await avaliacao.criarDiscursiva({ descricao: nome, turma, data: '26/06/2026' });
  await expect(
    page.getByRole('row').filter({ hasText: nome })
  ).toBeVisible({ timeout: 15000 });

  await avaliacao.editar(nome, editado, '30/06/2026');
  await avaliacao.pesquisar(editado);
  await expect(
    page.getByRole('row').filter({ hasText: editado })
  ).toBeVisible({ timeout: 15000 });

  await avaliacao.excluir(editado);
  await expect(
    page.getByRole('row').filter({ hasText: editado })
  ).not.toBeVisible({ timeout: 15000 });
});