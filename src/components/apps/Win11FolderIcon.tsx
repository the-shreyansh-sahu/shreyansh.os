'use client'

import React from 'react'
import { cn } from '../../lib/cn'

interface Win11FolderIconProps {
    className?: string
    letter?: string
    isLive?: boolean
}

export function Win11FolderIcon({ className, letter, isLive }: Win11FolderIconProps) {
    return (
        <div className={cn("relative w-full h-full group/folder", className)}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                {/* Back side of folder */}
                <path
                    d="M2 8.5C2 7.11929 3.11929 6 4.5 6H12.5L14.5 9H27.5C28.8807 9 30 10.1193 30 11.5V23.5C30 24.8807 28.8807 26 27.5 26H4.5C3.11929 26 2 24.8807 2 23.5V8.5Z"
                    fill="url(#folder_body_grad)"
                />
                {/* Front flap with 3D shadow */}
                <path
                    d="M2 13.5C2 12.1193 3.11929 11 4.5 11H27.5C28.8807 11 30 12.1193 30 13.5V23.5C30 24.8807 28.8807 26 27.5 26H4.5C3.11929 26 2 24.8807 2 23.5V13.5Z"
                    fill="url(#folder_front_grad)"
                    className="drop-shadow-[0_-1px_2px_rgba(0,0,0,0.1)]"
                />

                <defs>
                    <linearGradient id="folder_body_grad" x1="2" y1="6" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F8D349" />
                        <stop offset="1" stopColor="#E9B222" />
                    </linearGradient>
                    <linearGradient id="folder_front_grad" x1="2" y1="11" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFE066" />
                        <stop offset="1" stopColor="#F5C024" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Overlay Letter/Icon - Centered inside the front pocket-ish area */}
            {letter && (
                <div className="absolute inset-0 flex items-center justify-center pt-2 select-none">
                    <span className="text-[11px] font-bold text-amber-900/30">
                        {letter}
                    </span>
                </div>
            )}

            {/* Live Badge - Green Dot */}
            {isLive && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-[1.5px] border-white dark:border-black shadow-sm z-10" />
            )}
        </div>
    )
}
