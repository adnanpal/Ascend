import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Flame } from 'lucide-react'
import CharacterChamber from '../components/progression/CharacterChamber'
import AttributeCard from '../components/progression/AttributeCard'
import ProgressBar from '../components/ui/ProgressBar'
import AnimatedNumber from '../components/ui/AnimatedNumber'
import QuestCard from '../components/quests/QuestCard'
import { useAppState } from '../context/AppState'

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function CommandCenter() {
  const {
    user,
    attributes,
    quests,
    completeQuest,
    triggerLevelUp,
    loading,
  } = useAppState()

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="text-xs font-semibold tracking-[0.2em] text-muted">
          ASCENDING...
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }
  const xpRemaining = user.xpToNext - user.xp
  const activeQuests = quests.filter((q) => q.status === 'active').slice(0, 3)


  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <CharacterChamber />

        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-sm p-6">
            <div className="flex items-baseline justify-between">
              <p className="font-display text-3xl tracking-widest text-white">
                LEVEL <AnimatedNumber value={user.level} format={(v) => String(Math.round(v)).padStart(2, '0')} />
              </p>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-1.5 text-xs font-semibold text-ember"
              >
                <Flame size={13} /> {user.streak} DAY STREAK
              </motion.span>
            </div>

            <ProgressBar value={user.xp} max={user.xpToNext} className="mt-6" label="Level progress" />
            <div className="mt-2 flex items-center justify-between text-xs text-muted">
              <span>
                <AnimatedNumber value={user.xp} /> / {user.xpToNext.toLocaleString()} XP
              </span>
              <span className="text-faint">NEXT LEVEL · {xpRemaining} XP remaining</span>
            </div>
          </div>

          <div className="glass-panel flex-1 rounded-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-[0.16em] text-muted">TODAY&apos;S QUESTS</h2>
              <Link to="/quests" className="flex items-center gap-1 text-xs font-semibold text-cyan transition-colors hover:text-white">
                View all
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                  <ChevronRight size={13} />
                </motion.span>
              </Link>
            </div>

            <motion.div
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="mt-4 space-y-3"
            >
              {activeQuests.map((quest) => (
                <motion.div key={quest.id} variants={itemVariants}>
                  <QuestCard quest={quest} onBegin={() => completeQuest(quest.id)} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-muted">ATTRIBUTES</h2>
          <Link to="/attributes" className="flex items-center gap-1 text-xs font-semibold text-cyan hover:text-white">
            Full ascension <ChevronRight size={13} />
          </Link>
        </div>
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {attributes.map((a) => (
            <motion.div key={a.key} variants={itemVariants}>
              <AttributeCard
                attributeKey={a.key}
                level={a.level}
                xp={a.xp}
                xpToNext={a.xpToNext}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Discreet demo trigger for the level-up sequence */}
      <motion.button
        onClick={triggerLevelUp}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-20 right-4 z-20 rounded-full hairline bg-void/80 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-faint backdrop-blur transition-colors hover:text-cyan md:bottom-6"
      >
        DEMO: LEVEL UP
      </motion.button>
    </div>
  )
}
