'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useOneUiStore } from '../../store/oneUiStore'
import { AppType } from '../../types/window'
import { cn } from '../../lib/cn'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { ONE_UI_MANIFEST } from './oneUiManifest'

interface OneUiAppIconProps {
    app: AppType
    label: string
    icon: LucideIcon | string
}

export function OneUiAppIcon({ app, label, icon: Icon }: OneUiAppIconProps) {
    const openApp = useOneUiStore((s) => s.openApp)
    const isJiggling = useOneUiStore((s) => s.isJiggling)
    const setJiggling = useOneUiStore((s) => s.setJiggling)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const isPhotoIcon = typeof Icon === 'string' && Icon === '/shreyansh-sahu.jpg'
    const manifest = ONE_UI_MANIFEST[app]

    const handlePointerDown = () => {
        if (isJiggling) return
        timerRef.current = setTimeout(() => {
            setJiggling(true)
        }, 500)
    }

    const handlePointerUp = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    const handleClick = () => {
        if (isJiggling) {
            return
        }

        openApp(app)
    }

    return (
        <motion.button
            className="flex w-full flex-col items-center gap-2"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onClick={handleClick}
            animate={isJiggling ? {
                rotate: [0, -2, 2, -2, 2, 0],
                transition: {
                    duration: 0.4,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                },
            } : {}}
            whileTap={!isJiggling ? { scale: 0.92 } : undefined}
        >
            <div className="flex h-[66px] w-[66px] items-center justify-center">
                {typeof Icon === 'string' ? (
                    <div
                        className={cn(
                            'h-full w-full overflow-hidden rounded-[1.45rem] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_20px_rgba(10,16,28,0.18)]',
                            isPhotoIcon ? 'p-0' : 'p-1'
                        )}
                        style={{ background: manifest.tileBg }}
                    >
                        <Image
                            src={Icon}
                            alt={label}
                            width={68}
                            height={68}
                            className={cn(
                                'h-full w-full rounded-[1.45rem]',
                                isPhotoIcon ? 'object-cover' : 'object-contain p-2 [filter:brightness(0)_invert(1)]'
                            )}
                        />
                    </div>
                ) : (
                    <div className="oneui-app-tile" style={{ background: manifest.tileBg, color: manifest.tileFg }}>
                        <Icon size={27} />
                    </div>
                )}
            </div>
            <span className="max-w-[78px] line-clamp-2 text-center text-[11px] font-medium leading-[1.2] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
                {label}
            </span>
        </motion.button>
    )
}
