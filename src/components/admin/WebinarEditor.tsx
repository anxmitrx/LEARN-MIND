import { useState } from "react";
import { X, Save } from "lucide-react";

export function WebinarEditor({
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
      title: "",
      presenter: "",
      date: "",
      time: "",
      status: "upcoming",
      link: "",
    },
  );

  const handleChange = (key: string, value: any) => setData((d: any) => ({ ...d, [key]: value }));

  return (
    <div
      className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6 bg-slate-50/50">
        <h3 className="font-display text-lg font-bold text-slate-900">Edit Webinar</h3>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
              Webinar Title
            </label>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
              Presenter Name
            </label>
            <input
              type="text"
              value={data.presenter || ""}
              onChange={(e) => handleChange("presenter", e.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Date (YYYY-MM-DD)
              </label>
              <input
                type="text"
                placeholder="e.g. 2026-06-25"
                value={data.date || ""}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Time (with timezone)
              </label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM PST"
                value={data.time || ""}
                onChange={(e) => handleChange("time", e.target.value)}
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
              Status
            </label>
            <select
              value={data.status || "upcoming"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            >
              <option value="upcoming">Upcoming (Register & Join)</option>
              <option value="past">Past (Watch Recording)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
              Graphy Portal Link (URL)
            </label>
            <input
              type="text"
              placeholder="https://your-graphy-link.com/webinar"
              value={data.link || ""}
              onChange={(e) => handleChange("link", e.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
            <p className="mt-1 text-[10px] text-slate-500 font-semibold">
              Users will be redirected to this link when they click the button on the webinar card.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-100 p-4 sm:p-6 bg-slate-50/50">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-xs font-extrabold text-slate-600 hover:text-slate-800 transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(data)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
