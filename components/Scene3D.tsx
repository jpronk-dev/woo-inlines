"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { Trick } from "@/lib/mockData";

// Perspective grid floor
function Grid() {
  return (
    <gridHelper
      args={[80, 20, "#D0D0D0", "#E0E0E0"]}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Session path line
function SessionPath({ points }: { points: Array<[number, number, number]> }) {
  const linePoints = useMemo(
    () => points.map((p) => new THREE.Vector3(p[0], 0.05, p[1])),
    [points]
  );

  return (
    <Line
      points={linePoints}
      color="#00AEEF"
      lineWidth={2}
      opacity={0.7}
      transparent
    />
  );
}

// Trick marker
function TrickMarker({
  trick,
  isActive,
  currentTime,
}: {
  trick: Trick;
  isActive: boolean;
  currentTime: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isPast = currentTime >= trick.timestamp;

  useFrame((_, delta) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += delta * 2;
    }
  });

  if (!isPast) return null;

  return (
    <group position={[trick.position[0], 0, trick.position[1]]}>
      {/* Vertical line up */}
      <mesh position={[0, trick.height * 0.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, trick.height * 0.3, 8]} />
        <meshStandardMaterial
          color={isActive ? "#00AEEF" : "#888888"}
          opacity={0.6}
          transparent
        />
      </mesh>
      {/* Sphere at top */}
      <mesh ref={meshRef} position={[0, trick.height * 0.3 + 0.3, 0]}>
        <sphereGeometry args={[isActive ? 0.5 : 0.3, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#00AEEF" : "#AAAAAA"}
          emissive={isActive ? "#0088BB" : "#333333"}
          emissiveIntensity={isActive ? 0.5 : 0.1}
        />
      </mesh>
      {/* Base dot */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 16]} />
        <meshStandardMaterial color={isActive ? "#00AEEF" : "#BBBBBB"} />
      </mesh>
    </group>
  );
}

interface Scene3DProps {
  path: Array<[number, number, number]>;
  tricks: Trick[];
  currentTime: number;
  activeTrickId: string | null;
}

export default function Scene3D({
  path,
  tricks,
  currentTime,
  activeTrickId,
}: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 28, 32], fov: 55, near: 0.1, far: 500 }}
      style={{ background: "#F0F0F0" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[20, 30, 20]} intensity={0.6} castShadow />
      <directionalLight position={[-20, 10, -10]} intensity={0.3} />

      <Grid />
      <SessionPath points={path} />

      {tricks.map((trick) => (
        <TrickMarker
          key={trick.id}
          trick={trick}
          isActive={trick.id === activeTrickId}
          currentTime={currentTime}
        />
      ))}

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={10}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
