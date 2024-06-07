import { test } from '@playwright/test';

import DashboardLoginPage from '@/pages/dashboard-mobile/dashboard-login/test-case';

test.describe(
  'Testing login page should be working properly',
  { tag: ['@mobile', '@login-page'] },
  () => {
    test('Should be render correctly', async ({ page }) => {
      const instance = new DashboardLoginPage(page);

      await instance.goToDashboardLoginPage();
      await instance.checkUIElementLoginPage();
    });
  }
);
