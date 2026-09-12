import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { attributeMeta } from '../../data/mockData'
import ParticleField from '../layout/ParticleField'

const tint = {
  ember: 'text-ember',
  cyan: 'text-cyan',
  amber: 'text-amber',
  violet: 'text-violet',
  teal: 'text-teal',
  blue: 'text-blue',
}

export default function LevelUpModal({
  payload,
  onClose,
  onRevealCharacter,
}) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!payload) {
      setStage(0)
      return
    }

    const timers = [
      // Energy begins
      setTimeout(() => setStage(1), 150),

      // Show LEVEL 01 → LEVEL 02
      setTimeout(() => setStage(2), 1000),

      // Character reveal sequence
      setTimeout(() => setStage(3), 1900),

      // Actually switch the 3D character
      setTimeout(() => {
        onRevealCharacter?.()
        setStage(4)
      }, 2800),
    ]

    return () => timers.forEach(clearTimeout)
  }, [payload, onRevealCharacter])

  if (!payload) return null

  const meta = attributeMeta[payload.attributeKey]

  return createPortal(
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Level up"
        className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Dark cinematic backdrop */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.86 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Particles */}
        <div className="absolute inset-0">
          <ParticleField
            count={stage >= 1 ? 110 : 30}
            shootingStars={false}
          />
        </div>

        {/* Radiating energy rays */}
        {stage >= 1 && (
          <div className="absolute left-1/2 top-1/2 h-0 w-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-0 top-0 h-px origin-left"
                style={{
                  width: 520,
                  background:
                    'linear-gradient(90deg, rgba(95,227,211,0.55), transparent)',
                  rotate: `${i * 30}deg`,
                }}
                initial={{
                  scaleX: 0,
                  opacity: 0,
                }}
                animate={{
                  scaleX: [0, 1, 0.3],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.3,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.04,
                }}
              />
            ))}
          </div>
        )}

        {/* Reveal flash */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={
            stage >= 3
              ? {
                opacity: [0, 0, 0.85, 0],
              }
              : {
                opacity: 0,
              }
          }
          transition={{
            duration: 0.9,
            times: [0, 0.45, 0.58, 1],
            ease: 'easeOut',
          }}
        />

        {/* Expanding energy ring */}
        <motion.div
          className="absolute rounded-full border border-cyan/40"
          initial={{
            width: 10,
            height: 10,
            opacity: 0,
          }}
          animate={
            stage >= 1
              ? {
                width: 900,
                height: 900,
                opacity: [0, 0.6, 0],
                borderWidth: [2, 1, 0],
              }
              : {}
          }
          transition={{
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            boxShadow:
              '0 0 80px rgba(95,227,211,0.35)',
          }}
        />
        {/* Character ascension pulse */}
        {stage >= 3 && (
          <>
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/60"
              initial={{
                scale: 0.2,
                opacity: 0,
              }}
              animate={{
                scale: [0.2, 1, 2.8],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-2xl"
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1.5, 3],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
              }}
            />
          </>
        )}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <AnimatePresence mode="wait">

            {/* STAGE 0 + 1 */}
            {stage < 2 && (
              <motion.div
                key="levelup-text"
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  letterSpacing: '0.1em',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  letterSpacing: '0.35em',
                }}
                exit={{
                  opacity: 0,
                  scale: 1.1,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-glow-cyan text-4xl text-white md:text-6xl"
              >
                LEVEL UP
              </motion.div>
            )}

            {/* STAGE 2 */}
            {stage >= 2 && stage < 3 && (
              <motion.div
                key="level-transition"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="flex items-center gap-5 font-display text-3xl text-white md:text-5xl"
              >
                <span className="text-muted">
                  LEVEL{' '}
                  {String(payload.fromLevel).padStart(2, '0')}
                </span>

                <span className="text-cyan">
                  →
                </span>

                <span className="text-glow-cyan text-white">
                  LEVEL{' '}
                  {String(payload.toLevel).padStart(2, '0')}
                </span>
              </motion.div>
            )}

            {/* STAGE 3 — NEW CHARACTER */}
            {stage === 3 && (
              <motion.div
                key="character-reveal"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  filter: 'blur(14px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  scale: 1.12,
                  filter: 'blur(8px)',
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center gap-4"
              >
                <p className="font-display text-xs tracking-[0.45em] text-cyan">
                  NEW FORM UNLOCKED
                </p>

                <p className="font-display text-5xl tracking-[0.2em] text-white text-glow-cyan md:text-7xl">
                  LEVEL{' '}
                  {String(payload.toLevel).padStart(2, '0')}
                </p>

                <motion.div
                  initial={{
                    width: 0,
                    opacity: 0,
                  }}
                  animate={{
                    width: 180,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 0.5,
                  }}
                  className="h-px bg-cyan"
                />

                <p className="text-xs font-semibold tracking-[0.3em] text-violet">
                  ASCENSION FORM ACQUIRED
                </p>
              </motion.div>
            )}

            {/* STAGE 4 — REWARDS */}
            {stage >= 4 && (
              <motion.div
                key="rewards"
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="flex flex-col items-center gap-7"
              >
                <p className="font-display text-xs tracking-[0.4em] text-cyan">
                  ASCENSION COMPLETE
                </p>

                <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-semibold tracking-[0.12em] md:gap-8 md:text-base">
                  <span className={tint[meta.color]}>
                    +{payload.attributeGain}{' '}
                    {meta.label}
                  </span>

                  <span className="text-cyan">
                    +{payload.xpGained} XP
                  </span>

                  <span className="text-gold">
                    +{payload.creditsGained} CREDITS
                  </span>
                </div>

                <p className="font-display text-xs tracking-[0.4em] text-violet text-glow-violet">
                  YOUR ASCENSION CONTINUES
                </p>

                <button
                  onClick={onClose}
                  autoFocus
                  className="mt-2 rounded-sm border border-line-bright px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-white transition-colors hover:border-cyan hover:text-cyan focus-visible:outline-2 focus-visible:outline-cyan"
                >
                  CONTINUE
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}