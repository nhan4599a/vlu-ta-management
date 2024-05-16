/* eslint-disable @typescript-eslint/no-var-requires */

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { IApiResponse } from "@main/types/integration.type";
import {
  closeLoadingDialog,
  showLoadingDialog,
} from "@redux/slices/loading.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:5000/",
};

const apiClient = axios.create(config);
let numberOfRequests = 0;

apiClient.interceptors.request.use(async (config) => {
  const { store } = await import("@redux/store");

  const state = store.getState();

  config.headers.Authorization = `Bearer ${state.authentication.accessToken}`;

  if (numberOfRequests === 0) {
    store.dispatch(showLoadingDialog());
  }
  numberOfRequests += 1;
  return config;
});

apiClient.interceptors.response.use(
  async (response) => {
    const { store } = await import("@redux/store");

    numberOfRequests -= 1;
    if (numberOfRequests === 0) {
      store.dispatch(closeLoadingDialog());
    }
    return response.data.result;
  },
  async (err: AxiosError<IApiResponse<unknown>>) => {
    const { store } = await import("@redux/store");

    numberOfRequests -= 1;
    if (numberOfRequests === 0) {
      store.dispatch(closeLoadingDialog());
    }

    if (err.response?.data?.error) {
      store.dispatch(showMessageDialog(err.response?.data?.error));
    } else {
      store.dispatch(showMessageDialog("Cannot connect to server"));
    }

    return Promise.reject(err);
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

const patch = <TResult>({ path, query, body }: NetworkRequest) => {
  const queryString = createQueryString(query);

  const contentType =
    body instanceof FormData ? "multipart/form-data" : "application/json";

  return apiClient.patch<TResult, TResult>(path + queryString, body, {
    headers: {
      "Content-Type": contentType,
    },
  });
};

export { get, post, patch };
