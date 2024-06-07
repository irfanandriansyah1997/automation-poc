import type { Locator, Page } from '@playwright/test';

import type { ElementType } from '@/types/test-case';

/**
 * Abstract class representing a test case page.
 * Provides common functionality to navigate to a page and get elements by various types.
 *
 * @template T - A record type where the key is a string and the value is of type ElementType.
 */
export abstract class AbstractTestCasePage<
  T extends Record<string, ElementType>
> {
  abstract elements: T;

  /**
   * The Playwright Page object.
   */
  public page: Page;

  /**
   * Constructor to create an instance of AbstractTestCasePage.
   *
   * @param {Page} page - The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specified URL.
   *
   * @param {...Parameters<Page['goto']>} args - The arguments to pass to the page.goto method.
   * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
   */
  public async goTo(...args: Parameters<Page['goto']>): Promise<void> {
    await this.page.goto(...args);
  }

  /**
   * Retrieves a Locator for an element by its name.
   *
   * @param {keyof T} elementName - The name of the element to retrieve.
   * @returns {Locator} - The Playwright Locator for the element.
   * @throws {Error} - Throws an error if the element name doesn't exist in the elements record.
   */
  public getElement(elementName: keyof T, locator?: Locator): Locator {
    const currentElement = this.elements[elementName];

    if (currentElement && currentElement.type && currentElement.value) {
      const { type, value } = currentElement;
      const selector = locator ? locator : this.page;

      switch (type) {
        case 'alt-text': {
          const { options, text } = value;
          return selector.getByAltText(text, options);
        }

        case 'label': {
          const { options, text } = value;
          return selector.getByLabel(text, options);
        }

        case 'placeholder': {
          const { options, text } = value;
          return selector.getByPlaceholder(text, options);
        }

        case 'role': {
          const { options, role } = value;
          return selector.getByRole(role, options);
        }

        case 'text': {
          const { options, text } = value;
          return selector.getByText(text, options);
        }

        case 'test-id': {
          return selector.getByTestId(value.testId);
        }

        case 'title': {
          const { options, text } = value;
          return selector.getByTitle(text, options);
        }
      }
    }

    throw new Error("Element name doesn't exist");
  }
}
