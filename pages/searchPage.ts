import { Common } from "./common";

export class SearchPage extends Common {
  getSearchResults = () => this.get("h3");

  async getSearchResultCount(): Promise<number> {
    return await this.getSearchResults().count();
  }
}
