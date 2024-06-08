import type { ElementType } from '@/types/test-case';

/////////////////////////////////////////////////////////////////////////////
// Shared Constant
/////////////////////////////////////////////////////////////////////////////

export const CREDIT_CARD_FORM_PAGE_URL =
  'https://payment-staging.fithubdev.com/request-transaction/credit-card?price=1155000&transactionId=9bb46200-1a02-4a6c-9591-7f58204df8c7';

/////////////////////////////////////////////////////////////////////////////
// Test Case Elements
/////////////////////////////////////////////////////////////////////////////

const loadingScreen: ElementType = {
  type: 'role',
  value: { options: { name: 'loading screen' }, role: 'region' }
};

const formContainer: ElementType = {
  type: 'role',
  value: { options: { name: 'credit card form' }, role: 'region' }
};

const navbar: ElementType = {
  parent: formContainer,
  type: 'role',
  value: { options: { exact: true, name: 'navbar' }, role: 'region' }
};

const priceInfo: ElementType = {
  parent: formContainer,
  type: 'text',
  value: { text: 'Rp1.155.000' }
};

const creditCardTextfield: ElementType = {
  parent: formContainer,
  type: 'role',
  value: { options: { name: 'credit card number' }, role: 'textbox' }
};

const creditCardExpiredTextfield: ElementType = {
  parent: formContainer,
  type: 'role',
  value: { options: { name: 'credit card expired' }, role: 'textbox' }
};

const cvvTextfield: ElementType = {
  parent: formContainer,
  type: 'role',
  value: { options: { name: 'cvv' }, role: 'textbox' }
};

const cvvIcon: ElementType = {
  parent: formContainer,
  type: 'role',
  value: { options: { name: 'textfield heading icon' }, role: 'img' }
};

const cvvInformationDialog: ElementType = {
  type: 'role',
  value: { options: { name: 'cvv instruction bottom sheet' }, role: 'dialog' }
};

const cvvInformationContent: ElementType = {
  type: 'text',
  value: { text: /Nomor CVV terdiri dari 3 digit/i }
};

const cvvInformationDialogClose: ElementType = {
  type: 'role',
  value: { options: { name: 'bottom sheet close' }, role: 'button' }
};

const creditCardFormButton: ElementType = {
  type: 'role',
  value: { options: { name: 'submit credit card form' }, role: 'button' }
};

export const CREDIT_CARD_FORM_PAGE_ELEMENTS = {
  creditCardExpiredTextfield,
  creditCardFormButton,
  creditCardTextfield,
  cvvIcon,
  cvvInformationContent,
  cvvInformationDialog,
  cvvInformationDialogClose,
  cvvTextfield,
  formContainer,
  loadingScreen,
  navbar,
  priceInfo
} as const;
