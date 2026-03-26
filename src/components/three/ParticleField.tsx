'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useThemeStore } from '../../store/themeStore'
import { getThemeColors } from '../../styles/os-theme'

const PARTICLE_COUNT = 2500

function Particles() {
    const pointsRef = useRef<THREE.Points>(null)
    const theme = useThemeStore(s => s.theme)
    const mouse = useRef({ x: 0, y: 0 })

    // Build geometry once — use THREE objects directly for full compatibility
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry()
        const positions = new Float32Array(PARTICLE_COUNT * 3)
        const sizes = new Float32Array(PARTICLE_COUNT)
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10
            sizes[i] = Math.random() * 2 + 0.5
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
        return geo
    }, [])

    const material = useMemo(() => {
        const colors = getThemeColors('dark')
        const hex = parseInt(colors.accentPrimary.replace('#', ''), 16)
        return new THREE.PointsMaterial({
            color: hex,
            size: 0.04,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.6,
        })
    }, [])

    // Theme-driven color tween
    useEffect(() => {
        const colors = getThemeColors(theme)
        const hex = parseInt(colors.accentPrimary.replace('#', ''), 16)
        const target = new THREE.Color(hex)
        gsap.to(material.color, {
            r: target.r,
            g: target.g,
            b: target.b,
            duration: 0.5,
        })
        material.opacity = theme === 'dark' ? 0.6 : 0.35
    }, [theme, material])

    // Mouse tracking
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', onMouseMove)
        return () => window.removeEventListener('mousemove', onMouseMove)
    }, [])

    useFrame(({ clock }) => {
        if (!pointsRef.current) return
        const t = clock.getElapsedTime()
        pointsRef.current.rotation.y = t * 0.03 + mouse.current.x * 0.05
        pointsRef.current.rotation.x = t * 0.015 + mouse.current.y * 0.03
    })

    return <points ref={pointsRef} geometry={geometry} material={material} />
}

export default function ParticleField() {
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            data-no-theme-transition
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
            >
                <Particles />
            </Canvas>
        </div>
    )
}
