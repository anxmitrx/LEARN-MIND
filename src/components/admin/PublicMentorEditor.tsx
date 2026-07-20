import { useState, useRef } from "react";
import { X, Save, Upload, Image as ImageIcon } from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function PublicMentorEditor({
  initialData,
  onSave,
  onCancel,
}: {
  initialData: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState<any>(
    initialData || {
      name: "",
      title: "",
      qualifications: "",
      bio: "",
      topics: [],
      initials: "",
      hue: 0,
      photoURL: "",
    },
  );

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (key: string, value: any) => setData((d: any) => ({ ...d, [key]: value }));

  const handleTopicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const topicsArray = val.split(",").map((t) => t.trim()).filter((t) => t !== "");
    handleChange("topics", topicsArray);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!storage) {
      alert("Firebase Storage is not initialized.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const fileExt = file.name.split(".").pop();
    const fileName = `mentors/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("Image upload failed. Check console.");
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        handleChange("photoURL", downloadURL);
        setUploading(false);
        setUploadProgress(100);
      },
    );
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6 bg-slate-50/50">
        <h3 className="font-display text-lg font-bold text-slate-900">
          {initialData ? "Edit Mentor" : "Add New Mentor"}
        </h3>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
        {/* Photo Upload Section */}
        <section className="space-y-4">
          <h4 className="font-bold text-indigo-600 border-b pb-2">Profile Photo</h4>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-300 overflow-hidden bg-slate-50 flex items-center justify-center relative shrink-0">
              {data.photoURL ? (
                <img src={data.photoURL} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="h-8 w-8 text-slate-400" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center flex-col gap-2">
                  <div className="h-5 w-5 border-2 border-indigo-600 border-t-transparent animate-spin rounded-full"></div>
                  <span className="text-[10px] font-bold text-indigo-600">{Math.round(uploadProgress)}%</span>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                {data.photoURL ? "Change Photo" : "Upload Photo"}
              </button>
              <p className="text-xs text-slate-500 font-semibold">
                Upload a professional headshot. Recommended size: 400x400px (1:1 aspect ratio). Max size: 2MB.
              </p>
              {data.photoURL && (
                <button
                  type="button"
                  onClick={() => handleChange("photoURL", "")}
                  className="text-xs text-red-500 font-bold hover:underline block"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Basic Info */}
        <section className="space-y-4">
          <h4 className="font-bold text-indigo-600 border-b pb-2">Mentor Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={data.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Tanmoy Sain"
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Title / Role
              </label>
              <input
                type="text"
                value={data.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Lead Industry Mentor"
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Initials (For Fallback)
              </label>
              <input
                type="text"
                value={data.initials || ""}
                onChange={(e) => handleChange("initials", e.target.value)}
                placeholder="e.g. TS"
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Hue (0-360, For Fallback)
              </label>
              <input
                type="number"
                value={data.hue || 0}
                onChange={(e) => handleChange("hue", parseInt(e.target.value) || 0)}
                placeholder="e.g. 45"
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Bio / Description
              </label>
              <textarea
                value={data.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={3}
                placeholder="A short professional biography..."
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Topics / Expertise (Comma separated)
              </label>
              <input
                type="text"
                value={(data.topics || []).join(", ")}
                onChange={handleTopicsChange}
                placeholder="e.g. Career Pathing, Strategy, Leadership"
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(data)}
          disabled={uploading}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-sm font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/20 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          Save Mentor
        </button>
      </div>
    </div>
  );
}
