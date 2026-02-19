"use client";

import { useRouter } from "next/navigation";
import { Session } from "@/lib/mockData";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 right-0 h-[56px] bg-white/90 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 z-10">
      {/* Left: back + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8L10 13"
              stroke="#1A1A1A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-900 truncate max-w-[220px]">
          {session.athlete}, {session.date}
        </span>
      </div>

      {/* Right: action icons */}
      <div className="flex items-center gap-1">
        {/* Kite/wind icon */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 10 L4 4 M10 10 L16 4 M10 10 L10 17"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="10" cy="10" r="2" fill="#1A1A1A" />
            <path
              d="M4 4 Q10 1 16 4 Q13 10 10 10 Q7 10 4 4Z"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              fill="none"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Zoom icon */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="#1A1A1A" strokeWidth="1.5" />
            <path
              d="M13 13L16.5 16.5"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M5 7.5H10M7.5 5V10" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Filter/settings icon */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="5" cy="5" r="1.5" stroke="#1A1A1A" strokeWidth="1.5" />
            <circle cx="13" cy="9" r="1.5" stroke="#1A1A1A" strokeWidth="1.5" />
            <circle cx="5" cy="13" r="1.5" stroke="#1A1A1A" strokeWidth="1.5" />
            <path d="M7 5H16M1 9H11M7 13H16" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Share icon */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 2V12M5 6L9 2L13 6"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12V15C3 15.55 3.45 16 4 16H14C14.55 16 15 15.55 15 15V12"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center ml-1 cursor-pointer">
          <span className="text-white text-xs font-bold">
            {session.athlete
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
      </div>
    </div>
  );
}
