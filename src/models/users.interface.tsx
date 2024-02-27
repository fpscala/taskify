export enum Privilege {
  CreateUser,
  UpdateUser,
  UpdateAnyUser,
  ViewUsers,
  ViewTasks,
  CreateTask,
  UpdateTask,
}

export interface Asset {
  contentType?: string;
  extension: string;
  filename?: string;
  url?: string;
}

export interface User {
  createdAt: string;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  privileges: Privilege[];
  image?: Asset;
}
