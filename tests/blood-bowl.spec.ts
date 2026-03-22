import { test, expect } from '@playwright/test';

const PASSWORD = process.env.BLOOD_BOWL_KEY ?? '';

async function addGame(page: any, opponentName: string) {
  await page.goto('/blood-bowl/add');
  await page.fill('input[name="date"]', '2026-03-21');
  await page.fill('input[name="opponent_name"]', opponentName);
  await page.selectOption('select[name="my_race_id"]', { label: 'Orc' });
  await page.selectOption('select[name="opponent_race_id"]', { label: 'Human' });
  await page.selectOption('select[name="result"]', 'W');
  await page.fill('input[name="score_for"]', '2');
  await page.fill('input[name="score_against"]', '1');
  await page.selectOption('select[name="platform_id"]', { label: 'Blood Bowl 3' });
  await page.selectOption('select[name="format_id"]', { label: 'league' });
  await page.fill('input[name="key"]', PASSWORD);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/blood-bowl/');
}

test('add a game', async ({ page }) => {
  const name = `Add-Test-${Date.now()}`;
  await addGame(page, name);
  await expect(page.locator('table.game-table')).toContainText(name);
});

test('edit a game', async ({ page }) => {
  const name = `Edit-Test-${Date.now()}`;
  const editedName = `Edited-${Date.now()}`;
  await addGame(page, name);

  // Find and click the Edit link for the row with our game
  const row = page.locator('table.game-table tbody tr').filter({ hasText: name });
  await row.locator('a.edit-link').click();
  await expect(page).toHaveURL(/\/blood-bowl\/edit/);

  await page.fill('input[name="opponent_name"]', editedName);
  await page.fill('input[name="key"]', PASSWORD);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/blood-bowl/');
  await expect(page.locator('table.game-table')).toContainText(editedName);
  await expect(page.locator('table.game-table')).not.toContainText(name);
});

test('delete a game', async ({ page }) => {
  const name = `Delete-Test-${Date.now()}`;
  await addGame(page, name);

  // Find and click the Delete link for the row with our game
  const row = page.locator('table.game-table tbody tr').filter({ hasText: name });
  await row.locator('a.delete-link').click();
  await expect(page).toHaveURL(/\/blood-bowl\/delete/);

  await page.fill('input[name="key"]', PASSWORD);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/blood-bowl/');
  await expect(page.locator('table.game-table')).not.toContainText(name);
});
