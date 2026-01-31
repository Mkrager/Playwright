import { Common } from "./common";

export class IssuePage extends Common {
  sumbitButton = 'a[onclick*="query_form"]';
  clearButton = ".icon.icon-reload";
  resultTableRows = "table.list.issues tbody tr";
  filtersTableRows = "#filters-table tr.filter";

  operatorStatus = "#operators_status_id";
  valueStatus = "#values_status_id_1";
  filter = "#add_filter_select";

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
    await this.selectOption(this.filter, value);
  };

  selectOperatorStatus = async (value: string) => {
    await this.selectOption(this.operatorStatus, value);
  };

  selectValueStatus = async (value: string) => {
    await this.selectOption(this.valueStatus, value);
  };
}
