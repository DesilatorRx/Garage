/**
 * Horizontal strip of brand badges shown on the landing page and the sign-in
 * page. Source images live in `public/brands/<slug>.svg` — see
 * `public/brands/README.md` for the slug → brand mapping and how to swap in
 * higher-fidelity replacements.
 */

interface BrandStripProps {
  className?: string
}

interface BrandBadge {
  slug: string
  name: string
}

const BRAND_BADGES: BrandBadge[] = [
  { slug: 'porsche',       name: 'Porsche' },
  { slug: 'ferrari',       name: 'Ferrari' },
  { slug: 'lamborghini',   name: 'Lamborghini' },
  { slug: 'mclaren',       name: 'McLaren' },
  { slug: 'aston-martin',  name: 'Aston Martin' },
  { slug: 'mercedes-amg',  name: 'Mercedes-AMG' },
]

export function BrandStrip({ className = '' }: BrandStripProps) {
  return (
    <div className={`flex w-full flex-col items-center gap-3 ${className}`}>
      <p className="text-xs text-muted-foreground uppercase tracking-widest">
        Tracking the marques
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {BRAND_BADGES.map((b) => (
          <img
            key={b.slug}
            src={`/brands/${b.slug}.svg`}
            alt={b.name}
            title={b.name}
            className="h-14 w-14 md:h-16 md:w-16 opacity-80 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
