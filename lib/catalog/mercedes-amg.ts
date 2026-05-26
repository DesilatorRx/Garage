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
    trims: [
      { name: 'SLR McLaren', years: [2003, 2008] },
      { name: 'SLR McLaren Roadster', years: [2007, 2009] },
      { name: 'SLR McLaren 722 Edition', years: [2006, 2008] },
      { name: 'SLR McLaren 722 GT', years: [2007, 2008] },
      { name: 'SLR McLaren Roadster 722 S', years: [2009, 2009] },
      { name: 'SLR Stirling Moss', years: [2009, 2010] },
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
    trims: [
      { name: 'SLS AMG', years: [2010, 2014] },
      { name: 'SLS AMG Roadster', years: [2011, 2014] },
      { name: 'SLS AMG GT', years: [2012, 2014] },
      { name: 'SLS AMG GT Roadster', years: [2012, 2014] },
      { name: 'SLS AMG Black Series', years: [2013, 2014] },
      { name: 'SLS AMG GT Final Edition', years: [2014, 2014] },
      { name: 'SLS AMG Electric Drive', years: [2013, 2014] },
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
    trims: [
      { name: 'AMG GT', years: [2015, 2021] },
      { name: 'AMG GT S', years: [2015, 2021] },
      { name: 'AMG GT C', years: [2017, 2021] },
      { name: 'AMG GT C Roadster', years: [2017, 2021] },
      { name: 'AMG GT Roadster', years: [2017, 2021] },
      { name: 'AMG GT R', years: [2017, 2021] },
      { name: 'AMG GT R Roadster', years: [2019, 2021] },
      { name: 'AMG GT R Pro', years: [2019, 2020] },
      { name: 'AMG GT Black Series', years: [2020, 2021] },
    ],
  },
  {
    id: 'mercedes-amg-gt-4-door-x290', brand: BRAND, displayName: 'AMG GT 4-Door (X290)',
    modelLine: 'AMG GT 4-Door', yearStart: 2018, yearEnd: 2024,
    trims: [
      { name: 'AMG GT 43 4-Door', years: [2019, 2024] },
      { name: 'AMG GT 50 4-Door', years: [2019, 2024] },
      { name: 'AMG GT 53 4-Door', years: [2019, 2024] },
      { name: 'AMG GT 63 4-Door', years: [2019, 2024] },
      { name: 'AMG GT 63 S 4-Door', years: [2019, 2024] },
      { name: 'AMG GT 63 S E Performance', years: [2022, 2024] },
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
    trims: [
      { name: 'AMG GT 43', years: [2024, ONGOING] },
      { name: 'AMG GT 55', years: [2024, ONGOING] },
      { name: 'AMG GT 63', years: [2024, ONGOING] },
      { name: 'AMG GT 63 S E Performance', years: [2025, ONGOING] },
      { name: 'AMG GT 63 PRO', years: [2025, ONGOING] },
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
    trims: [{ name: 'AMG ONE', years: [2022, ONGOING] }],
  },
]

export const MERCEDES_AMG_GENERATIONS: Generation[] = [
  ...G_SLR,
  ...G_SLS,
  ...G_AMG_GT_C190,
  ...G_AMG_GT_C192,
  ...G_AMG_ONE,
]
