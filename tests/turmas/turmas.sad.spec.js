import { test, expect } from '@playwright/test';
import { TurmasPage } from '../../pages/TurmasPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

const CURSO      = 'curso-1779898293684';
const SALA_LONGA = 'a'.repeat(21);
const ERRO_SALA  = 'O campo sala não pode ser';

test.beforeEach(async ({ page }) => {
  const menu = new MenuPage(page);
  await menu.irParaTurmas();
});

test('Sad — criar turma com sala acima do limite exibe erro', async ({ page }) => {
  const turmas = new TurmasPage(page);

  await turmas.criar({
    curso: CURSO,
    ano: '2026',
    serie: '4ª Série / 4º Semestre',
    turno: 'Integral',
    sala: SALA_LONGA,
    descricao: `g-sad-sala-criar-${Date.now()}`,
  });

  await expect(page.getByText(ERRO_SALA)).toBeVisible();
});

test('Sad — editar turma com sala acima do limite exibe erro', async ({ page }) => {
  const turmas = new TurmasPage(page);

  await turmas.criar({
    curso: CURSO,
    ano: '2026',
    serie: '4ª Série / 4º Semestre',
    turno: 'Integral',
    sala: '10',
    descricao: `g-sad-sala-editar-${Date.now()}`,
  });

  await turmas.editar({ sala: SALA_LONGA });
  await expect(page.getByText(ERRO_SALA)).toBeVisible();

  await turmas.excluir();
});