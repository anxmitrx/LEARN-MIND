import { useState } from "react";
import { X, Plus, Trash2, Save } from "lucide-react";
import { Track } from "@/lib/tracks";

export function WorkshopEditor({
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
      slug: "",
      number: "",
      title: "",
      short: "",
      tagline: "",
      description: "",
      oneLinerPromise: "",
      timeCommitment: "",
      whoItsFor: [],
      youWillLearn: [],
      exampleSessions: [],
      outcomes: [],
      topics: [],
      radar: [],
      agenda: [],
    },
  );

  const handleChange = (key: string, value: any) => setData((d: any) => ({ ...d, [key]: value }));

  const handleArrayStringChange = (key: string, index: number, value: string) => {
    const newArr = [...data[key]];
    newArr[index] = value;
    handleChange(key, newArr);
  };

  const handleArrayStringAdd = (key: string) => handleChange(key, [...(data[key] || []), ""]);

  const handleArrayStringRemove = (key: string, index: number) => {
    const newArr = [...data[key]];
    newArr.splice(index, 1);
    handleChange(key, newArr);
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6 bg-slate-50/50">
        <h3 className="font-display text-lg font-bold text-slate-900">Edit Workshop</h3>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-8">
        {/* Basic Info */}
        <section className="space-y-4">
          <h4 className="font-bold text-indigo-600 border-b pb-2">Basic Info</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "slug",
              "number",
              "title",
              "short",
              "tagline",
              "timeCommitment",
              "oneLinerPromise",
            ].map((key) => (
              <div key={key}>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  {key}
                </label>
                <input
                  type="text"
                  value={data[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Description
              </label>
              <textarea
                value={data.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* String Arrays */}
        <section className="space-y-6">
          <h4 className="font-bold text-indigo-600 border-b pb-2">
            Lists (Who It's For, Outcomes, etc)
          </h4>
          {["whoItsFor", "youWillLearn", "exampleSessions", "outcomes"].map((key) => (
            <div key={key} className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  {key}
                </label>
                <button
                  onClick={() => handleArrayStringAdd(key)}
                  className="text-xs flex items-center text-indigo-600 font-bold hover:underline"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add
                </button>
              </div>
              {(data[key] || []).map((val: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleArrayStringChange(key, idx, e.target.value)}
                    className="flex-1 border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 rounded-lg focus:border-indigo-500 outline-none"
                  />
                  <button
                    onClick={() => handleArrayStringRemove(key, idx)}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Topics */}
        <section className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-indigo-600">Topics</h4>
            <button
              onClick={() =>
                handleChange("topics", [...(data.topics || []), { title: "", icon: "Compass" }])
              }
              className="text-xs flex items-center text-indigo-600 font-bold hover:underline"
            >
              <Plus className="w-3 h-3 mr-1" /> Add Topic
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data.topics || []).map((topic: any, idx: number) => (
              <div
                key={idx}
                className="flex gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={topic.title}
                    onChange={(e) => {
                      const newArr = [...data.topics];
                      newArr[idx].title = e.target.value;
                      handleChange("topics", newArr);
                    }}
                    className="w-full border border-slate-200 px-2 py-1 text-xs font-semibold rounded focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Icon Name (e.g. Compass)"
                    value={topic.icon}
                    onChange={(e) => {
                      const newArr = [...data.topics];
                      newArr[idx].icon = e.target.value;
                      handleChange("topics", newArr);
                    }}
                    className="w-full border border-slate-200 px-2 py-1 text-xs font-semibold rounded focus:border-indigo-500 outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    const newArr = [...data.topics];
                    newArr.splice(idx, 1);
                    handleChange("topics", newArr);
                  }}
                  className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Radar */}
        <section className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-indigo-600">Radar Stats</h4>
            <button
              onClick={() =>
                handleChange("radar", [...(data.radar || []), { skill: "", value: 50 }])
              }
              className="text-xs flex items-center text-indigo-600 font-bold hover:underline"
            >
              <Plus className="w-3 h-3 mr-1" /> Add Skill
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(data.radar || []).map((stat: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Skill"
                  value={stat.skill}
                  onChange={(e) => {
                    const newArr = [...data.radar];
                    newArr[idx].skill = e.target.value;
                    handleChange("radar", newArr);
                  }}
                  className="flex-1 border border-slate-200 px-2 py-1.5 text-xs font-semibold rounded focus:border-indigo-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Value"
                  value={stat.value}
                  onChange={(e) => {
                    const newArr = [...data.radar];
                    newArr[idx].value = Number(e.target.value);
                    handleChange("radar", newArr);
                  }}
                  className="w-16 border border-slate-200 px-2 py-1.5 text-xs font-semibold rounded focus:border-indigo-500 outline-none"
                />
                <button
                  onClick={() => {
                    const newArr = [...data.radar];
                    newArr.splice(idx, 1);
                    handleChange("radar", newArr);
                  }}
                  className="text-red-500 hover:bg-red-50 p-1 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Agenda */}
        <section className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-indigo-600">Agenda</h4>
            <button
              onClick={() =>
                handleChange("agenda", [
                  ...(data.agenda || []),
                  { time: "", title: "", detail: "" },
                ])
              }
              className="text-xs flex items-center text-indigo-600 font-bold hover:underline"
            >
              <Plus className="w-3 h-3 mr-1" /> Add Session
            </button>
          </div>
          <div className="space-y-3">
            {(data.agenda || []).map((session: any, idx: number) => (
              <div
                key={idx}
                className="flex gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm items-start"
              >
                <div className="flex-1 grid grid-cols-[1fr_2fr] gap-2">
                  <input
                    type="text"
                    placeholder="Time (e.g. Min 00–15)"
                    value={session.time}
                    onChange={(e) => {
                      const newArr = [...data.agenda];
                      newArr[idx].time = e.target.value;
                      handleChange("agenda", newArr);
                    }}
                    className="w-full border border-slate-200 px-2 py-1.5 text-xs font-semibold rounded focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={session.title}
                    onChange={(e) => {
                      const newArr = [...data.agenda];
                      newArr[idx].title = e.target.value;
                      handleChange("agenda", newArr);
                    }}
                    className="w-full border border-slate-200 px-2 py-1.5 text-xs font-semibold rounded focus:border-indigo-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Detail"
                    value={session.detail}
                    onChange={(e) => {
                      const newArr = [...data.agenda];
                      newArr[idx].detail = e.target.value;
                      handleChange("agenda", newArr);
                    }}
                    className="col-span-2 w-full border border-slate-200 px-2 py-1.5 text-xs font-semibold rounded focus:border-indigo-500 outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    const newArr = [...data.agenda];
                    newArr.splice(idx, 1);
                    handleChange("agenda", newArr);
                  }}
                  className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
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
