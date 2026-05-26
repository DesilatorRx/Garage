/**
 * Aston Martin road-car catalog, 1948–present.
 * Pre-DB7 cars are grouped at the generation level; individual coachwork
 * variants are listed where they trade as distinct items.
 */

import type { Generation } from './types'
import { ONGOING } from './types'

const BRAND = 'Aston Martin'

/* ──────────────────────────────────────────────────────────────────────────
 *  Pre-DB era
 * ──────────────────────────────────────────────────────────────────────── */
const G_PRE_DB: Generation[] = [
  {
    id: 'aston-2-litre-sports', brand: BRAND, displayName: '2-Litre Sports (DB1)',
    modelLine: '2-Litre Sports', yearStart: 1948, yearEnd: 1950,
    trims: [{ name: '2-Litre Sports (DB1)', years: [1948, 1950] }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Classic DB era (1950–1972)
 * ──────────────────────────────────────────────────────────────────────── */
const G_CLASSIC_DB: Generation[] = [
  {
    id: 'aston-db2', brand: BRAND, displayName: 'DB2',
    modelLine: 'DB2', yearStart: 1950, yearEnd: 1953,
    trims: [
      { name: 'DB2', years: [1950, 1953] },
      { name: 'DB2 Vantage', years: [1951, 1953] },
      { name: 'DB2 Drophead Coupe', years: [1950, 1953] },
    ],
  },
  {
    id: 'aston-db2-4', brand: BRAND, displayName: 'DB2/4',
    modelLine: 'DB2/4', yearStart: 1953, yearEnd: 1957,
    trims: [
      { name: 'DB2/4', years: [1953, 1955] },
      { name: 'DB2/4 Mk II', years: [1955, 1957] },
    ],
  },
  {
    id: 'aston-db-mark-iii', brand: BRAND, displayName: 'DB Mark III',
    modelLine: 'DB Mark III', yearStart: 1957, yearEnd: 1959,
    trims: [{ name: 'DB Mark III', years: [1957, 1959] }],
  },
  {
    id: 'aston-db4', brand: BRAND, displayName: 'DB4',
    modelLine: 'DB4', yearStart: 1958, yearEnd: 1963,
    trims: [
      { name: 'DB4', years: [1958, 1963] },
      { name: 'DB4 Vantage', years: [1961, 1963] },
      { name: 'DB4 GT', years: [1959, 1963] },
      { name: 'DB4 GT Zagato', years: [1960, 1963] },
      { name: 'DB4 Convertible', years: [1961, 1963] },
    ],
  },
  {
    id: 'aston-db5', brand: BRAND, displayName: 'DB5',
    modelLine: 'DB5', yearStart: 1963, yearEnd: 1965,
    trims: [
      { name: 'DB5', years: [1963, 1965] },
      { name: 'DB5 Vantage', years: [1964, 1965] },
      { name: 'DB5 Convertible', years: [1963, 1965] },
      { name: 'DB5 Shooting Brake', years: [1964, 1965] },
    ],
  },
  {
    id: 'aston-db6', brand: BRAND, displayName: 'DB6',
    modelLine: 'DB6', yearStart: 1965, yearEnd: 1971,
    trims: [
      { name: 'DB6', years: [1965, 1969] },
      { name: 'DB6 Vantage', years: [1965, 1969] },
      { name: 'DB6 Volante', years: [1966, 1969] },
      { name: 'DB6 Mk II', years: [1969, 1971] },
      { name: 'DB6 Mk II Volante', years: [1969, 1971] },
    ],
  },
  {
    id: 'aston-dbs-v8', brand: BRAND, displayName: 'DBS / DBS V8',
    modelLine: 'DBS', yearStart: 1967, yearEnd: 1972,
    trims: [
      { name: 'DBS', years: [1967, 1972] },
      { name: 'DBS V8', years: [1969, 1972] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  V8 / Lagonda / Virage era (1972–2000)
 * ──────────────────────────────────────────────────────────────────────── */
const G_V8_VIRAGE: Generation[] = [
  {
    id: 'aston-v8', brand: BRAND, displayName: 'V8 / V8 Vantage',
    modelLine: 'V8', yearStart: 1972, yearEnd: 1989,
    trims: [
      { name: 'V8 (Series 2/3/4)', years: [1972, 1985] },
      { name: 'V8 Vantage', years: [1977, 1989] },
      { name: 'V8 Volante', years: [1978, 1989] },
      { name: 'V8 Vantage Volante', years: [1986, 1989] },
      { name: 'V8 Zagato Coupe', years: [1986, 1989] },
      { name: 'V8 Zagato Volante', years: [1987, 1990] },
    ],
  },
  {
    id: 'aston-lagonda', brand: BRAND, displayName: 'Lagonda',
    modelLine: 'Lagonda', yearStart: 1976, yearEnd: 1990,
    trims: [
      { name: 'Lagonda Series 2', years: [1976, 1985] },
      { name: 'Lagonda Series 3', years: [1985, 1986] },
      { name: 'Lagonda Series 4', years: [1986, 1990] },
    ],
  },
  {
    id: 'aston-virage', brand: BRAND, displayName: 'Virage',
    modelLine: 'Virage', yearStart: 1989, yearEnd: 1996,
    trims: [
      { name: 'Virage', years: [1989, 1995] },
      { name: 'Virage Volante', years: [1990, 1995] },
      { name: 'Virage Shooting Brake', years: [1992, 1995] },
      { name: 'Virage Vantage', years: [1993, 1996] },
      { name: 'Virage 6.3', years: [1992, 1995] },
    ],
  },
  {
    id: 'aston-v8-vantage-v550', brand: BRAND, displayName: 'V8 Vantage (V550)',
    modelLine: 'V8 Vantage', yearStart: 1993, yearEnd: 2000,
    trims: [
      { name: 'V8 Vantage V550', years: [1993, 2000] },
      { name: 'V8 Vantage V600', years: [1998, 2000] },
      { name: 'V8 Vantage Le Mans', years: [1999, 2000] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Modern era — DB7 onward (1994+)
 * ──────────────────────────────────────────────────────────────────────── */
const G_DB7: Generation[] = [
  {
    id: 'aston-db7', brand: BRAND, displayName: 'DB7',
    modelLine: 'DB7', yearStart: 1994, yearEnd: 2004,
    trims: [
      { name: 'DB7', years: [1994, 1999] },
      { name: 'DB7 Volante', years: [1996, 1999] },
      { name: 'DB7 Vantage', years: [1999, 2003] },
      { name: 'DB7 Vantage Volante', years: [1999, 2003] },
      { name: 'DB7 GT', years: [2002, 2004] },
      { name: 'DB7 GTA', years: [2002, 2004] },
      { name: 'DB7 Zagato', years: [2003, 2004] },
      { name: 'DB AR1', years: [2003, 2004] },
    ],
  },
]

const G_VANQUISH_V12: Generation[] = [
  {
    id: 'aston-vanquish-v12', brand: BRAND, displayName: 'V12 Vanquish',
    modelLine: 'Vanquish', yearStart: 2001, yearEnd: 2007,
    trims: [
      { name: 'V12 Vanquish', years: [2001, 2007] },
      { name: 'V12 Vanquish S', years: [2004, 2007] },
      { name: 'V12 Vanquish S Ultimate Edition', years: [2007, 2007] },
    ],
  },
  {
    id: 'aston-vanquish-2012', brand: BRAND, displayName: 'Vanquish (2012)',
    modelLine: 'Vanquish', yearStart: 2012, yearEnd: 2018,
    trims: [
      { name: 'Vanquish', years: [2012, 2018] },
      { name: 'Vanquish Volante', years: [2013, 2018] },
      { name: 'Vanquish S', years: [2017, 2018] },
      { name: 'Vanquish S Volante', years: [2017, 2018] },
      { name: 'Vanquish Zagato Coupe', years: [2016, 2017] },
      { name: 'Vanquish Zagato Volante', years: [2017, 2018] },
      { name: 'Vanquish Zagato Shooting Brake', years: [2018, 2018] },
      { name: 'Vanquish Zagato Speedster', years: [2018, 2018] },
    ],
  },
  {
    id: 'aston-vanquish-2024', brand: BRAND, displayName: 'Vanquish (2024)',
    modelLine: 'Vanquish', yearStart: 2024, yearEnd: ONGOING,
    trims: [
      { name: 'Vanquish', years: [2025, ONGOING] },
      { name: 'Vanquish Volante', years: [2025, ONGOING] },
    ],
  },
]

const G_DB9_DB11_DB12: Generation[] = [
  {
    id: 'aston-db9', brand: BRAND, displayName: 'DB9',
    modelLine: 'DB9', yearStart: 2004, yearEnd: 2016,
    trims: [
      { name: 'DB9', years: [2004, 2016] },
      { name: 'DB9 Volante', years: [2004, 2016] },
      { name: 'DB9 GT', years: [2015, 2016] },
      { name: 'DB9 GT Volante', years: [2015, 2016] },
      { name: 'DB9 Carbon Black', years: [2014, 2016] },
      { name: 'DB9 Carbon White', years: [2014, 2016] },
    ],
  },
  {
    id: 'aston-virage-2011', brand: BRAND, displayName: 'Virage (2011)',
    modelLine: 'Virage', yearStart: 2011, yearEnd: 2012,
    trims: [
      { name: 'Virage', years: [2011, 2012] },
      { name: 'Virage Volante', years: [2012, 2012] },
    ],
  },
  {
    id: 'aston-db11', brand: BRAND, displayName: 'DB11',
    modelLine: 'DB11', yearStart: 2016, yearEnd: 2023,
    trims: [
      { name: 'DB11 V12', years: [2016, 2018] },
      { name: 'DB11 V8', years: [2017, 2023] },
      { name: 'DB11 AMR', years: [2018, 2023] },
      { name: 'DB11 Volante', years: [2018, 2023] },
    ],
  },
  {
    id: 'aston-db12', brand: BRAND, displayName: 'DB12',
    modelLine: 'DB12', yearStart: 2023, yearEnd: ONGOING,
    trims: [
      { name: 'DB12 Coupe', years: [2024, ONGOING] },
      { name: 'DB12 Volante', years: [2024, ONGOING] },
    ],
  },
]

const G_DBS: Generation[] = [
  {
    id: 'aston-dbs-2007', brand: BRAND, displayName: 'DBS (2007)',
    modelLine: 'DBS', yearStart: 2007, yearEnd: 2012,
    trims: [
      { name: 'DBS Coupe', years: [2007, 2012] },
      { name: 'DBS Volante', years: [2009, 2012] },
      { name: 'DBS Carbon Black Edition', years: [2010, 2012] },
      { name: 'DBS Carbon White Edition', years: [2011, 2012] },
      { name: 'DBS Ultimate Edition', years: [2012, 2012] },
    ],
  },
  {
    id: 'aston-dbs-superleggera', brand: BRAND, displayName: 'DBS Superleggera',
    modelLine: 'DBS', yearStart: 2018, yearEnd: 2023,
    trims: [
      { name: 'DBS Superleggera', years: [2018, 2023] },
      { name: 'DBS Superleggera Volante', years: [2019, 2023] },
      { name: 'DBS 770 Ultimate', years: [2023, 2023] },
      { name: 'DBS GT Zagato', years: [2020, 2021] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Vantage (modern) + Rapide
 * ──────────────────────────────────────────────────────────────────────── */
const G_VANTAGE_MODERN: Generation[] = [
  {
    id: 'aston-v8-vantage-2005', brand: BRAND, displayName: 'V8/V12 Vantage (2005)',
    modelLine: 'Vantage', yearStart: 2005, yearEnd: 2017,
    trims: [
      { name: 'V8 Vantage', years: [2005, 2017] },
      { name: 'V8 Vantage Roadster', years: [2007, 2017] },
      { name: 'V8 Vantage S', years: [2011, 2017] },
      { name: 'V8 Vantage N430', years: [2014, 2016] },
      { name: 'V8 Vantage GT', years: [2014, 2016] },
      { name: 'V12 Vantage', years: [2009, 2013] },
      { name: 'V12 Vantage Roadster', years: [2012, 2014] },
      { name: 'V12 Vantage S', years: [2013, 2017] },
      { name: 'V12 Vantage S Roadster', years: [2014, 2017] },
      { name: 'V12 Vantage AMR', years: [2017, 2018] },
    ],
  },
  {
    id: 'aston-vantage-2018', brand: BRAND, displayName: 'Vantage (2018)',
    modelLine: 'Vantage', yearStart: 2018, yearEnd: 2023,
    trims: [
      { name: 'Vantage Coupe', years: [2018, 2023] },
      { name: 'Vantage Roadster', years: [2020, 2023] },
      { name: 'Vantage AMR', years: [2019, 2020] },
      { name: 'Vantage F1 Edition', years: [2021, 2023] },
      { name: 'V12 Vantage (2022)', years: [2022, 2023] },
      { name: 'V12 Vantage Roadster (2022)', years: [2022, 2023] },
    ],
  },
  {
    id: 'aston-vantage-2024', brand: BRAND, displayName: 'Vantage (2024)',
    modelLine: 'Vantage', yearStart: 2023, yearEnd: ONGOING,
    trims: [
      { name: 'Vantage Coupe', years: [2024, ONGOING] },
      { name: 'Vantage Roadster', years: [2024, ONGOING] },
      { name: 'Vantage S', years: [2025, ONGOING] },
    ],
  },
  {
    id: 'aston-rapide', brand: BRAND, displayName: 'Rapide',
    modelLine: 'Rapide', yearStart: 2009, yearEnd: 2020,
    trims: [
      { name: 'Rapide', years: [2010, 2013] },
      { name: 'Rapide S', years: [2013, 2018] },
      { name: 'Rapide AMR', years: [2019, 2020] },
      { name: 'Rapide E', years: [2020, 2020] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  DBX (SUV)
 * ──────────────────────────────────────────────────────────────────────── */
const G_DBX: Generation[] = [
  {
    id: 'aston-dbx', brand: BRAND, displayName: 'DBX',
    modelLine: 'DBX', yearStart: 2019, yearEnd: ONGOING,
    trims: [
      { name: 'DBX', years: [2020, ONGOING] },
      { name: 'DBX707', years: [2022, ONGOING] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Hypercars
 * ──────────────────────────────────────────────────────────────────────── */
const G_HALO: Generation[] = [
  {
    id: 'aston-one-77', brand: BRAND, displayName: 'One-77',
    modelLine: 'One-77', yearStart: 2009, yearEnd: 2012,
    trims: [{ name: 'One-77', years: [2009, 2012] }],
  },
  {
    id: 'aston-vulcan', brand: BRAND, displayName: 'Vulcan',
    modelLine: 'Vulcan', yearStart: 2015, yearEnd: 2017,
    trims: [{ name: 'Vulcan (track-only)', years: [2015, 2017] }],
  },
  {
    id: 'aston-valkyrie', brand: BRAND, displayName: 'Valkyrie',
    modelLine: 'Valkyrie', yearStart: 2021, yearEnd: ONGOING,
    trims: [
      { name: 'Valkyrie Coupe', years: [2021, ONGOING] },
      { name: 'Valkyrie Spider', years: [2022, ONGOING] },
      { name: 'Valkyrie AMR Pro (track)', years: [2021, ONGOING] },
    ],
  },
  {
    id: 'aston-valhalla', brand: BRAND, displayName: 'Valhalla',
    modelLine: 'Valhalla', yearStart: 2024, yearEnd: ONGOING,
    trims: [{ name: 'Valhalla', years: [2025, ONGOING] }],
  },
  {
    id: 'aston-valour', brand: BRAND, displayName: 'Valour',
    modelLine: 'Valour', yearStart: 2023, yearEnd: 2024,
    trims: [
      { name: 'Valour', years: [2023, 2024] },
      { name: 'Valiant', years: [2024, 2024] },
    ],
  },
]

export const ASTON_MARTIN_GENERATIONS: Generation[] = [
  ...G_PRE_DB,
  ...G_CLASSIC_DB,
  ...G_V8_VIRAGE,
  ...G_DB7,
  ...G_VANQUISH_V12,
  ...G_DB9_DB11_DB12,
  ...G_DBS,
  ...G_VANTAGE_MODERN,
  ...G_DBX,
  ...G_HALO,
]
