"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface SettingsPanelProps {
  onClose: () => void;
}

function SelectRow({
  label,
  options,
  defaultValue,
}: {
  label: string;
  options: string[];
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="bg-[#fafafa] border-b border-[#e5e5e5] flex items-center justify-between pl-4 pr-2 py-2">
      <span className="text-sm text-[#0a0a0a] truncate">{label}</span>
      <div className="relative shrink-0">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="appearance-none bg-white border border-[#e5e5e5] rounded-lg pl-3 pr-8 py-1.5 text-sm text-[#0a0a0a] w-[120px] cursor-pointer focus:outline-none h-9"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]"
        />
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  defaultOn = false,
}: {
  label: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="bg-[#fafafa] border-b border-[#e5e5e5] flex items-center gap-2 pl-4 pr-2 py-3.5">
      <span className="flex-1 text-sm text-[#0a0a0a] truncate">{label}</span>
      <button
        onClick={() => setOn(!on)}
        aria-checked={on}
        role="switch"
        className={`relative flex items-center w-9 h-5 rounded-full border-2 border-transparent transition-colors shrink-0 ${
          on ? "bg-[#00aeff]" : "bg-[#e5e5e5]"
        }`}
      >
        <span
          className={`block w-4 h-4 bg-white rounded-full shadow-lg transition-transform ${
            on ? "translate-x-[18px]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-white border-b border-[#e5e5e5] flex items-center pl-4 pr-2 h-12">
      <span className="text-sm font-semibold text-[#0a0a0a]">{title}</span>
    </div>
  );
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden w-64 flex flex-col shadow-sm">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e5e5] flex items-center gap-2 pl-4 pr-2 h-12">
        <span className="flex-1 text-sm font-semibold text-[#0a0a0a]">View</span>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Close settings"
        >
          <X size={16} />
        </button>
      </div>

      {/* View */}
      <SelectRow
        label="View"
        options={["Down wind", "Cross wind", "Up wind", "Top down"]}
        defaultValue="Down wind"
      />

      {/* Zoom */}
      <SelectRow
        label="Zoom"
        options={["50%", "75%", "100%", "125%", "150%"]}
        defaultValue="100%"
      />

      {/* Overlays */}
      <SectionHeader title="Overlays" />
      <ToggleRow label="Metrics" defaultOn={true} />
      <ToggleRow label="Wind Window" defaultOn={false} />

      {/* Quiver */}
      <SectionHeader title="Quiver" />
      <SelectRow
        label="Kite"
        options={["Duotone Evo", "Cabrinha Drifter", "Core XR", "Naish Pivot"]}
        defaultValue="Duotone Evo"
      />
      <SelectRow
        label="Board"
        options={["Twintip", "Surfboard", "Foilboard"]}
        defaultValue="Twintip"
      />
    </div>
  );
}
