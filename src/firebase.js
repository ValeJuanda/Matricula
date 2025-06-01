import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnyLnf0qeTxCtjV4hracOHrr29CGh0uew",
  authDomain: "matricula-ce3d5.firebaseapp.com",
  projectId: "matricula-ce3d5",
  storageBucket: "matricula-ce3d5.firebasestorage.app",
  messagingSenderId: "898270362327",
  appId: "1:898270362327:web:4d0f2d00b586c96ddb0e92"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
