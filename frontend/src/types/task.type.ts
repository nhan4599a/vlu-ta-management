import { Attachment } from "./application-form.type";

export enum TaskAction {
  Add,
  Update,
  Delete,
}

export interface ITaskItem {
  content: string;
  isCompleted: boolean;
  state: TaskAction | null;
  attachments: File[] | Attachment[] | null
  _id?: string | null;
}
