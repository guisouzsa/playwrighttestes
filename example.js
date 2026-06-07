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