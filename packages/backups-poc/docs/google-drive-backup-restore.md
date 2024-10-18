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

Features:

    * Proper handling of environment variables (for different envs in Google Cloud Console) []

    * Ability to detect Cloud support []

        (`useIsCloudAvailable` for `Android` simply returns if Google Drive `accessToken` is set. Need a custom implementation. )

    * Set up persistence scaffold [✅]

    * Ability to persist access token/access token generation mechanism once Google Account linked []

    * Ability to login "silently" without prompting the user [✅] (if previously logged in)

    * Error-handling:
        * TBD []

Logistical:

    * `webClientId` not needed [✅]

    * `iOS` details optional in `expo` plugin? []

    * Look at Firebase approach? []
        (https://react-native-google-signin.github.io/docs/setting-up/get-config-file)

    * Handling SHAs between different environments (prenet, testnet, mainnet etc.) correctly, tied to the Google Cloud Console/Firebase
      configuration []


## Scratchpad

* If `Google Drive` access token is not set, and `readFile` is called, "Error: Google Drive access token is not set, cannot call function readFile" (from the `react-native-cloud-storage` library).

* If logged in to Google Account, but no backup available/set, "Error: file not found" (from the `react-native-cloud-storage` library).

