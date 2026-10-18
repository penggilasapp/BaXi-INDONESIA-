import {
  BaZiChart,
  EarthlyBranch,
  ElementType,
  HeavenlyStem,
} from '../types/bazi';
import {
  EARTHLY_BRANCHES,
  HEAVENLY_STEMS,
  getTenGodRelation,
  isControlling,
  isGenerating,
} from './baziCalculator';

export interface DailyBaZiEnergy {
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: string; // Senin, Selasa, etc.
  formattedDate: string; // 17 Oktober 2026
  isToday: boolean;

  // Daily Pillar
  dayPillar: {
    stem: HeavenlyStem;
    branch: EarthlyBranch;
    combinedPinyin: string; // e.g. "Bing Shen"
    combinedChar: string; // e.g. "丙申"
    elementDescription: string;
    naYin: string; // Na Yin Melodic Element
  };

  // Relation to User Day Master
  userDayMaster: HeavenlyStem;
  tenGodName: string; // e.g. "Pian Cai (Rezeki Tidak Langsung)"
  tenGodCategory: 'Resource' | 'Companion' | 'Output' | 'Wealth' | 'Officer';
  tenGodSummary: string;

  // Compatibility with User's Yong Shen / Xi Shen / Ji Shen
  isYongShenDay: boolean;
  isXiShenDay: boolean;
  isJiShenDay: boolean;
  luckScore: number; // 0 - 100
  luckStars: number; // 1 - 5
  overallRatingLabel:
    | 'Hari Sangat Menguntungkan (Hari Emas)'
    | 'Hari Baik & Produktif'
    | 'Hari Stabil & Seimbang'
    | 'Hari Hati-hati & Reflektif';

  // Clashes & Harmonies (Chong & He)
  clashWithDayBranch: boolean;
  clashWithYearBranch: boolean;
  harmonyWithDayBranch: boolean;
  branchInteractionNote: string | null;

  // Practical Daily Guidance
  energyTheme: string;
  detailedInfluence: string;
  recommendedActions: string[];
  avoidActions: string[];
  luckyHours: {
    timeRange: string;
    branchName: string;
    animal: string;
    stemChar: string;
    isAuspicious: boolean;
    note: string;
  }[];
  luckyColorHex: string;
  luckyColorName: string;
  dailyAffirmation: string;
}

// 60 Jia Zi Na Yin table
const NA_YIN_TABLE: Record<number, string> = {
  0: 'Emas Dasar Laut (海中金)',
  1: 'Emas Dasar Laut (海中金)',
  2: 'Api Dalam Tungku (炉中火)',
  3: 'Api Dalam Tungku (炉中火)',
  4: 'Kayu Hutan Belantara (大林木)',
  5: 'Kayu Hutan Belantara (大林木)',
  6: 'Tanah Tepi Jalan (路旁土)',
  7: 'Tanah Tepi Jalan (路旁土)',
  8: 'Logam Pedang Baja (剑锋金)',
  9: 'Logam Pedang Baja (剑锋金)',
  10: 'Api Puncak Gunung (山头火)',
  11: 'Api Puncak Gunung (山头火)',
  12: 'Air Jeram Lembah (涧下水)',
  13: 'Air Jeram Lembah (涧下水)',
  14: 'Tanah Benteng Kota (城头土)',
  15: 'Tanah Benteng Kota (城头土)',
  16: 'Logam Lilin Putih (白蜡金)',
  17: 'Logam Lilin Putih (白蜡金)',
  18: 'Kayu Pohon Willow (杨柳木)',
  19: 'Kayu Pohon Willow (杨柳木)',
  20: 'Air Mata Air Jernih (泉中水)',
  21: 'Air Mata Air Jernih (泉中水)',
  22: 'Tanah Atap Rumah (屋上土)',
  23: 'Tanah Atap Rumah (屋上土)',
  24: 'Api Petir Halilintar (霹雳火)',
  25: 'Api Petir Halilintar (霹雳火)',
  26: 'Kayu Pinus Abadi (松柏木)',
  27: 'Kayu Pinus Abadi (松柏木)',
  28: 'Air Sungai Mengalir (长流水)',
  29: 'Air Sungai Mengalir (长流水)',
  30: 'Emas Butiran Pasir (沙中金)',
  31: 'Emas Butiran Pasir (沙中金)',
  32: 'Api Kaki Gunung (山下火)',
  33: 'Api Kaki Gunung (山下火)',
  34: 'Kayu Dataran Luas (平地木)',
  35: 'Kayu Dataran Luas (平地木)',
  36: 'Tanah Dinding Pelindung (壁上土)',
  37: 'Tanah Dinding Pelindung (壁上土)',
  38: 'Logam Daun Emas (金箔金)',
  39: 'Logam Daun Emas (金箔金)',
  40: 'Api Lentera Penerang (覆灯火)',
  41: 'Api Lentera Penerang (覆灯火)',
  42: 'Air Sungai Bima Sakti (天河水)',
  43: 'Air Sungai Bima Sakti (天河水)',
  44: 'Tanah Pos Jalur Sutra (大驿土)',
  45: 'Tanah Pos Jalur Sutra (大驿土)',
  46: 'Logam Perhiasan Mahkota (钗钏金)',
  47: 'Logam Perhiasan Mahkota (钗钏金)',
  48: 'Kayu Murbei Rindang (桑柘木)',
  49: 'Kayu Murbei Rindang (桑柘木)',
  50: 'Air Anak Sungai Deras (大溪水)',
  51: 'Air Anak Sungai Deras (大溪水)',
  52: 'Tanah Pasir Halus (沙中土)',
  53: 'Tanah Pasir Halus (沙中土)',
  54: 'Api Cahaya Surya Langit (天上火)',
  55: 'Api Cahaya Surya Langit (天上火)',
  56: 'Kayu Delima Berbuah (石榴木)',
  57: 'Kayu Delima Berbuah (石榴木)',
  58: 'Air Samudera Luas (大海水)',
  59: 'Air Samudera Luas (大海水)',
};

