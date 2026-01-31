import { PageFactory } from "../patterns/PageFactory";
import { test, expect } from "@playwright/test";

test.describe("Question page tests", () => {
  let pages: PageFactory;
  test.beforeEach(async ({ page }) => {
    pages = new PageFactory(page);
    await pages.homePage.openHome();
  });

  test("should sort questions by new status", async () => {
    expect(pages.homePage.getIssuesButton()).toBeVisible();
    await pages.homePage.getIssuesButton().click();
    await pages.issuePage.selectOperatorStatus("=");
    await pages.issuePage.selectValueStatus("1");
    await pages.issuePage.getSumbitButton().click();

    const firstStatus = await pages.issuePage.getRowColumnText(
      "first",
      "status",
    );
    const lastStatus = await pages.issuePage.getRowColumnText("last", "status");

    expect(firstStatus.trim()).toBe("New");
    expect(lastStatus.trim()).toBe("New");
  });

  test("should sort questions by closed status and patch tracker", async () => {
    expect(pages.homePage.getIssuesButton()).toBeVisible();
    await pages.homePage.getIssuesButton().click();
    await pages.issuePage.selectOperatorStatus("=");
    await pages.issuePage.selectValueStatus("5");
    await pages.issuePage.selectFilter("tracker_id");
    await pages.issuePage.getSumbitButton().click();

    const firstStatus = await pages.issuePage.getRowColumnText(
      "first",
      "status",
    );
    const lastStatus = await pages.issuePage.getRowColumnText("last", "status");

    const firstTracker = await pages.issuePage.getRowColumnText(
      "first",
      "tracker",
    );
    const lastTracker = await pages.issuePage.getRowColumnText(
      "last",
      "tracker",
    );

    expect(firstStatus.trim()).toBe("Closed");
    expect(lastStatus.trim()).toBe("Closed");

    expect(firstTracker.trim()).toBe("Defect");
    expect(lastTracker.trim()).toBe("Defect");
  });

  test("should clear filters", async () => {
    expect(pages.homePage.getIssuesButton()).toBeVisible();
    await pages.homePage.getIssuesButton().click();
    await pages.issuePage.selectFilter("tracker_id");
    await pages.issuePage.getClearButton().click();

    const filterRows = pages.issuePage.getFiltersTableRows();
    await expect(filterRows).toHaveCount(1);
  });

  test("should add priority column", async () => {
    expect(pages.homePage.getIssuesButton()).toBeVisible();
    await pages.homePage.getIssuesButton().click();
    await pages.issuePage.getOptionsButton().last().click();
    await pages.issuePage.selectOptions("priority");
    await pages.issuePage.getMoveRightButton().click();
    await pages.issuePage.getSumbitButton().click();

    const firstPriority = await pages.issuePage.getRowColumnText(
      "first",
      "priority",
    );
    await expect(firstPriority).not.toBe("");
  });
});
