import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { GrupoCorretoresPage } from '../../pages/GrupoCorretoresPage.js';

const GRUPO = 'g-teste-grupo-corretores';

test('CRUD de Grupos de Correção', async ({ page }) => {
    const menu = new MenuPage(page);
    const grupo = new GrupoCorretoresPage(page);

    await menu.irParaGruposDeCorrecao();

    await grupo.criar({
        nome: GRUPO,
        corretor: '#106 - E2e Super Teacher 37',
    });
    await expect(page.getByText(GRUPO)).toBeVisible();

    await grupo.editar({ nome: `${GRUPO} (editado)` });
    await expect(page.getByText(`${GRUPO} (editado)`)).toBeVisible();

    await grupo.excluir();
    await expect(page.getByText(`${GRUPO} (editado)`).first()).not.toBeVisible();
});