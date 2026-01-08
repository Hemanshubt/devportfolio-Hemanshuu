import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, MeshDistortMaterial, Stars, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
}

// Orbiting Particle
function OrbitingParticle({ radius, speed, color, yOffset = 0 }: { radius: number; speed: number; color: string; yOffset?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = yOffset + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
}

// Pulsing Glow Sphere
function PulsingGlow({ position, color, size = 0.2 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = size * (1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
      meshRef.current.scale.setScalar(scale);
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.5;
    }
  });

  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

// Docker Container with bounce
function DockerContainer({ position, mouseX, mouseY }: { position: [number, number, number]; mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.4;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.1;
      
      // Bounce animation
      groupRef.current.position.y = initialPos.current[1] + Math.abs(Math.sin(state.clock.elapsedTime * 1.2)) * 0.3;
      
      // Mouse parallax
      const targetX = initialPos.current[0] + mouseX * 0.4;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Box args={[0.65, 0.45, 0.45]}>
        <meshStandardMaterial color="#0db7ed" metalness={0.9} roughness={0.1} />
      </Box>
      {[-0.18, 0, 0.18].map((x, i) => (
        <Box key={i} args={[0.08, 0.47, 0.02]} position={[x, 0, 0.24]}>
          <meshStandardMaterial color="#066da5" emissive="#066da5" emissiveIntensity={0.5} />
        </Box>
      ))}
    </group>
  );
}

// Kubernetes Pod with spin
function KubernetesPod({ position, mouseX, mouseY }: { position: [number, number, number]; mouseX: number; mouseY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (meshRef.current) {
      // Fast spin
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.y = state.clock.elapsedTime * 1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      
      // Scale pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
      
      // Mouse parallax
      const targetX = initialPos.current[0] + mouseX * 0.5;
      const targetY = initialPos.current[1] + mouseY * 0.5;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.04);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.04);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[0.4]} />
      <meshStandardMaterial color="#326ce5" emissive="#326ce5" emissiveIntensity={0.5} wireframe />
    </mesh>
  );
}

// AWS Cloud floating
function AWSCloud({ position, mouseX, mouseY }: { position: [number, number, number]; mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = initialPos.current[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.2;
      
      const targetX = initialPos.current[0] + mouseX * 0.25;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.03);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        <Sphere args={[0.3, 16, 16]} position={[-0.2, 0, 0]}>
          <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.4, 16, 16]} position={[0.12, 0.1, 0]}>
          <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.25, 16, 16]} position={[0.4, -0.05, 0]}>
          <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.5} />
        </Sphere>
      </group>
    </Float>
  );
}

// Git Node with trail effect
function GitNode({ position, color, mouseX, mouseY }: { position: [number, number, number]; color: string; mouseX: number; mouseY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.7;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.9;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      
      // Floating motion
      meshRef.current.position.y = initialPos.current[1] + Math.sin(state.clock.elapsedTime * 1.5 + initialPos.current[0]) * 0.3;
      
      const targetX = initialPos.current[0] + mouseX * 0.45;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.22]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}

// Server with blinking LEDs
function Server({ position, mouseX, mouseY }: { position: [number, number, number]; mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ledsRef = useRef<THREE.Mesh[]>([]);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      
      const targetX = initialPos.current[0] + mouseX * 0.2;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.03);
    }
    
    // Blinking LEDs
    ledsRef.current.forEach((led, i) => {
      if (led) {
        const mat = led.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * (4 + i * 0.5)) * 1;
      }
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        <Box args={[0.85, 1.4, 0.45]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.95} roughness={0.05} />
        </Box>
        {[0.45, 0.15, -0.15, -0.45].map((y, i) => (
          <group key={i}>
            <Box args={[0.75, 0.22, 0.02]} position={[0, y, 0.24]}>
              <meshStandardMaterial color="#2d2d44" metalness={0.8} roughness={0.2} />
            </Box>
            <mesh ref={(el) => { if (el) ledsRef.current[i * 2] = el; }} position={[0.3, y, 0.25]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#00d4ff" : "#22c55e"} emissive={i % 2 === 0 ? "#00d4ff" : "#22c55e"} emissiveIntensity={2} />
            </mesh>
            <mesh ref={(el) => { if (el) ledsRef.current[i * 2 + 1] = el; }} position={[0.22, y, 0.25]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

// Central Core
function CentralCore({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    
    // Rotating rings
    if (ring1Ref.current) ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.35;
    
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * 0.2, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.2, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wobbling Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
          distort={0.5}
          speed={3}
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} transparent opacity={0.3} />
      </mesh>
      
      {/* Rotating Rings */}
      <Torus ref={ring1Ref} args={[1.7, 0.025, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} transparent opacity={0.8} />
      </Torus>
      <Torus ref={ring2Ref} args={[2.1, 0.02, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} transparent opacity={0.7} />
      </Torus>
      <Torus ref={ring3Ref} args={[2.5, 0.015, 16, 100]} rotation={[Math.PI / 4, Math.PI / 6, Math.PI / 3]}>
        <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.5} transparent opacity={0.6} />
      </Torus>
      
      {/* Orbiting particles */}
      <OrbitingParticle radius={1.7} speed={1.5} color="#22c55e" />
      <OrbitingParticle radius={2.1} speed={-1.2} color="#8b5cf6" yOffset={0.3} />
      <OrbitingParticle radius={2.5} speed={0.9} color="#ff9900" yOffset={-0.2} />
    </group>
  );
}

// Data Particles
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 250;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] -= 0.02;
        if (pos[i * 3 + 1] < -10) {
          pos[i * 3 + 1] = 10;
          pos[i * 3] = (Math.random() - 0.5) * 20;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#00d4ff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// Connection Lines
function ConnectionLine({ start, end, color = "#00d4ff" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const lineRef = useRef<THREE.Line>(null);
  
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 0.3, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end),
    ]);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(25));
  }, [start, end]);

  useFrame((state) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2.5 + start[0]) * 0.2;
    }
  });

  return <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 }))} ref={lineRef} />;
}

