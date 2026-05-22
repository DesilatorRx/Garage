export function PorscheCrest({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="76" height="92" rx="6" stroke="hsl(0, 0%, 75%)" strokeWidth="2.5" fill="hsl(0, 0%, 8%)" />
      <rect x="8" y="8" width="64" height="80" rx="3" stroke="hsl(0, 72%, 51%)" strokeWidth="1.5" fill="none" />
      <line x1="40" y1="8" x2="40" y2="88" stroke="hsl(0, 0%, 20%)" strokeWidth="0.5" />
      <line x1="8" y1="48" x2="72" y2="48" stroke="hsl(0, 0%, 20%)" strokeWidth="0.5" />
      <text x="40" y="38" textAnchor="middle" fill="hsl(0, 0%, 93%)" fontSize="10" fontWeight="bold" fontFamily="serif" letterSpacing="2">PORSCHE</text>
      <text x="40" y="62" textAnchor="middle" fill="hsl(0, 72%, 51%)" fontSize="22" fontWeight="bold" fontFamily="serif">G</text>
      <circle cx="40" cy="56" r="12" stroke="hsl(0, 0%, 75%)" strokeWidth="0.5" fill="none" />
    </svg>
  )
}
