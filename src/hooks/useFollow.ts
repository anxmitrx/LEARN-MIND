import { useState, useEffect } from "react";
import { doc, runTransaction, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

export function useFollow(targetUid: string) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersList, setFollowersList] = useState<string[]>([]);
  const [followingList, setFollowingList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to target user's document to get real-time follower count and status
  useEffect(() => {
    if (!targetUid || !db) return;
    
    const targetRef = doc(db, "users", targetUid);
    const unsubscribe = onSnapshot(targetRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const followers = data.followers || [];
        const following = data.following || [];
        
        setFollowersCount(followers.length);
        setFollowingCount(following.length);
        setFollowersList(followers);
        setFollowingList(following);
        
        if (user) {
          setIsFollowing(followers.includes(user.uid));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [targetUid, user]);

  const toggleFollow = async () => {
    if (!user || !db || user.uid === targetUid) return;

    const currentUserRef = doc(db, "users", user.uid);
    const targetUserRef = doc(db, "users", targetUid);

    try {
      await runTransaction(db, async (transaction) => {
        const currentDoc = await transaction.get(currentUserRef);
        const targetDoc = await transaction.get(targetUserRef);

        if (!currentDoc.exists() || !targetDoc.exists()) {
          throw new Error("User documents do not exist!");
        }

        const currentUserFollowing = currentDoc.data().following || [];
        const targetUserFollowers = targetDoc.data().followers || [];

        const isCurrentlyFollowing = targetUserFollowers.includes(user.uid);

        if (isCurrentlyFollowing) {
          // Unfollow
          transaction.update(currentUserRef, {
            following: currentUserFollowing.filter((id: string) => id !== targetUid)
          });
          transaction.update(targetUserRef, {
            followers: targetUserFollowers.filter((id: string) => id !== user.uid)
          });
        } else {
          // Follow
          transaction.update(currentUserRef, {
            following: [...currentUserFollowing, targetUid]
          });
          transaction.update(targetUserRef, {
            followers: [...targetUserFollowers, user.uid]
          });
        }
      });
    } catch (error) {
      console.error("Transaction failed: ", error);
      throw error;
    }
  };

  return { isFollowing, followersCount, followingCount, followersList, followingList, loading, toggleFollow };
}
