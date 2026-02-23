"use client";

interface KiteRadarProps {
  kiteX: number; // -1 to 1 (links/rechts)
  kiteY: number; // -1 to 1 (voor/achter)
}

export default function KiteRadar({ kiteX, kiteY }: KiteRadarProps) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 72;

  // Clamp kite binnen de cirkel
  const dist = Math.sqrt(kiteX * kiteX + kiteY * kiteY);
  const scale = dist > 1 ? 1 / dist : 1;
  const kx = cx + kiteX * scale * r * 0.85;
  const ky = cy - kiteY * scale * r * 0.85; // SVG y is omgekeerd

  return (
    <div style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Achtergrond cirkel */}
        <circle cx={cx} cy={cy} r={r} fill="#DCDCDC" stroke="black" strokeWidth={3} />

        {/* Concentrische cirkels */}
        <circle cx={cx} cy={cy} r={r * 0.66} fill="none" stroke="white" strokeWidth={1} strokeOpacity={0.55} />
        <circle cx={cx} cy={cy} r={r * 0.33} fill="none" stroke="white" strokeWidth={1} strokeOpacity={0.55} />

        {/* Kruis */}
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="white" strokeWidth={1} strokeOpacity={0.55} />
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="white" strokeWidth={1} strokeOpacity={0.55} />

        {/* Diagonalen */}
        <line x1={cx - r * 0.71} y1={cy - r * 0.71} x2={cx + r * 0.71} y2={cy + r * 0.71} stroke="white" strokeWidth={0.75} strokeOpacity={0.35} />
        <line x1={cx + r * 0.71} y1={cy - r * 0.71} x2={cx - r * 0.71} y2={cy + r * 0.71} stroke="white" strokeWidth={0.75} strokeOpacity={0.35} />

        {/* Kiter (altijd gecentreerd) */}
        <circle cx={cx} cy={cy} r={5} fill="white" stroke="#999" strokeWidth={1} />

        {/* Kite glow */}
        <circle cx={kx} cy={ky} r={13} fill="#8B5CF6" fillOpacity={0.25} />
        {/* Kite dot */}
        <circle cx={kx} cy={ky} r={7} fill="#7B22FA" />
      </svg>
    </div>
  );
}
