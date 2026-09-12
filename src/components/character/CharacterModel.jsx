import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAppState } from '../../context/AppState'

const CHARACTER_PROGRESSION = {
  1: {
    name: 'Suit',
    model: '/models/Suit.glb',
    idle: 'Idle',
  },

  2: {
    name: 'Adventurer',
    model: '/models/Adventurer.glb',
    idle: 'Idle',
  },
   3: {
    name: 'Swat',
    model: '/models/Swat.glb',
    idle: 'Idle',
  },
  4: {
    name: 'Spacesuit',
    model: '/models/Spacesuit.glb',
    idle: 'Idle',
  },
}

function getCharacterForLevel(level) {
  const levels = Object.keys(CHARACTER_PROGRESSION)
    .map(Number)
    .sort((a, b) => b - a)

  const matchingLevel = levels.find(
    (value) => level >= value
  )

  return CHARACTER_PROGRESSION[matchingLevel || 1]
}

export default function CharacterModel() {
  const group = useRef()

  const { characterLevel } = useAppState()

  const character = getCharacterForLevel(characterLevel)

  const { scene, animations } = useGLTF(character.model)

  const { actions } = useAnimations(
    animations,
    group
  )

  useEffect(() => {
    const idle = actions[character.idle]

    if (!idle) {
      console.error(
        `Idle animation not found for ${character.name}`,
        Object.keys(actions)
      )
      return
    }

    idle.reset().fadeIn(0.5).play()

    return () => {
      idle.fadeOut(0.5)
    }
  }, [actions, character])

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={1.45}
        position={[0, -1.45, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/Spacesuit.glb')
useGLTF.preload('/models/Adventurer.glb')