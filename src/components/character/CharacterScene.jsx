import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterModel from "./CharacterModel";
import Aura from "./Aura";
import RisingParticles from "./RisingParticles";

function CharacterWorld() {
  return (
    <>
      <ambientLight intensity={0.7} />

      <directionalLight
        position={[3, 5, 4]}
        intensity={1.5}
      />

      <pointLight
        position={[0, 1.5, 2]}
        intensity={3}
        distance={5}
        color="#5fe3d3"
      />

      <pointLight
        position={[-2, 2, -1]}
        intensity={2}
        distance={4}
        color="#9c8cff"
      />

      <RisingParticles />

      <Aura />

      <CharacterModel />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.48, 0]}
      >
        <circleGeometry args={[1.15, 64]} />
        <meshBasicMaterial
          color="#5fe3d3"
          transparent
          opacity={0.08}
        />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

export default function CharacterScene() {
    return (
        <Canvas
            camera={{
                position: [0, 1.5, 5],
                fov: 45,
            }}
        >
            <CharacterWorld />
        </Canvas>
    );
}