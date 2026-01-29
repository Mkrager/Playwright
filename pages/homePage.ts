import { Common } from "./common";

export class HomePage extends Common {
  async openHome() {
    await this.goto("");
  }
}
