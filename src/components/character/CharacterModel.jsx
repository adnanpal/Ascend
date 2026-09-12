import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function CharacterModel() {
  const group = useRef();

  const { scene, animations } = useGLTF("/models/Spacesuit.glb");

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log("Animations:", Object.keys(actions));

    const idle = actions["Idle"];

    if (!idle) {
      console.error("Idle animation not found!");
      return;
    }

    idle.reset().fadeIn(0.5).play();

    return () => {
      idle.fadeOut(0.5);
    };
  }, [actions]);

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={1.45}
        position={[0, -1.45, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/Spacesuit.glb");