import { test, expect } from '@playwright/test';
import { DisciplinaPage } from '../../pages/DisciplinaPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

test('CRUD de Disciplina', async ({ page }) => {
  const menu       = new MenuPage(page);
  const disciplina = new DisciplinaPage(page);

  const nome    = `g-teste-disciplina-${Date.now()}`;
  const editado = `${nome}-editado`;

  await menu.irParaDisciplinas();

  await disciplina.criar(nome, 'Ciências humanas e suas');
  await disciplina.pesquisar(nome);
  await expect(page.getByText(nome)).toBeVisible();

  await disciplina.editar(nome, editado);
  await disciplina.pesquisar(editado);
  await expect(page.getByText(editado)).toBeVisible();

  await disciplina.excluir(editado);
  await expect(page.getByText(editado)).not.toBeVisible();
});