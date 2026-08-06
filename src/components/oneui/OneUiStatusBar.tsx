'use client'

import { useEffect, useState } from 'react'
import { useOneUiStore } from '../../store/oneUiStore'

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function SamsungBatteryIcon({ level }: { level: number }) {
    return (
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.4" />
            <rect x="2" y="2" width={Math.max(2, (level / 100) * 18)} height="8" rx="1.5" fill="currentColor" />
        </svg>
    )
}

function SamsungWifiIcon() {
    return (
        <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
            <path d="M7 10.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM3.35 8.15a5.25 5.25 0 017.3 0l-.88.88a3.75 3.75 0 00-5.54 0l-.88-.88zM1.2 6a8.25 8.25 0 0111.6 0l-.88.88a6.75 6.75 0 00-9.84 0L1.2 6z" />
        </svg>
    )
}

function SamsungSignalIcon() {
    return (
        <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
            <rect x="0" y="9" width="2.5" height="3" rx="0.5" />
            <rect x="3.8" y="6" width="2.5" height="6" rx="0.5" />
            <rect x="7.6" y="3" width="2.5" height="9" rx="0.5" />
            <rect x="11.4" y="0" width="2.5" height="12" rx="0.5" />
        </svg>
    )
}

export function OneUiStatusBar() {
    const toggleQuickPanel = useOneUiStore((s) => s.toggleQuickPanel)
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000 * 30)
        return () => clearInterval(timer)
    }, [])

    return (
        <button
            onClick={toggleQuickPanel}
            className="absolute left-0 right-0 top-0 z-[300] flex h-[28px] items-center justify-between px-7 text-[12px] font-medium text-white pointer-events-auto"
        >
            <div className="tracking-[0.01em]">{formatTime(time)}</div>
            <div className="flex items-center gap-[6px]">
                <SamsungSignalIcon />
                <SamsungWifiIcon />
                <div className="flex items-center gap-[3px]">
                    <SamsungBatteryIcon level={78} />
                </div>
            </div>
        </button>
    )
}
