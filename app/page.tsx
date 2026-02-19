import Link from "next/link";
import { Triangle, Timer, Clock, Radio, ChevronLeft, ChevronRight } from "lucide-react";
import { mockSessions, Session } from "@/lib/mockData";

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function WooLogo() {
  return (
    <svg width="67" height="24" viewBox="0 0 67 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="19" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontSize="22" fontWeight="800" fill="#0a0a0a" letterSpacing="-1">WOO</text>
    </svg>
  );
}

function SessionRow({ session }: { session: Session }) {
  return (
    <Link href={`/session/${session.id}`}>
      <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
        {/* Main data */}
        <div className="flex flex-col gap-3 p-4">
          <p className="text-sm font-semibold text-[#0a0a0a]">{session.athlete}</p>
          <div className="flex items-center gap-2 pb-1">
            {/* Highest Jump */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <span className="text-sm text-[#171717]">Highest Jump</span>
              <div className="flex items-center gap-1">
                <Triangle size={20} fill="#00aeff" color="#00aeff" />
                <span className="text-base font-semibold text-[#0a0a0a]">{session.stats.maxHeight.toFixed(1)}m</span>
              </div>
            </div>
            {/* Max Airtime */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <span className="text-sm text-[#171717]">Max Airtime</span>
              <div className="flex items-center gap-1">
                <Timer size={20} className="text-[#a3a3a3]" />
                <span className="text-base font-semibold text-[#0a0a0a]">{session.stats.maxAirtime.toFixed(1)}s</span>
              </div>
            </div>
            {/* Duration */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <span className="text-sm text-[#171717]">Duration</span>
              <div className="flex items-center gap-1">
                <Clock size={20} className="text-[#a3a3a3]" />
                <span className="text-base font-semibold text-[#0a0a0a]">{formatDuration(session.duration)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-[#fafafa] flex items-center gap-1.5 px-4 py-3">
          <Radio size={20} className="text-[#a3a3a3] flex-shrink-0" />
          <span className="flex-1 text-sm text-[#737373]">Recorded on {session.recordedAt}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const sessions = mockSessions;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Nav */}
      <nav className="sticky top-0 z-20 bg-white border-b border-[#e2eaee] h-16">
        <div className="max-w-[826px] mx-auto h-full flex items-center justify-between px-4">
          <WooLogo />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0">
            <span className="text-white text-xs font-bold">MH</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-[826px] mx-auto px-4 py-6">
        <div className="bg-white border border-[#e5e5e5] rounded-lg p-8 flex flex-col gap-6">
          <p className="text-xl font-semibold text-[#0a0a0a]">Your latest sessions</p>

          {/* Session rows */}
          <div className="flex flex-col gap-2">
            {sessions.map((session) => (
              <SessionRow key={session.id} session={session} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 py-2">
            <button className="flex items-center gap-1 h-9 px-2.5 rounded-md opacity-50 text-sm font-medium text-[#0a0a0a]" disabled>
              <ChevronLeft size={16} />
              Previous
            </button>
            <button className="flex items-center justify-center h-9 w-9 rounded-md bg-white border border-[#e5e5e5] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-sm font-medium text-[#0a0a0a]">
              1
            </button>
            <button className="flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium text-[#0a0a0a] hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium text-[#0a0a0a] hover:bg-gray-100 transition-colors">
              3
            </button>
            <span className="flex items-center justify-center h-9 w-9 text-sm text-[#0a0a0a]">…</span>
            <button className="flex items-center gap-1 h-9 px-2.5 rounded-md text-sm font-medium text-[#0a0a0a] hover:bg-gray-100 transition-colors">
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
