import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 35;
const HEIGHT = 3.2;

export default function RisingParticles() {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const data = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // Keep particles close to the character
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.15 + Math.random() * 0.8;

      data[i3] = Math.cos(angle) * radius;
      data[i3 + 1] = Math.random() * HEIGHT;
      data[i3 + 2] = Math.sin(angle) * radius;
    }

    return data;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const position =
      pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < COUNT; i++) {
      const index = i * 3 + 1;

      position.array[index] += delta * 0.35;

      // Restart from platform when particle reaches top
      if (position.array[index] > HEIGHT) {
        position.array[index] = 0;
      }
    }

    position.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      position={[0, -1.45, 0]}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#5fe3d3"
        size={0.035}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}