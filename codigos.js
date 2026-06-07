

<!-- 
========================================================================
  PROJETO DE TESTES E2E — PLAYWRIGHT + POM + TOTP + DOTENV
========================================================================

  Nível do Projeto: Avançado (Profissional/Júnior)
  Tech Stack: Playwright, Page Object Model, TOTP, Environment Variables
  Status: ✅ Estrutura base implementada e funcional

======================================================================== -->

<!-- 
========================================================================
  1. COMANDOS PLAYWRIGHT (PRIORIDADE 1)
========================================================================
-->

<!--
RESUMO DOS COMANDOS PRINCIPAIS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Rodar Setup de Autenticação (Executar 1x por projeto):
npx playwright test --project=setup

   ✓ Cria arquivo .auth/user.json com sessão autenticada
   ✓ Executa login global (email + password + TOTP)
   ✓ Reutilizado por todos os testes posteriores

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Rodar Todos os Testes (Modo Headless - CI/CD):
npx playwright test

   ✓ Executa todos os testes em paralelo
   ✓ Sem interface gráfica
   ✓ Mais rápido, ideal para pipeline

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Rodar Testes em Modo Interativo (com navegador):
npx playwright test --ui

   ✓ Abre interface visual
   ✓ Pode pausar e debugar
   ✓ Ver cada passo em tempo real

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Rodar Teste Específico (com argumentos):
npx playwright test tests/redacao --project=chromium --headed --workers=1

   --headed        = Mostrar navegador (não headless)
   --workers=1     = Executar 1 teste por vez (sem paralelismo)
   --project       = Especificar browser (chromium|firefox|webkit)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Rodar com Reporter Detalhado (vê cada passo):
npx playwright test tests/redacao --project=chromium --headed --workers=1 --reporter=list

   --reporter=list = Lista cada ação no terminal
   Mais verboso: mostra o que está sendo executado

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Rodar Múltiplos Browsers Simultaneamente:
npx playwright test tests/questoes --headed --workers=2 --project=chromium

   --workers=2     = Roda 2 testes em paralelo
   ✓ Mais rápido quando há testes independentes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Visualizar Relatório HTML (após execução):
npx playwright show-report

   ✓ Abre relatório interativo no navegador
   ✓ Mostra screenshots e videos
   ✓ Ideal para análise pós-testes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Modo Debug (passo a passo com debugger):
npx playwright test tests/redacao --debug

   ✓ Abre DevTools do Playwright
   ✓ Permite executar linha por linha
   ✓ Ideal para resolver bugs complexos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Gerar Testes Automaticamente (Codegen):
npx playwright codegen https://app.avaliei.com.br

   ✓ Abre interface para gravar ações
   ✓ Gera código automaticamente
   ⚠️ Requer limpeza posterior (remover código redundante)

-->

<!-- 
========================================================================
  2. COMANDOS GIT (PRIORIDADE 2)
========================================================================
-->

<!--
CONFIGURAÇÃO INICIAL (Executar 1x):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

git config --global user.name "guisouzsa"
git config --global user.email "guilherme.souza103@gmail.com"
git config --global credential.helper store

   ✓ Configura identidade global
   ✓ Salva credenciais (não precisa digitar a cada push)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WORKFLOW PADRÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1) Adicionar alterações:
   git add .

2) Commitar com mensagem descritiva:
   git commit -m "feat: adiciona testes para grupos de corretores"

3) Enviar para repositório remoto:
   git push origin master

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOAS PRÁTICAS DE COMMIT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ feat:    nova funcionalidade
✓ fix:     correção de bug
✓ refactor: reorganização de código
✓ test:    adição/atualização de testes
✓ docs:    documentação
✓ chore:   tarefas auxiliares

Exemplo:
git commit -m "refactor: modulariza testes de redação em specs separadas"

-->

<!-- 
========================================================================
  3. ESTRUTURA DO PROJETO
========================================================================
-->

<!--
ÁRVORE DE DIRETÓRIOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

