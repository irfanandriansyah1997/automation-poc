import { expect } from '@playwright/test';

import { AbstractTestCasePage } from '@/utils/test';

import { DASHBOARD_LOGIN_PAGE_ELEMENTS } from './constant';

/**
 * Class representing the Dashboard Login Page.
 * @extends AbstractTestCasePage
 */
class DashboardLoginPage extends AbstractTestCasePage<
  typeof DASHBOARD_LOGIN_PAGE_ELEMENTS
> {
  elements = DASHBOARD_LOGIN_PAGE_ELEMENTS;

  /**
   * Navigates to the Dashboard Login Page.
   * @async
   * @returns {Promise<void>}
   */
  async goToDashboardLoginPage() {
    await this.goTo('http://localhost:3000/v2/m/login', {
      timeout: 15000,
      waitUntil: 'domcontentloaded'
    });
  }

  /**
   * Checks the UI elements of the login page.
   * @async
   * @returns {Promise<void>}
   */
  async checkUIElementLoginPage() {
    /**
     * Check UI
     */
    const form = this.getElement('form');
    await expect(form).toBeVisible();

    const title = this.getElement('title', form);
    await expect(title).toHaveText('Sign in with credentials');

    /**
     * Check Email Textfield
     */
    const emailTextfieldContainer = this.getElement(
      'emailTextfieldContainer',
      form
    );
    const emailTextfield = this.getElement(
      'textfield',
      emailTextfieldContainer
    );
    await expect(emailTextfield).toHaveAttribute('placeholder', 'Email');
    await expect(emailTextfield).toHaveValue('');

    /**
     * Check Password Textfield
     */
    const passwordTextfieldContainer = this.getElement(
      'passwordTextfieldContainer',
      form
    );
    const passwordTextfield = this.getElement(
      'textfield',
      passwordTextfieldContainer
    );
    await expect(passwordTextfield).toHaveAttribute('placeholder', 'Password');
    await expect(passwordTextfield).toHaveValue('');

    /**
     * Check Button
     */
    const loginButton = form.getByRole('button', {
      name: 'submit login'
    });
    await expect(loginButton).toHaveText('Sign In');
  }
}

export default DashboardLoginPage;
