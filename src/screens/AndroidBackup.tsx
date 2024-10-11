import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import {Pressable, View, Text} from 'react-native'
import styles from '../styles'

const AndroidBackup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Main')}>
          <Text>Home</Text>
        </Pressable>
    </View>
  )
}

export default AndroidBackup
