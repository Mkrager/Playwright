import { Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";

export class PageFactory {
  page: Page;
  homePage: HomePage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
  }
}
