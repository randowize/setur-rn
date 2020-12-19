import { LogBox } from "react-native"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import ENV from "@config/env"
// Your web app's Firebase configuration
const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = ENV

// Firebase use reactive-native/AsyncStorage which generates warnings
LogBox.ignoreLogs([/AsyncStorage/])
// Initialize Firebase
firebase.initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
})

export default firebase.firestore()

export { firebase }
