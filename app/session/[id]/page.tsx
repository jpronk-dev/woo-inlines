"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import SettingsPanel from "@/components/SettingsPanel";
import PlaybackSpeedPanel from "@/components/PlaybackSpeedPanel";
import Speedometer from "@/components/Speedometer";
import AirspeedKite from "@/components/AirspeedKite";
import KiteRadar from "@/components/KiteRadar";
import BoardAngle from "@/components/BoardAngle";
import { mockSession } from "@/lib/mockData";

// Dynamically import 3D scene (no SSR)
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function SessionPage() {
  const session = mockSession;
  const [currentTime, setCurrentTime] = useState(1442);
  const [isPlaying, setIsPlaying] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [speedPanelOpen, setSpeedPanelOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showAirspeed, setShowAirspeed] = useState(false);
  const [airspeedFading, setAirspeedFading] = useState(false);
  const airspeedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show during full trick window: aanloop (12s before) + sprong + afloop (25s after)
  const isAirborne = session.tricks.some(trick => {
    const dt = currentTime - trick.timestamp;
    return dt >= -12 && dt <= 25;
  });

  // Airspeed kite: opbouw in aanloop, piek tijdens sprong, afbouw na landing
  const airspeed = (() => {
    let s = 0;
    for (const trick of session.tricks) {
      const dt = currentTime - trick.timestamp;
      if (dt >= -12 && dt <= 25) {
        let v = 0;
        if (dt < 0) {
          // Aanloop: geleidelijk opbouwen
          const phase = (dt + 12) / 12;
          v = phase * 20;
        } else if (dt < 6) {
          // Sprong + lucht: piek
          v = 20 + 14 * Math.sin((dt / 6) * Math.PI);
        } else {
          // Afloop: rustig afnemen
          v = 20 * Math.exp(-(dt - 6) * 0.15);
        }
        s = Math.max(s, v);
      }
    }
    return s;
  })();

  // Board drift angle simulatie (graden, tijdens sprong)
  const boardDriftAngle = (() => {
    let a = 0;
    for (const trick of session.tricks) {
      const dt = currentTime - trick.timestamp;
      if (dt < -4 || dt > 10) continue;
      if (dt < 0) {
        // Aanloop: licht kantelen
        a += ((dt + 4) / 4) * 8;
      } else if (dt < 5) {
        // Lucht: board driftet maximaal
        a += 8 + Math.sin((dt / 5) * Math.PI) * 32;
      } else {
        // Landing: terugkeren naar 0
        a += (1 - (dt - 5) / 5) * 8;
      }
    }
    return Math.max(-45, Math.min(45, a));
  })();

  // Kite positie simulatie (top-view, relatief aan kiter)
  const kitePosition = (() => {
    const t = currentTime;

    // Basispositie: kite drijft langzaam zijwaarts mee (tack)
    let x = 0.35 * Math.sin(t * 0.04 + 0.5);
    let y = 0.25 + 0.1 * Math.sin(t * 0.07);

    for (const trick of session.tricks) {
      const dt = t - trick.timestamp;
      if (dt < -12 || dt > 25) continue;

      if (dt < 0) {
        // Aanloop: kite swingt naar boven (power opbouwen)
        const phase = (dt + 12) / 12; // 0→1
        x += (1 - phase) * 0.4;
        y += phase * 0.5;
      } else if (dt < 3) {
        // Launch: kite recht omhoog / overhead
        const phase = dt / 3;
        x *= (1 - phase * 0.8);
        y += (1 - phase) * 0.5 + phase * 0.7;
      } else if (dt < 8) {
        // Lucht: kite sweept door naar andere kant
        const phase = (dt - 3) / 5;
        x -= phase * 0.5;
        y += (1 - phase) * 0.5;
      } else {
        // Afloop: kite keert rustig terug
        const phase = Math.exp(-(dt - 8) * 0.18);
        y += phase * 0.3;
      }
    }

    return { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  })();

  // Realistic kitesurfer speed simulation based on actual trick timestamps
  const speed = (() => {
    const t = currentTime;

    // Base cruising speed with gentle chop variation
    const base = 30 + 4 * Math.sin(t * 0.06) + 2 * Math.sin(t * 0.17 + 1.1);

    let boost = 0;

    for (const trick of session.tricks) {
      const dt = t - trick.timestamp;

      if (dt < -18 || dt > 30) continue; // outside influence window

      if (dt >= -18 && dt < -8) {
        // Approach: rider builds edge, kite powers up — smooth acceleration
        const phase = (dt + 18) / 10;
        boost += phase * phase * 14;
      } else if (dt >= -8 && dt < 0) {
        // Hard approach: max kite power, speed peaks before takeoff
        const phase = (dt + 8) / 8;
        boost += 14 + phase * 18;
      } else if (dt >= 0 && dt < 2) {
        // Launch: brief speed spike as rider pops off the water
        boost += 32 - dt * 8;
      } else if (dt >= 2 && dt < 6) {
        // Airtime: forward speed drops (board leaves water)
        boost += 16 - (dt - 2) * 9;
      } else if (dt >= 6 && dt < 9) {
        // Landing impact: speed dips below base
        boost += -20 + (dt - 6) * 5;
      } else if (dt >= 9 && dt < 30) {
        // Recovery: gradual return to cruising
        boost += -5 * Math.exp(-(dt - 9) * 0.18);
      }
    }

    return Math.max(6, Math.min(68, base + boost));
  })();

  // Fade-in / fade-out voor AirspeedKite
  useEffect(() => {
    if (isAirborne) {
      if (airspeedTimerRef.current) clearTimeout(airspeedTimerRef.current);
      setShowAirspeed(true);
      setAirspeedFading(false);
    } else {
      setAirspeedFading(true);
      airspeedTimerRef.current = setTimeout(() => {
        setShowAirspeed(false);
        setAirspeedFading(false);
      }, 500);
    }
    return () => { if (airspeedTimerRef.current) clearTimeout(airspeedTimerRef.current); };
  }, [isAirborne]);

  // Keyboard scrubbing: arrow keys ±5s, shift+arrow ±30s, space = play/pause
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const step = e.shiftKey ? 30 : 5;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentTime((t) => Math.min(session.duration, t + step));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentTime((t) => Math.max(0, t - step));
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [session.duration]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= session.duration) {
            setIsPlaying(false);
            return session.duration;
          }
          return t + 0.1 * playbackSpeed;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, session.duration, playbackSpeed]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f5f5f5]">
      <Header
        session={session}
        settingsOpen={settingsOpen}
        onSettingsToggle={() => setSettingsOpen((o) => !o)}
      />

      {/* 3D viewport — full screen */}
      <div className="absolute inset-0">
        <Scene3D
          path={session.path}
          tricks={session.tricks}
          currentTime={currentTime}
          activeTrickId={null}
        />
      </div>

      {/* Settings panel — top right, below header */}
      {settingsOpen && (
        <div className="absolute top-[72px] right-4 z-20">
          <SettingsPanel onClose={() => setSettingsOpen(false)} />
        </div>
      )}

      {/* Playback speed panel — above timeline, right side */}
      {speedPanelOpen && (
        <div className="absolute bottom-20 right-4 z-20">
          <PlaybackSpeedPanel
            speed={playbackSpeed}
            onSpeedChange={setPlaybackSpeed}
          />
        </div>
      )}

      {/* Airspeed Kite gauge — bottom right, only during jumps */}
      {/* Board angle — center screen, alleen tijdens sprong */}
      {showAirspeed && (
        <div
          className="absolute z-10"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 100,
            animation: airspeedFading ? "fadeOut 0.5s ease forwards" : "fadeIn 0.5s ease",
          }}
        >
          <BoardAngle angle={boardDriftAngle} />
        </div>
      )}

      {showAirspeed && (
        <div
          className="absolute z-10"
          style={{
            right: 40,
            bottom: 160,
            animation: airspeedFading ? "fadeOut 0.5s ease forwards" : "fadeIn 0.5s ease",
          }}
        >
          <AirspeedKite speed={airspeed} />
        </div>
      )}

      {/* Kite radar — top center */}
      <div className="absolute z-10" style={{ left: "50%", transform: "translateX(-50%)", top: 90 }}>
        <KiteRadar kiteX={kitePosition.x} kiteY={kitePosition.y} />
      </div>

      {/* Speed Rider gauge — bottom left */}
      <div className="absolute z-10" style={{ left: 40, bottom: 160 }}>
        <Speedometer speed={speed} />
      </div>

      <Timeline
        currentTime={currentTime}
        duration={session.duration}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((p) => !p)}
        onSeek={setCurrentTime}
        onReset={() => { setCurrentTime(0); setIsPlaying(false); }}
        onSpeedClick={() => setSpeedPanelOpen((o) => !o)}
        tricks={session.tricks}
      />
    </div>
  );
}
