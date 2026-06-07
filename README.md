# E2E Tests — Avaliei

Repositório de testes End-to-End (E2E) da plataforma Avaliei, simulando comportamentos reais de usuários navegando pela aplicação do início ao fim de cada fluxo.

---

## Sobre o Projeto

Testes E2E validam fluxos completos do usuário, detectam problemas de integração entre módulos e garantem que as funcionalidades críticas funcionem corretamente em conjunto.

**Stack:** Playwright, Page Object Model (POM), TOTP (2FA), dotenv

---

## Estrutura

```
meus-testes/
├── pages/                        # Page Object Model — abstração de páginas
│   ├── LoginPage.js
│   ├── TotpPage.js
│   ├── MenuPage.js
│   ├── AreaPage.js
│   ├── AvaliacaoPage.js
│   ├── ConteudoPage.js
│   ├── CursosPage.js
│   ├── DisciplinaPage.js
│   ├── GrupoCorretoresPage.js
│   ├── QuestoesPage.js
│   ├── RedacaoPage.js
│   └── Turmaspage.js
├── tests/                        # Casos de teste organizados por domínio
│   ├── auth/
│   │   └── auth.setup.js         # Setup global de autenticação
│   ├── area/
│   ├── avaliacao/
│   ├── conteudo/
│   ├── cursos/
│   ├── disciplina/
│   ├── grupos-corretores/
│   ├── questoes/
│   ├── redacao/
│   └── turmas/
├── playwright.config.js
├── package.json
└── codigos.js                    # Referencia de comandos (ignorado no git)
```

---

## Configuracao Inicial

```bash
# Instalar dependencias
npm install

# Instalar browsers
npx playwright install

# Configurar variaveis de ambiente
cp .env.example .env
```

Preencher o `.env`:
```
EMAIL=seu-email@example.com
PASS=sua-senha
TOTP_SECRET=sua-chave-totp-base32
```

---

## Como Executar

```bash
# Todos os testes no Chromium (headless)
npm test

# Vendo o browser, 1 por vez, com detalhes no terminal
npm run test:headed

# Com debug (pausa em cada acao)
npm run test:debug

# Apenas um dominio especifico
npx playwright test tests/area --project=chromium --headed --workers=1 --reporter=list

# Ver relatorio apos execucao
npx playwright show-report
```

---

## Convencoes de Teste

Cada arquivo segue o padrao `dominio.tipo.spec.js`:

- `happy` — fluxo ideal, dados validos
- `sad` — entradas invalidas, erros esperados
- `edge` — casos extremos e limites

---

## Page Object Model

Cada arquivo em `pages/` encapsula os seletores e acoes de uma pagina:

```javascript
export class AreaPage {
  constructor(page) {
    this.page = page;
    this.btnAdicionar = page.getByRole('button', { name: 'Adicionar area' });
    this.inputNome = page.getByRole('textbox', { name: 'Nome da Area:' });
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
  }

  async criar(nome) {
    await this.btnAdicionar.click();
    await this.inputNome.fill(nome);
    await this.btnSalvar.click();
    await this.page.waitForLoadState('networkidle');
  }
}
```

Os testes importam o page object e chamam os metodos:

```javascript
import { test, expect } from '@playwright/test';
import { AreaPage } from '../../pages/AreaPage.js';

test('CRUD de Area', async ({ page }) => {
  const area = new AreaPage(page);
  const nome = `g-teste-area-${Date.now()}`;

  await area.criar(nome);
  await expect(page.getByText(nome)).toBeVisible({ timeout: 15000 });
});
```

---

## Autenticacao

O arquivo `auth.setup.js` roda uma vez antes de todos os testes. Ele faz login com email, senha e TOTP automatico, e salva a sessao em `.auth/user.json`. Todos os outros testes reutilizam essa sessao sem precisar logar novamente.

---

## Troubleshooting

**"Element not found"** — Adicionar waitFor antes da acao:
```javascript
await page.waitForLoadState('networkidle');
await expect(locator).toBeVisible({ timeout: 15000 });
```

**"Browser not found"** — Reinstalar browsers:
```bash
npx playwright install --with-deps
```

**Testes passam local mas falham no CI** — Verificar se `.env` esta configurado no servidor e usar `--workers=1`.
```
