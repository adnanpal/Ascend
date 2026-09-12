import { motion } from 'framer-motion'

const colorMap = {
  cyan: 'from-cyan-dim to-cyan',
  violet: 'from-violet-dim to-violet',
  ember: 'from-[#8a4a2c] to-ember',
  amber: 'from-[#7a5a20] to-amber',
  teal: 'from-[#2a6e5c] to-teal',
  blue: 'from-[#2f4f8a] to-blue',
  gold: 'from-[#8a6d2c] to-gold',
}

export default function ProgressBar({ value, max, color = 'cyan', className = '', label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={className}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="h-1.5 w-full overflow-hidden rounded-full bg-white/5"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className={`relative h-full rounded-full bg-gradient-to-r ${colorMap[color]}`}
        >
          <div className="shimmer-sweep" />
        </motion.div>
      </div>
    </div>
  )
}
