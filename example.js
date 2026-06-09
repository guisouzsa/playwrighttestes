// PS C:\Users\gui\playavaliei\meus-testes> npx playwright test

// Running 35 tests using 1 worker
//   1) [chromium] › tests\questoes\questoes-discursiva.spec.js:7:1 › Questão Discursiva — criar, editar e excluir 

//     Test timeout of 300000ms exceeded.

//     Error: locator.click: Test timeout of 300000ms exceeded.
//     Call log:
//       - waiting for getByRole('button', { name: 'Voltar' })


//        at ..\pages\QuestoesPage.js:40

//       38 |         await this.page.getByRole('option', { name: disciplina, exact: true }).click();
//       39 |         await this.btnSalvar.click();
//     > 40 |         await this.page.getByRole('button', { name: 'Voltar' }).click();
//          |                                                                 ^
//       41 |     }
//       42 |
//       43 |     async criarQuestaoDiscursiva({ banca, ano, nivel, disciplina, conteudo, enunciado }) {
//         at QuestoesPage.criarConteudo (C:\Users\gui\playavaliei\meus-testes\pages\QuestoesPage.js:40:65)
//         at QuestoesPage.criarQuestaoDiscursiva (C:\Users\gui\playavaliei\meus-testes\pages\QuestoesPage.js:46:9)
//         at C:\Users\gui\playavaliei\meus-testes\tests\questoes\questoes-discursiva.spec.js:12:5

//     Error Context: test-results\questoes-questoes-discursi-75171-va-—-criar-editar-e-excluir-chromium\error-context.md

//   2) [chromium] › tests\questoes\questoes-manual.happy.spec.js:8:1 › Questão Manual — criar, editar e excluir 

//     Test timeout of 300000ms exceeded.

//     Error: locator.click: Test timeout of 300000ms exceeded.
//     Call log:
//       - waiting for getByRole('row').filter({ hasText: 'g-discursiva-importa-manual-teste-associação-resistores' }).first().getByRole('button', { name: 'Excluir', exact: true })


//        at ..\pages\QuestoesPage.js:123

//       121 |         const row = this.page.getByRole('row').filter({ hasText: nome }).first();
//       122 |         await row.waitFor({ state: 'visible', timeout: 15000 });
//     > 123 |         await row.getByRole('button', { name: 'Excluir', exact: true }).click();
//           |                                                                         ^
//       124 |
//       125 |         const modal = this.page.getByRole('dialog');
//       126 |         await modal.waitFor({ state: 'visible' });
//         at QuestoesPage.excluirConteudoNaPagina (C:\Users\gui\playavaliei\meus-testes\pages\QuestoesPage.js:123:73)
//         at C:\Users\gui\playavaliei\meus-testes\tests\questoes\questoes-manual.happy.spec.js:51:5

//     Error Context: test-results\questoes-questoes-manual.h-c683a-al-—-criar-editar-e-excluir-chromium\error-context.md

//   3) [chromium] › tests\redacao\redacao.happy.spec.js:13:1 › CRUD de Redação 

//     Test timeout of 300000ms exceeded.

//     Error: locator.click: Test timeout of 300000ms exceeded.
//     Call log:
//       - waiting for getByRole('option').filter({ hasText: '106' }).first()


//        at ..\pages\GrupoCorretoresPage.js:40

//       38 |         const numero = this.#extrairNumeroCorretor(corretor);
//       39 |         await this.page.getByPlaceholder('Buscar...').fill(numero);
//     > 40 |         await this.page.getByRole('option').filter({ hasText: numero }).first().click();
//          |                                                                                 ^
//       41 |
//       42 |         await this.btnSalvar.click();
//       43 |         await this.page.waitForLoadState('networkidle');
//         at GrupoCorretoresPage.criar (C:\Users\gui\playavaliei\meus-testes\pages\GrupoCorretoresPage.js:40:81)
//         at C:\Users\gui\playavaliei\meus-testes\tests\redacao\redacao.happy.spec.js:20:3

//     Error Context: test-results\redacao-redacao.happy-CRUD-de-Redação-chromium\error-context.md

