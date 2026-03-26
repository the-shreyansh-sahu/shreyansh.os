export interface OSStore {
    platform: 'win11' | 'oneui' | null
    hasBooted: boolean
    isBooting: boolean
    bootProgress: number
}
