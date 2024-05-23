import { ISetting } from "@main/types/setting.type"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type InitialState = {
    currentSetting?: ISetting | null
}

const initialState: InitialState = {}

const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setCurrentSetting(state, { payload }: PayloadAction<ISetting | null>) {
            state.currentSetting = payload
        }
    }
})

export const { setCurrentSetting } = settingSlice.actions
export const settingReducer = settingSlice.reducer