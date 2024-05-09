import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type MessageOption = {
  message: string;
  onButtonClick?: () => void;
};

const initialState = {
  messages: [] as (MessageOption | string)[],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    showMessageDialog(
      state,
      { payload }: PayloadAction<MessageOption | string>
    ) {
      if (typeof payload === "string") {
        state.messages.unshift({
          message: payload,
        });
      } else {
        state.messages.unshift(payload);
      }
    },
    closeMessageDialog(state) {
      state.messages.shift();
    },
  },
});

export const { showMessageDialog, closeMessageDialog } = messagesSlice.actions
export const messagesReducer = messagesSlice.reducer;
export const selectCurrentMessage = (state: RootState) => state.messages.messages[0] as MessageOption;
