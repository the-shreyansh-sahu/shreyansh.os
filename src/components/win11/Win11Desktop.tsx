'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import { useThemeStore } from '../../store/themeStore'

interface Win11DesktopProps {
    children?: ReactNode
}

export function Win11Desktop({ children }: Win11DesktopProps) {
    const theme = useThemeStore(s => s.theme)

    return (
        <div className="relative w-full h-screen overflow-hidden text-[var(--text-primary)] bg-black">
            {/* Desktop Background Image depending on Theme */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
            >
                <Image
                    src="/windows_dark.jpg"
                    alt="Windows 11 Dark Wallpaper"
                    fill
                    priority
                    className="object-cover"
                />
            </div>
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
            >
                <Image
                    src="/windows_light.jpg"
                    alt="Windows 11 Light Wallpaper"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Desktop Grid for Icons & Window Manager */}
            <div className="absolute inset-0 p-4">
                {children}
            </div>
        </div>
    )
}
