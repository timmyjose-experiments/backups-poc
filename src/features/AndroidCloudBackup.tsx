import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import {Pressable, Text, View, TextInput} from 'react-native'
import styles from '../styles'
import {useState, useCallback} from 'react'
import { backupData, restoreData } from 'android-kv-backup-agent'

const PK_KEY = 'privateKey'

const AndroidCloudBackup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const [restoredPrivateKey, setRestoredPrivateKey] = useState<string | null>(null)

  const handleBackup = useCallback((async () => {
    alert(`Saving key: '${PK_KEY}' with value: '${privateKey}'`)
    backupData(PK_KEY, privateKey!)
  }), [])

  const handleRestore = useCallback(async () => {
    setRestoredPrivateKey(restoreData(PK_KEY))
  }, [])

  return (
    <View style={styles.container}>
     { !!restoredPrivateKey && (<Text>Restored pk: {restoredPrivateKey}</Text>) }
      <TextInput
        style={styles.textInput}
        onChangeText={text => { 
          setRestoredPrivateKey(null)
          setPrivateKey(text) 
        }}
        placeholder='Enter new private key' />
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
      <Pressable
        style={styles.smallButton}
        onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  )
}

export default AndroidCloudBackup
