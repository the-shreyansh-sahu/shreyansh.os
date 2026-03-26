'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { WindowInstance } from '../../types/window'
import { useWindowStore } from '../../store/windowStore'
import { WindowTitleBar } from './WindowTitleBar'
import { cn } from '../../lib/cn'
import { SPRING } from '../../lib/spring-config'

interface WindowProps {
    window: WindowInstance
    children?: React.ReactNode
}

const RESIZE_HANDLE_SIZE = 10
const SNAP_THRESHOLD = 15

type DragMode = 'move' | 'resize-e' | 'resize-s' | 'resize-se' | null
type SnapPreset = 'left' | 'right' | 'maximize' | null
type WindowRect = { x: number; y: number; width: number; height: number }

export function Window({ window: win, children }: WindowProps) {
    const { id, title, isMaximized, isMinimized, isFocused, x, y, width, height, zIndex } = win
    const containerRef = useRef<HTMLDivElement>(null)

    const focusWindow = useWindowStore(s => s.focusWindow)
    const updatePosition = useWindowStore(s => s.updatePosition)
    const updateSize = useWindowStore(s => s.updateSize)
    const maximizeWindow = useWindowStore(s => s.maximizeWindow)

    // -- Interaction Logic --
    const dragMode = useRef<DragMode>(null)
    const dragStart = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0, winW: 0, winH: 0 })
    const frameRef = useRef<number | null>(null)
    const pendingRectRef = useRef<WindowRect | null>(null)
    const pointerCaptureRef = useRef<{ target: Element; pointerId: number } | null>(null)

    // Snap preview state
    const [snapPreview, setSnapPreview] = useState<SnapPreset>(null)
    const [isInteracting, setIsInteracting] = useState(false)
    const [liveRect, setLiveRect] = useState<WindowRect | null>(null)

    const startDrag = useCallback((e: React.PointerEvent, mode: DragMode) => {
        if (isMaximized) return
        dragMode.current = mode
        dragStart.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            winX: x,
            winY: y,
            winW: width,
            winH: height,
        }
        setIsInteracting(true)
        setLiveRect({ x, y, width, height })
        if (e.currentTarget instanceof Element) {
            e.currentTarget.setPointerCapture(e.pointerId)
            pointerCaptureRef.current = {
                target: e.currentTarget,
                pointerId: e.pointerId,
            }
        }
        focusWindow(id)
        document.body.style.userSelect = 'none'
    }, [id, isMaximized, x, y, width, height, focusWindow])

    const handleTitlePointerDown = useCallback((e: React.PointerEvent) => {
        startDrag(e, 'move')
    }, [startDrag])

    const handlePointerMove = useCallback((e: PointerEvent) => {
        if (!dragMode.current) return

        const dx = e.clientX - dragStart.current.mouseX
        const dy = e.clientY - dragStart.current.mouseY
        let nextRect: WindowRect | null = null

        if (dragMode.current === 'move') {
            const newX = dragStart.current.winX + dx
            const newY = dragStart.current.winY + dy
            nextRect = {
                x: newX,
                y: newY,
                width: dragStart.current.winW,
                height: dragStart.current.winH,
            }

            // Detect edge snaps
            if (e.clientY <= SNAP_THRESHOLD) {
                setSnapPreview('maximize')
            } else if (e.clientX <= SNAP_THRESHOLD) {
                setSnapPreview('left')
            } else if (e.clientX >= window.innerWidth - SNAP_THRESHOLD) {
                setSnapPreview('right')
            } else {
                setSnapPreview(null)
            }
        } else {
            let newW = dragStart.current.winW
            let newH = dragStart.current.winH

            if (dragMode.current === 'resize-e' || dragMode.current === 'resize-se') {
                newW = Math.max(300, dragStart.current.winW + dx)
            }
            if (dragMode.current === 'resize-s' || dragMode.current === 'resize-se') {
                newH = Math.max(200, dragStart.current.winH + dy)
            }
            nextRect = {
                x: dragStart.current.winX,
                y: dragStart.current.winY,
                width: newW,
                height: newH,
            }
        }

        if (!nextRect) return

        pendingRectRef.current = nextRect
        if (frameRef.current !== null) return

        frameRef.current = window.requestAnimationFrame(() => {
            frameRef.current = null
            if (pendingRectRef.current) {
                setLiveRect(pendingRectRef.current)
            }
        })
    }, [])

    const finishInteraction = useCallback(() => {
        dragMode.current = null
        pendingRectRef.current = null
        if (pointerCaptureRef.current) {
            const { target, pointerId } = pointerCaptureRef.current
            if (target.hasPointerCapture(pointerId)) {
                target.releasePointerCapture(pointerId)
            }
            pointerCaptureRef.current = null
        }
        if (frameRef.current !== null) {
            window.cancelAnimationFrame(frameRef.current)
            frameRef.current = null
        }
        setIsInteracting(false)
        setLiveRect(null)
        setSnapPreview(null)
        document.body.style.userSelect = ''
    }, [])

    const handlePointerUp = useCallback(() => {
        const mode = dragMode.current
        const rect = pendingRectRef.current ?? liveRect ?? { x, y, width, height }

        if (mode === 'move' && snapPreview) {
            // Apply snap
            if (snapPreview === 'maximize') {
                maximizeWindow(id)
            } else if (snapPreview === 'left') {
                updatePosition(id, 0, 0)
                updateSize(id, window.innerWidth / 2, window.innerHeight - 48)
            } else if (snapPreview === 'right') {
                updatePosition(id, window.innerWidth / 2, 0)
                updateSize(id, window.innerWidth / 2, window.innerHeight - 48)
            }
        } else if (mode === 'move') {
            updatePosition(id, rect.x, rect.y)
        } else if (mode) {
            updateSize(id, rect.width, rect.height)
        }

        finishInteraction()
    }, [finishInteraction, height, id, liveRect, maximizeWindow, snapPreview, updatePosition, updateSize, width, x, y])

    useEffect(() => {
        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', handlePointerUp)
        window.addEventListener('pointercancel', handlePointerUp)
        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('pointercancel', handlePointerUp)
            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current)
            }
        }
    }, [handlePointerMove, handlePointerUp])

    // -- Render --
    if (isMinimized) return null

    const currentRect = liveRect ?? { x, y, width, height }

    return (
        <>
            {/* Snap Preview Overlay */}
            {snapPreview && (
                <div
                    className={cn(
                        "absolute z-[9990] glass-surface rounded-xl transition-all duration-200 pointer-events-none hidden md:block opacity-60",
                        snapPreview === 'maximize' ? "top-2 left-2 right-2 bottom-[56px]" :
                            snapPreview === 'left' ? "top-2 left-2 bottom-[56px] w-[calc(50%-12px)]" :
                                snapPreview === 'right' ? "top-2 right-2 bottom-[56px] w-[calc(50%-12px)]" : ""
                    )}
                />
            )}

            <motion.div
                ref={containerRef}
                onPointerDown={() => focusWindow(id)}
                className={cn(
                    "absolute flex flex-col overflow-hidden shadow-2xl pointer-events-auto",
                    "glass-surface",
                    isMaximized ? "rounded-none" : "rounded-xl",
                    isFocused ? "shadow-[0_0_40px_rgba(0,0,0,0.4)]" : "shadow-[0_0_20px_rgba(0,0,0,0.2)] opacity-95"
                )}
                initial={{ opacity: 0, scale: 0.95, y: y + 20 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                transition={isInteracting ? { duration: 0 } : SPRING.bouncy}
                style={
                    isMaximized && !isInteracting
                        ? { zIndex, left: 0, top: 0, width: '100%', height: 'calc(100vh - 48px)' }
                        : { zIndex, left: currentRect.x, top: currentRect.y, width: currentRect.width, height: currentRect.height }
                }
            >
                <WindowTitleBar
                    id={id}
                    app={win.app}
                    title={title}
                    isMaximized={isMaximized}
                    isFocused={isFocused}
                    onPointerDown={handleTitlePointerDown}
                />
                <div className="flex-1 overflow-auto relative">
                    {children || <div className="p-4 text-sm font-sans text-[var(--text-primary)]">App Content: {title}</div>}
                </div>

                {/* Resize Handles */}
                {!isMaximized && (
                    <>
                        <div
                            onPointerDown={(e) => startDrag(e, 'resize-e')}
                            className="absolute top-0 bottom-0 right-0 cursor-ew-resize z-50"
                            style={{ width: RESIZE_HANDLE_SIZE }}
                        />
                        <div
                            onPointerDown={(e) => startDrag(e, 'resize-s')}
                            className="absolute bottom-0 left-0 right-0 cursor-ns-resize z-50"
                            style={{ height: RESIZE_HANDLE_SIZE }}
                        />
                        <div
                            onPointerDown={(e) => startDrag(e, 'resize-se')}
                            className="absolute bottom-0 right-0 cursor-nwse-resize z-50"
                            style={{ width: RESIZE_HANDLE_SIZE, height: RESIZE_HANDLE_SIZE }}
                        />
                    </>
                )}
            </motion.div>
        </>
    )
}
