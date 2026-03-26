export const DARK_COLORS = {
    surfaceBase: '#0a0a0f',
    surfaceElevated: '#111118',
    accentPrimary: '#4fc3f7',
    accentWin11Blue: '#0078d4',
    neonBlue: '#00b4ff',
    neonPurple: '#9c6fff',
    neonGreen: '#00ff88',
}

export const LIGHT_COLORS = {
    surfaceBase: '#f0eff4',
    surfaceElevated: '#ffffff',
    accentPrimary: '#0078d4',
    accentWin11Blue: '#0078d4',
    neonBlue: '#0099cc',
    neonPurple: '#7b2fbf',
    neonGreen: '#00b860',
}

export function getThemeColors(theme: 'dark' | 'light') {
    return theme === 'dark' ? DARK_COLORS : LIGHT_COLORS
}

export const radius = {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    pill: '999px',
    circle: '50%',
}
