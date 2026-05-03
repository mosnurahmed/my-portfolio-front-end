"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars, Torus } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Blob() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.25;
    ref.current.rotation.x = mouse.y * 0.4;
    ref.current.position.x = mouse.x * 0.4;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1.45, 96, 96]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#1d0a3a"
          distort={0.45}
          speed={2.2}
          roughness={0.1}
          metalness={0.7}
        />
      </Sphere>
    </Float>
  );
}

function Rings() {
  const g = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!g.current) return;
    g.current.rotation.z = t * 0.15;
    g.current.rotation.x = Math.sin(t * 0.3) * 0.4;
  });
  return (
    <group ref={g}>
      <Torus args={[2.4, 0.012, 16, 200]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} />
      </Torus>
      <Torus args={[3.0, 0.008, 16, 200]} rotation={[Math.PI / 1.8, 0.4, 0]}>
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.4} />
      </Torus>
      <Torus args={[3.6, 0.006, 16, 200]} rotation={[Math.PI / 3, -0.5, 0]}>
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.4} />
      </Torus>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#a78bfa" />
        <directionalLight position={[-5, -3, -2]} intensity={0.8} color="#22d3ee" />
        <Stars
          radius={50}
          depth={30}
          count={2200}
          factor={3}
          fade
          saturation={0}
          speed={0.5}
        />
        <Rings />
        <Blob />
      </Suspense>
    </Canvas>
  );
}
