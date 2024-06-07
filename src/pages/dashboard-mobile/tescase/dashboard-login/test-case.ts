import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

import { dataMock_LoginAPI_accountNotFound } from '@/pages/dashboard-mobile/mocks/login-api.mock';
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

  async goToDashboardLoginPage() {
    await this.goTo('http://localhost:3000/v2/m/login', {
      timeout: 15000,
      waitUntil: 'domcontentloaded'
    });
  }

  async getTextfield(
    name: 'password textfield' | 'email textfield'
  ): Promise<Locator> {
    const form = this.getElement('form');
    await expect(form).toBeVisible();

    const textfieldContainer = this.getElement(
      name === 'email textfield'
        ? 'emailTextfieldContainer'
        : 'passwordTextfieldContainer',
      form
    );
    const textfield = this.getElement('textfield', textfieldContainer);
    await expect(textfield).toBeVisible();
    return textfield;
  }

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

    const emailTextfield = await this.getTextfield('email textfield');
    await expect(emailTextfield).toHaveAttribute('placeholder', 'Email');
    await expect(emailTextfield).toHaveValue('');

    /**
     * Check Password Textfield
     */
    const passwordTextfield = await this.getTextfield('password textfield');
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

  async simulateLoginNegativeFlowEmptyForm() {
    const form = this.getElement('form');
    await expect(form).toBeVisible();

    const title = this.getElement('title', form);
    await expect(title).toHaveText('Sign in with credentials');

    /**
     * Check Button
     */
    const loginButton = form.getByRole('button', {
      name: 'submit login'
    });
    await loginButton.click();

    const snackbar = this.getElement('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText('Please fill out email field.');
  }

  async simulateLoginNegativeFlowInvalidEmailAddress() {
    const form = this.getElement('form');
    await expect(form).toBeVisible();

    const title = this.getElement('title', form);
    await expect(title).toHaveText('Sign in with credentials');

    /**
     * Filled In Email Textfield
     */

    const emailTextfield = await this.getTextfield('email textfield');
    await emailTextfield.fill('example value');

    /**
     * Check Button
     */
    const loginButton = form.getByRole('button', {
      name: 'submit login'
    });
    await loginButton.click();

    const snackbar = this.getElement('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText('Please enter a valid email address.');
  }

  async simulateLoginNegativeFlowNotFilledPassword() {
    const form = this.getElement('form');
    await expect(form).toBeVisible();

    const title = this.getElement('title', form);
    await expect(title).toHaveText('Sign in with credentials');

    /**
     * Filled In Email Textfield
     */

    const emailTextfield = await this.getTextfield('email textfield');
    await emailTextfield.fill('sample@fithub.id');

    /**
     * Check Button
     */
    const loginButton = form.getByRole('button', {
      name: 'submit login'
    });
    await loginButton.click();

    const snackbar = this.getElement('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText('Please fill out password field.');
  }

  async simulateLoginNegativeFlowAPIReturning400() {
    /**
     * Mock response API
     */
    await this.mockAPI(
      new URL('https://web.svc.staging.fithubdev.com/v1/auth/login'),
      {
        body: JSON.stringify(dataMock_LoginAPI_accountNotFound),
        contentType: 'application/json',
        status: 400
      }
    );

    const form = this.getElement('form');
    await expect(form).toBeVisible();

    const title = this.getElement('title', form);
    await expect(title).toHaveText('Sign in with credentials');

    /**
     * Filled In Email Textfield
     */

    const emailTextfield = await this.getTextfield('email textfield');
    await emailTextfield.fill('sample@fithub.id');

    /**
     * Filled In Password Textfield
     */

    const passwordTextfield = await this.getTextfield('password textfield');
    await passwordTextfield.fill('password123');

    /**
     * Check Button
     */
    const loginButton = form.getByRole('button', {
      name: 'submit login'
    });
    await loginButton.click();

    const snackbar = this.getElement('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText('incorrect username or password');
  }
}

export default DashboardLoginPage;
