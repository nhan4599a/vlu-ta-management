import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../slices/loading.slice";
import { messagesReducer } from "../slices/messages.slice";
import { recruimentReducer } from "../slices/recruiment.slice";

const rootReducer = combineReducers({
  loading: loadingReducer,
  messages: messagesReducer,
  recruiment: recruimentReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
