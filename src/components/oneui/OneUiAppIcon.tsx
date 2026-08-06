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
    const isSamsungIcon = typeof Icon === 'string' && (Icon.startsWith('/samsung') || Icon === '/terminal.png')
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
        if (isJiggling) return
        openApp(app)
    }

    return (
        <motion.button
            className="flex w-full flex-col items-center gap-1.5"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onClick={handleClick}
            animate={isJiggling ? {
                rotate: [0, -1.5, 1.5, -1.5, 1.5, 0],
                y: [0, -1, 0, -1, 0],
                transition: {
                    duration: 0.35,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                },
            } : {}}
            whileTap={!isJiggling ? { scale: 0.88, filter: 'brightness(0.85)' } : undefined}
        >
            <div className="relative flex h-[56px] w-[56px] items-center justify-center">
                {typeof Icon === 'string' ? (
                    <div
                        className={cn(
                            'h-full w-full overflow-hidden',
                            isSamsungIcon ? 'oneui-squircle-mask' : 'rounded-[14px]',
                            !isSamsungIcon && 'shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
                            (isPhotoIcon || isSamsungIcon) ? 'p-0' : 'p-0.5'
                        )}
                        style={!isSamsungIcon ? { background: manifest.tileBg } : undefined}
                    >
                        <Image
                            src={Icon}
                            alt={label}
                            width={56}
                            height={56}
                            className={cn(
                                'h-full w-full',
                                !isSamsungIcon && 'rounded-[13px]',
                                isPhotoIcon || isSamsungIcon ? 'object-cover' : 'object-contain p-1.5 [filter:brightness(0)_invert(1)]'
                            )}
                        />
                    </div>
                ) : (
                    <div className="oneui-app-tile" style={{ background: manifest.tileBg, color: manifest.tileFg }}>
                        <Icon size={24} />
                    </div>
                )}
            </div>
            <span className="max-w-[68px] line-clamp-2 text-center text-[10px] font-medium leading-[1.2] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                {label}
            </span>
        </motion.button>
    )
}
