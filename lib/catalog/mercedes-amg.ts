/**
 * Mercedes-AMG high-performance halo catalog: SLS, SLR, AMG GT, AMG ONE.
 * Bread-and-butter AMG sedans/wagons are intentionally out of scope —
 * this is the collectible/halo lineup.
 */

import type { Generation } from './types'
import { ONGOING } from './types'

const BRAND = 'Mercedes-AMG'

/* ──────────────────────────────────────────────────────────────────────────
 *  SLR McLaren (joint program with McLaren)
 * ──────────────────────────────────────────────────────────────────────── */
const G_SLR: Generation[] = [
  {
    id: 'mercedes-slr-mclaren', brand: BRAND, displayName: 'SLR McLaren',
    modelLine: 'SLR McLaren', yearStart: 2003, yearEnd: 2010,
    baseMSRP: { amount: 452750, currency: 'USD', year: 2005 },
    trims: [
      { name: 'SLR McLaren',                years: [2003, 2008], msrp: { amount: 452750,  currency: 'USD', year: 2005 } },
      { name: 'SLR McLaren Roadster',       years: [2007, 2009], msrp: { amount: 495000,  currency: 'USD', year: 2008 } },
      { name: 'SLR McLaren 722 Edition',    years: [2006, 2008], msrp: { amount: 475000,  currency: 'USD', year: 2007 } },
      { name: 'SLR McLaren 722 GT',         years: [2007, 2008] },
      { name: 'SLR McLaren Roadster 722 S', years: [2009, 2009] },
      { name: 'SLR Stirling Moss',          years: [2009, 2010], msrp: { amount: 1000000, currency: 'USD', year: 2009 } },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  SLS AMG (2010–2014)
 * ──────────────────────────────────────────────────────────────────────── */
const G_SLS: Generation[] = [
  {
    id: 'mercedes-sls-amg', brand: BRAND, displayName: 'SLS AMG',
    modelLine: 'SLS AMG', yearStart: 2010, yearEnd: 2014,
    baseMSRP: { amount: 192600, currency: 'USD', year: 2011 },
    trims: [
      { name: 'SLS AMG',                  years: [2010, 2014], msrp: { amount: 192600, currency: 'USD', year: 2011 } },
      { name: 'SLS AMG Roadster',         years: [2011, 2014], msrp: { amount: 202650, currency: 'USD', year: 2012 } },
      { name: 'SLS AMG GT',               years: [2012, 2014], msrp: { amount: 200000, currency: 'USD', year: 2013 } },
      { name: 'SLS AMG GT Roadster',      years: [2012, 2014], msrp: { amount: 215600, currency: 'USD', year: 2013 } },
      { name: 'SLS AMG Black Series',     years: [2013, 2014], msrp: { amount: 275000, currency: 'USD', year: 2014 } },
      { name: 'SLS AMG GT Final Edition', years: [2014, 2014] },
      { name: 'SLS AMG Electric Drive',   years: [2013, 2014], msrp: { amount: 541000, currency: 'USD', year: 2013 } },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  AMG GT (first gen, C190 — 2014–2021)
 * ──────────────────────────────────────────────────────────────────────── */
const G_AMG_GT_C190: Generation[] = [
  {
    id: 'mercedes-amg-gt-c190', brand: BRAND, displayName: 'AMG GT (C190)',
    modelLine: 'AMG GT', yearStart: 2014, yearEnd: 2021,
    baseMSRP: { amount: 111200, currency: 'USD', year: 2016 },
    trims: [
      { name: 'AMG GT',              years: [2015, 2021], msrp: { amount: 111200, currency: 'USD', year: 2016 } },
      { name: 'AMG GT S',            years: [2015, 2021], msrp: { amount: 129900, currency: 'USD', year: 2016 } },
      { name: 'AMG GT C',            years: [2017, 2021], msrp: { amount: 145000, currency: 'USD', year: 2018 } },
      { name: 'AMG GT C Roadster',   years: [2017, 2021], msrp: { amount: 157995, currency: 'USD', year: 2018 } },
      { name: 'AMG GT Roadster',     years: [2017, 2021], msrp: { amount: 124400, currency: 'USD', year: 2018 } },
      { name: 'AMG GT R',            years: [2017, 2021], msrp: { amount: 157995, currency: 'USD', year: 2018 } },
      { name: 'AMG GT R Roadster',   years: [2019, 2021] },
      { name: 'AMG GT R Pro',        years: [2019, 2020], msrp: { amount: 199950, currency: 'USD', year: 2020 } },
      { name: 'AMG GT Black Series', years: [2020, 2021], msrp: { amount: 325000, currency: 'USD', year: 2021 } },
    ],
  },
  {
    id: 'mercedes-amg-gt-4-door-x290', brand: BRAND, displayName: 'AMG GT 4-Door (X290)',
    modelLine: 'AMG GT 4-Door', yearStart: 2018, yearEnd: 2024,
    baseMSRP: { amount: 95000, currency: 'USD', year: 2019 },
    trims: [
      { name: 'AMG GT 43 4-Door',         years: [2019, 2024], msrp: { amount: 95000,  currency: 'USD', year: 2020 } },
      { name: 'AMG GT 50 4-Door',         years: [2019, 2024] },
      { name: 'AMG GT 53 4-Door',         years: [2019, 2024], msrp: { amount: 100450, currency: 'USD', year: 2020 } },
      { name: 'AMG GT 63 4-Door',         years: [2019, 2024], msrp: { amount: 138000, currency: 'USD', year: 2019 } },
      { name: 'AMG GT 63 S 4-Door',       years: [2019, 2024], msrp: { amount: 159000, currency: 'USD', year: 2019 } },
      { name: 'AMG GT 63 S E Performance', years: [2022, 2024], msrp: { amount: 197550, currency: 'USD', year: 2023 } },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  AMG GT (second gen, C192 — 2023–present)
 * ──────────────────────────────────────────────────────────────────────── */
const G_AMG_GT_C192: Generation[] = [
  {
    id: 'mercedes-amg-gt-c192', brand: BRAND, displayName: 'AMG GT (C192)',
    modelLine: 'AMG GT', yearStart: 2023, yearEnd: ONGOING,
    baseMSRP: { amount: 138000, currency: 'USD', year: 2024 },
    trims: [
      { name: 'AMG GT 43',                 years: [2024, ONGOING], msrp: { amount: 138000, currency: 'USD', year: 2024 } },
      { name: 'AMG GT 55',                 years: [2024, ONGOING], msrp: { amount: 152150, currency: 'USD', year: 2025 } },
      { name: 'AMG GT 63',                 years: [2024, ONGOING], msrp: { amount: 175450, currency: 'USD', year: 2024 } },
      { name: 'AMG GT 63 S E Performance', years: [2025, ONGOING], msrp: { amount: 214150, currency: 'USD', year: 2025 } },
      { name: 'AMG GT 63 PRO',             years: [2025, ONGOING], msrp: { amount: 200000, currency: 'USD', year: 2025 } },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  AMG ONE (hypercar, 2022+)
 * ──────────────────────────────────────────────────────────────────────── */
const G_AMG_ONE: Generation[] = [
  {
    id: 'mercedes-amg-one', brand: BRAND, displayName: 'AMG ONE',
    modelLine: 'AMG ONE', yearStart: 2022, yearEnd: ONGOING,
    baseMSRP: { amount: 2720000, currency: 'USD', year: 2023 },
    trims: [{ name: 'AMG ONE', years: [2022, ONGOING], msrp: { amount: 2720000, currency: 'USD', year: 2023 } }],
  },
]

export const MERCEDES_AMG_GENERATIONS: Generation[] = [
  ...G_SLR,
  ...G_SLS,
  ...G_AMG_GT_C190,
  ...G_AMG_GT_C192,
  ...G_AMG_ONE,
]
