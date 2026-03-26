'use client'

import { AnimatePresence, motion } from 'framer-motion'
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
                        className="absolute inset-0 z-[240] bg-black/30"
                        onClick={closeRecents}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ type: 'spring', damping: 24, stiffness: 240 }}
                        className="absolute inset-x-0 bottom-20 z-[250] px-4"
                    >
                        <div className="rounded-[2rem] bg-[var(--oneui-panel)] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
                            <div className="mb-4 flex items-center justify-between px-1">
                                <div>
                                    <div className="oneui-eyebrow">Recents</div>
                                    <div className="text-2xl font-semibold tracking-[-0.04em] text-[var(--oneui-text)]">Open Apps</div>
                                </div>
                                <button className="oneui-clear-button" onClick={goHome}>Home</button>
                            </div>

                            <div className="space-y-3">
                                {recents.length === 0 ? (
                                    <div className="oneui-card text-sm text-[var(--oneui-text-soft)]">
                                        No recent apps yet.
                                    </div>
                                ) : (
                                    [...recents].reverse().map((route) => {
                                        const item = ONE_UI_MANIFEST[route.app]
                                        return (
                                            <button
                                                key={`${route.app}-${route.title ?? 'default'}`}
                                                className="oneui-recents-card"
                                                onClick={() => openApp(route.app, { title: route.title, props: route.props })}
                                            >
                                                <div className="text-xs uppercase tracking-[0.14em] text-[var(--oneui-text-faint)]">
                                                    {item.label}
                                                </div>
                                                <div className="mt-2 text-lg font-semibold text-[var(--oneui-text)]">
                                                    {route.title ?? item.title}
                                                </div>
                                                <div className="mt-1 text-sm text-[var(--oneui-text-soft)]">
                                                    {item.subtitle}
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
