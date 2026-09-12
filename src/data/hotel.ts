export type RoomStatus = 'available' | 'occupied' | 'dirty' | 'maintenance' | 'blocked';

export type Room = {
  number: string;
  floor: number;
  status: RoomStatus;
  type: string;
  rate: number;
};

export type Guest = {
  name: string;
  room: string;
  adults: number;
  kids: number;
  checkout: string;
  idProof: string;
  rate: number;
  gst: number;
};

export type Charge = {
  id: string;
  label: string;
  amount: number;
};

const statusCycle: RoomStatus[] = [
  'available', 'available', 'available', 'occupied', 'dirty',
  'available', 'maintenance', 'available', 'blocked', 'occupied',
];

const statusOverrides: Record<string, RoomStatus> = {
  '101': 'occupied', '102': 'available', '103': 'dirty', '104': 'occupied',
  '202': 'occupied', '203': 'maintenance', '302': 'occupied',
};

export const rooms: Room[] = Array.from({ length: 50 }, (_, index) => {
  const floor = Math.floor(index / 10) + 1;
  const roomOnFloor = (index % 10) + 1;
  const number = `${floor}${roomOnFloor.toString().padStart(2, '0')}`;
  return {
    number,
    floor,
    status: statusOverrides[number] ?? statusCycle[index % statusCycle.length],
    type: roomOnFloor % 4 === 0 ? 'Suite' : roomOnFloor % 2 === 0 ? 'Deluxe Twin' : 'Deluxe King',
    rate: 1200 + floor * 100 + roomOnFloor * 25,
  };
});

export const guests: Guest[] = [
  { name: 'Mathew Hyden', room: '101', adults: 2, kids: 0, checkout: '2026-04-04', idProof: 'mathewhyden.pdf', rate: 1200, gst: 112 },
  { name: 'Sarah Thompson', room: '104', adults: 2, kids: 1, checkout: '2026-04-05', idProof: 'sarahthompson.pdf', rate: 1400, gst: 126 },
  { name: 'James Smith', room: '202', adults: 1, kids: 0, checkout: '2026-04-04', idProof: 'jamessmith.pdf', rate: 1600, gst: 144 },
  { name: 'Emily Clark', room: '302', adults: 2, kids: 2, checkout: '2026-04-06', idProof: 'emilyclark.pdf', rate: 2400, gst: 216 },
];

export const starterCharges: Charge[] = [
  { id: 'minibar', label: 'Mini-bar', amount: 100 },
  { id: 'laundry', label: 'Laundry', amount: 250 },
];

export const statusLabels: Record<RoomStatus, string> = {
  available: 'Available',
  occupied: 'Occupied',
  dirty: 'Dirty',
  maintenance: 'Maintenance',
  blocked: 'Blocked',
};

export const money = (value: number) =>
  `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
