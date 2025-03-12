import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCustomToken,
  signOut,
  updateProfile,
} from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROEJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = admin.firestore();

export { db, admin, auth, signInWithCustomToken, signOut, updateProfile };
