import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import ProgressRing from '../components/ui/ProgressRing'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import ParticleField from '../components/layout/ParticleField'
import NebulaBackground from '../components/layout/NebulaBackground'
import { useAppState } from '../context/AppState'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function FocusQuest() {
  const location = useLocation()
  const navigate = useNavigate()
  const { completeQuest } = useAppState()

  const quest = location.state?.quest ?? {
    id: 'demo',
    title: 'Study React',
    duration: 60,
  }

  const totalSeconds = (quest.duration ?? 60) * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [running, setRunning] = useState(true)
  const [showAbandon, setShowAbandon] = useState(false)
  const [complete, setComplete] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running || complete) return
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current)
          setComplete(true)
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, complete])

  const progress = 1 - secondsLeft / totalSeconds

  const handleFinish = () => {
    if (quest.id !== 'demo') completeQuest(quest.id)
    navigate('/quests')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void px-6 py-16">
      <NebulaBackground />
      <div className="absolute inset-0 bg-radial-fade" />
      <ParticleField count={complete ? 90 : 30} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-muted">FOCUS QUEST</p>
        <h1 className="mt-3 font-display text-2xl tracking-wide text-white md:text-3xl">{quest.title}</h1>

        <motion.div
          animate={{ scale: running && !complete ? [1, 1.015, 1] : 1 }}
          transition={{ duration: 4, repeat: running && !complete ? Infinity : 0, ease: 'easeInOut' }}
          className="mt-10"
        >
          <ProgressRing progress={complete ? 1 : progress} size={280} strokeWidth={3} color={complete ? '#e8c77a' : '#5fe3d3'}>
            <div className="flex flex-col items-center">
              <span className="font-display text-4xl tabular-nums tracking-wider text-white md:text-5xl">
                {complete ? 'DONE' : formatTime(secondsLeft)}
              </span>
              <span className="mt-2 text-[11px] tracking-[0.2em] text-muted">
                {complete ? 'MISSION COMPLETE' : running ? 'IN PROGRESS' : 'PAUSED'}
              </span>
            </div>
          </ProgressRing>
        </motion.div>

        <p className="mt-8 max-w-xs text-sm text-muted">
          {complete ? 'You held the line. Claim your reward.' : 'Stay focused. Complete the mission.'}
        </p>

        <div className="mt-10 flex items-center gap-4">
          {complete ? (
            <Button onClick={handleFinish}>Claim Reward</Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setRunning((r) => !r)} className="px-6">
                {running ? <Pause size={15} /> : <Play size={15} />}
                {running ? 'Pause' : 'Resume'}
              </Button>
              <Button variant="danger" onClick={() => setShowAbandon(true)} className="px-6">
                Abandon Quest
              </Button>
            </>
          )}
        </div>
      </div>

      <Modal
        open={showAbandon}
        onClose={() => setShowAbandon(false)}
        title="ABANDON QUEST?"
        labelledBy="abandon-title"
      >
        <p className="text-sm leading-relaxed text-muted">
          Leaving this quest before completion may reduce or forfeit your reward.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="subtle" onClick={() => setShowAbandon(false)} className="px-5 py-2.5 text-xs">
            Continue Quest
          </Button>
          <Button variant="danger" onClick={() => navigate('/quests')} className="px-5 py-2.5 text-xs">
            Abandon
          </Button>
        </div>
      </Modal>
    </div>
  )
}
