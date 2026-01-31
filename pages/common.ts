import { Locator, Page, expect } from "@playwright/test";

export abstract class Common {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(endpoint: string) {
    await this.page.goto(endpoint);
    await this.page.waitForLoadState();
    await this.page.addStyleTag({
      content: `
      iframe[id^="aswift"],
      ins.adsbygoogle,
      .adsbygoogle {
        display: none !important;
      }
    `,
    });
  }

  selectOption = async (locator: string, value: string) => {
    await this.page.selectOption(locator, value);
  };
  get = (locator: string): Locator => this.page.locator(locator);

  // Header
  pcSearchInput = "#q";
  mobileSearchButton = "#flyout-search";
  issuesButton = ".issues";
  forumButton = ".boards";
  sideBarButton = ".mobile-toggle-button.js-flyout-menu-toggle-button";

  getSearchInput = () => {
    const isMobile = this.page.viewportSize()?.width! < 768;

    return isMobile
      ? this.page.locator(this.mobileSearchButton)
      : this.page.locator(this.pcSearchInput);
  };
  getIssuesButton = () => this.get(this.issuesButton);
  getForumButton = () => this.get(this.forumButton);
  getSideBarButton = () => this.get(this.sideBarButton);

  async sumbitSearch() {
    await this.getSearchInput().press("Enter");
  }

  async fillSearchInput(input: string) {
    await this.getSearchInput().fill(input);
  }
}
