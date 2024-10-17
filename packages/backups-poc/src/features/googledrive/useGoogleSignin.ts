import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin'
import { useState } from 'react'

export class GoogleSiginError extends Error {}

const useGoogleSignin = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [signinError, setSigninError] = useState<string | null>(null)

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if (isSuccessResponse(response)) {
        if (response.data === null) {
          setAccessToken(null)
        } else {
          const tokResp = await GoogleSignin.getTokens()
          setAccessToken(tokResp.accessToken)
        }
      } else {
        throw new GoogleSiginError('Sign-in was cancelled by user')
      }
    } catch (err: any) {
      if (isErrorWithCode(err)) {
        switch (err.code) {
          case statusCodes.IN_PROGRESS:
            setSigninError('Sign-in is in progress')
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            setSigninError('Google Play services not available for device')
            break
          default:
            setSigninError(err.message)
        }
      } else {
        // non-library error
        throw new GoogleSiginError(err)
      }
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut()
      setAccessToken(null)
    } catch (err: any) {
      setSigninError(err)
    }
  }

  return {
    signIn,
    signOut,
    accessToken,
    signinError
  }
}

export default useGoogleSignin
