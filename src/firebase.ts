// Import the functions you need from the SDKs you need

import { initializeApp, } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {SignUp} from './SignUp';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDGQAEVRuBrFKvDfEH9AzwWv6LiThhx9VU",
  authDomain: "create-a-community-d1d7b.firebaseapp.com",
  projectId: "create-a-community-d1d7b",
  storageBucket: "create-a-community-d1d7b.appspot.com",
  messagingSenderId: "468415496209",
  appId: "1:468415496209:web:1e3f7c41d62f14310031b0",
  measurementId: "G-M76ZB6P701",
};

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signUp = (form: any) => {
    createUserWithEmailAndPassword(auth, form.username, form.password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Success");
    })
    .catch((error) => {
        const errorCode = error.code; 
        const errorMessage = error.message;
        console.log("Failed");
    })
};