import { get } from "@main/api";
import {
  ApplicationForm,
  OverviewApplicationFormResponse,
} from "@main/types/application-form.type";
import { PaginationRequest } from "@main/types/integration.type";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  applicationId?: string;
  applicationInfo?: ApplicationForm;
};

const initialState: InitialState = {};

type GetApplicationsOfClassRequest = PaginationRequest & {
  scheduleId: string;
};

export const getApplicationsOverview = createAsyncThunk(
  "applications/fetch/overview",
  async (_: undefined, { rejectWithValue }) => {
    try {
      return await get<OverviewApplicationFormResponse[]>({
        path: "/tuyen-dung/applications",
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getApplicationsOfClass = createAsyncThunk(
  "applications/fetch",
  async (payload: GetApplicationsOfClassRequest, { rejectWithValue }) => {
    try {
      return await get({
        path: `/tuyen-dung/classes/${payload.scheduleId}/applications`,
        query: {
          page: payload.page,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getApplicationInfo = createAsyncThunk(
  "applications/fetch/detail",
  async (_: undefined, { getState, rejectWithValue }) => {
    try {
      const { applicationId } = (getState() as RootState).application;

      return get<ApplicationForm>({
        path: `/tuyen-dung/applications/${applicationId}`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplicationId(state, { payload }: PayloadAction<string | undefined>) {
      state.applicationId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getApplicationInfo.fulfilled,
      (state, { payload }: PayloadAction<ApplicationForm>) => {
        state.applicationInfo = payload;
      }
    );
  },
});

export const { setApplicationId } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
export const selectApplicationId = (state: RootState) =>
  state.application.applicationId;
export const selectApplicationInfo = (state: RootState) => state.application.applicationInfo
