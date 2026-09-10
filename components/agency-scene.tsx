"use client";

import { Environment, Float, Line, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChangeEvent, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Upload, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type AgencySceneProps = {
  modelUrl: string | null;
  isDark: boolean;
};

function HoneybadgerHead({
  palette,
}: {
  palette: { coral: string; cyan: string; gold: string };
}) {
  const group = useRef<THREE.Group>(null);
  const mouseGroup = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!mouseGroup.current) return;
    mouseGroup.current.rotation.y = THREE.MathUtils.damp(
      mouseGroup.current.rotation.y,
      pointer.x * 0.32,
      4,
      delta,
    );
    mouseGroup.current.rotation.x = THREE.MathUtils.damp(
      mouseGroup.current.rotation.x,
      pointer.y * -0.16,
      4,
      delta,
    );
    mouseGroup.current.position.x = THREE.MathUtils.damp(
      mouseGroup.current.position.x,
      pointer.x * 0.12,
      4,
      delta,
    );
  });

  useEffect(() => {
    if (!group.current) return;

    const context = gsap.context(() => {
      gsap.to(group.current!.rotation, {
        x: 0.4,
        y: Math.PI * 1.5,
        z: -0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".landing-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <group ref={group} position={[0, 0.38, 0]} rotation={[0.06, -0.22, 0.02]}>
      <group ref={mouseGroup}>
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.28}>
          <mesh scale={[1.45, 1.15, 1.1]}>
            <icosahedronGeometry args={[1.1, 3]} />
            <meshStandardMaterial
              color="#16181d"
              roughness={0.72}
              metalness={0.04}
            />
          </mesh>
          <mesh
            position={[-1.02, 0.72, 0]}
            rotation={[0, 0, -0.35]}
            scale={[0.48, 0.62, 0.32]}
          >
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#20242a" roughness={0.8} />
          </mesh>
          <mesh
            position={[-1.02, 0.72, 0.28]}
            rotation={[0, 0, -0.35]}
            scale={[0.27, 0.38, 0.14]}
          >
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#8d4c58" roughness={0.65} />
          </mesh>
          <mesh
            position={[1.02, 0.72, 0.28]}
            rotation={[0, 0, 0.35]}
            scale={[0.27, 0.38, 0.14]}
          >
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#8d4c58" roughness={0.65} />
          </mesh>
          <mesh
            position={[1.02, 0.72, 0]}
            rotation={[0, 0, 0.35]}
            scale={[0.48, 0.62, 0.32]}
          >
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#20242a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.55, 1.02]} scale={[0.33, 0.78, 0.14]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color={palette.gold} roughness={0.62} />
          </mesh>
          <mesh position={[-0.47, 0.14, 0.98]} scale={[0.3, 0.22, 0.13]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#d7d6d0" roughness={0.55} />
          </mesh>
          <mesh position={[0.47, 0.14, 0.98]} scale={[0.3, 0.22, 0.13]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#d7d6d0" roughness={0.55} />
          </mesh>
          <mesh position={[-0.42, 0.25, 1.13]} scale={[0.17, 0.18, 0.08]}>
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial color="#d6d1b9" roughness={0.4} />
          </mesh>
          <mesh position={[0.42, 0.25, 1.13]} scale={[0.17, 0.18, 0.08]}>
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial color="#d6d1b9" roughness={0.4} />
          </mesh>
          <mesh position={[-0.42, 0.25, 1.2]} scale={[0.07, 0.08, 0.05]}>
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial
              color={palette.cyan}
              emissive={palette.cyan}
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[0.42, 0.25, 1.2]} scale={[0.07, 0.08, 0.05]}>
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial
              color={palette.cyan}
              emissive={palette.cyan}
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[0, -0.28, 1.13]} scale={[0.7, 0.36, 0.28]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#d7d6d0" roughness={0.58} />
          </mesh>
          <mesh position={[0, -0.42, 1.42]} scale={[0.18, 0.12, 0.12]}>
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial color="#07080a" roughness={0.3} />
          </mesh>
          <mesh
            position={[0, -0.58, 1.13]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.42, 0.42, 0.1]}
          >
            <torusGeometry args={[1, 0.12, 12, 32, Math.PI]} />
            <meshStandardMaterial color="#050609" roughness={0.45} />
          </mesh>
          <Line
            points={[
              [-0.45, -0.32, 1.2],
              [-1.2, -0.2, 1.12],
              [-1.65, -0.35, 1.03],
            ]}
            color={palette.gold}
            lineWidth={0.7}
            transparent
            opacity={0.55}
          />
          <Line
            points={[
              [0.45, -0.32, 1.2],
              [1.2, -0.2, 1.12],
              [1.65, -0.35, 1.03],
            ]}
            color={palette.gold}
            lineWidth={0.7}
            transparent
            opacity={0.55}
          />
          <Line
            points={[
              [-0.42, -0.42, 1.2],
              [-1.08, -0.58, 1.08],
              [-1.5, -0.8, 1.01],
            ]}
            color={palette.gold}
            lineWidth={0.7}
            transparent
            opacity={0.45}
          />
          <Line
            points={[
              [0.42, -0.42, 1.2],
              [1.08, -0.58, 1.08],
              [1.5, -0.8, 1.01],
            ]}
            color={palette.gold}
            lineWidth={0.7}
            transparent
            opacity={0.45}
          />
          <mesh position={[0, -1.02, 1.15]}>
            <cylinderGeometry args={[0.025, 0.025, 0.9, 10]} />
            <meshStandardMaterial
              color={palette.coral}
              emissive={palette.coral}
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[0, -1.56, 1.15]}>
            <cylinderGeometry args={[0.22, 0.16, 0.22, 20]} />
            <meshStandardMaterial color="#b8a58e" roughness={0.5} />
          </mesh>
          <mesh position={[0, -1.97, 1.15]} scale={[0.42, 0.54, 0.42]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial
              color={palette.coral}
              emissive={palette.coral}
              emissiveIntensity={2.2}
              transparent
              opacity={0.92}
            />
          </mesh>
          <pointLight
            position={[0, -1.95, 1.25]}
            color={palette.coral}
            intensity={3.5}
            distance={4}
          />
        </Float>
      </group>
    </group>
  );
}

function UploadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const model = scene.clone();

  return <primitive object={model} scale={1.65} position={[0, -1.1, 0]} />;
}

function StageContent({ modelUrl, isDark }: AgencySceneProps) {
  const palette = isDark
    ? { coral: "#ff1493", cyan: "#00e5ff", gold: "#f6e9db" }
    : { coral: "#f32198", cyan: "#00b9d4", gold: "#151515" };

  return (
    <>
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 4, 5]} intensity={3} color="#fff7e8" />
      <pointLight position={[-3, -2, 2]} intensity={2} color={palette.cyan} />
      <Suspense fallback={null}>
        {modelUrl ? (
          <UploadedModel url={modelUrl} />
        ) : (
          <HoneybadgerHead palette={palette} />
        )}
        <Environment preset="city" background={false} />
      </Suspense>
    </>
  );
}

export function AgencyScene({ modelUrl, isDark }: AgencySceneProps) {
  return (
    <div className="agency-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 1.5]}>
        <StageContent modelUrl={modelUrl} isDark={isDark} />
      </Canvas>
    </div>
  );
}

export function ModelDropzone({
  onModelChange,
}: {
  onModelChange: (url: string | null, name: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [modelName, setModelName] = useState<string | null>(null);

  useEffect(
    () => () => {
      onModelChange(null, null);
    },
    [onModelChange],
  );

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setModelName(file.name);
    onModelChange(url, file.name);
  }

  function clearModel() {
    setModelName(null);
    onModelChange(null, null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="model-loader">
      <input
        ref={inputRef}
        type="file"
        accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
        onChange={handleFile}
      />
      {modelName ? (
        <button className="model-file" type="button" onClick={clearModel}>
          <span>{modelName}</span>
          <X size={14} aria-hidden="true" />
        </button>
      ) : (
        <button
          className="model-upload"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={15} aria-hidden="true" />
          Load a 3D file
        </button>
      )}
      <span className="model-hint">GLB or GLTF · preview it in the hero</span>
    </div>
  );
}
