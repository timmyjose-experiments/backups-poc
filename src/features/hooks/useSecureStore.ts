import { useState, useCallback } from 'react'
import * as SecureStore from 'expo-secure-store'

const PK_KEY = 'privateKey'

const backup = async (key: string, value: string): Promise<void> => {
  alert(`Saving key: '${key}' with value: '${value}'`)
  await SecureStore.setItemAsync(key, value)
}

const restore = async (key: string): Promise<string | null> => {
  let result: string | null = 'Not Found'
  try {
    result = await SecureStore.getItemAsync(key)
  } catch (err: any) {
    alert(err)
  }

  return result
}


const useSecureStore = () => {
  const [restoredPrivateKey, setRestoredPrivateKey] = useState<string | null>(null)

  const handleBackup = useCallback(async (value: string | null) => {
    await backup(PK_KEY, value!)
  }, [])

  const handleRestore = useCallback(async () => {
    setRestoredPrivateKey(await restore(PK_KEY))
  }, [])


  return {
    restoredPrivateKey,
    setRestoredPrivateKey,
    handleBackup, 
    handleRestore
  }
}

export default useSecureStore