meus-testes/
│
├── pages/
│   ├── LoginPage.js           → Login com email + password
│   ├── TotpPage.js            → Autenticação TOTP (2FA)
│   ├── MenuPage.js            → Navegação principal
│   ├── AreaPage.js            → CRUD de Áreas
│   ├── DisciplinaPage.js      → CRUD de Disciplinas
│   ├── ConteudoPage.js        → CRUD de Conteúdos
│   ├── CursosPage.js          → CRUD de Cursos
│   ├── QuestoesPage.js        → CRUD de Questões
│   ├── GrupoCorretoresPage.js → CRUD de Grupos Corretores
│   ├── RedacaoPage.js         → CRUD de Redações
│   └── TurmasPage.js          → CRUD de Turmas
│
├── tests/
│   ├── auth/
│   │   └── auth.setup.js          → ⭐ Setup global (login 1x)
│   ├── area/
│   │   └── area.happy.spec.js     → Testes de Área
│   ├── conteudo/
│   │   └── conteudo.happy.spec.js → Testes de Conteúdo
│   ├── cursos/
│   │   └── cursos.happy.spec.js   → Testes de Cursos
│   ├── disciplina/
│   │   └── disciplina.happy.spec.js
│   ├── grupos-corretores/
│   │   └── grupos-corretores.happy.spec.js
│   ├── questoes/
│   │   ├── questoes-discursiva.spec.js
│   │   ├── questoes-import.happy.spec.js
│   │   └── questoes-manual.happy.spec.js
│   ├── redacao/
│   │   └── redacao.happy.spec.js
│   └── turmas/
│       └── turmas.happy.spec.js
│
├── .auth/
│   └── user.json              → 💾 Sessão salva (gerada automaticamente)
│
├── playwright-report/
│   ├── index.html             → Relatório HTML
│   └── data/                  → Dados dos testes (screenshots, vídeos)
│
├── test-results/              → Resultados brutos JSON
│
├── .env                       → ⚠️ Variáveis sensíveis (NÃO commitar)
├── .gitignore                 → Arquivo para ignorar .env, node_modules
├── package.json               → Dependências do projeto
├── playwright.config.js       → Configuração central Playwright
└── codigos.html               → Este arquivo (documentação)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

O QUE CADA ARQUIVO FAZ:

📄 .env (EXEMPLO):
   EMAIL=e2e-super-teacher@example.com
   PASS=password
   TOTP_SECRET=ABC123XYZ

   ✓ Segurança (não expõe credenciais no Git)
   ✓ Facilita troca de ambiente (dev/staging/prod)

📄 playwright.config.js:
   ✓ Configuração central de browsers
   ✓ Timeout, retries, paralelismo
   ✓ Projeto "setup" + projetos reais (chromium, firefox, webkit)
   ✓ storageState: reutiliza sessão autenticada

📄 auth.setup.js:
   ✓ Executado UMA VEZ antes de todos os testes
   ✓ Login + TOTP automático
   ✓ Salva sessão em .auth/user.json
   ✓ Outros testes reutilizam essa sessão

📄 Page Objects (LoginPage, CursosPage, etc):
   ✓ Centralizam seletores e ações
   ✓ Reutilizáveis em múltiplos testes
   ✓ Fácil de manter (trocar seletor uma vez afeta tudo)

-->

<!-- 
========================================================================
  4. ARQUITETURA E PADRÕES IMPLEMENTADOS
========================================================================
-->

<!--
PADRÃO PAGE OBJECT MODEL (POM):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Exemplo LoginPage.js:
━━━━━━━━━━━━━━━━━━

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Senha' });
    this.enterButton = page.getByRole('button', { name: 'Entrar' });
  }

  async preencherEmail(email) {
    await this.emailInput.fill(email);
  }

  async preencherSenha(senha) {
    await this.passwordInput.fill(senha);
  }

  async clicarEntrar() {
    await this.enterButton.click();
  }
}

