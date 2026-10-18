import {
  BaZiChart,
  DaYunCycle,
  EarthlyBranch,
  ElementRecommendations,
  ElementType,
  HeavenlyStem,
  Pillar,
  PolarityType,
} from '../types/bazi';

export const HEAVENLY_STEMS: HeavenlyStem[] = [
  {
    index: 0,
    char: '甲',
    pinyin: 'Jiǎ',
    nameId: 'Kayu Yang (Jia)',
    element: 'Wood',
    polarity: 'Yang',
    description: 'Pohon besar yang tegak lurus, berprinsip kokoh, visioner, dan pelindung sesama.',
    archetype: 'Pemimpin Visioner & Pelopor',
  },
  {
    index: 1,
    char: '乙',
    pinyin: 'Yǐ',
    nameId: 'Kayu Yin (Yi)',
    element: 'Wood',
    polarity: 'Yin',
    description: 'Tanaman rambat dan bunga yang anggun, sangat adaptif, cerdas berdiplomasi, dan ulet.',
    archetype: 'Diplomat Adaptif & Kreatif',
  },
  {
    index: 2,
    char: '丙',
    pinyin: 'Bǐng',
    nameId: 'Api Yang (Bing)',
    element: 'Fire',
    polarity: 'Yang',
    description: 'Matahari yang memancarkan kehangatan ke seluruh penjuru, dermawan, karismatik, dan jujur.',
    archetype: 'Inspirator Karismatik',
  },
  {
    index: 3,
    char: '丁',
    pinyin: 'Dīng',
    nameId: 'Api Yin (Ding)',
    element: 'Fire',
    polarity: 'Yin',
    description: 'Cahaya lilin atau bintang pemandu malam, teliti, peka secara emosional, pemikir mendalam.',
    archetype: 'Strategis & Pembimbing Terang',
  },
  {
    index: 4,
    char: '戊',
    pinyin: 'Wù',
    nameId: 'Tanah Yang (Wu)',
    element: 'Earth',
    polarity: 'Yang',
    description: 'Gunung batu yang kukuh, tenang, dapat dipercaya, stabil, dan menjadi sandaran orang banyak.',
    archetype: 'Batu Karang & Fondasi Tepercaya',
  },
  {
    index: 5,
    char: '己',
    pinyin: 'Jǐ',
    nameId: 'Tanah Yin (Ji)',
    element: 'Earth',
    polarity: 'Yin',
    description: 'Tanah subur taman yang mengasuh bibit berharga, toleran, fleksibel, dan penuh perhatian.',
    archetype: 'Pengasuh & Katalisator Potensi',
  },
  {
    index: 6,
    char: '庚',
    pinyin: 'Gēng',
    nameId: 'Logam Yang (Geng)',
    element: 'Metal',
    polarity: 'Yang',
    description: 'Pedang baja dan mineral keras, menjunjung tinggi keadilan, berani bertindak cepat, dan tegas.',
    archetype: 'Panglima Tegas & Pendobrak',
  },
  {
    index: 7,
    char: '辛',
    pinyin: 'Xīn',
    nameId: 'Logam Yin (Xin)',
    element: 'Metal',
    polarity: 'Yin',
    description: 'Permata dan perhiasan berkilau, mengagumi estetika tinggi, pandai meyakinkan, perfeksionis.',
    archetype: 'Perfeksionis Berkelas & Negosiator',
  },
  {
    index: 8,
    char: '壬',
    pinyin: 'Rén',
    nameId: 'Air Yang (Ren)',
    element: 'Water',
    polarity: 'Yang',
    description: 'Samudera luas dan sungai besar yang mengalir deras, bijaksana, inovatif, menyukai kebebasan.',
    archetype: 'Inovator Luas & Penjelajah Bebas',
  },
  {
    index: 9,
    char: '癸',
    pinyin: 'Guǐ',
    nameId: 'Air Yin (Gui)',
    element: 'Water',
    polarity: 'Yin',
    description: 'Embun pagi dan hujan lembut, memiliki intuisi tajam, imajinasi kaya, dan ketenangan jiwa.',
    archetype: 'Intuitif Murni & Pemikir Bijak',
  },
];

export const EARTHLY_BRANCHES_RAW: Omit<EarthlyBranch, 'hiddenStems'>[] = [
  { index: 0, char: '子', pinyin: 'Zǐ', animal: 'Tikus', element: 'Water', season: 'Musim Dingin Puncak (Des)', direction: 'Utara', monthIndex: 11 },
  { index: 1, char: '丑', pinyin: 'Chǒu', animal: 'Kerbau', element: 'Earth', season: 'Musim Dingin Akhir (Jan)', direction: 'Utara-Timur Laut', monthIndex: 12 },
  { index: 2, char: '寅', pinyin: 'Yín', animal: 'Macan', element: 'Wood', season: 'Awal Musim Semi (Feb)', direction: 'Timur-Timur Laut', monthIndex: 1 },
  { index: 3, char: '卯', pinyin: 'Mǎo', animal: 'Kelinci', element: 'Wood', season: 'Puncak Musim Semi (Mar)', direction: 'Timur', monthIndex: 2 },
  { index: 4, char: '辰', pinyin: 'Chén', animal: 'Naga', element: 'Earth', season: 'Akhir Musim Semi (Apr)', direction: 'Timur-Tenggara', monthIndex: 3 },
  { index: 5, char: '巳', pinyin: 'Sì', animal: 'Ular', element: 'Fire', season: 'Awal Musim Panas (Mei)', direction: 'Selatan-Tenggara', monthIndex: 4 },
  { index: 6, char: '午', pinyin: 'Wǔ', animal: 'Kuda', element: 'Fire', season: 'Puncak Musim Panas (Jun)', direction: 'Selatan', monthIndex: 5 },
  { index: 7, char: '未', pinyin: 'Wèi', animal: 'Kambing', element: 'Earth', season: 'Akhir Musim Panas (Jul)', direction: 'Selatan-Barat Daya', monthIndex: 6 },
  { index: 8, char: '申', pinyin: 'Shēn', animal: 'Monyet', element: 'Metal', season: 'Awal Musim Gugur (Agu)', direction: 'Barat-Barat Daya', monthIndex: 7 },
  { index: 9, char: '酉', pinyin: 'Yǒu', animal: 'Ayam', element: 'Metal', season: 'Puncak Musim Gugur (Sep)', direction: 'Barat', monthIndex: 8 },
  { index: 10, char: '戌', pinyin: 'Xū', animal: 'Anjing', element: 'Earth', season: 'Akhir Musim Gugur (Okt)', direction: 'Barat-Barat Laut', monthIndex: 9 },
  { index: 11, char: '亥', pinyin: 'Hài', animal: 'Babi', element: 'Water', season: 'Awal Musim Dingin (Nov)', direction: 'Utara-Barat Laut', monthIndex: 10 },
];

