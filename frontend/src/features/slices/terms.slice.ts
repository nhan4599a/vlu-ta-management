import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, patch, post } from "@main/api";
import { PaginationResponse } from "@main/types/integration.type";
import { TermDataItem } from "@main/types/term.type";
import { RootState } from "@redux/store";
import { ISetting } from "@main/types/setting.type";

type InitialState = {
  termsResponse: PaginationResponse<TermDataItem>;
  currentSchedule?: number;
  currentPage: number;
  availableJobsOnlyMode: boolean;
};

const initialState: InitialState = {
  termsResponse: {
    data: [],
    count: 0,
  },
  currentPage: 1,
  availableJobsOnlyMode: true,
};

export const importTermsData = createAsyncThunk(
  "terms/import",
  async (payload: FormData, { rejectWithValue }) => {
    try {
      return await post<ISetting>({
        path: "/hoc-phan",
        body: payload,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getTermsDataList = createAsyncThunk(
  "terms/fetch",
  async (
    payload:
      | {
          assistantsAvailableOnly?: boolean;
          availableJobsOnly?: boolean;
          myself?: boolean;
        }
      | undefined,
    { getState, rejectWithValue }
  ) => {
    const { terms, setting } = getState() as RootState;

    if (!setting.currentSetting) {
      return Promise.resolve(initialState.termsResponse);
    }

    try {
      return await get<PaginationResponse<TermDataItem>>({
        path: "/hoc-phan",
        query: {
          page: terms.currentPage,
          ...setting.currentSetting,
          assistantsAvailableOnly: payload?.assistantsAvailableOnly,
          availableJobsOnly:
            payload?.availableJobsOnly ??
            (terms.availableJobsOnlyMode ? true : undefined),
          myself: payload?.myself,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const attachAttendanceRecordFile = createAsyncThunk(
  "terms/attendance/update",
  async (payload: string | null, { getState, rejectWithValue }) => {
    const { terms } = getState() as RootState;
    const { classId } = terms.termsResponse.data[terms.currentSchedule!];

    try {
      return await patch({
        path: `/hoc-phan/classes/${classId}/attendant`,
        body: {
          attendantUrl: payload,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const termsSlice = createSlice({
  name: "terms",
  initialState,
  reducers: {
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
    setCurrentSchedule(state, { payload }: PayloadAction<number | undefined>) {
      state.currentSchedule = payload;
    },
    setAvailableJobsOnlyMode(state, { payload }: PayloadAction<boolean>) {
      state.availableJobsOnlyMode = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTermsDataList.fulfilled, (state, { payload }) => {
      state.termsResponse = payload;
    });
  },
});

export const { setCurrentPage, setCurrentSchedule, setAvailableJobsOnlyMode } =
  termsSlice.actions;
export const termsReducer = termsSlice.reducer;
export const selectTermsData = (state: RootState) => state.terms.termsResponse;
export const selectActiveSchedule = (state: RootState) =>
  state.terms.currentSchedule !== undefined
    ? state.terms.termsResponse.data[state.terms.currentSchedule]
    : undefined;
