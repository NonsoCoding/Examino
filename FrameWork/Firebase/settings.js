// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/compat/storage';
import {getAuth} from "firebase/auth"
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmk6JDlT6Orkpqpu8GmLXGfk8o6Mf-9HA",
  authDomain: "examino-dcdfc.firebaseapp.com",
  projectId: "examino-dcdfc",
  storageBucket: "examino-dcdfc.appspot.com",
  messagingSenderId: "359979916601",
  appId: "1:359979916601:web:0cafd8371c885cff831ce8"
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