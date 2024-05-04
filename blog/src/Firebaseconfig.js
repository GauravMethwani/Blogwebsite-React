import { initializeApp } from 'firebase/app'
import { getAuth,signInWithEmailAndPassword  } from 'firebase/auth';
 
import { getFirestore, collection, addDoc, getDoc } from 'firebase/firestore';// Import Firestore if using Firestore
const firebaseConfig = {
    apiKey: "AIzaSyDZn-H5Z-vMSNQIAA01BYWKEkVBoH-0RFk",
    authDomain: "blogapp-85a52.firebaseapp.com",
    projectId: "blogapp-85a52",
    storageBucket: "blogapp-85a52.appspot.com",
    messagingSenderId: "113645867527",
    appId: "1:113645867527:web:2a54ccad8ab8336f5890a2"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export {  collection, addDoc,getDoc,signInWithEmailAndPassword }; // Initialize Firestore
