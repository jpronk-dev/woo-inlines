"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Rotate3d, ZoomIn, Settings2, Share } from "lucide-react";
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
            <ArrowLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-[#0a0a0a] truncate max-w-[180px]">
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
            <Rotate3d size={16} />
          </button>
          {/* ZoomIn */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {/* Actions card */}
        <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-2 pl-2 pr-2.5 py-2 shadow-sm">
          {/* Settings */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Settings"
          >
            <Settings2 size={16} />
          </button>
          {/* Share */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Share"
          >
            <Share size={16} />
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
