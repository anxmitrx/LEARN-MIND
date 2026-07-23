import { useState, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { auth, db, storage } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Loader2, Camera } from "lucide-react";

interface ProfileAvatarUploadProps {
  className?: string;
  size?: "sm" | "lg";
}

export function ProfileAvatarUpload({ className = "", size = "sm" }: ProfileAvatarUploadProps) {
  const { user, userData } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!user) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !db || !auth.currentUser) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    try {
      setIsUploading(true);

      if (!storage) {
        throw new Error("Firebase Storage is not initialized.");
      }

      // Create a unique file name
      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `profiles/${user.uid}/${filename}`);

      // Upload file
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Can add progress indicator here if needed
          },
          (error) => {
            reject(error);
          },
          () => {
            resolve();
          },
        );
      });

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore user document
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { photoURL: downloadURL });

      // Optional: Update auth profile
      try {
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
      } catch (err) {
        console.warn("Could not update auth profile photoURL:", err);
      }
    } catch (error: any) {
      console.error("Error saving profile picture:", error);
      alert(
        `Failed to save profile picture: ${error?.message || "Unknown error"}. Please try again.`,
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const containerClasses =
    size === "lg" ? "h-24 w-24 sm:h-32 sm:w-32" : "h-10 w-10 md:h-12 md:w-12";

  const textClasses = size === "lg" ? "text-3xl sm:text-5xl" : "text-lg md:text-xl";

  const displayUrl = userData?.photoURL || user.photoURL;

  return (
    <>
      <div
        className={`relative group cursor-pointer overflow-hidden bg-indigo-500/20 text-indigo-700 border border-indigo-500/30 rounded-full shadow-sm flex items-center justify-center font-bold transition-all hover:scale-105 active:scale-95 ${containerClasses} ${className}`}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <Loader2 className="w-1/2 h-1/2 animate-spin text-indigo-600" />
        ) : displayUrl ? (
          <img
            src={displayUrl}
            alt={userData?.name || user.displayName || "User"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className={`font-display uppercase ${textClasses}`}>
            {(userData?.name || user.displayName || "U")[0].toUpperCase()}
          </span>
        )}

        {/* Hover Overlay */}
        {!isUploading && (
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-1/3 h-1/3 text-white" />
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </>
  );
}
