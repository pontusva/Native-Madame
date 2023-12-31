// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  initializeAuth,
  getAuth,
  onAuthStateChanged,
  getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8y_MmD0oO8X7UZXfduT3Hjo1xcGqZ7q8',
  authDomain: 'missing-pet-9ab92.firebaseapp.com',
  projectId: 'missing-pet-9ab92',
  storageBucket: 'missing-pet-9ab92.appspot.com',
  messagingSenderId: '113689318369',
  appId: '1:113689318369:web:ce93969f533481b752f8a0',
  measurementId: 'G-2LS2P3TMNX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
