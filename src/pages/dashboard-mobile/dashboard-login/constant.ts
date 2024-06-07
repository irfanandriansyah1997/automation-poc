export const DASHBOARD_LOGIN_PAGE_ELEMENTS = {
  emailTextfieldContainer: {
    type: 'role',
    value: { options: { name: 'email textfield' }, role: 'region' }
  },
  form: {
    type: 'role',
    value: { options: { name: 'login form' }, role: 'region' }
  },
  loginButton: {
    type: 'role',
    value: { options: { name: 'submit login' }, role: 'button' }
  },
  passwordTextfieldContainer: {
    type: 'role',
    value: { options: { name: 'password textfield' }, role: 'region' }
  },
  textfield: {
    type: 'role',
    value: { options: { name: 'input field' }, role: 'textbox' }
  },
  title: {
    type: 'role',
    value: { options: { name: 'hint' }, role: 'heading' }
  }
} as const;
