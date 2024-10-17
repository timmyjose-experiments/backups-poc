import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from './screens/Main'
import AndroidDemo from './screens/AndroidDemo'
import AndroidSecureStoreBackup from './features/AndroidSecureStoreBackup'
import AndroidCloudBackup from './features/AndroidCloudBackup'
import IOSDemo from './screens/IOSDemo'
import IOSSecureStoreBackup from './features/IOSSecureStoreBackup'
import IOSCloudBackup from './features/IOSCloudBackup'
import AndroidGDriveBackup from './features/AndroidGDriveBackup'
import { useEffect } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'

export type RootStackParamList = {
  Main: undefined
  AndroidDemo: undefined
  AndroidSecureStoreBackup: undefined
  AndroidCloudBackup: undefined
  AndroidGDriveBackup: undefined
  IOSDemo: undefined
  IOSecureStoreBackup: undefined
  IOSCloudBackup: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  // configure Google sign-in
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '500178956024-31fkohd2lo9730tj73pc1jud1dvgd0o1.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/drive.appdata']
    })
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='AndroidDemo' component={AndroidDemo} />
            <Stack.Screen name='AndroidSecureStoreBackup' component={AndroidSecureStoreBackup} />
            <Stack.Screen name='AndroidCloudBackup' component={AndroidCloudBackup} />
            <Stack.Screen name='AndroidGDriveBackup' component={AndroidGDriveBackup} />
            <Stack.Screen name='IOSDemo' component={IOSDemo} />
            <Stack.Screen name='IOSecureStoreBackup' component={IOSSecureStoreBackup} />
            <Stack.Screen name='IOSCloudBackup' component={IOSCloudBackup} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
