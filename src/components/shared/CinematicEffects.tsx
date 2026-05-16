import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ==========================================
// R3F: PREMIUM SUBTLE GLASS
// ==========================================
const SubtleGlass = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      const targetRotationY = state.pointer.x * 0.1;
      const targetRotationX = state.pointer.y * 0.05;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
      
      const scrollY = window.scrollY;
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scrollY * -0.001, 0.05);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[5, 7, 0.05]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.05}
            iridescence={0.2}
            iridescenceIOR={1.2}
            color="#ffffff"
            transparent
            opacity={0.8}
            roughness={0.1}
            transmission={1}
          />
        </mesh>
      </Float>
    </group>
  );
};

const SubtleParticles = () => {
  return (
    <Sparkles 
      count={150} 
      scale={20} 
      size={1.5} 
      speed={0.1} 
      opacity={0.15} 
      color="#d4d4d8" 
    />
  );
};

export const SubtleCinematicScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#fafafa" />
      
      <SubtleGlass />
      <SubtleParticles />

      <Environment preset="city" />
      <ContactShadows position={[0, -4, 0]} opacity={0.2} scale={20} blur={2} far={4} />
    </>
  );
};

export const AstronautBackground = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          y: yBg,
          backgroundImage: `url('https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2000&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};
