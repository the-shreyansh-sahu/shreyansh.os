'use client'

import { useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { OneUiWallpaper } from './OneUiWallpaper'
import { OneUiAppIcon } from './OneUiAppIcon'
import { useOneUiStore } from '../../store/oneUiStore'
import { ONE_UI_DOCK_APPS, ONE_UI_LAUNCHER_APPS, ONE_UI_MANIFEST } from './oneUiManifest'
import { cn } from '../../lib/cn'

const HOME_PAGES = [
    ['about', 'projects', 'skills', 'contact'],
    ['resume', 'experience', 'terminal'],
] as const

function formatDayLabel(date: Date) {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
}

function formatClock(date: Date) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function OneUiHomeScreen() {
    const isJiggling = useOneUiStore((s) => s.isJiggling)
    const setJiggling = useOneUiStore((s) => s.setJiggling)
    const setQuickPanelOpen = useOneUiStore((s) => s.setQuickPanelOpen)
    const appDrawerOpen = useOneUiStore((s) => s.appDrawerOpen)
    const setAppDrawerOpen = useOneUiStore((s) => s.setAppDrawerOpen)
    const homePage = useOneUiStore((s) => s.homePage)
    const setHomePage = useOneUiStore((s) => s.setHomePage)
    const homeTouchStartRef = useRef<{ x: number; y: number } | null>(null)
    const drawerTouchStartRef = useRef<{ x: number; y: number } | null>(null)

    const now = useMemo(() => new Date(), [])

    const handleHomeSwipe = (offsetX: number, offsetY: number) => {
        if (Math.abs(offsetY) > Math.abs(offsetX) && offsetY > 110) {
            setQuickPanelOpen(true)
            return
        }

        if (Math.abs(offsetY) > Math.abs(offsetX) && offsetY < -90) {
            setAppDrawerOpen(true)
            return
        }

        if (Math.abs(offsetX) > Math.abs(offsetY) && Math.abs(offsetX) > 70) {
            const direction = offsetX < 0 ? 1 : -1
            const nextPage = Math.max(0, Math.min(HOME_PAGES.length - 1, homePage + direction))
            setHomePage(nextPage)
        }
    }

    const handleDrawerSwipe = (offsetY: number) => {
        if (offsetY > 90) {
            setAppDrawerOpen(false)
        }
    }

    const handleHomeTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0]
        homeTouchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleHomeTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        if (appDrawerOpen || !homeTouchStartRef.current) return

        const touch = event.changedTouches[0]
        handleHomeSwipe(touch.clientX - homeTouchStartRef.current.x, touch.clientY - homeTouchStartRef.current.y)
        homeTouchStartRef.current = null
    }

    const handleDrawerTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0]
        drawerTouchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleDrawerTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!drawerTouchStartRef.current) return

        const touch = event.changedTouches[0]
        handleDrawerSwipe(touch.clientY - drawerTouchStartRef.current.y)
        drawerTouchStartRef.current = null
    }

    const handleBgClick = () => {
        if (isJiggling) {
            setJiggling(false)
        }
    }

    return (
        <motion.div
            className="relative h-screen overflow-hidden select-none"
            onClick={handleBgClick}
            onTouchStart={handleHomeTouchStart}
            onTouchEnd={handleHomeTouchEnd}
        >
            <OneUiWallpaper />

            <div className="absolute inset-x-0 top-10 bottom-[6.5rem] px-4">
                {/* Clock + Now Brief widget */}
                <div className="rounded-[1.6rem] bg-[var(--oneui-widget)]/90 p-4 shadow-[0_8px_32px_rgba(6,10,18,0.12)] backdrop-blur-[28px]">
                    <div className="text-[12px] font-medium text-[var(--oneui-text-soft)]">{formatDayLabel(now)}</div>
                    <div className="mt-0.5 text-[3.2rem] font-extralight leading-none tracking-[-0.02em] text-[var(--oneui-text-hero)]">
                        {formatClock(now)}
                    </div>
                    <div className="mt-3 flex items-center justify-between rounded-[1rem] bg-[var(--oneui-widget-strong)] px-3.5 py-2.5">
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--oneui-text-faint)]">Now brief</div>
                            <div className="mt-0.5 text-[13px] font-medium text-[var(--oneui-text)]">Portfolio system tuned for One UI 7</div>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--oneui-accent)]/15 text-[var(--oneui-accent)]">
                            <Sparkles size={16} />
                        </div>
                    </div>
                </div>

                {/* Search bar — full pill */}
                <div className="mt-4 rounded-full bg-[var(--oneui-search-bg)]/96 px-4 py-2.5 shadow-[0_4px_16px_rgba(8,14,24,0.08)] backdrop-blur-xl">
                    <div className="flex items-center gap-2.5 text-[var(--oneui-text-soft)]">
                        <Search size={16} />
                        <span className="text-[13px] font-medium">Search</span>
                    </div>
                </div>

                {/* App grid */}
                <div className="mt-5 flex h-[340px] overflow-hidden">
                    <motion.div
                        className="flex h-full w-full"
                        animate={{ x: `${homePage * -100}%` }}
                        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                    >
                        {HOME_PAGES.map((apps, index) => (
                            <div key={index} className="grid min-w-full grid-cols-4 content-start gap-x-2 gap-y-6 px-1 pt-2">
                                {apps.map((app) => {
                                    const item = ONE_UI_MANIFEST[app]
                                    return <OneUiAppIcon key={item.app} app={item.app} label={item.label} icon={item.icon} />
                                })}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Dock */}
            <div className="absolute inset-x-3 bottom-[5.5rem] rounded-[1.4rem] bg-[var(--oneui-dock)]/90 px-3 py-2.5 shadow-[0_8px_28px_rgba(6,10,18,0.15)] backdrop-blur-[32px] border border-white/8">
                <div className="grid grid-cols-4 gap-2">
                    {ONE_UI_DOCK_APPS.map((item) => (
                        <OneUiAppIcon key={item.app} app={item.app} label={item.label} icon={item.icon} />
                    ))}
                </div>
            </div>

            {/* Page indicators */}
            <div className="absolute bottom-[4.5rem] left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                {HOME_PAGES.map((_, index) => (
                    <span
                        key={index}
                        className={cn(
                            'rounded-full transition-all duration-300',
                            homePage === index ? 'h-[6px] w-[6px] bg-white' : 'h-[5px] w-[5px] bg-white/40'
                        )}
                    />
                ))}
            </div>

            {/* App drawer */}
            <AnimatePresence>
                {appDrawerOpen ? (
                    <>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/25"
                            onClick={() => setAppDrawerOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%', opacity: 0.8 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0.7 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                            onTouchStart={handleDrawerTouchStart}
                            onTouchEnd={handleDrawerTouchEnd}
                            className="absolute inset-x-0 bottom-0 top-20 rounded-t-[2rem] border-t border-[var(--oneui-border)] bg-[var(--oneui-panel)] px-5 pb-28 pt-4 shadow-[0_-16px_48px_rgba(0,0,0,0.25)] backdrop-blur-[40px]"
                        >
                            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[var(--oneui-sheet-handle)]" />
                            <div className="mb-3 rounded-full bg-[var(--oneui-surface-2)] px-4 py-2.5">
                                <div className="flex items-center gap-2.5 text-[var(--oneui-text-soft)]">
                                    <Search size={16} />
                                    <span className="text-[13px] font-medium">Search apps</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-x-2 gap-y-5 px-1 pt-2">
                                {ONE_UI_LAUNCHER_APPS.map((item) => (
                                    <OneUiAppIcon key={item.app} app={item.app} label={item.label} icon={item.icon} />
                                ))}
                            </div>
                        </motion.div>
                    </>
                ) : null}
            </AnimatePresence>

            {isJiggling ? (
                <div className="absolute inset-x-8 bottom-40 rounded-[1rem] bg-black/50 px-4 py-3 text-center text-[13px] text-white/90 backdrop-blur-xl">
                    Edit mode enabled
                </div>
            ) : null}
        </motion.div>
    )
}
