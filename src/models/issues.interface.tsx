export enum IssueStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
export enum IssueType {
  BUG = "BUG",
  TASK = "TASK",
  SUBTASK = "SUBTASK",
  STORY = "STORY",
  EPIC = "EPIC",
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
