import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi7Bmz2xrhXd8-F9PAWOi4bwNbB2bSs2w",
  authDomain: "bloggingapp-abbdb.firebaseapp.com",
  projectId: "bloggingapp-abbdb",
  storageBucket: "bloggingapp-abbdb.appspot.com",
  messagingSenderId: "1061584994997",
  appId: "1:1061584994997:web:cec66897e146f19da834fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);