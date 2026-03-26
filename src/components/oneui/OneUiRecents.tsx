'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { ONE_UI_MANIFEST } from './oneUiManifest'
import { useOneUiStore } from '../../store/oneUiStore'

export function OneUiRecents() {
    const recentsOpen = useOneUiStore((s) => s.recentsOpen)
    const recents = useOneUiStore((s) => s.recents)
    const closeRecents = useOneUiStore((s) => s.closeRecents)
    const goHome = useOneUiStore((s) => s.goHome)
    const openApp = useOneUiStore((s) => s.openApp)

    return (
        <AnimatePresence>
            {recentsOpen ? (
                <>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[240] bg-black/36"
                        onClick={closeRecents}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 44 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 44 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                        className="absolute inset-x-0 bottom-20 z-[250] px-4"
                    >
                        <div className="rounded-[2.35rem] bg-[var(--oneui-panel)] px-4 pb-5 pt-4 shadow-[0_24px_60px_rgba(0,0,0,0.26)] backdrop-blur-[30px]">
                            <div className="mb-4 flex items-center justify-between px-2">
                                <div>
                                    <div className="oneui-eyebrow">Recents</div>
                                    <div className="text-[2.15rem] font-semibold tracking-[-0.06em] text-[var(--oneui-text)]">Open apps</div>
                                </div>
                                <button className="oneui-clear-button" onClick={goHome}>Close all</button>
                            </div>

                            <div className="flex snap-x gap-3 overflow-x-auto pb-2">
                                {recents.length === 0 ? (
                                    <div className="oneui-recents-card min-w-full text-sm text-[var(--oneui-text-soft)]">
                                        No recent apps yet.
                                    </div>
                                ) : (
                                    [...recents].reverse().map((route) => {
                                        const item = ONE_UI_MANIFEST[route.app]
                                        return (
                                            <button
                                                key={`${route.app}-${route.title ?? 'default'}`}
                                                className="oneui-recents-card min-w-[84%] snap-center text-left"
                                                onClick={() => openApp(route.app, { title: route.title, props: route.props })}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="text-xs uppercase tracking-[0.14em] text-[var(--oneui-text-faint)]">
                                                            {item.label}
                                                        </div>
                                                        <div className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">
                                                            {route.title ?? item.title}
                                                        </div>
                                                    </div>
                                                    <span className="rounded-full bg-[var(--oneui-surface-2)] p-2 text-[var(--oneui-text-soft)]">
                                                        <X size={14} />
                                                    </span>
                                                </div>
                                                <div className="mt-4 rounded-[1.7rem] bg-[var(--oneui-widget)] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]">
                                                    <div className="text-sm leading-6 text-[var(--oneui-text-soft)]">
                                                        {item.subtitle}
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    )
}