// Mapping hidden stems
export const EARTHLY_BRANCHES: EarthlyBranch[] = EARTHLY_BRANCHES_RAW.map((branch) => {
  let stems: { stemIndex: number; weight: number }[] = [];
  switch (branch.index) {
    case 0: stems = [{ stemIndex: 9, weight: 1.0 }]; break; // Zi: Gui
    case 1: stems = [{ stemIndex: 5, weight: 0.6 }, { stemIndex: 9, weight: 0.3 }, { stemIndex: 7, weight: 0.1 }]; break; // Chou: Ji, Gui, Xin
    case 2: stems = [{ stemIndex: 0, weight: 0.6 }, { stemIndex: 2, weight: 0.3 }, { stemIndex: 4, weight: 0.1 }]; break; // Yin: Jia, Bing, Wu
    case 3: stems = [{ stemIndex: 1, weight: 1.0 }]; break; // Mao: Yi
    case 4: stems = [{ stemIndex: 4, weight: 0.6 }, { stemIndex: 1, weight: 0.3 }, { stemIndex: 9, weight: 0.1 }]; break; // Chen: Wu, Yi, Gui
    case 5: stems = [{ stemIndex: 2, weight: 0.6 }, { stemIndex: 6, weight: 0.3 }, { stemIndex: 4, weight: 0.1 }]; break; // Si: Bing, Geng, Wu
    case 6: stems = [{ stemIndex: 3, weight: 0.7 }, { stemIndex: 5, weight: 0.3 }]; break; // Wu: Ding, Ji
    case 7: stems = [{ stemIndex: 5, weight: 0.6 }, { stemIndex: 3, weight: 0.3 }, { stemIndex: 1, weight: 0.1 }]; break; // Wei: Ji, Ding, Yi
    case 8: stems = [{ stemIndex: 6, weight: 0.6 }, { stemIndex: 8, weight: 0.3 }, { stemIndex: 4, weight: 0.1 }]; break; // Shen: Geng, Ren, Wu
    case 9: stems = [{ stemIndex: 7, weight: 1.0 }]; break; // You: Xin
    case 10: stems = [{ stemIndex: 4, weight: 0.6 }, { stemIndex: 7, weight: 0.3 }, { stemIndex: 3, weight: 0.1 }]; break; // Xu: Wu, Xin, Ding
    case 11: stems = [{ stemIndex: 8, weight: 0.7 }, { stemIndex: 0, weight: 0.3 }]; break; // Hai: Ren, Jia
    default: stems = [{ stemIndex: 0, weight: 1.0 }];
  }

  return {
    ...branch,
    hiddenStems: stems.map((s) => ({
      stem: HEAVENLY_STEMS[s.stemIndex],
      weight: s.weight,
    })),
  };
});

// Calculate Ten Gods relation between targetStem and DayMaster
export function getTenGodRelation(dayMaster: HeavenlyStem, targetStem: HeavenlyStem): string {
  const dmElem = dayMaster.element;
  const targetElem = targetStem.element;
  const samePolarity = dayMaster.polarity === targetStem.polarity;

  // Same element
  if (dmElem === targetElem) {
    return samePolarity ? 'Bi Jian (Sahabat)' : 'Jie Cai (Pesaing Rezeki)';
  }

  // Day Master generates Target (Output: Shi / Shang)
  if (isGenerating(dmElem, targetElem)) {
    return samePolarity ? 'Shi Shen (Dewa Rezeki/Kreatif)' : 'Shang Guan (Pemberontak Berbakat)';
  }

  // Day Master controls Target (Wealth: Cai)
  if (isControlling(dmElem, targetElem)) {
    return samePolarity ? 'Pian Cai (Rezeki Tidak Langsung)' : 'Zheng Cai (Rezeki Utama)';
  }

  // Target controls Day Master (Power / Officer: Guan / Sha)
  if (isControlling(targetElem, dmElem)) {
    return samePolarity ? 'Qi Sha (Tujuh Pembunuh / Otoritas)' : 'Zheng Guan (Pejabat Terhormat)';
  }

  // Target generates Day Master (Resource: Yin)
  if (isGenerating(targetElem, dmElem)) {
    return samePolarity ? 'Pian Yin (Dewa Pengetahuan Khusus)' : 'Zheng Yin (Segel Mulia/Penaung)';
  }

  return 'Harmoni';
}

export function isGenerating(parent: ElementType, child: ElementType): boolean {
  const cycle: Record<ElementType, ElementType> = {
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
    Water: 'Wood',
  };
  return cycle[parent] === child;
}