const CLASH_PAIRS: Record<number, number> = {
  0: 6, // Zi (Tikus) vs Wu (Kuda)
  1: 7, // Chou (Kerbau) vs Wei (Kambing)
  2: 8, // Yin (Macan) vs Shen (Monyet)
  3: 9, // Mao (Kelinci) vs You (Ayam)
  4: 10, // Chen (Naga) vs Xu (Anjing)
  5: 11, // Si (Ular) vs Hai (Babi)
  6: 0,
  7: 1,
  8: 2,
  9: 3,
  10: 4,
  11: 5,
};

const SIX_HARMONIES: Record<number, number> = {
  0: 1, // Zi + Chou
  1: 0,
  2: 11, // Yin + Hai
  11: 2,
  3: 10, // Mao + Xu
  10: 3,
  4: 9, // Chen + You
  9: 4,
  5: 8, // Si + Shen
  8: 5,
  6: 7, // Wu + Wei
  7: 6,
};

const INDONESIAN_DAYS = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

const INDONESIAN_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

// Gregorian date to Julian Day Number
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

// 60 Jia Zi index from Stem and Branch
function get60JiaZiIndex(stemIdx: number, branchIdx: number): number {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) {
      return i;
    }
  }
  return 0;
}

export function getDailyBaZiEnergy(
  dateStr: string,
  chart: BaZiChart
): DailyBaZiEnergy {
  const [yStr, mStr, dStr] = dateStr.split('-');
  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);

  const jdn = gregorianToJDN(year, month, day);
  const dayStemIdx = ((jdn + 9) % 10 + 10) % 10;
  const dayBranchIdx = ((jdn + 1) % 12 + 12) % 12;

  const dayStem = HEAVENLY_STEMS[dayStemIdx];
  const dayBranch = EARTHLY_BRANCHES[dayBranchIdx];
  const jiaZiIndex = get60JiaZiIndex(dayStemIdx, dayBranchIdx);
  const naYin = NA_YIN_TABLE[jiaZiIndex] || 'Harmoni Lima Elemen';

  const dateObj = new Date(year, month - 1, day);
  const todayObj = new Date();
  const isToday =
    todayObj.getFullYear() === year &&
    todayObj.getMonth() === month - 1 &&
    todayObj.getDate() === day;

  const dayOfWeek = INDONESIAN_DAYS[dateObj.getDay()];
  const formattedDate = `${day} ${INDONESIAN_MONTHS[month - 1]} ${year}`;

  // Calculate Ten Gods relation to User's Day Master
  const dm = chart.dayMaster;
  const tenGodName = getTenGodRelation(dm, dayStem);

  let tenGodCategory: 'Resource' | 'Companion' | 'Output' | 'Wealth' | 'Officer' =
    'Companion';
  if (isGenerating(dayStem.element, dm.element)) {
    tenGodCategory = 'Resource';
  } else if (dayStem.element === dm.element) {
    tenGodCategory = 'Companion';
  } else if (isGenerating(dm.element, dayStem.element)) {
    tenGodCategory = 'Output';
  } else if (isControlling(dm.element, dayStem.element)) {
    tenGodCategory = 'Wealth';
  } else if (isControlling(dayStem.element, dm.element)) {
    tenGodCategory = 'Officer';
  }

  // Check favorable / unfavorable relations
  const isYongShenDay =
    dayStem.element === chart.luckyElements.primaryYongShen ||
    dayBranch.element === chart.luckyElements.primaryYongShen;
  const isXiShenDay =
    !isYongShenDay &&
    (dayStem.element === chart.luckyElements.secondaryXiShen ||
      dayBranch.element === chart.luckyElements.secondaryXiShen);
  const isJiShenDay =
    !isYongShenDay &&
    !isXiShenDay &&
    (dayStem.element === chart.luckyElements.unfavorableJiShen ||
      dayBranch.element === chart.luckyElements.unfavorableJiShen);

  // Clashes (Chong) and Harmonies (He)
  const userDayBranchIdx = chart.dayPillar.branch.index;
  const userYearBranchIdx = chart.yearPillar.branch.index;

  const clashWithDayBranch = CLASH_PAIRS[dayBranch.index] === userDayBranchIdx;
  const clashWithYearBranch = CLASH_PAIRS[dayBranch.index] === userYearBranchIdx;
  const harmonyWithDayBranch = SIX_HARMONIES[dayBranch.index] === userDayBranchIdx;

  let branchInteractionNote: string | null = null;
  if (clashWithDayBranch) {
    branchInteractionNote = `Chong (Benturan Energi) dengan Pilar Hari Anda (${chart.dayPillar.branch.animal}): Hari ini jaga kesabaran dengan pasangan, hindari debat impulsif, dan berhati-hatilah saat berkendara.`;
  } else if (clashWithYearBranch) {
    branchInteractionNote = `Chong dengan Shio Tahun Lahir (${chart.yearPillar.branch.animal}): Waspadai dinamika lingkungan sosial luar; lebih baik bersikap fleksibel dan mendengarkan.`;
  } else if (harmonyWithDayBranch) {
    branchInteractionNote = `Liu He (Enam Harmoni) dengan Pilar Hari Anda (${chart.dayPillar.branch.animal}): Aliran chi sangat harmonis! Sangat baik untuk menjalin relasi akrab, kencan, dan kemitraan.`;
  }

  // Calculate Luck Score (0 - 100)
  let baseScore = 65;
  if (isYongShenDay) baseScore += 25;
  if (isXiShenDay) baseScore += 15;
  if (isJiShenDay) baseScore -= 20;
  if (harmonyWithDayBranch) baseScore += 10;
  if (clashWithDayBranch) baseScore -= 18;
  if (clashWithYearBranch) baseScore -= 10;

  const luckScore = Math.max(25, Math.min(98, baseScore));
  let luckStars = 3;
  let overallRatingLabel: DailyBaZiEnergy['overallRatingLabel'] =
    'Hari Stabil & Seimbang';

  if (luckScore >= 85) {
    luckStars = 5;
    overallRatingLabel = 'Hari Sangat Menguntungkan (Hari Emas)';
  } else if (luckScore >= 72) {
    luckStars = 4;
    overallRatingLabel = 'Hari Baik & Produktif';
  } else if (luckScore >= 55) {
    luckStars = 3;
    overallRatingLabel = 'Hari Stabil & Seimbang';
  } else {
    luckStars = 2;
    overallRatingLabel = 'Hari Hati-hati & Reflektif';
  }

  // Ten God Summary & Guidance
  let tenGodSummary = '';
  let energyTheme = '';
  let detailedInfluence = '';
  let recommendedActions: string[] = [];
  let avoidActions: string[] = [];

  switch (tenGodCategory) {
    case 'Wealth':
      energyTheme = 'Rezeki Finansial & Negosiasi Cuan (Cai 星)';
      tenGodSummary =
        'Hari ini elemen pilar harian membuka frekuensi Harta bagi Day Master Anda.';
      detailedInfluence = `Elemen ${dayStem.nameId} (${dayStem.element}) dikendalikan oleh Day Master ${dm.nameId}. Ini memicu intuisi tajam untuk melihat peluang bisnis, negosiasi kontrak bernilai uang, dan optimalisasi aliran kas.`;
      recommendedActions = [
        'Melakukan penawaran harga atau pitching bisnis',
        'Membahas kerja sama komersial dan investasi',
        'Meninjau strategi pemasukan dan pembukuan',
        'Tanda tangan kontrak bernilai finansial',
      ];
      avoidActions = [
        'Pengeluaran impulsif atau belanja emosional',
        'Meminjamkan uang tanpa perjanjian tertulis',
        'Terlalu perhitungan hingga menyinggung relasi',
      ];
      break;

    case 'Output':
      energyTheme = 'Kreativitas, Karisma & Eksekusi Karya (Shi/Shang)';
      tenGodSummary =
        'Hari ini energi Anda mengalir deras ke luar untuk berekspresi dan berinovasi.';
      detailedInfluence = `Day Master ${dm.nameId} melahirkan elemen ${dayStem.nameId} (${dayStem.element}). Daya kreasi, artikulasi bicara, dan rasa percaya diri Anda berada di level puncak. Sangat bagus untuk memukau audiens.`;
      recommendedActions = [
        'Presentasi publik, seminar, atau meeting ide baru',
        'Menulis, mendesain, atau meluncurkan karya kreatif',
        'Memecahkan masalah rumit dengan solusi di luar kotak',
        'Berbagi inspirasi di media sosial atau forum profesional',
      ];
      avoidActions = [
        'Berbicara terlalu tajam atau sarkastis',
        'Menolak masukan orang lain karena merasa paling pintar',
        'Memulai terlalu banyak proyek tanpa dituntaskan',
      ];
      break;

    case 'Resource':
      energyTheme = 'Penaung Batin, Belajar & Pemulihan Energi (Yin 星)';
      tenGodSummary =
        'Hari ini elemen harian memberi nutrisi dan perlindungan langsung pada diri Anda.';
      detailedInfluence = `Elemen ${dayStem.nameId} (${dayStem.element}) melahirkan Day Master ${dm.nameId}. Ini menghadirkan kejernihan pikiran, ketenangan batin, dukungan dari mentor atau figur senior, dan pemulihan stamina yang sangat baik.`;
      recommendedActions = [
        'Membaca buku, riset mendalam, atau mengambil sertifikasi',
        'Konsultasi dengan mentor atau atasan yang bijak',
        'Meditasi, yoga, istirahat cukup, dan perawatan tubuh',
        'Merencanakan strategi jangka panjang dengan tenang',
      ];
      avoidActions = [
        'Menunda-nunda keputusan penting karena terlalu pasif',
        'Mengurung diri berlebihan dari komunikasi tim',
        'Tenggelam dalam overthinking tanpa tindakan nyata',
      ];
      break;

    case 'Officer':
      energyTheme = 'Otoritas, Disiplin & Struktur Karier (Guan/Sha)';
      tenGodSummary =
        'Hari ini menguji kepemimpinan, kepatuhan sistem, dan ketahanan mental Anda.';
      detailedInfluence = `Elemen ${dayStem.nameId} (${dayStem.element}) memegang kendali atas Day Master ${dm.nameId}. Anda dituntut untuk bekerja dengan standar tinggi, menuntaskan tanggung jawab hukum/formal, dan menunjukkan integritas.`;
      recommendedActions = [
        'Pertemuan formal dengan pimpinan, regulator, atau klien korporat',
        'Merapikan SOP, jadwal kerja, dan kepatuhan administrasi',
        'Menunjukkan tanggung jawab dan integritas kepemimpinan',
        'Mendelegasikan tugas dengan instruksi tegas dan jelas',
      ];
      avoidActions = [
        'Melanggar aturan atau mencoba jalan pintas berisiko',
        'Konfrontasi terbuka dengan atasan atau penegak hukum',
        'Membiarkan stres menumpuk tanpa relaksasi pernapasan',
      ];
      break;

    case 'Companion':
    default:
      energyTheme = 'Kolaborasi, Kemitraan & Perluasan Jaringan (Bi/Jie)';
      tenGodSummary =
        'Hari ini frekuensi elemen harian setara dan berdampingan dengan Day Master Anda.';
      detailedInfluence = `Elemen ${dayStem.nameId} memiliki frekuensi yang sama dengan Day Master ${dm.nameId}. Semangat sosial, kebersamaan rekan kerja, dan kemampuan membangun koneksi terasa kuat. Waspadai persaingan tersembunyi.`;
      recommendedActions = [
        'Networking, gathering komunitas, atau reuni mitra lama',
        'Bekerja sama dalam tim (gotong royong) untuk beban berat',
        'Mencari sudut pandang kedua dari sahabat tepercaya',
        'Membangun aliansi strategis dengan pihak selevel',
      ];
      avoidActions = [
        'Terjebak dalam perdebatan gengsi atau ego pribadi',
        'Rasa iri terhadap pencapaian rekan sebaya',
        'Berbagi rencana rahasia kepada orang yang baru dikenal',
      ];
      break;
  }

  // Calculate 12 Double-Hours (Shi Chen)
  // Determine Rat hour stem using Wu Shu Dun (Five Rats Seeking Hour)
  const ratStartStem = ((dayStemIdx % 5) * 2) % 10;
  const luckyHours = EARTHLY_BRANCHES.map((br, idx) => {
    const hourStemIdx = (ratStartStem + idx) % 10;
    const hourStem = HEAVENLY_STEMS[hourStemIdx];
    const isYongShenHour =
      hourStem.element === chart.luckyElements.primaryYongShen ||
      br.element === chart.luckyElements.primaryYongShen;
    const isXiShenHour =
      hourStem.element === chart.luckyElements.secondaryXiShen ||
      br.element === chart.luckyElements.secondaryXiShen;
    const isClashHour = CLASH_PAIRS[br.index] === userDayBranchIdx;

    const timeRanges = [
      '23:00 - 00:59',
      '01:00 - 02:59',
      '03:00 - 04:59',
      '05:00 - 06:59',
      '07:00 - 08:59',
      '09:00 - 10:59',
      '11:00 - 12:59',
      '13:00 - 14:59',
      '15:00 - 16:59',
      '17:00 - 18:59',
      '19:00 - 20:59',
      '21:00 - 22:59',
    ];

    let note = 'Jam Netral';
    if (isClashHour) {
      note = 'Jam Benturan (Hati-hati)';
    } else if (isYongShenHour) {
      note = 'Jam Emas (Yong Shen)';
    } else if (isXiShenHour) {
      note = 'Jam Pendukung (Xi Shen)';
    }

    return {
      timeRange: timeRanges[idx],
      branchName: br.pinyin,
      animal: br.animal,
      stemChar: hourStem.char,
      isAuspicious: !isClashHour && (isYongShenHour || isXiShenHour),
      note,
    };
  });

  // Recommended Daily Balancing Color
  // Recommend user's primary Yong Shen color, or balancing color if day is Ji Shen
  const yongShenRecommendations = chart.recommendations.colors[0] || {
    name: 'Warna Penolong',
    hex: '#D97706',
  };
  const luckyColorHex = yongShenRecommendations.hex;
  const luckyColorName = yongShenRecommendations.name;

  // Daily Affirmation
  const dailyAffirmation = isYongShenDay
    ? `Hari ini chi alam semesta mendukung ${dm.nameId} saya sepenuhnya. Saya siap melangkah dengan keyakinan dan memetik kelimpahan rezeki.`
    : clashWithDayBranch
    ? `Saya merespons setiap gejolak hari ini dengan kepala dingin dan kebijaksanaan. Ketenangan adalah benteng perlindungan terbaik saya.`
    : `Saya menyelaraskan energi ${dm.nameId} dengan ritme hari ini, bertindak cerdas, dan menciptakan hasil terbaik dalam setiap karya.`;

  return {
    dateStr,
    dayOfWeek,
    formattedDate,
    isToday,
    dayPillar: {
      stem: dayStem,
      branch: dayBranch,
      combinedPinyin: `${dayStem.pinyin} ${dayBranch.pinyin}`,
      combinedChar: `${dayStem.char}${dayBranch.char}`,
      elementDescription: `${dayStem.element} (${dayStem.polarity}) & ${dayBranch.animal} (${dayBranch.element})`,
      naYin,
    },
    userDayMaster: dm,
    tenGodName,
    tenGodCategory,
    tenGodSummary,
    isYongShenDay,
    isXiShenDay,
    isJiShenDay,
    luckScore,
    luckStars,
    overallRatingLabel,
    clashWithDayBranch,
    clashWithYearBranch,
    harmonyWithDayBranch,
    branchInteractionNote,
    energyTheme,
    detailedInfluence,
    recommendedActions,
    avoidActions,
    luckyHours,
    luckyColorHex,
    luckyColorName,
    dailyAffirmation,
  };
}

// Generate an array of days around centerDateStr
export function getDailyBaZiWeekStrip(
  centerDateStr: string,
  chart: BaZiChart,
  daysSpan: number = 7
): DailyBaZiEnergy[] {
  const [y, m, d] = centerDateStr.split('-').map(Number);
  const center = new Date(y, m - 1, d);
  const result: DailyBaZiEnergy[] = [];

  const half = Math.floor(daysSpan / 2);
  for (let i = -half; i <= half; i++) {
    const cur = new Date(center);
    cur.setDate(center.getDate() + i);
    const dateStr = cur.toISOString().split('T')[0];
    result.push(getDailyBaZiEnergy(dateStr, chart));
  }

  return result;
}