//   Slow test file: [chromium] › tests\turmas\turmas.edge.spec.js (5.4m)
//   Slow test file: [chromium] › tests\redacao\redacao.happy.spec.js (5.1m)  Slow test file: [chromium] › tests\questoes\questoes-discursiva.spec.js (5.0m)
//   Slow test file: [chromium] › tests\questoes\questoes-manual.happy.spec.js (5.0m)
//   Consider running tests from slow files in parallel. See: https://playwright.dev/docs/test-parallel
//   3 failed
//     [chromium] › tests\questoes\questoes-discursiva.spec.js:7:1 › Questão Discursiva — criar, editar e excluir 
//     [chromium] › tests\questoes\questoes-manual.happy.spec.js:8:1 › Questão Manual — criar, editar e excluir 
//     [chromium] › tests\redacao\redacao.happy.spec.js:13:1 › CRUD de Redação 
//   32 passed (43.4m)

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.








// =============================================================================
// COMANDOS PLAYWRIGHT
// =============================================================================

// Rodar todos os testes no Chromium (headless)
// npm test

// Rodar vendo o browser, 1 por vez, com detalhes no terminal
// npm run test:headed

//npx playwright test tests/redacao/redacao.happy.spec.js
//roda o teste especificado apenas no chromium(config foi especificado que deve rodar apenas no chromium)

// Rodar com debug (abre Playwright Inspector, pausa em cada ação)
// npm run test:debug

// Rodar apenas um domínio específico
// npx playwright test tests/area --project=chromium --headed --workers=1 --reporter=list

// Rodar com codegen (grava ações e gera código automaticamente)
// npx playwright codegen https://app.avaliei.com.br/login

// Ver relatório HTML após execução
// npx playwright show-report

// Abrir interface visual interativa
// npx playwright test --ui

// =============================================================================
// FLAGS E O QUE CADA UMA FAZ
// =============================================================================

// --project=chromium   Roda apenas no Chromium (Chrome). Opções: firefox, webkit
// --headed             Abre o browser visualmente (sem isso roda invisível)
// --workers=1          Roda 1 teste por vez, em sequência (sem paralelismo)
// --reporter=list      Mostra cada passo do teste no terminal em tempo real
// --debug              Abre o Playwright Inspector para depurar passo a passo
// --max-failures=0     Não para ao encontrar falha, roda todos até o fim
// --retries=2          Tenta rodar o teste novamente X vezes se falhar

// =============================================================================
// SCRIPTS DO PACKAGE.JSON
// =============================================================================

// npm test             → playwright test --project=chromium
// npm run test:headed  → playwright test --project=chromium --headed --workers=1 --reporter=list
// npm run test:debug   → playwright test --project=chromium --headed --workers=1 --reporter=list --debug

// =============================================================================
// COMANDOS GIT
// =============================================================================

// Configuracao inicial (rodar 1x):
// git config --global user.name "guisouzsa"
// git config --global user.email "guilherme.souza103@gmail.com"
// git config --global credential.helper store

// Workflow padrao:
// git add .
// git commit -m "feat: descricao do que foi feito"
// git push

// Convencoes de commit:
// feat:     nova funcionalidade
// fix:      correcao de bug
// refactor: reorganizacao de codigo sem mudar comportamento
// test:     adicao ou atualizacao de testes
// docs:     documentacao
// chore:    tarefas auxiliares (config, dependencias)

// =============================================================================
// FLUXO DE AUTENTICACAO
// =============================================================================

// 1. O auth.setup.js roda antes de todos os testes
//    - Le EMAIL, PASS e TOTP_SECRET do arquivo .env
//    - Faz login + gera codigo TOTP automaticamente
//    - Salva a sessao em .auth/user.json

// 2. Todos os outros testes reutilizam essa sessao
//    - Nao precisam fazer login novamente
//    - playwright.config.js injeta storageState automaticamente

// =============================================================================
// BOAS PRATICAS DE SELETORES
// =============================================================================

// Usar (robusto):
// page.getByRole('button', { name: 'Salvar' })
// page.getByRole('textbox', { name: 'Nome' })
// page.getByText('Excluir')
// page.getByPlaceholder('Pesquisar...')

// Evitar (fragil):
// page.locator('#radix-_r_9q_')              IDs dinamicos mudam a cada render
// page.locator('div.container > button:nth-child(2)')   Quebra com mudancas de layout