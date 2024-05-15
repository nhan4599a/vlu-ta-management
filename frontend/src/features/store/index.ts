import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../slices/loading.slice";
import { messagesReducer } from "../slices/messages.slice";
import { recruimentReducer } from "../slices/recruiment.slice";
import { authenticationReducer } from "../slices/authentication.slice";
import { usersReducer } from "../slices/users.slice";
import { tasksReducer } from "../slices/tasks.slice";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { termsReducer } from "../slices/terms.slice";

const rootReducer = combineReducers({
  loading: loadingReducer,
  messages: messagesReducer,
  terms: termsReducer,
  recruiment: recruimentReducer,
  authentication: authenticationReducer,
  users: usersReducer,
  tasks: tasksReducer
});

const peristConfig = {
    key: 'root',
    storage,
    whitelist: ['authentication']
}

const persistedRootReducer = persistReducer(peristConfig, rootReducer)

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
