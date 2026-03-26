'use client'

import { useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { OneUiWallpaper } from './OneUiWallpaper'
import { OneUiAppIcon } from './OneUiAppIcon'
import { useOneUiStore } from '../../store/oneUiStore'
import { ONE_UI_DOCK_APPS, ONE_UI_LAUNCHER_APPS } from './oneUiManifest'

export function OneUiHomeScreen() {
    const [showDrawerHint, setShowDrawerHint] = useState(false)
    const isJiggling = useOneUiStore((s) => s.isJiggling)
    const setJiggling = useOneUiStore((s) => s.setJiggling)
    const setQuickPanelOpen = useOneUiStore((s) => s.setQuickPanelOpen)

    const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.y > 100) {
            setQuickPanelOpen(true)
        } else if (info.offset.y < -120) {
            setShowDrawerHint(true)
        }
    }

    const handleBgClick = () => {
        if (isJiggling) {
            setJiggling(false)
        }

        setShowDrawerHint(false)
    }

    return (
        <motion.div
            className="relative h-screen overflow-hidden select-none"
            onClick={handleBgClick}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
        >
            <OneUiWallpaper />

            <motion.div
                className="absolute inset-x-0 top-14 px-5"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
                <div className="mb-5 rounded-[2rem] bg-white/14 p-4 text-white backdrop-blur-xl">
                    <div className="text-[12px] font-medium text-white/75">Thursday, 26 March</div>
                    <div className="mt-1 text-[2.85rem] font-semibold tracking-[-0.08em] leading-none">12:48</div>
                    <div className="mt-3 rounded-[1.5rem] bg-black/16 px-4 py-3 text-sm text-white/88">
                        Swipe down anywhere for the quick panel
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-x-3 gap-y-7 px-1">
                    {ONE_UI_LAUNCHER_APPS.map((item) => (
                        <motion.div
                            key={item.app}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } } }}
                        >
                            <OneUiAppIcon app={item.app} label={item.label} icon={item.icon} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="absolute inset-x-4 bottom-[6.75rem] rounded-[2rem] bg-[rgba(246,248,255,0.24)] px-4 py-3 backdrop-blur-[18px] border border-white/18 shadow-[0_18px_36px_rgba(0,0,0,0.16)]">
                <div className="grid grid-cols-4 gap-3">
                    {ONE_UI_DOCK_APPS.map((item) => (
                        <OneUiAppIcon key={item.app} app={item.app} label={item.label} icon={item.icon} />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-[5.7rem] left-1/2 flex -translate-x-1/2 items-center gap-2">
                <span className="h-1.5 w-5 rounded-full bg-white" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
            </div>

            {showDrawerHint ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-x-8 bottom-44 rounded-[1.75rem] bg-black/45 px-5 py-4 text-center text-sm text-white backdrop-blur-xl"
                >
                    The launcher page acts as the app drawer in this build.
                </motion.div>
            ) : null}
        </motion.div>
    )
}
