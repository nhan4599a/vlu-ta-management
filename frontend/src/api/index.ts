import axios, { AxiosRequestConfig } from 'axios'
import { store } from '../features/store'
import { closeLoadingDialog, showLoadingDialog } from '../features/slices/loading.slice'
import { IApiResponse } from '../types/integration.type'

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:5000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const apiClient = axios.create(config)

apiClient.interceptors.request.use((config) => {
    store.dispatch(showLoadingDialog())
    return config
})

apiClient.interceptors.response.use((response) => {
    store.dispatch(closeLoadingDialog())
    return response.data
})

const createQueryString = (query?: Record<string, unknown>) => {
    if (!query) {
        return ''
    }

    return Object.entries(query).reduce((accumulate, [key, value]) => {
        let result = accumulate === '' ? '?' : '&'

        result += `${key}=${value}`

        return accumulate + result
    }, '')
}

export type NetworkRequest = {
    path: string,
    query?: Record<string, unknown>,
    body?: object | FormData
}

const get = <TResult>({ path, query }: NetworkRequest) => {
    const queryString = createQueryString(query)

    return apiClient.get<IApiResponse<TResult>>(path + queryString)
}

const post = <TResult>({ path, query, body }: NetworkRequest) => {
    const queryString = createQueryString(query)

    return apiClient.post<IApiResponse<TResult>>(path + queryString, body)
}

export {
    get,
    post
}