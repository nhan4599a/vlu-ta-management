import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, Role } from "../../types/user.type";
import { get, patch } from "../../api";
import { RootState } from "../store";

type SelectedUser = {
  id: string;
  active: boolean;
};

type InitialState = {
  users: IUser[];
  currentRequest: GetUsersByRoleRequest;
  selectedUser?: SelectedUser;
};

const initialState: InitialState = {
  users: [],
  currentRequest: {
    page: 1,
    role: Role.Student,
    isAssistant: false,
  },
};

type GetUsersByRoleRequest = {
  page: number;
  role: Role;
  isAssistant: boolean;
};

export const getUsersList = createAsyncThunk(
  "users/fetch",
  async (payload: GetUsersByRoleRequest | undefined = undefined, { getState, rejectWithValue }) => {
    const state = getState() as RootState

    try {
      return await get<IUser[]>({
        path: "/users",
        query: payload ?? state.users.currentRequest,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const activeUser = createAsyncThunk(
  "users/update",
  async (_: undefined, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    try {
      return await patch({
        path: `/users/${state.users.selectedUser!.id}`,
        body: {
          active: !state.users.selectedUser!.active,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setRequest(state, { payload }: PayloadAction<GetUsersByRoleRequest>) {
      state.currentRequest = payload;
    },
    setSelectedUser(
      state,
      { payload }: PayloadAction<SelectedUser | undefined>
    ) {
      state.selectedUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersList.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export const { setRequest, setSelectedUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUsersList = (state: RootState) => state.users.users;
export const selectSelectedUser = (state: RootState) =>
  state.users.selectedUser;
