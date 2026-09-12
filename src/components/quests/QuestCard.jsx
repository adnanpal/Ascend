import { motion } from 'framer-motion'
import { Check, Circle, Timer, Zap } from 'lucide-react'
import Button from '../ui/Button'
import { attributeMeta } from '../../data/mockData'

const difficultyTint = {
  EASY: 'text-teal border-teal/30',
  MEDIUM: 'text-amber border-amber/30',
  HARD: 'text-ember border-ember/30',
}

export default function QuestCard({ quest, onBegin }) {
  const meta = attributeMeta[quest.category.toLowerCase()]
  const Icon = meta?.icon
  const ascended = quest.status === 'ascended'

  return (
    <motion.div
      layout
      whileHover={ascended ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel rounded-sm p-5 transition-shadow duration-300 ${
        ascended ? 'opacity-60' : 'hover:shadow-[0_0_28px_rgba(95,227,211,0.1)]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full hairline text-muted">
              <Icon size={15} strokeWidth={1.75} />
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">{quest.title}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted">
              <span className="tracking-[0.12em]">{quest.category}</span>
              <span aria-hidden="true">·</span>
              <span className={`rounded-full border px-2 py-0.5 tracking-[0.1em] ${difficultyTint[quest.difficulty]}`}>
                {quest.difficulty}
              </span>
              {quest.type === 'FOCUS TIMER' && (
                <span className="flex items-center gap-1">
                  <Timer size={11} /> {quest.duration}m
                </span>
              )}
            </div>
          </div>
        </div>

        {ascended ? (
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold tracking-[0.1em] text-cyan">
            <Check size={14} /> ASCENDED
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1 text-cyan">
            <Zap size={12} /> +{quest.xp} XP
          </span>
          <span className="flex items-center gap-1 text-gold">
            <Circle size={7} className="fill-gold" /> +{quest.credits}
          </span>
        </div>

        {!ascended && (
          <Button variant="ghost" className="px-4 py-2 text-xs" onClick={() => onBegin?.(quest)}>
            Begin Quest
          </Button>
        )}
      </div>
    </motion.div>
  )
}
