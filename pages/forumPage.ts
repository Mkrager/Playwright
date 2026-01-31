import { Common } from "./common";

export class ForumPage extends Common {
  discussionForum = 'a[href="/projects/redmine/boards/1"]';
  createdColumn = 'a[href*="sort=created_on"]';
  createdCells = "table.list.messages tbody tr td.created_on";

  getCreatedCells = () => this.get(this.createdCells);
  getDiscussionForum = () => this.get(this.discussionForum);
  getCreatedColumn = () => this.get(this.createdColumn);
}
