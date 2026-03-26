'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;

float scanline(vec2 uv, float t) {
  float line = sin(uv.y * 120.0 - t * 12.0) * 0.5 + 0.5;
  return pow(line, 12.0);
}

float glow(vec2 uv) {
  vec2 c = uv - 0.5;
  return 1.0 - smoothstep(0.0, 0.5, length(c));
}

void main() {
  vec2 uv = vUv;

  // CRT scanlines
  float scan = scanline(uv, uTime) * 0.18;

  // Horizontal warp
  float wave = sin(uv.y * 40.0 + uTime * 3.0) * 0.004;
  uv.x += wave;

  // Center glow
  float g = glow(uv) * 0.6;

  // Random flicker
  float flicker = sin(uTime * 60.0) * 0.02 + 0.98;

  vec3 col = uColor * (g + scan) * flicker;
  gl_FragColor = vec4(col, uOpacity * (g + scan * 0.5) * flicker);
}
`

function ShaderPlane() {
    const matRef = useRef<THREE.ShaderMaterial>(null)

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#4fc3f7') },
        uOpacity: { value: 0.85 },
    }), [])

    useFrame(({ clock }) => {
        if (matRef.current) {
            matRef.current.uniforms.uTime.value = clock.getElapsedTime()
        }
    })

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={matRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
            />
        </mesh>
    )
}

interface BootShaderProps {
    className?: string
}

export default function BootShader({ className }: BootShaderProps) {
    return (
        <div className={className ?? 'absolute inset-0'} data-no-theme-transition>
            <Canvas
                camera={{ position: [0, 0, 1], fov: 60 }}
                dpr={[1, 1]}
                gl={{ antialias: false, alpha: true }}
                flat
            >
                <ShaderPlane />
            </Canvas>
        </div>
    )
}
