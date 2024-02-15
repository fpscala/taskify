import { User } from "./users.interface";

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
  createdAt: Date;
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
  updatedAt?: Date;
  deletedAt?: string;
  sprintColor?: string;
  assigner?: User
}
