import { Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { IssuePage } from "../pages/issuePage";
import { ForumPage } from "../pages/forumPage";
import { SearchPage } from "../pages/searchPage";

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
