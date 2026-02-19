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
  };
  path: Array<[number, number, number]>; // x, y, z points
}

export const mockSession: Session = {
  id: "session-1",
  athlete: "Maarten Haeger",
  avatarUrl: "",
  date: "16 May, 2:34 PM",
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
  },
  path: generatePath(),
};

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

export const mockSessions: Session[] = [mockSession];
