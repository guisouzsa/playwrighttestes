import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { CursosPage } from '../../pages/CursosPage.js';
import { TurmasPage } from '../../pages/TurmasPage.js';

let nomeCurso;
let descricaoEditada;

test.afterEach(async ({ page }) => {
  const menu   = new MenuPage(page);
  const cursos = new CursosPage(page);
  const turmas = new TurmasPage(page);

  try {
    await menu.irParaTurmas();
    await turmas.excluir();
  } catch {}

  try {
    await menu.irParaCursos();
    await cursos.excluir(nomeCurso);
  } catch {}
});

test('CRUD de Turmas', async ({ page }) => {
  const menu   = new MenuPage(page);
  const cursos = new CursosPage(page);
  const turmas = new TurmasPage(page);

  const ts       = Date.now();
  nomeCurso      = `g-teste-curso-${ts}`;
  const sala           = `${ts}`;
  const salaEditada    = `${sala}-ed`;
  const descricao      = `g-d-${ts}`;
  descricaoEditada     = `g-de-${ts}`;

  await menu.irParaCursos();
  await cursos.criar({ nome: nomeCurso, nivel: 'Pós-Graduação' });

  await menu.irParaTurmas();

  await turmas.criar({
    curso: nomeCurso,
    ano: '2026',
    serie: '6ª Série / 6º Semestre',
    turno: 'Vespertino',
    sala,
    descricao,
  });
  await expect(page.getByText(nomeCurso)).toBeVisible();

  await turmas.cancelarExclusao();

  await turmas.editar({
    ano: '2027',
    serie: '5ª Série / 5º Semestre',
    turno: 'Noturno',
    descricao: descricaoEditada,
    sala: salaEditada,
  });
  await expect(page.getByText(descricaoEditada)).toBeVisible();

  await turmas.excluir();
  await expect(page.getByText(nomeCurso)).not.toBeVisible();

  await menu.irParaCursos();
  await cursos.excluir(nomeCurso);
});