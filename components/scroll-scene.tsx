"use client";

import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function OrbitingForms() {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!group.current) return;

    const context = gsap.context(() => {
      gsap.to(group.current!.rotation, {
        x: 0.55,
        y: Math.PI * 2,
        z: -0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".scene-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <group ref={group} rotation={[0.18, -0.4, 0.08]}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.55}>
        <mesh position={[-1.35, 0.35, 0]} rotation={[0.2, 0.4, -0.25]}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color="#f5a18c"
            roughness={0.28}
            metalness={0.08}
          />
        </mesh>
      </Float>
      <mesh position={[0.25, -0.15, 0.4]} rotation={[0.4, 0.5, 0.15]}>
        <torusGeometry args={[1.1, 0.24, 24, 80]} />
        <meshStandardMaterial
          color="#dceee0"
          roughness={0.2}
          metalness={0.12}
        />
      </mesh>
      <mesh position={[1.45, 0.45, -0.2]} rotation={[0.25, -0.4, 0.3]}>
        <boxGeometry args={[0.95, 0.95, 0.95]} />
        <MeshTransmissionMaterial
          color="#b7d5e3"
          thickness={0.45}
          roughness={0.18}
          transmission={0.7}
          ior={1.3}
        />
      </mesh>
      <mesh position={[0, 0.1, -1.2]} rotation={[0.2, 0.3, 0]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color="#f7d58a" roughness={0.35} />
      </mesh>
    </group>
  );
}

export function ScrollScene() {
  return (
    <section className="scene-section" aria-label="Studio motion study">
      <div className="scene-copy">
        <p className="eyebrow">MOTION STUDY 01</p>
        <h2>Make room for the unexpected.</h2>
        <p>
          Scroll to move through a small study in form, color, and momentum.
        </p>
      </div>
      <div className="scene-canvas" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 1.5]}>
          <ambientLight intensity={1.5} />
          <directionalLight
            position={[3, 4, 5]}
            intensity={3}
            color="#fff7e8"
          />
          <pointLight position={[-3, -2, 2]} intensity={2} color="#b7d5e3" />
          <OrbitingForms />
        </Canvas>
      </div>
    </section>
  );
}
