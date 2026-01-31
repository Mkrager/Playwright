import { Locator, Page, expect } from "@playwright/test";

export abstract class Common {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(endpoint: string) {
    await this.page.goto(endpoint);
    await this.page.waitForLoadState();
  }

  get = (locator: string): Locator => this.page.locator(locator);

  // Header
  searchInput = "#q";

  getSearchInput = () => this.get(this.searchInput);

  async sumbitSearch() {
    await this.getSearchInput().press("Enter");
  }

  async fillSearchInput(input: string) {
    await this.getSearchInput().fill(input);
  }
}
