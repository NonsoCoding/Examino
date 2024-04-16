// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/compat/storage';
import {getAuth} from "firebase/auth"
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseAPI } from "../../Keys/ApiKeys.key";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseAPI.apiKey,
  authDomain: firebaseAPI.authDomain,
  projectId: firebaseAPI.projectId,
  storageBucket: firebaseAPI.storageBucket,
  messagingSenderId: firebaseAPI.messagingSenderId,
  appId: firebaseAPI.appId
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
export const imgStorage = firebase.storage;
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);