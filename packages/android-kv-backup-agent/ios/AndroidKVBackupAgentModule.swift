import ExpoModulesCore

// Note: `iOS` is not supported since we use `iCloud` storage instead of
// Android's Key-Value (automatic) Backup service.
public class AndroidKVBackupAgentModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AndroidKVBackupAgent")

    Function("backupData") { (key: String, value: String) -> Void in
      // do nothing
    }

    Function("restoreData") { () -> String in 
      "unsupported"
    }
  }
}
