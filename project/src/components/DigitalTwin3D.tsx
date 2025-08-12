import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Plane } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Crop3DProps {
  position: [number, number, number];
  health: number;
}

function Crop3D({ position, health }: Crop3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const color = health > 0.8 ? '#10b981' : health > 0.6 ? '#f59e0b' : '#ef4444';

  return (
    <Box ref={meshRef} position={position} args={[0.5, 1, 0.5]}>
      <meshStandardMaterial color={color} />
    </Box>
  );
}

function Field3D() {
  const crops = [];
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      crops.push({
        position: [i * 1.2, 0.5, j * 1.2] as [number, number, number],
        health: Math.random() * 0.4 + 0.6
      });
    }
  }

  return (
    <>
      {/* Ground */}
      <Plane rotation={[-Math.PI / 2, 0, 0]} args={[10, 10]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b7355" />
      </Plane>
      
      {/* Crops */}
      {crops.map((crop, index) => (
        <Crop3D key={index} position={crop.position} health={crop.health} />
      ))}
      
      {/* Sun */}
      <Sphere position={[3, 4, 3]} args={[0.3]}>
        <meshBasicMaterial color="#fbbf24" />
      </Sphere>
    </>
  );
}

export default function DigitalTwin3D() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-6 h-96"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">Digital Farm Twin</h3>
        <p className="text-sm text-gray-600">Interactive 3D visualization of your field</p>
      </div>
      
      <div className="h-80 rounded-lg overflow-hidden bg-gradient-to-b from-blue-200 to-green-100">
        <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 4, 3]} intensity={1} />
            <Field3D />
            <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="mt-4 flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600">Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Needs Attention</span>
        </div>
      </div>
    </motion.div>
  );
}