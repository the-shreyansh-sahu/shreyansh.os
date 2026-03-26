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
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 z-[999]"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y > 100) onClose()
                        }}
                        className="absolute bottom-0 left-0 right-0 max-h-[90vh] glass-surface rounded-t-[2rem] z-[1000] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
                    >
                        {/* Drag Handle */}
                        <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing">
                            <div className="w-12 h-1.5 rounded-full bg-[var(--text-muted)] opacity-50" />
                        </div>

                        {title && (
                            <div className="px-6 pb-4">
                                <h3 className="text-xl font-bold font-sans text-[var(--text-primary)]">{title}</h3>
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-6 pb-12 font-sans select-none">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
