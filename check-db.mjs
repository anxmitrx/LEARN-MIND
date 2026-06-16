import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  projectId: "learn-mind-32d84",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const res = await getDocs(collection(db, "reservations"));
  console.log("Reservations count:", res.size);
  
  const quizzes = await getDocs(collection(db, "quiz_results"));
  console.log("Quiz Results count:", quizzes.size);
  
  process.exit(0);
}

check().catch(console.error);
