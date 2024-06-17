import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { get, post } from "@main/api";
import { PaginationResponse } from "@main/types/integration.type";
import { SurveyInfo } from "@main/types/survey,type";

type InitialState = {
  currentPage: number;
  surveys: PaginationResponse<SurveyInfo>;
  selectedAssistant?: string;
};

const initialState: InitialState = {
  currentPage: 1,
  surveys: {
    count: 0,
    data: [],
  },
};

export const getSurveyListData = createAsyncThunk(
  "survey/fetch",
  (_: undefined, { getState, rejectWithValue }) => {
    const { authentication, survey } = getState() as RootState;

    try {
      return get<PaginationResponse<SurveyInfo>>({
        path: "/surveys",
        query: {
          page: survey.currentPage,
          lecture: authentication.user!.code,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const submitAssistantSurvey = createAsyncThunk(
  "survey/submit",
  (surveyData: number[], { getState, rejectWithValue }) => {
    const { survey } = getState() as RootState;

    try {
      return post({
        path: "/surveys",
        body: {
          surveyData,
          code: survey.selectedAssistant!,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
    setAssistant(state, { payload }: PayloadAction<string | undefined>) {
      state.selectedAssistant = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSurveyListData.fulfilled, (state, { payload }) => {
      state.surveys = payload;
    });
  },
});

export const { setAssistant, setCurrentPage } = surveySlice.actions;
export const surveyReducer = surveySlice.reducer;
export const selectSurveysData = (state: RootState) => state.survey.surveys;
export const selectSelectedAssistant = (state: RootState) =>
  state.survey.selectedAssistant;
