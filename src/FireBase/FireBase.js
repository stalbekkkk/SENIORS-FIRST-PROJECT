import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCstTMaOC-5dftCiah2CIyOMOiuknEUobw",
  authDomain: "seniors-1-project.firebaseapp.com",
  projectId: "seniors-1-project",
  storageBucket: "seniors-1-project.firebasestorage.app",
  messagingSenderId: "752494274532",
  appId: "1:752494274532:web:b5dcfafa373c39018109f1"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);

export async function ensureAuth() {
  if (auth.currentUser) return auth.currentUser;
  const cred = await signInAnonymously(auth);
  return cred.user;
}

console.log("Firebase connected:", app);