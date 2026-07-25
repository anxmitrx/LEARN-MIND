import { Link } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";

export interface EventPostCardProps {
  host: {
    uid: string;
    name: string;
    photoURL?: string;
  };
  date: string;
  time?: string;
  title: string;
  description: string;
  bannerUrl?: string;
  tags?: string[];
  actionText: string;
  onAction: () => void;
  isActionDisabled?: boolean;
}

export function EventPostCard({
  host,
  date,
  time,
  title,
  description,
  bannerUrl,
  tags = [],
  actionText,
  onAction,
  isActionDisabled = false,
}: EventPostCardProps) {
  return (
    <article className="bg-white/80 backdrop-blur-md transform-gpu will-change-transform border border-slate-200 shadow-sm rounded-2xl p-0 overflow-hidden flex flex-col mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <Link
          to="/profile/$userId"
          params={{ userId: host.uid }}
          className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center border border-slate-200"
        >
          {host.photoURL ? (
            <img src={host.photoURL} alt={host.name} className="w-full h-full object-cover" loading="lazy" decoding="async" fetchPriority="low" />
          ) : (
            <span className="font-bold text-indigo-500 uppercase">{(host.name || "U")[0]}</span>
          )}
        </Link>
        <div className="flex flex-col flex-1">
          <Link
            to="/profile/$userId"
            params={{ userId: host.uid }}
            className="font-semibold text-slate-900 hover:underline inline-block w-fit leading-tight"
          >
            {host.name}
          </Link>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {date}
            </span>
            {time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {time}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body / Banner */}
      <div className="w-full aspect-[4/5] sm:aspect-square bg-slate-100 relative">
        {bannerUrl ? (
          <img src={bannerUrl} alt={title} className="w-full h-full object-cover" loading="lazy" decoding="async" fetchPriority="low" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-6 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-indigo-900/50">
              {title}
            </h3>
          </div>
        )}
      </div>

      {/* Footer / Caption */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-display text-xl font-bold text-slate-900 leading-tight">{title}</h3>

        {description && (
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{description}</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-indigo-50/80 text-indigo-700 px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2">
          <button
            onClick={onAction}
            disabled={isActionDisabled}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-sm transition-transform active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
          >
            {actionText}
          </button>
        </div>
      </div>
    </article>
  );
}