Benefícios:
✓ Seletores centralizados (fácil manutenção)
✓ Métodos descritivos (código legível)
✓ Reutilização entre testes
✓ Reduz duplicação

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE OBJECTS (DETALHADO - O QUE CADA UM FAZ):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 LoginPage.js
   Responsabilidade: Autenticação inicial
   ├─ preencherEmail(email)      → Preenche campo de email
   ├─ preencherSenha(senha)      → Preenche campo de senha
   ├─ clicarEntrar()             → Clica no botão "Entrar"
   └─ aguardarCarregamento()     → Aguarda página carregar
   
   Uso: auth.setup.js faz login inicial com essas ações

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 TotpPage.js (Two-Factor Authentication)
   Responsabilidade: Autenticação 2FA (2 fatores)
   ├─ preencherCodigoTotp(codigo) → Preenche código de 6 dígitos
   ├─ clicarVerificar()           → Clica em "Verificar código"
   ├─ gerarCodigoAutomatico()     → Gera TOTP via totp-generator (automático)
   └─ aguardarValidacao()         → Aguarda validação 2FA
   
   Uso: auth.setup.js gera código TOTP automaticamente com totp-generator
   Dependência: totp-generator (lib externa)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 MenuPage.js
   Responsabilidade: Navegação principal entre seções
   ├─ irParaRedacoes()           → Navega para seção de Redações
   ├─ irParaTurmas()             → Navega para seção de Turmas
   ├─ irParaCursos()             → Navega para seção de Cursos
   ├─ irParaGruposDeCorrecao()   → Navega para Grupos Corretores
   ├─ irParaAreas()              → Navega para seção de Áreas
   ├─ irParaDisciplinas()        → Navega para seção de Disciplinas
   ├─ irParaConteudos()          → Navega para seção de Conteúdos
   └─ irParaQuestoes()           → Navega para seção de Questões
   
   Uso: Todos os testes usam MenuPage para navegar
   Padrão: Evita hardcodar URLs, centraliza navegação

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 CursosPage.js
   Responsabilidade: CRUD de Cursos
   ├─ criar({ nome, descricao })      → Cria novo curso
   ├─ editar({ nome, descricao })     → Edita curso existente
   ├─ excluir()                        → Deleta curso
   └─ buscar(nomeCurso)               → Busca curso por nome
   
   Padrão: Armazena this._nomeAtual para garantir que deleta o certo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 TurmasPage.js (⭐ RECENTEMENTE REFATORADO)
   Responsabilidade: CRUD de Turmas (grupos de alunos)
   ├─ criar({ curso, ano, serie, turno, sala, descricao })
   │  └─ Armazena descricao em this._descricaoAtual para segurança
   ├─ editar({ ano, serie, turno, sala, descricao })
   ├─ excluir()                 → Deleta apenas a turma criada
   └─ cancelarExclusao()        → Cancela exclusão
   
   Segurança: Usa #abrirMenu(descricao) para buscar turma específica
   Resultado: Não deleta outras turmas (ex: "informatica")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 DisciplinaPage.js
   Responsabilidade: CRUD de Disciplinas
   ├─ criar({ nome, descricao })
   ├─ editar({ nome, descricao })
   ├─ excluir()
   └─ buscar(nomeDisciplina)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 AreaPage.js
   Responsabilidade: CRUD de Áreas (agrupamento de disciplinas)
   ├─ criar({ nome })
   ├─ editar({ nome })
   ├─ excluir()
   └─ buscar(nomeArea)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 ConteudoPage.js
   Responsabilidade: CRUD de Conteúdos (materiais de estudo)
   ├─ criar({ titulo, descricao, disciplina })
   ├─ editar({ titulo, descricao })
   ├─ excluir()
   └─ importarDoIA()

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 QuestoesPage.js
   Responsabilidade: CRUD de Questões (avaliações)
   ├─ criar({ titulo, tipo, conteudo, opcoes })
   │  └─ tipo: 'objetiva' | 'discursiva' | 'multipla'
   ├─ editar({ titulo, conteudo })
   ├─ excluir()
   ├─ importarDoIA()
   └─ importarManual(arquivo)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 RedacaoPage.js
   Responsabilidade: CRUD de Redações (produção textual)
   ├─ criar({ titulo, matriz, turma, grupo, dataEntrega, tema, textos })
   │  └─ Armazena titulo em this._tituloAtual
   ├─ editar({ titulo, dataEntrega, tema, textos })
   ├─ excluir()      → Deleta apenas redação criada
   └─ visualizar()

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 GrupoCorretoresPage.js (⭐ EXEMPLO DE BEST PRACTICE)
   Responsabilidade: CRUD de Grupos de Corretores
   ├─ criar({ nome, corretor })
   │  └─ Armazena nome em this._nomeAtual (SEGURO!)
   ├─ editar({ nome })
   ├─ excluir()      → Deleta apenas grupo criado (não "libero")
   └─ adicionarMembro()
   
   Padrão: Usa método #abrirMenu(nome) para filtro específico
   Resultado: Nunca deleta grupos existentes por acidente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 FLUXO DE DADOS ENTRE PAGE OBJECTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Teste redacao.happy.spec.js:
