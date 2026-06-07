import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage.js';
import { ConteudoPage } from '../../pages/ConteudoPage.js';

test('CRUD de Conteúdo', async ({ page }) => {
    const menu = new MenuPage(page);
    const conteudo = new ConteudoPage(page);

    const nome = `g-teste-conteudo-${Date.now()}`;
    const editado = `${nome}-editado`;

    await menu.irParaConteudos();
    await conteudo.criar(nome, 'Química');
    await expect(page.getByText(nome)).toBeVisible({ timeout: 15000 });

    await conteudo.editar(nome, editado);
    await expect(page.getByText(editado)).toBeVisible({ timeout: 15000 });

    await conteudo.excluir(editado);
    await expect(page.getByText(editado)).not.toBeVisible({ timeout: 15000 });
});