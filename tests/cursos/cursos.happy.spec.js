import { test, expect } from '@playwright/test';
import { CursosPage } from '../../pages/CursosPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

test('CRUD de Cursos', async ({ page }) => {
  const menu   = new MenuPage(page);
  const cursos = new CursosPage(page);

  const nome        = `g-teste-curso-${Date.now()}`;
  const nomeEditado = `${nome}-edit`;

  await menu.irParaCursos();

  await cursos.criar({ nome, nivel: 'Licenciatura' });
  await cursos.pesquisar(nome);
  await expect(page.getByText(nome)).toBeVisible();

  await cursos.editar({ nome: nomeEditado, nivel: 'Tecnólogo' });
  await cursos.pesquisar(nomeEditado);
  await expect(page.getByText(nomeEditado)).toBeVisible();

  await cursos.excluir(nomeEditado);
  await expect(page.getByText(nomeEditado)).not.toBeVisible();
});