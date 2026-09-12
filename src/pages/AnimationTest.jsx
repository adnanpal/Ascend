import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function AnimationTest() {
  const { animations } = useGLTF("/models/UAL1_Standard.glb");

  useEffect(() => {
    console.log(
      "UAL animations:",
      animations.map((animation) => animation.name)
    );
  }, [animations]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl">Animation Library Test</h1>
      <p className="mt-4 text-white/60">
        Open the browser console to see the animation names.
      </p>
    </div>
  );
}

useGLTF.preload("/models/UAL1_Standard.glb");