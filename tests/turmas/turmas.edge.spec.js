import { test, expect } from '@playwright/test';
import { TurmasPage } from '../../pages/TurmasPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

const CURSO = 'curso-1779898293684';

test.beforeEach(async ({ page }) => {
  const menu = new MenuPage(page);
  await menu.irParaTurmas();
});

test('Edge — criar turma com ano no passado é aceito', async ({ page }) => {
  const turmas = new TurmasPage(page);

  await turmas.criar({
    curso: CURSO,
    ano: '2006',
    serie: '4ª Série / 4º Semestre',
    turno: 'Integral',
    sala: '10',
    descricao: `g-edge-ano-passado-criar-${Date.now()}`,
  });

  await expect(page.getByText('Turma salva com sucesso')).toBeVisible();

  await turmas.excluir();
});

test('Edge — editar turma para ano no passado é aceito', async ({ page }) => {
  const turmas = new TurmasPage(page);

  await turmas.criar({
    curso: CURSO,
    ano: '2026',
    serie: '4ª Série / 4º Semestre',
    turno: 'Integral',
    sala: '10',
    descricao: `g-edge-ano-passado-editar-${Date.now()}`,
  });

  await turmas.editar({ ano: '2006' });
  await expect(page.getByText('Turma salva com sucesso')).toBeVisible();

  await turmas.excluir();
});