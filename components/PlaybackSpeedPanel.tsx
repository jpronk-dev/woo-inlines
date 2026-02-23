"use client";

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];

interface PlaybackSpeedPanelProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export default function PlaybackSpeedPanel({
  speed,
  onSpeedChange,
}: PlaybackSpeedPanelProps) {
  const index = SPEEDS.indexOf(speed) === -1 ? 3 : SPEEDS.indexOf(speed);

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-lg p-3 shadow-sm w-[280px]">
      <p className="text-sm text-[#0a0a0a] mb-4">Playback speed</p>

      <div className="flex flex-col gap-1">
        {/* Speed labels */}
        <div className="flex items-center">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`flex-1 text-center py-1.5 text-sm rounded-sm transition-colors ${
                speed === s
                  ? "text-[#0a0a0a] font-medium"
                  : "text-[#737373] hover:text-[#0a0a0a]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative pt-1 pb-2">
          <div className="w-full h-[6px] bg-[#f5f5f5] rounded-full relative">
            <div
              className="h-full bg-[#00aeff] rounded-full"
              style={{ width: `${(index / (SPEEDS.length - 1)) * 100}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={SPEEDS.length - 1}
            step={1}
            value={index}
            onChange={(e) => onSpeedChange(SPEEDS[parseInt(e.target.value)])}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-[6px] top-1"
          />
          {/* Thumb */}
          <div
            className="absolute top-1 w-[19px] h-[19px] bg-white border border-white rounded-full shadow-md -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ left: `${(index / (SPEEDS.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
