import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, View, Text, TextInput } from 'react-native'
import styles from '../styles'
import { CloudStorage, CloudStorageScope, useIsCloudAvailable } from 'react-native-cloud-storage'
import { useCallback, useState } from 'react'
import { CLOUD_BACKUP_FILE, CLOUD_BACKUP_KEY } from '../constants'

const backup = async (key: string, value: string | null): Promise<void> => {
  try {
    alert(`Saving key: '${key}' with value: '${value}'`)
    await CloudStorage.writeFile(`/${CLOUD_BACKUP_FILE}`, JSON.stringify({
      [CLOUD_BACKUP_KEY]: value
    }), CloudStorageScope.AppData)
  } catch (err: any) {
    alert(err)
  }
}

const restore = async (key: string): Promise<string> => {
  let result = 'Not Found'
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

const IOSCloudBackup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const isCloudAvailable = useIsCloudAvailable()

  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const [restoredPrivateKey, setRestoredPrivateKey] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number | null>(null)

  const handleBackup = useCallback(async () => {
    const startTime = Date.now()
    await backup(CLOUD_BACKUP_KEY, privateKey)
    setLoadTime(Date.now() - startTime)
  }, [privateKey])

  const handleRestore = useCallback(async () => {
    const startTime = Date.now()
    setRestoredPrivateKey(await restore(CLOUD_BACKUP_KEY))
    setLoadTime(Date.now() - startTime)
  }, [])

  return (
    <View style={styles.container}>
      { !!restoredPrivateKey && (<Text>Restored pk: {restoredPrivateKey}</Text>) }
      { loadTime !== null && (<Text>Took {loadTime}ms</Text>)}
      <TextInput
        style={styles.textInput}
        onChangeText={text => {
          setRestoredPrivateKey(null)
          setPrivateKey(text)
        }}
        placeholder='Enter new private key' />
      { isCloudAvailable && (
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
      ) }
      <Pressable
        style={styles.smallButton}
        onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  )
}

export default IOSCloudBackup
