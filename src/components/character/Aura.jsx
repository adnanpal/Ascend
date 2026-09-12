import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYCLE_DURATION = 4;

export default function Aura() {
  const ring = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!ring.current) return;

    // 0 → 1 every 4 seconds
    const progress = (time % CYCLE_DURATION) / CYCLE_DURATION;

    // Move straight upward
    ring.current.position.y = progress * 3.0;

    // Fade in at the bottom, fade out at the top
    const fadeIn = Math.min(progress * 10, 1);
    const fadeOut = Math.min((1 - progress) * 5, 1);

    ring.current.material.opacity =
      fadeIn * fadeOut * 0.65;
  });

  return (
    <group position={[0, -1.45, 0]}>
        

      {/* ONE horizontal energy wave */}
      <mesh
        ref={ring}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[0.85, 0.015, 12, 96]}
        />

        <meshBasicMaterial
          color="#5fe3d3"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  );
}