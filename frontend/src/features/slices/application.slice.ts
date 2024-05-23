import { get, patch, post } from "@main/api";
import {
  ApplicationForm,
  OverviewApplicationFormResponse,
} from "@main/types/application-form.type";
import { PaginationResponse } from "@main/types/integration.type";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import { TermClassInfo } from "@main/types/term.type";

type InitialState = {
  applicationId?: string;
  applicationInfo?: ApplicationForm;
  applicationsResponse: PaginationResponse<ApplicationForm>;
  termClassInfo?: TermClassInfo;
  scheduleId?: string;
  page: number;
  applicationsOverview: OverviewApplicationFormResponse[];
};

const initialState: InitialState = {
  applicationsResponse: {
    data: [],
    count: 0,
  },
  page: 1,
  applicationsOverview: [],
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
  async (_: undefined, { getState, rejectWithValue }) => {
    try {
      const { scheduleId, page } = (getState() as RootState).application;
      return await get<PaginationResponse<ApplicationForm>>({
        path: `/tuyen-dung/classes/${scheduleId}/applications`,
        query: {
          page: page,
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

      return await get<ApplicationForm>({
        path: `/tuyen-dung/applications/${applicationId}`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const approveApplicationForm = createAsyncThunk(
  "applications/approve",
  async (payload: boolean, { getState, rejectWithValue }) => {
    try {
      const { applicationId } = (getState() as RootState).application;

      return await patch({
        path: `/tuyen-dung/applications/${applicationId}/approve`,
        body: {
          approved: payload,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getTermClassInfo = createAsyncThunk(
  "applications/terms/info",
  async (payload: string, { rejectWithValue }) => {
    try {
      return await get<TermClassInfo>({
        path: `/hoc-phan/classes/${payload}`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const exportEligibleList = createAsyncThunk(
  "applications/export/eligible",
  async (_: undefined, { rejectWithValue }) => {
    try {
      return await post<Blob>({
        path: `/application/export-eligible`,
        options: {
          responseType: "blob",
        },
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
    setPage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    setScheduleId(state, { payload }: PayloadAction<string | undefined>) {
      state.scheduleId = payload;
    },
    setApplicationId(state, { payload }: PayloadAction<string | undefined>) {
      state.applicationId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getApplicationsOverview.fulfilled,
      (
        state,
        { payload }: PayloadAction<OverviewApplicationFormResponse[]>
      ) => {
        state.applicationsOverview = payload.map((item) => {
          item.scheduleId = item.applications[0].scheduleId;

          return item;
        });
      }
    );
    builder.addCase(
      getApplicationInfo.fulfilled,
      (state, { payload }: PayloadAction<ApplicationForm>) => {
        state.applicationInfo = payload;
      }
    );
    builder.addCase(
      getApplicationsOfClass.fulfilled,
      (
        state,
        { payload }: PayloadAction<PaginationResponse<ApplicationForm>>
      ) => {
        state.applicationsResponse = payload;
      }
    );
    builder.addCase(
      getTermClassInfo.fulfilled,
      (state, { payload }: PayloadAction<TermClassInfo>) => {
        state.termClassInfo = payload;
      }
    );
  },
});

export const { setPage, setScheduleId, setApplicationId } =
  applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
export const selectScheduleId = (state: RootState) =>
  state.application.scheduleId;
export const selectApplicationId = (state: RootState) =>
  state.application.applicationId;
export const selectApplicationInfo = (state: RootState) =>
  state.application.applicationInfo;
export const selectApplicationsData = (state: RootState) =>
  state.application.applicationsResponse;
export const selectTermClassInfo = (state: RootState) =>
  state.application.termClassInfo;
export const selectApplicationsOverview = (state: RootState) =>
  state.application.applicationsOverview;
