import 'dotenv/config'


export default {
  "expo": {
    "name": "Gym Training Sheets",
    "slug": "gym-training-sheets",
    "scheme": "com.medeiroz.gymtrainingsheets",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.medeiroz.gymtrainingsheets",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      gcpOauthAndroidId: process.env.GCP_OAUTH_ANDROID_ID,
      gcpOauthExpoId: process.env.GCP_OAUTH_EXPO_ID,
      "eas": {
        "projectId": "13265366-8b6d-4592-bf6d-04c846c71567"
      }
    },
    "owner": "medeiroz"
  }
}
