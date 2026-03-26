'use client'

import Image from 'next/image'
import { useThemeStore } from '../../store/themeStore'

export function OneUiWallpaper() {
    const theme = useThemeStore((s) => s.theme)

    return (
        <div className="oneui-wallpaper absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-full w-auto -translate-x-1/2">
                    <Image
                        src={theme === 'dark' ? '/one-ui-dark.webp' : '/one-ui-light.webp'}
                        alt=""
                        width={2048}
                        height={2048}
                        priority
                        className="h-full w-auto max-w-none object-contain"
                    />
                </div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(8,12,18,0.02)_18%,rgba(8,12,18,0.18)_100%)]" />
            <div className="oneui-wallpaper-glow" />
        </div>
    )
}
