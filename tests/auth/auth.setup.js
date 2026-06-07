import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { TotpPage } from '../../pages/TotpPage.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTH_FILE = path.join(__dirname, '../../.auth/user.json');

const SECRET = process.env.TOTP_SECRET;
const EMAIL  = process.env.EMAIL;
const PASS   = process.env.PASS;

setup('autenticar usuário', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const totpPage  = new TotpPage(page);

  await loginPage.login(EMAIL, PASS);
  await totpPage.completeTotp(SECRET);

  await page.getByRole('navigation', { name: 'Main' })
    .waitFor({ state: 'visible', timeout: 30000 });

  await page.context().storageState({ path: AUTH_FILE });
});