import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { constant } from "./constants";
import { MsalProvider } from "@azure/msal-react";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

const msalInstance = new PublicClientApplication(
  constant.authentication.msalConfig
);

await msalInstance.initialize();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
