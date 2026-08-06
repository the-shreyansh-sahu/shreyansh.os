'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { ONE_UI_MANIFEST } from './oneUiManifest'
import { useOneUiStore } from '../../store/oneUiStore'

function AppPreviewCard({ route, index, total }: { route: { app: string; title?: string; props?: Record<string, unknown> }; index: number; total: number }) {
    const openApp = useOneUiStore((s) => s.openApp)
    const item = ONE_UI_MANIFEST[route.app as keyof typeof ONE_UI_MANIFEST]
    if (!item) return null

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280, delay: index * 0.05 }}
            className="absolute inset-x-6 top-16 bottom-24 snap-center"
            onClick={() => openApp(route.app as any, { title: route.title, props: route.props })}
            style={{ zIndex: total - index }}
        >
            {/* App preview card */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-[var(--oneui-border)] bg-[var(--oneui-surface)] shadow-[0_8px_40px_rgba(0,0,0,0.2)]">
                {/* App icon header */}
                <div className="flex items-center gap-3 border-b border-[var(--oneui-border)] bg-[var(--oneui-surface)] px-4 py-3">
                    <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg" style={{ background: item.tileBg }}>
                        {typeof item.icon === 'string' ? (
                            <Image src={item.icon} alt="" width={28} height={28} className="h-full w-full object-cover" />
                        ) : (
                            <item.icon size={16} className="text-white" />
                        )}
                    </div>
                    <span className="text-[13px] font-semibold text-[var(--oneui-text)]">{item.label}</span>
                </div>

                {/* Preview content area */}
                <div className="flex-1 p-4">
                    <div className="rounded-[1rem] bg-[var(--oneui-widget)] p-4">
                        <div className="mb-2 h-3 w-24 rounded-full bg-[var(--oneui-surface-2)]" />
                        <div className="mb-1.5 h-2 w-full rounded-full bg-[var(--oneui-surface-2)] opacity-60" />
                        <div className="mb-1.5 h-2 w-3/4 rounded-full bg-[var(--oneui-surface-2)] opacity-40" />
                        <div className="h-2 w-1/2 rounded-full bg-[var(--oneui-surface-2)] opacity-30" />
                    </div>
                    <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[var(--oneui-surface-2)]" />
                            <div className="flex-1">
                                <div className="mb-1 h-2 w-20 rounded-full bg-[var(--oneui-surface-2)]" />
                                <div className="h-1.5 w-32 rounded-full bg-[var(--oneui-surface-2)] opacity-50" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[var(--oneui-surface-2)]" />
                            <div className="flex-1">
                                <div className="mb-1 h-2 w-16 rounded-full bg-[var(--oneui-surface-2)]" />
                                <div className="h-1.5 w-24 rounded-full bg-[var(--oneui-surface-2)] opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.button>
    )
}

export function OneUiRecents() {
    const recentsOpen = useOneUiStore((s) => s.recentsOpen)
    const recents = useOneUiStore((s) => s.recents)
    const closeRecents = useOneUiStore((s) => s.closeRecents)
    const goHome = useOneUiStore((s) => s.goHome)

    const reversedRecents = [...recents].reverse()

    return (
        <AnimatePresence>
            {recentsOpen ? (
                <>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[240] bg-black/40 backdrop-blur-sm"
                        onClick={closeRecents}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                        className="absolute inset-0 z-[250] flex flex-col"
                    >
                        {/* Close all button at top */}
                        <div className="relative z-10 flex justify-center pt-14 pb-4">
                            <button
                                onClick={goHome}
                                className="rounded-full bg-white/15 px-6 py-2.5 text-[13px] font-semibold text-white backdrop-blur-md"
                            >
                                Close all
                            </button>
                        </div>

                        {/* App cards carousel */}
                        <div className="relative flex-1">
                            {reversedRecents.length === 0 ? (
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center text-[14px] text-white/60">No recent apps</div>
                                </div>
                            ) : (
                                reversedRecents.map((route, index) => (
                                    <AppPreviewCard
                                        key={`${route.app}-${route.title ?? 'default'}`}
                                        route={route}
                                        index={index}
                                        total={reversedRecents.length}
                                    />
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    )
}
