import React from 'react'
import { WebView } from 'react-native-webview'

export const HomeScreen = () => {
  return <WebView source={{ uri: 'https://setur.com.tr' }} testID="webview" />
}

export default HomeScreen
