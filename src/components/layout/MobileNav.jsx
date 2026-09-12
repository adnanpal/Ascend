import { NavLink } from 'react-router-dom'
import { Compass, ListChecks, Sparkles, Store } from 'lucide-react'

const links = [
  { to: '/command', label: 'Command', icon: Compass },
  { to: '/quests', label: 'Quests', icon: ListChecks },
  { to: '/attributes', label: 'Attributes', icon: Sparkles },
  { to: '/market', label: 'Market', icon: Store },
]

export default function MobileNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-void/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-center justify-around px-2 py-2">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-sm px-4 py-1.5 text-[10px] font-semibold tracking-wider transition-colors ${
                  isActive ? 'text-cyan' : 'text-muted hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
