import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, View, Text, TextInput, ActivityIndicator } from 'react-native'
import styles from '../styles'
import { useCallback, useEffect, useState } from 'react'
import { CloudStorage, CloudStorageProvider, CloudStorageScope } from 'react-native-cloud-storage'
import useGoogleSignin from './googledrive/useGoogleSignin'
import { CLOUD_BACKUP_FILE, CLOUD_BACKUP_KEY } from '../constants'

const backup = async (key: string, value: string | null): Promise<void> => {
  alert(`Saving key: ${key} with value: ${value}`)
  try {
    CloudStorage.writeFile(CLOUD_BACKUP_FILE, JSON.stringify({
      [CLOUD_BACKUP_KEY]: value
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

  const { signIn, signOut, accessToken, signinError } = useGoogleSignin()

  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const [restoredPrivateKey, setRestoredPrivateKey] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      try {
        await signIn()
      } catch (err: any) {
        // accessToken should be null if we are here
      }
    })()
    CloudStorage.setProviderOptions({
      accessToken
    })
  }, [accessToken])

  const handleBackup = useCallback(async () => {
    setLoading(true)
    const startTime = Date.now()
    await backup(CLOUD_BACKUP_KEY, privateKey)
    setLoadTime(Date.now() - startTime)
    setLoading(false)
  }, [privateKey])

  const handleRestore = useCallback(async () => {
    setLoading(true)
    const startTime = Date.now()
    setRestoredPrivateKey(await restore(CLOUD_BACKUP_KEY))
    setLoadTime(Date.now() - startTime)
    setLoading(false)
  }, [])

  return (
    <View style={styles.container}>
      { loading && (<ActivityIndicator />)}
      { !!signinError && (<Text>{signinError}</Text>)}
      { !!restoredPrivateKey && (<Text>Restored pk: {restoredPrivateKey}</Text>) }
      { loadTime !== null && (<Text>Took {loadTime}ms</Text>)}
      <TextInput
        style={styles.textInput}
        onChangeText={text => {
          setRestoredPrivateKey(null)
          setPrivateKey(text)
        }}
        placeholder='Enter new private key' />
      { CloudStorage.getProvider() === CloudStorageProvider.GoogleDrive && !accessToken
        ? (
          <Pressable
            style={styles.button}
            onPress={signIn}>
            <Text>Sign In</Text>
          </Pressable>
        )
        : (
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
      {/* { accessToken && (
        <Pressable
          style={styles.button}
          onPress={signOut}>
          <Text>Sign Out</Text>
        </Pressable>
      )} */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  )
}

export default AndroidGDriveBackup
