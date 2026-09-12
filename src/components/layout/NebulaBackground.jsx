/**
 * Slow, blurred gradient blobs that give the void some atmosphere.
 * Pure CSS animation (no per-frame JS) so it's cheap, and respects
 * prefers-reduced-motion via the global stylesheet rule.
 */
export default function NebulaBackground({ className = '', position = 'absolute inset-0' }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${position} ${className}`} aria-hidden="true">
      <div
        className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(95,227,211,0.22), transparent 65%)',
          animation: 'nebula-drift-a 26s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -right-[15%] top-[10%] h-[55%] w-[55%] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(156,140,255,0.22), transparent 65%)',
          animation: 'nebula-drift-b 32s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[20%] h-[50%] w-[50%] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(232,199,122,0.14), transparent 65%)',
          animation: 'nebula-drift-a 38s ease-in-out infinite reverse',
        }}
      />
    </div>
  )
}
