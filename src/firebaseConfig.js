import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD4GlGLrR5XYk3P5LrnRrIbzHrjanML2MI",
  authDomain: "reactgram-official.firebaseapp.com",
  projectId: "reactgram-official",
  storageBucket: "reactgram-official.appspot.com",
  messagingSenderId: "133036069502",
  appId: "1:133036069502:web:88f56c9acf1d612d8f3e2f",
  measurementId: "G-BQKQD5V7H7",
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);

export  {app, fireDb};
