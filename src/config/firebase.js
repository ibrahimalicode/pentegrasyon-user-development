import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpiCPBLW8F87hhw9XPTAyMGpK4aB0l9Ts",
  authDomain: "pentegrasyon-web.firebaseapp.com",
  projectId: "pentegrasyon-web",
  storageBucket: "pentegrasyon-web.firebasestorage.app",
  messagingSenderId: "719109495864",
  appId: "1:719109495864:web:0531b6f5876608d75adacd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export { db };
