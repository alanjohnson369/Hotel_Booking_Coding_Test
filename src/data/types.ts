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
