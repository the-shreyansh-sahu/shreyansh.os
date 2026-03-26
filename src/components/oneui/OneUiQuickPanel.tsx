'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Bluetooth, Moon, Smartphone, Volume2, Wifi, Flashlight, RotateCcw } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useOneUiStore } from '../../store/oneUiStore'
import { OneUiPrimaryButton, OneUiSecondaryButton } from './OneUiPrimitives'

function QuickToggle({
    label,
    active,
    icon: Icon,
    onClick,
}: {
    label: string
    active: boolean
    icon: typeof Wifi
    onClick?: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={`oneui-quick-toggle ${active ? 'oneui-quick-toggle-active' : ''}`}
        >
            <span className="oneui-quick-toggle-icon">
                <Icon size={18} />
            </span>
            <span>{label}</span>
        </button>
    )
}

export function OneUiQuickPanel() {
    const quickPanelOpen = useOneUiStore((s) => s.quickPanelOpen)
    const setQuickPanelOpen = useOneUiStore((s) => s.setQuickPanelOpen)
    const navMode = useOneUiStore((s) => s.navMode)
    const setNavMode = useOneUiStore((s) => s.setNavMode)
    const { theme, toggleThemeWithAnimation } = useTheme()

    return (
        <AnimatePresence>
            {quickPanelOpen ? (
                <>
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[280] bg-black/20"
                        onClick={() => setQuickPanelOpen(false)}
                    />
                    <motion.div
                        initial={{ y: '-100%', opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 24, stiffness: 220 }}
                        className="absolute inset-x-0 top-0 z-[290] rounded-b-[2.3rem] bg-[var(--oneui-panel)] px-5 pb-6 pt-14 shadow-[0_24px_54px_rgba(0,0,0,0.2)]"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <div className="oneui-eyebrow">Quick Panel</div>
                                <div className="text-[2.3rem] font-semibold tracking-[-0.07em] leading-none text-[var(--oneui-text)]">
                                    12:48
                                </div>
                                <div className="mt-1 text-sm text-[var(--oneui-text-soft)]">Thu, 26 March</div>
                            </div>
                            <OneUiSecondaryButton onClick={() => setQuickPanelOpen(false)}>
                                Close
                            </OneUiSecondaryButton>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <QuickToggle label="Wi-Fi" active icon={Wifi} />
                            <QuickToggle label="Bluetooth" active={false} icon={Bluetooth} />
                            <QuickToggle label="Sound" active icon={Volume2} />
                            <QuickToggle
                                label={theme === 'dark' ? 'Dark mode' : 'Light mode'}
                                active={theme === 'dark'}
                                icon={Moon}
                                onClick={toggleThemeWithAnimation}
                            />
                            <QuickToggle label="Auto rotate" active={false} icon={RotateCcw} />
                            <QuickToggle label="Flashlight" active={false} icon={Flashlight} />
                        </div>

                        <div className="mt-5 oneui-card space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[var(--oneui-text-soft)]">Brightness</span>
                                <span className="font-medium text-[var(--oneui-text)]">82%</span>
                            </div>
                            <div className="oneui-slider-track">
                                <div className="oneui-slider-fill w-[82%]" />
                            </div>
                        </div>

                        <div className="mt-4 oneui-card space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-base font-semibold text-[var(--oneui-text)]">Navigation Mode</div>
                                    <div className="text-sm text-[var(--oneui-text-soft)]">Demo both Samsung navigation systems</div>
                                </div>
                                <Smartphone size={18} className="text-[var(--oneui-accent)]" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <OneUiPrimaryButton
                                    className={navMode === 'gesture' ? '' : 'opacity-80'}
                                    onClick={() => setNavMode('gesture')}
                                >
                                    Gesture
                                </OneUiPrimaryButton>
                                <OneUiSecondaryButton
                                    className={navMode === 'three-button' ? 'ring-1 ring-[var(--oneui-border-strong)]' : ''}
                                    onClick={() => setNavMode('three-button')}
                                >
                                    3-button
                                </OneUiSecondaryButton>
                            </div>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div className="px-1 text-sm font-semibold text-[var(--oneui-text)]">Notifications</div>
                            <div className="oneui-card">
                                <div className="text-[13px] font-medium text-[var(--oneui-text)]">Portfolio system</div>
                                <div className="mt-1 text-sm leading-6 text-[var(--oneui-text-soft)]">
                                    Contact, projects, notes, and developer tools are available from the launcher.
                                </div>
                            </div>
                            <div className="oneui-card">
                                <div className="text-[13px] font-medium text-[var(--oneui-text)]">Fidelity mode</div>
                                <div className="mt-1 text-sm leading-6 text-[var(--oneui-text-soft)]">
                                    This mobile branch is now focused on Samsung-style structure and visual density.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    )
}
