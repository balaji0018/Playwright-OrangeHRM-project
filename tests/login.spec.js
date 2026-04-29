import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { user } from '../fixtures/testData';

test('User can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(user.username, user.password);

  await dashboard.verifyLogin();

  await expect(page).toHaveURL(/dashboard/);
});