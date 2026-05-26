/**
 * The Garage brand mark. Monogram-style "G" in a shield-like frame.
 * Replaces the prior Porsche-specific crest.
 */
export function GarageMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="The Garage"
    >
      <rect
        x="2"
        y="2"
        width="76"
        height="92"
        rx="6"
        stroke="hsl(0, 0%, 75%)"
        strokeWidth="2.5"
        fill="hsl(0, 0%, 8%)"
      />
      <rect
        x="8"
        y="8"
        width="64"
        height="80"
        rx="3"
        stroke="hsl(0, 72%, 51%)"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="40"
        y="34"
        textAnchor="middle"
        fill="hsl(0, 0%, 93%)"
        fontSize="8"
        fontWeight="bold"
        fontFamily="serif"
        letterSpacing="2.5"
      >
        THE GARAGE
      </text>
      <circle
        cx="40"
        cy="58"
        r="14"
        stroke="hsl(0, 0%, 75%)"
        strokeWidth="0.7"
        fill="none"
      />
      <text
        x="40"
        y="66"
        textAnchor="middle"
        fill="hsl(0, 72%, 51%)"
        fontSize="22"
        fontWeight="bold"
        fontFamily="serif"
      >
        G
      </text>
    </svg>
  )
}
