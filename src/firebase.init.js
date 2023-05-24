// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHHNo6A_NNbfG3S-nxyYAOBQ9QrgsEo3c",
  authDomain: "dorkaribhai-75f81.firebaseapp.com",
  projectId: "dorkaribhai-75f81",
  storageBucket: "dorkaribhai-75f81.appspot.com",
  messagingSenderId: "394022152923",
  appId: "1:394022152923:web:4d58ed81c6ebab16e8fafe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;