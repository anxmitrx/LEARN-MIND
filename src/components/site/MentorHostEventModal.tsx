import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, Upload } from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/lib/AuthContext";

interface MentorHostEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputCls =
  "w-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-xl focus:bg-white focus:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600";

export function MentorHostEventModal({ isOpen, onClose }: MentorHostEventModalProps) {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "workshop",
    date: "",
    time: "",
    description: "",
    bannerUrl: "",
    topics: "",
    outcomes: "",
    agenda: "",
    radarTechnical: 50,
    radarSoftSkills: 50,
    radarStrategy: 50,
    radarHandsOn: 50,
    radarTheory: 50,
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    try {
      setUploadingImage(true);
      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `event_banners/${user.uid}/${filename}`);
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
      setFormData({ ...formData, bannerUrl: downloadURL });
    } catch (error: any) {
      console.error("Error uploading banner image:", error);
      alert(`Failed to upload image: ${error?.message || "Unknown error"}. Please try again.`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userData) return;

    try {
      setLoading(true);
      await addDoc(collection(db, "mentor_events"), {
        ...formData,
        hostUid: user.uid,
        hostName: userData.name || user.displayName,
        hostEmail: user.email,
        hostPhotoURL: userData.photoURL || "",
        hostProfession: userData.profession || "",
        hostSpecification: userData.specification || "",
        approved: false, // Must be approved by Admin
        createdAt: new Date().toISOString(),
        enrollmentCount: 0,
      });
      onClose();
      // Optionally reset form
      setFormData({
        title: "",
        type: "workshop",
        date: "",
        time: "",
        description: "",
        bannerUrl: "",
        topics: "",
        outcomes: "",
        agenda: "",
        radarTechnical: 50,
        radarSoftSkills: 50,
        radarStrategy: 50,
        radarHandsOn: 50,
        radarTheory: 50,
      });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to submit event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-2xl my-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center bg-slate-100/50 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all rounded-full"
            >
              <X className="h-4 w-4" strokeWidth={3} />
            </button>

            <h3 className="font-display text-2xl font-bold text-ink">Host an Event</h3>
            <p className="mt-2 text-sm font-semibold text-slate-600 mb-6">
              Submit your webinar or workshop details. It will be reviewed by our team.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. Masterclass on System Design"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">Event Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className={inputCls}
                >
                  <option value="workshop">Workshop</option>
                  <option value="webinar">Webinar</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={inputCls}
                  placeholder="What will students learn?"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">Event Banner</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="banner-upload"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={uploadingImage}
                  />
                  <div
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all ${
                      formData.bannerUrl
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    {uploadingImage ? (
                      <div className="flex flex-col items-center text-purple-600">
                        <Loader2 className="w-6 h-6 animate-spin mb-2" />
                        <span className="text-sm font-semibold">Uploading...</span>
                      </div>
                    ) : formData.bannerUrl ? (
                      <div className="flex flex-col items-center text-emerald-600">
                        <img
                          src={formData.bannerUrl}
                          alt="Preview"
                          className="h-20 object-cover rounded-lg mb-2 shadow-sm"
                        />
                        <span className="text-xs font-bold">
                          Image uploaded successfully (Click to replace)
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-slate-500">
                        <Upload className="w-6 h-6 text-purple-600 mb-2" />
                        <span className="text-sm font-semibold text-slate-700">
                          Upload Event Banner
                        </span>
                        <span className="text-xs text-slate-400 mt-1">16:9 Recommended</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">
                  Topics Covered (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.topics}
                  onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  className={inputCls}
                  placeholder="React, State Management, API Calls"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">
                  Outcomes (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.outcomes}
                  onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
                  className={inputCls}
                  placeholder="Build a full-stack app, Master hooks"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-600">
                  Agenda (One per line: "Time - Title - Detail")
                </label>
                <textarea
                  rows={4}
                  value={formData.agenda}
                  onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                  className={inputCls}
                  placeholder="00:00 - Introduction - Welcome and overview&#10;00:15 - Core Concepts - Deep dive into theory"
                />
              </div>

              <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest mb-4 block">
                  Skill Radar Rating (0-100)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "radarTechnical", label: "Technical Depth" },
                    { key: "radarSoftSkills", label: "Soft Skills & Comms" },
                    { key: "radarStrategy", label: "Strategic Thinking" },
                    { key: "radarHandsOn", label: "Practical Hands-on" },
                    { key: "radarTheory", label: "Theory & Concepts" },
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <label className="text-[10px] font-bold text-slate-600">
                          {field.label}
                        </label>
                        <span className="text-[10px] font-bold text-purple-600">
                          {(formData as any)[field.key]}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={(formData as any)[field.key]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.key]: parseInt(e.target.value) })
                        }
                        className="w-full accent-purple-600"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit for Approval"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
