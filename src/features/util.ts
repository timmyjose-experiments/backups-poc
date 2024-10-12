import * as SecureStore from 'expo-secure-store'

export const PK_KEY = 'privateKey'

const backup = async (key: string, value: string): Promise<void> => {
  alert(`Saving key: '${key}' with value: '${value}'`)
  await SecureStore.setItemAsync(key, value)
}

const restore = async (key: string): Promise<string | null> => {
  let result: string | null = 'Not Found'
  try {
    result = await SecureStore.getItemAsync(key)
    if (result === null) {
      result = 'Not Found'
    }
  } catch (err: any) {
    alert(err)
  }

  return result
}

export { backup, restore }