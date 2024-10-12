import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import {Pressable, View, Text, TextInput} from 'react-native'
import styles from '../styles'
import { useCallback, useState } from 'react'
import { backup, PK_KEY, restore } from './util'

const IOSSecureStoreBackup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const [restoredPrivateKey, setRestoredPrivateKey] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number | null>(null)

  const handleBackup = useCallback(async (value: string | null) => {
    const startTime = Date.now()
    await backup(PK_KEY, value!)
    setLoadTime(Date.now() - startTime)
  }, [])

  const handleRestore = useCallback(async () => {
    const startTime = Date.now()
    setRestoredPrivateKey(await restore(PK_KEY))
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
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          style={styles.smallButton}
          onPress={() => handleBackup(privateKey)}>
          <Text>Backup</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={handleRestore}>
          <Text>Restore</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.smallButton}
        onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  )
}

export default IOSSecureStoreBackup
