import { Common } from "./common";

export class IssuePage extends Common {
  sumbitButton = 'a[onclick*="query_form"]';
  clearButton = ".icon.icon-reload";
  resultTableRows = "table.list.issues tbody tr";
  filtersTableRows = "#filters-table tr.filter";
  optionsButton = 'legend[onclick="toggleFieldset(this);"]';
  moveRightButton = ".move-right";

  operatorStatus = "#operators_status_id";
  valueStatus = "#values_status_id_1";
  filterSelect = "#add_filter_select";
  optionSelect = "#available_c";

  getSumbitButton = () => this.get(this.sumbitButton);
  getFiltersTableRows = () => this.get(this.filtersTableRows);
  getClearButton = () => this.get(this.clearButton);
  getOptionsButton = () => this.get(this.optionsButton);
  getMoveRightButton = () => this.get(this.moveRightButton);

  getRowColumnText = async (
    row: "first" | "last",
    columnClass: string,
  ): Promise<string> => {
    let rowLocator;
    if (row === "first") {
      rowLocator = this.get(this.resultTableRows).first();
    } else {
      rowLocator = this.get(this.resultTableRows).last();
    }

    const text = await rowLocator.locator(`td.${columnClass}`).textContent();
    return text?.trim() ?? "";
  };

  selectFilter = async (value: string) => {
    await this.selectOption(this.filterSelect, value);
  };

  selectOperatorStatus = async (value: string) => {
    await this.selectOption(this.operatorStatus, value);
  };

  selectValueStatus = async (value: string) => {
    await this.selectOption(this.valueStatus, value);
  };

  selectOptions = async (value: string) => {
    await this.selectOption(this.optionSelect, value);
  };
}
