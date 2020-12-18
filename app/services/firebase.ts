import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import ENV from "@config/env"
// Your web app's Firebase configuration
const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } = ENV

// Initialize Firebase
firebase.initializeApp({
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
})

export default firebase.firestore()

export { firebase }
