import { create } from 'zustand'

export interface OSStore {
    platform: 'win11' | 'oneui' | null
    hasBooted: boolean
    isBooting: boolean
    bootProgress: number
    setPlatform: (p: 'win11' | 'oneui' | null) => void
    setBooting: (v: boolean) => void
    setBootProgress: (v: number) => void
    resetBoot: () => void
    completeBoot: () => void
}

export const useOSStore = create<OSStore>((set) => ({
    platform: null,
    hasBooted: false,
    isBooting: false,
    bootProgress: 0,
    setPlatform: (p) => set({ platform: p }),
    setBooting: (v) => set({ isBooting: v }),
    setBootProgress: (v) => set({ bootProgress: v }),
    resetBoot: () => set({ hasBooted: false, isBooting: false, bootProgress: 0 }),
    completeBoot: () => set({ hasBooted: true, isBooting: false, bootProgress: 100 }),
}))
