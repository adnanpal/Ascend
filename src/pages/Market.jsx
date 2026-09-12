import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Circle, Gem, ScrollText, Sparkle, SwatchBook } from 'lucide-react'
import Button from '../components/ui/Button'
import AnimatedNumber from '../components/ui/AnimatedNumber'
import { useAppState } from '../context/AppState'

const iconFor = {
  theme: SwatchBook,
  badge: Gem,
  aura: Sparkle,
  title: ScrollText,
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function Market() {
  const { user, market, buyItem } = useAppState()
  const [justBought, setJustBought] = useState(null)

  const handleBuy = (item) => {
    buyItem(item.id)
    setJustBought(item.id)
    setTimeout(() => setJustBought(null), 900)
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl tracking-wide text-white">ASCENSION MARKET</h1>
          <p className="mt-2 text-sm text-muted">Spend what you&apos;ve earned. Adorn your ascension.</p>
        </div>
        <div className="glass-panel flex items-center gap-2 rounded-sm px-4 py-2.5 text-sm font-semibold">
          <span className="text-[11px] tracking-[0.1em] text-muted">AVAILABLE CREDITS</span>
          <span className="flex items-center gap-1 text-gold">
            <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.4, repeat: Infinity }}>
              <Circle size={7} className="fill-gold" />
            </motion.span>
            <AnimatedNumber value={user.credits} />
          </span>
        </div>
      </div>

      <motion.div variants={gridVariants} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {market.map((item) => {
          const Icon = iconFor[item.kind]
          const affordable = user.credits >= item.price || item.owned
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-sm glass-panel p-6 transition-shadow duration-300 hover:shadow-[0_0_34px_rgba(156,140,255,0.14)]"
            >
              <AnimatePresence>
                {justBought === item.id && (
                  <motion.div
                    initial={{ opacity: 0.9, scale: 0.6 }}
                    animate={{ opacity: 0, scale: 2.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(95,227,211,0.35), transparent 70%)' }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                className="grid h-12 w-12 place-items-center rounded-full hairline text-violet"
              >
                <Icon size={20} strokeWidth={1.6} />
              </motion.div>
              <h3 className="mt-5 text-sm font-semibold tracking-[0.08em] text-white">{item.name}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{item.description}</p>

              <div className="mt-6 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm font-semibold text-gold">
                  <Circle size={7} className="fill-gold" /> {item.price.toLocaleString()}
                </span>

                {item.owned ? (
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                    className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] text-cyan"
                  >
                    <Check size={14} /> OWNED
                  </motion.span>
                ) : (
                  <Button
                    variant={affordable ? 'primary' : 'subtle'}
                    disabled={!affordable}
                    onClick={() => handleBuy(item)}
                    className="px-4 py-2 text-xs"
                  >
                    Buy
                  </Button>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
