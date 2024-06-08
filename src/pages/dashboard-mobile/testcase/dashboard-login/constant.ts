import type { ElementType } from '@/types/test-case';

/////////////////////////////////////////////////////////////////////////////
// Shared Constant
/////////////////////////////////////////////////////////////////////////////

export const LOGIN_PAGE_URL = 'http://localhost:3000/v2/m/login';

/////////////////////////////////////////////////////////////////////////////
// Test Case Elements
/////////////////////////////////////////////////////////////////////////////

const form: ElementType = {
  type: 'role',
  value: { options: { name: 'login form' }, role: 'region' }
};

const emailTextfieldContainer: ElementType = {
  parent: form,
  type: 'role',
  value: { options: { name: 'email textfield' }, role: 'region' }
};

const emailTextfield: ElementType = {
  parent: emailTextfieldContainer,
  type: 'role',
  value: { options: { name: 'input field' }, role: 'textbox' }
};

const loginButton: ElementType = {
  parent: form,
  type: 'role',
  value: { options: { name: 'submit login' }, role: 'button' }
};

const passwordTextfieldContainer: ElementType = {
  parent: form,
  type: 'role',
  value: { options: { name: 'password textfield' }, role: 'region' }
};

const passwordTextfield: ElementType = {
  parent: passwordTextfieldContainer,
  type: 'role',
  value: { options: { name: 'input field' }, role: 'textbox' }
};

const textfield: ElementType = {
  type: 'role',
  value: { options: { name: 'input field' }, role: 'textbox' }
};

const title: ElementType = {
  parent: form,
  type: 'role',
  value: { options: { name: 'hint' }, role: 'heading' }
};

const snackbar: ElementType = {
  type: 'role',
  value: {
    options: { name: 'snackbar item' },
    role: 'region'
  }
};

export const DASHBOARD_LOGIN_PAGE_ELEMENTS = {
  emailTextfield,
  form,
  loginButton,
  passwordTextfield,
  snackbar,
  textfield,
  title
} as const;
