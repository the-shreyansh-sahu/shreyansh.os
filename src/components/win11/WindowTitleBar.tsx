'use client'

import { X, Minus, Square, Copy } from 'lucide-react'
import Image from 'next/image'
import { useWindowStore } from '../../store/windowStore'
import { cn } from '../../lib/cn'
import { AppType } from '../../types/window'
import { Win11FolderIcon } from '../apps/Win11FolderIcon'

interface WindowTitleBarProps {
    id: string
    app: AppType
    title: string
    isMaximized: boolean
    isFocused: boolean
    onPointerDown: (e: React.PointerEvent) => void
}

export function WindowTitleBar({ id, app, title, isMaximized, isFocused, onPointerDown }: WindowTitleBarProps) {
    const minimizeWindow = useWindowStore(s => s.minimizeWindow)
    const maximizeWindow = useWindowStore(s => s.maximizeWindow)
    const restoreWindow = useWindowStore(s => s.restoreWindow)
    const closeWindow = useWindowStore(s => s.closeWindow)

    const handleMaximizeClick = () => {
        if (isMaximized) restoreWindow(id)
        else maximizeWindow(id)
    }

    const AppIconMap: Partial<Record<AppType, string>> = {
        about: '/shreyansh-sahu.jpg',
        projects: '/projects.png',
        skills: '/skills.webp',
        experience: '/experience.png',
        terminal: '/terminal.png',
        contact: '/contact.png',
        resume: '/experience.png',
        'project-detail': '/projects.png'
    }

    const iconSrc = AppIconMap[app]
    const isPhotoIcon = iconSrc === '/shreyansh-sahu.jpg'
    const stopTitlebarDrag = (e: React.PointerEvent) => {
        e.stopPropagation()
    }

    return (
        <div
            className={cn(
                "flex items-center justify-between h-10 select-none",
                "rounded-t-xl transition-colors duration-200",
                isFocused ? "bg-[var(--surface-TitleBar-active)]" : "bg-[var(--surface-TitleBar-inactive)]"
            )}
        >
            {/* Icon and Title */}
            <div onPointerDown={onPointerDown} className="flex flex-1 items-center px-4 space-x-3 h-full min-w-0">
                {/* App Icon */}
                {app === 'projects' || app === 'project-detail' ? (
                    <Win11FolderIcon className="w-4 h-4" />
                ) : iconSrc ? (
                    <div className={cn("w-4 h-4", isPhotoIcon ? "overflow-hidden rounded-full" : "")}>
                        <Image src={iconSrc} alt="" width={16} height={16} className={cn("w-full h-full", isPhotoIcon ? "object-cover" : "object-contain")} />
                    </div>
                ) : (
                    <div className="w-4 h-4 rounded-sm bg-blue-500/50" />
                )}
                <span className={cn(
                    "text-xs font-sans truncate",
                    isFocused ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                )}>
                    {title}
                </span>
            </div>

            {/* Controls */}
            <div onPointerDown={stopTitlebarDrag} className="flex h-full shrink-0">
                <button
                    onClick={() => minimizeWindow(id)}
                    className="h-full w-12 flex items-center justify-center hover:bg-[var(--glass-hover)] transition-colors"
                    title="Minimize"
                >
                    <Minus size={14} className={isFocused ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"} />
                </button>
                <button
                    onClick={handleMaximizeClick}
                    className="h-full w-12 flex items-center justify-center hover:bg-[var(--glass-hover)] transition-colors"
                    title={isMaximized ? "Restore down" : "Maximize"}
                >
                    {isMaximized ? (
                        <Copy size={12} className={isFocused ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"} />
                    ) : (
                        <Square size={12} className={isFocused ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"} />
                    )}
                </button>
                <button
                    onClick={() => closeWindow(id)}
                    className="h-full w-12 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors rounded-tr-xl group"
                    title="Close"
                >
                    <X size={16} className={cn(isFocused ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]", "group-hover:text-white")} />
                </button>
            </div>
        </div>
    )
}
