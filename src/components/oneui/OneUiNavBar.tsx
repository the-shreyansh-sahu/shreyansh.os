'use client'

import { useOneUiStore } from '../../store/oneUiStore'

function SamsungBackIcon() {
    return (
        <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
            <path d="M8 1L1 8L8 15" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function SamsungHomeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="2" y="2" width="12" height="12" rx="1.5" />
        </svg>
    )
}

function SamsungRecentsIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="10" height="10" rx="1.5" />
            <rect x="3" y="3" width="10" height="10" rx="1.5" />
        </svg>
    )
}

export function OneUiNavBar() {
    const navMode = useOneUiStore((s) => s.navMode)
    const goBack = useOneUiStore((s) => s.goBack)
    const goHome = useOneUiStore((s) => s.goHome)
    const openRecents = useOneUiStore((s) => s.openRecents)

    if (navMode === 'gesture') {
        return (
            <div className="absolute bottom-0 left-0 right-0 z-[310] flex justify-center pb-2 pt-4 pointer-events-auto">
                <button className="oneui-gesture-pill" onClick={goHome} aria-label="Go home" />
            </div>
        )
    }

    return (
        <div className="absolute bottom-0 left-0 right-0 z-[310] px-12 pb-3 pt-2 pointer-events-auto">
            <div className="flex items-center justify-between text-[var(--oneui-text)]">
                <button className="oneui-nav-button" onClick={goBack}><SamsungBackIcon /></button>
                <button className="oneui-nav-button" onClick={goHome}><SamsungHomeIcon /></button>
                <button className="oneui-nav-button" onClick={openRecents}><SamsungRecentsIcon /></button>
            </div>
        </div>
    )
}
