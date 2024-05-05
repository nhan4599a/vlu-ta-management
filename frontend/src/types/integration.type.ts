export interface IApiResponse<TResult> {
    success: boolean,
    result?: TResult,
    error?: string
}