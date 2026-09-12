import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-gradient-to-b from-cyan to-cyan-dim text-[#04120f] shadow-[0_0_30px_rgba(95,227,211,0.25)] hover:shadow-[0_0_42px_rgba(95,227,211,0.4)]',
  ghost:
    'bg-transparent text-white hairline hover:border-line-bright hover:bg-white/5',
  danger:
    'bg-transparent text-[#e88b7a] border border-[#5a2f2a] hover:bg-[#3a1a17] hover:border-[#e88b7a]/60',
  subtle:
    'bg-white/5 text-muted hairline hover:text-white hover:bg-white/10',
}

const Button = forwardRef(function Button(
  { variant = 'primary', className = '', children, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`btn-shine inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-[0.12em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-cyan disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
})

export default Button
