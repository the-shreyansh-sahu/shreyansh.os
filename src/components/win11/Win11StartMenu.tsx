'use client'

import { Search, Power } from 'lucide-react'
import Image from 'next/image'
import { useWindowStore } from '../../store/windowStore'
import { AppType } from '../../types/window'

interface Win11StartMenuProps {
    isOpen: boolean
    onClose: () => void
}

export function Win11StartMenu({ isOpen, onClose }: Win11StartMenuProps) {
    const openWindow = useWindowStore(s => s.openWindow)

    if (!isOpen) return null

    const PinnedApps: { id: AppType; label: string; icon: string }[] = [
        { id: 'about', label: 'About Me', icon: '/shreyansh-sahu.jpg' },
        { id: 'projects', label: 'Projects', icon: '/projects.png' },
        { id: 'skills', label: 'Skills', icon: '/skills.webp' },
        { id: 'experience', label: 'Experience', icon: '/experience.png' },
        { id: 'terminal', label: 'Terminal', icon: '/terminal.png' },
        { id: 'contact', label: 'Contact', icon: '/contact.png' },
    ]

    const handleLaunch = (app: AppType) => {
        openWindow(app)
        onClose()
    }

    return (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[700px] glass-surface rounded-xl shadow-2xl z-[99995] flex flex-col pt-6 font-sans pointer-events-auto">
            {/* Search Bar */}
            <div className="px-8 pb-6 border-b border-[var(--surface-glass-border)]">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                    <input
                        type="text"
                        placeholder="Type here to search"
                        className="w-full h-10 bg-[var(--surface-elevated)] border border-[var(--surface-glass-border)] rounded-full pl-12 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            {/* Pinned section */}
            <div className="flex-1 px-8 py-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Pinned</h3>
                    <button className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2 py-1 bg-white/5 rounded">All apps {'>'}</button>
                </div>
                <div className="grid grid-cols-6 gap-y-6">
                    {PinnedApps.map(app => (
                        <button
                            key={app.id}
                            onClick={() => handleLaunch(app.id)}
                            className="flex flex-col items-center gap-2 hover:bg-[var(--glass-hover)] p-2 rounded-md transition-colors group"
                        >
                            <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                                <div className={app.icon === '/shreyansh-sahu.jpg' ? "w-10 h-10 rounded-full overflow-hidden" : "w-10 h-10"}>
                                    <Image
                                        src={app.icon}
                                        alt={app.label}
                                        width={40}
                                        height={40}
                                        className={app.icon === '/shreyansh-sahu.jpg' ? "w-full h-full object-cover" : "w-full h-full object-contain"}
                                    />
                                </div>
                            </div>
                            <span className="text-[11px] text-[var(--text-primary)] truncate w-full text-center">{app.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Profile / Power Bar */}
            <div className="h-16 border-t border-[var(--surface-glass-border)] bg-[var(--glass-btn-bg)] px-8 flex items-center justify-between rounded-b-xl">
                <div className="flex items-center gap-3 hover:bg-[var(--glass-hover)] p-2 rounded-md transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center overflow-hidden">
                        <Image src="/shreyansh-sahu.jpg" alt="User" width={32} height={32} className="object-cover" />
                    </div>
                    <span className="text-sm text-[var(--text-primary)] font-medium">Shreyansh Sahu</span>
                </div>
                <button className="w-10 h-10 rounded-md hover:bg-[var(--glass-hover)] flex items-center justify-center transition-colors group">
                    <Power size={18} className="text-[var(--text-primary)] group-hover:text-red-500" />
                </button>
            </div>
        </div>
    )
}
