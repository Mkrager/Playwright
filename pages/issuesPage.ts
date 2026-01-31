import { Common } from "./common";

export class IssuesPage extends Common {
  sumbitButton = 'a[onclick*="query_form"]';

  tableRows = "table.list.issues tbody tr";

  getSumbitButton = () => this.get(this.sumbitButton).first();

  getFirstRow = () => this.get(this.tableRows).first();

  getLastRow = () => this.get(this.tableRows).last();

  getFirstRowStatus = async (): Promise<string> => {
    return (await this.getFirstRow().locator("td.status").textContent()) ?? "";
  };

  getLastRowStatus = async (): Promise<string> => {
    return (await this.getLastRow().locator("td.status").textContent()) ?? "";
  };

  selectOperatorStatus = async (value: string) => {
    await this.page.selectOption("#operators_status_id", value);
  };

  selectValueStatus = async (value: string) => {
    await this.page.selectOption("#values_status_id_1", value);
  };
}
