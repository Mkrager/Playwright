import { HomePage } from "../pages/homePage";
import { ForumPage } from "../pages/forumPage";
import { test, expect } from "@playwright/test";

test.describe("Forum page tests", () => {
  let homePage: HomePage;
  let forumPage: ForumPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    forumPage = new ForumPage(page);
    await homePage.openHome();
  });

  test("should sort desc created date", async () => {
    expect(homePage.getForumButton()).toBeVisible();
    await homePage.getForumButton().click();
    await forumPage.getDiscussionForum().click();
    await forumPage.getCreatedColumn().click();

    const createdCells = forumPage.getCreatedCells();
    const createdText3 = await createdCells.nth(2).innerText();
    const createdText4 = await createdCells.nth(3).innerText();

    const date3 = new Date(createdText3);
    const date4 = new Date(createdText4);

    expect(date3.getTime()).toBeLessThan(date4.getTime());
  });

  test("should sort asc created date", async () => {
    expect(homePage.getForumButton()).toBeVisible();
    await homePage.getForumButton().click();
    await forumPage.getDiscussionForum().click();

    const createdCells = forumPage.getCreatedCells();
    const createdText3 = await createdCells.nth(2).innerText();
    const createdText4 = await createdCells.nth(3).innerText();

    const date3 = new Date(createdText3);
    const date4 = new Date(createdText4);

    expect(date3.getTime()).toBeGreaterThan(date4.getTime());
  });
});