export function isControlling(attacker: ElementType, defender: ElementType): boolean {
  const cycle: Record<ElementType, ElementType> = {
    Wood: 'Earth',
    Earth: 'Water',
    Water: 'Fire',
    Fire: 'Metal',
    Metal: 'Wood',
  };
  return cycle[attacker] === defender;
}

export function getGeneratingParent(child: ElementType): ElementType {
  const reverseCycle: Record<ElementType, ElementType> = {
    Wood: 'Water',
    Fire: 'Wood',
    Earth: 'Fire',
    Metal: 'Earth',
    Water: 'Metal',
  };
  return reverseCycle[child];
}

export function getGeneratedChild(parent: ElementType): ElementType {
  const cycle: Record<ElementType, ElementType> = {
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
    Water: 'Wood',
  };
  return cycle[parent];
}

// Convert Solar Gregorian Date to Julian Day Number
function gregorianToJDN(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

// Astronomical Jie terms used as BaZi month boundaries (solar longitude, degrees).
// These are calculated from the apparent geocentric solar longitude rather than fixed calendar days.
const JIE_TERMS = [
  { longitude: 315, month: 2, day: 4, order: 1 },  // Li Chun, Tiger month
  { longitude: 345, month: 3, day: 6, order: 2 },  // Jing Zhe, Rabbit month
  { longitude: 15, month: 4, day: 5, order: 3 },   // Qing Ming, Dragon month
  { longitude: 45, month: 5, day: 6, order: 4 },   // Li Xia, Snake month
  { longitude: 75, month: 6, day: 6, order: 5 },   // Mang Zhong, Horse month
  { longitude: 105, month: 7, day: 7, order: 6 },  // Xiao Shu, Goat month
  { longitude: 135, month: 8, day: 8, order: 7 },  // Li Qiu, Monkey month
  { longitude: 165, month: 9, day: 8, order: 8 },  // Bai Lu, Rooster month
  { longitude: 195, month: 10, day: 8, order: 9 }, // Han Lu, Dog month
  { longitude: 225, month: 11, day: 7, order: 10 },// Li Dong, Pig month
  { longitude: 255, month: 12, day: 7, order: 11 },// Da Xue, Rat month
  { longitude: 285, month: 1, day: 6, order: 12 },  // Xiao Han, Ox month
] as const;

function normalizeDegrees(value: number): number {
  return ((value % 360) + 360) % 360;
}

function signedAngleDifference(target: number, actual: number): number {
  return ((target - actual + 540) % 360) - 180;
}

function solarLongitudeAt(date: Date): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const t = (jd - 2451545.0) / 36525;
  const meanLongitude = normalizeDegrees(280.46646 + t * (36000.76983 + 0.0003032 * t));
  const meanAnomaly = normalizeDegrees(357.52911 + t * (35999.05029 - 0.0001537 * t));
  const m = meanAnomaly * Math.PI / 180;
  const equationOfCenter =
    Math.sin(m) * (1.914602 - t * (0.004817 + 0.000014 * t)) +
    Math.sin(2 * m) * (0.019993 - 0.000101 * t) +
    Math.sin(3 * m) * 0.000289;
  const omega = (125.04 - 1934.136 * t) * Math.PI / 180;
  return normalizeDegrees(meanLongitude + equationOfCenter - 0.00569 - 0.00478 * Math.sin(omega));
}

function getSolarTermInstant(year: number, term: typeof JIE_TERMS[number]): number {
  // Start near the conventional calendar date, then converge on the target solar longitude.
  const roughYear = year;
  let instant = Date.UTC(roughYear, term.month - 1, term.day, 12, 0, 0);
  for (let i = 0; i < 8; i++) {
    const difference = signedAngleDifference(term.longitude, solarLongitudeAt(new Date(instant)));
    instant += difference / 0.98564736 * 86400000;
    if (Math.abs(difference) < 0.00001) break;
  }
  return instant;
}

function timezoneOffsetHours(timezone?: string): number {
  const value = (timezone || 'WIB (UTC+7)').trim();
  const match = value.match(/UTC\s*([+-])\s*(\d{1,2})(?::(\d{2}))?/i);
  if (match) {
    const hours = Number(match[2]) + Number(match[3] || 0) / 60;
    return (match[1] === '-' ? -1 : 1) * hours;
  }
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: value,
      timeZoneName: 'longOffset',
      hour: '2-digit',
    });
    const name = formatter.formatToParts(new Date()).find((part) => part.type === 'timeZoneName')?.value;
    const ianaMatch = name?.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
    if (ianaMatch) {
      const hours = Number(ianaMatch[2]) + Number(ianaMatch[3] || 0) / 60;
      return (ianaMatch[1] === '-' ? -1 : 1) * hours;
    }
    if (name === 'GMT') return 0;
  } catch {
    // Fall through to the safe default for legacy timezone labels.
  }
  return 7;
}

function getBirthInstantUtc(year: number, month: number, day: number, hour: number, minute: number, timezone?: string): number {
  return Date.UTC(year, month - 1, day, hour, minute) - timezoneOffsetHours(timezone) * 3600000;
}

function getLatestJieTerm(birthInstantUtc: number, calendarYear: number): typeof JIE_TERMS[number] {
  const candidates = [-1, 0, 1, 2].flatMap((offset) =>
    JIE_TERMS.map((term) => ({ term, instant: getSolarTermInstant(calendarYear + offset, term) }))
  ).filter((candidate) => candidate.instant <= birthInstantUtc)
    .sort((a, b) => b.instant - a.instant);
  if (!candidates.length) return JIE_TERMS[10];
  return candidates[0].term;
}

