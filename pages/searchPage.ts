import { Common } from "./common";

export class SearchPage extends Common {
  getSearchResults = () => this.page.locator("h3", { hasText: "Results" });

  async getSearchResultCount(): Promise<number> {
    const text = await this.getSearchResults().innerText();
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
