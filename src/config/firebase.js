import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYZIycdgwlWqKvYCxtaPYQSCl1NTe9qzI",
  authDomain: "pentegrasyon-realtime.firebaseapp.com",
  databaseURL:
    "https://pentegrasyon-realtime-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pentegrasyon-realtime",
  storageBucket: "pentegrasyon-realtime.firebasestorage.app",
  messagingSenderId: "344460788469",
  appId: "1:344460788469:web:30d343525271c0749cfbbc",
  measurementId: "G-VN6710X44R",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
