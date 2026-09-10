"use client";

import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChangeEvent, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Upload, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type AgencySceneProps = {
  modelUrl: string | null;
};

function DefaultForms() {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!group.current) return;

    const context = gsap.context(() => {
      gsap.to(group.current!.rotation, {
        x: 0.4,
        y: Math.PI * 1.5,
        z: -0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".agency-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <group ref={group} rotation={[0.18, -0.4, 0.08]}>
      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.55}>
        <mesh position={[-1.35, 0.35, 0]} rotation={[0.2, 0.4, -0.25]}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color="#e87b63"
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
          color="#9fc8d8"
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

function UploadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const model = scene.clone();

  return <primitive object={model} scale={1.65} position={[0, -1.1, 0]} />;
}

function StageContent({ modelUrl }: AgencySceneProps) {
  return (
    <>
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 4, 5]} intensity={3} color="#fff7e8" />
      <pointLight position={[-3, -2, 2]} intensity={2} color="#b7d5e3" />
      <Suspense fallback={null}>
        {modelUrl ? <UploadedModel url={modelUrl} /> : <DefaultForms />}
        <Environment preset="city" background={false} />
      </Suspense>
    </>
  );
}

export function AgencyScene({ modelUrl }: AgencySceneProps) {
  return (
    <div className="agency-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 1.5]}>
        <StageContent modelUrl={modelUrl} />
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
