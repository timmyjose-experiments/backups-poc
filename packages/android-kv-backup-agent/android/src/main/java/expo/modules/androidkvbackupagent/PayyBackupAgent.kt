package expo.modules.androidkvbackupagent

import android.app.backup.BackupAgent
import android.app.backup.BackupDataInput
import android.app.backup.BackupDataOutput
import android.os.ParcelFileDescriptor
import android.util.Log
import java.io.IOException
import android.content.Context
import android.content.SharedPreferences

const val PREFS = "payy_app_prefs"

class PayyBackupAgent : BackupAgent() {
    override fun onRestore(data: BackupDataInput, appVersionCode: Int, newState: ParcelFileDescriptor) {
        Log.d("PayyBackupAgent-new", "Restoring data")

        try {
            while (data.readNextHeader()) {
                val key = data.key
                val dataSize = data.dataSize

                if (key == "privateKey") {
                    val buffer = ByteArray(dataSize)
                    data.readEntityData(buffer, 0, dataSize) // reads the entire entity at once
                    val privateKeyRestoredValue = String(buffer)

                    getSharedPreferences(PREFS).edit().putString("privateKey", privateKeyRestoredValue).commit()
                }
            }
        } catch (e: IOException) {
            Log.e("PayyBackupAgent", "Error during restore", e)
        }
    }

    // helpers
    private val context: Context
        get() = this

    private fun getSharedPreferences(prefsFile: String): SharedPreferences {
        return context.getSharedPreferences(prefsFile, Context.MODE_PRIVATE)
    }

    override fun onBackup(
        oldState: ParcelFileDescriptor,
        data: BackupDataOutput,
        newState: ParcelFileDescriptor
    ) {
        Log.d("PayyBackupAgent-new", "Backing up data")

        // convert privateKey to byte array and store in the backup as a key-value pair
        val backupKey = "privateKey"
        val backupVal = getSharedPreferences(PREFS).getString("privateKey", NOT_FOUND)
        Log.d("PayyBackupAgent", "Backing up: key: $backupKey, value: $backupVal")
        val stringBytesOfUUID = backupVal?.toByteArray()

        if (stringBytesOfUUID != null) {
            data.writeEntityHeader(backupKey, stringBytesOfUUID.size)
            data.writeEntityData(stringBytesOfUUID, stringBytesOfUUID.size)
        }
    }
}
