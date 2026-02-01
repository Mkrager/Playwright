import { Page } from "@playwright/test";
import { HomePage } from "./homePage";
import { IssuePage } from "./issuePage";
import { ForumPage } from "./forumPage";
import { SearchPage } from "./searchPage";

export class PageFactory {
  page: Page;
  homePage: HomePage;
  issuePage: IssuePage;
  forumPage: ForumPage;
  searchPage: SearchPage;
  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.issuePage = new IssuePage(page);
    this.forumPage = new ForumPage(page);
    this.searchPage = new SearchPage(page);
  }
}
