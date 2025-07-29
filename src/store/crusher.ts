'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CrusherData = {
  user_email?: string;
  slip_id?: string;
  order_date?: string;
  material?: string;
  crusher_name?: string;
  crusher_address?: string;
  crusher_gst?: string;
  consignee_name?: string;
  consignee_category?: string;
  consignee_mobile?: string;
  consignee_gst?: string;
  destination?: string;
  vehicle_number?: string;
  vehicle_owner?: string;
  driver_name?: string;
  driver_mobile?: string;
  veh_capacity?: string;
  veh_unladen?: string;
  truck_weight?: string;
  mat_weight?: string;
  mat_amount?: string;
  slip_validity?: string;
  veh_break_time?: string;
};

type QRState = {
  data: CrusherData | null;
  setData: (d: CrusherData | null) => void;
  clear: () => void;
};

export const useQRStore = create<QRState>()(
  persist(
    (set) => ({
      data: null,
      setData: (d) => set({ data: d }),
      clear: () => set({ data: null }),
    }),
    { name: 'qr-data' }
  )
);
