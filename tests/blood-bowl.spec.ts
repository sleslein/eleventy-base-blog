import { test, expect, type Page } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';

const PASSWORD = process.env.BLOOD_BOWL_KEY ?? '';
const TEST_DB = path.join(process.cwd(), 'data', 'test.db');

test.beforeEach(() => {
  const db = new Database(TEST_DB);
  db.prepare('DELETE FROM games').run();
  db.close();
});

async function addGame(page: Page, opponentName: string) {
  await page.goto('/blood-bowl/add');
  await page.getByLabel('Date').fill('2026-03-21');
  await page.getByLabel('Opponent name').fill(opponentName);
  await page.getByLabel('My race').selectOption({ label: 'Orc' });
  await page.getByLabel('Opponent race').selectOption({ label: 'Human' });
  await page.getByLabel('Result').selectOption('W');
  await page.getByLabel('Score for').fill('2');
  await page.getByLabel('Score against').fill('1');
  await page.getByLabel('Platform').selectOption({ label: 'Blood Bowl 3' });
  await page.getByLabel('Format').selectOption({ label: 'league' });
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Add game' }).click();
  await expect(page).toHaveURL('/blood-bowl/');
}

test('add a game', async ({ page }) => {
  const name = `Add-Test-${Date.now()}`;
  await addGame(page, name);
  await expect(page.getByRole('table', { name: 'Games' })).toContainText(name);
});

test('edit a game', async ({ page }) => {
  const name = `Edit-Test-${Date.now()}`;
  const editedName = `Edited-${Date.now()}`;
  await addGame(page, name);

  const row = page.getByRole('table', { name: 'Games' }).getByRole('row').filter({ hasText: name });
  await row.getByRole('link', { name: 'Edit' }).click();
  await expect(page).toHaveURL(/\/blood-bowl\/edit/);

  await page.getByLabel('Opponent name').fill(editedName);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Save changes' }).click();

  await expect(page).toHaveURL('/blood-bowl/');
  await expect(page.getByRole('table', { name: 'Games' })).toContainText(editedName);
  await expect(page.getByRole('table', { name: 'Games' })).not.toContainText(name);
});

test('delete a game', async ({ page }) => {
  const name = `Delete-Test-${Date.now()}`;
  await addGame(page, name);

  const row = page.getByRole('table', { name: 'Games' }).getByRole('row').filter({ hasText: name });
  await row.getByRole('link', { name: 'Delete' }).click();
  await expect(page).toHaveURL(/\/blood-bowl\/delete/);

  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(page).toHaveURL('/blood-bowl/');
  await expect(page.getByRole('main')).not.toContainText(name);
});
