'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { RefObject } from 'react'
import { ChevronLeft, MoreVertical, Search } from 'lucide-react'
import { useOneUiStore } from '../../store/oneUiStore'

interface OneUiAppHeaderProps {
    title: string
    subtitle?: string
    scrollContainerRef: RefObject<HTMLElement | null>
}

export function OneUiAppHeader({ title, subtitle, scrollContainerRef }: OneUiAppHeaderProps) {
    const goBack = useOneUiStore((s) => s.goBack)
    const { scrollY } = useScroll({ container: scrollContainerRef })

    const height = useTransform(scrollY, [0, 120], [148, 82])
    const fontSize = useTransform(scrollY, [0, 120], [34, 22])
    const subtitleOpacity = useTransform(scrollY, [0, 64], [1, 0])
    const titleY = useTransform(scrollY, [0, 120], [0, -18])

    return (
        <motion.div
            style={{ height }}
            className="sticky left-0 right-0 top-0 z-40 overflow-hidden border-b border-[var(--oneui-border)] bg-[var(--oneui-bg)]/92 px-5 pb-4 pt-11 backdrop-blur-xl"
        >
            <div className="mb-3 flex items-center justify-between">
                <button
                    onClick={goBack}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--oneui-surface-2)] text-[var(--oneui-text)]"
                >
                    <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--oneui-surface-2)] text-[var(--oneui-text)]">
                        <Search size={17} />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--oneui-surface-2)] text-[var(--oneui-text)]">
                        <MoreVertical size={17} />
                    </button>
                </div>
            </div>
            <div className="relative flex h-full flex-col justify-end">
                <motion.h1
                    className="font-semibold tracking-[-0.06em] text-[var(--oneui-text)]"
                    style={{ fontSize, y: titleY }}
                >
                    {title}
                </motion.h1>
                {subtitle ? (
                    <motion.div style={{ opacity: subtitleOpacity }} className="pt-2 text-sm text-[var(--oneui-text-soft)]">
                        {subtitle}
                    </motion.div>
                ) : null}
            </div>
        </motion.div>
    )
}
