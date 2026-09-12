import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function AnimatedNumber({ value, format = (v) => Math.round(v).toLocaleString(), className = '' }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => format(v))
  const prevValue = useRef(value)

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    })
    prevValue.current = value
    return controls.stop
  }, [value, motionValue])

  return <motion.span className={className}>{rounded}</motion.span>
}
