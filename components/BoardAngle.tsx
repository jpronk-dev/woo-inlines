"use client";

import { useMemo } from "react";

interface BoardAngleProps {
  angle: number; // drift angle in degrees
}

const toRad = (d: number) => (d * Math.PI) / 180;

type P3 = [number, number, number];
type P2 = [number, number];

// Rotate around X axis
const applyRotX = (a: number, [x, y, z]: P3): P3 => [
  x,
  y * Math.cos(a) - z * Math.sin(a),
  y * Math.sin(a) + z * Math.cos(a),
];

// Rotate around Y axis
const applyRotY = (a: number, [x, y, z]: P3): P3 => [
  x * Math.cos(a) + z * Math.sin(a),
  y,
  -x * Math.sin(a) + z * Math.cos(a),
];

// Perspective project (camera along -Z at fov distance)
const project = (fov: number, [x, y, z]: P3): P2 => {
  const scale = fov / (fov - z);
  return [x * scale, y * scale];
};

export default function BoardAngle({ angle }: BoardAngleProps) {
  const { topPath, bottomEdgePath } = useMemo(() => {
    const driftRad = toRad(angle);
    const camPitch = toRad(-52); // camera tilt (look down at board)
    const camYaw = toRad(-12);   // slight side angle
    const fov = 500;

    // Board shape in local space: long axis = X, width = Z, up = Y
    const L = 82, W = 18, T = 7;

    const topVerts: P3[] = [
      [-L,      0, -W * 0.6],
      [-L * 0.6, 0, -W],
      [ L * 0.6, 0, -W],
      [ L,      0, -W * 0.6],
      [ L,      0,  W * 0.6],
      [ L * 0.6, 0,  W],
      [-L * 0.6, 0,  W],
      [-L,      0,  W * 0.6],
    ];

    // Bottom face (same shape, shifted down by thickness)
    const bottomVerts: P3[] = topVerts.map(([x, , z]) => [x, -T, z]);

    const xform = (p: P3): P2 => {
      // 1. Roll board by drift angle (around X axis)
      const p1 = applyRotX(driftRad, p);
      // 2. Camera yaw (slight side view)
      const p2 = applyRotY(camYaw, p1);
      // 3. Camera pitch (look down)
      const p3 = applyRotX(camPitch, p2);
      // 4. Perspective
      return project(fov, p3);
    };

    const svgCx = 140, svgCy = 90;
    const toSvg = ([x, y]: P2) => `${(svgCx + x).toFixed(1)},${(svgCy - y).toFixed(1)}`;

    const projTop = topVerts.map(xform);
    const projBottom = bottomVerts.map(xform);

    const topPath = projTop.map(toSvg).join(" ");

    // Bottom edge: far side (indices 4-7) connecting top to bottom
    const edgePts = [
      projTop[4], projTop[5], projTop[6], projTop[7],
      projBottom[7], projBottom[6], projBottom[5], projBottom[4],
    ];
    const bottomEdgePath = edgePts.map(toSvg).join(" ");

    return { topPath, bottomEdgePath };
  }, [angle]);

  return (
    <div style={{ width: 280, fontFamily: "Henus, sans-serif" }}>
      {/* Text */}
      <div style={{ textAlign: "center" }}>
        <span style={{
          fontSize: 13,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: "black",
        }}>
          BOARD DRIFT
        </span>
        <div style={{ fontSize: 52, lineHeight: 1.1, color: "black" }}>
          {Math.abs(Math.round(angle))}
          <span style={{ fontSize: 28 }}>°</span>
        </div>
      </div>

      {/* 3D board scene */}
      <div style={{ position: "relative", height: 160, marginTop: 4 }}>
        {/* Dashed horizon line */}
        <div style={{
          position: "absolute",
          left: 20, right: 20,
          top: "62%",
          borderTop: "2px dashed #B0B0B0",
        }} />

        <svg width={280} height={160} style={{ position: "absolute", left: 0, top: 0 }}>
          {/* Bottom edge / thickness */}
          <polygon points={bottomEdgePath} fill="#1B82C5" />
          {/* Top face */}
          <polygon points={topPath} fill="#4BB8F5" />
        </svg>
      </div>
    </div>
  );
}