┌─────────────────────────────────────────────────────────┐
│ const menu = new MenuPage(page);                         │
│ const grupo = new GrupoCorretoresPage(page);            │
│ const turmas = new TurmasPage(page);                    │
│ const redacao = new RedacaoPage(page);                  │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│ 1. menu.irParaGruposDeCorrecao()                         │
│    grupo.criar({ nome: 'g-redacao', corretor: '#106' }) │
│    └─ Armazena em grupo._nomeAtual = 'g-redacao'       │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│ 2. menu.irParaTurmas()                                  │
│    turmas.criar({ curso, ano, serie, sala: '08' })     │
│    └─ Armazena em turmas._descricaoAtual = 'DS'        │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│ 3. menu.irParaRedacoes()                                │
│    redacao.criar({ titulo, turma, grupo, tema })       │
│    └─ Armazena em redacao._tituloAtual = 'titulo'      │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│ CLEANUP (afterEach):                                    │
│ redacao.excluir() → Deleta apenas 'titulo' (seguro!)   │
│ turmas.excluir()  → Deleta apenas 'DS' (seguro!)       │
│ grupo.excluir()   → Deleta apenas 'g-redacao' (seguro!)│
└─────────────────────────────────────────────────────────┘

→ Resultado: Nenhuma turma "informatica" ou grupo "libero" é deletado!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FLUXO DE AUTENTICAÇÃO GLOBAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  Primeira Execução: npx playwright test --project=setup
    ├─ Lê .env (EMAIL, PASS, TOTP_SECRET)
    ├─ Acessa login
    ├─ Preenche email + password
    ├─ Gera código TOTP automaticamente
    ├─ Verifica código (2FA)
    ├─ Salva sessão em .auth/user.json
    └─ ✅ Próximo comando reutiliza essa sessão

2️⃣  Execuções Posteriores: npx playwright test
    ├─ Lê .auth/user.json
    ├─ Reutiliza cookies/tokens
    ├─ Não precisa fazer login novamente
    └─ ✅ Testes rodam 10x mais rápido

Benefícios:
✓ Setup apenas 1x (mais rápido)
✓ Menos flakiness (2FA automático)
✓ Facilita CI/CD
✓ Reduz carga no servidor

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GERAÇÃO AUTOMÁTICA DE TOTP:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bibliotecas:
- totp-generator: gera códigos TOTP
- createRequire(): importa módulos CommonJS em ES Modules

Lógica:
✓ Verifica tempo restante do token (evita token expirado)
✓ Aguarda novo token se está prestes a expirar
✓ Gera código seguro e automático

Resultado:
✓ Testes 2FA funcionam sem intervenção manual
✓ Sem hardcoding de códigos fixos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ORGANIZAÇÃO POR DOMÍNIO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

tests/
├── auth/          → Autenticação (setup global)
├── area/          → Testes de Área
├── conteudo/      → Testes de Conteúdo
├── cursos/        → Testes de Cursos
├── disciplina/    → Testes de Disciplina
├── grupos/        → Testes de Grupos Corretores
├── questoes/      → Testes de Questões (múltiplas specs)
├── redacao/       → Testes de Redação
└── turmas/        → Testes de Turmas

Benefícios:
✓ Fácil localizar testes por domínio
✓ Separação de responsabilidades
✓ Escalável (adiciona novos domínios facilmente)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SELETORES ACESSÍVEIS (BEST PRACTICE):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ RECOMENDADO:
   getByRole('button', { name: 'Salvar' })
   getByRole('textbox', { name: 'Email' })
   getByText('Excluir')
   getByLabel('Opções')
   getByPlaceholder('Buscar...')

❌ EVITAR:
   locator('#radix-_r_9q_')        ← IDs dinâmicos mudam!
   locator('div.container > button:nth-child(2)') ← Frágil
   querySelector()                 ← Muito específico

Razão:
✓ getByRole() usa semântica HTML
✓ Mais robusto a mudanças estruturais
✓ Melhor para acessibilidade

-->

<!-- 
========================================================================
  5. PONTOS POSITIVOS (NÍVEL ATUAL DO PROJETO)
========================================================================
-->

<!--
✅ Uso correto de getByRole() e seletores acessíveis
✅ Implementação de storageState (reutiliza sessão)
✅ Estrutura enterprise com separação por domínio
✅ Fluxos E2E reais (não apenas happy path)
✅ Autenticação TOTP automática funcionando
✅ Page Object Model em uso
✅ Uso de variáveis de ambiente (.env)
✅ Boa cobertura funcional (múltiplas features testadas)
✅ Paralelismo implementado
✅ Relatório HTML gerado automaticamente

NÍVEL DO PROJETO: Profissional/Júnior Avançado
→ Você já está acima do nível iniciante!

-->

<!-- 
========================================================================
  6. RECOMENDAÇÕES DE MELHORIAS (PRÓXIMOS PASSOS)
========================================================================
-->

