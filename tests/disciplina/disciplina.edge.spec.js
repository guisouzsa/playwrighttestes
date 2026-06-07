import { test, expect } from '@playwright/test';
import { DisciplinaPage } from '../../pages/DisciplinaPage.js';
import { MenuPage } from '../../pages/MenuPage.js';

const NOME_VALIDO   = `g-disciplina-humanas-edge-${Date.now()}`;
const NOME_SQL      = "' UNION SELECT null, disciplinas, null FROM information_schema.tables --";
const ERRO_INVALIDO = 'Conteúdo inválido detectado';

test('Edge — disciplina com SQL injection', async ({ page }) => {
  const menu       = new MenuPage(page);
  const disciplina = new DisciplinaPage(page);

  await menu.irParaDisciplinas();

  await disciplina.criar(NOME_SQL, 'Ciências humanas e suas');
  await expect(page.getByText(ERRO_INVALIDO)).toBeVisible();

  await disciplina.criar(NOME_VALIDO, 'Ciências humanas e suas');
  await disciplina.pesquisar(NOME_VALIDO);
  await expect(page.getByText(NOME_VALIDO)).toBeVisible();

  await disciplina.editar(NOME_VALIDO, NOME_SQL);
  await expect(page.getByText(ERRO_INVALIDO)).toBeVisible();

  await disciplina.excluir(NOME_VALIDO);
  await expect(page.getByText(NOME_VALIDO)).not.toBeVisible();
});