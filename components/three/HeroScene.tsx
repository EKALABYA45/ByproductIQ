'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeroSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

const MORPH_VERTEX = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uMorphPulse;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float dist = distance(uv, vec2(0.5));
    float ripple = sin(dist * 18.0 - uTime * 3.5) * 0.08 * uMorphPulse;
    pos.z += ripple;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const MORPH_FRAGMENT = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;
  uniform float uMorphPulse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    vec2 center = vUv - 0.5;
    float r = length(center);
    float wave = sin(r * 22.0 - uTime * 3.2) * 0.5 + 0.5;
    float mixFactor = clamp(uProgress + (wave - 0.5) * 0.35 * uMorphPulse, 0.0, 1.0);
    vec3 col = mix(uColorA, uColorB, mixFactor);

    float ring = smoothstep(0.49, 0.46, r);
    float innerRing = smoothstep(0.22, 0.25, r);
    float alpha = ring * (0.35 + 0.45 * innerRing);
    gl_FragColor = vec4(col, alpha);
  }
`;

function PlasticBottle({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.9}>
      <group position={position} rotation={[0.3, 0.2, -0.25]}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.95, 10]} />
          <meshStandardMaterial color="#3D7BFF" roughness={0.28} flatShading />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.335, 0.335, 0.34, 10]} />
          <meshStandardMaterial color="#B7E36B" roughness={0.5} flatShading />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.13, 0.31, 0.32, 10]} />
          <meshStandardMaterial color="#3D7BFF" roughness={0.28} flatShading />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.16, 10]} />
          <meshStandardMaterial color="#FF4F9A" roughness={0.4} flatShading />
        </mesh>
      </group>
    </Float>
  );
}

function ScrapTyre({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.2} rotationIntensity={0.7} floatIntensity={0.7}>
      <group position={position} rotation={[0.6, -0.4, 0.2]}>
        <mesh>
          <torusGeometry args={[0.52, 0.2, 8, 16]} />
          <meshStandardMaterial color="#1B2A26" roughness={0.85} flatShading />
        </mesh>
        <mesh>
          <torusGeometry args={[0.32, 0.05, 6, 16]} />
          <meshStandardMaterial color="#FFD23F" roughness={0.4} flatShading />
        </mesh>
      </group>
    </Float>
  );
}

function CardboardBox({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={position} rotation={[0.35, 0.55, 0.15]}>
        <mesh>
          <boxGeometry args={[0.85, 0.65, 0.72]} />
          <meshStandardMaterial color="#C8A26B" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[0, 0.33, 0]}>
          <boxGeometry args={[0.88, 0.04, 0.18]} />
          <meshStandardMaterial color="#FFD23F" roughness={0.4} flatShading />
        </mesh>
      </group>
    </Float>
  );
}

function SodaCan({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.7} rotationIntensity={0.8} floatIntensity={0.95}>
      <group position={position} rotation={[-0.2, 0.4, 0.35]}>
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.72, 12]} />
          <meshStandardMaterial color="#FF4F9A" roughness={0.32} metalness={0.35} flatShading />
        </mesh>
        <mesh position={[0, 0.37, 0]}>
          <cylinderGeometry args={[0.24, 0.26, 0.04, 12]} />
          <meshStandardMaterial color="#F7F7F4" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function EggTray({ position }: { position: [number, number, number] }) {
  const cups = useMemo(
    () => [
      [-0.22, -0.15],
      [0.22, -0.15],
      [-0.22, 0.15],
      [0.22, 0.15],
    ],
    []
  );

  return (
    <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.7}>
      <group position={position} rotation={[0.45, -0.35, -0.2]}>
        <mesh>
          <boxGeometry args={[0.92, 0.1, 0.7]} />
          <meshStandardMaterial color="#C8A26B" roughness={0.9} flatShading />
        </mesh>
        {cups.map(([cx, cz], idx) => (
          <mesh key={idx} position={[cx, 0.1, cz]}>
            <coneGeometry args={[0.16, 0.18, 6]} />
            <meshStandardMaterial color="#B7E36B" roughness={0.7} flatShading />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function CircuitBoard({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.4} rotationIntensity={0.55} floatIntensity={0.8}>
      <group position={position} rotation={[-0.3, 0.2, 0.3]}>
        <mesh>
          <boxGeometry args={[0.92, 0.08, 0.68]} />
          <meshStandardMaterial color="#123D33" roughness={0.45} flatShading />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <boxGeometry args={[0.3, 0.06, 0.3]} />
          <meshStandardMaterial color="#FFD23F" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[-0.28, 0.06, 0.16]}>
          <boxGeometry args={[0.14, 0.06, 0.14]} />
          <meshStandardMaterial color="#B7E36B" roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene({ scrollProgressRef }: HeroSceneProps) {
  const clusterRef = useRef<THREE.Group | null>(null);
  const morphShaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const morphDiscRef = useRef<THREE.Mesh | null>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMorphPulse: { value: 0.6 },
      uColorA: { value: new THREE.Color('#123D33') },
      uColorB: { value: new THREE.Color('#B7E36B') },
    }),
    []
  );

  useFrame((state, delta) => {
    const progress = scrollProgressRef.current;

    if (clusterRef.current) {
      const targetX = state.pointer.x * 0.45;
      const targetY = state.pointer.y * 0.28 - progress * 0.65;
      clusterRef.current.position.x = THREE.MathUtils.lerp(
        clusterRef.current.position.x,
        targetX,
        0.06
      );
      clusterRef.current.position.y = THREE.MathUtils.lerp(
        clusterRef.current.position.y,
        targetY,
        0.06
      );
      clusterRef.current.rotation.y += delta * 0.14;
      clusterRef.current.rotation.x = THREE.MathUtils.lerp(
        clusterRef.current.rotation.x,
        progress * 0.55 - state.pointer.y * 0.15,
        0.06
      );
    }

    if (morphShaderRef.current) {
      morphShaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      morphShaderRef.current.uniforms.uProgress.value = progress;
      morphShaderRef.current.uniforms.uMorphPulse.value =
        0.35 + Math.sin(progress * Math.PI * 3) * 0.65;
    }

    if (morphDiscRef.current) {
      morphDiscRef.current.rotation.z = progress * Math.PI * 0.75;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 4]} intensity={1.35} />
      <directionalLight position={[-4, -3, 3]} intensity={0.6} color="#B7E36B" />

      <group ref={clusterRef}>
        <PlasticBottle position={[-2.6, 1.05, -0.4]} />
        <ScrapTyre position={[2.55, 0.85, -0.2]} />
        <CardboardBox position={[-2.35, -1.15, 0.2]} />
        <SodaCan position={[2.45, -1.05, 0.4]} />
        <EggTray position={[-0.75, 1.55, -0.9]} />
        <CircuitBoard position={[0.9, -1.45, -0.5]} />

        {/* Central GLSL ripple ring reacting to scroll WASTE -> WOW morph */}
        <mesh ref={morphDiscRef} position={[0, 0, -1.4]}>
          <planeGeometry args={[4.4, 4.4, 24, 24]} />
          <shaderMaterial
            ref={morphShaderRef}
            vertexShader={MORPH_VERTEX}
            fragmentShader={MORPH_FRAGMENT}
            uniforms={uniforms}
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}
