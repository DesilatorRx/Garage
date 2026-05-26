/**
 * Porsche road-car catalog, 1948–present.
 * Organized by generation. A "generation entry" = one platform (e.g. 992).
 */

import type { Generation } from './types'
import { ONGOING } from './types'

const BRAND = 'Porsche'

/* ──────────────────────────────────────────────────────────────────────────
 *  356 family (1948–1965)
 * ──────────────────────────────────────────────────────────────────────── */
const G_356: Generation[] = [
  {
    id: 'porsche-356-pre-a', brand: BRAND, displayName: '356 (Pre-A)',
    modelLine: '356', yearStart: 1948, yearEnd: 1955,
    trims: [
      { name: '1100 Coupe', years: [1950, 1954] },
      { name: '1100 Cabriolet', years: [1950, 1954] },
      { name: '1300 Coupe', years: [1951, 1955] },
      { name: '1300 Cabriolet', years: [1951, 1955] },
      { name: '1300 S Coupe', years: [1952, 1955] },
      { name: '1500 Coupe', years: [1952, 1955] },
      { name: '1500 Cabriolet', years: [1952, 1955] },
      { name: '1500 S Coupe', years: [1952, 1955] },
      { name: '1500 Speedster', years: [1954, 1955] },
      { name: '1500 GS Carrera', years: [1955, 1955] },
    ],
  },
  {
    id: 'porsche-356a', brand: BRAND, displayName: '356 A',
    modelLine: '356', yearStart: 1955, yearEnd: 1959,
    trims: [
      { name: '1600 Coupe', years: [1955, 1959] },
      { name: '1600 Cabriolet', years: [1955, 1959] },
      { name: '1600 S Coupe', years: [1955, 1959] },
      { name: '1600 S Cabriolet', years: [1955, 1959] },
      { name: '1600 Speedster', years: [1955, 1958] },
      { name: '1600 S Speedster', years: [1955, 1958] },
      { name: '1600 Convertible D', years: [1959, 1959] },
      { name: 'Carrera 1500 GS Coupe', years: [1955, 1957] },
      { name: 'Carrera 1500 GS Speedster', years: [1955, 1958] },
      { name: 'Carrera 1600 GS Coupe', years: [1958, 1959] },
      { name: 'Carrera 1600 GT Coupe', years: [1959, 1959] },
    ],
  },
  {
    id: 'porsche-356b', brand: BRAND, displayName: '356 B',
    modelLine: '356', yearStart: 1959, yearEnd: 1963,
    trims: [
      { name: '1600 Coupe', years: [1959, 1963] },
      { name: '1600 Cabriolet', years: [1959, 1963] },
      { name: '1600 S Coupe', years: [1959, 1963] },
      { name: '1600 S Cabriolet', years: [1959, 1963] },
      { name: '1600 Super 90 Coupe', years: [1960, 1963] },
      { name: '1600 Super 90 Cabriolet', years: [1960, 1963] },
      { name: '1600 Roadster', years: [1959, 1962] },
      { name: '1600 Notchback', years: [1961, 1962] },
      { name: 'Carrera 2 (2000 GS)', years: [1962, 1963] },
    ],
  },
  {
    id: 'porsche-356c', brand: BRAND, displayName: '356 C',
    modelLine: '356', yearStart: 1963, yearEnd: 1965,
    trims: [
      { name: '1600 C Coupe', years: [1963, 1965] },
      { name: '1600 C Cabriolet', years: [1963, 1965] },
      { name: '1600 SC Coupe', years: [1963, 1965] },
      { name: '1600 SC Cabriolet', years: [1963, 1965] },
      { name: 'Carrera 2 (2000 GS) Coupe', years: [1963, 1964] },
      { name: 'Carrera 2 (2000 GS) Cabriolet', years: [1963, 1964] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  911 family (1964–present)
 * ──────────────────────────────────────────────────────────────────────── */
const G_911: Generation[] = [
  {
    id: 'porsche-911-original', brand: BRAND, displayName: '911 (Original / O-Series & F-Series)',
    modelLine: '911', yearStart: 1964, yearEnd: 1973,
    trims: [
      { name: '911 (2.0)', years: [1964, 1969] },
      { name: '911 L', years: [1967, 1968] },
      { name: '911 T (2.0)', years: [1967, 1969] },
      { name: '911 E (2.0)', years: [1968, 1969] },
      { name: '911 S (2.0)', years: [1966, 1969] },
      { name: '911 R', years: [1967, 1968] },
      { name: '911 T (2.2)', years: [1970, 1971] },
      { name: '911 E (2.2)', years: [1970, 1971] },
      { name: '911 S (2.2)', years: [1970, 1971] },
      { name: '911 T (2.4)', years: [1972, 1973] },
      { name: '911 E (2.4)', years: [1972, 1973] },
      { name: '911 S (2.4)', years: [1972, 1973] },
      { name: '911 Carrera RS 2.7', years: [1973, 1973] },
      { name: '911 Carrera RSR 2.8', years: [1973, 1973] },
      { name: 'Targa (all variants)', years: [1967, 1973] },
    ],
  },
  {
    id: 'porsche-911-g-series', brand: BRAND, displayName: '911 (G-Series)',
    modelLine: '911', yearStart: 1974, yearEnd: 1989,
    trims: [
      { name: '911 (2.7)', years: [1974, 1977] },
      { name: '911 S (2.7)', years: [1974, 1977] },
      { name: '911 Carrera 2.7', years: [1974, 1975] },
      { name: '911 Carrera 3.0', years: [1976, 1977] },
      { name: '911 Carrera 3.0 RS', years: [1974, 1974] },
      { name: '911 Carrera 3.0 RSR', years: [1974, 1974] },
      { name: '911 Turbo 3.0 (930)', years: [1975, 1977] },
      { name: '911 SC', years: [1978, 1983] },
      { name: '911 Turbo 3.3 (930)', years: [1978, 1989] },
      { name: '911 Carrera 3.2', years: [1984, 1989] },
      { name: '911 Carrera 3.2 Club Sport', years: [1987, 1989] },
      { name: '911 Carrera 3.2 Speedster', years: [1989, 1989] },
      { name: '911 SC/RS', years: [1984, 1984] },
      { name: '911 Targa (all variants)', years: [1974, 1989] },
      { name: '911 Cabriolet (Carrera 3.2)', years: [1983, 1989] },
    ],
  },
  {
    id: 'porsche-911-964', brand: BRAND, displayName: '911 (964)',
    modelLine: '911', yearStart: 1989, yearEnd: 1994,
    trims: [
      { name: 'Carrera 2', years: [1989, 1994] },
      { name: 'Carrera 4', years: [1989, 1994] },
      { name: 'Carrera 2 Tiptronic', years: [1990, 1994] },
      { name: 'Carrera RS', years: [1992, 1993] },
      { name: 'Carrera RS America', years: [1993, 1994] },
      { name: 'Turbo 3.3', years: [1991, 1992] },
      { name: 'Turbo 3.6', years: [1993, 1994] },
      { name: 'Turbo S 3.6', years: [1993, 1994] },
      { name: 'Speedster', years: [1993, 1994] },
      { name: 'Targa', years: [1989, 1993] },
      { name: 'Cabriolet', years: [1989, 1994] },
      { name: '30 Jahre 911', years: [1993, 1993] },
    ],
  },
  {
    id: 'porsche-911-993', brand: BRAND, displayName: '911 (993)',
    modelLine: '911', yearStart: 1994, yearEnd: 1998,
    trims: [
      { name: 'Carrera', years: [1994, 1998] },
      { name: 'Carrera 4', years: [1994, 1998] },
      { name: 'Carrera S', years: [1997, 1998] },
      { name: 'Carrera 4S', years: [1995, 1998] },
      { name: 'Targa', years: [1995, 1998] },
      { name: 'Turbo', years: [1995, 1998] },
      { name: 'Turbo S', years: [1997, 1998] },
      { name: 'GT2', years: [1995, 1998] },
      { name: 'Carrera RS', years: [1995, 1996] },
      { name: 'Carrera RS Clubsport', years: [1995, 1996] },
      { name: 'Cabriolet', years: [1994, 1998] },
    ],
  },
  {
    id: 'porsche-911-996', brand: BRAND, displayName: '911 (996)',
    modelLine: '911', yearStart: 1997, yearEnd: 2005,
    trims: [
      { name: 'Carrera', years: [1998, 2005] },
      { name: 'Carrera 4', years: [1999, 2005] },
      { name: 'Carrera S', years: [2002, 2005] },
      { name: 'Carrera 4S', years: [2002, 2005] },
      { name: 'Targa', years: [2002, 2005] },
      { name: 'Turbo', years: [2000, 2005] },
      { name: 'Turbo S', years: [2005, 2005] },
      { name: 'GT2', years: [2001, 2005] },
      { name: 'GT3', years: [1999, 2005] },
      { name: 'GT3 RS', years: [2003, 2005] },
      { name: 'Cabriolet', years: [1998, 2005] },
      { name: '40th Anniversary', years: [2004, 2004] },
    ],
  },
  {
    id: 'porsche-911-997', brand: BRAND, displayName: '911 (997)',
    modelLine: '911', yearStart: 2004, yearEnd: 2012,
    trims: [
      { name: 'Carrera', years: [2005, 2012] },
      { name: 'Carrera S', years: [2005, 2012] },
      { name: 'Carrera 4', years: [2006, 2012] },
      { name: 'Carrera 4S', years: [2006, 2012] },
      { name: 'Carrera GTS', years: [2010, 2012] },
      { name: 'Carrera 4 GTS', years: [2011, 2012] },
      { name: 'Targa 4', years: [2007, 2012] },
      { name: 'Targa 4S', years: [2007, 2012] },
      { name: 'Turbo', years: [2007, 2012] },
      { name: 'Turbo S', years: [2010, 2012] },
      { name: 'GT2', years: [2008, 2009] },
      { name: 'GT2 RS', years: [2010, 2011] },
      { name: 'GT3', years: [2006, 2012] },
      { name: 'GT3 RS', years: [2007, 2012] },
      { name: 'GT3 RS 4.0', years: [2011, 2011] },
      { name: 'Speedster', years: [2010, 2011] },
      { name: 'Sport Classic', years: [2010, 2010] },
      { name: 'Carrera Black Edition', years: [2011, 2012] },
      { name: 'Cabriolet', years: [2005, 2012] },
    ],
  },
  {
    id: 'porsche-911-991', brand: BRAND, displayName: '911 (991)',
    modelLine: '911', yearStart: 2011, yearEnd: 2019,
    trims: [
      { name: 'Carrera', years: [2012, 2019] },
      { name: 'Carrera S', years: [2012, 2019] },
      { name: 'Carrera 4', years: [2013, 2019] },
      { name: 'Carrera 4S', years: [2013, 2019] },
      { name: 'Carrera T', years: [2018, 2019] },
      { name: 'Carrera GTS', years: [2014, 2019] },
      { name: 'Carrera 4 GTS', years: [2015, 2019] },
      { name: 'Targa 4', years: [2014, 2019] },
      { name: 'Targa 4S', years: [2014, 2019] },
      { name: 'Targa 4 GTS', years: [2015, 2019] },
      { name: 'Turbo', years: [2014, 2019] },
      { name: 'Turbo S', years: [2014, 2019] },
      { name: 'Turbo S Exclusive Series', years: [2017, 2018] },
      { name: 'GT3', years: [2014, 2019] },
      { name: 'GT3 Touring', years: [2018, 2019] },
      { name: 'GT3 RS', years: [2015, 2019] },
      { name: 'GT2 RS', years: [2018, 2019] },
      { name: 'R', years: [2016, 2016] },
      { name: 'Speedster', years: [2019, 2019] },
      { name: '50th Anniversary', years: [2014, 2014] },
      { name: 'Cabriolet', years: [2012, 2019] },
    ],
  },
  {
    id: 'porsche-911-992', brand: BRAND, displayName: '911 (992)',
    modelLine: '911', yearStart: 2019, yearEnd: ONGOING,
    trims: [
      { name: 'Carrera', years: [2020, ONGOING] },
      { name: 'Carrera S', years: [2020, ONGOING] },
      { name: 'Carrera 4', years: [2020, ONGOING] },
      { name: 'Carrera 4S', years: [2020, ONGOING] },
      { name: 'Carrera T', years: [2023, ONGOING] },
      { name: 'Carrera GTS', years: [2022, ONGOING] },
      { name: 'Carrera 4 GTS', years: [2022, ONGOING] },
      { name: 'Targa 4', years: [2021, ONGOING] },
      { name: 'Targa 4S', years: [2021, ONGOING] },
      { name: 'Targa 4 GTS', years: [2022, ONGOING] },
      { name: 'Turbo', years: [2021, ONGOING] },
      { name: 'Turbo S', years: [2021, ONGOING] },
      { name: 'Dakar', years: [2023, ONGOING] },
      { name: 'GT3', years: [2022, ONGOING] },
      { name: 'GT3 Touring', years: [2022, ONGOING] },
      { name: 'GT3 RS', years: [2023, ONGOING] },
      { name: 'S/T', years: [2024, ONGOING] },
      { name: 'Sport Classic', years: [2023, ONGOING] },
      { name: '50 Years 911 Edition', years: [2023, 2023] },
      { name: 'Cabriolet', years: [2020, ONGOING] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  912 / 914 (rear- and mid-engine companions to early 911)
 * ──────────────────────────────────────────────────────────────────────── */
const G_912_914: Generation[] = [
  {
    id: 'porsche-912', brand: BRAND, displayName: '912',
    modelLine: '912', yearStart: 1965, yearEnd: 1969,
    trims: [
      { name: 'Coupe', years: [1965, 1969] },
      { name: 'Targa', years: [1967, 1969] },
    ],
  },
  {
    id: 'porsche-912e', brand: BRAND, displayName: '912 E',
    modelLine: '912', yearStart: 1976, yearEnd: 1976,
    trims: [{ name: '912 E', years: [1976, 1976] }],
  },
  {
    id: 'porsche-914', brand: BRAND, displayName: '914',
    modelLine: '914', yearStart: 1969, yearEnd: 1976,
    trims: [
      { name: '914 1.7', years: [1969, 1973] },
      { name: '914 1.8', years: [1974, 1976] },
      { name: '914 2.0', years: [1973, 1976] },
      { name: '914/6', years: [1969, 1972] },
      { name: '914/6 GT', years: [1970, 1972] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Front-engine / water-cooled transaxle cars
 * ──────────────────────────────────────────────────────────────────────── */
const G_TRANSAXLE: Generation[] = [
  {
    id: 'porsche-924', brand: BRAND, displayName: '924',
    modelLine: '924', yearStart: 1976, yearEnd: 1988,
    trims: [
      { name: '924', years: [1976, 1988] },
      { name: '924 Turbo', years: [1979, 1982] },
      { name: '924 Carrera GT', years: [1980, 1981] },
      { name: '924 Carrera GTS', years: [1981, 1981] },
      { name: '924 S', years: [1986, 1988] },
    ],
  },
  {
    id: 'porsche-928', brand: BRAND, displayName: '928',
    modelLine: '928', yearStart: 1977, yearEnd: 1995,
    trims: [
      { name: '928', years: [1977, 1982] },
      { name: '928 S', years: [1979, 1986] },
      { name: '928 S4', years: [1987, 1991] },
      { name: '928 GT', years: [1989, 1991] },
      { name: '928 GTS', years: [1992, 1995] },
    ],
  },
  {
    id: 'porsche-944', brand: BRAND, displayName: '944',
    modelLine: '944', yearStart: 1982, yearEnd: 1991,
    trims: [
      { name: '944', years: [1982, 1989] },
      { name: '944 S', years: [1987, 1988] },
      { name: '944 S2', years: [1989, 1991] },
      { name: '944 Turbo', years: [1985, 1991] },
      { name: '944 Turbo S', years: [1988, 1989] },
      { name: '944 Cabriolet (S2)', years: [1989, 1991] },
      { name: '944 Turbo Cabriolet', years: [1991, 1991] },
    ],
  },
  {
    id: 'porsche-968', brand: BRAND, displayName: '968',
    modelLine: '968', yearStart: 1991, yearEnd: 1995,
    trims: [
      { name: '968', years: [1991, 1995] },
      { name: '968 Cabriolet', years: [1991, 1995] },
      { name: '968 Club Sport', years: [1993, 1995] },
      { name: '968 Turbo S', years: [1993, 1993] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Mid-engine: Boxster, Cayman
 * ──────────────────────────────────────────────────────────────────────── */
const G_BOXSTER_CAYMAN: Generation[] = [
  {
    id: 'porsche-boxster-986', brand: BRAND, displayName: 'Boxster (986)',
    modelLine: 'Boxster', yearStart: 1996, yearEnd: 2004,
    trims: [
      { name: 'Boxster', years: [1997, 2004] },
      { name: 'Boxster S', years: [2000, 2004] },
    ],
  },
  {
    id: 'porsche-boxster-987', brand: BRAND, displayName: 'Boxster (987)',
    modelLine: 'Boxster', yearStart: 2004, yearEnd: 2012,
    trims: [
      { name: 'Boxster', years: [2005, 2012] },
      { name: 'Boxster S', years: [2005, 2012] },
      { name: 'Boxster RS 60 Spyder', years: [2008, 2008] },
      { name: 'Boxster Spyder', years: [2011, 2012] },
    ],
  },
  {
    id: 'porsche-boxster-981', brand: BRAND, displayName: 'Boxster (981)',
    modelLine: 'Boxster', yearStart: 2012, yearEnd: 2016,
    trims: [
      { name: 'Boxster', years: [2013, 2016] },
      { name: 'Boxster S', years: [2013, 2016] },
      { name: 'Boxster GTS', years: [2015, 2016] },
      { name: 'Boxster Spyder', years: [2016, 2016] },
    ],
  },
  {
    id: 'porsche-718-boxster-982', brand: BRAND, displayName: '718 Boxster (982)',
    modelLine: 'Boxster', yearStart: 2016, yearEnd: ONGOING,
    trims: [
      { name: '718 Boxster', years: [2017, ONGOING] },
      { name: '718 Boxster S', years: [2017, ONGOING] },
      { name: '718 Boxster T', years: [2020, ONGOING] },
      { name: '718 Boxster GTS', years: [2018, 2020] },
      { name: '718 Boxster GTS 4.0', years: [2021, ONGOING] },
      { name: '718 Spyder', years: [2020, 2024] },
      { name: '718 Spyder RS', years: [2024, ONGOING] },
      { name: '718 Boxster 25 Years', years: [2021, 2021] },
    ],
  },
  {
    id: 'porsche-cayman-987', brand: BRAND, displayName: 'Cayman (987)',
    modelLine: 'Cayman', yearStart: 2005, yearEnd: 2012,
    trims: [
      { name: 'Cayman', years: [2007, 2012] },
      { name: 'Cayman S', years: [2006, 2012] },
      { name: 'Cayman R', years: [2011, 2012] },
      { name: 'Cayman S Design Edition 1', years: [2008, 2008] },
    ],
  },
  {
    id: 'porsche-cayman-981', brand: BRAND, displayName: 'Cayman (981)',
    modelLine: 'Cayman', yearStart: 2012, yearEnd: 2016,
    trims: [
      { name: 'Cayman', years: [2014, 2016] },
      { name: 'Cayman S', years: [2014, 2016] },
      { name: 'Cayman GTS', years: [2015, 2016] },
      { name: 'Cayman GT4', years: [2016, 2016] },
      { name: 'Cayman GT4 Clubsport', years: [2016, 2016] },
    ],
  },
  {
    id: 'porsche-718-cayman-982', brand: BRAND, displayName: '718 Cayman (982)',
    modelLine: 'Cayman', yearStart: 2016, yearEnd: ONGOING,
    trims: [
      { name: '718 Cayman', years: [2017, ONGOING] },
      { name: '718 Cayman S', years: [2017, ONGOING] },
      { name: '718 Cayman T', years: [2020, ONGOING] },
      { name: '718 Cayman GTS', years: [2018, 2020] },
      { name: '718 Cayman GTS 4.0', years: [2021, ONGOING] },
      { name: '718 Cayman GT4', years: [2020, 2024] },
      { name: '718 Cayman GT4 RS', years: [2022, ONGOING] },
      { name: '718 Cayman 25 Years', years: [2021, 2021] },
      { name: '718 Cayman Style Edition', years: [2023, ONGOING] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Halo / supercar
 * ──────────────────────────────────────────────────────────────────────── */
const G_HALO: Generation[] = [
  {
    id: 'porsche-959', brand: BRAND, displayName: '959',
    modelLine: '959', yearStart: 1986, yearEnd: 1989,
    trims: [
      { name: '959 Komfort', years: [1986, 1988] },
      { name: '959 Sport', years: [1986, 1988] },
      { name: '959 S', years: [1988, 1988] },
    ],
  },
  {
    id: 'porsche-carrera-gt', brand: BRAND, displayName: 'Carrera GT',
    modelLine: 'Carrera GT', yearStart: 2003, yearEnd: 2007,
    trims: [{ name: 'Carrera GT', years: [2004, 2007] }],
  },
  {
    id: 'porsche-918-spyder', brand: BRAND, displayName: '918 Spyder',
    modelLine: '918 Spyder', yearStart: 2013, yearEnd: 2015,
    trims: [
      { name: '918 Spyder', years: [2014, 2015] },
      { name: '918 Spyder Weissach', years: [2014, 2015] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Cayenne
 * ──────────────────────────────────────────────────────────────────────── */
const G_CAYENNE: Generation[] = [
  {
    id: 'porsche-cayenne-9pa', brand: BRAND, displayName: 'Cayenne (9PA / 955-957)',
    modelLine: 'Cayenne', yearStart: 2002, yearEnd: 2010,
    trims: [
      { name: 'Cayenne', years: [2003, 2010] },
      { name: 'Cayenne S', years: [2003, 2010] },
      { name: 'Cayenne GTS', years: [2008, 2010] },
      { name: 'Cayenne Turbo', years: [2003, 2010] },
      { name: 'Cayenne Turbo S', years: [2006, 2010] },
      { name: 'Cayenne Diesel', years: [2009, 2010] },
      { name: 'Cayenne Transsyberia', years: [2009, 2010] },
    ],
  },
  {
    id: 'porsche-cayenne-92a', brand: BRAND, displayName: 'Cayenne (92A)',
    modelLine: 'Cayenne', yearStart: 2010, yearEnd: 2018,
    trims: [
      { name: 'Cayenne', years: [2011, 2018] },
      { name: 'Cayenne S', years: [2011, 2018] },
      { name: 'Cayenne S Hybrid', years: [2011, 2014] },
      { name: 'Cayenne S E-Hybrid', years: [2015, 2018] },
      { name: 'Cayenne GTS', years: [2013, 2018] },
      { name: 'Cayenne Turbo', years: [2011, 2018] },
      { name: 'Cayenne Turbo S', years: [2014, 2018] },
      { name: 'Cayenne Diesel', years: [2013, 2016] },
      { name: 'Cayenne S Diesel', years: [2013, 2016] },
      { name: 'Cayenne Platinum Edition', years: [2014, 2018] },
    ],
  },
  {
    id: 'porsche-cayenne-9ya', brand: BRAND, displayName: 'Cayenne (9YA / E3)',
    modelLine: 'Cayenne', yearStart: 2017, yearEnd: ONGOING,
    trims: [
      { name: 'Cayenne', years: [2019, ONGOING] },
      { name: 'Cayenne S', years: [2019, ONGOING] },
      { name: 'Cayenne E-Hybrid', years: [2019, ONGOING] },
      { name: 'Cayenne GTS', years: [2021, ONGOING] },
      { name: 'Cayenne Turbo', years: [2019, 2023] },
      { name: 'Cayenne Turbo GT', years: [2022, ONGOING] },
      { name: 'Cayenne Turbo S E-Hybrid', years: [2020, ONGOING] },
      { name: 'Cayenne Coupe', years: [2020, ONGOING] },
      { name: 'Cayenne S Coupe', years: [2020, ONGOING] },
      { name: 'Cayenne E-Hybrid Coupe', years: [2020, ONGOING] },
      { name: 'Cayenne GTS Coupe', years: [2021, ONGOING] },
      { name: 'Cayenne Turbo Coupe', years: [2020, 2023] },
      { name: 'Cayenne Turbo GT Coupe', years: [2022, ONGOING] },
      { name: 'Cayenne Turbo S E-Hybrid Coupe', years: [2020, ONGOING] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Panamera
 * ──────────────────────────────────────────────────────────────────────── */
const G_PANAMERA: Generation[] = [
  {
    id: 'porsche-panamera-970', brand: BRAND, displayName: 'Panamera (970)',
    modelLine: 'Panamera', yearStart: 2009, yearEnd: 2016,
    trims: [
      { name: 'Panamera', years: [2010, 2016] },
      { name: 'Panamera 4', years: [2011, 2016] },
      { name: 'Panamera S', years: [2010, 2016] },
      { name: 'Panamera 4S', years: [2010, 2016] },
      { name: 'Panamera GTS', years: [2013, 2016] },
      { name: 'Panamera Turbo', years: [2010, 2016] },
      { name: 'Panamera Turbo S', years: [2012, 2016] },
      { name: 'Panamera S Hybrid', years: [2012, 2013] },
      { name: 'Panamera S E-Hybrid', years: [2014, 2016] },
      { name: 'Panamera Diesel', years: [2011, 2016] },
      { name: 'Panamera Edition', years: [2014, 2014] },
      { name: 'Panamera Exclusive Series', years: [2015, 2015] },
    ],
  },
  {
    id: 'porsche-panamera-971', brand: BRAND, displayName: 'Panamera (971)',
    modelLine: 'Panamera', yearStart: 2016, yearEnd: 2023,
    trims: [
      { name: 'Panamera', years: [2017, 2023] },
      { name: 'Panamera 4', years: [2017, 2023] },
      { name: 'Panamera 4 E-Hybrid', years: [2018, 2023] },
      { name: 'Panamera 4S', years: [2017, 2023] },
      { name: 'Panamera 4S E-Hybrid', years: [2021, 2023] },
      { name: 'Panamera GTS', years: [2019, 2023] },
      { name: 'Panamera Turbo', years: [2017, 2020] },
      { name: 'Panamera Turbo S', years: [2021, 2023] },
      { name: 'Panamera Turbo S E-Hybrid', years: [2018, 2023] },
      { name: 'Panamera Sport Turismo', years: [2018, 2023] },
      { name: 'Panamera Executive (LWB)', years: [2017, 2023] },
    ],
  },
  {
    id: 'porsche-panamera-g3', brand: BRAND, displayName: 'Panamera (G3)',
    modelLine: 'Panamera', yearStart: 2023, yearEnd: ONGOING,
    trims: [
      { name: 'Panamera', years: [2024, ONGOING] },
      { name: 'Panamera 4', years: [2024, ONGOING] },
      { name: 'Panamera 4S E-Hybrid', years: [2024, ONGOING] },
      { name: 'Panamera 4 E-Hybrid', years: [2024, ONGOING] },
      { name: 'Panamera Turbo E-Hybrid', years: [2024, ONGOING] },
      { name: 'Panamera Turbo S E-Hybrid', years: [2024, ONGOING] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Macan
 * ──────────────────────────────────────────────────────────────────────── */
const G_MACAN: Generation[] = [
  {
    id: 'porsche-macan-95b', brand: BRAND, displayName: 'Macan (95B)',
    modelLine: 'Macan', yearStart: 2014, yearEnd: 2024,
    trims: [
      { name: 'Macan', years: [2017, 2024] },
      { name: 'Macan S', years: [2015, 2024] },
      { name: 'Macan T', years: [2023, 2024] },
      { name: 'Macan GTS', years: [2017, 2024] },
      { name: 'Macan Turbo', years: [2015, 2021] },
      { name: 'Macan Turbo with Performance Package', years: [2017, 2018] },
      { name: 'Macan Diesel / S Diesel', years: [2014, 2018] },
    ],
  },
  {
    id: 'porsche-macan-ev', brand: BRAND, displayName: 'Macan Electric',
    modelLine: 'Macan', yearStart: 2024, yearEnd: ONGOING,
    trims: [
      { name: 'Macan 4', years: [2024, ONGOING] },
      { name: 'Macan 4S', years: [2025, ONGOING] },
      { name: 'Macan Turbo', years: [2024, ONGOING] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Taycan
 * ──────────────────────────────────────────────────────────────────────── */
const G_TAYCAN: Generation[] = [
  {
    id: 'porsche-taycan', brand: BRAND, displayName: 'Taycan',
    modelLine: 'Taycan', yearStart: 2019, yearEnd: ONGOING,
    trims: [
      { name: 'Taycan', years: [2021, ONGOING] },
      { name: 'Taycan 4', years: [2025, ONGOING] },
      { name: 'Taycan 4S', years: [2020, ONGOING] },
      { name: 'Taycan GTS', years: [2022, ONGOING] },
      { name: 'Taycan Turbo', years: [2020, ONGOING] },
      { name: 'Taycan Turbo S', years: [2020, ONGOING] },
      { name: 'Taycan Turbo GT', years: [2024, ONGOING] },
      { name: 'Taycan Turbo GT with Weissach', years: [2024, ONGOING] },
      { name: 'Taycan Cross Turismo 4', years: [2022, ONGOING] },
      { name: 'Taycan Cross Turismo 4S', years: [2022, ONGOING] },
      { name: 'Taycan Cross Turismo GTS', years: [2023, ONGOING] },
      { name: 'Taycan Cross Turismo Turbo', years: [2022, ONGOING] },
      { name: 'Taycan Cross Turismo Turbo S', years: [2022, ONGOING] },
      { name: 'Taycan Sport Turismo 4S', years: [2023, ONGOING] },
      { name: 'Taycan Sport Turismo GTS', years: [2023, ONGOING] },
      { name: 'Taycan Sport Turismo Turbo', years: [2023, ONGOING] },
      { name: 'Taycan Sport Turismo Turbo S', years: [2023, ONGOING] },
    ],
  },
]

export const PORSCHE_GENERATIONS: Generation[] = [
  ...G_356,
  ...G_911,
  ...G_912_914,
  ...G_TRANSAXLE,
  ...G_BOXSTER_CAYMAN,
  ...G_HALO,
  ...G_CAYENNE,
  ...G_PANAMERA,
  ...G_MACAN,
  ...G_TAYCAN,
]
