import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import QuestCard from '../components/quests/QuestCard'
import CreateQuestModal from '../components/quests/CreateQuestModal'
import Button from '../components/ui/Button'
import { useAppState } from '../context/AppState'

export default function Quests() {
  const { quests, addQuest, completeQuest } = useAppState()
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const active = quests.filter((q) => q.status === 'active')
  const ascended = quests.filter((q) => q.status === 'ascended')

  const handleBegin = (quest) => {
    if (quest.type === 'FOCUS TIMER') {
      navigate('/focus', { state: { quest } })
    } else {
      completeQuest(quest.id)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-wide text-white">TODAY&apos;S QUESTS</h1>
          <p className="mt-2 text-sm text-muted">Complete your missions. Advance yourself.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="w-fit">
          <Plus size={15} /> New Quest
        </Button>
      </div>

      <div className="mt-10 space-y-4">
        {active.map((quest, i) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <QuestCard quest={quest} onBegin={handleBegin} />
          </motion.div>
        ))}
        {active.length === 0 && (
          <p className="rounded-sm hairline p-8 text-center text-sm text-muted">
            No active quests. Create one to begin your ascension.
          </p>
        )}
      </div>

      {ascended.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xs font-semibold tracking-[0.16em] text-muted">ASCENDED</h2>
          <div className="space-y-4">
            {ascended.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>
      )}

      <CreateQuestModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={addQuest} />
    </div>
  )
}
