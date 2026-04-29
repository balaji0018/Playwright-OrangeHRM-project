import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { PIMPage } from '../pages/pimPage';
import { user } from '../fixtures/testData';

test('Add → Search → Verify employee', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const pim = new PIMPage(page);

  const firstName = 'John';
  const lastName = 'Tester';
  const fullName = `${firstName} ${lastName}`;

  await loginPage.goto();
  await loginPage.login(user.username, user.password);

  await dashboard.goToPIM();

  // Add employee
  await pim.addEmployee(firstName, lastName);

  // Go back to employee list
  await dashboard.goToPIM();

  // Search
  await pim.searchEmployee(fullName);

  // Verify
  await expect(page.getByRole('row', { name: new RegExp(fullName) })).toBeVisible();
});



test('Delete employee', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const pim = new PIMPage(page);

  const firstName = 'John';
  const lastName = 'Delete';
  const fullName = `${firstName} ${lastName}`;

  await loginPage.goto();
  await loginPage.login(user.username, user.password);

  await dashboard.goToPIM();

  // Add employee first
  await pim.addEmployee(firstName, lastName);

  await dashboard.goToPIM();

  // Search employee
  await pim.searchEmployee(fullName);

  // Delete
  await pim.deleteEmployee(fullName);

  // Verify deletion (row should NOT be visible)
  await expect(page.getByRole('row', { name: new RegExp(fullName) })).toHaveCount(0);
});