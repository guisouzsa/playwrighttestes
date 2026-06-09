// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTH_FILE = path.join(__dirname, '.auth/user.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  timeout: 60000,

  use: {
    baseURL: 'https://app.avaliei.com.br',
    navigationTimeout: 30000,
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 0,
    },
    expect: { timeout: 15000 },
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/auth/auth.setup.js',
      timeout: 120000,
    },
    {
      name: 'chromium',
      testMatch: '**/tests/**/*.spec.js',
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
      dependencies: ['setup'],
    },
  ],
});