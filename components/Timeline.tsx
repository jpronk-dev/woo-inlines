"use client";

import { useCallback } from "react";
import { Pause, Play, Gauge, Maximize } from "lucide-react";

interface TimelineProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onReset: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Timeline({
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
}: TimelineProps) {
  const progress = (currentTime / duration) * 100;

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSeek(parseFloat(e.target.value));
    },
    [onSeek]
  );

  return (
    <div className="absolute bottom-4 left-4 right-4 z-10">
      <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-4 px-2 py-2 shadow-sm">
        {/* Play/Pause */}
        <button
          onClick={onTogglePlay}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Current time */}
        <span className="text-sm text-[#0a0a0a] tabular-nums flex-shrink-0 w-10">
          {formatTime(currentTime)}
        </span>

        {/* Scrubber */}
        <div className="flex-1 relative flex items-center">
          <div className="w-full h-[6px] rounded-full bg-gray-100 relative">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-[#00aeff]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            style={{ height: "24px", margin: "auto" }}
          />
          <div
            className="absolute w-4 h-4 rounded-full bg-[#00aeff] border border-gray-200 shadow-sm pointer-events-none"
            style={{ left: `calc(${progress}% - 8px)`, top: "50%", transform: "translateY(-50%)" }}
          />
        </div>

        {/* Total time */}
        <span className="text-sm text-[#0a0a0a] tabular-nums flex-shrink-0 w-10 text-right">
          {formatTime(duration)}
        </span>

        {/* CircleGauge (speed) */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Speed"
        >
          <Gauge size={16} />
        </button>

        {/* Fullscreen */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Fullscreen"
        >
          <Maximize size={16} />
        </button>
      </div>
    </div>
  );
}
