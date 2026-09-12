import { motion } from 'framer-motion'
import ParticleField from '../layout/ParticleField'
import CharacterScene from '../character/CharacterScene'

export default function CharacterChamber({ title = 'CHARACTER CHAMBER', subtitle = 'Your evolution will appear here.', height = 'h-[480px] md:h-[560px]' }) {
  return (
    <div className={`relative overflow-hidden rounded-sm hairline bg-void-2 ${height}`}>
      {/* atmosphere */}
      <div className="absolute inset-0 bg-radial-fade" />
      <ParticleField count={32} />

      {/* slow light sweep across the chamber */}
      <motion.div
        className="absolute inset-y-0 w-1/3 opacity-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(95,227,211,0.06), transparent)',
        }}
        animate={{ x: ['-40%', '340%'], opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
      />

      {/* orbiting rings + motes */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid place-items-center">
          <div className="absolute h-[380px] w-[380px] rounded-full border border-cyan/10 animate-spin-slow md:h-[440px] md:w-[440px]" />
          <div className="absolute h-[320px] w-[320px] rounded-full border border-violet/10 animate-spin-slower md:h-[370px] md:w-[370px]" />
          <div className="absolute h-[260px] w-[260px] rounded-full border border-white/5 md:h-[300px] md:w-[300px]" />

          {/* orbiting motes riding the outer ring */}
          <motion.div
            className="absolute h-[380px] w-[380px] md:h-[440px] md:w-[440px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(95,227,211,0.6)]" />
          </motion.div>
          <motion.div
            className="absolute h-[320px] w-[320px] md:h-[370px] md:w-[370px]"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute left-1/2 bottom-0 h-1 w-1 -translate-x-1/2 rounded-full bg-violet shadow-[0_0_8px_2px_rgba(156,140,255,0.6)]" />
          </motion.div>

          {/* platform */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[190px] w-[190px] rounded-full md:h-[220px] md:w-[220px]"
            style={{
              background:
                'radial-gradient(circle at 50% 40%, rgba(95,227,211,0.16), rgba(95,227,211,0.02) 60%, transparent 72%)',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan/20"
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-1/2 top-[85%] h-2 w-2/3 -translate-x-1/2 rounded-full bg-cyan/20 blur-md"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
       <div className="absolute inset-0 z-10 pointer-events-auto">
        <CharacterScene />
      </div>

      {/* HUD corner marks */}
      <div className="absolute left-5 top-5 h-6 w-6 border-l border-t border-line-bright/60" />
      <div className="absolute right-5 top-5 h-6 w-6 border-r border-t border-line-bright/60" />
      <div className="absolute bottom-5 left-5 h-6 w-6 border-b border-l border-line-bright/60" />
      <div className="absolute bottom-5 right-5 h-6 w-6 border-b border-r border-line-bright/60" />

      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1.5 text-center">
        <p className="font-display text-sm tracking-[0.3em] text-white/80">{title}</p>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
    </div>
  )
}
