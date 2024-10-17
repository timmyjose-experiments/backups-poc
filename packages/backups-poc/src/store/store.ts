import { configureStore } from '@reduxjs/toolkit'
import googleDriveReducer from '../features/googledrive/googleDriveSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOCAL_DATA_KEY } from '../constants'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'

const persistConfig = {
  key: LOCAL_DATA_KEY,
  storage: AsyncStorage
}

const persistedGoogleDriveReducer = persistReducer(persistConfig, googleDriveReducer)

export const store = configureStore({
  reducer: {
    googleDrive: persistedGoogleDriveReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    }
  })
})

export const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
