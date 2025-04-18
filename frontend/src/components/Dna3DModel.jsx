import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const DnaHelix = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Create a DNA helix using Three.js primitives
  const createDnaStrand = () => {
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
      color: '#6366f1',
      shininess: 100,
      transparent: true,
      opacity: 0.8,
    });
    return new THREE.Mesh(geometry, material);
  };

  return (
    <group ref={groupRef}>
      <primitive object={createDnaStrand()} />
      <primitive object={createDnaStrand()} position={[0, 0.5, 0]} rotation={[0, Math.PI, 0]} />
    </group>
  );
};

const Dna3DModel = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />
        <DnaHelix />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Dna3DModel; 