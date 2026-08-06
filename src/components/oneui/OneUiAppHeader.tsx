'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { RefObject } from 'react'
import { ChevronLeft, MoreHorizontal, Search } from 'lucide-react'
import { useOneUiStore } from '../../store/oneUiStore'

interface OneUiAppHeaderProps {
    title: string
    subtitle?: string
    scrollContainerRef: RefObject<HTMLElement | null>
}

export function OneUiAppHeader({ title, subtitle, scrollContainerRef }: OneUiAppHeaderProps) {
    const goBack = useOneUiStore((s) => s.goBack)
    const { scrollY } = useScroll({ container: scrollContainerRef })

    const height = useTransform(scrollY, [0, 140], [140, 56])
    const fontSize = useTransform(scrollY, [0, 140], [28, 18])
    const fontWeight = useTransform(scrollY, [0, 140], [300, 600])
    const subtitleOpacity = useTransform(scrollY, [0, 80], [1, 0])
    const titleY = useTransform(scrollY, [0, 140], [0, -8])
    const buttonsOpacity = useTransform(scrollY, [0, 60], [1, 0.6])

    return (
        <motion.div
            style={{ height }}
            className="sticky left-0 right-0 top-0 z-40 overflow-hidden bg-[var(--oneui-bg)]/95 backdrop-blur-[20px]"
        >
            <div className="flex items-center justify-between px-4 pt-10 pb-2">
                <motion.button
                    onClick={goBack}
                    style={{ opacity: buttonsOpacity }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--oneui-surface-2)]/80 text-[var(--oneui-text)]"
                >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                </motion.button>
                <div className="flex items-center gap-1.5">
                    <motion.button
                        style={{ opacity: buttonsOpacity }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--oneui-surface-2)]/80 text-[var(--oneui-text)]"
                    >
                        <Search size={16} strokeWidth={2.2} />
                    </motion.button>
                    <motion.button
                        style={{ opacity: buttonsOpacity }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--oneui-surface-2)]/80 text-[var(--oneui-text)]"
                    >
                        <MoreHorizontal size={18} strokeWidth={2.2} />
                    </motion.button>
                </div>
            </div>
            <div className="flex h-full flex-col justify-end px-5 pb-3">
                <motion.h1
                    className="tracking-[-0.03em] text-[var(--oneui-text)]"
                    style={{ fontSize, fontWeight, y: titleY }}
                >
                    {title}
                </motion.h1>
                {subtitle ? (
                    <motion.div
                        style={{ opacity: subtitleOpacity }}
                        className="pt-1 text-[13px] text-[var(--oneui-text-soft)]"
                    >
                        {subtitle}
                    </motion.div>
                ) : null}
            </div>
        </motion.div>
    )
}