<!--
🎯 MELHORIAS RECOMENDADAS (Prioridade):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  MODULARIZAR TESTES GRANDES
    Problema: Testes com múltiplas funcionalidades num arquivo
    Solução: Separar em specs menores (1 fluxo = 1 arquivo)
    
    ❌ ANTES:
       redacao.happy.spec.js (tudo em um teste)
    
    ✅ DEPOIS:
       redacao.create.spec.js
       redacao.edit.spec.js
       redacao.delete.spec.js

    Benefícios:
    ✓ Mais rápido paralelizar
    ✓ Mais fácil debugar
    ✓ Isolamento de falhas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣  REMOVER CÓDIGO REDUNDANTE DO CODEGEN
    Problema: Comandos desnecessários gerados automaticamente
    
    ❌ RUIM:
       await page.getByRole('textbox').click();
       await page.getByRole('textbox').click();
       await page.getByRole('textbox').click();

    ✅ BOM:
       await page.getByRole('textbox').fill('valor');

    Estratégia:
    ✓ Usar fill() direto (sem click antes)
    ✓ Remover presses desnecessários
    ✓ Evitar múltiplos clicks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣  USAR SELETORES ROBUSTOS (SEM RADIX)
    Problema: IDs Radix mudam dinamicamente
    
    ❌ FRÁGIL:
       locator('#radix-_r_1vo_').click()
    
    ✅ ROBUSTO:
       getByRole('menuitem', { name: 'Editar' }).click()
       getByText('Ver participantes').click()

    Impacto:
    ✓ Menos falhas aleatórias
    ✓ Testes mais estáveis (menos flakiness)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣  EVITAR nth() - USAR SELETORES SEMÂNTICOS
    Problema: nth() quebra se ordem ou quantidade de elementos muda
    
    ❌ FRÁGIL:
       locator('div').nth(2).click()
    
    ✅ ROBUSTO:
       getByRole('button', { name: 'Salvar' }).click()
       getByText('Item específico').click()

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣  GERAR DADOS DINÂMICOS (NÃO HARDCODED)
    Problema: Valores fixos causam conflitos em testes paralelos
    
    ❌ RUIM:
       await page.fill('input', 'Medicina');
    
    ✅ BOM:
       const nomeCurso = `curso-${Date.now()}`;
       await page.fill('input', nomeCurso);

    Benefício:
    ✓ Evita duplicação
    ✓ Testes rodam em paralelo sem conflitos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6️⃣  CRIAR HELPERS E FACTORIES
    Exemplo Helper:
    
    // helpers/dataGenerator.js
    export function gerarNomeCurso() {
      return `curso-${Date.now()}`;
    }

    export function gerarNomeGrupo() {
      return `grupo-${Date.now()}`;
    }

    Uso nos testes:
    const nome = gerarNomeCurso();

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7️⃣  IMPLEMENTAR FIXTURES PARA CENÁRIOS COMUNS
    Exemplo Fixture:
    
    export const usuarioAutenticado = test.extend({
      usuarioLogado: async ({ page }, use) => {
        await page.goto('...login');
        // Login automático
        await use(page);
      }
    });

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8️⃣  USAR EXPECT() PARA VALIDAÇÕES MAIS ROBUSTAS
    ✓ Aguarda elemento aparecer automaticamente
    ✓ Menos timeouts aleatórios
    
    ✅ BOM:
       await expect(locator).toBeVisible();
       await expect(locator).toHaveText('Salvo');
       await expect(page).toHaveURL(/.*cursos/);

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRÓXIMOS PASSOS:
1. Modularizar redacao.happy.spec.js em 3-4 arquivos
2. Remover IDs Radix, usar getByRole/getByText
3. Criar arquivo helpers/dataGenerator.js
4. Refatorar Page Objects para abstrair ações repetitivas
5. Implementar fixtures para setup comum

-->

<!-- 
========================================================================
  7. DEPENDÊNCIAS DO PROJETO (package.json)
========================================================================
-->

