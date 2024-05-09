import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../../api"
import { PaginaionResponse } from "../../types/integration.type";
import { TermDataItem } from "../../types/terrms.type";

const initialState = {

}

export const importTermsData = createAsyncThunk('terms/import', async (payload: FormData, { rejectWithValue }) => {
    try {
        return await post({
            path: '/hoc-phan',
            body: payload
        })
    } catch (e) {
        return rejectWithValue(e)
    }
});

export const getTermsDataList = createAsyncThunk('terms/fetch', async (payload : number, { rejectWithValue }) => {
    try {
        return await get<PaginaionResponse<TermDataItem>>({
            path: '/hoc-phan',
            query: {
                page: payload
            }
        })
    } catch (e) {
        return rejectWithValue(e)
    }
});

export const termsSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {}
})