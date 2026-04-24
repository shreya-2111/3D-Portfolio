"use client";

import { Float, Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// ─── Smooth mouse-driven camera parallax ─────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2.0;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 1.2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    lerped.current.x += (mouse.current.x - lerped.current.x) * 0.04;
    lerped.current.y += (mouse.current.y - lerped.current.y) * 0.04;
    camera.position.x = lerped.current.x * 0.8;
    camera.position.y = lerped.current.y * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Central morphing icosahedron ─────────────────────────────────────────────
function MorphingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.5, 2), []);
  const positionAttr = useMemo(() => {
    const pos = geo.attributes.position;
    const original = new Float32Array(pos.array);
    return { pos, original };
  }, [geo]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const { pos, original } = positionAttr;
    for (let i = 0; i < pos.count; i++) {
      const ox = original[i * 3];
      const oy = original[i * 3 + 1];
      const oz = original[i * 3 + 2];
      const noise = Math.sin(ox * 2.2 + t * 0.9) * Math.cos(oy * 1.8 + t * 0.7) * 0.18;
      pos.setXYZ(i, ox + ox * noise, oy + oy * noise, oz + oz * noise);
    }
    pos.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.z = t * 0.08;
  });

  return (
    <Float speed={1.2} floatIntensity={0.8} rotationIntensity={0.2}>
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial
          color="#59e7ff"
          emissive="#59e7ff"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

// ─── Wireframe shell (counter-rotates for depth) ──────────────────────────────
function OrbShell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = -t * 0.1;
    ref.current.rotation.z = t * 0.06;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.1, 1]} />
      <meshBasicMaterial color="#7ca7ff" wireframe transparent opacity={0.14} />
    </mesh>
  );
}

// ─── Three independently-tilted glowing rings ────────────────────────────────
function Rings() {
  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (refs[0].current) { refs[0].current.rotation.x = t * 0.45; refs[0].current.rotation.y = t * 0.28; }
    if (refs[1].current) { refs[1].current.rotation.x = -t * 0.28; refs[1].current.rotation.z = t * 0.38; }
    if (refs[2].current) { refs[2].current.rotation.y = t * 0.18; refs[2].current.rotation.z = -t * 0.32; }
  });

  return (
    <>
      <mesh ref={refs[0]}>
        <torusGeometry args={[2.9, 0.014, 16, 120]} />
        <meshBasicMaterial color="#59e7ff" transparent opacity={0.75} />
      </mesh>
      <mesh ref={refs[1]}>
        <torusGeometry args={[3.8, 0.009, 16, 120]} />
        <meshBasicMaterial color="#7ca7ff" transparent opacity={0.5} />
      </mesh>
      <mesh ref={refs[2]}>
        <torusGeometry args={[4.7, 0.007, 16, 120]} />
        <meshBasicMaterial color="#f85f9b" transparent opacity={0.38} />
      </mesh>
    </>
  );
}

// ─── Animated wave / sine ribbon ─────────────────────────────────────────────
function WaveRibbon() {
  const ref = useRef<THREE.Points>(null);
  const count = 180;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (i / count - 0.5) * 18;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = -3;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const x = (i / count - 0.5) * 18;
      pos[i * 3] = x;
      pos[i * 3 + 1] = Math.sin(x * 0.7 + t * 1.2) * 0.9 + Math.sin(x * 1.4 + t * 0.8) * 0.4;
      pos[i * 3 + 2] = -3 + Math.cos(x * 0.5 + t * 0.6) * 0.3;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} sizeAttenuation color="#59e7ff" opacity={0.6} transparent />
    </points>
  );
}

