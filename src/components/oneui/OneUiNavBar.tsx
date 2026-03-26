'use client'

import { Menu, Minus, Square } from 'lucide-react'
import { useOneUiStore } from '../../store/oneUiStore'

export function OneUiNavBar() {
    const navMode = useOneUiStore((s) => s.navMode)
    const goBack = useOneUiStore((s) => s.goBack)
    const goHome = useOneUiStore((s) => s.goHome)
    const openRecents = useOneUiStore((s) => s.openRecents)

    if (navMode === 'gesture') {
        return (
            <div className="absolute bottom-0 left-0 right-0 z-[310] px-8 pb-3 pt-3 pointer-events-auto">
                <div className="relative flex items-center justify-center">
                    <button className="absolute left-0 oneui-nav-hint" onClick={goBack}>Back</button>
                    <button className="oneui-gesture-pill" onClick={goHome} aria-label="Go home" />
                    <button className="absolute right-0 oneui-nav-hint" onClick={openRecents}>Recents</button>
                </div>
            </div>
        )
    }

    return (
        <div className="absolute bottom-0 left-0 right-0 z-[310] border-t border-white/10 bg-[var(--oneui-panel)]/96 px-10 pb-4 pt-3 backdrop-blur-[28px] pointer-events-auto">
            <div className="flex items-center justify-between text-[var(--oneui-text)]">
                <button className="oneui-nav-button" onClick={openRecents}><Menu size={18} /></button>
                <button className="oneui-nav-button" onClick={goHome}><Square size={18} /></button>
                <button className="oneui-nav-button" onClick={goBack}><Minus size={18} /></button>
            </div>
        </div>
    )
}
