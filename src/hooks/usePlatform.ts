'use client'

import { useEffect, useState } from 'react'
import { useOSStore } from '../store/osStore'

export function usePlatform() {
    const setPlatform = useOSStore(s => s.setPlatform)
    const platform = useOSStore(s => s.platform)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const checkPlatform = () => {
            const isMobile = window.innerWidth < 768 || (navigator.maxTouchPoints > 0 && window.innerWidth < 1024)
            setPlatform(isMobile ? 'oneui' : 'win11')
        }

        checkPlatform()

        // Optional: Recalculate on resize if you want to support live switching (e.g. dev tools resize)
        window.addEventListener('resize', checkPlatform)
        return () => window.removeEventListener('resize', checkPlatform)
    }, [setPlatform])

    return { platform, mounted }
}
