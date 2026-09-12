import { motion } from 'framer-motion'
import { Flame, Sparkles, Swords, Trophy } from 'lucide-react'
import AttributeCard from '../components/progression/AttributeCard'
import CharacterChamber from '../components/progression/CharacterChamber'
import AnimatedNumber from '../components/ui/AnimatedNumber'
import { useAppState } from '../context/AppState'

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const stats = (user) => [
  { label: 'GLOBAL LEVEL', value: user.level, format: (v) => String(Math.round(v)).padStart(2, '0'), icon: Trophy },
  { label: 'TOTAL XP', value: user.totalXp, icon: Sparkles },
  { label: 'QUESTS COMPLETED', value: user.questsCompleted, icon: Swords },
  { label: 'CURRENT STREAK', value: user.streak, suffix: ' DAYS', icon: Flame },
]

export default function Attributes() {
  
  const { user, attributes, loading } = useAppState()

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-display text-xs tracking-[0.3em] text-cyan">
          ASCENDING...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-display text-3xl tracking-wide text-white">YOUR ASCENSION</h1>
        <p className="mt-2 text-sm text-muted">Every quest completed carves this character further.</p>
      </motion.div>

      <motion.div variants={gridVariants} initial="hidden" animate="show" className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats(user).map(({ label, value, format, suffix, icon: Icon }) => (
          <motion.div key={label} variants={itemVariants} whileHover={{ y: -3 }} className="glass-panel rounded-sm p-5">
            <Icon size={16} className="text-cyan" strokeWidth={1.75} />
            <p className="mt-3 font-display text-2xl text-white">
              <AnimatedNumber value={value} format={format} />
              {suffix}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.12em] text-muted">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={gridVariants} initial="hidden" animate="show" className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {attributes.map((a) => (
          <motion.div key={a.key} variants={itemVariants}>
            <AttributeCard attributeKey={a.key} {...a} />
          </motion.div>
        ))}
      </motion.div>

      /<CharacterChamber
        title="CHARACTER EVOLUTION"
        subtitle="Your visual evolution will appear here."
        height="h-[420px] md:h-[480px]"
      />
    </div>
  )
}
