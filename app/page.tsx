import Link from "next/link";
import { mockSession } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Logo / title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">WOO</h1>
          <p className="text-sm text-gray-500 mt-1">Session Replay</p>
        </div>

        {/* Sessions */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Recent Sessions
          </h2>
          <Link href={`/session/${mockSession.id}`}>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {mockSession.athlete.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{mockSession.athlete}</p>
                    <p className="text-sm text-gray-400">
                      {mockSession.date} · {mockSession.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">
                    {mockSession.stats.totalTricks} tricks
                  </p>
                  <p className="text-xs text-[#00AEEF]">
                    ↑ {mockSession.stats.maxHeight}m best
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400">Max speed</p>
                  <p className="text-lg font-bold text-gray-900">
                    {mockSession.stats.maxSpeed}{" "}
                    <span className="text-xs font-normal text-gray-400">km/h</span>
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400">Distance</p>
                  <p className="text-lg font-bold text-gray-900">
                    {mockSession.stats.distance}{" "}
                    <span className="text-xs font-normal text-gray-400">km</span>
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400">Best trick</p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {mockSession.stats.bestTrick}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
