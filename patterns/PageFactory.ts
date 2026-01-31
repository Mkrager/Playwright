import { Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { IssuePage } from "../pages/issuePage";
import { ForumPage } from "../pages/forumPage";

export class PageFactory {
  page: Page;
  homePage: HomePage;
  issuePage: IssuePage;
  forumPage: ForumPage;
  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.issuePage = new IssuePage(page);
    this.forumPage = new ForumPage(page);
  }
}
