export enum TaskAction {
  Add,
  Update,
  Delete,
}

export interface ITaskItem {
  content: string;
  isCompleted: boolean;
  state: TaskAction | null;
  _id?: string | null;
}
