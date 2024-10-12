import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#c0c0c0',
    height: 40,
    width: '40%',
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallButton: {
    backgroundColor: '#c0c0c0',
    height: 40,
    width: '20%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 10
  },
  textInput: {
    borderColor: '#c0c0c0',
    paddingLeft: 5,
    height: 50,
    width: '50%',
    borderWidth: 2,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default styles