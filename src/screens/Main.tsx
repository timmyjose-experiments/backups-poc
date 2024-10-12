import {Pressable, View, Text} from 'react-native'
import styles from '../styles'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import { Platform } from 'react-native'

const Main = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
    { Platform.OS === 'android' && (
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AndroidDemo')}>
        <Text>Android Backup</Text>
      </Pressable>
    )}

    { Platform.OS === 'ios' && (
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('IOSDemo')}>
        <Text>iOS Backup</Text>
        </Pressable>
    )}
    </View>
  )
}

export default Main
