import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
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
  const [formData, setFormData] = useState({
    title: "",
    type: "workshop",
    date: "",
    time: "",
    description: "",
  });

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
            className="relative w-full max-w-lg overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 p-6 sm:p-8 shadow-2xl rounded-2xl my-8"
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
