import { create } from 'zustand'
import { AppType } from '../types/window'

export type OneUiNavMode = 'gesture' | 'three-button'

export interface OneUiRoute {
    app: AppType
    title?: string
    props?: Record<string, unknown>
}

interface OneUiStore {
    routeStack: OneUiRoute[]
    recents: OneUiRoute[]
    navMode: OneUiNavMode
    isJiggling: boolean
    homePage: number
    quickPanelOpen: boolean
    recentsOpen: boolean
    appDrawerOpen: boolean
    openApp: (app: AppType, options?: Omit<OneUiRoute, 'app'>) => void
    setRouteStack: (routes: OneUiRoute[]) => void
    closeApp: () => void
    goBack: () => void
    goHome: () => void
    openRecents: () => void
    closeRecents: () => void
    toggleQuickPanel: () => void
    setQuickPanelOpen: (value: boolean) => void
    setAppDrawerOpen: (value: boolean) => void
    setHomePage: (value: number) => void
    setNavMode: (mode: OneUiNavMode) => void
    setJiggling: (value: boolean) => void
}

function dedupeRoutes(routes: OneUiRoute[]) {
    const seen = new Set<string>()

    return [...routes].reverse().filter((route) => {
        const key = `${route.app}:${route.title ?? ''}`
        if (seen.has(key)) {
            return false
        }

        seen.add(key)
        return true
    }).reverse()
}

export const useOneUiStore = create<OneUiStore>((set, get) => ({
    routeStack: [],
    recents: [],
    navMode: 'gesture',
    isJiggling: false,
    homePage: 0,
    quickPanelOpen: false,
    recentsOpen: false,
    appDrawerOpen: false,

    openApp: (app, options) => {
        const route: OneUiRoute = {
            app,
            title: options?.title,
            props: options?.props,
        }
        const { routeStack, recents } = get()
        const nextStack = [...routeStack, route]

        set({
            routeStack: nextStack,
            recents: dedupeRoutes([...recents, route]),
            recentsOpen: false,
            quickPanelOpen: false,
            appDrawerOpen: false,
            isJiggling: false,
        })
    },

    setRouteStack: (routes) => {
        set({ routeStack: routes })
    },

    closeApp: () => {
        const { routeStack } = get()
        if (routeStack.length === 0) {
            return
        }

        set({
            routeStack: routeStack.slice(0, -1),
        })
    },

    goBack: () => {
        const { quickPanelOpen, recentsOpen, appDrawerOpen } = get()

        if (quickPanelOpen) {
            set({ quickPanelOpen: false })
            return
        }

        if (recentsOpen) {
            set({ recentsOpen: false })
            return
        }

        if (appDrawerOpen) {
            set({ appDrawerOpen: false })
            return
        }

        get().closeApp()
    },

    goHome: () => {
        set({
            routeStack: [],
            quickPanelOpen: false,
            recentsOpen: false,
            appDrawerOpen: false,
            isJiggling: false,
        })
    },

    openRecents: () => {
        set({ recentsOpen: true, quickPanelOpen: false, appDrawerOpen: false })
    },

    closeRecents: () => {
        set({ recentsOpen: false })
    },

    toggleQuickPanel: () => {
        const { quickPanelOpen } = get()
        set({ quickPanelOpen: !quickPanelOpen, recentsOpen: false, appDrawerOpen: false })
    },

    setQuickPanelOpen: (value) => {
        set({ quickPanelOpen: value, recentsOpen: value ? false : get().recentsOpen })
    },

    setAppDrawerOpen: (value) => {
        set({ appDrawerOpen: value, quickPanelOpen: false, recentsOpen: false })
    },

    setHomePage: (value) => {
        set({ homePage: value })
    },

    setNavMode: (mode) => {
        set({ navMode: mode })
    },

    setJiggling: (value) => set({ isJiggling: value }),
}))
