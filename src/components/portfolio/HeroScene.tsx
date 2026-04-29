"use client";

import { Float, Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// ─── Smooth Mouse Parallax Camera ──────────────────────────────────────────────
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

  useFrame((state, delta) => {
    lerped.current.x = THREE.MathUtils.lerp(lerped.current.x, mouse.current.x, delta * 2.0);
    lerped.current.y = THREE.MathUtils.lerp(lerped.current.y, mouse.current.y, delta * 2.0);
    
    const t = state.clock.getElapsedTime();
    camera.position.x = lerped.current.x * 2.5 + Math.sin(t * 0.1) * 0.8;
    camera.position.y = lerped.current.y * 1.5 + Math.cos(t * 0.15) * 0.5;
    camera.position.z = 12 + Math.sin(t * 0.2) * 1.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── CPU Liquid Abstract Morphing Form ───────────────────────────────────────
function LiquidForm() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.SphereGeometry(2.8, 48, 48), []); 
  const positionAttr = useMemo(() => {
    const pos = geo.attributes.position;
    const original = new Float32Array(pos.array);
    return { pos, original };
  }, [geo]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.4;
    const { pos, original } = positionAttr;
    
    for (let i = 0; i < pos.count; i++) {
      const ox = original[i * 3];
      const oy = original[i * 3 + 1];
      const oz = original[i * 3 + 2];
      
      const noise = Math.sin(ox * 1.2 + t) * Math.sin(oy * 1.5 - t) * Math.cos(oz * 1.2 + t) * 0.25;
      pos.setXYZ(i, ox + ox * noise, oy + oy * noise, oz + oz * noise);
    }
    pos.needsUpdate = true;
    
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = t * 0.1;
  });

  return (
    <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0.5}>
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial 
          color="#0a192f"
          emissive="#123b6b"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

// ─── Dynamic Sweeping Ribbons (Standard Tube Geometry) ───────────────────────
function Ribbon({ curve, color, speed, thickness }: { curve: THREE.CatmullRomCurve3, color: string, speed: number, thickness: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 100, thickness, 6, false), [curve]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * speed) * 0.1;
    meshRef.current.rotation.z = Math.cos(t * speed) * 0.1;
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeo}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} metalness={0.8} />
    </mesh>
  );
}

function DynamicRibbons() {
  const curves = useMemo(() => {
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, -3, -6),
      new THREE.Vector3(-5, 5, -2),
      new THREE.Vector3(0, 1, 4),
      new THREE.Vector3(5, -4, 0),
      new THREE.Vector3(12, 3, -6),
    ], false);
    
    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, 4, 1),
      new THREE.Vector3(-4, -3, 5),
      new THREE.Vector3(2, 5, -2),
      new THREE.Vector3(7, 0, 4),
      new THREE.Vector3(12, -4, -3),
    ], false);
    
    return [curve1, curve2];
  }, []);

  return (
    <group>
      <Ribbon curve={curves[0]} color="#59e7ff" speed={0.2} thickness={0.03} />
      <Ribbon curve={curves[1]} color="#f85f9b" speed={0.3} thickness={0.04} />
    </group>
  );
}

// ─── CPU Motion Trails (Safe Particles) ──────────────────────────────────────
function MotionTrails() {
  const count = 40; 
  const trails = useMemo(() => [
    { color: "#59e7ff", speed: 0.8, radius: 5, yOffset: 2 },
    { color: "#f85f9b", speed: 1.1, radius: 6, yOffset: -2 },
    { color: "#7ca7ff", speed: 0.9, radius: 4, yOffset: 0 }
  ], []);
  
  const pointsRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const group = pointsRef.current;
    if (!group) return;
    const t = clock.getElapsedTime();
    
    trails.forEach((trail, trailIdx) => {
      for (let i = 0; i < count; i++) {
        const historyOffset = i * 0.05;
        const time = t - historyOffset;
        
        let x = Math.cos(time * trail.speed) * trail.radius;
        let y = Math.sin(time * trail.speed * 2.0) * 2.0 + trail.yOffset;
        let z = Math.sin(time * trail.speed) * trail.radius * 0.5;
        
        const mesh = group.children[trailIdx * count + i] as THREE.Mesh;
        if (mesh) {
          mesh.position.set(x, y, z);
          const scale = Math.max(0, 1 - historyOffset * 2);
          mesh.scale.set(scale, scale, scale);
        }
      }
    });
  });

  return (
    <group ref={pointsRef}>
      {trails.flatMap((trail, tIdx) => 
        Array.from({ length: count }).map((_, i) => (
          <mesh key={`${tIdx}-${i}`}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={trail.color} />
          </mesh>
        ))
      )}
    </group>
  );
}

