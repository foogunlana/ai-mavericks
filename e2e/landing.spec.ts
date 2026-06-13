import { test, expect } from '@playwright/test';

test('landing page renders hero and is not blank', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  // Relative goto resolves against baseURL (which includes the /ai-mavericks/ base)
  await page.goto('./');
  await page.waitForLoadState('networkidle');

  // The app root must have rendered actual content (not a blank crash)
  const root = page.locator('#root');
  await expect(root).not.toBeEmpty();

  // Hero heading should be visible
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

  // No uncaught runtime errors (e.g. Clerk context crash)
  expect(errors, `Page errors: ${errors.join('\n')}`).toHaveLength(0);

  // Capture the landing page screenshot
  await expect(page).toHaveScreenshot('landing.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  });
});

test('public hero shows a positive builder count, never "0+"', async ({ page }) => {
  // Regression: the public landing is shown to signed-out visitors who cannot
  // query the gated member table, so deriving the count from members.length
  // returns 0 ("0+ builders"). It must use a static public count instead.
  await page.goto('./');
  await page.waitForLoadState('networkidle');

  const builders = page.getByText(/builders and counting/);
  await expect(builders).toBeVisible();
  // A leading 0 ("0+") fails this; a real count like "60+" passes.
  await expect(builders).toContainText(/[1-9]\d*\+/);
});
