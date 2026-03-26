'use client'

import { useState, useEffect, useCallback } from 'react'
import { BOOT_MESSAGES } from '../data/boot-messages'

export type BootMessage = typeof BOOT_MESSAGES[number]

interface UseBootSequenceReturn {
    messages: BootMessage[]
    isComplete: boolean
    skip: () => void
}

const MESSAGE_DELAY = 80   // ms between each message
const COMPLETE_DELAY = 600 // ms after last message before auto-complete

export function useBootSequence(): UseBootSequenceReturn {
    const [messages, setMessages] = useState<BootMessage[]>([])
    const [isComplete, setIsComplete] = useState(false)
    const [skipped, setSkipped] = useState(false)

    const skip = useCallback(() => {
        setSkipped(true)
        setMessages(BOOT_MESSAGES)
        setTimeout(() => setIsComplete(true), 300)
    }, [])

    useEffect(() => {
        if (skipped) return

        let idx = 0
        let timer: ReturnType<typeof setTimeout>

        const showNext = () => {
            if (skipped) return
            if (idx >= BOOT_MESSAGES.length) {
                timer = setTimeout(() => {
                    if (!skipped) setIsComplete(true)
                }, COMPLETE_DELAY)
                return
            }
            const nextMsg = BOOT_MESSAGES[idx]
            if (nextMsg) {
                setMessages(prev => [...prev, nextMsg])
            }
            idx++
            timer = setTimeout(showNext, MESSAGE_DELAY)
        }

        // Small delay before starting for dramatic effect
        timer = setTimeout(showNext, 400)
        return () => clearTimeout(timer)
    }, [skipped])

    return { messages, isComplete, skip }
}
