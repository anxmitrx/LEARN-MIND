import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Webinar, webinars as localWebinars } from "@/lib/webinars";

export function useWebinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setWebinars(localWebinars);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "webinars"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setWebinars(localWebinars);
      } else {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Webinar[];
        setWebinars(list);
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching webinars:", err);
      setWebinars(localWebinars);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { webinars, loading };
}
