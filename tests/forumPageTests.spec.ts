import { test, expect } from "@playwright/test";
import { PageFactory } from "../pages/PageFactory";

test.describe("Forum page tests", () => {
  let pages: PageFactory;
  test.beforeEach(async ({ page }) => {
    pages = new PageFactory(page);
    await pages.homePage.openHome();
  });

  test("should sort desc created date", async () => {
    expect(pages.homePage.getForumButton()).toBeVisible();
    await pages.homePage.getForumButton().click();
    await pages.forumPage.getDiscussionForum().click();
    await pages.forumPage.getCreatedColumn().click();

    const createdCells = pages.forumPage.getCreatedCells();
    const createdText3 = await createdCells.nth(2).innerText();
    const createdText4 = await createdCells.nth(3).innerText();

    const date3 = new Date(createdText3);
    const date4 = new Date(createdText4);

    expect(date3.getTime()).toBeLessThan(date4.getTime());
  });

  test("should sort asc created date", async () => {
    expect(pages.homePage.getForumButton()).toBeVisible();
    await pages.homePage.getForumButton().click();
    await pages.forumPage.getDiscussionForum().click();

    const createdCells = pages.forumPage.getCreatedCells();
    const createdText3 = await createdCells.nth(2).innerText();
    const createdText4 = await createdCells.nth(3).innerText();

    const date3 = new Date(createdText3);
    const date4 = new Date(createdText4);

    expect(date3.getTime()).toBeGreaterThan(date4.getTime());
  });
});
