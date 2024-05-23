import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, Role } from "@main/types/user.type";
import { get, patch, post } from "@main/api";
import { RootState } from "@redux/store";
import { PaginationResponse } from "@main/types/integration.type";

type SelectedUser = {
  id: string;
  active: boolean;
};

type InitialState = {
  usersResponse: PaginationResponse<IUser>;
  currentRequest: GetUsersByRoleRequest;
  selectedUser?: SelectedUser;
};

const initialState: InitialState = {
  usersResponse: {
    data: [],
    count: 0,
  },
  currentRequest: {
    page: 1,
    role: Role.Student,
    isAssistant: false,
    needEducated: false,
  },
};

type GetUsersByRoleRequest = {
  page?: number;
  role?: Role;
  isAssistant?: boolean;
  needEducated?: boolean;
};

export const getUsersList = createAsyncThunk(
  "users/fetch",
  async (
    payload: GetUsersByRoleRequest | undefined = undefined,
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;

    try {
      return await get<PaginationResponse<IUser>>({
        path: "/users",
        query: payload ?? state.users.currentRequest,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const activeUser = createAsyncThunk(
  "users/active",
  async (_: undefined, { getState, rejectWithValue }) => {
    const { users } = getState() as RootState;

    try {
      return await post({
        path: `/users/${users.selectedUser!.id}/active`,
        body: {
          active: !users.selectedUser!.active,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (phoneNumber: string, { getState, rejectWithValue }) => {
    const { authentication } = getState() as RootState;

    try {
      return await patch({
        path: `/users/${authentication.user!._id}/active`,
        body: {
          phoneNumber: phoneNumber,
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
      state.usersResponse = payload;
    });
  },
});

export const { setRequest, setSelectedUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUsersList = (state: RootState) => state.users.usersResponse;
export const selectSelectedUser = (state: RootState) =>
  state.users.selectedUser;
