/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "@utils/debug"
import AnimatedSplash from "react-native-animated-splash-screen"
import "./i18n"
import "./utils/ignore-warnings"
import React, { useRef, useEffect, useState } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowSafeAreaInsets } from "react-native-safe-area-context"
import * as storage from "@utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "@navigation"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import CustomSplashScreen from "@components/splash-screen"

enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

console.tron.log(NAVIGATION_PERSISTENCE_KEY)
/**
 * This is the root component of our app.
 */
const App: React.FC<{ splashTimeOut?: number }> = ({ splashTimeOut = 2000 }) => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [appReady, showSplash] = useState(false)
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )
  useEffect(() => {
    setTimeout(() => {
      showSplash(true)
    }, splashTimeOut)
  }, [])

  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  // if (!rootStore) return null

  // otherwise, we're ready to render the app
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={appReady}
      backgroundColor={"#ffffff"}
      customComponent={<CustomSplashScreen />}
    >
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <RootNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </SafeAreaProvider>
    </AnimatedSplash>
  )
}

export default App
