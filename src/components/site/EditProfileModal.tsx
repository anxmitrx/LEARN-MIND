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
import { db } from "@/lib/firebase";
import { Loader2, Edit3 } from "lucide-react";

export function EditProfileModal() {
  const { user, userData } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState(userData?.name || user?.displayName || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [institution, setInstitution] = useState(userData?.institution || "");
  const [profession, setProfession] = useState(userData?.profession || "");
  const [specification, setSpecification] = useState(userData?.specification || "");
  const [bio, setBio] = useState(userData?.bio || "");

  const isMentor = userData?.role === "mentor";

  useEffect(() => {
    if (open) {
      setName(userData?.name || user?.displayName || "");
      setPhone(userData?.phone || "");
      setInstitution(userData?.institution || "");
      setProfession(userData?.profession || "");
      setSpecification(userData?.specification || "");
      setBio(userData?.bio || "");
    }
  }, [open, userData, user]);

  if (!user) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      const updateData: any = {
        name,
        phone,
        bio,
      };

      if (isMentor) {
        updateData.profession = profession;
        updateData.specification = specification;
      } else {
        updateData.institution = institution;
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-white/80 hover:bg-white text-indigo-700 border border-indigo-100 px-4 py-2 rounded-full font-display text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none">
          <Edit3 className="h-3 w-3" />
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-white/40 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-wide text-ink text-xl">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium text-sm">
            Update your personal information below. This will be displayed on your dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="phone"
                className="text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
                placeholder="e.g. 555-123-4567"
              />
            </div>
            {isMentor ? (
              <div className="grid gap-2">
                <Label
                  htmlFor="profession"
                  className="text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  Profession / Title *
                </Label>
                <Input
                  id="profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="bg-white/50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
            ) : (
              <div className="grid gap-2">
                <Label
                  htmlFor="institution"
                  className="text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  Institution / College
                </Label>
                <Input
                  id="institution"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="bg-white/50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
                  placeholder="e.g. University Name"
                />
              </div>
            )}
          </div>

          {isMentor && (
            <div className="grid gap-2">
              <Label
                htmlFor="specification"
                className="text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Expertise / Topics *
              </Label>
              <Input
                id="specification"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
                className="bg-white/50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
                placeholder="e.g. System Design, Product Management"
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label
              htmlFor="bio"
              className="text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              Short Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-white/50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl resize-none"
              placeholder="Tell us a little bit about yourself..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-full font-display uppercase tracking-wider font-bold text-xs bg-white hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="rounded-full bg-indigo-600 hover:bg-indigo-700 font-display uppercase tracking-wider font-bold text-xs"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
