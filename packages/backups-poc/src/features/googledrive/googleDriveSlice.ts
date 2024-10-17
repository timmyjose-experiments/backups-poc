import { createSlice } from "@reduxjs/toolkit"

export interface GoogleDriveState {
}

const initialState: GoogleDriveState = {}

export const googleDriveSlice = createSlice({
  name: 'googledrive',
  initialState,
  reducers: {
  }
})

export const {} = googleDriveSlice.actions
export default googleDriveSlice.reducer