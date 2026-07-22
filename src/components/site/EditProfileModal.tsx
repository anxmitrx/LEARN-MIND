import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Loader2, Edit3, Plus, Trash2, Upload, Camera } from "lucide-react";

export function EditProfileModal() {
  const { user, userData } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profileBannerUrl, setProfileBannerUrl] = useState("");
  
  // Student specific
  const [college, setCollege] = useState("");
  const [school, setSchool] = useState("");

  // Mentor specific
  const [profession, setProfession] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);

  const isMentor = userData?.role === "mentor";

  useEffect(() => {
    if (open) {
      setName(userData?.name || user?.displayName || "");
      setPhone(userData?.phone || "");
      setBio(userData?.bio || "");
      setProfileBannerUrl(userData?.profileBannerUrl || "");
      
      if (isMentor) {
        setProfession(userData?.profession || "");
        setExpertise((userData?.expertise || []).join(", ") || userData?.specification || "");
        setExperience(userData?.experience || []);
        setEducation(userData?.education || []);
      } else {
        setCollege(userData?.college || userData?.institution || "");
        setSchool(userData?.school || "");
      }
    }
  }, [open, userData, user, isMentor]);

  if (!user) return null;

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingBanner(true);
      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `banners/${user.uid}/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      await new Promise<void>((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, resolve);
      });
      
      const downloadURL = await getDownloadURL(storageRef);
      setProfileBannerUrl(downloadURL);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const updateData: any = {
        name,
        phone,
        bio,
        profileBannerUrl
      };

      if (isMentor) {
        updateData.profession = profession;
        updateData.expertise = expertise.split(",").map(s => s.trim()).filter(Boolean);
        updateData.experience = experience;
        updateData.education = education;
      } else {
        updateData.college = college;
        updateData.school = school;
      }

      if (phone !== userData?.phone) {
        updateData.phoneVerified = false;
      }

      await updateDoc(userRef, updateData);
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add handlers
  const addExperience = () => setExperience([...experience, { company: "", role: "", duration: "", description: "" }]);
  const removeExperience = (index: number) => setExperience(experience.filter((_, i) => i !== index));
  const updateExperience = (index: number, field: string, value: string) => {
    const newExp = [...experience];
    newExp[index][field] = value;
    setExperience(newExp);
  };

  const addEducation = () => setEducation([...education, { institution: "", degree: "", year: "" }]);
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));
  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...education];
    newEdu[index][field] = value;
    setEducation(newEdu);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-white/80 hover:bg-white text-indigo-700 border border-indigo-100 px-4 py-2 rounded-full font-display text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none">
          <Edit3 className="h-3 w-3" />
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto border-white/40 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-wide text-ink text-xl">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium text-sm">
            Update your public profile information.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          
          {/* Banner Upload */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Profile Banner</Label>
            <div className="relative h-32 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 overflow-hidden group flex items-center justify-center">
              {profileBannerUrl ? (
                <img src={profileBannerUrl} className="w-full h-full object-cover" alt="Banner" />
              ) : (
                <span className="text-sm font-medium text-slate-400">No banner uploaded</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <input type="file" className="hidden" id="banner-upload" accept="image/*" onChange={handleBannerUpload} disabled={uploadingBanner} />
                <label htmlFor="banner-upload" className="cursor-pointer text-white flex items-center gap-2 font-semibold">
                  {uploadingBanner ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                  {uploadingBanner ? "Uploading..." : "Change Banner"}
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-white/50 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/50 rounded-xl" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">About / Bio</Label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="bg-white/50 rounded-xl resize-none" />
          </div>

          {!isMentor && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">College</Label>
                <Input value={college} onChange={(e) => setCollege(e.target.value)} className="bg-white/50 rounded-xl" placeholder="e.g. State University" />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">School</Label>
                <Input value={school} onChange={(e) => setSchool(e.target.value)} className="bg-white/50 rounded-xl" placeholder="e.g. High School Name" />
              </div>
            </div>
          )}

          {isMentor && (
            <>
              <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Role / Tagline</Label>
                <Input value={profession} onChange={(e) => setProfession(e.target.value)} className="bg-white/50 rounded-xl" placeholder="e.g. Senior SWE @ Google" />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Expertise (Comma separated)</Label>
                <Input value={expertise} onChange={(e) => setExpertise(e.target.value)} className="bg-white/50 rounded-xl" placeholder="e.g. System Design, React, Node.js" />
              </div>

              {/* Experience */}
              <div className="grid gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Experience</Label>
                  <Button variant="ghost" size="sm" onClick={addExperience} className="h-8 text-indigo-600"><Plus className="w-4 h-4 mr-1" /> Add</Button>
                </div>
                {experience.map((exp, index) => (
                  <div key={index} className="grid gap-3 relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <Input placeholder="Company" value={exp.company} onChange={e => updateExperience(index, "company", e.target.value)} className="h-9 text-sm" />
                      <Input placeholder="Role" value={exp.role} onChange={e => updateExperience(index, "role", e.target.value)} className="h-9 text-sm" />
                      <Input placeholder="Duration (e.g. 2020 - Present)" value={exp.duration} onChange={e => updateExperience(index, "duration", e.target.value)} className="h-9 text-sm col-span-2" />
                    </div>
                    <Textarea placeholder="Description of your work..." value={exp.description} onChange={e => updateExperience(index, "description", e.target.value)} className="text-sm h-20 resize-none" />
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="grid gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Education (Colleges/Universities)</Label>
                  <Button variant="ghost" size="sm" onClick={addEducation} className="h-8 text-indigo-600"><Plus className="w-4 h-4 mr-1" /> Add</Button>
                </div>
                {education.map((edu, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3 relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    <Input placeholder="Institution" value={edu.institution} onChange={e => updateEducation(index, "institution", e.target.value)} className="h-9 text-sm col-span-2 mt-2" />
                    <Input placeholder="Degree" value={edu.degree} onChange={e => updateEducation(index, "degree", e.target.value)} className="h-9 text-sm" />
                    <Input placeholder="Year (e.g. 2018 - 2022)" value={edu.year} onChange={e => updateEducation(index, "year", e.target.value)} className="h-9 text-sm" />
                  </div>
                ))}
              </div>
            </>
          )}

        </div>

        <DialogFooter className="sticky bottom-0 bg-white/95 backdrop-blur py-4 border-t border-slate-100 mt-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="rounded-full">Cancel</Button>
          <Button onClick={handleSave} disabled={loading} className="rounded-full bg-indigo-600 hover:bg-indigo-700">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
