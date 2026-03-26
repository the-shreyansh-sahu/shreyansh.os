'use client'

import { useTheme } from '../../hooks/useTheme'
import { Moon, Sun, Wifi, Bluetooth } from 'lucide-react'
import { cn } from '../../lib/cn'

interface Win11NotifCenterProps {
    isOpen: boolean
}

export function Win11NotifCenter({ isOpen }: Win11NotifCenterProps) {
    const { theme, toggleThemeWithAnimation } = useTheme()

    if (!isOpen) return null

    return (
        <div className="absolute bottom-16 right-4 w-[360px] glass-surface rounded-xl shadow-2xl z-[99995] p-4 flex flex-col gap-4 font-sans pointer-events-auto">

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-2">
                {/* Theme Toggle Tile */}
                <button
                    onClick={toggleThemeWithAnimation}
                    className={cn(
                        "h-14 rounded-md flex px-3 items-center gap-3 transition-colors border border-[var(--surface-glass-border)]",
                        theme === 'dark' ? "bg-blue-600 text-white" : "bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--glass-hover)]"
                    )}
                >
                    {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-medium">Theme</span>
                        <span className="text-[10px] opacity-70">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                    </div>
                </button>

                {/* Dummy Tiles */}
                <button className="h-14 rounded-md bg-blue-600 text-white flex px-3 items-center gap-3 transition-colors border border-[var(--surface-glass-border)]">
                    <Wifi size={18} />
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-medium">Wi-Fi</span>
                        <span className="text-[10px] opacity-70">Shreyansh_5G</span>
                    </div>
                </button>

                <button className="h-14 rounded-md bg-[var(--surface-elevated)] text-[var(--text-primary)] flex px-3 items-center gap-3 transition-colors border border-[var(--surface-glass-border)] hover:bg-[var(--glass-hover)]">
                    <Bluetooth size={18} />
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-medium">Bluetooth</span>
                        <span className="text-[10px] opacity-70">Off</span>
                    </div>
                </button>
            </div>

            {/* Sliders (Dummy) */}
            <div className="flex flex-col gap-3 mt-2 px-2">
                <div className="flex items-center gap-4">
                    <Sun size={16} className="text-[var(--text-muted)]" />
                    <div className="h-1 flex-1 bg-[var(--surface-elevated)] rounded-full relative">
                        <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-blue-500 rounded-full" />
                        <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow border-2 border-white" />
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-[var(--surface-glass-border)] my-2" />

            {/* Notifications Placeholder */}
            <div className="flex-1 min-h-[200px] flex flex-col justify-center items-center text-[var(--text-muted)]">
                <span className="text-sm">No new notifications</span>
            </div>

        </div>
    )
}
