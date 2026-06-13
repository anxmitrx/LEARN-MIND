import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Track, tracks as localTracks } from "@/lib/tracks";

export function useWorkshops() {
  const [workshops, setWorkshops] = useState<Track[]>(localTracks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const workshopsQuery = query(collection(db, "workshops"), orderBy("number", "asc"));
    const unsubscribe = onSnapshot(
      workshopsQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedWorkshops = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id, // we might not need to expose ID if slug is primary key, but good to have
          })) as unknown as Track[];
          setWorkshops(fetchedWorkshops);
        } else {
          // Fallback to local if empty
          setWorkshops(localTracks);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching workshops:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { workshops, loading };
}

export async function fetchWorkshopBySlug(slug: string): Promise<Track | null> {
  if (!db) return localTracks.find(t => t.slug === slug) || null;
  try {
    const q = query(collection(db, "workshops"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return localTracks.find(t => t.slug === slug) || null;
    return snapshot.docs[0].data() as unknown as Track;
  } catch (error) {
    console.error("Error fetching workshop by slug:", error);
    return localTracks.find(t => t.slug === slug) || null;
  }
}
