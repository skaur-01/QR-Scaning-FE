'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type QRState = {
    data: unknown | null | any;
    setData: (d: unknown | null) => void;
    clear: () => void;
};

export const useQRStore = create<QRState>()(
    persist(
        (set) => ({
            data: null,
            setData: (d) => set({ data: d }),
            clear: () => set({ data: null }),
        }),
        { name: 'qr-data' } // optional: keep last scanned data in localStorage
    )
);
