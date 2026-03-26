'use client'

import { useWindowStore } from '../../store/windowStore'
import { AppType } from '../../types/window'
import { cn } from '../../lib/cn'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'

interface Win11DesktopIconProps {
    app: AppType
    label: string
    icon: LucideIcon | string
    x?: number
    y?: number
}

export function Win11DesktopIcon({ app, label, icon: Icon, x, y }: Win11DesktopIconProps) {
    const openWindow = useWindowStore(s => s.openWindow)
    const isPhotoIcon = typeof Icon === 'string' && Icon === '/shreyansh-sahu.jpg'

    const handleDoubleClick = () => {
        openWindow(app)
    }

    // Handle single tap for mobile/touch fallback if needed, but double-click is standard desktop
    const handleTouchEnd = (e: React.TouchEvent) => {
        // Basic implementation for touch devices to open on tap if desired.
        // For a pure desktop feel, we might want to require a double-tap, 
        // but a single tap on a desktop icon via touch screen usually selects it unless modified.
        // For simplicity in this portfolio, tap opens it.
        e.preventDefault()
        openWindow(app)
    }

    return (
        <div
            className={cn(
                "absolute flex flex-col items-center justify-center p-2 rounded w-20 cursor-pointer group pointer-events-auto",
                "hover:bg-[var(--surface-elevated)] transition-colors"
            )}
            style={{ top: y || 0, left: x || 0 }}
            onDoubleClick={handleDoubleClick}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform p-0.5">
                {typeof Icon === 'string' ? (
                    <div className={cn("w-12 h-12", isPhotoIcon ? "overflow-hidden rounded-full" : "")}>
                        <Image
                            src={Icon}
                            alt={label}
                            width={48}
                            height={48}
                            className={cn("w-full h-full", isPhotoIcon ? "object-cover" : "object-contain")}
                        />
                    </div>
                ) : (
                    <Icon size={32} className="text-[var(--accent-primary)]" />
                )}
            </div>
            <span className="mt-2 text-xs font-sans text-center text-white drop-shadow-md select-none line-clamp-2">
                {label}
            </span>
        </div>
    )
}
