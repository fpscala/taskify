export enum IssueStatus {
  TODO = "Todo",
  IN_PROGRESS = "InProgress",
  DONE = "Done",
}
export enum IssueType {
  BUG = "Bug",
  TASK = "Task",
  SUBTASK = "Subtask",
  STORY = "story",
  EPIC = "epic",
}

export interface Issue {
  id: string;
  key: string;
  name: string;
  createdAt: string;
  status: IssueStatus;
  type: IssueType;
  creatorId: string;
  description?: string;
  sprintPosition?: number;
  boardPosition?: number;
  reporterId?: string;
  assigneeId?: string;
  parentId?: string;
  sprintId?: string;
  updatedAt?: string;
  deletedAt?: string;
  sprintColor?: string;
}
