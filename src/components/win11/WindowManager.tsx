'use client'

import { useWindowStore } from '../../store/windowStore'
import { Window } from './Window'
import { AppRouter } from '../apps/AppRouter'

import { AnimatePresence } from 'framer-motion'

export function WindowManager() {
    const windows = useWindowStore(s => s.windows)

    return (
        <AnimatePresence>
            {windows.map(win => (
                <Window key={win.id} window={win}>
                    <AppRouter app={win.app} props={win.props} />
                </Window>
            ))}
        </AnimatePresence>
    )
}
