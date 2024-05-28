import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "@main/api";
import { RootState } from "@redux/store";
import { ITaskItem, TaskAction } from "@main/types/task.type";

type InitialState = {
  currentScheduleId?: string;
  currentAssignee?: string;
  tasks: ITaskItem[];
  isTasksPromptOpen: boolean;
};

const initialState: InitialState = {
  tasks: [],
  isTasksPromptOpen: false,
};

type UpdateTaskItemAction = {
  taskId: string;
  content: string;
};

type CompleteTaskItemAction = {
  taskId: string;
  isCompleted: boolean;
};

type AttachFilesAction = {
  taskId: string;
  attachments: File[];
};

export const getTasks = createAsyncThunk(
  "tasks/fetch",
  async (_: undefined, { getState, rejectWithValue }) => {
    const { tasks } = getState() as RootState;

    try {
      const data = await get<ITaskItem[]>({
        path: `/hoc-phan/classes/${tasks.currentScheduleId}/users/${tasks.currentAssignee}/tasks`,
      });

      return data.map((item) => ({ ...item, state: null }));
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const saveTasks = createAsyncThunk(
  "tasks/update",
  async (_: undefined, { getState, rejectWithValue }) => {
    try {
      const { tasks } = getState() as RootState;
      const formData = new FormData();

      let fileCount = 0;

      for (let i = 0; i < tasks.tasks.length; i++) {
        const task = tasks.tasks[i];
        formData.append(`tasks[${i}][_id]`, task._id!);
        formData.append(`tasks[${i}][content]`, task.content);
        formData.append(
          `tasks[${i}][isCompleted]`,
          task.isCompleted.toString()
        );
        if (task.state !== null) {
          formData.append(`tasks[${i}][state]`, task.state.toString());
        }

        if (task.attachments) {
          for (
            let fileIndex = 0;
            fileIndex < task.attachments?.length;
            fileIndex++
          ) {
            const file = task.attachments[fileIndex];

            if (file instanceof File) {
              formData.append(`files`, file);
              formData.append(`tasks[${i}][attachments]`, fileCount.toString());
              fileCount += 1;
            } else {
              formData.append(
                `tasks[${i}][attachments][${fileIndex}][originalFileName]`,
                file.originalFileName
              );
              formData.append(
                `tasks[${i}][attachments][${fileIndex}][savedFileName]`,
                file.savedFileName
              );
            }
          }
        }
      }
      return await post({
        path: `/hoc-phan/classes/${tasks.currentScheduleId}/users/${tasks.currentAssignee}/tasks`,
        body: formData,
      });
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setAssignee(state, { payload }: PayloadAction<string | undefined>) {
      state.currentAssignee = payload;
    },
    setScheduleId(state, { payload }: PayloadAction<string | undefined>) {
      state.currentScheduleId = payload;
    },
    openTasksPrompt(state, { payload }: PayloadAction<boolean>) {
      state.isTasksPromptOpen = payload;
    },
    addTask(state, { payload }: PayloadAction<string>) {
      state.tasks.push({
        _id: state.tasks.length.toString(),
        content: payload,
        isCompleted: false,
        attachments: null,
        state: TaskAction.Add,
      });
    },
    updateTask(state, { payload }: PayloadAction<UpdateTaskItemAction>) {
      const task = state.tasks.find((task) => task._id === payload.taskId);
      task!.content = payload.content;

      if (task!.state !== TaskAction.Add) {
        task!.state = TaskAction.Update;
      }
    },
    markAsCompleted(state, { payload }: PayloadAction<CompleteTaskItemAction>) {
      const task = state.tasks.find((task) => task._id === payload.taskId);
      task!.isCompleted = payload.isCompleted;
      task!.state = TaskAction.Update;
    },
    deleteTask(state, { payload }: PayloadAction<number>) {
      const task = state.tasks[payload];

      if (task.state !== TaskAction.Add) {
        task.state = TaskAction.Delete;
      } else {
        state.tasks.splice(payload, 1);
      }
    },
    attachFile(state, { payload }: PayloadAction<AttachFilesAction>) {
      const task = state.tasks.find((task) => task._id === payload.taskId);

      task!.attachments = payload.attachments;

      if (task!.state !== TaskAction.Add) {
        task!.state = TaskAction.Update;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.tasks = payload;
    });
  },
});

export const {
  attachFile,
  setScheduleId,
  setAssignee,
  openTasksPrompt,
  addTask,
  updateTask,
  deleteTask,
  markAsCompleted,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const selectIsOpenTasksPrompt = (state: RootState) =>
  state.tasks.isTasksPromptOpen;
export const selectTasks = (state: RootState) => state.tasks.tasks;
