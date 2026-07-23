import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, Upload } from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

interface AdminBannerUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    collection: "workshops" | "webinars" | "mentor_events";
    title: string;
    bannerUrl?: string;
  } | null;
}

export function AdminBannerUploadModal({ isOpen, onClose, event }: AdminBannerUploadModalProps) {
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !event) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    try {
      setUploadingImage(true);
      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `event_banners/admin_retro/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => resolve(),
        );
      });

      const downloadURL = await getDownloadURL(storageRef);

      // Update Firestore directly
      await updateDoc(doc(db, event.collection, event.id), {
        bannerUrl: downloadURL,
      });

      alert("Banner updated successfully!");
      onClose();
    } catch (error: any) {
      console.error("Error uploading banner image:", error);
      alert(`Failed to upload image: ${error?.message || "Unknown error"}. Please try again.`);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center bg-slate-100/50 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all rounded-full"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>

            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Retroactive Banner Upload
            </h3>
            <p className="text-sm font-medium text-slate-600 mb-6 truncate">
              Editing: <span className="font-bold text-indigo-600">{event.title}</span>
            </p>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                id="admin-banner-upload"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                disabled={uploadingImage}
              />
              <div
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all ${
                  event.bannerUrl
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {uploadingImage ? (
                  <div className="flex flex-col items-center text-indigo-600">
                    <Loader2 className="w-8 h-8 animate-spin mb-3" />
                    <span className="text-sm font-bold">Uploading...</span>
                  </div>
                ) : event.bannerUrl ? (
                  <div className="flex flex-col items-center text-emerald-600">
                    <img
                      src={event.bannerUrl}
                      alt="Preview"
                      className="h-24 object-cover rounded-lg mb-3 shadow-sm"
                    />
                    <span className="text-xs font-bold text-center">
                      Current Banner (Click to replace)
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <Upload className="w-8 h-8 text-indigo-600 mb-3" />
                    <span className="text-sm font-bold text-slate-700">Upload New Banner</span>
                    <span className="text-xs text-slate-400 mt-1">16:9 Recommended</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
