'use client'

import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bluetooth, Flashlight, Moon, RotateCcw, Volume2, Wifi } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useOneUiStore } from '../../store/oneUiStore'
import { cn } from '../../lib/cn'

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatDate(date: Date) {
    return date.toLocaleDateString([], { weekday: 'short', month: 'long', day: 'numeric' })
}

function QuickTile({
    label,
    icon: Icon,
    active,
    compact,
    onClick,
}: {
    label: string
    icon: typeof Wifi
    active?: boolean
    compact?: boolean
    onClick?: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'oneui-quick-toggle',
                active ? 'oneui-quick-toggle-active' : '',
                compact ? 'min-h-[80px] px-4 py-4' : 'min-h-[96px] px-5 py-5'
            )}
        >
            <span className="oneui-quick-toggle-icon">
                <Icon size={compact ? 17 : 19} />
            </span>
            <span className={cn('font-semibold', compact ? 'text-[13px]' : 'text-[15px]')}>{label}</span>
        </button>
    )
}

export function OneUiQuickPanel() {
    const quickPanelOpen = useOneUiStore((s) => s.quickPanelOpen)
    const setQuickPanelOpen = useOneUiStore((s) => s.setQuickPanelOpen)
    const { theme, toggleThemeWithAnimation } = useTheme()
    const panelTouchStartRef = useRef<{ x: number; y: number } | null>(null)
    const now = new Date()

    const handlePanelSwipe = (offsetX: number, offsetY: number) => {
        if (Math.abs(offsetY) > Math.abs(offsetX) && offsetY < -90) {
            setQuickPanelOpen(false)
        }
    }

    const handlePanelTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0]
        panelTouchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handlePanelTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!panelTouchStartRef.current) return

        const touch = event.changedTouches[0]
        handlePanelSwipe(touch.clientX - panelTouchStartRef.current.x, touch.clientY - panelTouchStartRef.current.y)
        panelTouchStartRef.current = null
    }

    return (
        <AnimatePresence>
            {quickPanelOpen ? (
                <>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[280] bg-black/28"
                        onClick={() => setQuickPanelOpen(false)}
                    />
                    <motion.div
                        initial={{ y: '-100%', opacity: 0.75 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                        onTouchStart={handlePanelTouchStart}
                        onTouchEnd={handlePanelTouchEnd}
                        className="absolute inset-x-0 top-0 z-[290] rounded-b-[2.6rem] border-b border-white/12 bg-[var(--oneui-panel)] px-5 pb-8 pt-14 shadow-[0_28px_60px_rgba(0,0,0,0.22)] backdrop-blur-[32px]"
                    >
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <div className="text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[var(--oneui-text)]">
                                    {formatTime(now)}
                                </div>
                                <div className="mt-2 text-sm font-medium text-[var(--oneui-text-soft)]">{formatDate(now)}</div>
                            </div>
                            <button
                                onClick={() => setQuickPanelOpen(false)}
                                className="rounded-full bg-[var(--oneui-surface-2)] px-4 py-2 text-[13px] font-semibold text-[var(--oneui-text)]"
                            >
                                Done
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <QuickTile label="Wi-Fi" icon={Wifi} active />
                            <QuickTile label="Sound" icon={Volume2} active />
                        </div>
                        <div className="mt-3 grid grid-cols-4 gap-3">
                            <QuickTile label="Bluetooth" icon={Bluetooth} compact />
                            <QuickTile label={theme === 'dark' ? 'Dark mode' : 'Light mode'} icon={Moon} active={theme === 'dark'} compact onClick={toggleThemeWithAnimation} />
                            <QuickTile label="Rotate" icon={RotateCcw} compact />
                            <QuickTile label="Torch" icon={Flashlight} compact />
                        </div>

                        <div className="mt-4 rounded-[2rem] bg-[var(--oneui-surface)] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-medium text-[var(--oneui-text-soft)]">Brightness</span>
                                <span className="text-sm font-semibold text-[var(--oneui-text)]">82%</span>
                            </div>
                            <div className="oneui-slider-track">
                                <div className="oneui-slider-fill w-[82%]" />
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="px-1 text-[13px] font-semibold text-[var(--oneui-text-soft)]">Notifications</div>
                            <div className="mt-3 space-y-3">
                                <div className="oneui-card">
                                    <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--oneui-text-faint)]">System UI</div>
                                    <div className="mt-2 text-[15px] font-semibold text-[var(--oneui-text)]">Home screen is using Samsung analog apps</div>
                                    <div className="mt-2 text-sm leading-6 text-[var(--oneui-text-soft)]">
                                        Contacts, My Files, Device Care, Notes, Phone, Calendar, and Developer options now anchor the mobile shell.
                                    </div>
                                </div>
                                <div className="oneui-card">
                                    <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--oneui-text-faint)]">Portfolio</div>
                                    <div className="mt-2 text-[15px] font-semibold text-[var(--oneui-text)]">Projects and skills remain intact inside apps</div>
                                    <div className="mt-2 text-sm leading-6 text-[var(--oneui-text-soft)]">
                                        The shell is now Samsung-first while app content still exposes your actual portfolio work.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    )
}
