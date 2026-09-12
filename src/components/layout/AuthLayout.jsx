import { motion } from 'framer-motion'
import ParticleField from './ParticleField'
import NebulaBackground from './NebulaBackground'

export default function AuthLayout({ children, tagline = 'Your journey begins here.' }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-void md:flex-row">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-8 py-16 md:py-0">
        <NebulaBackground />
        <div className="absolute inset-0 bg-radial-fade" />
        <ParticleField count={44} />

        {/* animated energy lines */}
        <motion.div
          className="absolute inset-y-0 w-1/4 opacity-0"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(95,227,211,0.08), transparent)' }}
          animate={{ x: ['-60%', '520%'], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
        />
        <motion.div
          className="absolute inset-y-0 w-1/5 opacity-0"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(156,140,255,0.08), transparent)' }}
          animate={{ x: ['-60%', '520%'], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4, delay: 2.5 }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10 animate-spin-slow"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-sm text-center md:text-left"
        >
          <h1 className="font-display text-glow-cyan text-4xl tracking-[0.25em] text-white">ASCEND</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{tagline}</p>
        </motion.div>
      </div>

      <div className="relative flex flex-1 items-center justify-center border-line px-6 py-12 md:border-l">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
