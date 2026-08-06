'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface OneUiBottomSheetProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
}

export function OneUiBottomSheet({ isOpen, onClose, children, title }: OneUiBottomSheetProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/35 z-[999]"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) onClose()
                        }}
                        className="absolute bottom-0 left-0 right-0 max-h-[85vh] glass-surface rounded-t-[24px] z-[1000] flex flex-col shadow-[0_-8px_32px_rgba(0,0,0,0.15)]"
                    >
                        <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
                            <div className="w-10 h-1 rounded-full bg-[var(--oneui-sheet-handle)]" />
                        </div>
                        {title && (
                            <div className="px-5 pb-3">
                                <h3 className="text-lg font-semibold text-[var(--oneui-text)]">{title}</h3>
                            </div>
                        )}
                        <div className="flex-1 overflow-y-auto px-5 pb-10 select-none">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
