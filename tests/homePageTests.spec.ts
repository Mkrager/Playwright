import { HomePage } from "../pages/homePage";
import { SearchPage } from "../pages/searchPage";
import { test, expect } from "@playwright/test";

test.describe("Home page tests", () => {
  let homePage: HomePage;
  let searchPage: SearchPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.openHome();
  });

  test("Search test", async () => {
    expect(homePage.getSearchInput()).toBeVisible();
    await homePage.fillSearchInput("test");
    await homePage.getSearchLink().click();
    const count = await searchPage.getSearchResultCount();
    expect(count).toBeGreaterThan(0);
  });
});
