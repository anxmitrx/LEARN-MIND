import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Loader2, MailCheck, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmail,
});

function VerifyEmail() {
  const navigate = useNavigate();
  const { setShowLoginModal } = useAuth();
  const [status, setStatus] = useState<"verifying" | "prompt-email" | "success" | "error">(
    "verifying",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        setStatus("prompt-email");
      } else {
        verifyLink(email);
      }
    } else {
      setStatus("error");
      setErrorMsg("This sign-in link is invalid or has expired.");
    }
  }, []);

  const verifyLink = async (email: string) => {
    setStatus("verifying");
    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem("emailForSignIn");

      const role = window.localStorage.getItem("roleForSignIn") || "student";
      window.localStorage.removeItem("roleForSignIn");

      const authUser = result.user;
      const userRef = doc(db, "users", authUser.uid);
      const userSnap = await getDoc(userRef);

      let needsOnboarding = false;

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: authUser.displayName || "User",
          email: authUser.email,
          photoURL: authUser.photoURL || "",
          role: role,
          xp: 0,
          level: "Level 1: Novice",
          onboardingComplete: false,
          createdAt: new Date().toISOString(),
        });
        needsOnboarding = true;
      } else {
        const data = userSnap.data();
        if (!data.onboardingComplete) {
          needsOnboarding = true;
          if (!data.role) {
            await updateDoc(userRef, { role });
          }
        }
      }

      setStatus("success");

      setTimeout(() => {
        if (needsOnboarding) {
          setShowLoginModal(true);
        }
        navigate({ to: "/dashboard" });
      }, 1500);
    } catch (error: any) {
      console.error("Error signing in with email link:", error);
      setStatus("error");
      setErrorMsg(error.message || "An error occurred while verifying your email.");
    }
  };

  const handleManualEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      verifyLink(emailInput);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="max-w-md w-full bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-xl text-center">
        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
            <h2 className="text-2xl font-display font-bold text-ink">Verifying Email</h2>
            <p className="text-slate-600 mt-2 font-medium">
              Please wait while we log you in securely...
            </p>
          </div>
        )}

        {status === "prompt-email" && (
          <div className="flex flex-col items-center">
            <MailCheck className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-display font-bold text-ink">Confirm your Email</h2>
            <p className="text-slate-600 mt-2 font-medium mb-6">
              You opened this link on a different device or browser. Please confirm your email to
              continue.
            </p>
            <form
              onSubmit={handleManualEmailSubmit}
              className="w-full text-left flex flex-col gap-3"
            >
              <input
                type="email"
                required
                autoFocus
                placeholder="you@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all rounded-xl focus:bg-white focus:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600"
              />
              <button
                type="submit"
                disabled={!emailInput}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                Verify & Log In
              </button>
            </form>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600 mb-4">
              <MailCheck className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink">Success!</h2>
            <p className="text-slate-600 mt-2 font-medium">
              You have been successfully authenticated. Redirecting...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-red-100 text-red-600 mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink">Verification Failed</h2>
            <p className="text-slate-600 mt-2 font-medium mb-6">{errorMsg}</p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
