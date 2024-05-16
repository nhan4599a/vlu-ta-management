import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, patch, post } from "@main/api";
import { RecruimentInfo } from "@main/types/recruiment.type";
import { RootState } from "@redux/store";

type InitialState = {
  scheduleId?: string;
  recruimentInfo?: RecruimentInfo;
  activeTermName?: string;
};

const initialState: InitialState = {};

export const getRecuimentInfo = createAsyncThunk(
  "recruiment/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { scheduleId } = (getState() as RootState).recruiment;

      return await get<RecruimentInfo>({
        path: `tuyen-dung/classes/${scheduleId}`,
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
      const { scheduleId } = (getState() as RootState).recruiment;

      return await post({
        path: `tuyen-dung/classes/${scheduleId}`,
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
      const { scheduleId } = (getState() as RootState).recruiment;

      return await patch({
        path: `tuyen-dung/classes/${scheduleId}`,
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
    const { scheduleId } = (getState() as RootState).recruiment;

    try {
      return await post({
        path: `tuyen-dung/classes/${scheduleId}/apply`,
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
    setScheduleId(state, { payload }: PayloadAction<string>) {
      state.scheduleId = payload;
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
export const { setScheduleId, unsetRecruimentInfo, setActiveTermName } =
  recruimentSlice.actions;
export const selectRecruimentInfo = (state: RootState) =>
  state.recruiment.recruimentInfo;
export const selectActiveTermName = (state: RootState) =>
  state.recruiment.activeTermName;