export function calculateBaZiChart(
  birthDateStr: string,
  birthTimeStr: string,
  gender: 'male' | 'female' = 'male',
  personName?: string,
  timezone?: string
): BaZiChart {
  const [yStr, mStr, dStr] = birthDateStr.split('-');
  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);

  const [hStr, minStr] = birthTimeStr.split(':');
  const hour = parseInt(hStr, 10);
  const minute = parseInt(minStr, 10);
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day) ||
      !Number.isInteger(hour) || !Number.isInteger(minute) || month < 1 || month > 12 ||
      day < 1 || day > new Date(year, month, 0).getDate() || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new RangeError('Tanggal atau waktu lahir tidak valid.');
  }

  const birthInstantUtc = getBirthInstantUtc(year, month, day, hour, minute, timezone);
  const liChun = JIE_TERMS[0];
  const liChunInstant = getSolarTermInstant(year, liChun);
  const solarYear = birthInstantUtc < liChunInstant ? year - 1 : year;

  // Year pillar uses the Li Chun boundary, not Lunar New Year or a fixed February date.
  const yearStemIdx = ((solarYear - 4) % 10 + 10) % 10;
  const yearBranchIdx = ((solarYear - 4) % 12 + 12) % 12;
  const yearStem = HEAVENLY_STEMS[yearStemIdx];
  const yearBranch = EARTHLY_BRANCHES[yearBranchIdx];

  // Month pillar follows the latest Jie solar term. Xiao Han belongs to the Ox month
  // of the solar year that began at the preceding Li Chun.
  const latestTerm = getLatestJieTerm(birthInstantUtc, year);
  const solarMonthOrder = latestTerm.order;
  const monthBranchIdx = (solarMonthOrder + 1) % 12;
  const monthBranch = EARTHLY_BRANCHES[monthBranchIdx];

  // Five Tigers rule (Wu Hu Dun): month stem is derived from the Li Chun year stem.
  const tigerStartStem = ((yearStemIdx % 5) * 2 + 2) % 10;
  const monthStemIdx = (tigerStartStem + (solarMonthOrder - 1)) % 10;
  const monthStem = HEAVENLY_STEMS[monthStemIdx];

  // 3. Day Pillar
  // Benchmark verification:
  // 2000-01-01 was Wu Wu (Stem 4, Branch 6). JDN = 2451545.
  // 2451545 % 10 = 5. (5 + 9) % 10 = 4 (Wu).
  // 2451545 % 12 = 5. (5 + 1) % 12 = 6 (Wu).
  // Note: if hour is 23:00 or later, in traditional midnight Zi hour (Ye Zi),
  // some schools count it as the next day's Zi hour. Here we use standard solar day.
  const jdn = gregorianToJDN(year, month, day);
  const dayStemIdx = ((jdn + 9) % 10 + 10) % 10;
  const dayBranchIdx = ((jdn + 1) % 12 + 12) % 12;
  const dayStem = HEAVENLY_STEMS[dayStemIdx];
  const dayBranch = EARTHLY_BRANCHES[dayBranchIdx];
  const dayMaster = dayStem;

  // 4. Hour Pillar
  // Hour Branch (12 Shi Chen):
  // 23:00 - 00:59: Zi (0)
  // 01:00 - 02:59: Chou (1)
  // 03:00 - 04:59: Yin (2)
  // ...
  let hourBranchIdx = Math.floor(((hour + 1) % 24) / 2);
  const hourBranch = EARTHLY_BRANCHES[hourBranchIdx];

  // Hour Stem using "Five Rats Seeking Hour" (Wu Shu Dun) based on Day Stem:
  // Day Stem 0 or 5 (Jia, Ji) -> Zi hour starts with Jia (0)
  // Day Stem 1 or 6 (Yi, Geng) -> Zi hour starts with Bing (2)
  // Day Stem 2 or 7 (Bing, Xin) -> Zi hour starts with Wu (4)
  // Day Stem 3 or 8 (Ding, Ren) -> Zi hour starts with Geng (6)
  // Day Stem 4 or 9 (Wu, Gui) -> Zi hour starts with Ren (8)
  const ziStartStem = ((dayStemIdx % 5) * 2) % 10;
  const hourStemIdx = (ziStartStem + hourBranchIdx) % 10;
  const hourStem = HEAVENLY_STEMS[hourStemIdx];

  // Build Pillars with Ten Gods
  const yearPillar: Pillar = {
    stem: yearStem,
    branch: yearBranch,
    tenGod: getTenGodRelation(dayMaster, yearStem),
    branchTenGod: getTenGodRelation(dayMaster, yearBranch.hiddenStems[0].stem),
  };

  const monthPillar: Pillar = {
    stem: monthStem,
    branch: monthBranch,
    tenGod: getTenGodRelation(dayMaster, monthStem),
    branchTenGod: getTenGodRelation(dayMaster, monthBranch.hiddenStems[0].stem),
  };

  const dayPillar: Pillar = {
    stem: dayStem,
    branch: dayBranch,
    tenGod: 'Day Master (Diri Sendiri)',
    branchTenGod: getTenGodRelation(dayMaster, dayBranch.hiddenStems[0].stem),
  };

  const hourPillar: Pillar = {
    stem: hourStem,
    branch: hourBranch,
    tenGod: getTenGodRelation(dayMaster, hourStem),
    branchTenGod: getTenGodRelation(dayMaster, hourBranch.hiddenStems[0].stem),
  };

  // 5. Calculate Five Elements Distribution & Weighted Scores
  const elementScores: Record<ElementType, number> = {
    Wood: 0,
    Fire: 0,
    Earth: 0,
    Metal: 0,
    Water: 0,
  };

  // Weights:
  // Month Branch Commander carries highest weight: 40 points
  // Other Branches: 20 points each (distributed according to hidden stems)
  // Stems: 15 points each (Month Stem 18 points)
  elementScores[yearStem.element] += 15;
  elementScores[monthStem.element] += 18;
  elementScores[dayStem.element] += 15; // Day Master presence
  elementScores[hourStem.element] += 15;

  // Year Branch (20 pts)
  yearBranch.hiddenStems.forEach((h) => {
    elementScores[h.stem.element] += 20 * h.weight;
  });

  // Month Branch Commander (40 pts)
  monthBranch.hiddenStems.forEach((h) => {
    elementScores[h.stem.element] += 40 * h.weight;
  });

  // Day Branch / Spouse Palace (25 pts)
  dayBranch.hiddenStems.forEach((h) => {
    elementScores[h.stem.element] += 25 * h.weight;
  });

  // Hour Branch (20 pts)
  hourBranch.hiddenStems.forEach((h) => {
    elementScores[h.stem.element] += 20 * h.weight;
  });

  const totalScore = Object.values(elementScores).reduce((a, b) => a + b, 0);
  const elementDistribution: Record<ElementType, number> = {
    Wood: Math.round((elementScores.Wood / totalScore) * 100),
    Fire: Math.round((elementScores.Fire / totalScore) * 100),
    Earth: Math.round((elementScores.Earth / totalScore) * 100),
    Metal: Math.round((elementScores.Metal / totalScore) * 100),
    Water: Math.round((elementScores.Water / totalScore) * 100),
  };

  // 6. Day Master Strength Analysis
  const dmElement = dayMaster.element;
  const resourceElement = getGeneratingParent(dmElement);

  // Supportive score: Same Element + Resource Element
  const supportiveScore = elementScores[dmElement] + elementScores[resourceElement];
  const supportivePercentage = Math.round((supportiveScore / totalScore) * 100);

  // Season Support (De Ling 得令)
  const isSupportedBySeason =
    monthBranch.element === dmElement || monthBranch.element === resourceElement;

  let strengthLevel: BaZiChart['dayMasterStrength']['level'] = 'Seimbang';
  let strengthDesc = '';

  if (supportivePercentage >= 65) {
    strengthLevel = 'Sangat Kuat';
    strengthDesc = `Day Master ${dayMaster.nameId} memiliki energi yang sangat dominan (${supportivePercentage}% dukungan). Diperlukan pelepasan energi (Output) atau disiplin (Officer) agar energi mengalir produktif.`;
  } else if (supportivePercentage >= 52) {
    strengthLevel = 'Kuat';
    strengthDesc = `Day Master ${dayMaster.nameId} memiliki fondasi energi yang kokoh (${supportivePercentage}% dukungan). Memerlukan elemen Pengurang/Pengalir untuk menyalurkan ambisi dan potensi finansial.`;
  } else if (supportivePercentage >= 42) {
    strengthLevel = 'Seimbang';
    strengthDesc = `Energi ${dayMaster.nameId} berada dalam kisaran dinamis yang cukup seimbang. Pilihan elemen keberuntungan difokuskan pada penyesuaian iklim musim (Tiao Hou) dan kelancaran sirkulasi.`;
  } else if (supportivePercentage >= 28) {
    strengthLevel = 'Lemah';
    strengthDesc = `Day Master ${dayMaster.nameId} memerlukan dukungan tambahan (${supportivePercentage}% dukungan). Sangat dianjurkan memperkuat elemen Penaung (Resource) dan Sahabat (Companion) untuk menjaga stamina dan kepercayaan diri.`;
  } else {
    strengthLevel = 'Sangat Lemah';
    strengthDesc = `Day Master ${dayMaster.nameId} berada dalam kondisi rentan terkuras (${supportivePercentage}% dukungan). Elemen Penaung (Resource) menjadi penyelamat utama untuk melindungi vitalitas dan keberuntungan.`;
  }

  // 7. Determine Yong Shen (Useful God / Elemen Penolong Utama) & Xi Shen (Favorable)
  let yongShen: ElementType;
  let xiShen: ElementType;
  let unfavorableJiShen: ElementType;
  let rationale = '';

  const isWinter = [11, 12, 1].includes(solarMonthOrder);
  const isSummer = [4, 5, 6].includes(solarMonthOrder);

  if (strengthLevel === 'Lemah' || strengthLevel === 'Sangat Lemah') {
    // Weak Day Master needs Resource (Yin) or Companion (Same)
    // Priority: If cold winter, Fire is essential; if hot summer, Water is needed.
    if (isWinter && dmElement !== 'Fire') {
      yongShen = 'Fire';
      xiShen = resourceElement;
      unfavorableJiShen = 'Water';
      rationale = `Karena lahir di musim dingin yang membeku dan Day Master berstatus Lemah, Bagan memerlukan Api (Fire) sebagai pengatur kehangatan (Tiao Hou) serta ${resourceElement} untuk menopang vitalitas jiwa.`;
    } else if (isSummer && dmElement !== 'Water') {
      yongShen = 'Water';
      xiShen = resourceElement;
      unfavorableJiShen = 'Fire';
      rationale = `Lahir di musim panas dengan energi api yang menyengat dan Day Master Lemah membutuhkan Air (Water) untuk melembabkan bagan dan mengalirkan rezeki serta ketenangan batin.`;
    } else {
      yongShen = resourceElement;
      xiShen = dmElement;
      unfavorableJiShen = getControllingElement(dmElement);
      rationale = `Day Master ${dayMaster.nameId} membutuhkan asupan energi primer dari elemen Penaung (${resourceElement}) dan elemen pendamping (${dmElement}) guna memperkuat kapabilitas, resiliensi, dan fokus eksekusi.`;
    }
  } else if (strengthLevel === 'Kuat' || strengthLevel === 'Sangat Kuat') {
    // Strong Day Master needs Output (Shi/Shang), Wealth (Cai), or Officer (Guan)
    const outputElement = getGeneratedChild(dmElement);
    const wealthElement = getControlledElement(dmElement);
    const officerElement = getControllingElement(dmElement);

    if (elementScores[outputElement] < elementScores[wealthElement]) {
      yongShen = outputElement;
      xiShen = wealthElement;
      unfavorableJiShen = resourceElement;
      rationale = `Day Master berkarakter Kuat memiliki cadangan energi melimpah yang harus dialirkan melalui Output (${outputElement}) untuk menciptakan karya nyata, disusul Wealth (${wealthElement}) untuk mengkapitalisasi peluang finansial.`;
    } else {
      yongShen = wealthElement;
      xiShen = officerElement;
      unfavorableJiShen = resourceElement;
      rationale = `Dengan vitalitas yang kokoh, elemen Rezeki (${wealthElement}) dan Otoritas (${officerElement}) menjadi magnet utama kesuksesan, mencegah stagnasi energi internal.`;
    }
  } else {
    // Balanced
    const lowestElement = (Object.keys(elementScores) as ElementType[]).reduce((a, b) =>
      elementScores[a] < elementScores[b] ? a : b
    );
    yongShen = lowestElement;
    xiShen = getGeneratingParent(lowestElement);
    unfavorableJiShen = getControllingElement(lowestElement);
    rationale = `Karena bagan Anda berada dalam ekuilibrium dinamis, elemen ${lowestElement} yang paling minim menjadi kunci harmonisasi agar tidak terjadi hambatan aliran energi (Qi).`;
  }

  // Recommendations for the primary Yong Shen
  const recommendations = getRecommendationsForElement(yongShen);

  // 8. Generate DaYun (10-Year Luck Cycle)
  const daYunList = generateDaYun(
    yearStem,
    monthStem,
    monthBranch,
    gender,
    dayMaster,
    yongShen,
    xiShen
  );

  return {
    personName,
    timezone,
    birthDate: birthDateStr,
    birthTime: birthTimeStr,
    gender,
    solarTermName: monthBranch.season,
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster,
    elementDistribution,
    elementScores,
    dayMasterStrength: {
      level: strengthLevel,
      score: supportivePercentage,
      isSupportedBySeason,
      seasonSummary: `Musim ${monthBranch.season} dipimpin oleh cabang ${monthBranch.char} (${monthBranch.element})`,
      description: strengthDesc,
    },
    luckyElements: {
      primaryYongShen: yongShen,
      secondaryXiShen: xiShen,
      neutralXianShen: 'Earth',
      unfavorableJiShen,
      rationale,
    },
    recommendations,
    daYunList,
  };
}

