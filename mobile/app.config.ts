import 'dotenv/config'

export default {
  name: 'Rose Estética',
  slug: 'roseestetica',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover'
  },
  androidNavigationBar: {
    backgroundColor: '#000000',
    barStyle: 'light-content'
  },
  androidStatusBar: {
    backgroundColor: '#000000',
    barStyle: 'light-content'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true
  },
  extra: {
    serverUrl: process.env.SERVER_URL
  },
  android: {
    package: 'com.roseestetica.roseestetica',
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#333333'
    }
  }
}
