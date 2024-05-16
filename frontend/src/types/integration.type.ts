export interface IApiResponse<TResult> {
    success: boolean,
    result?: TResult,
    error?: string
}

export type PaginationRequest = {
    page: number
}

export interface PaginationResponse<TData> {
    data: TData[],
    count: number
}