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

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setWebinars(localWebinars);
        } else {
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Webinar[];
          setWebinars(list);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching webinars:", err);
        setWebinars(localWebinars);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { webinars, loading };
}

export async function fetchWebinarBySlug(slug: string): Promise<Webinar | null> {
  if (!db) return localWebinars.find((w) => (w.id || w.title) === slug) || null;
  try {
    const { query, collection, where, getDocs, doc, getDoc } = await import("firebase/firestore");
    
    // Check if slug is a doc ID
    try {
        const docRef = doc(db, "webinars", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Webinar;
        }
    } catch (e) {
        // Not a valid doc path, continue to query
    }

    const q = query(collection(db, "webinars"), where("title", "==", slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Webinar;
    
    return localWebinars.find((w) => (w.id || w.title) === slug) || null;
  } catch (error) {
    console.error("Error fetching webinar by slug:", error);
    return localWebinars.find((w) => (w.id || w.title) === slug) || null;
  }
}
