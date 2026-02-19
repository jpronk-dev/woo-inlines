"use client";

import { useCallback } from "react";

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
  onReset,
}: TimelineProps) {
  const progress = (currentTime / duration) * 100;

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSeek(parseFloat(e.target.value));
    },
    [onSeek]
  );

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-white/90 backdrop-blur-sm border-t border-gray-200 flex items-center px-5 gap-4">
      {/* Play/Pause */}
      <button
        onClick={onTogglePlay}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          // Pause icon
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="2" width="4" height="14" rx="1.5" fill="#1A1A1A" />
            <rect x="11" y="2" width="4" height="14" rx="1.5" fill="#1A1A1A" />
          </svg>
        ) : (
          // Play icon
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 2.5L15.5 9L4 15.5V2.5Z" fill="#1A1A1A" />
          </svg>
        )}
      </button>

      {/* Current time */}
      <span className="text-sm font-medium text-gray-700 tabular-nums w-10 flex-shrink-0">
        {formatTime(currentTime)}
      </span>

      {/* Scrubber */}
      <div className="flex-1 relative flex items-center">
        {/* Track background */}
        <div className="w-full h-[4px] rounded-full bg-gray-200 relative">
          {/* Progress fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[#00AEEF] transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Slider input */}
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-6"
          style={{ margin: "auto" }}
        />
        {/* Thumb */}
        <div
          className="absolute w-4 h-4 rounded-full bg-[#00AEEF] shadow-md border-2 border-white pointer-events-none"
          style={{ left: `calc(${progress}% - 8px)`, top: "50%", transform: "translateY(-50%)" }}
        />
      </div>

      {/* Total time */}
      <span className="text-sm font-medium text-gray-400 tabular-nums w-10 flex-shrink-0 text-right">
        {formatTime(duration)}
      </span>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
        aria-label="Reset"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 3C6.24 3 4 5.24 4 8s2.24 5 5 5 5-2.24 5-5H16c0 3.87-3.13 7-7 7S2 11.87 2 8s3.13-7 7-7v2z"
            fill="#888888"
          />
          <path d="M9 3l3 3H9V3z" fill="#888888" />
        </svg>
      </button>

      {/* Focus/target icon */}
      <button
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
        aria-label="Focus"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="#888888" strokeWidth="1.5" fill="none" />
          <circle cx="9" cy="9" r="2.5" fill="#888888" />
          <line x1="9" y1="1" x2="9" y2="4" stroke="#888888" strokeWidth="1.5" />
          <line x1="9" y1="14" x2="9" y2="17" stroke="#888888" strokeWidth="1.5" />
          <line x1="1" y1="9" x2="4" y2="9" stroke="#888888" strokeWidth="1.5" />
          <line x1="14" y1="9" x2="17" y2="9" stroke="#888888" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
