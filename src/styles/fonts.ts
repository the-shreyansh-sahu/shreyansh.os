import { Inter, JetBrains_Mono } from 'next/font/google'

export const sans = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
})

export const mono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
    weight: ['400', '500', '700'],
})
