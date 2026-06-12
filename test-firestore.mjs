import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA191wT69wauFXqMbUEbqatsjRnM8g-HjA",
  authDomain: "learn-and-shine-dbf4d.firebaseapp.com",
  projectId: "learn-and-shine-dbf4d",
  storageBucket: "learn-and-shine-dbf4d.firebasestorage.app",
  messagingSenderId: "210311209668",
  appId: "1:210311209668:web:a791d9458bd70cad2d9f91"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  console.log("Attempting to add a test reservation...");
  try {
    const docRef = await addDoc(collection(db, "reservations"), {
      name: "Test User",
      college: "Test College",
      email: "test@example.com",
      phone: "98765 43210",
      track: "engineering",
      status: "pending",
      source: "website",
      timestamp: serverTimestamp()
    });
    console.log("SUCCESS! Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("FAILED to write document:", e.message);
  }

  console.log("\nAttempting to read reservations without being logged in...");
  try {
    const q = query(collection(db, "reservations"));
    const snap = await getDocs(q);
    console.log("SUCCESS! Read " + snap.docs.length + " documents.");
  } catch (e) {
    console.error("FAILED to read documents:", e.message);
  }
  
  process.exit();
}

run();
