'use client'

import { useEffect, useState } from 'react'
import { BatteryFull, SignalHigh, Wifi } from 'lucide-react'
import { useOneUiStore } from '../../store/oneUiStore'

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
            className="absolute left-0 right-0 top-0 z-[300] flex h-10 items-center justify-between px-5 text-[13px] font-semibold text-white pointer-events-auto"
        >
            <div>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
            <div className="flex items-center gap-2">
                <SignalHigh size={15} />
                <Wifi size={15} />
                <BatteryFull size={16} />
            </div>
        </button>
    )
}
