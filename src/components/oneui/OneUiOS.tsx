'use client'

import { AppRouter } from '../apps/AppRouter'
import { useSwipeBack } from '../../hooks/useSwipeBack'
import { useOneUiStore } from '../../store/oneUiStore'
import { OneUiAppView } from './OneUiAppView'
import { OneUiHomeScreen } from './OneUiHomeScreen'
import { OneUiNavBar } from './OneUiNavBar'
import { OneUiQuickPanel } from './OneUiQuickPanel'
import { OneUiRecents } from './OneUiRecents'
import { OneUiStatusBar } from './OneUiStatusBar'

export function OneUiOS() {
    const goBack = useOneUiStore((s) => s.goBack)
    const routeStack = useOneUiStore((s) => s.routeStack)
    const activeRoute = routeStack.length > 0 ? routeStack[routeStack.length - 1] : null

    useSwipeBack(() => {
        goBack()
    })

    return (
        <div className="relative mx-auto h-full w-full overflow-hidden bg-black sm:mt-10 sm:h-[850px] sm:max-w-[430px] sm:rounded-[3.2rem] sm:border-[10px] sm:border-[#0c0d10] sm:shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <div className="absolute left-1/2 top-0 z-[99999] hidden h-7 w-40 -translate-x-1/2 rounded-b-[1.35rem] bg-black sm:block" />

            <OneUiHomeScreen />

            <div className="absolute inset-0 z-[200] pointer-events-none">
                <OneUiAppView route={activeRoute}>
                    {activeRoute ? (
                        <AppRouter app={activeRoute.app} isMobile props={activeRoute.props} />
                    ) : null}
                </OneUiAppView>
            </div>

            <div className="absolute inset-0 z-[320] pointer-events-none">
                <OneUiStatusBar />
                <OneUiNavBar />
            </div>

            <OneUiQuickPanel />
            <OneUiRecents />
        </div>
    )
}
