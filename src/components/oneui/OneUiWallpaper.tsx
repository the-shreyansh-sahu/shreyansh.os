'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useThemeStore } from '../../store/themeStore'

export function OneUiWallpaper() {
    const theme = useThemeStore((s) => s.theme)
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], [0, 20])

    return (
        <div ref={containerRef} className="oneui-wallpaper absolute inset-0 pointer-events-none">
            <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ y }}
            >
                <div className="absolute left-1/2 top-0 h-full w-auto -translate-x-1/2">
                    <Image
                        src={theme === 'dark' ? '/one-ui-dark.webp' : '/one-ui-light.webp'}
                        alt=""
                        width={2048}
                        height={2048}
                        priority
                        className="h-full w-auto max-w-none object-contain scale-105"
                    />
                </div>
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.06)_50%,rgba(0,0,0,0.15)_100%)]" />
            <div className="oneui-wallpaper-glow" />
        </div>
    )
}
