import { test } from '@playwright/test';

import PaymentGatewayCreditCardFormPage from '@/pages/payment-gateway/testcase/credit-card-form/test-case';

test.describe(
  'Testing credit card form page should be working properly',
  { tag: ['@payment-gateway', '@credit-card-form'] },
  () => {
    test('Should be render correctly', async ({ page }) => {
      const instance = new PaymentGatewayCreditCardFormPage(page);

      await instance.goToCreditCardFormPage();
      await instance.checkUIElementCreditCardForm();
      await instance.checkUIElementCVVInformation();
    });

    test('Simulate filled in credit card form should be working properly', async ({
      page
    }) => {
      const instance = new PaymentGatewayCreditCardFormPage(page);

      await instance.goToCreditCardFormPage();
      await instance.simulateInputCreditCardForm();
    });
  }
);
