"use client";

import { useEffect, useRef, useState } from "react";

interface AirspeedKiteProps {
  speed?: number; // KPH
}

const MAX_AIRSPEED = 40;

export default function AirspeedKite({ speed = 0 }: AirspeedKiteProps) {
  const kt = (speed * 0.539957).toFixed(2);
  const targetProgress = Math.min(1, Math.max(0, speed / MAX_AIRSPEED));

  const [progress, setProgress] = useState(targetProgress);
  const animRef = useRef<number>(undefined);
  const targetRef = useRef(targetProgress);

  useEffect(() => {
    targetRef.current = targetProgress;
    const animate = () => {
      setProgress(prev => {
        const diff = targetRef.current - prev;
        if (Math.abs(diff) < 0.001) return targetRef.current;
        return prev + diff * 0.18;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [targetProgress]);

  // Right-side dial: center at x=171 (260-89), y=89
  const cx = 171, cy = 89;
  const outerR = 87;
  const innerR = 76;
  // Mirror of startAngle=120° → 60°, sweeps CCW
  const startAngle = 60;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const makeRingPath = (p: number): string => {
    if (p < 0.01) return "";
    const end = startAngle - p * 180; // CCW sweep (decreasing angle)
    const large = p * 180 > 180 ? 1 : 0;

    const ox1 = cx + outerR * Math.cos(toRad(startAngle));
    const oy1 = cy + outerR * Math.sin(toRad(startAngle));
    const ox2 = cx + outerR * Math.cos(toRad(end));
    const oy2 = cy + outerR * Math.sin(toRad(end));
    const ix2 = cx + innerR * Math.cos(toRad(end));
    const iy2 = cy + innerR * Math.sin(toRad(end));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));

    return [
      `M ${ox1.toFixed(3)} ${oy1.toFixed(3)}`,
      `A ${outerR} ${outerR} 0 ${large} 0 ${ox2.toFixed(3)} ${oy2.toFixed(3)}`, // CCW
      `L ${ix2.toFixed(3)} ${iy2.toFixed(3)}`,
      `A ${innerR} ${innerR} 0 ${large} 1 ${ix1.toFixed(3)} ${iy1.toFixed(3)}`, // CW back
      `Z`,
    ].join(" ");
  };

  const ringPath = makeRingPath(progress);

  return (
    <div style={{ position: "relative", width: 260, height: 180 }}>
      {/* Purple ring — right side */}
      <svg width={260} height={180} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {progress > 0.01 && (
          <path d={ringPath} fill="#8B5CF6" fillOpacity={1} />
        )}
      </svg>

      {/* Dial ring on the right, mirrored + rotated */}
      <img
        alt=""
        src="/assets/schaal.svg"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 179,
          height: 179,
          transform: "rotate(-30deg) scaleX(-1)",
          transformOrigin: "89px 89px",
        }}
      />

      {/* Text on the left side */}
      <div
        style={{
          position: "absolute",
          left: -40,
          right: 80,
          top: 55,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          fontFamily: "Henus, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 16,
            letterSpacing: -0.064,
            lineHeight: "15.689px",
            textTransform: "uppercase",
            color: "black",
          }}
        >
          AIRSPEED KITE
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
            <span style={{ fontSize: 56, letterSpacing: -0.224, lineHeight: "normal", color: "black" }}>
              {speed.toFixed(1)}
            </span>
            <span style={{ fontSize: 18, letterSpacing: -0.072, lineHeight: "35.174px", color: "black" }}>
              KPH
            </span>
          </div>
          <span
            style={{
              fontSize: 18,
              letterSpacing: -0.072,
              lineHeight: "35.174px",
              opacity: 0.6,
              color: "black",
              width: 83,
              textAlign: "right",
            }}
          >
            {kt} KT
          </span>
        </div>
      </div>
    </div>
  );
}
