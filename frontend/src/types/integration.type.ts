export interface IApiResponse<TResult> {
    success: boolean,
    result?: TResult,
    error?: string
}

export interface PaginaionResponse<TData> {
    data: TData[],
    count: number
}