import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
