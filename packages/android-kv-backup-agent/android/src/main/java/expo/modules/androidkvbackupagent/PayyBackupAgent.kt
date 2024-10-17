package expo.modules.androidkvbackupagent

import android.app.backup.BackupAgentHelper
import android.app.backup.SharedPreferencesBackupHelper
import android.content.SharedPreferences
import android.util.Log
import android.app.backup.BackupDataInput 
import android.os.ParcelFileDescriptor 
import android.app.backup.BackupDataOutput 

// the actual preferences file containing the key-value pairs
// used by the app (unique to the app)
const val PREFS = "payy_app_prefs"

// used by Android's Backup Agent internally to uniquely identify 
// the preferences file
const val PREFS_BACKUP_KEY = "payy_app_prefs_backup_key"

class PayyBackupAgent : BackupAgentHelper() {
    override fun onCreate() {
        Log.d("PayyBackupAgent", "Creating a SharedPreferencesBackupHelper")
        SharedPreferencesBackupHelper(this, PREFS).also {
            addHelper(PREFS_BACKUP_KEY, it)
        }
    }

    override fun onBackup(oldState: ParcelFileDescriptor?, data: BackupDataOutput?, newState: ParcelFileDescriptor?) {
        Log.d("PayyBackupAgent", "onBackup called")
        Log.d("PayyBackupAgent", "oldState: $oldState")
        Log.d("PayyBackupAgent", "newState: $newState")

        super.onBackup(oldState, data, newState)
    }

    override fun onRestore(data: BackupDataInput?, appVersionCode: Int, newState: ParcelFileDescriptor?) {
        Log.d("PayyBackupAgent", "onRestore called")
        Log.d("PayyBackupAgent", "data: $data")
        Log.d("PayyBackupAgent", "appVersionCode: $appVersionCode")
        Log.d("PayyBackupAgent", "newState: $newState")

        super.onRestore(data, appVersionCode, newState)
    }
}
