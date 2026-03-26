import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { Skill } from '../../data/skills'
import { useThemeStore } from '../../store/themeStore'
import { getThemeColors } from '../../styles/os-theme'

function Bar({ skill, index, total }: { skill: Skill, index: number, total: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<THREE.MeshBasicMaterial>(null)
    const theme = useThemeStore(s => s.theme)

    const angle = (index / total) * Math.PI * 2
    const maxRadius = 1.6
    const targetRadius = (skill.level / 100) * maxRadius

    useEffect(() => {
        if (!materialRef.current) return
        const colors = getThemeColors(theme)
        const hex = parseInt(colors.accentPrimary.replace('#', ''), 16)
        const c = new THREE.Color(hex)
        gsap.to(materialRef.current.color, { r: c.r, g: c.g, b: c.b, duration: 0.5 })
    }, [theme])

    // Animate bar height on mount
    useEffect(() => {
        if (!meshRef.current) return
        meshRef.current.scale.y = 0
        gsap.to(meshRef.current.scale, { y: 1, duration: 0.8, delay: index * 0.08, ease: 'power2.out' })
    }, [index])

    const colors = getThemeColors(theme)
    const hex = parseInt(colors.accentPrimary.replace('#', ''), 16)

    const x = Math.cos(angle) * (targetRadius / 2 + 0.05)
    const z = Math.sin(angle) * (targetRadius / 2 + 0.05)
    const barLength = Math.max(targetRadius, 0.05)

    return (
        <mesh ref={meshRef} position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
            <boxGeometry args={[0.05, 0.04, barLength]} />
            <meshBasicMaterial ref={materialRef} color={hex} transparent opacity={0.85} />
        </mesh>
    )
}

function SpiderWeb({ segments }: { segments: number }) {
    const theme = useThemeStore(s => s.theme)
    const colors = getThemeColors(theme)

    const lines = useMemo(() => {
        const rings = [0.4, 0.8, 1.2, 1.6]
        const result: React.ReactElement[] = []
        rings.forEach((r, ri) => {
            const pts: THREE.Vector3[] = []
            for (let i = 0; i <= segments; i++) {
                const a = (i / segments) * Math.PI * 2
                pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r))
            }
            const geo = new THREE.BufferGeometry().setFromPoints(pts)
            result.push(
                <line key={`ring-${ri}`}>
                    <bufferGeometry attach="geometry" {...geo} />
                    <lineBasicMaterial color={colors.accentPrimary} transparent opacity={0.15} />
                </line>
            )
        })
        // Spokes
        for (let i = 0; i < segments; i++) {
            const a = (i / segments) * Math.PI * 2
            const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 1.6, 0, Math.sin(a) * 1.6)]
            const geo = new THREE.BufferGeometry().setFromPoints(pts)
            result.push(
                <line key={`spoke-${i}`}>
                    <bufferGeometry attach="geometry" {...geo} />
                    <lineBasicMaterial color={colors.accentPrimary} transparent opacity={0.1} />
                </line>
            )
        }
        return result
    }, [segments, colors.accentPrimary])

    return <group>{lines}</group>
}

function Scene({ skills }: { skills: Skill[] }) {
    const groupRef = useRef<THREE.Group>(null)
    useFrame(({ clock }) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.15
    })

    return (
        <group ref={groupRef} rotation={[-Math.PI / 4, 0, 0]}>
            <SpiderWeb segments={skills.length} />
            {skills.map((s, i) => (
                <Bar key={s.name} skill={s} index={i} total={skills.length} />
            ))}
        </group>
    )
}

interface RadarChart3DProps {
    skills: Skill[]
    className?: string
}

export default function RadarChart3D({ skills, className }: RadarChart3DProps) {
    return (
        <div className={className ?? 'w-full h-64'} data-no-theme-transition>
            <Canvas
                camera={{ position: [0, 2.5, 3.5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene skills={skills} />
            </Canvas>
        </div>
    )
}
