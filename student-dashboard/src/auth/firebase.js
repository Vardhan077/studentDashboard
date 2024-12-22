
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDDUJX1ZuTR9m8Qt3GrISFdrsYfqs1y6dY",
  authDomain: "dashboard-8e59c.firebaseapp.com",
  projectId: "dashboard-8e59c",
  storageBucket: "dashboard-8e59c.firebasestorage.app",
  messagingSenderId: "925349851657",
  appId: "1:925349851657:web:89b940ced18f38398a7ed8",
  measurementId: "G-XVBR1F5Z5Q"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