function getControllingElement(target: ElementType): ElementType {
  const reverseControl: Record<ElementType, ElementType> = {
    Wood: 'Metal',
    Fire: 'Water',
    Earth: 'Wood',
    Metal: 'Fire',
    Water: 'Earth',
  };
  return reverseControl[target];
}

function getControlledElement(attacker: ElementType): ElementType {
  const control: Record<ElementType, ElementType> = {
    Wood: 'Earth',
    Earth: 'Water',
    Water: 'Fire',
    Fire: 'Metal',
    Metal: 'Wood',
  };
  return control[attacker];
}

function generateDaYun(
  yearStem: HeavenlyStem,
  monthStem: HeavenlyStem,
  monthBranch: EarthlyBranch,
  gender: 'male' | 'female',
  dayMaster: HeavenlyStem,
  yongShen: ElementType,
  xiShen: ElementType
): DaYunCycle[] {
  // Yang Male or Yin Female moves FORWARD (+1)
  // Yin Male or Yang Female moves BACKWARD (-1)
  const isYangYear = yearStem.polarity === 'Yang';
  const isForward = (gender === 'male' && isYangYear) || (gender === 'female' && !isYangYear);
  const step = isForward ? 1 : -1;

  const cycles: DaYunCycle[] = [];
  const startAge = 4; // Typical starting age approximation

  for (let i = 1; i <= 8; i++) {
    const stemIdx = (monthStem.index + step * i + 100) % 10;
    const branchIdx = (monthBranch.index + step * i + 120) % 12;

    const stem = HEAVENLY_STEMS[stemIdx];
    const branch = EARTHLY_BRANCHES[branchIdx];

    const isFavorable =
      stem.element === yongShen ||
      stem.element === xiShen ||
      branch.element === yongShen ||
      branch.element === xiShen;

    let theme = '';
    if (stem.element === yongShen) {
      theme = 'Puncak Rezeki & Peluang Emas';
    } else if (stem.element === xiShen) {
      theme = 'Ekspansi & Peningkatan Karier';
    } else if (isFavorable) {
      theme = 'Pertumbuhan Stabil & Harmoni';
    } else {
      theme = 'Fase Konsolidasi & Mawas Diri';
    }

    cycles.push({
      ageStart: startAge + (i - 1) * 10,
      ageEnd: startAge + i * 10 - 1,
      pillar: {
        stem,
        branch,
        tenGod: getTenGodRelation(dayMaster, stem),
        branchTenGod: getTenGodRelation(dayMaster, branch.hiddenStems[0].stem),
      },
      element: stem.element,
      isFavorable,
      theme,
      notes: `Pilar ${stem.char}${branch.char} (${stem.nameId} / ${branch.animal}) membawa resonansi energi ${stem.element}.`,
    });
  }

  return cycles;
}

