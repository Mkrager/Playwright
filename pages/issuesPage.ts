import { Common } from "./common";

export class IssuesPage extends Common {
  sumbitButton = 'a[onclick*="query_form"]';
  clearButton = ".icon.icon-reload";
  resultTableRows = "table.list.issues tbody tr";
  filtersTableRows = "#filters-table tr.filter";

  getSumbitButton = () => this.get(this.sumbitButton);
  getFiltersTableRows = () => this.get(this.filtersTableRows);
  getClearButton = () => this.get(this.clearButton);
  getFirstRow = () => this.get(this.resultTableRows).first();
  getLastRow = () => this.get(this.resultTableRows).last();

  getFirstRowStatus = async (): Promise<string> => {
    return (await this.getFirstRow().locator("td.status").textContent()) ?? "";
  };

  getLastRowStatus = async (): Promise<string> => {
    return (await this.getLastRow().locator("td.status").textContent()) ?? "";
  };

  selectFilter = async (value: string) => {
    await this.page.selectOption("#add_filter_select", value);
  };

  selectOperatorStatus = async (value: string) => {
    await this.page.selectOption("#operators_status_id", value);
  };

  selectValueStatus = async (value: string) => {
    await this.page.selectOption("#values_status_id_1", value);
  };
}
