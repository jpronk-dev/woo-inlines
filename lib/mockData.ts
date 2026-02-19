export interface Trick {
  id: string;
  name: string;
  timestamp: number; // seconds into session
  score: number;
  height: number; // meters
  rotation: number; // degrees
  position: [number, number]; // x, y on grid
}

export interface Session {
  id: string;
  athlete: string;
  avatarUrl: string;
  date: string;
  recordedAt: string; // e.g. "August 26, 2025 – 11:00"
  location: string;
  duration: number; // seconds
  tricks: Trick[];
  stats: {
    totalTricks: number;
    bestTrick: string;
    maxHeight: number;
    avgHeight: number;
    maxSpeed: number;
    distance: number;
    maxAirtime: number; // seconds
  };
  path: Array<[number, number, number]>; // x, y, z points
}

function generatePath(): Array<[number, number, number]> {
  const points: Array<[number, number, number]> = [];
  const numPoints = 200;
  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 4;
    const x = Math.sin(t) * 12 + Math.cos(t * 0.5) * 5;
    const y = Math.cos(t) * 8 + Math.sin(t * 0.3) * 4;
    const z = 0;
    points.push([x, y, z]);
  }
  return points;
}

const sharedPath = generatePath();

export const mockSession: Session = {
  id: "session-1",
  athlete: "Leo Koenig",
  avatarUrl: "",
  date: "16 May, 2:34 PM",
  recordedAt: "May 16, 2025 – 14:34",
  location: "Tarifa, Spain",
  duration: 1770, // 29:30
  tricks: [
    { id: "t1", name: "Backroll", timestamp: 120, score: 7.8, height: 4.2, rotation: 360, position: [-8, 5] },
    { id: "t2", name: "Frontroll", timestamp: 310, score: 8.1, height: 5.1, rotation: 360, position: [3, -2] },
    { id: "t3", name: "Raley", timestamp: 520, score: 9.2, height: 6.8, rotation: 0, position: [10, 8] },
    { id: "t4", name: "Handle Pass", timestamp: 750, score: 8.7, height: 5.5, rotation: 360, position: [-5, -8] },
    { id: "t5", name: "S-Bend", timestamp: 980, score: 9.5, height: 7.2, rotation: 360, position: [14, 2] },
    { id: "t6", name: "Kite Loop", timestamp: 1200, score: 8.9, height: 4.8, rotation: 720, position: [-12, 3] },
    { id: "t7", name: "Backroll", timestamp: 1400, score: 8.3, height: 4.9, rotation: 360, position: [6, -10] },
    { id: "t8", name: "Megaloop", timestamp: 1600, score: 9.8, height: 8.1, rotation: 360, position: [-3, 10] },
  ],
  stats: {
    totalTricks: 8,
    bestTrick: "Megaloop",
    maxHeight: 8.1,
    avgHeight: 5.8,
    maxSpeed: 47,
    distance: 18.4,
    maxAirtime: 4.9,
  },
  path: sharedPath,
};

export const mockSessions: Session[] = [
  mockSession,
  {
    id: "session-2",
    athlete: "Leo Koenig",
    avatarUrl: "",
    date: "14 May, 10:15 AM",
    recordedAt: "May 14, 2025 – 10:15",
    location: "Tarifa, Spain",
    duration: 5880,
    tricks: [],
    stats: { totalTricks: 6, bestTrick: "S-Bend", maxHeight: 7.5, avgHeight: 5.2, maxSpeed: 43, distance: 15.1, maxAirtime: 4.2 },
    path: sharedPath,
  },
  {
    id: "session-3",
    athlete: "Leo Koenig",
    avatarUrl: "",
    date: "10 May, 3:00 PM",
    recordedAt: "May 10, 2025 – 15:00",
    location: "Tarifa, Spain",
    duration: 4200,
    tricks: [],
    stats: { totalTricks: 5, bestTrick: "Raley", maxHeight: 6.3, avgHeight: 4.8, maxSpeed: 39, distance: 12.7, maxAirtime: 3.8 },
    path: sharedPath,
  },
  {
    id: "session-4",
    athlete: "Leo Koenig",
    avatarUrl: "",
    date: "7 May, 9:30 AM",
    recordedAt: "May 7, 2025 – 09:30",
    location: "Tarifa, Spain",
    duration: 6300,
    tricks: [],
    stats: { totalTricks: 9, bestTrick: "Kite Loop", maxHeight: 9.0, avgHeight: 6.1, maxSpeed: 51, distance: 21.3, maxAirtime: 5.3 },
    path: sharedPath,
  },
  {
    id: "session-5",
    athlete: "Leo Koenig",
    avatarUrl: "",
    date: "3 May, 1:45 PM",
    recordedAt: "May 3, 2025 – 13:45",
    location: "Dakhla, Morocco",
    duration: 3600,
    tricks: [],
    stats: { totalTricks: 4, bestTrick: "Frontroll", maxHeight: 5.5, avgHeight: 4.1, maxSpeed: 36, distance: 10.2, maxAirtime: 3.1 },
    path: sharedPath,
  },
];