<!--
ESTRUTURA DO package.json:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "name": "meus-testes",
  "version": "1.0.0",
  "description": "Testes E2E automatizados para plataforma Avaliei",
  "main": "index.js",
  "type": "module",              ← ES Modules (import/export)
  
  "devDependencies": {
    "@playwright/test": "^1.59.1",
    "@types/node": "^25.6.0"
  },
  
  "dependencies": {
    "dotenv": "^16.6.1",
    "otplib": "^13.4.0",
    "totp-generator": "^2.0.1"
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXPLICAÇÃO DE CADA DEPENDÊNCIA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 DEVDEPENDENCIES (Desenvolvimento):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  @playwright/test (^1.59.1)
    O QUÊ É: Framework de testes E2E do Playwright
    POR QUE: Automatiza testes em navegadores (Chrome, Firefox, Safari)
    O QUE OFERECE:
    ├─ test() → Cria casos de teste
    ├─ expect() → Assertions/validações
    ├─ page → Controle do navegador
    ├─ test.beforeAll/afterEach → Hooks de setup/cleanup
    └─ @playwright/test --ui → Interface visual de testes
    
    USO NO PROJETO:
    import { test, expect } from '@playwright/test';
    
    test('nome do teste', async ({ page }) => {
      await page.goto('...');
      await expect(locator).toBeVisible();
    });

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣  @types/node (^25.6.0)
    O QUÊ É: Tipos TypeScript para Node.js
    POR QUE: Oferece autocomplete e validação de tipos em JS
    O QUE OFERECE:
    ├─ process.env → Tipagem de variáveis de ambiente
    ├─ setTimeout, setInterval → Tipagem de timers
    ├─ require, module → Tipagem de módulos
    └─ Melhor IDE support
    
    USO NO PROJETO:
    // Com types/node, process.env tem autocomplete
    const email = process.env.EMAIL;  // ✅ Reconhecido
    
    SEM types/node:
    const email = process.env.EMAIL;  // ⚠️ Sem autocomplete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 DEPENDENCIES (Produção):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  dotenv (^16.6.1)
    O QUÊ É: Carrega variáveis de ambiente do arquivo .env
    POR QUE: Lê credenciais sem expor no Git
    O QUE OFERECE:
    ├─ require('dotenv').config() → Carrega .env automaticamente
    ├─ process.env.* → Acessa as variáveis
    └─ Separação de ambientes (dev/staging/prod)
    
    ARQUIVO .env:
    ├─ EMAIL=usuario@example.com
    ├─ PASS=senha-segura
    └─ TOTP_SECRET=VITZSTZJCT6EAZZY
    
    USO NO auth.setup.js:
    require('dotenv').config();
    const email = process.env.EMAIL;      // usuario@example.com
    const senha = process.env.PASS;       // senha-segura
    const totpSecret = process.env.TOTP_SECRET;  // VITZSTZJCT6EAZZY
    
    BENEFÍCIO: Não expõe credenciais reais no código/Git!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣  totp-generator (^2.0.1) ⭐ CRÍTICO PARA 2FA
    O QUÊ É: Gera códigos TOTP (Time-based One Time Password)
    POR QUE: Criar códigos de autenticação em 2 fatores automaticamente
    O QUE OFERECE:
    ├─ TOTP.generate(secret) → Gera código de 6 dígitos
    ├─ TOTP.check(code, secret) → Valida código
    └─ Suporte a diferentes algoritmos criptográficos
    
    COMO FUNCIONA O TOTP:
    1. Usuário tem secret key (TOTP_SECRET)
    2. Cada 30 segundos, gera código diferente
    3. Código correto muda a cada 30s
    
    USO NO TotpPage.js:
    import { TOTP } from 'totp-generator';
    
    const secret = process.env.TOTP_SECRET;
    const { otp } = await TOTP.generate(secret);  // Gera "123456"
    await page.fill('input[name="totp"]', otp);
    
    RESULTADO: Testes 2FA funcionam 100% automático!
    SEM ISSO: Testes quebrariam porque código expira a cada 30s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣  otplib (^13.4.0)
    O QUÊ É: Alternativa/backup para gerar TOTP
    POR QUE: Redundância caso totp-generator falhe
    RELAÇÃO: Funciona similarmente ao totp-generator
    
    NOTA: Projeto instala mas usa principalmente totp-generator
    Este é backup/alternativa se necessário

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FLUXO COMPLETO COM TODAS AS DEPENDÊNCIAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. npm install
   ├─ Instala @playwright/test (framework)
   ├─ Instala @types/node (tipagem)
   ├─ Instala dotenv (variáveis de ambiente)
   ├─ Instala totp-generator (geração de 2FA) ⭐
   └─ Instala otplib (backup)

2. npx playwright test --project=setup
   ├─ Carrega .env com dotenv
   │  └─ process.env.EMAIL, PASS, TOTP_SECRET disponível
   ├─ LoginPage preenche email/password
   ├─ TotpPage gera código com totp-generator automaticamente
   ├─ Verifica código 2FA
   └─ Salva sessão em .auth/user.json

3. npx playwright test
   ├─ Reutiliza sessão (.auth/user.json)
   ├─ Todos os testes rodam autenticados
   └─ MenuPage navega entre seções
      └─ CursosPage, TurmasPage, etc fazem CRUD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

O QUE ESTÁ FALTANDO (OPCIONAL):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para projeto ENTERPRISE, considere adicionar:

1. eslint
   npm install --save-dev eslint @eslint/js
   → Linter de código (padrão de escrita)

2. prettier
   npm install --save-dev prettier
   → Formatador automático de código

3. husky + lint-staged
   npm install --save-dev husky lint-staged
   → Roda linter antes de commits

4. @faker-js/faker
   npm install faker
   → Gera dados fake para testes

5. @testing-library/playwright
   npm install --save-dev @testing-library/playwright
   → Melhor suporte a queries acessíveis

-->

<!-- 
========================================================================
  8. PROMPT DE CONTEXTO COMPLETO PARA IA
========================================================================

Use este prompt quando conversar com IA sobre o projeto:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Estou trabalhando com projeto E2E automatizado para plataforma AVALIEI 
(sistema de gestão educacional).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STACK TÉCNICO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Framework: Playwright v1.59.1
Padrão: Page Object Model (POM)
Autenticação: 2FA com TOTP automático (totp-generator v2.0.1)
Config: .env + dotenv v16.6.1
Node: ES Modules (type: "module")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE OBJECTS (11 arquivos):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 LoginPage.js
   → Autenticação inicial (email + senha)

📄 TotpPage.js
   → 2FA: Gera código TOTP automaticamente com totp-generator
   → Verifica código de 6 dígitos

📄 MenuPage.js
   → Navegação central (irParaRedacoes, irParaTurmas, etc)
   → Centraliza todas as URLs/navegação

📄 CursosPage.js
   → CRUD: criar, editar, excluir cursos
   → Método: this._nomeAtual para segurança

📄 TurmasPage.js ⭐ RECENTEMENTE REFATORADO
   → CRUD: criar, editar, excluir turmas (grupos de alunos)
   → SEGURO: Armazena this._descricaoAtual
   → Método privado #abrirMenu(descricao) busca especificamente
   → Resultado: Não deleta outras turmas por acidente!

📄 DisciplinaPage.js
   → CRUD de Disciplinas

📄 AreaPage.js
   → CRUD de Áreas (agrupamento de disciplinas)

📄 ConteudoPage.js
   → CRUD de Conteúdos + método importarDoIA()

📄 QuestoesPage.js
   → CRUD de Questões + importação manual/IA

📄 RedacaoPage.js
   → CRUD de Redações + seleção de textos motivadores
   → Usa this._tituloAtual para segurança

📄 GrupoCorretoresPage.js ⭐ EXEMPLO DE BEST PRACTICE
   → CRUD de Grupos Corretores
   → Método #abrirMenu(nome) filtra especificamente
   → Resultado: Deleta apenas grupos criados, nunca "libero"!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTRUTURA DE TESTES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

tests/auth/
├─ auth.setup.js
   → ⭐ Executado 1x com --project=setup
   → Login + TOTP + salva em .auth/user.json
   → Outros testes reutilizam essa sessão

tests/area/
├─ area.happy.spec.js

tests/cursos/
├─ cursos.happy.spec.js

tests/redacao/
├─ redacao.happy.spec.js
   → CRUD completo de redação com texts motivadores

tests/turmas/
├─ turmas.happy.spec.js

tests/grupos-corretores/
├─ grupos-corretores.happy.spec.js

tests/questoes/
├─ questoes-discursiva.spec.js
├─ questoes-import.happy.spec.js
├─ questoes-manual.happy.spec.js

[... outros domínios ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEPENDÊNCIAS CRÍTICAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

@playwright/test ^1.59.1
  ├─ Framework: test(), expect()
  ├─ Page control: page.goto(), page.fill(), etc
  ├─ Assertions: expect(locator).toBeVisible()
  └─ Comandos: --ui, --debug, --headed

dotenv ^16.6.1
  ├─ Carrega .env com EMAIL, PASS, TOTP_SECRET
  ├─ process.env.* fica disponível
  └─ Evita credenciais no Git

totp-generator ^2.0.1 ⭐ FUNDAMENTAL PARA 2FA
  ├─ TOTP.generate(secret) → Gera código "123456"
  ├─ Código muda cada 30s
  ├─ TotpPage.js usa para autenticação automática
  └─ SEM ISSO: 2FA quebraria (código expira a cada 30s)

totp-generator ^2.0.1
  ├─ Backup/alternativa para otplib
  └─ Menos usado atualmente

@types/node ^25.6.0
  ├─ Tipagem de process.env
  ├─ Autocomplete no IDE
  └─ Melhor DX (Developer Experience)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLUXO DE AUTENTICAÇÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

npm run setup (ou: npx playwright test --project=setup):
  1. auth.setup.js lê .env com dotenv
     → EMAIL, PASS, TOTP_SECRET carregados
  2. LoginPage.preencherEmail() + preencherSenha()
  3. TotpPage.gerarCodigoAutomatico() com totp-generator
     → TOTP.generate(process.env.TOTP_SECRET)
  4. Verifica código 2FA
  5. Salva sessão em .auth/user.json
     → storageState contém cookies/tokens

npm test (depois):
  1. Lê .auth/user.json
  2. playwright.config.js reutiliza storageState
  3. Testes rodam JÁ autenticados
  4. MenuPage navega entre seções
  5. CursosPage, TurmasPage, etc fazem CRUD
  6. afterEach() limpa dados criados

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PADRÃO DE CLEANUP SEGURO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Exemplo: redacao.happy.spec.js

// Criar com nomes dinâmicos
const TITULO = 'redacao-001';
const TURMA = 'turma-3DS';
const GRUPO = 'grupo-corretores-001';

test('CRUD Redação', async ({ page }) => {
  // 1. Criar grupos
  await grupo.criar({ nome: GRUPO });
  // TotpPage.js ARMAZENA: this._nomeAtual = GRUPO

  // 2. Criar turmas
  await turmas.criar({ descricao: TURMA });
  // TurmasPage.js ARMAZENA: this._descricaoAtual = TURMA

  // 3. Criar redação
  await redacao.criar({ titulo: TITULO });
  // RedacaoPage.js ARMAZENA: this._tituloAtual = TITULO

  // ... teste aqui ...
});

test.afterEach(async ({ page }) => {
  // 4. Cleanup SEGURO:
  await redacao.excluir();  // Deleta apenas TITULO
  // Usa #abrirMenu(this._tituloAtual) para buscar específico!

  await turmas.excluir();   // Deleta apenas TURMA
  // Usa #abrirMenu(this._descricaoAtual) para buscar específico!

  await grupo.excluir();    // Deleta apenas GRUPO
  // Usa #abrirMenu(this._nomeAtual) para buscar específico!

  // RESULTADO: Nunca deleta "turma-informatica" ou "grupo-libero"!
});

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PONTOS FORTES DO PROJETO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Autenticação 2FA 100% automática com totp-generator
✅ Setup global reutilizado entre testes
✅ Page Objects bem estruturados
✅ Cleanup seguro com this._nomeAtual
✅ Seletores acessíveis (getByRole, getByText)
✅ Organização por domínio
✅ Variáveis de ambiente (.env)
✅ Paralelismo configurado
✅ ES Modules (import/export)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRÓXIMAS MELHORIAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Modularizar redacao.happy.spec.js (1 fluxo = 1 arquivo)
2. Remover IDs Radix (usar getByRole/getByText)
3. Criar helpers/dataGenerator.js para dados dinâmicos
4. Adicionar faker para dados fake
5. Implementar fixtures para setup repetitivo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OBJETIVO DO PROJETO:
[Descreva o que você quer fazer com os testes]

ME AJUDE COM:
[Seja específico: 'refatorar', 'corrigir bug', 'adicionar feature', etc]
[Detalhe o arquivo: 'TurmasPage.js', 'redacao.happy.spec.js', etc]
[Descreva o comportamento esperado]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-->
- Organização: Testes separados por domínio (auth/, area/, cursos/, etc)
- Config: storageState para reutilizar sessão entre testes

TECH STACK:
- Playwright (test runner)
- .env para variáveis sensíveis (EMAIL, PASS, TOTP_SECRET)
- Browser storage state para autenticação

CARACTERÍSTICAS IMPLEMENTADAS:
✓ Autenticação global (setup.js) com TOTP automático
✓ Reutilização de sessão via .auth/user.json
✓ Page Objects para cada domínio (CursosPage, TurmasPage, etc)
✓ Uso de getByRole() e getByText() (acessibilidade)
✓ Paralelismo configurado
✓ Organização por domínio (tests/area/, tests/cursos/, etc)
✓ Ambiente separado com .env

DESAFIOS ATUAIS:
- Testes muito grandes (múltiplas funcionalidades em 1 arquivo)
- Alguns seletores frágeis (IDs Radix dinâmicos)
- Dados hardcoded em alguns lugares
- Pouca reutilização entre testes

OBJETIVO:
[Descreva o que você quer fazer, ex: 'Modularizar os testes', 'Refatorar Page Objects', etc]

Me ajude com: [Seja específico: 'refatorar', 'corrigir', 'adicionar', etc]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-->







