import type { Page } from '@playwright/test';

interface BaseElementType {
  parent?: ElementType;
}

/**
 * Interface representing an element located by alt text.
 */
export interface ElementByAltTextType extends BaseElementType {
  type: 'alt-text';
  value: {
    text: Parameters<Page['getByAltText']>[0];
    options?: Parameters<Page['getByAltText']>[1];
  };
}

/**
 * Interface representing an element located by label text.
 */
export interface ElementByLabelType extends BaseElementType {
  type: 'label';
  value: {
    text: Parameters<Page['getByLabel']>[0];
    options?: Parameters<Page['getByLabel']>[1];
  };
}

/**
 * Interface representing an element located by placeholder text.
 */
export interface ElementByPlaceholderType extends BaseElementType {
  type: 'placeholder';
  value: {
    text: Parameters<Page['getByPlaceholder']>[0];
    options?: Parameters<Page['getByPlaceholder']>[1];
  };
}

/**
 * Interface representing an element located by role.
 */
export interface ElementByRoleType extends BaseElementType {
  type: 'role';
  value: {
    role: Parameters<Page['getByRole']>[0];
    options?: Parameters<Page['getByRole']>[1];
  };
}

/**
 * Interface representing an element located by test ID.
 */
export interface ElementByTestIdType extends BaseElementType {
  type: 'test-id';
  value: { testId: string | RegExp };
}

/**
 * Interface representing an element located by text.
 */
export interface ElementByTextType extends BaseElementType {
  type: 'text';
  value: {
    text: Parameters<Page['getByText']>[0];
    options?: Parameters<Page['getByText']>[1];
  };
}

/**
 * Interface representing an element located by title text.
 */
export interface ElementByTitle extends BaseElementType {
  type: 'title';
  value: {
    text: Parameters<Page['getByTitle']>[0];
    options?: Parameters<Page['getByTitle']>[1];
  };
}

/**
 * Union type representing all possible element types that can be located on the page.
 */
export type ElementType =
  | ElementByAltTextType
  | ElementByLabelType
  | ElementByPlaceholderType
  | ElementByRoleType
  | ElementByTestIdType
  | ElementByTextType
  | ElementByTitle;
