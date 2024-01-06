// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkAXxWwo2PRMrY9Rst1Kr87rAEfVmv9bo",
  authDomain: "twitter-b5451.firebaseapp.com",
  projectId: "twitter-b5451",
  storageBucket: "twitter-b5451.appspot.com",
  messagingSenderId: "1059966828973",
  appId: "1:1059966828973:web:51ef5736ddc629a1b42124",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
// veri tabanı referansını alma
export const db = getFirestore(app);

// medya depolama alanının  referansını alma
export const storage = getStorage(app);
