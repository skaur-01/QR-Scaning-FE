'use client';

import { InferType } from 'yup';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { schema } from '../components/Crusher-form/CrusherWeightmentForm';

export type QRData = InferType<typeof schema>;


type QRState = {
  data: QRData | null;
  setData: (d: QRData | null) => void;
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
