'use client'

import { useEffect, useState } from 'react'
import { BatteryFull, SignalHigh, Wifi } from 'lucide-react'
import { useOneUiStore } from '../../store/oneUiStore'

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
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
            className="absolute left-0 right-0 top-0 z-[300] flex h-11 items-center justify-between px-6 text-[13px] font-semibold text-white pointer-events-auto"
        >
            <div className="tracking-[-0.02em]">{formatTime(time)}</div>
            <div className="flex items-center gap-2.5">
                <SignalHigh size={14} strokeWidth={2.2} />
                <Wifi size={14} strokeWidth={2.2} />
                <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold">78</span>
                    <BatteryFull size={16} strokeWidth={2.2} />
                </div>
            </div>
        </button>
    )
}