// ─── Motion-path orbiting cubes ───────────────────────────────────────────────
function OrbitingCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const items = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      color: i % 2 === 0 ? "#7ca7ff" : "#f85f9b",
      radius: 3.9,
      yOffset: Math.sin((i / 6) * Math.PI * 2) * 0.8,
    })), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.22;
    groupRef.current.rotation.x = Math.sin(t * 0.16) * 0.18;
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <Float key={i} speed={1.4 + i * 0.18} floatIntensity={0.35} rotationIntensity={1.1}>
          <mesh position={[
            Math.cos(item.angle) * item.radius,
            item.yOffset,
            Math.sin(item.angle) * item.radius,
          ]}>
            <boxGeometry args={[0.26, 0.26, 0.26]} />
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={1.6}
              metalness={0.55}
              roughness={0.18}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ─── Floating accent shapes (depth layers) ───────────────────────────────────
function AccentShapes() {
  const shapes = useMemo(() => [
    { pos: [-5.0, 1.2, -2.0] as [number,number,number], type: "torusKnot", color: "#89a2ff", emissive: "#5a7bff", speed: 1.5 },
    { pos: [4.8, -1.0, -1.8] as [number,number,number], type: "octahedron", color: "#f85f9b", emissive: "#f85f9b", speed: 1.8 },
    { pos: [1.8, -3.4, -0.8] as [number,number,number], type: "sphere",     color: "#5a9cff", emissive: "#5a9cff", speed: 2.0 },
    { pos: [3.6, 3.0, -1.2] as [number,number,number],  type: "tetra",      color: "#59e7ff", emissive: "#59e7ff", speed: 2.6 },
    { pos: [-3.4, -2.6, -0.6] as [number,number,number],type: "torus",      color: "#5a7bff", emissive: "#89a2ff", speed: 1.3 },
    { pos: [-1.8, 3.8, -1.4] as [number,number,number], type: "octahedron", color: "#7ca7ff", emissive: "#7ca7ff", speed: 2.2 },
  ], []);

  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.0} floatIntensity={1.1}>
          <mesh position={s.pos}>
            {s.type === "torusKnot"  && <torusKnotGeometry args={[0.6, 0.16, 80, 16]} />}
            {s.type === "octahedron" && <octahedronGeometry args={[0.85, 0]} />}
            {s.type === "sphere"     && <sphereGeometry args={[0.65, 14, 14]} />}
            {s.type === "tetra"      && <tetrahedronGeometry args={[0.52, 0]} />}
            {s.type === "torus"      && <torusGeometry args={[0.48, 0.16, 12, 48]} />}
            <meshStandardMaterial
              color={s.color}
              emissive={s.emissive}
              emissiveIntensity={1.0}
              metalness={0.55}
              roughness={0.18}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// ─── Falling particle field ───────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] -= 0.005;
      if (pos[i] < -10) pos[i] = 10;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} sizeAttenuation color="#59e7ff" opacity={0.45} transparent />
    </points>
  );
}

// ─── Outer wireframe sphere (depth / enclosure) ───────────────────────────────
function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = t * 0.025;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[6.5, 18, 18]} />
      <meshBasicMaterial color="#7ca7ff" wireframe transparent opacity={0.035} />
    </mesh>
  );
}

// ─── Canvas ───────────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 44 }}
      dpr={[1, 1.2]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <color attach="background" args={["#04050d"]} />
      <fog attach="fog" args={["#04050d", 15, 28]} />

      <ambientLight intensity={0.45} />
      <pointLight position={[-5, -2, 5]}  intensity={10} color="#ff5db1" distance={20} />
      <pointLight position={[4,  2,  4]}  intensity={9}  color="#7c9bff" distance={18} />
      <pointLight position={[0,  4, -2]}  intensity={7}  color="#59e7ff" distance={16} />

      <Stars radius={55} depth={20} count={900} factor={3} saturation={0} fade speed={0.4} />
      <Sparkles count={45} scale={[11, 9, 11]} size={1.8} speed={0.28} color="#b9caff" />

      <CameraRig />
      <WireframeSphere />
      <MorphingOrb />
      <OrbShell />
      <Rings />
      <WaveRibbon />
      <OrbitingCubes />
      <AccentShapes />
      <ParticleField />
    </Canvas>
  );
}
