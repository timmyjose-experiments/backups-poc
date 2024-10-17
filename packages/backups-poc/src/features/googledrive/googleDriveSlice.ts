import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../store/store'

export interface GoogleDriveState {
  accessToken: string | null
}

const initialState: GoogleDriveState = {
  accessToken: null
}

export const googleDriveSlice = createSlice({
  name: 'googledrive',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },
    revokeAccessToken: (state) => {
      state.accessToken = null
    }
  }
})

export const getGoogleDriveAccessToken = (state: AppState) => state.googleDrive.accessToken

export const { setAccessToken, revokeAccessToken } = googleDriveSlice.actions
export default googleDriveSlice.reducer
