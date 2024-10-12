import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import {Pressable, View, Text, TextInput} from 'react-native'
import styles from '../styles'
import useSecureStore from './hooks/useSecureStore'
import { useState } from 'react'

const IOSSecureStoreBackup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const { restoredPrivateKey, setRestoredPrivateKey, handleBackup, handleRestore } = useSecureStore()

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
