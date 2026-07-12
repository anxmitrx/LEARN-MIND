import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA191wT69wauFXqMbUEbqatsjRnM8g-HjA",
  authDomain: "learn-and-shine-dbf4d.firebaseapp.com",
  projectId: "learn-and-shine-dbf4d",
  storageBucket: "learn-and-shine-dbf4d.firebasestorage.app",
  messagingSenderId: "210311209668",
  appId: "1:210311209668:web:a791d9458bd70cad2d9f91",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const testEmailLink = async () => {
  try {
    const actionCodeSettings = {
      url: "http://localhost:5173",
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, "test@example.com", actionCodeSettings);
    console.log(
      "SUCCESS: Email link sent to test@example.com. This means Email Link Auth IS enabled in Firebase Console.",
    );
  } catch (error) {
    console.error("ERROR sending email link:", error.code, error.message);
  }
};

testEmailLink();
