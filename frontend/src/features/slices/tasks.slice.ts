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

export const getTasks = createAsyncThunk(
  "tasks/fetch",
  async (_: undefined, { getState, rejectWithValue }) => {
    const { tasks } = getState() as RootState;

    try {
      return await get<ITaskItem[]>({
        path: `/hoc-phan/classes/${tasks.currentScheduleId}/users/${tasks.currentAssignee}/tasks`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const saveTasks = createAsyncThunk(
  "tasks/update",
  async (_: undefined, { getState, rejectWithValue }) => {
    const { tasks } = getState() as RootState;

    try {
      return await post({
        path: `/hoc-phan/classes/${tasks.currentScheduleId}/users/${tasks.currentAssignee}/tasks`,
        body: {
          tasks: tasks.tasks,
        },
      });
    } catch (e) {
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
    deleteTask(state, { payload }: PayloadAction<number>) {
      const task = state.tasks[payload];

      if (task.state !== TaskAction.Add) {
        task.state = TaskAction.Delete;
      } else {
        state.tasks.splice(payload, 1);
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
  setScheduleId,
  setAssignee,
  openTasksPrompt,
  addTask,
  updateTask,
  deleteTask,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const selectIsOpenTasksPrompt = (state: RootState) =>
  state.tasks.isTasksPromptOpen;
export const selectTasks = (state: RootState) => state.tasks.tasks;
