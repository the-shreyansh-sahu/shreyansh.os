import { create } from 'zustand'
import { WindowInstance, AppType } from '../types/window'

interface WindowStore {
    windows: WindowInstance[]
    maxZIndex: number
    openWindow: (app: AppType, props?: Record<string, unknown>) => void
    closeWindow: (id: string) => void
    minimizeWindow: (id: string) => void
    restoreWindow: (id: string) => void
    maximizeWindow: (id: string) => void
    focusWindow: (id: string) => void
    updatePosition: (id: string, x: number, y: number) => void
    updateSize: (id: string, w: number, h: number) => void
}

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600
const TASKBAR_RESERVED_HEIGHT = 56
const VISUAL_CENTER_Y_OFFSET = 48
const APP_DEFAULT_SIZES: Partial<Record<AppType, { width: number; height: number }>> = {
    projects: { width: 1220, height: 760 },
    skills: { width: 1100, height: 700 },
    terminal: { width: 1120, height: 620 },
}

export const useWindowStore = create<WindowStore>((set, get) => ({
    windows: [],
    maxZIndex: 100,

    openWindow: (app, props) => {
        const { windows, maxZIndex } = get()
        const id = crypto.randomUUID()
        const newZIndex = maxZIndex + 1
        const defaultSize = APP_DEFAULT_SIZES[app] ?? { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }

        // Determine initial position (cascading if multiple windows)
        const offset = (windows.length % 10) * 30
        const viewportWidth = typeof window !== 'undefined' ? (window.visualViewport?.width ?? window.innerWidth) : 1200
        const viewportHeight = typeof window !== 'undefined' ? (window.visualViewport?.height ?? window.innerHeight) : 900
        const centeredX = (viewportWidth - defaultSize.width) / 2
        const centeredY = (viewportHeight - defaultSize.height - TASKBAR_RESERVED_HEIGHT) / 2 - VISUAL_CENTER_Y_OFFSET
        const x = Math.max(16, centeredX + offset)
        const y = Math.max(16, centeredY + Math.min(offset, 48))

        const newWindow: WindowInstance = {
            id,
            app,
            title: typeof props?.title === 'string' ? props.title : app.charAt(0).toUpperCase() + app.slice(1),
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            isFocused: true,
            x,
            y,
            width: defaultSize.width,
            height: defaultSize.height,
            zIndex: newZIndex,
            props,
        }

        set({
            windows: windows.map(w => ({ ...w, isFocused: false })).concat(newWindow),
            maxZIndex: newZIndex
        })
    },

    closeWindow: (id) => {
        set((state) => ({
            windows: state.windows.filter((w) => w.id !== id),
        }))
    },

    minimizeWindow: (id) => {
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
            ),
        }))
    },

    restoreWindow: (id) => {
        const { maxZIndex } = get()
        const newZIndex = maxZIndex + 1

        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id
                    ? { ...w, isMinimized: false, isMaximized: false, isFocused: true, zIndex: newZIndex }
                    : { ...w, isFocused: false }
            ),
            maxZIndex: newZIndex
        }))
    },

    maximizeWindow: (id) => {
        const { maxZIndex } = get()
        const newZIndex = maxZIndex + 1

        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id
                    ? { ...w, isMaximized: true, isMinimized: false, isFocused: true, zIndex: newZIndex }
                    : { ...w, isFocused: false }
            ),
            maxZIndex: newZIndex
        }))
    },

    focusWindow: (id) => {
        const { windows, maxZIndex } = get()
        const target = windows.find(w => w.id === id)
        if (!target || target.isFocused) return

        const newZIndex = maxZIndex + 1

        set({
            windows: windows.map((w) =>
                w.id === id
                    ? { ...w, isFocused: true, zIndex: newZIndex }
                    : { ...w, isFocused: false }
            ),
            maxZIndex: newZIndex
        })
    },

    updatePosition: (id, x, y) => {
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, x, y } : w
            ),
        }))
    },

    updateSize: (id, w, h) => {
        set((state) => ({
            windows: state.windows.map((win) =>
                win.id === id ? { ...win, width: w, height: h } : win
            ),
        }))
    },
}))
