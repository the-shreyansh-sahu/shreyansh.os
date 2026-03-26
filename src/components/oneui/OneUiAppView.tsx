'use client'

import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { OneUiRoute, useOneUiStore } from '../../store/oneUiStore'
import { OneUiAppHeader } from './OneUiAppHeader'
import { ONE_UI_MANIFEST } from './oneUiManifest'

interface OneUiAppViewProps {
    route: OneUiRoute | null
    children?: React.ReactNode
}

export function OneUiAppView({ route, children }: OneUiAppViewProps) {
    const routeStack = useOneUiStore((s) => s.routeStack)
    const scrollRef = useRef<HTMLDivElement>(null)
    const isActive = route !== null && routeStack.length > 0
    const item = route ? ONE_UI_MANIFEST[route.app] : null
    const title = route?.title ?? item?.title ?? ''

    return (
        <AnimatePresence>
            {isActive ? (
                <motion.div
                    initial={{ y: '100%', opacity: 0.7, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: '100%', opacity: 0, scale: 0.98 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                    className="absolute inset-0 z-[200] flex flex-col overflow-hidden bg-[var(--oneui-bg)] text-[var(--oneui-text)] pointer-events-auto"
                >
                    <OneUiAppHeader title={title} subtitle={item?.subtitle} scrollContainerRef={scrollRef} />
                    <div ref={scrollRef} className="flex-1 overflow-y-auto pb-24 scroll-smooth">
                        {children}
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
