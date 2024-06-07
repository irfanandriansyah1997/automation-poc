import type { ElementType } from '@/types/test-case';

/////////////////////////////////////////////////////////////////////////////
// Test Case Elements
/////////////////////////////////////////////////////////////////////////////

const emailTextfieldContainer: ElementType = {
  type: 'role',
  value: { options: { name: 'email textfield' }, role: 'region' }
};

const form: ElementType = {
  type: 'role',
  value: { options: { name: 'login form' }, role: 'region' }
};

const loginButton: ElementType = {
  type: 'role',
  value: { options: { name: 'submit login' }, role: 'button' }
};

const passwordTextfieldContainer: ElementType = {
  type: 'role',
  value: { options: { name: 'password textfield' }, role: 'region' }
};

const textfield: ElementType = {
  type: 'role',
  value: { options: { name: 'input field' }, role: 'textbox' }
};

const title: ElementType = {
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
  emailTextfieldContainer,
  form,
  loginButton,
  passwordTextfieldContainer,
  snackbar,
  textfield,
  title
} as const;
