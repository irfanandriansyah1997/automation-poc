import { expect } from '@playwright/test';

import { AbstractTestCasePage } from '@/utils/test';

import {
  CREDIT_CARD_FORM_PAGE_ELEMENTS,
  CREDIT_CARD_FORM_PAGE_URL
} from './constant';

class PaymentGatewayCreditCardFormPage extends AbstractTestCasePage<
  typeof CREDIT_CARD_FORM_PAGE_ELEMENTS
> {
  elements = CREDIT_CARD_FORM_PAGE_ELEMENTS;

  async goToCreditCardFormPage() {
    await this.goTo(CREDIT_CARD_FORM_PAGE_URL, {
      timeout: 15000,
      waitUntil: 'domcontentloaded'
    });
  }

  async checkUIElementCVVInformation() {
    const CVVIcon = this.getElement('cvvIcon');
    await expect(CVVIcon).toBeVisible();

    /**
     * Simulate click CVV Icon
     */
    await CVVIcon.click();

    const CVVIntroDialog = this.getElement('cvvInformationDialog');
    await expect(CVVIntroDialog).toBeVisible();

    const CVVTextInfo = this.getElement('cvvInformationContent');
    await expect(CVVTextInfo).toBeVisible();

    const CVVDialogClose = this.getElement('cvvInformationDialogClose');
    await expect(CVVDialogClose).toBeVisible();

    /**
     * Simulate click close icon confirm should be dialog closed
     */
    await CVVDialogClose.click();
    await expect(CVVIntroDialog).not.toBeVisible();
  }

  async checkUIElementCreditCardForm() {
    /**
     * Check Loading UI
     */
    const loadingScreen = this.getElement('loadingScreen');
    await expect(loadingScreen).toBeVisible();

    /**
     * Check Navbar & Price
     */
    const navbar = this.getElement('navbar');
    await expect(navbar).toBeVisible();
    await expect(navbar).toHaveText('Pembayaran');

    const priceInfo = this.getElement('priceInfo');
    await expect(priceInfo).toBeVisible();
    await expect(priceInfo).toHaveText('Rp1.155.000');

    /**
     * Check credit card form textfield
     */

    const creditCardTextfield = this.getElement('creditCardTextfield');
    await expect(creditCardTextfield).toBeVisible();
    await expect(creditCardTextfield).toHaveAttribute(
      'placeholder',
      'Masukkan nomor kartu'
    );

    const creditCardExpiredTextfield = this.getElement(
      'creditCardExpiredTextfield'
    );
    await expect(creditCardExpiredTextfield).toBeVisible();
    await expect(creditCardExpiredTextfield).toHaveAttribute(
      'placeholder',
      'MM / YY'
    );

    const CVVTextfield = this.getElement('cvvTextfield');
    await expect(CVVTextfield).toBeVisible();
    await expect(CVVTextfield).toHaveAttribute('placeholder', '3 digit angka');

    const button = this.getElement('creditCardFormButton');
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('disabled');
    await expect(button).toHaveAttribute('data-disabled', 'true');
    await expect(button).toHaveText('Bayar');
  }

  async simulateInputCreditCardForm() {
    /**
     * Simulate filled in credit card number
     */
    const creditCardTextField = this.getElement('creditCardTextfield');
    await creditCardTextField.fill('5200 0000 0000 2151');

    await expect(creditCardTextField).toHaveValue('5200 0000 0000 2151');

    /**
     * Simulate filled in credit card expired - incorrect
     */
    const creditCardExpiredTextField = this.getElement(
      'creditCardExpiredTextfield'
    );
    await creditCardExpiredTextField.fill('01/11');

    await expect(creditCardExpiredTextField).toHaveValue('01/11');
    const error = this.page.getByText('Kartu kamu telah kedaluwarsa.');
    await expect(error).toBeVisible();

    /**
     * Simulate filled in credit card expired - correct
     */
    await creditCardExpiredTextField.fill('01/30');

    await expect(creditCardExpiredTextField).toHaveValue('01/30');
    await expect(error).not.toBeVisible();

    /**
     * Simulate filled in cvv number
     */
    const cvvTextField = this.getElement('cvvTextfield');
    await cvvTextField.fill('123');

    await expect(cvvTextField).toHaveValue('123');

    const button = this.getElement('creditCardFormButton');
    await expect(button).toBeVisible();
    await expect(button).not.toHaveAttribute('disabled');
    await expect(button).toHaveAttribute('data-disabled', 'false');
    await expect(button).toHaveText('Bayar');
  }
}

export default PaymentGatewayCreditCardFormPage;
