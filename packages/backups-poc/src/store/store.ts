import { configureStore } from '@reduxjs/toolkit'
import googleDriveReducer from '../features/googledrive/googleDriveSlice'

export const store = configureStore({
  reducer: {
    googleDrive: googleDriveReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch