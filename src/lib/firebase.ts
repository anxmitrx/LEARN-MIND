import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA191wT69wauFXqMbUEbqatsjRnM8g-HjA",
  authDomain: "learn-and-shine-dbf4d.firebaseapp.com",
  projectId: "learn-and-shine-dbf4d",
  storageBucket: "learn-and-shine-dbf4d.firebasestorage.app",
  messagingSenderId: "210311209668",
  appId: "1:210311209668:web:a791d9458bd70cad2d9f91"
};

console.log("FIREBASE INIT CHECK:", { apiKeyExists: !!firebaseConfig.apiKey, domainExists: !!firebaseConfig.authDomain });

const hasApiKey = !!firebaseConfig.apiKey;

// Safely initialize Firebase app, auth, and firestore without throwing errors during SSR pass if API key is not yet available.
const app = getApps().length > 0 
  ? getApp() 
  : (hasApiKey ? initializeApp(firebaseConfig) : null);

const auth = app ? getAuth(app) : null as any;
const db = app ? getFirestore(app) : null as any;
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create or update user document
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        xp: 0,
        level: "Level 1: Novice",
        createdAt: new Date().toISOString(),
      });
    }
    
    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export { app, auth, db };
