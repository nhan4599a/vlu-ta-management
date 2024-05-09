import axios, { AxiosRequestConfig } from "axios";
import { store } from "../features/store";
import {
  closeLoadingDialog,
  showLoadingDialog,
} from "../features/slices/loading.slice";
import { IApiResponse } from "../types/integration.type";
import { showMessageDialog } from "../features/slices/messages.slice";

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:5000/",
};

const apiClient = axios.create(config);
let numberOfRequests = 0;

apiClient.interceptors.request.use((config) => {
  if (numberOfRequests === 0) {
    store.dispatch(showLoadingDialog());
  }
  numberOfRequests += 1;
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    numberOfRequests -= 1;
    if (numberOfRequests === 0) {
      store.dispatch(closeLoadingDialog());
    }
    return response.data.result;
  },
  (err: IApiResponse<unknown>) => {
    numberOfRequests -= 1;
    if (numberOfRequests === 0) {
      store.dispatch(closeLoadingDialog());
    }

    if (err.error) {
      store.dispatch(showMessageDialog(err.error));
    } else {
      store.dispatch(showMessageDialog("Cannot connect to server"));
    }

    return Promise.reject(err)
  }
);

const createQueryString = (query?: Record<string, unknown>) => {
  if (!query) {
    return "";
  }

  return Object.entries(query).reduce((accumulate, [key, value]) => {
    let result = accumulate === "" ? "?" : "&";

    result += `${key}=${value}`;

    return accumulate + result;
  }, "");
};

export type NetworkRequest = {
  path: string;
  query?: Record<string, unknown>;
  body?: object | FormData;
};

const get = <TResult>({ path, query }: NetworkRequest) => {
  const queryString = createQueryString(query);

  return apiClient.get<TResult, TResult>(path + queryString);
};

const post = <TResult>({ path, query, body }: NetworkRequest) => {
  const queryString = createQueryString(query);

  const contentType =
    body instanceof FormData ? "multipart/form-data" : "application/json";

  return apiClient.post<TResult, TResult>(path + queryString, body, {
    headers: {
      "Content-Type": contentType,
    },
  });
};

export { get, post };