// Main Scene
function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const sceneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        state.clock.elapsedTime * 0.025 + mouseX * 0.1,
        0.02
      );
    }
  });

  const gitNodes = [
    { position: [-2.5, 1.8, -1] as [number, number, number], color: "#f05032" },
    { position: [2.8, 1.5, -1.5] as [number, number, number], color: "#22c55e" },
    { position: [-2.2, -1.8, -0.5] as [number, number, number], color: "#8b5cf6" },
    { position: [2.5, -1.5, -1] as [number, number, number], color: "#00d4ff" },
  ];

  return (
    <group ref={sceneRef}>
      <CentralCore mouseX={mouseX} mouseY={mouseY} />
      
      {/* Docker Containers */}
      <DockerContainer position={[-3.5, 0.8, -1.5]} mouseX={mouseX} mouseY={mouseY} />
      <DockerContainer position={[3.5, -0.5, -2]} mouseX={mouseX} mouseY={mouseY} />
      
      {/* Kubernetes Pods */}
      <KubernetesPod position={[2.5, 2.3, -1]} mouseX={mouseX} mouseY={mouseY} />
      <KubernetesPod position={[-2.5, -1.3, -1.5]} mouseX={mouseX} mouseY={mouseY} />
      
      {/* AWS Cloud */}
      <AWSCloud position={[0, 3, -2]} mouseX={mouseX} mouseY={mouseY} />
      
      {/* Servers */}
      <Server position={[-4.2, 0, -2.5]} mouseX={mouseX} mouseY={mouseY} />
      <Server position={[4.2, 0.3, -3]} mouseX={mouseX} mouseY={mouseY} />
      
      {/* Git Nodes */}
      {gitNodes.map((node, i) => (
        <GitNode key={i} {...node} mouseX={mouseX} mouseY={mouseY} />
      ))}
      
      {/* Pulsing Glows */}
      <PulsingGlow position={[-3.5, 2.5, -2]} color="#00d4ff" size={0.12} />
      <PulsingGlow position={[3.5, -2.5, -2]} color="#22c55e" size={0.1} />
      <PulsingGlow position={[0, -3, -1.5]} color="#8b5cf6" size={0.15} />
      
      {/* Connection Lines */}
      {gitNodes.map((node, i) => (
        <ConnectionLine key={i} start={[0, 0, 0]} end={node.position} color={node.color} />
      ))}
      
      <DataParticles />
      <Stars radius={65} depth={65} count={1800} factor={4.5} saturation={0} fade speed={0.4} />
    </group>
  );
}

function SceneWrapper() {
  const mouse = useMousePosition();
  return <Scene mouseX={mouse.x} mouseY={mouse.y} />;
}

export default function CloudScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#080d16']} />
        <fog attach="fog" args={['#080d16', 7, 30]} />
        
        <ambientLight intensity={0.12} />
        <pointLight position={[10, 10, 10]} intensity={0.7} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[0, 8, 5]} intensity={0.6} color="#22c55e" />
        <pointLight position={[6, -6, 5]} intensity={0.4} color="#ff9900" />
        <pointLight position={[-6, 6, -5]} intensity={0.3} color="#f05032" />
        
        <SceneWrapper />
      </Canvas>
    </div>
  );
}
