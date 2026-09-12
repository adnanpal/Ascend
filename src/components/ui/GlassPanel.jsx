export default function GlassPanel({ as: Comp = 'div', className = '', children, ...props }) {
  return (
    <Comp className={`glass-panel rounded-sm ${className}`} {...props}>
      {children}
    </Comp>
  )
}
