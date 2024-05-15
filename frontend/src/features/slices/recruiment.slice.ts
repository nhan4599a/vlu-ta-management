import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, patch, post } from "../../api";
import { RecruimentInfo } from "../../types/recruiment.type";
import { RootState } from "../store";

export type GetRecruimentPayload = {
  id: string;
  scheduleId: string;
};

type InitialState = {
  termId?: string;
  scheduleId?: string;
  recruimentInfo?: RecruimentInfo;
  activeTermName?: string;
};

const initialState: InitialState = {};

export const getRecuimentInfo = createAsyncThunk(
  "recruiment/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { termId, scheduleId } = (getState() as RootState).recruiment;

      return await get<RecruimentInfo>({
        path: `tuyen-dung/${termId}/classes/${scheduleId}`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateRecruimentInfo = createAsyncThunk(
  "recruiment/update",
  async (payload: RecruimentInfo, { getState, rejectWithValue }) => {
    try {
      const { termId, scheduleId } = (getState() as RootState).recruiment;

      return await post({
        path: `tuyen-dung/${termId}/classes/${scheduleId}`,
        body: payload,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const approveRecruimentInfo = createAsyncThunk(
  "recruiment/approve",
  async (payload: boolean, { getState, rejectWithValue }) => {
    try {
      const { termId, scheduleId } = (getState() as RootState).recruiment;

      return await patch({
        path: `tuyen-dung/${termId}/classes/${scheduleId}`,
        body: {
          approved: payload,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const applyRecruiment = createAsyncThunk(
  "recruiment/apply",
  async (payload: FormData, { getState, rejectWithValue }) => {
    const { termId, scheduleId } = (getState() as RootState).recruiment;

    try {
      return await post({
        path: `tuyen-dung/${termId}/classes/${scheduleId}/apply`,
        body: payload,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const recruimentSlice = createSlice({
  name: "recruiment",
  initialState,
  reducers: {
    setGetDataPayload(state, { payload }: PayloadAction<GetRecruimentPayload>) {
      state.termId = payload.id;
      state.scheduleId = payload.scheduleId;
    },
    unsetRecruimentInfo(state) {
      state.recruimentInfo = undefined;
    },
    setActiveTermName(state, { payload }: PayloadAction<string | undefined>) {
      state.activeTermName = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecuimentInfo.fulfilled, (state, { payload }) => {
      state.recruimentInfo = payload;
    });
  },
});

export const recruimentReducer = recruimentSlice.reducer;
export const { setGetDataPayload, unsetRecruimentInfo, setActiveTermName } =
  recruimentSlice.actions;
export const selectRecruimentInfo = (state: RootState) =>
  state.recruiment.recruimentInfo;
export const selectActiveTermName = (state: RootState) =>
  state.recruiment.activeTermName;
