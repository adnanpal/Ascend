import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Circle, User } from 'lucide-react'
import { useAppState } from '../../context/AppState'
import AnimatedNumber from '../ui/AnimatedNumber'

const links = [
  { to: '/command', label: 'COMMAND' },
  { to: '/quests', label: 'QUESTS' },
  { to: '/attributes', label: 'ATTRIBUTES' },
  { to: '/market', label: 'MARKET' },
]

export default function TopNav() {
  const { user } = useAppState()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <span className="font-display text-lg tracking-[0.2em] text-white">ASCEND</span>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8 text-xs font-semibold tracking-[0.18em] text-muted">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative py-2 transition-colors hover:text-white ${
                        isActive ? 'text-white' : ''
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <span className="absolute -bottom-[1px] left-0 h-px w-full bg-gradient-to-r from-cyan to-transparent" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-5 text-xs font-semibold tracking-[0.14em]">
          <span className="hidden sm:inline text-muted">
            LVL{' '}
            <span className="text-white">
              <AnimatedNumber value={user.level} format={(v) => String(Math.round(v)).padStart(2, '0')} />
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-gold">
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Circle size={7} className="fill-gold text-gold" />
            </motion.span>
            <AnimatedNumber value={user.credits} />
          </span>
          <button
            aria-label="Profile"
            className="grid h-8 w-8 place-items-center rounded-full hairline text-muted transition-colors hover:text-white hover:border-line-bright"
          >
            <User size={15} />
          </button>
        </div>
      </div>
    </header>
  )
}
