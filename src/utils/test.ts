import type { Locator, Page, Route } from '@playwright/test';

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

  private _getElementByType(
    element: ElementType,
    selector: Locator | Page
  ): Locator {
    const { type, value } = element;

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

  private _getElementParentByType(element: ElementType): ElementType[] {
    const { parent } = element;

    if (parent) {
      return [...this._getElementParentByType(parent), parent];
    }

    return [];
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
      const { parent } = currentElement;

      if (locator) {
        return this._getElementByType(currentElement, locator);
      }

      let selector: Locator | Page = this.page;
      if (parent) {
        selector = this._getElementParentByType(currentElement).reduce<
          Page | Locator
        >(
          (result, current) => this._getElementByType(current, result),
          this.page
        );
      }

      return this._getElementByType(currentElement, selector);
    }

    throw new Error("Element name doesn't exist");
  }

  /**
   * Mocks an API response for the given URL with the specified fulfillment parameters.
   *
   * @param {URL} url - The URL of the API request to intercept and mock.
   * @param {Parameters<Route['fulfill']>[0]} args - The fulfillment parameters to mock the response.
   * @returns {Promise<void>} A promise that resolves when the route is successfully set up.
   */
  public async mockAPI(url: URL, args: Parameters<Route['fulfill']>[0]) {
    await this.page.route(url.toString(), (route) => {
      route.fulfill(args);
    });
  }
}
