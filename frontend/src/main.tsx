import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { constant } from "./constants/index.ts";
import { MsalProvider } from "@azure/msal-react";
import { Provider } from "react-redux";
import { persistor, store } from "./features/store/index.ts";
import { PersistGate } from "redux-persist/integration/react";

const msalInstance = new PublicClientApplication(
  constant.authentication.msalConfig
);

await msalInstance.initialize();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <BrowserRouter>
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
