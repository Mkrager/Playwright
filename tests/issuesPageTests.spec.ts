import { HomePage } from "../pages/homePage";
import { IssuesPage } from "../pages/issuesPage";
import { test, expect } from "@playwright/test";

test.describe("Question page tests", () => {
  let homePage: HomePage;
  let issuesPage: IssuesPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    issuesPage = new IssuesPage(page);
    await homePage.openHome();
  });

  test("should sort questions by new status", async () => {
    expect(homePage.getIssuesButton()).toBeVisible();
    await homePage.getIssuesButton().click();
    await issuesPage.selectOperatorStatus("=");
    await issuesPage.selectValueStatus("1");
    await issuesPage.getSumbitButton().click();

    const firstRowStatus = await issuesPage.getFirstRowStatus();
    const lastRowStatus = await issuesPage.getLastRowStatus();
    expect(firstRowStatus.trim()).toBe("New");
    expect(lastRowStatus.trim()).toBe("New");
  });

  test("should clear filters", async () => {
    expect(homePage.getIssuesButton()).toBeVisible();
    await homePage.getIssuesButton().click();
    await issuesPage.selectFilter("tracker_id");
    await issuesPage.getClearButton().click();

    const filterRows = issuesPage.getFiltersTableRows();
    await expect(filterRows).toHaveCount(1);
  });
});
