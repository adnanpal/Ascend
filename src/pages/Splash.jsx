import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ParticleField from '../components/layout/ParticleField'
import NebulaBackground from '../components/layout/NebulaBackground'
import ProgressRing from '../components/ui/ProgressRing'

export default function Splash() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(1, p + 0.02))
    }, 40)
    const timeout = setTimeout(() => navigate('/login'), 3200)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-void">
      <NebulaBackground />
      <div className="absolute inset-0 bg-radial-fade" />
      <ParticleField count={70} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1
          className="font-display text-5xl tracking-[0.3em] text-white md:text-6xl"
          animate={{ textShadow: ['0 0 16px rgba(95,227,211,0.25)', '0 0 34px rgba(95,227,211,0.55)', '0 0 16px rgba(95,227,211,0.25)'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          ASCEND
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 text-xs font-semibold tracking-[0.4em] text-muted md:text-sm"
        >
          YOUR LIFE. YOUR QUEST. YOUR ASCENSION.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="relative z-10 mt-16"
      >
        <ProgressRing progress={progress} size={64} strokeWidth={2} color="#5fe3d3">
          <span className="text-[10px] font-semibold tracking-widest text-muted">
            {Math.round(progress * 100)}%
          </span>
        </ProgressRing>
      </motion.div>
    </div>
  )
}