export function getRecommendationsForElement(element: ElementType): ElementRecommendations {
  switch (element) {
    case 'Wood':
      return {
        element: 'Wood',
        chineseName: 'Mù (木)',
        colors: [
          { name: 'Hijau Zamrud', hex: '#059669', advice: 'Membuka kreativitas, vitalitas, dan perluasan jaringan relasi.' },
          { name: 'Cyan & Toska', hex: '#0D9488', advice: 'Sangat cocok untuk pakaian kerja harian dan presentasi penting.' },
          { name: 'Hijau Zaitun', hex: '#4D7C0F', advice: 'Menghadirkan ketenangan batin dan ketabahan menghadapi tantangan.' },
        ],
        luckyDirections: ['Timur (Energi Pertumbuhan)', 'Tenggara (Pintu Rezeki Berkelanjutan)'],
        bestRoomSectors: ['Sektor Timur rumah untuk ruang kerja atau meja belajar', 'Dekorasi tanaman hidup berdaun lebar di area Tenggara'],
        careers: [
          'Pendidikan, Pengajaran, & Akademi',
          'Penerbitan, Penulisan, & Jurnalisme',
          'Industri Kehutanan, Lanskap, & Pertanian Berkelanjutan',
          'Desain Busana Tekstil & Mode Ramah Lingkungan',
          'Kesehatan Herbal, Nutrisi Organik, & Farmasi Alam',
          'Pengembangan SDM (Human Resources & Mentoring)',
        ],
        dailyHabits: [
          'Jalan kaki pagi hari di area hijau atau taman rindang.',
          'Rutin membaca buku cetak dan membuat jurnal tulisan tangan.',
          'Konsumsi sayuran berdaun hijau segar dan teh hijau hangat.',
          'Melatih kelenturan tubuh seperti Yoga, Pilates, atau peregangan otot.',
        ],
        nutritionAndFoods: ['Bayam, brokoli, asparagus, matcha, apel hijau, kiwi, jeruk nipis.'],
        gemstonesAndCrystals: ['Giok Hijau (Jadeite)', 'Aventurine Hijau', 'Emerald / Zamrud', 'Malachite'],
        avoidFactors: ['Terlalu banyak mengenakan warna putih polos/perak yang memotong energi kayu.', 'Ruang kerja tanpa tanaman atau sirkulasi udara tertutup.'],
      };

    case 'Fire':
      return {
        element: 'Fire',
        chineseName: 'Huǒ (火)',
        colors: [
          { name: 'Merah Anggur / Karmin', hex: '#DC2626', advice: 'Meningkatkan karisma kepemimpinan dan keberanian mengambil inisiatif.' },
          { name: 'Oranye Hangat', hex: '#EA580C', advice: 'Mendorong keceriaan, kemampuan persuasi, dan kemudahan bergaul.' },
          { name: 'Ungu Bangsawan', hex: '#7C3AED', advice: 'Menarik kehormatan reputasi (Ming Qi) dan wibawa profesional.' },
        ],
        luckyDirections: ['Selatan (Sektor Ketenaran & Reputasi)'],
        bestRoomSectors: ['Sektor Selatan rumah atau kantor untuk meja kerja eksekutif', 'Pencahayaan terang dengan lampu bersuhu hangat (Warm White 3000K)'],
        careers: [
          'Teknologi Informasi, Kecerdasan Buatan (AI), & Software',
          'Pemasaran Digital, Media Sosial, & Public Relations',
          'Industri Hiburan, Sinematografi, & Seni Pertunjukan',
          'Kuliner, Restoran, Kafe, & Bakery (Proses Memasak Api)',
          'Energi Surya, Kelistrikan, Elektronika, & Telekomunikasi',
          'Branding, Desain Grafis, & Industri Kreatif Visual',
        ],
        dailyHabits: [
          'Berjemur di bawah sinar matahari pagi selama 15 menit.',
          'Olahraga kardio yang memacu keringat (jogging, aerobic, zumba).',
          'Menyalakan lilin aromaterapi aroma jeruk atau kayu manis saat malam.',
          'Aktif berbicara dalam forum, diskusi, dan presentasi publik.',
        ],
        nutritionAndFoods: ['Tomat, delima, cabai merah dalam porsi wajar, beri merah, paprika merah, buah bit.'],
        gemstonesAndCrystals: ['Ruby (Batu Delima)', 'Garnet Merah', 'Carnelian Oranye', 'Amethyst Ungu'],
        avoidFactors: ['Ruangan lembab, gelap, atau kurang ventilasi cahaya matahari.', 'Terlalu sering mengenakan warna hitam pekat yang memadamkan antusiasme.'],
      };

    case 'Earth':
      return {
        element: 'Earth',
        chineseName: 'Tǔ (土)',
        colors: [
          { name: 'Kuning Oker / Mustar', hex: '#D97706', advice: 'Memberikan kejelasan berpikir analitis dan kepercayaan dari investor/klien.' },
          { name: 'Cokelat Kayu & Terakota', hex: '#854D0E', advice: 'Menciptakan stabilitas emosional dan pondasi aset yang kokoh.' },
          { name: 'Krem & Pasir Gurun', hex: '#A16207', advice: 'Menyejukkan suasana hati dan mempererat hubungan keluarga.' },
        ],
        luckyDirections: ['Timur Laut & Barat Daya (Sektor Stabilitas & Pengetahuan)', 'Area Tengah (Pusat Keseimbangan)'],
        bestRoomSectors: ['Meja kerja di area tengah atau sudut Barat Daya rumah', 'Penggunaan pot gerabah, keramik porselen, dan dekorasi berbahan batu'],
        careers: [
          'Properti, Real Estate, Pengembang Kawasan, & Konstruksi',
          'Manajemen Aset, Perbankan Investasi, & Asuransi',
          'Pertambangan, Keramik, Geologi, & Pertanian Tanah',
          'Gudang Logistik, Penyimpanan, & Rantai Pasok',
          'Layanan Konsultasi Hukum, Kenotariatan, & Mediasi',
          'Kearsipan, Museum, & Sejarah Kuno',
        ],
        dailyHabits: [
          'Meditasi grounding tanpa alas kaki di atas rumput atau tanah alami.',
          'Membiasakan rutinitas tidur teratur dan menjaga ketenangan lambung.',
          'Menyimpan catatan keuangan dan aset dalam binder rapi.',
          'Hobi berkebun memindahkan tanaman ke pot keramik alami.',
        ],
        nutritionAndFoods: ['Ubi jalar kuning, labu kuning, wortel, jagung manis, kentang panggang, madu murni.'],
        gemstonesAndCrystals: ['Citrine Kuning (Batu Kemakmuran)', 'Tiger Eye (Mata Harimau)', 'Yellow Jasper', 'Smoky Quartz'],
        avoidFactors: ['Terlalu banyak tanaman merambat yang menyerap habis tanah.', 'Sifat ragu-ragu berkepanjangan yang menunda eksekusi penting.'],
      };

    case 'Metal':
      return {
        element: 'Metal',
        chineseName: 'Jīn (金)',
        colors: [
          { name: 'Putih Murni', hex: '#F8FAFC', advice: 'Menjernihkan pikiran dari kekacauan mental dan mempertajam disiplin eksekusi.' },
          { name: 'Emas Kilau', hex: '#CA8A04', advice: 'Meningkatkan peluang prestise, kemuliaan, dan kemitraan tingkat tinggi.' },
          { name: 'Perak & Platinum', hex: '#64748B', advice: 'Mendukung ketepatan keputusan investasi dan negosiasi bisnis rasional.' },
        ],
        luckyDirections: ['Barat (Sektor Kebahagiaan & Proyeksi Panen)', 'Barat Laut (Sektor Penolong Mulia / Tian Yi Gui Ren)'],
        bestRoomSectors: ['Sektor Barat Laut untuk meja kerja penentu kebijakan / direktur', 'Sentuhan aksen logam kuningan, cermin bulat, atau bel angin logam'],
        careers: [
          'Keuangan, Akuntansi Publik, Perbankan, & Audit',
          'Hukum, Advokasi, Jaksa, & Kehakiman (Penegakan Keadilan)',
          'Teknik Mesin, Otomotif, Penerbangan, & Manufaktur Presisi',
          'Perhiasan Mewah, Jam Tangan Mewah, & Logam Mulia',
          'Kedokteran Bedah, Bedah Mulut/Gigi, & Instrumen Medis',
          'Militer, Pertahanan, & Kepemimpinan Operasional Ketat',
        ],
        dailyHabits: [
          'Membuat jadwal kerja dengan batasan waktu yang terstruktur (time-blocking).',
          'Latihan pernapasan dalam (pranayama) untuk memperkuat kapasitas paru-paru.',
          'Merapikan meja kerja hingga bebas dari tumpukan barang yang tidak terpakai.',
          'Mendengarkan musik instrumental klasik berdenting logam atau piano lembut.',
        ],
        nutritionAndFoods: ['Pir putih, lobak putih, kembang kol, bawang putih, jamur tiram, almond, biji wijen putih.'],
        gemstonesAndCrystals: ['Clear Quartz (Kuarsa Bening)', 'Pyrite (Emas Bodoh / Penarik Kelimpahan)', 'Batu Bulan (Moonstone)', 'Mutiara'],
        avoidFactors: ['Ruangan berantakan dan tidak teratur yang mengaburkan kejernihan logika.', 'Terlalu banyak warna merah menyala yang melelehkan logam.'],
      };

    case 'Water':
      return {
        element: 'Water',
        chineseName: 'Shuǐ (水)',
        colors: [
          { name: 'Biru Laut Dalam', hex: '#0284C7', advice: 'Membuka wawasan strategis yang mendalam dan ketenangan berpikir.' },
          { name: 'Hitam Obsidian', hex: '#0F172A', advice: 'Menciptakan daya tarik magnetis, misterius, dan perlindungan energi.' },
          { name: 'Biru Dongker / Navy', hex: '#1E3A8A', advice: 'Sangat direkomendasikan saat bernegosiasi dan kontrak internasional.' },
        ],
        luckyDirections: ['Utara (Sektor Karier, Kebijaksanaan, & Perjalanan)'],
        bestRoomSectors: ['Sektor Utara rumah untuk area relaksasi atau ruang belajar filosofi', 'Akuarium bersih atau fitur air mengalir (fountain) yang tenang'],
        careers: [
          'Logistik Internasional, Pelayaran, Ekspor-Impor, & Transportasi',
          'Pariwisata, Hospitality, Perhotelan, & Biro Perjalanan',
          'Psikologi, Konseling Mental, Filosofi, & Riset Mendalam',
          'Industri Minuman, Akuakultur, & Pengelolaan Sumber Daya Air',
          'Media Komunikasi, Penyiaran Global, & Jaringan Data Internet',
          'Strategi Pasar Modal & Perdagangan Fluktuatif (Trading)',
        ],
        dailyHabits: [
          'Minum air mineral bersih bersuhu ruang minimal 2,5 liter per hari.',
          'Berenang, berendam santai, atau mendengarkan deburan ombak laut.',
          'Membiasakan introspeksi hening sebelum tidur di malam hari.',
          'Fleksibel dalam menghadapi perubahan rencana tanpa kehilangan arah.',
        ],
        nutritionAndFoods: ['Rumput laut (nori), kacang hitam, wijen hitam, blueberry, terong ungu, ikan salmon, air kelapa.'],
        gemstonesAndCrystals: ['Aquamarine', 'Black Obsidian', 'Lapis Lazuli', 'Sodalite', 'Black Tourmaline'],
        avoidFactors: ['Kekurangan cairan tubuh yang menyebabkan kelesuan mental.', 'Berada terlalu lama di lingkungan kaku tanpa ruang gerak adaptasi.'],
      };
  }
}
