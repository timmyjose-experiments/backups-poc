import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Main from './screens/Main'
import AndroidBackup from './screens/AndroidBackup'
import IOSBackup from './screens/IOSBackup'

export type RootStackParamList = {
  Main: undefined
  AndroidBackup: undefined
  IOSBackup: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen name='AndroidBackup' component={AndroidBackup} />
        <Stack.Screen name='IOSBackup' component={IOSBackup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
