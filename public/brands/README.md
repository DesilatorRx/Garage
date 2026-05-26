# Brand badge assets

Each file here is shown on the landing page (`app/page.tsx`) and the sign-in page (`app/auth/login/page.tsx`) as part of the "tracked brands" strip.

## File contract

The brand-badge component looks up `/brands/<slug>.svg`. Slugs match the
`lib/catalog/<slug>.ts` filenames:

| Brand          | File path                      |
|----------------|--------------------------------|
| Aston Martin   | `public/brands/aston-martin.svg` |
| Ferrari        | `public/brands/ferrari.svg`      |
| Lamborghini    | `public/brands/lamborghini.svg`  |
| McLaren        | `public/brands/mclaren.svg`      |
| Mercedes-AMG   | `public/brands/mercedes-amg.svg` |
| Porsche        | `public/brands/porsche.svg`      |

## Replacing the placeholders

The current `.svg` files are monogram-style placeholders in each brand's accent color. To use higher-fidelity images:

1. Save your replacement as PNG / WebP / SVG at the **same path and filename slug** (e.g. `public/brands/porsche.png`).
2. If the extension differs from `.svg`, update the badge component
   ([components/brand-strip.tsx](../../components/brand-strip.tsx)) so the
   `src` reads `/brands/${slug}.png` (or use `.webp`).
3. Recommended source resolution: at least 512×512 with transparent background, square aspect ratio.

## Trademark note

Manufacturer badges and logos are trademarks of their respective owners. Using actual brand logos commercially typically requires permission. The placeholder SVGs in this directory are text-only and brand-colored; they don't reproduce any protected mark. If you swap them for real logos, make sure your use case (personal / non-commercial / licensed press kit) is appropriate.
