// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyUnVju51VxmbbjIPQnJUbbElrYrNeKhg",
  authDomain: "helpstudy-308d9.firebaseapp.com",
  projectId: "helpstudy-308d9",
  storageBucket: "helpstudy-308d9.appspot.com",
  messagingSenderId: "1028830182024",
  appId: "1:1028830182024:web:bd4ba64e65890790bfbd3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)