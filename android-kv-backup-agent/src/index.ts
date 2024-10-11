import AndroidKVBackupAgentModule from './AndroidKVBackupAgentModule'

// Save the key-value pair in the `Payy` SharedPreferences file
export function backupData(key: string, value: string): void {
  AndroidKVBackupAgentModule.backupData(key, value)
}

// Retrieve the value for the given key from the `Payy` SharedPreferences file
export function restoreData(key: string): string {
  return AndroidKVBackupAgentModule.restoreData(key)
}
