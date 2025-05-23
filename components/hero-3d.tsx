'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Environment, OrbitControls } from '@react-three/drei';
import { type Mesh, Color } from 'three';
import { useTheme } from '@/components/vs-code-layout';

// Particle system for code-like particles
function Particles({
  count = 300,
  theme
}: {
  count: number;
  theme: 'dark' | 'light';
}) {
  const mesh = useRef<Mesh>(null!);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [colors, setColors] = useState<Float32Array | null>(null);
  const [speeds, setSpeeds] = useState<number[]>([]);

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds: number[] = [];

    for (let i = 0; i < count; i++) {
      // Position particles in a cube
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Random speeds
      speeds.push(Math.random() * 0.02 + 0.01);

      // Colors based on theme
      if (theme === 'dark') {
        // Blue/cyan palette for dark theme
        const hue = Math.random() * 0.1 + 0.6; // Blue to cyan range
        const color = new Color().setHSL(hue, 0.8, 0.5);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      } else {
        // Purple/pink palette for light theme
        const hue = Math.random() * 0.1 + 0.8; // Purple to pink range
        const color = new Color().setHSL(hue, 0.7, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
    }

    setPositions(positions);
    setColors(colors);
    setSpeeds(speeds);
  }, [count, theme]);

  useFrame(() => {
    if (
      !positions ||
      !mesh.current ||
      !mesh.current.geometry.attributes.position
    )
      return;

    const positionsArray = mesh.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Move particles upward
      positionsArray[i * 3 + 1] += speeds[i] || 0.01;

      // Reset particles that go too high
      if (positionsArray[i * 3 + 1] > 10) {
        positionsArray[i * 3 + 1] = -10;
        positionsArray[i * 3] = (Math.random() - 0.5) * 20;
        positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!positions || !colors) return null;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  );
}

// Floating VS Code logo
function VSCodeLogo({ theme }: { theme: 'dark' | 'light' }) {
  const mesh = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 2.5, 0.2]} />
        <meshStandardMaterial
          color={theme === 'dark' ? '#007acc' : '#0078d7'}
          metalness={0.6}
          roughness={0.3}
          emissive={theme === 'dark' ? '#001122' : '#001133'}
        />
        {/* VS Code icon representation */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial
            color={theme === 'dark' ? '#ffffff' : '#ffffff'}
            transparent
            opacity={0.9}
          />
        </mesh>
      </mesh>
    </Float>
  );
}

// Floating code snippets
function CodeSnippets({ theme }: { theme: 'dark' | 'light' }) {
  const group = useRef<Mesh>(null!);

  const snippets = [
    {
      text: 'const Portfolio = () => {',
      position: [-4, 2, -2],
      rotation: [0.1, 0.3, 0]
    },
    {
      text: '  return <Amazing />;',
      position: [-3.5, 1, -1.5],
      rotation: [0, 0.2, 0]
    },
    { text: '};', position: [-4, 0, -2], rotation: [0, 0.4, 0] },
    {
      text: "import Skills from './dev';",
      position: [3, 2, -1.5],
      rotation: [0.1, -0.3, 0]
    },
    {
      text: 'export default Dev;',
      position: [2.5, 0, -1],
      rotation: [0, -0.2, 0.1]
    }
  ];

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <group ref={group}>
      {snippets.map((snippet, index) => (
        <Float
          key={index}
          speed={1.5}
          rotationIntensity={0.1}
          floatIntensity={0.3}>
          <Text
            position={snippet.position}
            rotation={snippet.rotation}
            fontSize={0.25}
            color={theme === 'dark' ? '#d4d4d4' : '#383a42'}
            anchorX="left"
            // font="/fonts/GeistMono-Regular.ttf"
          >
            {snippet.text}
          </Text>
        </Float>
      ))}
    </group>
  );
}

export function Hero3D() {
  const { theme } = useTheme();

  return (
    <div className="w-full h-[70vh] md:h-[80vh]">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <VSCodeLogo theme={theme} />
        <CodeSnippets theme={theme} />
        <Particles count={200} theme={theme} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <Environment preset={theme === 'dark' ? 'night' : 'sunset'} />
      </Canvas>
    </div>
  );
}