// ─── Kinetic Typography Elements (HTML based to avoid SDF shader crashes) ────
function KineticTypography() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.5;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -6]}>
      <Html position={[-7, 5, -2]} transform distanceFactor={10}>
        <div style={{ color: "transparent", WebkitTextStroke: "1px #59e7ff", fontSize: "4rem", fontWeight: 800, letterSpacing: "0.2em", whiteSpace: "nowrap" }}>
          MOTION
        </div>
      </Html>
      <Html position={[6, -4, -4]} transform distanceFactor={10}>
        <div style={{ color: "transparent", WebkitTextStroke: "1px #f85f9b", fontSize: "5rem", fontWeight: 800, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          DESIGN
        </div>
      </Html>
      <Html position={[-6, -5, -6]} transform distanceFactor={10}>
        <div style={{ color: "transparent", WebkitTextStroke: "1px #7ca7ff", fontSize: "3rem", fontWeight: 800, letterSpacing: "0.3em", whiteSpace: "nowrap" }}>
          SYSTEMS
        </div>
      </Html>
    </group>
  );
}

// ─── Rotating Layered Blueprint Grids ────────────────────────────────────────
function RotatingGrids() {
  const grid1 = useRef<THREE.PolarGridHelper>(null);
  const grid2 = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (grid1.current) {
      grid1.current.rotation.y = t * 0.04;
      grid1.current.rotation.x = Math.PI / 2;
    }
    if (grid2.current) {
      grid2.current.rotation.y = -t * 0.02;
      grid2.current.rotation.x = Math.PI / 2;
    }
  });

  return (
    <group position={[0, 0, -18]}>
      <polarGridHelper ref={grid1} args={[25, 32, 8, 64, "#1a2a40", "#0f1b2e"]} />
      <gridHelper ref={grid2} args={[50, 50, "#0f1b2e", "#0a111f"]} position={[0, 0, -2]} />
    </group>
  );
}

// ─── Floating Frames / Composition Screens ───────────────────────────────────
function FloatingFrames() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.2}>
        <mesh position={[-8, 1.5, -5]} rotation={[0.1, 0.4, -0.05]}>
          <planeGeometry args={[3, 4.5]} />
          <meshBasicMaterial color="#04050d" transparent opacity={0.7} />
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(3, 4.5)]} />
            <lineBasicMaterial color="#59e7ff" transparent opacity={0.4} />
          </lineSegments>
        </mesh>
      </Float>
      
      <Float speed={1.5} floatIntensity={0.8} rotationIntensity={0.3}>
        <mesh position={[9, -2, -7]} rotation={[-0.1, -0.4, 0.1]}>
          <planeGeometry args={[5, 3]} />
          <meshBasicMaterial color="#04050d" transparent opacity={0.7} />
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(5, 3)]} />
            <lineBasicMaterial color="#f85f9b" transparent opacity={0.4} />
          </lineSegments>
        </mesh>
      </Float>
    </group>
  );
}

// ─── High-Speed Light Streaks ────────────────────────────────────────────────
function LightStreaks() {
  const streaksRef = useRef<THREE.Group>(null);
  
  const streaks = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      y: (Math.random() - 0.5) * 18,
      z: (Math.random() - 0.5) * 12 - 5,
      speed: 0.15 + Math.random() * 0.3,
      length: 2 + Math.random() * 6,
      color: Math.random() > 0.5 ? "#59e7ff" : (Math.random() > 0.5 ? "#f85f9b" : "#7ca7ff"),
      offset: Math.random() * 50
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!streaksRef.current) return;
    const t = clock.getElapsedTime();
    
    streaksRef.current.children.forEach((child, i) => {
      const s = streaks[i];
      let x = ((t * s.speed * 20 + s.offset) % 60) - 30; 
      child.position.set(x, s.y, s.z);
    });
  });

  return (
    <group ref={streaksRef}>
      {streaks.map((s, i) => (
        <mesh key={i}>
          <planeGeometry args={[s.length, 0.03]} />
          <meshBasicMaterial color={s.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Canvas ───────────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 42 }}
      dpr={[1, 1.5]}
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
      <fog attach="fog" args={["#04050d", 12, 45]} />

      {/* Basic Light Setup - safe for all GPUs */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" />

      {/* Background Elements */}
      <RotatingGrids />
      
      {/* Interactive Camera */}
      <CameraRig />

      {/* Motion Graphics Composition */}
      <group position={[0, 0, 0]}>
        <LiquidForm />
        <DynamicRibbons />
        <MotionTrails />
        <KineticTypography />
        <FloatingFrames />
        <LightStreaks />
      </group>
    </Canvas>
  );
}
