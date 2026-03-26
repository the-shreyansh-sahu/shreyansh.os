'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useThemeStore } from '../../store/themeStore'
import { getThemeColors } from '../../styles/os-theme'

function Ring({ radius, tube, speed, tiltX, tiltZ, colorKey }: {
    radius: number
    tube: number
    speed: number
    tiltX: number
    tiltZ: number
    colorKey: 'accentPrimary' | 'neonPurple' | 'neonGreen'
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.MeshBasicMaterial>(null)
    const theme = useThemeStore(s => s.theme)

    useEffect(() => {
        if (!materialRef.current) return
        const colors = getThemeColors(theme)
        const hex = parseInt(colors[colorKey].replace('#', ''), 16)
        const target = new THREE.Color(hex)
        gsap.to(materialRef.current.color, {
            r: target.r,
            g: target.g,
            b: target.b,
            duration: 0.5,
        })
    }, [theme, colorKey])

    useFrame(({ clock }) => {
        if (!meshRef.current) return
        meshRef.current.rotation.y = clock.getElapsedTime() * speed
    })

    const colors = getThemeColors(theme)
    const hex = parseInt(colors[colorKey].replace('#', ''), 16)

    return (
        <mesh ref={meshRef} rotation={[tiltX, 0, tiltZ]}>
            <torusGeometry args={[radius, tube, 4, 80]} />
            <meshBasicMaterial
                ref={materialRef}
                color={hex}
                wireframe
                transparent
                opacity={0.35}
            />
        </mesh>
    )
}

function Rings() {
    return (
        <group>
            <Ring radius={1.8} tube={0.01} speed={0.4} tiltX={0.3} tiltZ={0.2} colorKey="accentPrimary" />
            <Ring radius={2.4} tube={0.008} speed={-0.25} tiltX={-0.6} tiltZ={0.5} colorKey="neonPurple" />
            <Ring radius={3.0} tube={0.006} speed={0.18} tiltX={1.2} tiltZ={-0.3} colorKey="neonGreen" />
        </group>
    )
}

interface HoloRingProps {
    className?: string
}

export default function HoloRing({ className }: HoloRingProps) {
    return (
        <div className={className ?? 'w-48 h-48'} data-no-theme-transition>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Rings />
            </Canvas>
        </div>
    )
}
