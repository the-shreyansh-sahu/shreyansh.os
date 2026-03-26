import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
    theme: 'dark' | 'light'
    toggleTheme: () => void
    setTheme: (t: 'dark' | 'light') => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            theme: 'dark',
            toggleTheme: () => {
                const currentTheme = get().theme
                set({ theme: currentTheme === 'dark' ? 'light' : 'dark' })
            },
            setTheme: (t) => set({ theme: t }),
        }),
        {
            name: 'shreyansh_os_theme',
            // skip hydration issues by handling apply in a hook
        }
    )
)
