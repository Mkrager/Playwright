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

  selectOption = async (locator: string, value: string) => {
    await this.page.selectOption(locator, value);
  };
  get = (locator: string): Locator => this.page.locator(locator);

  // Header
  searchInput = "#q";
  issuesButton = ".issues";
  forumButton = ".boards";

  getSearchInput = () => this.get(this.searchInput);
  getIssuesButton = () => this.get(this.issuesButton);
  getForumButton = () => this.get(this.forumButton);

  async sumbitSearch() {
    await this.getSearchInput().press("Enter");
  }

  async fillSearchInput(input: string) {
    await this.getSearchInput().fill(input);
  }
}
