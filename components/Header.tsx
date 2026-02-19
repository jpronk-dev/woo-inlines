"use client";

import { useRouter } from "next/navigation";
import { Session } from "@/lib/mockData";

interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  const router = useRouter();

  return (
    <>
      {/* Top-left: Session info card */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-2 pl-2 pr-4 py-2 shadow-sm">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Go back"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
            {session.athlete}, {session.date}
          </span>
        </div>
      </div>

      {/* Top-right: Camera controls + actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {/* Camera controls card */}
        <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-2 pl-2 pr-2.5 py-2 shadow-sm">
          {/* Rotate3D — active state */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 flex-shrink-0"
            aria-label="Rotate 3D"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2" />
              <path d="m15 6 5 4-5 4" />
              <path d="M3 12a9 9 0 0 0 9 9" />
            </svg>
          </button>
          {/* ZoomIn */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Zoom in"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M11 8v6M8 11h6" />
            </svg>
          </button>
        </div>

        {/* Actions card */}
        <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-2 pl-2 pr-2.5 py-2 shadow-sm">
          {/* Settings */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Settings"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7h-9M14 17H5M17 17a3 3 0 1 0 0-6 3 3 0 0 0 0-6zM7 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
          </button>
          {/* Share */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Share"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden">
            <span className="text-white text-xs font-bold">
              {session.athlete.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
