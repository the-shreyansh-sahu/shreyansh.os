'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bluetooth, Flashlight, Moon, RotateCcw, Wifi, X, Music } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useOneUiStore } from '../../store/oneUiStore'
import { cn } from '../../lib/cn'

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatDate(date: Date) {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
}

function CircularToggle({
    icon: Icon,
    label,
    active,
    large,
    onClick,
}: {
    icon: typeof Wifi
    label: string
    active?: boolean
    large?: boolean
    onClick?: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex flex-col items-center gap-1.5',
            )}
        >
            <div
                className={cn(
                    'flex items-center justify-center rounded-full transition-all duration-200',
                    large ? 'h-[52px] w-[52px]' : 'h-[42px] w-[42px]',
                    active
                        ? 'bg-[var(--oneui-accent)] text-white shadow-[0_2px_12px_rgba(3,129,254,0.35)]'
                        : 'bg-[var(--oneui-surface-2)] text-[var(--oneui-text-soft)]'
                )}
            >
                <Icon size={large ? 22 : 18} strokeWidth={2} />
            </div>
            <span className={cn(
                'font-medium leading-none',
                large ? 'text-[11px]' : 'text-[10px]',
                active ? 'text-[var(--oneui-accent)]' : 'text-[var(--oneui-text-soft)]'
            )}>
                {label}
            </span>
        </button>
    )
}

function HorizontalSlider({ value, onChange, icon: Icon, label }: { value: number; onChange: (v: number) => void; icon: React.ComponentType<{size?: number; className?: string}>; label: string }) {
    const trackRef = useRef<HTMLDivElement>(null)

    const handleTrackClick = (e: React.MouseEvent) => {
        if (!trackRef.current) return
        const rect = trackRef.current.getBoundingClientRect()
        const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
        onChange(Math.round(pct))
    }

    return (
        <div className="flex items-center gap-3">
            <Icon size={16} className="shrink-0 text-[var(--oneui-text-soft)]" />
            <div
                ref={trackRef}
                onClick={handleTrackClick}
                className="relative h-[6px] flex-1 cursor-pointer rounded-full bg-[var(--oneui-surface-2)]"
            >
                <div
                    className="absolute left-0 top-0 h-full rounded-full bg-[var(--oneui-accent)]"
                    style={{ width: `${value}%` }}
                />
                <div
                    className="absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
                    style={{ left: `${value}%` }}
                />
            </div>
        </div>
    )
}

function SunIcon({ size = 16, className }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
    )
}

function VolumeIcon({ size = 16, className }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
    )
}

