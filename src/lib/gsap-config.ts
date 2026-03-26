import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { Flip } from 'gsap/Flip'

export function registerGSAP() {
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(TextPlugin, Flip)
    }
}

export const EASE = {
    win11Open: 'power3.out',
    win11Close: 'power2.in',
    smooth: 'power2.inOut',
    boot: 'power1.inOut',
    elastic: 'elastic.out(1, 0.5)',
}

export const DUR = {
    micro: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    dramatic: 1.0,
}
