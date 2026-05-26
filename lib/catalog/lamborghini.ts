/**
 * Lamborghini road-car catalog, 1964–present.
 */

import type { Generation } from './types'
import { ONGOING } from './types'

const BRAND = 'Lamborghini'

/* ──────────────────────────────────────────────────────────────────────────
 *  Pre-Countach (1964–1976)
 * ──────────────────────────────────────────────────────────────────────── */
const G_EARLY: Generation[] = [
  {
    id: 'lamborghini-350-gt', brand: BRAND, displayName: '350 GT',
    modelLine: '350 GT', yearStart: 1964, yearEnd: 1966,
    trims: [{ name: '350 GT', years: [1964, 1966] }],
  },
  {
    id: 'lamborghini-400-gt', brand: BRAND, displayName: '400 GT',
    modelLine: '400 GT', yearStart: 1966, yearEnd: 1968,
    trims: [
      { name: '400 GT 2+2', years: [1966, 1968] },
      { name: '400 GT Interim', years: [1966, 1966] },
    ],
  },
  {
    id: 'lamborghini-miura', brand: BRAND, displayName: 'Miura',
    modelLine: 'Miura', yearStart: 1966, yearEnd: 1973,
    trims: [
      { name: 'Miura P400', years: [1966, 1969] },
      { name: 'Miura P400 S', years: [1968, 1971] },
      { name: 'Miura P400 SV', years: [1971, 1973] },
      { name: 'Miura P400 SVJ', years: [1971, 1973] },
      { name: 'Miura Jota', years: [1970, 1971] },
    ],
  },
  {
    id: 'lamborghini-espada', brand: BRAND, displayName: 'Espada',
    modelLine: 'Espada', yearStart: 1968, yearEnd: 1978,
    trims: [
      { name: 'Espada Series I', years: [1968, 1970] },
      { name: 'Espada Series II', years: [1970, 1972] },
      { name: 'Espada Series III', years: [1972, 1978] },
    ],
  },
  {
    id: 'lamborghini-islero', brand: BRAND, displayName: 'Islero',
    modelLine: 'Islero', yearStart: 1968, yearEnd: 1969,
    trims: [
      { name: 'Islero 400 GT', years: [1968, 1969] },
      { name: 'Islero 400 GTS', years: [1969, 1969] },
    ],
  },
  {
    id: 'lamborghini-jarama', brand: BRAND, displayName: 'Jarama',
    modelLine: 'Jarama', yearStart: 1970, yearEnd: 1976,
    trims: [
      { name: 'Jarama 400 GT', years: [1970, 1973] },
      { name: 'Jarama 400 GTS', years: [1972, 1976] },
    ],
  },
  {
    id: 'lamborghini-urraco', brand: BRAND, displayName: 'Urraco',
    modelLine: 'Urraco', yearStart: 1972, yearEnd: 1979,
    trims: [
      { name: 'Urraco P250', years: [1972, 1976] },
      { name: 'Urraco P200', years: [1974, 1977] },
      { name: 'Urraco P300', years: [1975, 1979] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Countach era + 70s/80s mid-engine companions
 * ──────────────────────────────────────────────────────────────────────── */
const G_COUNTACH_ERA: Generation[] = [
  {
    id: 'lamborghini-countach', brand: BRAND, displayName: 'Countach',
    modelLine: 'Countach', yearStart: 1974, yearEnd: 1990,
    trims: [
      { name: 'Countach LP400', years: [1974, 1978] },
      { name: 'Countach LP400 S', years: [1978, 1982] },
      { name: 'Countach LP5000 S', years: [1982, 1985] },
      { name: 'Countach LP5000 Quattrovalvole', years: [1985, 1988] },
      { name: 'Countach 25th Anniversary', years: [1988, 1990] },
    ],
  },
  {
    id: 'lamborghini-silhouette', brand: BRAND, displayName: 'Silhouette',
    modelLine: 'Silhouette', yearStart: 1976, yearEnd: 1979,
    trims: [{ name: 'Silhouette P300', years: [1976, 1979] }],
  },
  {
    id: 'lamborghini-jalpa', brand: BRAND, displayName: 'Jalpa',
    modelLine: 'Jalpa', yearStart: 1981, yearEnd: 1988,
    trims: [{ name: 'Jalpa P350', years: [1981, 1988] }],
  },
  {
    id: 'lamborghini-lm002', brand: BRAND, displayName: 'LM002',
    modelLine: 'LM002', yearStart: 1986, yearEnd: 1993,
    trims: [{ name: 'LM002', years: [1986, 1993] }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  V12 flagships from Diablo onward
 * ──────────────────────────────────────────────────────────────────────── */
const G_V12_FLAGSHIPS: Generation[] = [
  {
    id: 'lamborghini-diablo', brand: BRAND, displayName: 'Diablo',
    modelLine: 'Diablo', yearStart: 1990, yearEnd: 2001,
    trims: [
      { name: 'Diablo', years: [1990, 1999] },
      { name: 'Diablo VT', years: [1993, 1998] },
      { name: 'Diablo SV', years: [1995, 1999] },
      { name: 'Diablo SE30', years: [1993, 1994] },
      { name: 'Diablo SE30 Jota', years: [1995, 1995] },
      { name: 'Diablo Roadster', years: [1995, 1998] },
      { name: 'Diablo VT Roadster', years: [1995, 1998] },
      { name: 'Diablo SVR', years: [1996, 1996] },
      { name: 'Diablo GT', years: [1999, 2000] },
      { name: 'Diablo GTR', years: [2000, 2000] },
      { name: 'Diablo VT 6.0', years: [2000, 2001] },
      { name: 'Diablo VT 6.0 SE', years: [2001, 2001] },
    ],
  },
  {
    id: 'lamborghini-murcielago', brand: BRAND, displayName: 'Murciélago',
    modelLine: 'Murciélago', yearStart: 2001, yearEnd: 2010,
    trims: [
      { name: 'Murciélago', years: [2001, 2006] },
      { name: 'Murciélago Roadster', years: [2004, 2006] },
      { name: 'Murciélago LP640', years: [2006, 2010] },
      { name: 'Murciélago LP640 Roadster', years: [2006, 2010] },
      { name: 'Murciélago LP650-4 Roadster', years: [2009, 2010] },
      { name: 'Murciélago LP670-4 SuperVeloce', years: [2009, 2010] },
      { name: 'Murciélago R-GT', years: [2003, 2006] },
    ],
  },
  {
    id: 'lamborghini-aventador', brand: BRAND, displayName: 'Aventador',
    modelLine: 'Aventador', yearStart: 2011, yearEnd: 2022,
    trims: [
      { name: 'Aventador LP700-4', years: [2011, 2017] },
      { name: 'Aventador LP700-4 Roadster', years: [2012, 2017] },
      { name: 'Aventador LP720-4 50° Anniversario', years: [2013, 2014] },
      { name: 'Aventador SV LP750-4', years: [2015, 2017] },
      { name: 'Aventador SV LP750-4 Roadster', years: [2015, 2017] },
      { name: 'Aventador S LP740-4', years: [2017, 2022] },
      { name: 'Aventador S Roadster', years: [2017, 2022] },
      { name: 'Aventador SVJ LP770-4', years: [2018, 2022] },
      { name: 'Aventador SVJ Roadster', years: [2019, 2022] },
      { name: 'Aventador SVJ 63', years: [2019, 2019] },
      { name: 'Aventador LP780-4 Ultimae', years: [2021, 2022] },
    ],
  },
  {
    id: 'lamborghini-revuelto', brand: BRAND, displayName: 'Revuelto',
    modelLine: 'Revuelto', yearStart: 2023, yearEnd: ONGOING,
    trims: [{ name: 'Revuelto', years: [2024, ONGOING] }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  V10 mid-engine: Gallardo / Huracán / Temerario
 * ──────────────────────────────────────────────────────────────────────── */
const G_V10_MID: Generation[] = [
  {
    id: 'lamborghini-gallardo', brand: BRAND, displayName: 'Gallardo',
    modelLine: 'Gallardo', yearStart: 2003, yearEnd: 2013,
    trims: [
      { name: 'Gallardo', years: [2003, 2008] },
      { name: 'Gallardo Spyder', years: [2006, 2008] },
      { name: 'Gallardo Superleggera', years: [2007, 2008] },
      { name: 'Gallardo LP560-4', years: [2008, 2013] },
      { name: 'Gallardo LP560-4 Spyder', years: [2008, 2013] },
      { name: 'Gallardo LP570-4 Superleggera', years: [2010, 2013] },
      { name: 'Gallardo LP570-4 Spyder Performante', years: [2011, 2013] },
      { name: 'Gallardo LP550-2', years: [2010, 2013] },
      { name: 'Gallardo LP550-2 Spyder', years: [2011, 2013] },
      { name: 'Gallardo LP560-4 Bicolore', years: [2011, 2012] },
      { name: 'Gallardo LP570-4 Edizione Tecnica', years: [2013, 2013] },
    ],
  },
  {
    id: 'lamborghini-huracan', brand: BRAND, displayName: 'Huracán',
    modelLine: 'Huracán', yearStart: 2014, yearEnd: 2024,
    trims: [
      { name: 'Huracán LP610-4', years: [2014, 2019] },
      { name: 'Huracán LP610-4 Spyder', years: [2015, 2019] },
      { name: 'Huracán LP580-2', years: [2015, 2019] },
      { name: 'Huracán LP580-2 Spyder', years: [2016, 2019] },
      { name: 'Huracán Performante', years: [2017, 2019] },
      { name: 'Huracán Performante Spyder', years: [2018, 2019] },
      { name: 'Huracán EVO', years: [2019, 2023] },
      { name: 'Huracán EVO RWD', years: [2020, 2023] },
      { name: 'Huracán EVO Spyder', years: [2019, 2023] },
      { name: 'Huracán EVO RWD Spyder', years: [2020, 2023] },
      { name: 'Huracán STO', years: [2020, 2023] },
      { name: 'Huracán Tecnica', years: [2022, 2024] },
      { name: 'Huracán Sterrato', years: [2023, 2024] },
    ],
  },
  {
    id: 'lamborghini-temerario', brand: BRAND, displayName: 'Temerario',
    modelLine: 'Temerario', yearStart: 2024, yearEnd: ONGOING,
    trims: [{ name: 'Temerario', years: [2025, ONGOING] }],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Halo / special editions
 * ──────────────────────────────────────────────────────────────────────── */
const G_HALO: Generation[] = [
  {
    id: 'lamborghini-reventon', brand: BRAND, displayName: 'Reventón',
    modelLine: 'Reventón', yearStart: 2007, yearEnd: 2010,
    trims: [
      { name: 'Reventón', years: [2008, 2009] },
      { name: 'Reventón Roadster', years: [2009, 2010] },
    ],
  },
  {
    id: 'lamborghini-sesto-elemento', brand: BRAND, displayName: 'Sesto Elemento',
    modelLine: 'Sesto Elemento', yearStart: 2010, yearEnd: 2011,
    trims: [{ name: 'Sesto Elemento', years: [2010, 2011] }],
  },
  {
    id: 'lamborghini-veneno', brand: BRAND, displayName: 'Veneno',
    modelLine: 'Veneno', yearStart: 2013, yearEnd: 2014,
    trims: [
      { name: 'Veneno Coupe', years: [2013, 2013] },
      { name: 'Veneno Roadster', years: [2014, 2014] },
    ],
  },
  {
    id: 'lamborghini-centenario', brand: BRAND, displayName: 'Centenario',
    modelLine: 'Centenario', yearStart: 2016, yearEnd: 2017,
    trims: [
      { name: 'Centenario Coupe', years: [2016, 2016] },
      { name: 'Centenario Roadster', years: [2017, 2017] },
    ],
  },
  {
    id: 'lamborghini-sian', brand: BRAND, displayName: 'Sián FKP 37',
    modelLine: 'Sián', yearStart: 2019, yearEnd: 2021,
    trims: [
      { name: 'Sián FKP 37', years: [2019, 2020] },
      { name: 'Sián Roadster', years: [2020, 2021] },
    ],
  },
  {
    id: 'lamborghini-countach-lpi', brand: BRAND, displayName: 'Countach LPI 800-4',
    modelLine: 'Countach', yearStart: 2021, yearEnd: 2022,
    trims: [{ name: 'Countach LPI 800-4', years: [2022, 2022] }],
  },
  {
    id: 'lamborghini-essenza-scv12', brand: BRAND, displayName: 'Essenza SCV12',
    modelLine: 'Essenza SCV12', yearStart: 2020, yearEnd: 2022,
    trims: [{ name: 'Essenza SCV12', years: [2020, 2022] }],
  },
  {
    id: 'lamborghini-invencible', brand: BRAND, displayName: 'Invencible / Auténtica',
    modelLine: 'One-Off', yearStart: 2023, yearEnd: 2023,
    trims: [
      { name: 'Invencible', years: [2023, 2023] },
      { name: 'Auténtica', years: [2023, 2023] },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 *  Urus (SUV)
 * ──────────────────────────────────────────────────────────────────────── */
const G_URUS: Generation[] = [
  {
    id: 'lamborghini-urus', brand: BRAND, displayName: 'Urus',
    modelLine: 'Urus', yearStart: 2017, yearEnd: ONGOING,
    trims: [
      { name: 'Urus', years: [2018, 2022] },
      { name: 'Urus Performante', years: [2022, ONGOING] },
      { name: 'Urus S', years: [2022, ONGOING] },
      { name: 'Urus SE (PHEV)', years: [2024, ONGOING] },
    ],
  },
]

export const LAMBORGHINI_GENERATIONS: Generation[] = [
  ...G_EARLY,
  ...G_COUNTACH_ERA,
  ...G_V12_FLAGSHIPS,
  ...G_V10_MID,
  ...G_HALO,
  ...G_URUS,
]
