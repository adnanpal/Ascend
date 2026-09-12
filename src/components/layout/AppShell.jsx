import { useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TopNav from './TopNav'
import MobileNav from './MobileNav'
import NebulaBackground from './NebulaBackground'

export default function AppShell() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-void">
      <NebulaBackground position="fixed inset-0" className="opacity-60" />
      <div className="relative z-10">
        <TopNav />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-7xl px-6 pb-28 pt-8 md:pb-16"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <MobileNav />
      </div>
    </div>
  )
}
