'use client'

import { usePlatform } from '../../hooks/usePlatform'
import { useTheme } from '../../hooks/useTheme'
import { Win11OS } from '../win11/Win11OS'
import { OneUiOS } from '../oneui/OneUiOS'



export function PlatformRouter() {
    const { platform, mounted } = usePlatform()

    // Call useTheme to ensure theme side-effects run
    useTheme()

    if (!mounted || platform === null) {
        return (
            <div
                className="w-full h-screen"
                style={{ backgroundColor: 'var(--surface-base)' }}
            />
        )
    }

    if (platform === 'win11') {
        return <Win11OS />
    }

    return <OneUiOS />
}
