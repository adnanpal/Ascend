import { motion } from 'framer-motion'
import ProgressBar from '../ui/ProgressBar'
import AnimatedNumber from '../ui/AnimatedNumber'
import { attributeMeta } from '../../data/mockData'

const glow = {
  ember: 'group-hover:shadow-[0_0_30px_rgba(227,139,93,0.12)]',
  cyan: 'group-hover:shadow-[0_0_30px_rgba(95,227,211,0.14)]',
  amber: 'group-hover:shadow-[0_0_30px_rgba(217,164,65,0.12)]',
  violet: 'group-hover:shadow-[0_0_30px_rgba(156,140,255,0.14)]',
  teal: 'group-hover:shadow-[0_0_30px_rgba(79,209,176,0.12)]',
  blue: 'group-hover:shadow-[0_0_30px_rgba(111,168,255,0.12)]',
}

const iconTint = {
  ember: 'text-ember',
  cyan: 'text-cyan',
  amber: 'text-amber',
  violet: 'text-violet',
  teal: 'text-teal',
  blue: 'text-blue',
}

export default function AttributeCard({ attributeKey, level, xp, xpToNext, size = 'default' }) {
  const meta = attributeMeta[attributeKey]
  const Icon = meta.icon
  const compact = size === 'compact'

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`group glass-panel rounded-sm ${compact ? 'p-4' : 'p-6'} transition-shadow duration-300 ${glow[meta.color]}`}
    >
      <div className="flex items-center justify-between">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className={`grid place-items-center rounded-full hairline ${compact ? 'h-9 w-9' : 'h-11 w-11'} ${iconTint[meta.color]}`}
        >
          <Icon size={compact ? 16 : 18} strokeWidth={1.75} />
        </motion.div>
        <span className="font-display text-lg text-white/90">
          <AnimatedNumber value={level} format={(v) => String(Math.round(v)).padStart(2, '0')} />
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-white">{meta.label}</p>
        <p className="mt-0.5 text-xs text-muted">{meta.description}</p>
      </div>

      <ProgressBar
        value={xp}
        max={xpToNext}
        color={meta.color}
        label={`${meta.label} progress`}
        className="mt-4"
      />
      <p className="mt-1.5 text-[11px] text-faint">
        {xp} / {xpToNext} XP
      </p>
    </motion.div>
  )
}
