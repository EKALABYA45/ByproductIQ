'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import styles from './ShaderImageHover.module.scss';

const RIPPLE_VERTEX = `
  varying vec2 vUv;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float d = distance(uv, uMouse);
    float wave = sin(d * 22.0 - uTime * 7.5) * exp(-d * 4.5);
    pos.z += wave * 0.08 * uHover;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const RIPPLE_FRAGMENT = `
  varying vec2 vUv;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    float d = distance(vUv, uMouse);
    float ring = sin(d * 28.0 - uTime * 8.0) * exp(-d * 4.2);
    float glow = smoothstep(0.45, 0.0, d) * 0.55;
    vec3 col = mix(uColorA, uColorB, clamp(ring * 0.5 + 0.5, 0.0, 1.0));
    float alpha = clamp((abs(ring) * 0.6 + glow) * uHover, 0.0, 0.72);
    gl_FragColor = vec4(col, alpha);
  }
`;

function ActiveRippleCanvas({
  mousePos,
  colors,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  colors: [string, string];
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const colorPair = useMemo(
    () => [new THREE.Color(colors[0]), new THREE.Color(colors[1])],
    [colors]
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    host.appendChild(renderer.domElement);

    const uniforms = {
      uMouse: { value: new THREE.Vector2(mousePos.current.x, mousePos.current.y) },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uColorA: { value: colorPair[0] },
      uColorB: { value: colorPair[1] },
    };

    const geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
    const material = new THREE.ShaderMaterial({
      vertexShader: RIPPLE_VERTEX,
      fragmentShader: RIPPLE_FRAGMENT,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, 1, 0.14);
      uniforms.uMouse.value.lerp(
        new THREE.Vector2(mousePos.current.x, mousePos.current.y),
        0.2
      );
      renderer?.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [colorPair, mousePos]);

  return <div ref={hostRef} className={styles.shaderCanvas} aria-hidden="true" />;
}

export function ShaderImageHover({
  children,
  colors = ['#B7E36B', '#FF4F9A'],
}: {
  children: React.ReactNode;
  colors?: [string, string];
}) {
  const { reducedMotion } = useSmoothScroll();
  const [hovered, setHovered] = useState(false);
  const [canShader, setCanShader] = useState(false);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const frame = window.requestAnimationFrame(() => {
      setCanShader(fine && !reducedMotion);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    mousePos.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: 1 - (e.clientY - rect.top) / rect.height,
    };
  };

  return (
    <div
      className={styles.wrapper}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      {children}
      {canShader && hovered && (
        <ActiveRippleCanvas mousePos={mousePos} colors={colors} />
      )}
    </div>
  );
}
