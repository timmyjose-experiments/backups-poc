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

    * Ability to detect Cloud support [❌]

        (`useIsCloudAvailable` for `Android` simply returns if Google Drive `accessToken` is set. Need a custom implementation. )

    * Set up persistence scaffold [✅]

    * Ability to persist access token/access token generation mechanism once Google Account linked [✅]
        (looks like the `react-native-google-signin` library has its own native persistence mechanism, this needs more research
         for possible implications)

    * Ability to login "silently" without prompting the user [✅] (if previously logged in)

    * Error-handling:
        * TBD []

Logistical:

    * `webClientId` not needed [✅]

    * `iOS` details optional in `expo` plugin? [✅]

    * Look at Firebase approach? [] (low-priority)
        (https://react-native-google-signin.github.io/docs/setting-up/get-config-file)

    * Handling SHAs between different environments (prenet, testnet, mainnet etc.) correctly, tied to the Google Cloud Console/Firebase
      configuration []


## Scratchpad


* (Important) When a fresh account (with no backups) is linked and restore attempted, `FILE NOT FOUND`. This is from the `react-native-cloud-storage` library.
    This usecase should be handled for both `iOS` and `Android` the __first__ time (0 backups available).

* If `Google Drive` access token is not set, and `readFile` is called, "Error: Google Drive access token is not set, cannot call function readFile" (from the `react-native-cloud-storage` library).

* If logged in to Google Account, but no backup available/set, "Error: file not found" (from the `react-native-cloud-storage` library).

* Once logged-in, the `react-native-google-signin` library appears to persist this fact in its own native persistence - app reinstalls seem to remember this fact. 
  Need to see how this interacts with custom persistence (using `redux`, `redux-persist`, and `AsyncStorage`) []

* What happens if there are multiple Google Accounts (with, say, a common Google Account) on source and target devices for backup and restore? [✅]
    (most likely, if the user logs into the __same__ account on both devices, we should be fine - [update] yes, works fine).

*  What if, device 1 -> acct 1 does backup, device 2 has multiple accounts including acct 1 and acct 2, and device 3 has acct 2
    Observed behaviour:
        - the first linked and backed up account works, but the secondary account does not. How to handle this?
          So `signOut` works -> to avoid losing keys, user will need to make sure the __same__ account is used throughout on all devices, consistently 

* (Single device) What happens if the user has setup up a Google account, backup happens, and then the user disconnects the Google account ? 
    And then reconnects? [✅]

* Google account enabled -> Password changed []

* (Important) Logged in to Google Account -> Remove account from device -> trigger app -> library still retains previous user and tries to login, but hangs forever. 
              If Google Account is restored manually in the device, app starts working again.

              Any way to disable the native persistence of app data? []

* Some retry mechanism if already connected to Google Account but silent login fails with authenticaton error? []

## Bugs

* if device 1 reconnects to Google Account, device 2 seems to lose access to the drive []

