'use client'

import { OneUiAppIcon } from './OneUiAppIcon'

export function OneUiDock() {
    return (
        <div className="absolute bottom-14 left-3 right-3 h-[80px] rounded-[1.4rem] bg-[var(--oneui-dock)]/90 flex items-center justify-between px-4 z-40 border border-white/8 shadow-[0_8px_28px_rgba(6,10,18,0.15)] backdrop-blur-[32px]">
            <OneUiAppIcon app="about" label="About" icon="/shreyansh-sahu.jpg" />
            <OneUiAppIcon app="projects" label="Projects" icon="/projects.png" />
            <OneUiAppIcon app="skills" label="Skills" icon="/samsung device care.png" />
            <OneUiAppIcon app="terminal" label="Terminal" icon="/terminal.png" />
        </div>
    )
}
