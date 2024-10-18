import { GoogleSignin, isCancelledResponse, isErrorWithCode, isNoSavedCredentialFoundResponse, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin'
import { useCallback, useState } from 'react'

export enum GoogleSigninErrorType {
  SigninInProgress = 'Sign-in is in progress',
  GooglePlayServicesNotAvailable = 'Google Play services are not available for user',
  SigninCancelledByUser = 'Sign-in was cancelled by user',
  NotSignedInPreviously = 'User has not signed in previously',
  GenericError = 'Generic Error'
}

export class GoogleSigninError extends Error {
  type: GoogleSigninErrorType

  constructor(type: GoogleSigninErrorType, message?: string) {
    super(message)
    this.type = type
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

const processSigninError = (err: any) => {
  if (isErrorWithCode(err)) {
    switch (err.code) {
      case statusCodes.IN_PROGRESS:
        throw new GoogleSigninError(GoogleSigninErrorType.SigninInProgress)
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        throw new GoogleSigninError(GoogleSigninErrorType.GooglePlayServicesNotAvailable)
      default:
        throw new GoogleSigninError(GoogleSigninErrorType.GenericError, err.message)
    }
  } else {
    // non-library error
    throw new GoogleSigninError(GoogleSigninErrorType.GenericError, err)
  }
}

const useGoogleSignin = () => {
  const [signinError, setSigninError] = useState<string | null>(null)

  const signInSilently = useCallback(async (): Promise<string | null> => {
    try {
      const response = await GoogleSignin.signInSilently()
      if (isNoSavedCredentialFoundResponse(response)) {
        throw new GoogleSigninError(GoogleSigninErrorType.NotSignedInPreviously)
      } else if (isSuccessResponse(response)) {
        if (response.data === null) {
          return null
        } else {
          const tokResp = await GoogleSignin.getTokens()
          return tokResp.accessToken
        }
      }
    } catch (err: any) {
      processSigninError(err)
    }
    return null
  }, [])

  const signInExplicitly = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const response = await GoogleSignin.signIn()

      if (isSuccessResponse(response)) {
        if (response.data === null) {
          return null
        } else {
          const tokenResponse = await GoogleSignin.getTokens()
          return tokenResponse.accessToken
        }
      } else if (isCancelledResponse(response)) {
        throw new GoogleSigninError(GoogleSigninErrorType.SigninCancelledByUser)
      }
    } catch (err: any) {
      processSigninError(err)
    }
    return null
  }, [])

  const signIn = useCallback(async () => {
    try {
      const hasPreviouslySignedIn = GoogleSignin.hasPreviousSignIn()
      // if previously signed-in, sign in silently and get the latest token
      if (hasPreviouslySignedIn) {
        return await signInSilently()
      } else {
        return await signInExplicitly()
      }
    } catch (err: any) {
      if (err instanceof GoogleSigninError) {
        if (err.type === GoogleSigninErrorType.GenericError) {
          setSigninError(err.message)
        } else {
          setSigninError(err.type)
        }
      } else {
        setSigninError(err.message)
      }
    }
    return null
  }, [signInSilently, signInExplicitly])

  const signOut = useCallback(async () => {
    try {
      // await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    } catch (err: any) {
      throw new GoogleSigninError(GoogleSigninErrorType.GenericError, err.message)
    }
  }, [])

  return {
    signIn,
    signInSilently,
    signInExplicitly,
    signOut,
    signinError
  }
}

export default useGoogleSignin
