'use client'

import { useEffect, useState } from 'react'
import { useThemeStore } from '../store/themeStore'
import { gsap } from 'gsap'

export function useTheme() {
    const theme = useThemeStore(s => s.theme)
    const [mounted, setMounted] = useState(false)

    // Initial mount apply (in case Zustand persist hydrated faster or slower)
    useEffect(() => {
        setMounted(true)
        document.documentElement.dataset.theme = theme
    }, [theme])

    // This function is meant to be called from the UI toggles.
    const toggleThemeWithAnimation = async () => {
        const currentTheme = useThemeStore.getState().theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

        // The overarching transition overlay
        const overlay = document.createElement('div')
        overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 999998;
      background: var(--surface-base); pointer-events: none;
    `
        document.body.appendChild(overlay)

        gsap.fromTo(overlay,
            { opacity: 1 },
            {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.inOut',
                onStart: () => {
                    document.documentElement.dataset.theme = newTheme
                    useThemeStore.getState().setTheme(newTheme)
                },
                onComplete: () => overlay.remove(),
            }
        )
    }

    return { theme, mounted, toggleThemeWithAnimation }
}
