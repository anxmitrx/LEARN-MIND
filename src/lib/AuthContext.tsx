import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userData: any | null;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showPhoneVerificationModal: boolean;
  setShowPhoneVerificationModal: (show: boolean) => void;
  requestPhoneVerification: (callback: () => void) => void;
  phoneVerificationCallback: (() => void) | null;
  clearPhoneVerificationCallback: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userData: null,
  showLoginModal: false,
  setShowLoginModal: () => {},
  showPhoneVerificationModal: false,
  setShowPhoneVerificationModal: () => {},
  requestPhoneVerification: () => {},
  phoneVerificationCallback: null,
  clearPhoneVerificationCallback: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPhoneVerificationModal, setShowPhoneVerificationModal] = useState(false);
  const [phoneVerificationCallback, setPhoneVerificationCallback] = useState<(() => void) | null>(
    null,
  );

  const requestPhoneVerification = (callback: () => void) => {
    if (userData?.phoneVerified) {
      callback();
    } else {
      setPhoneVerificationCallback(() => callback);
      setShowPhoneVerificationModal(true);
    }
  };

  useEffect(() => {
    // DONT WANT THIS FOR NOW: User requested to disable the automatic phone verification modal popup
    /*
    if (user && userData && userData.onboardingComplete && !userData.phoneVerified) {
      setShowPhoneVerificationModal(true);
    } else if (user && userData && userData.phoneVerified) {
      // Optional: hide modal if verified somehow without the callback triggering
      // setShowPhoneVerificationModal(false);
    }
    */
  }, [user, userData]);

  const clearPhoneVerificationCallback = () => {
    setPhoneVerificationCallback(null);
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    // Check if the URL is a sign-in with email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device or browser
        email = window.prompt("Please provide your email for confirmation");
      }
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(async (result) => {
            window.localStorage.removeItem("emailForSignIn");
            const user = result.user;

            // Create or update user document if this is a new sign-in
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
              await setDoc(userRef, {
                name: user.displayName || email?.split("@")[0] || "User",
                email: user.email,
                photoURL: user.photoURL,
                xp: 0,
                level: "Level 1: Novice",
                onboardingComplete: false,
                createdAt: new Date().toISOString(),
              });
            }

            // Optionally remove the sign-in parameters from the URL
            window.history.replaceState(null, "", window.location.pathname);
          })
          .catch((error) => {
            console.error("Error signing in with email link:", error);
          });
      }
    }

    let unsubscribeSnapshot: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // Clear previous snapshot listener if it exists
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }

      if (currentUser && db) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          // Listen to real-time updates of the user profile
          unsubscribeSnapshot = onSnapshot(
            docRef,
            (docSnap) => {
              if (docSnap.exists()) {
                const data = docSnap.data();
                if (!data.role) {
                  // Default existing users to 'student'
                  updateDoc(docRef, { role: "student" }).catch(console.error);
                  data.role = "student";
                }
                setUserData(data);
              } else {
                setUserData(null);
              }
            },
            (error) => {
              console.warn("Firestore snapshot error (expected during logout):", error);
            },
          );
        } catch (err) {
          console.error("Error fetching user data from Firestore:", err);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userData,
        showLoginModal,
        setShowLoginModal,
        showPhoneVerificationModal,
        setShowPhoneVerificationModal,
        requestPhoneVerification,
        phoneVerificationCallback,
        clearPhoneVerificationCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