export function OneUiQuickPanel() {
    const quickPanelOpen = useOneUiStore((s) => s.quickPanelOpen)
    const setQuickPanelOpen = useOneUiStore((s) => s.setQuickPanelOpen)
    const { theme, toggleThemeWithAnimation } = useTheme()
    const [brightness, setBrightness] = useState(82)
    const [volume, setVolume] = useState(65)
    const [tab, setTab] = useState<'quick' | 'notifications'>('quick')
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
                        className="absolute inset-0 z-[280] bg-black/30"
                        onClick={() => setQuickPanelOpen(false)}
                    />
                    <motion.div
                        initial={{ y: '-100%', opacity: 0.8 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        onTouchStart={handlePanelTouchStart}
                        onTouchEnd={handlePanelTouchEnd}
                        className="absolute inset-x-0 top-0 z-[290] max-h-[85%] overflow-y-auto rounded-b-[2rem] border-b border-[var(--oneui-border)] bg-[var(--oneui-panel)] px-5 pb-6 pt-12 shadow-[0_28px_60px_rgba(0,0,0,0.25)] backdrop-blur-[40px]"
                    >
                        {/* Header: clock + close */}
                        <div className="mb-5 flex items-start justify-between">
                            <div>
                                <div className="text-[3.5rem] font-extralight leading-none tracking-[-0.04em] text-[var(--oneui-text)]">
                                    {formatTime(now)}
                                </div>
                                <div className="mt-1.5 text-[13px] font-medium text-[var(--oneui-text-soft)]">{formatDate(now)}</div>
                            </div>
                            <button
                                onClick={() => setQuickPanelOpen(false)}
                                className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--oneui-surface-2)] text-[var(--oneui-text-soft)]"
                            >
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Large toggles: Wi-Fi + Bluetooth */}
                        <div className="mb-4 grid grid-cols-2 gap-3">
                            <button className={cn(
                                'flex items-center gap-3 rounded-[1.2rem] px-4 py-3.5 text-left transition-all',
                                'bg-[var(--oneui-accent)] text-white shadow-[0_2px_12px_rgba(3,129,254,0.3)]'
                            )}>
                                <Wifi size={20} strokeWidth={2.2} />
                                <div>
                                    <div className="text-[13px] font-semibold">Wi-Fi</div>
                                    <div className="text-[11px] font-medium opacity-80">Home</div>
                                </div>
                            </button>
                            <button className={cn(
                                'flex items-center gap-3 rounded-[1.2rem] px-4 py-3.5 text-left transition-all',
                                'bg-[var(--oneui-surface-2)] text-[var(--oneui-text)]'
                            )}>
                                <Bluetooth size={20} strokeWidth={2.2} />
                                <div>
                                    <div className="text-[13px] font-semibold">Bluetooth</div>
                                    <div className="text-[11px] font-medium text-[var(--oneui-text-soft)]">On</div>
                                </div>
                            </button>
                        </div>

                        {/* Small circular toggles */}
                        <div className="mb-4 flex items-center justify-around">
                            <CircularToggle
                                icon={Moon}
                                label="Dark"
                                active={theme === 'dark'}
                                onClick={toggleThemeWithAnimation}
                            />
                            <CircularToggle icon={Flashlight} label="Torch" />
                            <CircularToggle icon={RotateCcw} label="Rotate" />
                            <CircularToggle icon={Music} label="Media" />
                        </div>

                        {/* Brightness slider */}
                        <div className="mb-3 rounded-[1.2rem] bg-[var(--oneui-surface)] px-4 py-3">
                            <HorizontalSlider
                                value={brightness}
                                onChange={setBrightness}
                                icon={SunIcon}
                                label="Brightness"
                            />
                        </div>

                        {/* Volume slider */}
                        <div className="mb-4 rounded-[1.2rem] bg-[var(--oneui-surface)] px-4 py-3">
                            <HorizontalSlider
                                value={volume}
                                onChange={setVolume}
                                icon={VolumeIcon}
                                label="Volume"
                            />
                        </div>

                        {/* Notifications section (when on notifications tab) */}
                        {tab === 'notifications' && (
                            <div className="space-y-2">
                                <div className="oneui-card !rounded-[1rem] !p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--oneui-accent)] text-[10px] font-bold text-white">S</div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[12px] font-semibold text-[var(--oneui-text)]">System UI</div>
                                            <div className="text-[11px] text-[var(--oneui-text-soft)] truncate">Home screen is using Samsung analog apps</div>
                                        </div>
                                        <div className="text-[10px] text-[var(--oneui-text-faint)]">now</div>
                                    </div>
                                </div>
                                <div className="oneui-card !rounded-[1rem] !p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--oneui-success)] text-[10px] font-bold text-white">P</div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[12px] font-semibold text-[var(--oneui-text)]">Portfolio</div>
                                            <div className="text-[11px] text-[var(--oneui-text-soft)] truncate">Projects and skills remain intact inside apps</div>
                                        </div>
                                        <div className="text-[10px] text-[var(--oneui-text-faint)]">2m</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab indicators */}
                        <div className="mt-4 flex justify-center gap-1.5">
                            <button
                                onClick={() => setTab('quick')}
                                className={cn(
                                    'h-1 rounded-full transition-all duration-300',
                                    tab === 'quick' ? 'w-6 bg-[var(--oneui-accent)]' : 'w-1.5 bg-[var(--oneui-text-faint)]'
                                )}
                            />
                            <button
                                onClick={() => setTab('notifications')}
                                className={cn(
                                    'h-1 rounded-full transition-all duration-300',
                                    tab === 'notifications' ? 'w-6 bg-[var(--oneui-accent)]' : 'w-1.5 bg-[var(--oneui-text-faint)]'
                                )}
                            />
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    )
}
