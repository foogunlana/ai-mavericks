import { test, expect } from '@playwright/test';

// Runs against the no-auth server (port 5174 / .env.test): authEnabled=false,
// so /dinners is ungated and served from static content.

test('dinners list renders at /dinners', async ({ page }) => {
  await page.goto('./dinners');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { name: 'AI Mavericks Dinners' })).toBeVisible();
});

test('clicking a dinner navigates to /dinners/:slug and renders the detail', async ({ page }) => {
  await page.goto('./dinners');
  await page.waitForLoadState('networkidle');

  // DinnerCard is an <article role="button"> in the grid.
  await page.locator('article[role="button"]').first().click();

  await expect(page).toHaveURL(/\/dinners\/[^/]+$/);
  // The bug: detail used DEV-only static lookup and showed this text.
  await expect(page.getByText('Dinner not found')).toHaveCount(0);
  // A real detail page shows the "All Dinners" back control.
  await expect(page.getByRole('button', { name: /All Dinners/ })).toBeVisible();
});

test('deep link / refresh on a detail URL renders that dinner', async ({ page }) => {
  await page.goto('./dinners');
  await page.waitForLoadState('networkidle');
  await page.locator('article[role="button"]').first().click();
  await expect(page).toHaveURL(/\/dinners\/[^/]+$/);

  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Dinner not found')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /All Dinners/ })).toBeVisible();
});

test('browser back returns from detail to the list', async ({ page }) => {
  await page.goto('./dinners');
  await page.waitForLoadState('networkidle');
  await page.locator('article[role="button"]').first().click();
  await expect(page).toHaveURL(/\/dinners\/[^/]+$/);

  await page.goBack();
  await expect(page).toHaveURL(/\/dinners$/);
  await expect(page.getByRole('heading', { name: 'AI Mavericks Dinners' })).toBeVisible();
});

test('unknown route redirects to home', async ({ page }) => {
  await page.goto('./nope');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/localhost:5174\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'AI Mavericks' })).toBeVisible();
});
