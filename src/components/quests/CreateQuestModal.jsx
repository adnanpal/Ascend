import { useState } from 'react'
import { Circle, Zap } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { questCategories, questDifficulties } from '../../data/mockData'

const durations = [15, 30, 45, 60, 90]

export default function CreateQuestModal({ open, onClose, onCreate }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(questCategories[0])
  const [difficulty, setDifficulty] = useState('MEDIUM')
  const [questType, setQuestType] = useState('INSTANT')
  const [duration, setDuration] = useState(30)

  const reward = questDifficulties.find((d) => d.key === difficulty)

  const reset = () => {
    setName('')
    setDescription('')
    setCategory(questCategories[0])
    setDifficulty('MEDIUM')
    setQuestType('INSTANT')
    setDuration(30)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onCreate?.({
      title: name.trim(),
      description,
      category,
      difficulty,
      type: questType,
      duration: questType === 'FOCUS TIMER' ? duration : undefined,
      xp: reward.xp,
      credits: reward.credits,
    })
    reset()
    onClose?.()
  }

  return (
    <Modal open={open} onClose={onClose} title="CREATE QUEST" labelledBy="create-quest-title">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="quest-name" className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-muted">
            Quest Name
          </label>
          <input
            id="quest-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Study React"
            className="w-full rounded-sm border border-line bg-white/5 px-3.5 py-2.5 text-sm text-white transition-all duration-200 placeholder:text-faint focus:border-cyan/50 focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-cyan focus:shadow-[0_0_0_4px_rgba(95,227,211,0.08)]"
          />
        </div>

        <div>
          <label htmlFor="quest-desc" className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-muted">
            Description
          </label>
          <textarea
            id="quest-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="What does completing this quest involve?"
            className="w-full resize-none rounded-sm border border-line bg-white/5 px-3.5 py-2.5 text-sm text-white transition-all duration-200 placeholder:text-faint focus:border-cyan/50 focus:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-cyan focus:shadow-[0_0_0_4px_rgba(95,227,211,0.08)]"
          />
        </div>

        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold tracking-[0.1em] text-muted">Category</legend>
          <div className="flex flex-wrap gap-2">
            {questCategories.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] transition-colors ${
                  category === c
                    ? 'border-cyan text-cyan bg-cyan/10'
                    : 'border-line text-muted hover:text-white hover:border-line-bright'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold tracking-[0.1em] text-muted">Difficulty</legend>
          <div className="flex gap-2">
            {questDifficulties.map((d) => (
              <button
                type="button"
                key={d.key}
                onClick={() => setDifficulty(d.key)}
                aria-pressed={difficulty === d.key}
                className={`flex-1 rounded-sm border px-3 py-2 text-xs font-semibold tracking-[0.08em] transition-colors ${
                  difficulty === d.key
                    ? 'border-violet text-violet bg-violet/10'
                    : 'border-line text-muted hover:text-white hover:border-line-bright'
                }`}
              >
                {d.key}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-1.5 text-xs font-semibold tracking-[0.1em] text-muted">Quest Type</legend>
          <div className="flex gap-2">
            {['INSTANT', 'FOCUS TIMER'].map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setQuestType(t)}
                aria-pressed={questType === t}
                className={`flex-1 rounded-sm border px-3 py-2 text-xs font-semibold tracking-[0.08em] transition-colors ${
                  questType === t
                    ? 'border-cyan text-cyan bg-cyan/10'
                    : 'border-line text-muted hover:text-white hover:border-line-bright'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        {questType === 'FOCUS TIMER' && (
          <fieldset>
            <legend className="mb-1.5 text-xs font-semibold tracking-[0.1em] text-muted">Duration</legend>
            <div className="flex flex-wrap gap-2">
              {durations.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setDuration(m)}
                  aria-pressed={duration === m}
                  className={`rounded-sm border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    duration === m
                      ? 'border-cyan text-cyan bg-cyan/10'
                      : 'border-line text-muted hover:text-white hover:border-line-bright'
                  }`}
                >
                  {m} min
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="flex items-center justify-between rounded-sm border border-line-bright bg-white/5 px-4 py-3">
          <span className="text-xs font-semibold tracking-[0.1em] text-muted">{difficulty} REWARD</span>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <span className="flex items-center gap-1 text-cyan">
              <Zap size={13} /> +{reward.xp} XP
            </span>
            <span className="flex items-center gap-1 text-gold">
              <Circle size={7} className="fill-gold" /> +{reward.credits}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <Button type="button" variant="subtle" onClick={onClose} className="px-5 py-2.5 text-xs">
            Cancel
          </Button>
          <Button type="submit" className="px-5 py-2.5 text-xs">
            Create Quest
          </Button>
        </div>
      </form>
    </Modal>
  )
}
