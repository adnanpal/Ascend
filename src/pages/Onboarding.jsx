import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Circle, Zap } from 'lucide-react'
import ParticleField from '../components/layout/ParticleField'
import NebulaBackground from '../components/layout/NebulaBackground'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import AttributeCard from '../components/progression/AttributeCard'
import { mockAttributes, mockUser } from '../data/mockData'

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const totalSteps = 4

  const next = () => (step < totalSteps - 1 ? setStep((s) => s + 1) : navigate('/command'))

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void px-6 py-16">
      <NebulaBackground />
      <div className="absolute inset-0 bg-radial-fade" />
      <ParticleField count={40} />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        {/* step indicator */}
        <div className="mb-10 flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === step ? 'w-8 bg-cyan' : 'w-4 bg-line-bright'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5 }}>
              <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-muted">STEP 1</p>
              <h1 className="font-display text-3xl tracking-wide text-white md:text-4xl">WELCOME, ASCENDER</h1>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Your everyday actions are about to become quests.
              </p>

              <div className="relative mx-auto mt-10 h-56 w-56">
                <div className="absolute inset-0 rounded-full border border-cyan/15 animate-spin-slow" />
                <div className="absolute inset-6 rounded-full border border-violet/15 animate-spin-slower" />
                <div
                  className="absolute inset-14 rounded-full animate-pulse-slow"
                  style={{ background: 'radial-gradient(circle, rgba(95,227,211,0.18), transparent 70%)' }}
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5 }}>
              <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-muted">STEP 2</p>
              <h1 className="font-display text-3xl tracking-wide text-white md:text-4xl">YOUR QUESTS SHAPE YOU</h1>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Complete real-life quests to earn XP and Credits.
              </p>

              <div className="glass-panel mx-auto mt-10 max-w-xs rounded-sm p-5 text-left">
                <p className="text-sm font-semibold text-white">Study React</p>
                <div className="mt-3 flex items-center gap-4 text-sm font-semibold">
                  <span className="flex items-center gap-1 text-cyan">
                    <Zap size={13} /> +120 XP
                  </span>
                  <span className="flex items-center gap-1 text-gold">
                    <Circle size={7} className="fill-gold" /> +30 Credits
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5 }} className="w-full">
              <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-muted">STEP 3</p>
              <h1 className="font-display text-3xl tracking-wide text-white md:text-4xl">DEVELOP YOUR ATTRIBUTES</h1>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Six life attributes track your growth as you complete quests.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-3">
                {mockAttributes.map((a) => (
                  <AttributeCard key={a.key} attributeKey={a.key} {...a} size="compact" />
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5 }} className="w-full max-w-sm">
              <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-muted">STEP 4</p>
              <h1 className="font-display text-3xl tracking-wide text-white md:text-4xl">ASCEND</h1>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Earn enough XP to level up. Every level represents progress in your real life.
              </p>

              <div className="glass-panel mt-10 rounded-sm p-6 text-left">
                <p className="font-display text-2xl tracking-widest text-white">
                  LEVEL {String(mockUser.level).padStart(2, '0')}
                </p>
                <ProgressBar value={mockUser.xp} max={mockUser.xpToNext} className="mt-5" label="XP progress" />
                <p className="mt-2 text-xs text-muted">
                  {mockUser.xp.toLocaleString()} / {mockUser.xpToNext.toLocaleString()} XP
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button onClick={next} className="mt-12">
          {step < totalSteps - 1 ? 'Continue' : 'Begin Journey'}
        </Button>
      </div>
    </div>
  )
}
