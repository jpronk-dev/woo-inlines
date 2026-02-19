import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockSessions, Session } from "@/lib/mockData";

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function WooLogo() {
  return (
    <div className="h-[24px] relative shrink-0 w-[66.667px]">
      <div className="absolute inset-[1.45%_63.18%_3.42%_20.82%]">
        <img alt="" className="absolute block inset-0 max-w-none w-full h-full" src="/assets/logo-fill1.svg" />
      </div>
      <div className="absolute inset-[1.45%_76.12%_3.42%_8.14%]">
        <img alt="" className="absolute block inset-0 max-w-none w-full h-full" src="/assets/logo-fill3.svg" />
      </div>
      <div className="absolute inset-[1.08%_88.58%_43.34%_0]">
        <img alt="" className="absolute block inset-0 max-w-none w-full h-full" src="/assets/logo-fill5.svg" />
      </div>
      <div className="absolute inset-[0.57%_0_1.4%_45.8%]">
        <img alt="" className="absolute block inset-0 max-w-none w-full h-full" src="/assets/logo-fill7.svg" />
      </div>
      <div className="absolute inset-[0.57%_34.71%_3.93%_32.35%]">
        <img alt="" className="absolute block inset-0 max-w-none w-full h-full" src="/assets/logo-fill10.svg" />
      </div>
    </div>
  );
}

function SessionRow({ session }: { session: Session }) {
  return (
    <Link href={`/session/${session.id}`}>
      <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
        {/* Main data */}
        <div className="flex flex-col gap-3 p-4">
          <p className="text-sm font-semibold text-[#0a0a0a] leading-none">{session.athlete}</p>
          <div className="flex items-center gap-2 pb-1">
            {/* Highest Jump */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <span className="text-sm text-[#171717]">Highest Jump</span>
              <div className="flex items-center gap-1">
                <div className="relative shrink-0 size-5 overflow-clip">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16.667px] left-[calc(50%+0.16px)] top-1/2 w-[10.324px]">
                    <img alt="" className="absolute block inset-0 max-w-none" src="/assets/icon-triangle.svg" />
                  </div>
                </div>
                <span className="text-base font-semibold text-[#0a0a0a]">{session.stats.maxHeight.toFixed(1)}m</span>
              </div>
            </div>
            {/* Max Airtime */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <span className="text-sm text-[#171717]">Max Airtime</span>
              <div className="flex items-center gap-1">
                <div className="relative shrink-0 size-5 overflow-clip">
                  <div className="absolute inset-[8.33%_13.54%_8.33%_16.67%]">
                    <img alt="" className="absolute block inset-0 max-w-none" src="/assets/icon-airtime.svg" />
                  </div>
                </div>
                <span className="text-base font-semibold text-[#0a0a0a]">{session.stats.maxAirtime.toFixed(1)}s</span>
              </div>
            </div>
            {/* Duration */}
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <span className="text-sm text-[#171717]">Duration</span>
              <div className="flex items-center gap-1">
                <div className="relative shrink-0 size-5 overflow-clip">
                  <div className="absolute inset-[21%_9.35%_23.68%_8.33%]">
                    <img alt="" className="absolute block inset-0 max-w-none" src="/assets/icon-duration.svg" />
                  </div>
                </div>
                <span className="text-base font-semibold text-[#0a0a0a]">{formatDuration(session.duration)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="bg-[#fafafa] flex items-center gap-1.5 px-4 py-3">
          <div className="relative shrink-0 size-5">
            <img alt="" className="absolute inset-0 w-full h-full" src="/assets/icon-sensor.svg" />
          </div>
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
        <div style={{ maxWidth: 826, margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
          <WooLogo />
          <div className="relative shrink-0 size-6 rounded-full overflow-hidden">
            <Image alt="avatar" src="/assets/avatar.png" fill className="object-cover" />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 826, margin: '0 auto', padding: '24px 0' }}>
        <div className="bg-white border border-[#e5e5e5] rounded-lg p-8 flex flex-col gap-6">
          <p className="text-xl font-semibold text-[#0a0a0a] leading-7">Your latest sessions</p>

          {sessions.map((session) => (
            <SessionRow key={session.id} session={session} />
          ))}

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
