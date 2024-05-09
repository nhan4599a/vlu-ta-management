import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "../../api"

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
})

export const termsSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {}
})