## Scenarios

| Scenario                                                                              | Expected Result                                                                                                      | Observed Result | Notes |
|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------|-------|
| Detection of Google Backup support                                                    | Should be able to detect if we can backup or not (whether a Google Account is linked or not)                         |                 |       |
| Able to login silently (once logged in)                                               | Once logged in, backups and restores should not require explicit login again                                         |                 |       |
| For a re-install, Google Account still connected                                      | Login silently, and perform restore                                                                                  |                 |       |
| For a re-install, Google Account disconnected                                         | No restore, new private key generated                                                                                |                 |       |
| For a fresh install, prompt user to connect and login to Google Account, if available | Once logged in, restore should happen from GDrive (the BackupProvider and other logic will need to accommodate this) |                 |       |
| For a fresh install, if no Google account is connected for some reason                | Then the BackupProvider should indicate this, and generation of new private key should proceed - meaning no restore  |                 |       |
| [Api] When backup is not available                                                    | ERR_FILE_NOT_FOUND                                                                                                   |                 |       |
| [Api] When backup is available                                                        | Latest backup takes precedence                                                                                       |                 |       |
|                                                                                       |                                                                                                                      |                 |       |
|                                                                                       |                                                                                                                      |                 |       |


## Scope of PoC

On second thought, most of the scenarios above will be applicable only to the main app along with a lot of other scenarios to take care of.

For this PoC, restricting scope to the functionality:

    * `iOS` details optional in `expo` plugin? []

    * Proper handling of environment variables (for different envs in Google Cloud Console) []

    * Look at Firebase approach? []
        (https://react-native-google-signin.github.io/docs/setting-up/get-config-file)

    * Ability to detect Cloud support []

    * Ability to persist access token/access token generation mechanism once Google Account linked []

    * Ability to login "silently" without prompting the user - for `writeBackupData` (Backup Provider API) []

    * Ability to login "silently" without prompting the user - for `getBackupData` (Backup Provider API) []

    * Error-handling:
        * TBD []


