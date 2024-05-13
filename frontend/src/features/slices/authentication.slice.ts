import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "../../api";
import { IUser, Role } from "../../types/user.type";
import { RootState } from "../store";

type AuthenticationState = {
  accessToken?: string;
  user?: IUser;
  isAuthenticated: boolean;
  role?: Role
};

const initialState: AuthenticationState = {
  isAuthenticated: false,
};

export const postLoginCallback = createAsyncThunk(
  "authenticate/post-login",
  async (_, { rejectWithValue }) => {
    try {
      return await post<IUser>({
        path: "/authenticate/post-login",
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string | undefined>) {
      state.accessToken = payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLoginCallback.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.role = payload?.role;
      state.isAuthenticated = true;
    });
  },
});

export const { setAccessToken, logout } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
export const selectIsAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.authentication.user
export const selectCurrentRole = (state: RootState) => state.authentication.user?.role