/**
 * Ferrari road-car catalog, 1948–present.
 * Older pre-1970 models are lumped where individual variants are hard to
 * distinguish in market listings.
 */

import type { Generation } from './types'
import { ONGOING } from './types'

const BRAND = 'Ferrari'

/* ──────────────────────────────────────────────────────────────────────────
 *  Early V12 Berlinetta era (1948–1973)
 * ──────────────────────────────────────────────────────────────────────── */
const G_EARLY_V12: Generation[] = [
  {
    id: 'ferrari-166', brand: BRAND, displayName: '166',
    modelLine: '166', yearStart: 1948, yearEnd: 1953,
    trims: [
      { name: '166 Inter', years: [1948, 1950] },
      { name: '166 MM Barchetta', years: [1948, 1953] },
      { name: '166 MM Berlinetta', years: [1948, 1953] },
    ],
  },
  {
    id: 'ferrari-195', brand: BRAND, displayName: '195',
    modelLine: '195', yearStart: 1950, yearEnd: 1952,
    trims: [
      { name: '195 Inter', years: [1950, 1952] },
      { name: '195 S', years: [1950, 1952] },
    ],
  },
  {
    id: 'ferrari-212', brand: BRAND, displayName: '212',
    modelLine: '212', yearStart: 1951, yearEnd: 1953,
    trims: [
      { name: '212 Inter', years: [1951, 1953] },
      { name: '212 Export', years: [1951, 1953] },
    ],
  },
  {
    id: 'ferrari-250', brand: BRAND, displayName: '250 series',
    modelLine: '250', yearStart: 1953, yearEnd: 1964,
    trims: [
      { name: '250 Europa', years: [1953, 1954] },
      { name: '250 Europa GT', years: [1954, 1956] },
      { name: '250 GT Boano', years: [1956, 1957] },
      { name: '250 GT Ellena', years: [1957, 1958] },
      { name: '250 GT Pininfarina Coupe', years: [1958, 1960] },
      { name: '250 GT Berlinetta Tour de France', years: [1956, 1959] },
      { name: '250 GT California Spider LWB', years: [1958, 1962] },
      { name: '250 GT California Spider SWB', years: [1960, 1963] },
      { name: '250 GT SWB Berlinetta', years: [1959, 1962] },
      { name: '250 GTO', years: [1962, 1964] },
      { name: '250 GTE 2+2', years: [1960, 1963] },
      { name: '250 GT Lusso', years: [1962, 1964] },
      { name: '250 LM', years: [1963, 1965] },
    ],
  },
  {
    id: 'ferrari-275', brand: BRAND, displayName: '275',
    modelLine: '275', yearStart: 1964, yearEnd: 1968,
    trims: [
      { name: '275 GTB', years: [1964, 1966] },
      { name: '275 GTB/4', years: [1966, 1968] },
      { name: '275 GTS', years: [1964, 1966] },
      { name: '275 GTB/4 NART Spider', years: [1967, 1968] },
    ],
  },
  {
    id: 'ferrari-330', brand: BRAND, displayName: '330',
    modelLine: '330', yearStart: 1963, yearEnd: 1968,
    trims: [
      { name: '330 America', years: [1963, 1964] },
      { name: '330 GT 2+2', years: [1964, 1967] },
      { name: '330 GTC', years: [1966, 1968] },
      { name: '330 GTS', years: [1966, 1968] },
    ],
  },
  {
    id: 'ferrari-365', brand: BRAND, displayName: '365',
    modelLine: '365', yearStart: 1966, yearEnd: 1974,
    trims: [
      { name: '365 California', years: [1966, 1967] },
      { name: '365 GT 2+2', years: [1967, 1971] },
      { name: '365 GTC', years: [1968, 1970] },
      { name: '365 GTS', years: [1969, 1970] },
      { name: '365 GTC/4', years: [1971, 1972] },
      { name: '365 GT4 2+2', years: [1972, 1976] },
      { name: '365 GTB/4 Daytona', years: [1968, 1973] },
      { name: '365 GTS/4 Daytona Spider', years: [1969, 1973] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Front-engine V12 GT era continued (1972–present)
 * ──────────────────────────────────────────────────────────────────────── */
const G_V12_GT: Generation[] = [
  {
    id: 'ferrari-365-bb', brand: BRAND, displayName: '365 GT4 BB',
    modelLine: 'Berlinetta Boxer', yearStart: 1973, yearEnd: 1976,
    trims: [{ name: '365 GT4 BB', years: [1973, 1976] }],
  },
  {
    id: 'ferrari-bb-512', brand: BRAND, displayName: 'BB 512',
    modelLine: 'Berlinetta Boxer', yearStart: 1976, yearEnd: 1984,
    trims: [
      { name: '512 BB', years: [1976, 1981] },
      { name: '512 BBi', years: [1981, 1984] },
    ],
  },
  {
    id: 'ferrari-testarossa', brand: BRAND, displayName: 'Testarossa',
    modelLine: 'Testarossa', yearStart: 1984, yearEnd: 1996,
    baseMSRP: { amount: 181000, currency: 'USD', year: 1985 },
    trims: [
      { name: 'Testarossa', years: [1984, 1991], msrp: { amount: 181000, currency: 'USD', year: 1985 } },
      { name: '512 TR',     years: [1991, 1994], msrp: { amount: 195000, currency: 'USD', year: 1992 } },
      { name: 'F512 M',     years: [1994, 1996], msrp: { amount: 219000, currency: 'USD', year: 1995 } },
    ],
  },
  {
    id: 'ferrari-412', brand: BRAND, displayName: '412',
    modelLine: '412', yearStart: 1985, yearEnd: 1989,
    trims: [{ name: '412', years: [1985, 1989] }],
  },
  {
    id: 'ferrari-456', brand: BRAND, displayName: '456',
    modelLine: '456', yearStart: 1992, yearEnd: 2003,
    trims: [
      { name: '456 GT', years: [1992, 1997] },
      { name: '456 GTA', years: [1996, 1997] },
      { name: '456 M GT', years: [1998, 2003] },
      { name: '456 M GTA', years: [1998, 2003] },
    ],
  },
  {
    id: 'ferrari-550', brand: BRAND, displayName: '550 Maranello',
    modelLine: '550', yearStart: 1996, yearEnd: 2002,
    baseMSRP: { amount: 209000, currency: 'USD', year: 1997 },
    trims: [
      { name: '550 Maranello',             years: [1996, 2002], msrp: { amount: 209000, currency: 'USD', year: 1997 } },
      { name: '550 Barchetta Pininfarina', years: [2000, 2001], msrp: { amount: 248000, currency: 'USD', year: 2001 } },
    ],
  },
  {
    id: 'ferrari-575', brand: BRAND, displayName: '575M Maranello',
    modelLine: '575', yearStart: 2002, yearEnd: 2006,
    baseMSRP: { amount: 244000, currency: 'USD', year: 2003 },
    trims: [
      { name: '575M Maranello',  years: [2002, 2006], msrp: { amount: 244000, currency: 'USD', year: 2003 } },
      { name: '575 Superamerica', years: [2005, 2006], msrp: { amount: 312000, currency: 'USD', year: 2006 } },
    ],
  },
  {
    id: 'ferrari-612', brand: BRAND, displayName: '612 Scaglietti',
    modelLine: '612', yearStart: 2004, yearEnd: 2011,
    baseMSRP: { amount: 260000, currency: 'USD', year: 2005 },
    trims: [
      { name: '612 Scaglietti',      years: [2004, 2011], msrp: { amount: 260000, currency: 'USD', year: 2005 } },
      { name: '612 Scaglietti HGTC', years: [2007, 2011], msrp: { amount: 308000, currency: 'USD', year: 2008 } },
    ],
  },
  {
    id: 'ferrari-599', brand: BRAND, displayName: '599',
    modelLine: '599', yearStart: 2006, yearEnd: 2012,
    baseMSRP: { amount: 310000, currency: 'USD', year: 2007 },
    trims: [
      { name: '599 GTB Fiorano', years: [2006, 2012], msrp: { amount: 310000, currency: 'USD', year: 2007 } },
      { name: '599 GTB HGTE',    years: [2009, 2012] },
      { name: '599 GTO',         years: [2010, 2012], msrp: { amount: 410000, currency: 'USD', year: 2011 } },
      { name: '599 SA Aperta',   years: [2010, 2011], msrp: { amount: 540000, currency: 'USD', year: 2011 } },
    ],
  },
  {
    id: 'ferrari-ff', brand: BRAND, displayName: 'FF',
    modelLine: 'FF', yearStart: 2011, yearEnd: 2016,
    baseMSRP: { amount: 295000, currency: 'USD', year: 2012 },
    trims: [{ name: 'FF', years: [2011, 2016], msrp: { amount: 295000, currency: 'USD', year: 2012 } }],
  },
  {
    id: 'ferrari-gtc4lusso', brand: BRAND, displayName: 'GTC4Lusso',
    modelLine: 'GTC4Lusso', yearStart: 2016, yearEnd: 2020,
    baseMSRP: { amount: 298000, currency: 'USD', year: 2017 },
    trims: [
      { name: 'GTC4Lusso',   years: [2016, 2020], msrp: { amount: 298000, currency: 'USD', year: 2017 } },
      { name: 'GTC4Lusso T', years: [2017, 2020], msrp: { amount: 260000, currency: 'USD', year: 2018 } },
    ],
  },
  {
    id: 'ferrari-f12', brand: BRAND, displayName: 'F12',
    modelLine: 'F12', yearStart: 2012, yearEnd: 2017,
    baseMSRP: { amount: 315000, currency: 'USD', year: 2013 },
    trims: [
      { name: 'F12 Berlinetta', years: [2012, 2017], msrp: { amount: 315000, currency: 'USD', year: 2013 } },
      { name: 'F12 TdF',        years: [2015, 2017], msrp: { amount: 490000, currency: 'USD', year: 2016 } },
    ],
  },
  {
    id: 'ferrari-812', brand: BRAND, displayName: '812',
    modelLine: '812', yearStart: 2017, yearEnd: ONGOING,
    baseMSRP: { amount: 336000, currency: 'USD', year: 2018 },
    trims: [
      { name: '812 Superfast',       years: [2017, 2022], msrp: { amount: 336000,  currency: 'USD', year: 2018 } },
      { name: '812 GTS',             years: [2019, 2022], msrp: { amount: 397000,  currency: 'USD', year: 2020 } },
      { name: '812 Competizione',    years: [2021, 2022], msrp: { amount: 599000,  currency: 'USD', year: 2022 } },
      { name: '812 Competizione A',  years: [2021, 2022], msrp: { amount: 678000,  currency: 'USD', year: 2022 } },
      { name: '12Cilindri',          years: [2024, ONGOING], msrp: { amount: 423000, currency: 'USD', year: 2025 } },
      { name: '12Cilindri Spider',   years: [2024, ONGOING], msrp: { amount: 470000, currency: 'USD', year: 2025 } },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Mid-engine V8 era (Dino through 296)
 * ──────────────────────────────────────────────────────────────────────── */
const G_MID_V8: Generation[] = [
  {
    id: 'ferrari-dino-206-246', brand: BRAND, displayName: 'Dino 206/246',
    modelLine: 'Dino', yearStart: 1968, yearEnd: 1974,
    trims: [
      { name: 'Dino 206 GT', years: [1968, 1969] },
      { name: 'Dino 246 GT', years: [1969, 1974] },
      { name: 'Dino 246 GTS', years: [1972, 1974] },
    ],
  },
  {
    id: 'ferrari-dino-308-gt4', brand: BRAND, displayName: 'Dino 308 GT4 / 208',
    modelLine: '308 GT4', yearStart: 1973, yearEnd: 1980,
    trims: [
      { name: '308 GT4', years: [1973, 1980] },
      { name: '208 GT4', years: [1975, 1980] },
    ],
  },
  {
    id: 'ferrari-308', brand: BRAND, displayName: '308',
    modelLine: '308', yearStart: 1975, yearEnd: 1985,
    trims: [
      { name: '308 GTB', years: [1975, 1980] },
      { name: '308 GTS', years: [1977, 1980] },
      { name: '308 GTBi', years: [1980, 1983] },
      { name: '308 GTSi', years: [1980, 1983] },
      { name: '308 GTB Quattrovalvole', years: [1982, 1985] },
      { name: '308 GTS Quattrovalvole', years: [1982, 1985] },
      { name: '208 GTB Turbo', years: [1982, 1985] },
    ],
  },
  {
    id: 'ferrari-mondial', brand: BRAND, displayName: 'Mondial',
    modelLine: 'Mondial', yearStart: 1980, yearEnd: 1993,
    trims: [
      { name: 'Mondial 8', years: [1980, 1982] },
      { name: 'Mondial Quattrovalvole', years: [1982, 1985] },
      { name: 'Mondial 3.2', years: [1985, 1989] },
      { name: 'Mondial t', years: [1989, 1993] },
      { name: 'Mondial Cabriolet', years: [1983, 1993] },
    ],
  },
  {
    id: 'ferrari-328', brand: BRAND, displayName: '328',
    modelLine: '328', yearStart: 1985, yearEnd: 1989,
    trims: [
      { name: '328 GTB', years: [1985, 1989] },
      { name: '328 GTS', years: [1985, 1989] },
    ],
  },
  {
    id: 'ferrari-348', brand: BRAND, displayName: '348',
    modelLine: '348', yearStart: 1989, yearEnd: 1995,
    trims: [
      { name: '348 tb', years: [1989, 1993] },
      { name: '348 ts', years: [1989, 1993] },
      { name: '348 GTB', years: [1993, 1995] },
      { name: '348 GTS', years: [1993, 1995] },
      { name: '348 Spider', years: [1993, 1995] },
      { name: '348 Challenge', years: [1993, 1995] },
    ],
  },
  {
    id: 'ferrari-f355', brand: BRAND, displayName: 'F355',
    modelLine: 'F355', yearStart: 1994, yearEnd: 1999,
    baseMSRP: { amount: 130000, currency: 'USD', year: 1995 },
    trims: [
      { name: 'F355 Berlinetta', years: [1994, 1999], msrp: { amount: 130000, currency: 'USD', year: 1995 } },
      { name: 'F355 GTS',        years: [1995, 1999], msrp: { amount: 135000, currency: 'USD', year: 1996 } },
      { name: 'F355 Spider',     years: [1995, 1999], msrp: { amount: 142000, currency: 'USD', year: 1996 } },
      { name: 'F355 F1',         years: [1997, 1999], msrp: { amount: 137000, currency: 'USD', year: 1998 } },
      { name: 'F355 Challenge',  years: [1995, 1999] },
    ],
  },
  {
    id: 'ferrari-360', brand: BRAND, displayName: '360',
    modelLine: '360', yearStart: 1999, yearEnd: 2005,
    baseMSRP: { amount: 145000, currency: 'USD', year: 2000 },
    trims: [
      { name: '360 Modena',            years: [1999, 2005], msrp: { amount: 145000, currency: 'USD', year: 2000 } },
      { name: '360 Spider',            years: [2000, 2005], msrp: { amount: 165000, currency: 'USD', year: 2001 } },
      { name: '360 Challenge Stradale', years: [2003, 2004], msrp: { amount: 192500, currency: 'USD', year: 2004 } },
      { name: '360 GT',                years: [2002, 2005] },
    ],
  },
  {
    id: 'ferrari-f430', brand: BRAND, displayName: 'F430',
    modelLine: 'F430', yearStart: 2004, yearEnd: 2009,
    baseMSRP: { amount: 186975, currency: 'USD', year: 2005 },
    trims: [
      { name: 'F430',                 years: [2004, 2009], msrp: { amount: 186975, currency: 'USD', year: 2005 } },
      { name: 'F430 Spider',          years: [2005, 2009], msrp: { amount: 217000, currency: 'USD', year: 2006 } },
      { name: 'F430 Scuderia',        years: [2007, 2009], msrp: { amount: 232000, currency: 'USD', year: 2008 } },
      { name: 'Scuderia Spider 16M',  years: [2008, 2009], msrp: { amount: 308000, currency: 'USD', year: 2009 } },
      { name: 'F430 Challenge',       years: [2005, 2009] },
    ],
  },
  {
    id: 'ferrari-458', brand: BRAND, displayName: '458',
    modelLine: '458', yearStart: 2009, yearEnd: 2016,
    baseMSRP: { amount: 230275, currency: 'USD', year: 2011 },
    trims: [
      { name: '458 Italia',                years: [2009, 2015], msrp: { amount: 230275, currency: 'USD', year: 2011 } },
      { name: '458 Spider',                years: [2011, 2015], msrp: { amount: 257500, currency: 'USD', year: 2012 } },
      { name: '458 Speciale',              years: [2013, 2015], msrp: { amount: 291744, currency: 'USD', year: 2014 } },
      { name: '458 Speciale A',            years: [2014, 2015], msrp: { amount: 330000, currency: 'USD', year: 2015 } },
      { name: '458 Challenge',             years: [2011, 2014] },
      { name: '458 Challenge Evoluzione',  years: [2014, 2016] },
    ],
  },
  {
    id: 'ferrari-488', brand: BRAND, displayName: '488',
    modelLine: '488', yearStart: 2015, yearEnd: 2020,
    baseMSRP: { amount: 245400, currency: 'USD', year: 2016 },
    trims: [
      { name: '488 GTB',          years: [2015, 2019], msrp: { amount: 245400, currency: 'USD', year: 2016 } },
      { name: '488 Spider',       years: [2015, 2019], msrp: { amount: 272700, currency: 'USD', year: 2017 } },
      { name: '488 Pista',        years: [2018, 2020], msrp: { amount: 350000, currency: 'USD', year: 2019 } },
      { name: '488 Pista Spider', years: [2018, 2020], msrp: { amount: 396000, currency: 'USD', year: 2020 } },
      { name: '488 Pista Piloti', years: [2019, 2020] },
      { name: '488 Challenge',    years: [2017, 2020] },
    ],
  },
  {
    id: 'ferrari-f8', brand: BRAND, displayName: 'F8',
    modelLine: 'F8', yearStart: 2019, yearEnd: 2023,
    baseMSRP: { amount: 276550, currency: 'USD', year: 2020 },
    trims: [
      { name: 'F8 Tributo', years: [2019, 2023], msrp: { amount: 276550, currency: 'USD', year: 2020 } },
      { name: 'F8 Spider',  years: [2020, 2023], msrp: { amount: 302500, currency: 'USD', year: 2021 } },
    ],
  },
  {
    id: 'ferrari-296', brand: BRAND, displayName: '296',
    modelLine: '296', yearStart: 2021, yearEnd: ONGOING,
    baseMSRP: { amount: 322986, currency: 'USD', year: 2022 },
    trims: [
      { name: '296 GTB',             years: [2022, ONGOING], msrp: { amount: 322986, currency: 'USD', year: 2022 } },
      { name: '296 GTS',             years: [2023, ONGOING], msrp: { amount: 357632, currency: 'USD', year: 2023 } },
      { name: '296 Speciale',        years: [2025, ONGOING], msrp: { amount: 459000, currency: 'USD', year: 2025 } },
      { name: '296 Speciale Aperta', years: [2026, ONGOING], msrp: { amount: 508000, currency: 'USD', year: 2026 } },
      { name: '296 Challenge',       years: [2024, ONGOING] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Halo / supercars
 * ──────────────────────────────────────────────────────────────────────── */
const G_HALO: Generation[] = [
  {
    id: 'ferrari-288-gto', brand: BRAND, displayName: '288 GTO',
    modelLine: '288 GTO', yearStart: 1984, yearEnd: 1987,
    baseMSRP: { amount: 85000, currency: 'USD', year: 1985 },
    trims: [
      { name: '288 GTO',            years: [1984, 1987], msrp: { amount: 85000, currency: 'USD', year: 1985 } },
      { name: '288 GTO Evoluzione', years: [1986, 1987] },
    ],
  },
  {
    id: 'ferrari-f40', brand: BRAND, displayName: 'F40',
    modelLine: 'F40', yearStart: 1987, yearEnd: 1992,
    baseMSRP: { amount: 400000, currency: 'USD', year: 1987 },
    trims: [
      { name: 'F40',    years: [1987, 1992], msrp: { amount: 400000, currency: 'USD', year: 1987 } },
      { name: 'F40 LM', years: [1989, 1992] },
    ],
  },
  {
    id: 'ferrari-f50', brand: BRAND, displayName: 'F50',
    modelLine: 'F50', yearStart: 1995, yearEnd: 1997,
    baseMSRP: { amount: 480000, currency: 'USD', year: 1995 },
    trims: [{ name: 'F50', years: [1995, 1997], msrp: { amount: 480000, currency: 'USD', year: 1995 } }],
  },
  {
    id: 'ferrari-enzo', brand: BRAND, displayName: 'Enzo',
    modelLine: 'Enzo', yearStart: 2002, yearEnd: 2004,
    baseMSRP: { amount: 643330, currency: 'USD', year: 2003 },
    trims: [{ name: 'Enzo Ferrari', years: [2002, 2004], msrp: { amount: 643330, currency: 'USD', year: 2003 } }],
  },
  {
    id: 'ferrari-laferrari', brand: BRAND, displayName: 'LaFerrari',
    modelLine: 'LaFerrari', yearStart: 2013, yearEnd: 2018,
    baseMSRP: { amount: 1416362, currency: 'USD', year: 2014 },
    trims: [
      { name: 'LaFerrari',        years: [2013, 2016], msrp: { amount: 1416362, currency: 'USD', year: 2014 } },
      { name: 'LaFerrari Aperta', years: [2016, 2018], msrp: { amount: 2200000, currency: 'USD', year: 2017 } },
    ],
  },
  {
    id: 'ferrari-monza-sp', brand: BRAND, displayName: 'Monza SP',
    modelLine: 'Icona', yearStart: 2018, yearEnd: 2022,
    baseMSRP: { amount: 1750000, currency: 'USD', year: 2019 },
    trims: [
      { name: 'Monza SP1', years: [2019, 2022], msrp: { amount: 1750000, currency: 'USD', year: 2019 } },
      { name: 'Monza SP2', years: [2019, 2022], msrp: { amount: 1800000, currency: 'USD', year: 2019 } },
    ],
  },
  {
    id: 'ferrari-daytona-sp3', brand: BRAND, displayName: 'Daytona SP3',
    modelLine: 'Icona', yearStart: 2022, yearEnd: ONGOING,
    baseMSRP: { amount: 2250000, currency: 'USD', year: 2022 },
    trims: [{ name: 'Daytona SP3', years: [2022, ONGOING], msrp: { amount: 2250000, currency: 'USD', year: 2022 } }],
  },
  {
    id: 'ferrari-f80', brand: BRAND, displayName: 'F80',
    modelLine: 'F80', yearStart: 2025, yearEnd: ONGOING,
    baseMSRP: { amount: 3900000, currency: 'USD', year: 2026 },
    trims: [{ name: 'F80', years: [2025, ONGOING], msrp: { amount: 3900000, currency: 'USD', year: 2026 } }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Modern entry-level / GT / SUV
 * ──────────────────────────────────────────────────────────────────────── */
const G_MODERN_GT: Generation[] = [
  {
    id: 'ferrari-california', brand: BRAND, displayName: 'California',
    modelLine: 'California', yearStart: 2008, yearEnd: 2017,
    baseMSRP: { amount: 192000, currency: 'USD', year: 2009 },
    trims: [
      { name: 'California',    years: [2008, 2014], msrp: { amount: 192000, currency: 'USD', year: 2009 } },
      { name: 'California 30', years: [2012, 2014], msrp: { amount: 198000, currency: 'USD', year: 2013 } },
      { name: 'California T',  years: [2014, 2017], msrp: { amount: 198973, currency: 'USD', year: 2015 } },
      { name: 'California T HS', years: [2015, 2017] },
    ],
  },
  {
    id: 'ferrari-portofino', brand: BRAND, displayName: 'Portofino',
    modelLine: 'Portofino', yearStart: 2017, yearEnd: 2023,
    baseMSRP: { amount: 215000, currency: 'USD', year: 2018 },
    trims: [
      { name: 'Portofino',   years: [2018, 2020], msrp: { amount: 215000, currency: 'USD', year: 2018 } },
      { name: 'Portofino M', years: [2020, 2023], msrp: { amount: 247308, currency: 'USD', year: 2021 } },
    ],
  },
  {
    id: 'ferrari-roma', brand: BRAND, displayName: 'Roma',
    modelLine: 'Roma', yearStart: 2019, yearEnd: ONGOING,
    baseMSRP: { amount: 222420, currency: 'USD', year: 2021 },
    trims: [
      { name: 'Roma',        years: [2020, ONGOING], msrp: { amount: 222420, currency: 'USD', year: 2021 } },
      { name: 'Roma Spider', years: [2023, ONGOING], msrp: { amount: 274000, currency: 'USD', year: 2024 } },
    ],
  },
  {
    id: 'ferrari-amalfi', brand: BRAND, displayName: 'Amalfi',
    modelLine: 'Amalfi', yearStart: 2025, yearEnd: ONGOING,
    trims: [
      { name: 'Amalfi', years: [2026, ONGOING] },
    ],
  },
  {
    id: 'ferrari-purosangue', brand: BRAND, displayName: 'Purosangue',
    modelLine: 'Purosangue', yearStart: 2022, yearEnd: ONGOING,
    baseMSRP: { amount: 398350, currency: 'USD', year: 2024 },
    trims: [{ name: 'Purosangue', years: [2023, ONGOING], msrp: { amount: 398350, currency: 'USD', year: 2024 } }],
  },
]

export const FERRARI_GENERATIONS: Generation[] = [
  ...G_EARLY_V12,
  ...G_V12_GT,
  ...G_MID_V8,
  ...G_HALO,
  ...G_MODERN_GT,
]
