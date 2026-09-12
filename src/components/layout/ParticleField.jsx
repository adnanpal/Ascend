import { useMemo } from 'react'

/**
 * A field of faint, static-positioned points that twinkle, plus an
 * occasional streaking shooting star. Pure CSS/SVG — no canvas — so it
 * stays cheap and respects reduced motion via the global stylesheet rule.
 */
export default function ParticleField({ count = 40, shootingStars = true, className = '' }) {
  const points = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.3 + 0.3,
        baseOpacity: Math.random() * 0.4 + 0.15,
        duration: 2.5 + Math.random() * 4,
        delay: Math.random() * 6,
      })),
    [count]
  )

  const stars = useMemo(
    () =>
      shootingStars
        ? Array.from({ length: 3 }, (_, i) => ({
            id: i,
            top: 8 + Math.random() * 40,
            left: Math.random() * 50,
            delay: 4 + i * 7 + Math.random() * 5,
            duration: 1.6 + Math.random() * 0.8,
          }))
        : [],
    [shootingStars]
  )

  return (
    <div className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full">
        {points.map((p) => (
          <circle
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.r}
            fill="#5fe3d3"
            opacity={p.baseOpacity}
            style={{
              animation: `twinkle ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              transformOrigin: `${p.x}% ${p.y}%`,
            }}
          />
        ))}
      </svg>

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute h-px w-24 rounded-full opacity-0"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
            animation: `beam-sweep ${s.duration}s ease-in ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
