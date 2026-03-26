import { useEffect } from 'react'

export function useSwipeBack(onBack: () => void, threshold = 50) {
    useEffect(() => {
        let startX = 0
        let startY = 0

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX
            startY = e.touches[0].clientY
        }

        const handleTouchEnd = (e: TouchEvent) => {
            const endX = e.changedTouches[0].clientX
            const endY = e.changedTouches[0].clientY

            const diffX = endX - startX
            const diffY = Math.abs(endY - startY)

            // Swipe right from the left edge (or just a strong right swipe)
            // Must be mostly horizontal to avoid triggering on scrolls
            if (diffX > threshold && diffY < threshold) {
                onBack()
            }
        }

        window.addEventListener('touchstart', handleTouchStart)
        window.addEventListener('touchend', handleTouchEnd)

        return () => {
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [onBack, threshold])
}
