import { PageFactory } from "../patterns/PageFactory";
import { test, expect } from "@playwright/test";

test.describe("Home page tests", () => {
  let pages: PageFactory;
  test.beforeEach(async ({ page }) => {
    pages = new PageFactory(page);
    await pages.homePage.openHome();
  });

  test("should display results when searching for a term", async () => {
    if (await pages.homePage.getSideBarButton().isVisible())
      await pages.homePage.getSideBarButton().click();

    expect(pages.homePage.getSearchInput()).toBeVisible();
    await pages.homePage.fillSearchInput("test");
    await pages.homePage.sumbitSearch();
    const text = await pages.searchPage.getSearchResultCount();
    expect(text).toBeGreaterThan(0);
  });
});
