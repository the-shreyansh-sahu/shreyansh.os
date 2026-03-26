'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '../../lib/cn'

export function Win11Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Hide default cursor on desktop, but be careful not to break mobile touch
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
            document.body.style.cursor = 'none'
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!cursorRef.current) return
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, // Slight latency for smoothness
                ease: 'power3.out'
            })

            // Determine if hovering over clickable element
            const target = e.target as HTMLElement
            const isClickable = target.closest('button, a, input, [role="button"], .cursor-pointer') !== null

            if (isClickable) {
                gsap.to(cursorRef.current, { scale: 1.5, duration: 0.2 })
            } else {
                gsap.to(cursorRef.current, { scale: 1, duration: 0.2 })
            }
        }

        const onMouseDown = () => {
            if (cursorRef.current) gsap.to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        }
        const onMouseUp = () => {
            if (cursorRef.current) gsap.to(cursorRef.current, { scale: 1, duration: 0.1 })
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mouseup', onMouseUp)

        return () => {
            document.body.style.cursor = ''
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [])

    return (
        <div
            ref={cursorRef}
            className={cn(
                "fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[999999] opacity-0 md:opacity-100",
                "border-2 border-[var(--text-primary)] mix-blend-difference",
                "transform -translate-x-1/2 -translate-y-1/2" // Center cursor on point
            )}
        />
    )
}
