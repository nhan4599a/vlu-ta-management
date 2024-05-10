import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../../api";
import { RecruimentInfo } from "../../types/recruiment.type";
import { RootState } from "../store";

export type GetRecruimentPayload = {
  id: string;
  classId: string;
};

type InitialState = {
  termId?: string;
  classId?: string;
  recruimentInfo?: RecruimentInfo;
};

const initialState: InitialState = {
  recruimentInfo: undefined,
};

export const getRecuimentInfo = createAsyncThunk(
  "recruiment/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { termId, classId } = (getState() as RootState).recruiment;

      return await get<RecruimentInfo>({
        path: `tuyen-dung/${termId}/classes/${classId}`,
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
      const { termId, classId } = (getState() as RootState).recruiment;

      return await post({
        path: `tuyen-dung/${termId}/classes/${classId}`,
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
      state.classId = payload.classId;
    },
    unsetRecruimentInfo(state) {
      state.recruimentInfo = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecuimentInfo.fulfilled, (state, { payload }) => {
      state.recruimentInfo = payload;
    });
  },
});

export const recruimentReducer = recruimentSlice.reducer;
export const { setGetDataPayload, unsetRecruimentInfo } = recruimentSlice.actions;
export const selectRecruimentInfo = (state: RootState) =>
  state.recruiment.recruimentInfo;
