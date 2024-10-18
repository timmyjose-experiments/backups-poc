import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '../../store/store'

export interface GoogleDriveState {
  backupEnabled: boolean
}

const initialState: GoogleDriveState = {
  backupEnabled: false
}

export const googleDriveSlice = createSlice({
  name: 'googledrive',
  initialState,
  reducers: {
    enableBackup: (state) => {
      state.backupEnabled = true
    },
    disableBackup: (state) => {
      state.backupEnabled = false
    }
  }
})

export const getBackupStatus = () => (state: AppState) => state.googleDrive.backupEnabled

export const { enableBackup, disableBackup } = googleDriveSlice.actions
export default googleDriveSlice.reducer
