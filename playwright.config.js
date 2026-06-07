// @ts-check
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
  timeout: 300000,

  use: {
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 1000,
    },
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/auth/auth.setup.js',
    },
    {
      name: 'chromium',
      testMatch: '**/*.spec.js',
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
      dependencies: ['setup'],
    },
  ],
});