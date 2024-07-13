// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAesOlqWRXm4O0U27SLAtC-zIpmtXCUA24",
  authDomain: "elitenotes-b6d55.firebaseapp.com",
  projectId: "elitenotes-b6d55",
  storageBucket: "elitenotes-b6d55.appspot.com",
  messagingSenderId: "511374246025",
  appId: "1:511374246025:web:1aadef36b1a6fd460a0658",
  measurementId: "G-874NQ98THD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);