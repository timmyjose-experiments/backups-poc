import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import styles from '../styles'
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes, User } from '@react-native-google-signin/google-signin'
import { useCallback, useEffect, useState } from 'react'
import { CloudStorage, CloudStorageProvider, CloudStorageScope } from 'react-native-cloud-storage'

const CLOUD_BACKUP_FILE = 'backupspoc.json'
const PK_KEY = 'privateKey'

type LoginResponse = {
  userInfo: User | null
}

const backup = async (key: string, value: string | null): Promise<void> => {
  alert(`Saving key: ${key} with value: ${value}`)
  try {
    CloudStorage.writeFile(CLOUD_BACKUP_FILE, JSON.stringify({
      [PK_KEY]: value
    }), CloudStorageScope.AppData)
  } catch (err: any) {
    alert(err)
  }
}

const restore = async (key: string): Promise<string> => {
  let result = 'not-found'
  try {
    const backupValue = JSON.parse(await CloudStorage.readFile(CLOUD_BACKUP_FILE, CloudStorageScope.AppData))

    if (backupValue && typeof backupValue === 'object' && key in backupValue) {
      result = backupValue[key]
    }
  } catch (err: any) {
    alert(err)
  }

  return result
}

const AndroidGDriveBackup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [loginState, setLoginState] = useState<LoginResponse | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const [restoredPrivateKey, setRestoredPrivateKey] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    CloudStorage.setProviderOptions({ 
      accessToken
    })
  }, [accessToken])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if (isSuccessResponse(response)) {
        if (response.data === null) {
          setLoginState(null)
        } else {
          setLoginState({
            userInfo: response.data
          })
        }
      } else {
        alert('Sign-in was cancelled by user')
      }

      // set the access token
      const tokResp = await GoogleSignin.getTokens()
      setAccessToken(tokResp.accessToken)
    } catch (err: any) {
      if (isErrorWithCode(err)) {
        switch (err.code) {
          case statusCodes.IN_PROGRESS:
            setError('Sign-in is in progress')
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            setError('Google Play services not available for device')
            break
          default:
            setError(err.message)
        }
      } else {
        // non-library error
        alert(`Error: ${err}`)
      }
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut()
      setLoginState(null)
    } catch (err: any) {
      console.error(err)
      setError(err)
    }
  }
  const handleBackup = useCallback(async () => {
    setLoading(true)
    const startTime = Date.now()
    await backup(PK_KEY, privateKey)
    setLoadTime(Date.now() - startTime)
    setLoading(false)
  }, [privateKey])

  const handleRestore = useCallback(async () => {
    setLoading(true)
    const startTime = Date.now()
    setRestoredPrivateKey(await restore(PK_KEY))
    setLoadTime(Date.now() - startTime)
    setLoading(false)
  }, [])

  return (
    <View style={styles.container}>
      { loading && (<ActivityIndicator />)}
      { !!error && (<Text>{error}</Text>)}
      { !!restoredPrivateKey && (<Text>Restored pk: {restoredPrivateKey}</Text>) }
      { loadTime !== null && (<Text>Took {loadTime}ms</Text>)}
        <TextInput
          style={styles.textInput}
          onChangeText={text => {
            setRestoredPrivateKey(null)
            setPrivateKey(text)
          }}
          placeholder='Enter new private key' />
        { CloudStorage.getProvider() === CloudStorageProvider.GoogleDrive && !accessToken ? (
          <Pressable
            style={styles.button}
            onPress={signIn}>
            <Text>Sign In</Text>
          </Pressable>
        ) : (
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={styles.button}
            onPress={() => handleBackup()}>
            <Text>Backup</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleRestore}>
            <Text>Restore</Text>
          </Pressable>
        </View>
        )}
        { accessToken && (
           <Pressable
              style={styles.button}
              onPress={signOut}>
              <Text>Sign Out</Text>
          </Pressable>
        )}
      <Pressable
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  )
}

export default AndroidGDriveBackup