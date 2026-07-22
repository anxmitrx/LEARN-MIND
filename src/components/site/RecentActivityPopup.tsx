import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWebinars } from "@/hooks/useWebinars";
import { useWorkshops } from "@/hooks/useWorkshops";
import { Presentation, BookOpen, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";

type ActivityType = "webinar" | "workshop";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  timeAgo: string;
  url: string;
  isExternal: boolean;
}

const generateRandomTimeAgo = () => {
  const times = ["Just now", "5 mins ago", "12 mins ago", "1 hour ago", "2 hours ago", "4 hours ago"];
  return times[Math.floor(Math.random() * times.length)];
};

const formatTimeAgo = (timestamp?: any, fallbackDate?: string) => {
  try {
    let dateObj: Date | null = null;
    if (timestamp) {
      if (typeof timestamp.toDate === 'function') {
        dateObj = timestamp.toDate();
      } else if (timestamp instanceof Date) {
        dateObj = timestamp;
      } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        dateObj = new Date(timestamp);
      }
    } else if (fallbackDate) {
      dateObj = new Date(fallbackDate);
    }
    
    if (dateObj && !isNaN(dateObj.getTime())) {
      // If the date is in the future, just say "Coming soon" or fallback to a standard relative format.
      // formatDistanceToNow will say "in 2 months" for future dates.
      return formatDistanceToNow(dateObj, { addSuffix: true });
    }
  } catch (err) {
    // Ignore and fallback
  }
  return generateRandomTimeAgo();
};

export function RecentActivityPopup() {
  const navigate = useNavigate();
  const { webinars } = useWebinars();
  const { workshops } = useWorkshops();
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Combine and shuffle data
  useEffect(() => {
    if (webinars.length === 0 && workshops.length === 0) return;

    const mappedWebinars: Activity[] = webinars.map((w, i) => ({
      id: `webinar-${w.id || i}`,
      type: "webinar",
      title: w.title,
      timeAgo: formatTimeAgo((w as any).timestamp, (w as any).date),
      url: w.link || "/webinars",
      isExternal: true,
    }));

    const mappedWorkshops: Activity[] = workshops.map((w, i) => ({
      id: `workshop-${w.slug || i}`,
      type: "workshop",
      title: w.title,
      timeAgo: formatTimeAgo((w as any).timestamp),
      url: `/workshops/${w.slug}`,
      isExternal: false,
    }));

    const combined = [...mappedWebinars, ...mappedWorkshops].sort(() => Math.random() - 0.5);
    setActivities(combined);
  }, [webinars, workshops]);

  // Handle the notification cycle
  useEffect(() => {
    if (activities.length === 0 || isDismissed) return;

    // Initial delay before showing the first popup
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const interval = setInterval(() => {
      setIsVisible(false);
      
      // Wait for exit animation, then change index and show again
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        if (!isDismissed) setIsVisible(true);
      }, 1000); // 1s pause between popups
      
    }, 8000); // Show each popup for ~7 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [activities, isDismissed]);

  if (activities.length === 0 || isDismissed) return null;

  const currentActivity = activities[currentIndex];

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true); // Don't show again in this session
  };

  const handleCardClick = () => {
    if (!currentActivity) return;
    if (currentActivity.isExternal) {
      window.open(currentActivity.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate({ to: currentActivity.url });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 sm:bottom-8 sm:left-8 pointer-events-none">
      <AnimatePresence>
        {isVisible && currentActivity && (
          <motion.div
            onClick={handleCardClick}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 rounded-2xl w-72 flex gap-4 relative overflow-hidden group cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-shadow"
          >
            {/* Subtle animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Close button */}
            <button 
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 hover:bg-slate-100 rounded-full p-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Icon */}
            <div className={`mt-0.5 shrink-0 flex items-center justify-center w-10 h-10 rounded-full border ${currentActivity.type === 'webinar' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-purple-50 border-purple-100 text-purple-600'}`}>
              {currentActivity.type === 'webinar' ? <Presentation className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                New {currentActivity.type} Added
              </p>
              <p className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">
                {currentActivity.title}
              </p>
              <p className="text-xs font-medium text-slate-400 mt-1">
                {currentActivity.timeAgo}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
