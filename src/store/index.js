import { configureStore } from "@reduxjs/toolkit"
import commonSlice from './commonStore'

const store = configureStore({
    reducer: {
        commonStore: commonSlice.reducer
    }
})

export default store;