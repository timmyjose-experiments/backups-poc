package expo.modules.androidkvbackupagent

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Context
import android.content.SharedPreferences
import android.app.backup.BackupManager 
import android.util.Log

// the SharedPreferences file to be used for storing `Payy` key-value data
// This is (and should be) the same value as that specified in PayyBackupAgent
const val PAYY_SHARED_PREFS_FILE = "payy_app_prefs"
const val NOT_FOUND = "not-found"

class AndroidKVBackupAgentModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("AndroidKVBackupAgent")

    // Save the key-value pair in the given SharedPreferences file (creating it if it doesn't exist)
    Function("backupData") { key: String, value: String -> 
      // backup to the preferences file
      Log.d("AndroidKVBackupAgentModule", "Saving SharedPreferences")
      getSharedPreferences(PAYY_SHARED_PREFS_FILE).edit().putString(key, value).commit() // sync
      // indicate to the Android Backup Manager that data has changed
      dataChanged()
    }

    // retrieve the value for the given key from the given SharedPreferences file
    Function("restoreData") { key: String -> 
      Log.d("AndroidKVBackupAgentModule", "Restoring SharedPreferences")
      return@Function getSharedPreferences(PAYY_SHARED_PREFS_FILE).getString(key, NOT_FOUND)
    }
  }

  // helpers
  private val context
  get() = requireNotNull(appContext.reactContext)

  private fun getSharedPreferences(prefsFile: String): SharedPreferences {
    // MODE_PRIVATE indicates that the SharedPreferences data is private to `Payy`
    return context.getSharedPreferences(prefsFile, Context.MODE_PRIVATE)
  }

  private fun dataChanged() {
    val backupManager = BackupManager(context)
    Log.d("AndroidKVBackupAgentModule", "Called Backup Manager's dataChanged")
    backupManager.dataChanged()
  }
}
