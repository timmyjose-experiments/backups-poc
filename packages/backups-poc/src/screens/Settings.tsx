import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, View, Text, Switch } from 'react-native'
import styles from '../styles'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disableBackup, enableBackup, getBackupStatus } from '../features/googledrive/googleDriveSlice'
import useGoogleSignin from '../features/googledrive/useGoogleSignin'

const Settings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useDispatch()
  const { signIn, signOut } = useGoogleSignin()

  // there is no direct way to detect if a Google Account is linked to on the device
  const googleCloudAvailable = true
  // const [googleDriveBackupEnabled, setGoogleDriveBackupEnabled] = useState<boolean>(false)
  const googleDriveBackupEnabled = useSelector(getBackupStatus())

  const enableGoogleCloudBackup = useCallback(async () => {
    // if the user is not signed in already, sign the user in
    // So attempt silent sign-in first. If that fails, try
    // explicit login
    try {
      await signIn()
    } catch (err: any) {
      // todo
      alert(err)
    }
    dispatch(enableBackup())
  }, [dispatch])

  const disableGoogleCloudBackup = useCallback(async () => {
    dispatch(disableBackup())
  }, [dispatch])

  const toggleBackup = async () => {
    if (googleDriveBackupEnabled) {
      await disableGoogleCloudBackup()
      // also, sign out of the currently linked account so that a fresh account may be allowed to link
      // the `react-native-google-signin` library has native persistence (persists old linked account)
      try {
        await signOut()
      } catch (err: any) {
        alert(err)
      }
    } else {
      await enableGoogleCloudBackup()
    }
  }

  return (
    <View style={styles.container}>
      { googleCloudAvailable && (
        <>
          <Text>Enable Google Drive Backup?</Text>
          <Switch
            trackColor={{ false: '#c0c0c0', true: 'green' }}
            value={googleDriveBackupEnabled}
            onValueChange={toggleBackup}/>
        </>
      )}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Main')}>
        <Text>Home</Text>
      </Pressable>
    </View>
  )
}

export default Settings
