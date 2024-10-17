import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from './screens/Main'
import AndroidDemo from './screens/AndroidDemo'
import AndroidSecureStoreBackup from './features/AndroidSecureStoreBackup'
import AndroidCloudBackup from './features/AndroidCloudBackup'
import IOSDemo from './screens/IOSDemo'
import IOSSecureStoreBackup from './features/IOSSecureStoreBackup'
import IOSCloudBackup from './features/IOSCloudBackup'

export type RootStackParamList = {
  Main: undefined
  AndroidDemo: undefined
  AndroidSecureStoreBackup: undefined
  AndroidCloudBackup: undefined
  IOSDemo: undefined
  IOSecureStoreBackup: undefined
  IOSCloudBackup: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen name='AndroidDemo' component={AndroidDemo} />
        <Stack.Screen name='AndroidSecureStoreBackup' component={AndroidSecureStoreBackup} />
        <Stack.Screen name='AndroidCloudBackup' component={AndroidCloudBackup} />
        <Stack.Screen name='IOSDemo' component={IOSDemo} />
        <Stack.Screen name='IOSecureStoreBackup' component={IOSSecureStoreBackup} />
        <Stack.Screen name='IOSCloudBackup' component={IOSCloudBackup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
