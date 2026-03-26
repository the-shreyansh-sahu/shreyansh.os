export type AppType = 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'resume' | 'terminal' | 'project-detail'

export interface WindowInstance {
    id: string
    app: AppType
    title: string
    isOpen: boolean
    isMinimized: boolean
    isMaximized: boolean
    isFocused: boolean
    x: number
    y: number
    width: number
    height: number
    zIndex: number
    props?: Record<string, unknown>
}
