import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "@main/api";
import { IUser } from "@main/types/user.type";
import { RootState } from "@redux/store";
import { ISetting } from "@main/types/setting.type";

type UserInfo = IUser & {
  currentSetting: ISetting | null;
};

type AuthenticationState = {
  accessToken?: string;
  user?: UserInfo;
  isAuthenticated: boolean;
  redirectUrl: string;
};

type CurrentUserInfoResponse = {
  user: IUser;
  setting: ISetting;
};

const initialState: AuthenticationState = {
  isAuthenticated: false,
  redirectUrl: "/",
};

export const postLoginCallback = createAsyncThunk(
  "authenticate/post-login",
  async (_, { rejectWithValue }) => {
    try {
      return await post<UserInfo>({
        path: "/authenticate/post-login",
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getCurrentUserInfo = createAsyncThunk(
  "users/fetch/current",
  async (_: undefined, { rejectWithValue }) => {
    try {
      return await get<CurrentUserInfoResponse>({
        path: `/users/info`,
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
      state.user = undefined;
      state.accessToken = undefined;
      state.isAuthenticated = false;
    },
    updateLocallyUserInfo(state, { payload }: PayloadAction<string>) {
      state.user!.phoneNumber = payload;
    },
    setRedirectUrl(state, { payload }: PayloadAction<string>) {
      state.redirectUrl = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLoginCallback.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getCurrentUserInfo.fulfilled, (state, { payload }) => {
      state.user = {
        ...payload.user,
        currentSetting: payload.setting,
      };
    });
  },
});

export const { setAccessToken, logout, updateLocallyUserInfo, setRedirectUrl } =
  authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
export const selectIsAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;
export const selectCurrentUser = (state: RootState) =>
  state.authentication.user;
export const selectCurrentRole = (state: RootState) =>
  state.authentication.user?.role;
export const selectRedirectUrl = (state: RootState) =>
  state.authentication.redirectUrl;
