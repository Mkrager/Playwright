import { HomePage } from "../pages/homePage";
import { IssuePage } from "../pages/issuePage";
import { test, expect } from "@playwright/test";

test.describe("Question page tests", () => {
  let homePage: HomePage;
  let issuePage: IssuePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    issuePage = new IssuePage(page);
    await homePage.openHome();
  });

  test("should sort questions by new status", async () => {
    expect(homePage.getIssuesButton()).toBeVisible();
    await homePage.getIssuesButton().click();
    await issuePage.selectOperatorStatus("=");
    await issuePage.selectValueStatus("1");
    await issuePage.getSumbitButton().click();

    const firstStatus = await issuePage.getRowColumnText("first", "status");
    const lastStatus = await issuePage.getRowColumnText("last", "status");

    expect(firstStatus.trim()).toBe("New");
    expect(lastStatus.trim()).toBe("New");
  });

  test("should sort questions by closed status and patch tracker", async () => {
    expect(homePage.getIssuesButton()).toBeVisible();
    await homePage.getIssuesButton().click();
    await issuePage.selectOperatorStatus("=");
    await issuePage.selectValueStatus("5");
    await issuePage.selectFilter("tracker_id");
    await issuePage.getSumbitButton().click();

    const firstStatus = await issuePage.getRowColumnText("first", "status");
    const lastStatus = await issuePage.getRowColumnText("last", "status");

    const firstTracker = await issuePage.getRowColumnText("first", "tracker");
    const lastTracker = await issuePage.getRowColumnText("last", "tracker");

    expect(firstStatus.trim()).toBe("Closed");
    expect(lastStatus.trim()).toBe("Closed");

    expect(firstTracker.trim()).toBe("Defect");
    expect(lastTracker.trim()).toBe("Defect");
  });

  test("should clear filters", async () => {
    expect(homePage.getIssuesButton()).toBeVisible();
    await homePage.getIssuesButton().click();
    await issuePage.selectFilter("tracker_id");
    await issuePage.getClearButton().click();

    const filterRows = issuePage.getFiltersTableRows();
    await expect(filterRows).toHaveCount(1);
  });

  test("should add priority column", async () => {
    expect(homePage.getIssuesButton()).toBeVisible();
    await homePage.getIssuesButton().click();
    await issuePage.getOptionsButton().last().click();
    await issuePage.selectOptions("priority");
    await issuePage.getMoveRightButton().click();
    await issuePage.getSumbitButton().click();

    const firstPriority = await issuePage.getRowColumnText("first", "priority");
    await expect(firstPriority).not.toBe("");
  });
});
