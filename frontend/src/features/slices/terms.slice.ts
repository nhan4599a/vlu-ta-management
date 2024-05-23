import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "@main/api";
import { PaginationResponse } from "@main/types/integration.type";
import { TermDataItem } from "@main/types/term.type";
import { RootState } from "@redux/store";
import { ISetting } from "@main/types/setting.type";

type InitialState = {
  termsResponse: PaginationResponse<TermDataItem>;
  currentPage: number;
};

const initialState: InitialState = {
  termsResponse: {
    data: [],
    count: 0,
  },
  currentPage: 1,
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
  async (_: undefined, { getState, rejectWithValue }) => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(getTermsDataList.fulfilled, (state, { payload }) => {
      state.termsResponse = payload;
    });
  },
});

export const { setCurrentPage } = termsSlice.actions;
export const termsReducer = termsSlice.reducer;
export const selectTermsData = (state: RootState) => state.terms.termsResponse;
