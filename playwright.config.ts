import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /routing\.spec\.ts/,
    },
    {
      name: 'routing',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5174/',
      },
      testMatch: /routing\.spec\.ts/,
    },
  ],

  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:5173/',
      reuseExistingServer: !process.env.CI,
    },
    {
      // --mode test loads .env.test (blank auth keys) -> ungated static path.
      command: 'npm run dev -- --mode test --port 5174',
      url: 'http://localhost:5174/',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
