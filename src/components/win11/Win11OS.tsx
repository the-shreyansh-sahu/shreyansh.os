'use client'

import { useEffect, useState } from 'react'
import { Win11Desktop } from './Win11Desktop'
import { Win11Cursor } from './Win11Cursor'
import { Win11DesktopIcon } from './Win11DesktopIcon'
import { Win11Taskbar } from './Win11Taskbar'
import { Win11StartMenu } from './Win11StartMenu'
import { Win11NotifCenter } from './Win11NotifCenter'
import { Win11ContextMenu } from './Win11ContextMenu'
import { WindowManager } from './WindowManager'
import { BootScreen } from './BootScreen'
import { useOSStore } from '../../store/osStore'

export function Win11OS() {
    const hasBooted = useOSStore((s) => s.hasBooted)
    const isBooting = useOSStore((s) => s.isBooting)
    const setBooting = useOSStore((s) => s.setBooting)
    const completeBoot = useOSStore((s) => s.completeBoot)

    const [startMenuOpen, setStartMenuOpen] = useState(false)
    const [notifCenterOpen, setNotifCenterOpen] = useState(false)
    const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 })

    useEffect(() => {
        if (!hasBooted && !isBooting) {
            setBooting(true)
        }
    }, [hasBooted, isBooting, setBooting])

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY })
        setStartMenuOpen(false)
        setNotifCenterOpen(false)
    }

    const closeOverlays = () => {
        setStartMenuOpen(false)
        setNotifCenterOpen(false)
        setContextMenu((prev) => ({ ...prev, isOpen: false }))
    }

    return (
        <>
            <Win11Cursor />
            {!hasBooted && <BootScreen onComplete={completeBoot} />}

            <div
                className="w-full h-screen"
                onContextMenu={handleContextMenu}
                onClick={closeOverlays}
            >
                <Win11Desktop>
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="pointer-events-none relative w-full h-full">
                            <Win11DesktopIcon app="about" label="About Me" icon="/shreyansh-sahu.jpg" x={20} y={20} />
                            <Win11DesktopIcon app="projects" label="Projects" icon="/projects.png" x={20} y={120} />
                            <Win11DesktopIcon app="skills" label="Skills" icon="/skills.webp" x={20} y={220} />
                            <Win11DesktopIcon app="experience" label="Experience" icon="/experience.png" x={20} y={320} />
                            <Win11DesktopIcon app="terminal" label="Terminal" icon="/terminal.png" x={20} y={420} />
                            <Win11DesktopIcon app="contact" label="Contact" icon="/contact.png" x={20} y={520} />
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-10">
                        <WindowManager />
                    </div>
                </Win11Desktop>

                <div className="absolute inset-0 pointer-events-none overflow-hidden z-[99990]">
                    <div className="pointer-events-none w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <Win11Taskbar
                            startMenuOpen={startMenuOpen}
                            notifCenterOpen={notifCenterOpen}
                            onToggleStartMenu={() => {
                                setStartMenuOpen(!startMenuOpen)
                                setNotifCenterOpen(false)
                                setContextMenu((prev) => ({ ...prev, isOpen: false }))
                            }}
                            onToggleNotifCenter={() => {
                                setNotifCenterOpen(!notifCenterOpen)
                                setStartMenuOpen(false)
                                setContextMenu((prev) => ({ ...prev, isOpen: false }))
                            }}
                        />
                        <Win11StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
                        <Win11NotifCenter isOpen={notifCenterOpen} />
                        <Win11ContextMenu
                            isOpen={contextMenu.isOpen}
                            x={contextMenu.x}
                            y={contextMenu.y}
                            onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
