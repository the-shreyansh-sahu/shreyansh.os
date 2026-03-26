'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useBootSequence } from '../../hooks/useBootSequence'

interface BootScreenProps {
    onComplete: () => void
}

export function BootScreen({ onComplete }: BootScreenProps) {
    const { messages, isComplete, skip } = useBootSequence()
    const scrollRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // Auto-scroll log to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Exit animation then call onComplete
    useEffect(() => {
        if (!isComplete) return
        const wrapper = wrapperRef.current
        if (!wrapper) { onComplete(); return }

        gsap.to(wrapper, {
            opacity: 0,
            scale: 1.04,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete,
        })
    }, [isComplete, onComplete])

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#000000] text-white overflow-hidden"
            data-no-theme-transition
        >
            <div className="flex flex-col items-center">
                {/* Windows 11 Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16"
                >
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H48V48H0V0Z" fill="#0078D4" />
                        <path d="M52 0H100V48H52V0Z" fill="#0078D4" />
                        <path d="M0 52H48V100H0V52Z" fill="#0078D4" />
                        <path d="M52 52H100V100H52V52Z" fill="#0078D4" />
                    </svg>
                </motion.div>

                {/* Spinning Dots Animation */}
                {!isComplete && (
                    <div className="relative w-12 h-12">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute top-0 left-1/2 -ml-1 w-1.5 h-1.5 bg-white rounded-full"
                                animate={{
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: [0.4, 0, 0.2, 1],
                                    delay: i * 0.1,
                                    times: [0, 0.5, 1],
                                }}
                                style={{
                                    transformOrigin: "center 24px"
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Subtle skip button */}
            <div className="absolute bottom-12 right-12 opacity-0 hover:opacity-100 transition-opacity duration-500">
                <button
                    onClick={skip}
                    className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/60 border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all"
                >
                    Skip
                </button>
            </div>
        </div>
    )
}
