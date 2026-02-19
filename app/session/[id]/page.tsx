"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import Speedometer from "@/components/Speedometer";
import { mockSession } from "@/lib/mockData";

// Dynamically import 3D scene (no SSR)
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function SessionPage() {
  const session = mockSession;
  const [currentTime, setCurrentTime] = useState(1442); // 24:02 as in design
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Find active trick (most recent trick at currentTime)
  const activeTrick = session.tricks
    .filter((t) => t.timestamp <= currentTime)
    .sort((a, b) => b.timestamp - a.timestamp)[0] ?? null;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= session.duration) {
            setIsPlaying(false);
            return session.duration;
          }
          return t + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, session.duration]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f5f5f5]">
      <Header session={session} />

      {/* 3D viewport — full screen */}
      <div className="absolute inset-0">
        <Scene3D
          path={session.path}
          tricks={session.tricks}
          currentTime={currentTime}
          activeTrickId={activeTrick?.id ?? null}
        />
      </div>


      {/* Speedometer — bottom left, above timeline */}
      <div className="absolute bottom-20 left-4 z-10">
        <Speedometer />
      </div>

      <Timeline
        currentTime={currentTime}
        duration={session.duration}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((p) => !p)}
        onSeek={setCurrentTime}
        onReset={() => { setCurrentTime(0); setIsPlaying(false); }}
      />
    </div>
  );
}
