'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { LayoutGrid, Moon, Sun, Wifi, Battery, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { useWindowStore } from '../../store/windowStore'
import { useThemeStore } from '../../store/themeStore'
import { AppType } from '../../types/window'
import { cn } from '../../lib/cn'

interface Win11TaskbarProps {
    onToggleStartMenu: () => void
    onToggleNotifCenter: () => void
    startMenuOpen: boolean
    notifCenterOpen: boolean
}

// In a real app, you'd have an icon mapping. For now we use the provided PNG assets.
const AppIconMap: Record<AppType, React.FC<{ className?: string }>> = {
    about: ({ className }) => (
        <div className={cn("w-7 h-7 overflow-hidden rounded-full", className)}>
            <Image src="/shreyansh-sahu.jpg" alt="About Me" width={28} height={28} className="w-full h-full object-cover" />
        </div>
    ),
    projects: ({ className }) => <Image src="/projects.png" alt="Projects" width={28} height={28} className={cn("object-contain", className)} />,
    skills: ({ className }) => <Image src="/skills.webp" alt="Skills" width={28} height={28} className={cn("object-contain", className)} />,
    experience: ({ className }) => <Image src="/experience.png" alt="Experience" width={28} height={28} className={cn("object-contain", className)} />,
    terminal: ({ className }) => <Image src="/terminal.png" alt="Terminal" width={28} height={28} className={cn("object-contain", className)} />,
    contact: ({ className }) => <Image src="/contact.png" alt="Contact" width={28} height={28} className={cn("object-contain", className)} />,
    resume: ({ className }) => <Image src="/experience.png" alt="Resume" width={28} height={28} className={cn("object-contain", className)} />,
    'project-detail': ({ className }) => <Image src="/projects.png" alt="Project" width={28} height={28} className={cn("object-contain", className)} />
}

export function Win11Taskbar({ onToggleStartMenu, onToggleNotifCenter, startMenuOpen, notifCenterOpen }: Win11TaskbarProps) {
    const theme = useThemeStore(s => s.theme)
    const windows = useWindowStore(s => s.windows)
    const restoreWindow = useWindowStore(s => s.restoreWindow)
    const minimizeWindow = useWindowStore(s => s.minimizeWindow)

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Unique apps open
    const openApps = Array.from(new Set(windows.map(w => w.app)))

    return (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-between h-12 px-2 rounded-xl glass-surface z-[99990] select-none transition-all duration-300 shadow-2xl pointer-events-auto" style={{ width: 'calc(100% - 16px)', maxWidth: '800px' }}>

            {/* Left side (empty or widgets) */}
            <div className="flex-1" />

            {/* Center - App Pins */}
            <div className="flex items-center space-x-1">
                {/* Start Button */}
                <button
                    title="Start"
                    onClick={onToggleStartMenu}
                    className={cn(
                        "w-10 h-10 rounded-md flex items-center justify-center transition-all duration-200",
                        startMenuOpen ? "bg-[var(--glass-active)]" : "hover:bg-[var(--glass-hover)]"
                    )}
                >
                    <LayoutGrid className="text-blue-500" size={22} fill="currentColor" />
                </button>

                {/* Open Apps */}
                {openApps.map(app => {
                    const Icon = AppIconMap[app]
                    const instances = windows.filter(w => w.app === app)
                    const isFocused = instances.some(w => w.isFocused && !w.isMinimized)

                    return (
                        <button
                            key={app}
                            title={app}
                            onClick={() => {
                                const target = instances[0] // Simplify: just grab first instance for now
                                if (target.isFocused) {
                                    minimizeWindow(target.id)
                                } else {
                                    restoreWindow(target.id)
                                }
                            }}
                            className={cn(
                                "relative w-10 h-10 rounded-md flex items-center justify-center transition-all duration-200",
                                isFocused ? "bg-[var(--glass-active)]" : "hover:bg-[var(--glass-hover)]"
                            )}
                        >
                            <Icon className="transition-transform group-hover:scale-110 active:scale-95" />
                            {/* Indicator dot */}
                            <div
                                className={cn(
                                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-200 bg-[var(--glass-dot)]",
                                    isFocused ? "w-3" : "w-1 opacity-50"
                                )}
                            />
                        </button>
                    )
                })}
            </div>

            <div className="flex-1 flex justify-end items-center space-x-2">
                <button className="w-8 h-8 rounded-md hover:bg-[var(--glass-hover)] flex items-center justify-center transition-colors">
                    <ChevronUp size={16} className="text-[var(--text-primary)]" />
                </button>

                {/* Quick Settings Group */}
                <button
                    onClick={onToggleNotifCenter}
                    className={cn(
                        "flex items-center space-x-2 px-3 h-10 rounded-md transition-colors",
                        notifCenterOpen ? "bg-[var(--glass-active)]" : "hover:bg-[var(--glass-hover)]"
                    )}
                >
                    <Wifi size={14} className="text-[var(--text-primary)]" />
                    <Battery size={14} className="text-[var(--text-primary)]" />
                    {theme === 'dark' ? <Moon size={14} className="text-[var(--text-primary)]" /> : <Sun size={14} className="text-[var(--text-primary)]" />}
                </button>

                <button
                    onClick={onToggleNotifCenter}
                    className="flex flex-col items-end justify-center px-3 h-10 rounded-md hover:bg-[var(--glass-hover)] transition-colors"
                >
                    <span className="text-[10px] font-sans text-[var(--text-primary)] leading-tight">
                        {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] font-sans text-[var(--text-primary)] leading-tight">
                        {time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </button>
            </div>
        </div>
    )
}
