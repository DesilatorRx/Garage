/**
 * McLaren road-car catalog, 1992–present.
 * Includes the original F1 plus the modern Woking lineup that started in 2011.
 */

import type { Generation } from './types'
import { ONGOING } from './types'

const BRAND = 'McLaren'

/* ──────────────────────────────────────────────────────────────────────────
 *  Original F1 (1992–1998)
 * ──────────────────────────────────────────────────────────────────────── */
const G_F1: Generation[] = [
  {
    id: 'mclaren-f1', brand: BRAND, displayName: 'F1',
    modelLine: 'F1', yearStart: 1992, yearEnd: 1998,
    baseMSRP: { amount: 815000, currency: 'USD', year: 1994 },
    trims: [
      { name: 'F1',    years: [1992, 1998], msrp: { amount: 815000, currency: 'USD', year: 1994 } },
      { name: 'F1 LM', years: [1995, 1995] },
      { name: 'F1 GT', years: [1997, 1997] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Super Series (2011–2022)
 * ──────────────────────────────────────────────────────────────────────── */
const G_SUPER_SERIES: Generation[] = [
  {
    id: 'mclaren-12c', brand: BRAND, displayName: 'MP4-12C / 12C',
    modelLine: '12C', yearStart: 2011, yearEnd: 2014,
    baseMSRP: { amount: 229000, currency: 'USD', year: 2012 },
    trims: [
      { name: 'MP4-12C',    years: [2011, 2012], msrp: { amount: 229000, currency: 'USD', year: 2012 } },
      { name: '12C',        years: [2012, 2014], msrp: { amount: 239400, currency: 'USD', year: 2013 } },
      { name: '12C Spider', years: [2012, 2014], msrp: { amount: 268250, currency: 'USD', year: 2013 } },
    ],
  },
  {
    id: 'mclaren-650s', brand: BRAND, displayName: '650S',
    modelLine: '650S', yearStart: 2014, yearEnd: 2017,
    baseMSRP: { amount: 265500, currency: 'USD', year: 2015 },
    trims: [
      { name: '650S Coupe',   years: [2014, 2017], msrp: { amount: 265500, currency: 'USD', year: 2015 } },
      { name: '650S Spider',  years: [2014, 2017], msrp: { amount: 280225, currency: 'USD', year: 2015 } },
      { name: '650S Le Mans', years: [2015, 2015], msrp: { amount: 332000, currency: 'USD', year: 2015 } },
    ],
  },
  {
    id: 'mclaren-675lt', brand: BRAND, displayName: '675LT',
    modelLine: '675LT', yearStart: 2015, yearEnd: 2016,
    baseMSRP: { amount: 349500, currency: 'USD', year: 2016 },
    trims: [
      { name: '675LT Coupe',  years: [2015, 2016], msrp: { amount: 349500, currency: 'USD', year: 2016 } },
      { name: '675LT Spider', years: [2016, 2016], msrp: { amount: 372600, currency: 'USD', year: 2016 } },
    ],
  },
  {
    id: 'mclaren-720s', brand: BRAND, displayName: '720S',
    modelLine: '720S', yearStart: 2017, yearEnd: 2022,
    baseMSRP: { amount: 284745, currency: 'USD', year: 2018 },
    trims: [
      { name: '720S Coupe',           years: [2017, 2022], msrp: { amount: 284745, currency: 'USD', year: 2018 } },
      { name: '720S Spider',          years: [2018, 2022], msrp: { amount: 315000, currency: 'USD', year: 2019 } },
      { name: '720S Le Mans Edition', years: [2020, 2020], msrp: { amount: 370000, currency: 'USD', year: 2020 } },
    ],
  },
  {
    id: 'mclaren-765lt', brand: BRAND, displayName: '765LT',
    modelLine: '765LT', yearStart: 2020, yearEnd: 2022,
    baseMSRP: { amount: 358000, currency: 'USD', year: 2021 },
    trims: [
      { name: '765LT Coupe',  years: [2020, 2022], msrp: { amount: 358000, currency: 'USD', year: 2021 } },
      { name: '765LT Spider', years: [2021, 2022], msrp: { amount: 388000, currency: 'USD', year: 2022 } },
    ],
  },
  {
    id: 'mclaren-750s', brand: BRAND, displayName: '750S',
    modelLine: '750S', yearStart: 2023, yearEnd: ONGOING,
    baseMSRP: { amount: 324440, currency: 'USD', year: 2024 },
    trims: [
      { name: '750S Coupe',  years: [2024, ONGOING], msrp: { amount: 324440, currency: 'USD', year: 2024 } },
      { name: '750S Spider', years: [2024, ONGOING], msrp: { amount: 345610, currency: 'USD', year: 2024 } },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Sports Series (2015–2021)
 * ──────────────────────────────────────────────────────────────────────── */
const G_SPORTS_SERIES: Generation[] = [
  {
    id: 'mclaren-540c', brand: BRAND, displayName: '540C',
    modelLine: 'Sports Series', yearStart: 2015, yearEnd: 2020,
    baseMSRP: { amount: 165000, currency: 'USD', year: 2016 },
    trims: [{ name: '540C', years: [2015, 2020], msrp: { amount: 165000, currency: 'USD', year: 2016 } }],
  },
  {
    id: 'mclaren-570', brand: BRAND, displayName: '570',
    modelLine: 'Sports Series', yearStart: 2015, yearEnd: 2021,
    baseMSRP: { amount: 184900, currency: 'USD', year: 2016 },
    trims: [
      { name: '570S',        years: [2015, 2021], msrp: { amount: 184900, currency: 'USD', year: 2016 } },
      { name: '570S Spider', years: [2017, 2021], msrp: { amount: 208800, currency: 'USD', year: 2018 } },
      { name: '570GT',       years: [2016, 2021], msrp: { amount: 199600, currency: 'USD', year: 2017 } },
    ],
  },
  {
    id: 'mclaren-600lt', brand: BRAND, displayName: '600LT',
    modelLine: 'Sports Series', yearStart: 2018, yearEnd: 2020,
    baseMSRP: { amount: 240000, currency: 'USD', year: 2019 },
    trims: [
      { name: '600LT Coupe',  years: [2018, 2020], msrp: { amount: 240000, currency: 'USD', year: 2019 } },
      { name: '600LT Spider', years: [2019, 2020], msrp: { amount: 256500, currency: 'USD', year: 2020 } },
    ],
  },
  {
    id: 'mclaren-620r', brand: BRAND, displayName: '620R',
    modelLine: 'Sports Series', yearStart: 2020, yearEnd: 2021,
    baseMSRP: { amount: 293000, currency: 'USD', year: 2020 },
    trims: [{ name: '620R', years: [2020, 2021], msrp: { amount: 293000, currency: 'USD', year: 2020 } }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Grand Tourer
 * ──────────────────────────────────────────────────────────────────────── */
const G_GT: Generation[] = [
  {
    id: 'mclaren-gt', brand: BRAND, displayName: 'GT',
    modelLine: 'GT', yearStart: 2019, yearEnd: 2024,
    baseMSRP: { amount: 210000, currency: 'USD', year: 2020 },
    trims: [{ name: 'GT', years: [2020, 2024], msrp: { amount: 210000, currency: 'USD', year: 2020 } }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  V6 hybrid (Artura)
 * ──────────────────────────────────────────────────────────────────────── */
const G_ARTURA: Generation[] = [
  {
    id: 'mclaren-artura', brand: BRAND, displayName: 'Artura',
    modelLine: 'Artura', yearStart: 2022, yearEnd: ONGOING,
    baseMSRP: { amount: 233000, currency: 'USD', year: 2023 },
    trims: [
      { name: 'Artura Coupe',  years: [2022, ONGOING], msrp: { amount: 233000, currency: 'USD', year: 2023 } },
      { name: 'Artura Spider', years: [2024, ONGOING], msrp: { amount: 273800, currency: 'USD', year: 2024 } },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Ultimate Series (halo)
 * ──────────────────────────────────────────────────────────────────────── */
const G_ULTIMATE: Generation[] = [
  {
    id: 'mclaren-p1', brand: BRAND, displayName: 'P1',
    modelLine: 'P1', yearStart: 2013, yearEnd: 2015,
    baseMSRP: { amount: 1150000, currency: 'USD', year: 2014 },
    trims: [
      { name: 'P1',                       years: [2013, 2015], msrp: { amount: 1150000, currency: 'USD', year: 2014 } },
      { name: 'P1 LM (road-converted)',   years: [2016, 2017] },
    ],
  },
  {
    id: 'mclaren-senna', brand: BRAND, displayName: 'Senna',
    modelLine: 'Senna', yearStart: 2018, yearEnd: 2020,
    baseMSRP: { amount: 958966, currency: 'USD', year: 2019 },
    trims: [{ name: 'Senna', years: [2018, 2020], msrp: { amount: 958966, currency: 'USD', year: 2019 } }],
  },
  {
    id: 'mclaren-speedtail', brand: BRAND, displayName: 'Speedtail',
    modelLine: 'Speedtail', yearStart: 2019, yearEnd: 2020,
    baseMSRP: { amount: 2250000, currency: 'USD', year: 2020 },
    trims: [{ name: 'Speedtail', years: [2020, 2020], msrp: { amount: 2250000, currency: 'USD', year: 2020 } }],
  },
  {
    id: 'mclaren-elva', brand: BRAND, displayName: 'Elva',
    modelLine: 'Elva', yearStart: 2020, yearEnd: 2022,
    baseMSRP: { amount: 1690000, currency: 'USD', year: 2020 },
    trims: [{ name: 'Elva', years: [2020, 2022], msrp: { amount: 1690000, currency: 'USD', year: 2020 } }],
  },
  {
    id: 'mclaren-sabre', brand: BRAND, displayName: 'Sabre',
    modelLine: 'Sabre', yearStart: 2020, yearEnd: 2021,
    baseMSRP: { amount: 3500000, currency: 'USD', year: 2021 },
    trims: [{ name: 'Sabre', years: [2020, 2021], msrp: { amount: 3500000, currency: 'USD', year: 2021 } }],
  },
  {
    id: 'mclaren-solus-gt', brand: BRAND, displayName: 'Solus GT',
    modelLine: 'Solus GT', yearStart: 2022, yearEnd: 2024,
    baseMSRP: { amount: 3500000, currency: 'USD', year: 2023 },
    trims: [{ name: 'Solus GT (track-only)', years: [2023, 2024], msrp: { amount: 3500000, currency: 'USD', year: 2023 } }],
  },
  {
    id: 'mclaren-w1', brand: BRAND, displayName: 'W1',
    modelLine: 'W1', yearStart: 2025, yearEnd: ONGOING,
    baseMSRP: { amount: 2100000, currency: 'USD', year: 2026 },
    trims: [{ name: 'W1', years: [2026, ONGOING], msrp: { amount: 2100000, currency: 'USD', year: 2026 } }],
  },
]

export const MCLAREN_GENERATIONS: Generation[] = [
  ...G_F1,
  ...G_SUPER_SERIES,
  ...G_SPORTS_SERIES,
  ...G_GT,
  ...G_ARTURA,
  ...G_ULTIMATE,
]
