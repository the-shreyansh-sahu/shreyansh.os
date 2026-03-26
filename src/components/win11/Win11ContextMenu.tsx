'use client'

import { useEffect, useRef } from 'react'

interface Win11ContextMenuProps {
    x: number
    y: number
    isOpen: boolean
    onClose: () => void
}

export function Win11ContextMenu({ x, y, isOpen, onClose }: Win11ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    // Ensure menu stays within bounds
    const safeX = typeof window !== 'undefined' ? Math.min(x, window.innerWidth - 250) : x
    const safeY = typeof window !== 'undefined' ? Math.min(y, window.innerHeight - 300) : y

    return (
        <div
            ref={menuRef}
            className="absolute glass-surface rounded-xl shadow-2xl p-1 w-[250px] z-[99999] flex flex-col gap-1 border border-white/10 font-sans pointer-events-auto"
            style={{ top: safeY, left: safeX }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <button className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-white/10 rounded-md transition-colors" onClick={onClose}>
                View {'>'}
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-white/10 rounded-md transition-colors" onClick={onClose}>
                Sort by {'>'}
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-white/10 rounded-md transition-colors" onClick={() => { window.location.reload(); onClose(); }}>
                Refresh
            </button>
            <div className="h-px bg-[var(--surface-glass-border)] my-1 mx-2" />
            <button className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-white/10 rounded-md transition-colors" onClick={onClose}>
                Personalize
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-white/10 rounded-md transition-colors" onClick={onClose}>
                Display settings
            </button>
        </div>
    )
}
