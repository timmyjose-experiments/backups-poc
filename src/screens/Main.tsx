import {Pressable, View, Text} from 'react-native'
import styles from '../styles'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'

const Main = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AndroidBackup')}>
        <Text>Android Backup</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('IOSBackup')}>
        <Text>iOS Backup</Text>
        </Pressable>
    </View>
  )
}

export default Main
