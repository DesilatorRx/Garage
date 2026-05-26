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
    trims: [
      { name: 'F1', years: [1992, 1998] },
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
    trims: [
      { name: 'MP4-12C', years: [2011, 2012] },
      { name: '12C', years: [2012, 2014] },
      { name: '12C Spider', years: [2012, 2014] },
    ],
  },
  {
    id: 'mclaren-650s', brand: BRAND, displayName: '650S',
    modelLine: '650S', yearStart: 2014, yearEnd: 2017,
    trims: [
      { name: '650S Coupe', years: [2014, 2017] },
      { name: '650S Spider', years: [2014, 2017] },
      { name: '650S Le Mans', years: [2015, 2015] },
    ],
  },
  {
    id: 'mclaren-675lt', brand: BRAND, displayName: '675LT',
    modelLine: '675LT', yearStart: 2015, yearEnd: 2016,
    trims: [
      { name: '675LT Coupe', years: [2015, 2016] },
      { name: '675LT Spider', years: [2016, 2016] },
    ],
  },
  {
    id: 'mclaren-720s', brand: BRAND, displayName: '720S',
    modelLine: '720S', yearStart: 2017, yearEnd: 2022,
    trims: [
      { name: '720S Coupe', years: [2017, 2022] },
      { name: '720S Spider', years: [2018, 2022] },
      { name: '720S Le Mans Edition', years: [2020, 2020] },
    ],
  },
  {
    id: 'mclaren-765lt', brand: BRAND, displayName: '765LT',
    modelLine: '765LT', yearStart: 2020, yearEnd: 2022,
    trims: [
      { name: '765LT Coupe', years: [2020, 2022] },
      { name: '765LT Spider', years: [2021, 2022] },
    ],
  },
  {
    id: 'mclaren-750s', brand: BRAND, displayName: '750S',
    modelLine: '750S', yearStart: 2023, yearEnd: ONGOING,
    trims: [
      { name: '750S Coupe', years: [2024, ONGOING] },
      { name: '750S Spider', years: [2024, ONGOING] },
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
    trims: [{ name: '540C', years: [2015, 2020] }],
  },
  {
    id: 'mclaren-570', brand: BRAND, displayName: '570',
    modelLine: 'Sports Series', yearStart: 2015, yearEnd: 2021,
    trims: [
      { name: '570S', years: [2015, 2021] },
      { name: '570S Spider', years: [2017, 2021] },
      { name: '570GT', years: [2016, 2021] },
    ],
  },
  {
    id: 'mclaren-600lt', brand: BRAND, displayName: '600LT',
    modelLine: 'Sports Series', yearStart: 2018, yearEnd: 2020,
    trims: [
      { name: '600LT Coupe', years: [2018, 2020] },
      { name: '600LT Spider', years: [2019, 2020] },
    ],
  },
  {
    id: 'mclaren-620r', brand: BRAND, displayName: '620R',
    modelLine: 'Sports Series', yearStart: 2020, yearEnd: 2021,
    trims: [{ name: '620R', years: [2020, 2021] }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Grand Tourer
 * ──────────────────────────────────────────────────────────────────────── */
const G_GT: Generation[] = [
  {
    id: 'mclaren-gt', brand: BRAND, displayName: 'GT',
    modelLine: 'GT', yearStart: 2019, yearEnd: 2024,
    trims: [{ name: 'GT', years: [2020, 2024] }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  V6 hybrid (Artura)
 * ──────────────────────────────────────────────────────────────────────── */
const G_ARTURA: Generation[] = [
  {
    id: 'mclaren-artura', brand: BRAND, displayName: 'Artura',
    modelLine: 'Artura', yearStart: 2022, yearEnd: ONGOING,
    trims: [
      { name: 'Artura Coupe', years: [2022, ONGOING] },
      { name: 'Artura Spider', years: [2024, ONGOING] },
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
    trims: [
      { name: 'P1', years: [2013, 2015] },
      { name: 'P1 LM (road-converted)', years: [2016, 2017] },
    ],
  },
  {
    id: 'mclaren-senna', brand: BRAND, displayName: 'Senna',
    modelLine: 'Senna', yearStart: 2018, yearEnd: 2020,
    trims: [{ name: 'Senna', years: [2018, 2020] }],
  },
  {
    id: 'mclaren-speedtail', brand: BRAND, displayName: 'Speedtail',
    modelLine: 'Speedtail', yearStart: 2019, yearEnd: 2020,
    trims: [{ name: 'Speedtail', years: [2020, 2020] }],
  },
  {
    id: 'mclaren-elva', brand: BRAND, displayName: 'Elva',
    modelLine: 'Elva', yearStart: 2020, yearEnd: 2022,
    trims: [{ name: 'Elva', years: [2020, 2022] }],
  },
  {
    id: 'mclaren-sabre', brand: BRAND, displayName: 'Sabre',
    modelLine: 'Sabre', yearStart: 2020, yearEnd: 2021,
    trims: [{ name: 'Sabre', years: [2020, 2021] }],
  },
  {
    id: 'mclaren-solus-gt', brand: BRAND, displayName: 'Solus GT',
    modelLine: 'Solus GT', yearStart: 2022, yearEnd: 2024,
    trims: [{ name: 'Solus GT (track-only)', years: [2023, 2024] }],
  },
  {
    id: 'mclaren-w1', brand: BRAND, displayName: 'W1',
    modelLine: 'W1', yearStart: 2025, yearEnd: ONGOING,
    trims: [{ name: 'W1', years: [2026, ONGOING] }],
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
