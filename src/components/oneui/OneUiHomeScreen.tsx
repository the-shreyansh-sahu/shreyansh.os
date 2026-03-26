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

            <div className="absolute inset-x-0 top-14 bottom-[7.25rem] px-5">
                <div className="rounded-[2rem] bg-[var(--oneui-widget)]/88 p-5 shadow-[0_20px_40px_rgba(6,10,18,0.18)] backdrop-blur-[24px]">
                    <div className="text-[13px] font-semibold text-[var(--oneui-text-soft)]">{formatDayLabel(now)}</div>
                    <div className="mt-1 text-[3.35rem] font-semibold leading-none tracking-[-0.08em] text-[var(--oneui-text-hero)]">
                        {formatClock(now)}
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-[1.4rem] bg-[var(--oneui-widget-strong)] px-4 py-3">
                        <div>
                            <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--oneui-text-faint)]">Now brief</div>
                            <div className="mt-1 text-sm font-medium text-[var(--oneui-text)]">Portfolio system tuned for One UI 7</div>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-[var(--oneui-accent)]">
                            <Sparkles size={18} />
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-[1.75rem] bg-[var(--oneui-search-bg)]/96 px-4 py-3 shadow-[0_10px_24px_rgba(8,14,24,0.12)] backdrop-blur-xl">
                    <div className="flex items-center gap-3 text-[var(--oneui-text-soft)]">
                        <Search size={17} />
                        <span className="text-sm font-medium">Finder search</span>
                    </div>
                </div>

                <div className="mt-7 flex h-[360px] overflow-hidden">
                    <motion.div
                        className="flex h-full w-full"
                        animate={{ x: `${homePage * -100}%` }}
                        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                    >
                        {HOME_PAGES.map((apps, index) => (
                            <div key={index} className="grid min-w-full grid-cols-4 content-start gap-x-3 gap-y-7 px-1">
                                {apps.map((app) => {
                                    const item = ONE_UI_MANIFEST[app]
                                    return <OneUiAppIcon key={item.app} app={item.app} label={item.label} icon={item.icon} />
                                })}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-x-4 bottom-[6.75rem] rounded-[2rem] border border-white/20 bg-[var(--oneui-dock)] px-4 py-3 shadow-[0_18px_36px_rgba(6,10,18,0.18)] backdrop-blur-[28px]">
                <div className="grid grid-cols-4 gap-3">
                    {ONE_UI_DOCK_APPS.map((item) => (
                        <OneUiAppIcon key={item.app} app={item.app} label={item.label} icon={item.icon} />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-[5.7rem] left-1/2 flex -translate-x-1/2 items-center gap-2">
                {HOME_PAGES.map((_, index) => (
                    <span
                        key={index}
                        className={cn(
                            'rounded-full transition-all',
                            homePage === index ? 'h-1.5 w-5 bg-white' : 'h-1.5 w-1.5 bg-white/45'
                        )}
                    />
                ))}
            </div>

            <AnimatePresence>
                {appDrawerOpen ? (
                    <>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20"
                            onClick={() => setAppDrawerOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%', opacity: 0.7 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0.6 }}
                            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                            onTouchStart={handleDrawerTouchStart}
                            onTouchEnd={handleDrawerTouchEnd}
                            className="absolute inset-x-0 bottom-0 top-24 rounded-t-[2.5rem] border-t border-white/20 bg-[var(--oneui-panel)] px-5 pb-32 pt-5 shadow-[0_-20px_56px_rgba(0,0,0,0.28)] backdrop-blur-[32px]"
                        >
                            <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-[var(--oneui-sheet-handle)]" />
                            <div className="mb-4">
                                <div className="oneui-eyebrow">Apps</div>
                                <div className="text-[2.35rem] font-semibold leading-none tracking-[-0.07em] text-[var(--oneui-text)]">App drawer</div>
                            </div>
                            <div className="rounded-[1.65rem] bg-[var(--oneui-surface-2)] px-4 py-3">
                                <div className="flex items-center gap-3 text-[var(--oneui-text-soft)]">
                                    <Search size={17} />
                                    <span className="text-sm font-medium">Search apps</span>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-4 gap-x-3 gap-y-7 px-1">
                                {ONE_UI_LAUNCHER_APPS.map((item) => (
                                    <OneUiAppIcon key={item.app} app={item.app} label={item.label} icon={item.icon} />
                                ))}
                            </div>
                        </motion.div>
                    </>
                ) : null}
            </AnimatePresence>

            {isJiggling ? (
                <div className="absolute inset-x-8 bottom-44 rounded-[1.5rem] bg-black/42 px-5 py-4 text-center text-sm text-white backdrop-blur-xl">
                    Edit mode enabled. Tap an icon to leave Samsung-style wiggle mode.
                </div>
            ) : null}
        </motion.div>
    )
}
