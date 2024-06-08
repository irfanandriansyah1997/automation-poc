import { test } from '@playwright/test';

import DashboardLoginPage from '@/pages/dashboard-mobile/testcase/dashboard-login';

test.describe(
  'Testing login page should be working properly',
  { tag: ['@dashboard-mobile', '@login-page'] },
  () => {
    test('Should be render correctly', async ({ page }) => {
      const instance = new DashboardLoginPage(page);

      await instance.goToDashboardLoginPage();
      await instance.checkUIElementLoginPage();
    });

    test.describe('Simulate user trying authenticated', () => {
      test('Simulate login with negative flow - email and password not filled in', async ({
        page
      }) => {
        const instance = new DashboardLoginPage(page);

        await instance.goToDashboardLoginPage();
        await instance.simulateLoginNegativeFlowEmptyForm();
      });

      test('Simulate login with negative flow - email not correct', async ({
        page
      }) => {
        const instance = new DashboardLoginPage(page);

        await instance.goToDashboardLoginPage();
        await instance.simulateLoginNegativeFlowInvalidEmailAddress();
      });

      test('Simulate login with negative flow - password empty', async ({
        page
      }) => {
        const instance = new DashboardLoginPage(page);

        await instance.goToDashboardLoginPage();
        await instance.simulateLoginNegativeFlowNotFilledPassword();
      });

      test('Simulate login with negative flow - backend returning error', async ({
        page
      }) => {
        const instance = new DashboardLoginPage(page);

        await instance.goToDashboardLoginPage();
        await instance.simulateLoginNegativeFlowAPIReturning400();
      });
    });
  }
);
