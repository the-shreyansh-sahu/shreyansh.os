'use client'

import { FileText } from 'lucide-react'
import { OneUiAppIcon } from './OneUiAppIcon'

export function OneUiDock() {
    return (
        <div className="absolute bottom-16 left-4 right-4 h-[90px] rounded-3xl glass-surface flex items-center justify-between px-6 z-40 border border-white/5 shadow-2xl">
            <OneUiAppIcon app="about" label="About" icon="/shreyansh-sahu.jpg" />
            <OneUiAppIcon app="projects" label="Projects" icon="/projects.png" />
            <OneUiAppIcon app="skills" label="Skills" icon={FileText} />
            <OneUiAppIcon app="terminal" label="Terminal" icon="/terminal.png" />
        </div>
    )
}
