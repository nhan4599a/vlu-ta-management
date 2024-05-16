import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "@main/api";
import { PaginationResponse } from "@main/types/integration.type";
import { TermDataItem } from "@main/types/term.type";
import { RootState } from "@redux/store";

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
      return await post({
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
    const page = (getState() as RootState).terms.currentPage;

    try {
      return await get<PaginationResponse<TermDataItem>>({
        path: "/hoc-phan",
        query: {
          page,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const termsSlice = createSlice({
  name: "slices",
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

export const { setCurrentPage } = termsSlice.actions
export const termsReducer = termsSlice.reducer;
export const selectTermsData = (state: RootState) => state.terms.termsResponse;
