/**
 * BaZi Partner Compatibility Engine
 * BaZi by PENGGILAS
 * 
 * Evaluates energetic synergy between two BaZi charts:
 * 1. Day Master (Batin & Jiwa) interaction & Heavenly Stem combinations (Tian Gan Wu He)
 * 2. Yong Shen (Elemen Penolong) mutual complementarity (Saling Menutrisi)
 * 3. Spouse Palace (Day Branch) & Year Branch harmony (Liu He, San He, Chong)
 * 4. Overall Wu Xing combined balance & practical harmonization guidance
 */

import { BaZiChart, ElementType } from '../types/bazi';

export interface StemSynergy {
  partner1Stem: string;
  partner2Stem: string;
  relationType: 'combination' | 'generating' | 'generated' | 'same' | 'controlling' | 'controlled';
  relationName: string;
  score: number; // 0 - 35
  description: string;
  combinationTitle?: string;
}

export interface YongShenSynergy {
  p1YongShen: ElementType;
  p2YongShen: ElementType;
  p1ProvidesP2: boolean;
  p2ProvidesP1: boolean;
  score: number; // 0 - 35
  description: string;
  recommendation: string;
}

export interface BranchSynergy {
  p1DayBranch: string;
  p2DayBranch: string;
  p1Animal: string;
  p2Animal: string;
  relationType: 'six_harmonies' | 'three_harmonies' | 'neutral' | 'clash' | 'same';
  relationName: string;
  score: number; // 0 - 20
  description: string;
}

export interface BalanceSynergy {
  score: number; // 0 - 10
  description: string;
}

export interface PartnerCompatibilityResult {
  overallScore: number; // 0 - 100
  tier: 'Luar Biasa Selaras' | 'Sangat Harmonis' | 'Seimbang & Saling Melengkapi' | 'Dinamis & Perlu Penyelarasan' | 'Menantang tapi Menguatkan';
  summary: string;
  dayMasterSynergy: StemSynergy;
  yongShenSynergy: YongShenSynergy;
  spousePalaceSynergy: BranchSynergy;
  yearBranchSynergy: BranchSynergy;
  combinedElementPercentages: Record<ElementType, number>;
  strengths: string[];
  challenges: string[];
  harmonizationTips: {
    sharedColors: string[];
    sharedElements: ElementType[];
    fengShuiAdvice: string;
    communicationAdvice: string;
    jointActivities: string[];
  };
}

// Five Stems Combination (Tian Gan Wu He 天干五合)
const STEM_COMBINATIONS: Record<string, { partner: string; name: string; elementResult: string; meaning: string }> = {
  '甲': { partner: '己', name: 'Kombinasi Integritas & Ketulusan (甲己合化土)', elementResult: 'Tanah', meaning: 'Jia (Kayu Yang) bertemu Ji (Tanah Yin). Menghadirkan hubungan yang penuh tanggung jawab moral, saling menghormati, dan berfondasi kokoh seperti batu karang.' },
  '己': { partner: '甲', name: 'Kombinasi Integritas & Ketulusan (甲己合化土)', elementResult: 'Tanah', meaning: 'Ji (Tanah Yin) bertemu Jia (Kayu Yang). Hubungan pengasuhan yang aman, stabil, dan penuh rasa saling percaya.' },
  '乙': { partner: '庚', name: 'Kombinasi Keadilan & Kebijaksanaan (乙庚合化金)', elementResult: 'Logam', meaning: 'Yi (Kayu Yin) bertemu Geng (Logam Yang). Perpaduan sempurna antara ketegasan pelindung dan kelembutan diplomatis, saling melengkapi peran dengan anggun.' },
  '庚': { partner: '乙', name: 'Kombinasi Keadilan & Kebijaksanaan (乙庚合化金)', elementResult: 'Logam', meaning: 'Geng (Logam Yang) bertemu Yi (Kayu Yin). Ketegasan baja dilunakkan oleh keanggunan tanaman rambat, mewujudkan kompromi yang indah.' },
  '丙': { partner: '辛', name: 'Kombinasi Karisma & Keberwibawaan (丙辛合化水)', elementResult: 'Air', meaning: 'Bing (Api Yang) bertemu Xin (Logam Yin). Daya tarik magnetis yang sangat kuat; kehangatan matahari memancarkan kilau perhiasan permata dengan memesona.' },
  '辛': { partner: '丙', name: 'Kombinasi Karisma & Keberwibawaan (丙辛合化水)', elementResult: 'Air', meaning: 'Xin (Logam Yin) bertemu Bing (Api Yang). Hubungan berkelas, saling mengagumi kualitas estetika, status, dan kecerdasan intelektual.' },
  '丁': { partner: '壬', name: 'Kombinasi Kasih Sayang Mendalam (丁壬合化木)', elementResult: 'Kayu', meaning: 'Ding (Api Yin) bertemu Ren (Air Yang). Ikatan batin yang sangat intim dan penuh rasa empati, bagai lilin penerang yang membimbing bahtera di samudra luas.' },
  '壬': { partner: '丁', name: 'Kombinasi Kasih Sayang Mendalam (丁壬合化木)', elementResult: 'Kayu', meaning: 'Ren (Air Yang) bertemu Ding (Api Yin). Cinta yang hangat dan penuh inspirasi baru, mengikis kejenuhan dengan percakapan emosional yang mendalam.' },
  '戊': { partner: '癸', name: 'Kombinasi Kebijaksanaan & Vitalitas (戊癸合化火)', elementResult: 'Api', meaning: 'Wu (Tanah Yang) bertemu Gui (Air Yin). Gunung kokoh yang dialiri mata air jernih, memicu kreativitas, gairah hidup, dan kesuburan rezeki bersama.' },
  '癸': { partner: '戊', name: 'Kombinasi Kebijaksanaan & Vitalitas (戊癸合化火)', elementResult: 'Api', meaning: 'Gui (Air Yin) bertemu Wu (Tanah Yang). Kelembutan air yang menemukan dermaga aman pada gunung yang teguh, memberi rasa damai batin yang tiada tara.' },
};

// Sheng (Generating) Cycle
const GENERATING_CYCLE: Record<ElementType, ElementType> = {
  Wood: 'Fire',
  Fire: 'Earth',
  Earth: 'Metal',
  Metal: 'Water',
  Water: 'Wood',
};

// Ke (Controlling) Cycle
const CONTROLLING_CYCLE: Record<ElementType, ElementType> = {
  Wood: 'Earth',
  Earth: 'Water',
  Water: 'Fire',
  Fire: 'Metal',
  Metal: 'Wood',
};

// Six Harmonies of Earthly Branches (Liu He 六合)
const SIX_HARMONIES: Record<string, string> = {
  '子': '丑', '丑': '子',
  '寅': '亥', '亥': '寅',
  '卯': '戌', '戌': '卯',
  '辰': '酉', '酉': '辰',
  '巳': '申', '申': '巳',
  '午': '未', '未': '午',
};

// Three Harmonies (San He 三合)
const THREE_HARMONIES: [string, string, string][] = [
  ['申', '子', '辰'], // Water frame
  ['寅', '午', '戌'], // Fire frame
  ['巳', '酉', '丑'], // Metal frame
  ['亥', '卯', '未'], // Wood frame
];

// Six Clashes of Earthly Branches (Liu Chong 六冲)
const SIX_CLASHES: Record<string, string> = {
  '子': '午', '午': '子', // Tikus - Kuda
  '丑': '未', '未': '丑', // Kerbau - Kambing
  '寅': '申', '申': '寅', // Macan - Monyet
  '卯': '酉', '酉': '卯', // Kelinci - Ayam
  '辰': '戌', '戌': '辰', // Naga - Anjing
  '巳': '亥', '亥': '巳', // Ular - Babi
};

/**
 * Calculate full compatibility between two BaZi charts
 */
export function calculatePartnerCompatibility(
  chart1: BaZiChart,
  chart2: BaZiChart
): PartnerCompatibilityResult {
  const p1Name = chart1.personName || 'Pasangan 1';
  const p2Name = chart2.personName || 'Pasangan 2';

  // 1. DAY MASTER ANALYSIS (0 - 35 points)
  const stem1 = chart1.dayMaster;
  const stem2 = chart2.dayMaster;
  let dayMasterSynergy: StemSynergy;

  const combo = STEM_COMBINATIONS[stem1.char];
  if (combo && combo.partner === stem2.char) {
    dayMasterSynergy = {
      partner1Stem: `${stem1.char} (${stem1.nameId})`,
      partner2Stem: `${stem2.char} (${stem2.nameId})`,
      relationType: 'combination',
      relationName: 'Kombinasi Surgawi (Tian Gan Wu He 天干五合)',
      combinationTitle: combo.name,
      score: 35,
      description: `${combo.meaning} Ini adalah salah satu konfigurasi paling sakral dan harmonis dalam metafisika BaZi.`,
    };
  } else if (GENERATING_CYCLE[stem1.element] === stem2.element) {
    dayMasterSynergy = {
      partner1Stem: `${stem1.char} (${stem1.nameId})`,
      partner2Stem: `${stem2.char} (${stem2.nameId})`,
      relationType: 'generating',
      relationName: `Siklus Melahirkan (Sheng 生): ${stem1.element} melahirkan ${stem2.element}`,
      score: 30,
      description: `${p1Name} (${stem1.nameId}) secara alami memberikan energi, perhatian, dan asuhan positif kepada ${p2Name} (${stem2.nameId}). Hubungan terasa sangat penuh pengorbanan yang tulus dan suportif.`,
    };
  } else if (GENERATING_CYCLE[stem2.element] === stem1.element) {
    dayMasterSynergy = {
      partner1Stem: `${stem1.char} (${stem1.nameId})`,
      partner2Stem: `${stem2.char} (${stem2.nameId})`,
      relationType: 'generated',
      relationName: `Siklus Diberi Energi (Sheng 生): ${stem2.element} melahirkan ${stem1.element}`,
      score: 30,
      description: `${p2Name} (${stem2.nameId}) merupakan pilar penopang dan sumber inspirasi utama bagi ${p1Name}. Tercipta rasa aman batin dan kenyamanan yang mendalam.`,
    };
  } else if (stem1.element === stem2.element) {
    dayMasterSynergy = {
      partner1Stem: `${stem1.char} (${stem1.nameId})`,
      partner2Stem: `${stem2.char} (${stem2.nameId})`,
      relationType: 'same',
      relationName: `Elemen Sama (Bi Jie 比肩): Sesama ${stem1.element}`,
      score: 25,
      description: `Keduanya memiliki frekuensi elemen dasar yang serupa (${stem1.element}). Anda berdua seperti sahabat sejati yang memiliki visi hidup serupa, mudah memahami bahasa tubuh satu sama lain, namun perlu menjaga ruang ego masing-masing.`,
    };
  } else if (CONTROLLING_CYCLE[stem1.element] === stem2.element) {
    dayMasterSynergy = {
      partner1Stem: `${stem1.char} (${stem1.nameId})`,
      partner2Stem: `${stem2.char} (${stem2.nameId})`,
      relationType: 'controlling',
      relationName: `Dinamika Kepemimpinan (Ke 克): ${stem1.element} mengarahkan ${stem2.element}`,
      score: 20,
      description: `${stem1.nameId} cenderung memberikan arahan dan struktur bagi ${stem2.nameId}. Jika diimbangi dengan kelembutan, hubungan ini menjadi kemitraan kerja dan pencapaian target hidup yang sangat produktif.`,
    };
  } else {
    dayMasterSynergy = {
      partner1Stem: `${stem1.char} (${stem1.nameId})`,
      partner2Stem: `${stem2.char} (${stem2.nameId})`,
      relationType: 'controlled',
      relationName: `Dinamika Pembelajaran (Ke 克): ${stem2.element} mengarahkan ${stem1.element}`,
      score: 20,
      description: `${stem2.nameId} memegang kendali kedisiplinan dan arah hidup. Memberikan dorongan bertumbuh yang kuat bila kedua belah pihak menjunjung tinggi komunikasi terbuka.`,
    };
  }

  // 2. YONG SHEN MUTUAL NOURISHMENT (0 - 35 points)
  const p1YongShen = chart1.luckyElements.primaryYongShen;
  const p2YongShen = chart2.luckyElements.primaryYongShen;

  // Check if partner 2's distribution has ample amounts of partner 1's Yong Shen (>= 20%)
  const p2ProvidesP1 = (chart2.elementDistribution[p1YongShen] || 0) >= 20;
  // Check if partner 1's distribution has ample amounts of partner 2's Yong Shen (>= 20%)
  const p1ProvidesP2 = (chart1.elementDistribution[p2YongShen] || 0) >= 20;

  let yongShenScore = 15;
  let yongShenDesc = '';
  let yongShenRec = '';

  if (p1ProvidesP2 && p2ProvidesP1) {
    yongShenScore = 35;
    yongShenDesc = `Sempurna! ${p1Name} membawa energi kelimpahan elemen ${p2YongShen} yang sangat dibutuhkan oleh ${p2Name}, dan sebaliknya ${p2Name} membawa elemen ${p1YongShen} yang merupakan Elemen Penolong utama bagi ${p1Name}. Ini adalah fenomena 'Saling Memberi Keberuntungan' (Hu Bu 互补).`;
    yongShenRec = 'Kebersamaan Anda berdua secara otomatis memperkuat magnet rezeki, stabilitas emosi, dan kesehatan fisik satu sama lain.';
  } else if (p2ProvidesP1) {
    yongShenScore = 27;
    yongShenDesc = `${p2Name} membawa elemen ${p1YongShen} dalam porsi yang melimpah, sehingga kehadiran ${p2Name} membawa kedamaian dan membukakan pintu hoki bagi ${p1Name}.`;
    yongShenRec = `Gunakan warna atau aktivitas berelemen ${p2YongShen} saat berdua agar ${p1Name} dapat membalas asuhan energi kepada ${p2Name}.`;
  } else if (p1ProvidesP2) {
    yongShenScore = 27;
    yongShenDesc = `${p1Name} membawa elemen ${p2YongShen} yang berlimpah, menjadi pelindung energi dan pengarah yang sangat menguntungkan bagi ${p2Name}.`;
    yongShenRec = `Gunakan warna atau aktivitas berelemen ${p1YongShen} saat berdua agar terjadi timbal balik energi yang seimbang.`;
  } else {
    yongShenScore = 18;
    yongShenDesc = `Elemen Penolong Anda berdua berbeda fokus (${p1Name}: ${p1YongShen}, ${p2Name}: ${p2YongShen}), namun Anda dapat menyelaraskannya dengan memadukan dekorasi ruangan dan gaya hidup berelemen netral.`;
    yongShenRec = `Fokuslah pada elemen pendukung bersama (${chart1.luckyElements.secondaryXiShen} dan ${chart2.luckyElements.secondaryXiShen}) untuk memperkuat keharmonisan.`;
  }

  const yongShenSynergy: YongShenSynergy = {
    p1YongShen,
    p2YongShen,
    p1ProvidesP2,
    p2ProvidesP1,
    score: yongShenScore,
    description: yongShenDesc,
    recommendation: yongShenRec,
  };

  // 3. SPOUSE PALACE (DAY BRANCH) SYNERGY (0 - 20 points)
  const b1 = chart1.dayPillar.branch;
  const b2 = chart2.dayPillar.branch;
  let spousePalaceSynergy: BranchSynergy;

  if (SIX_HARMONIES[b1.char] === b2.char) {
    spousePalaceSynergy = {
      p1DayBranch: `${b1.char} (${b1.pinyin})`,
      p2DayBranch: `${b2.char} (${b2.pinyin})`,
      p1Animal: b1.animal,
      p2Animal: b2.animal,
      relationType: 'six_harmonies',
      relationName: 'Harmoni Enam Cabang (Liu He 六合)',
      score: 20,
      description: `Istana Pasangan Anda (${b1.animal} & ${b2.animal}) membentuk Liu He (Kombinasi Sakral Enam Cabang). Ini melambangkan kedekatan fisik, kecocokan ranjang/keintiman yang intim, dan komitmen jangka panjang yang langgeng.`,
    };
  } else if (THREE_HARMONIES.some((trio) => trio.includes(b1.char) && trio.includes(b2.char))) {
    spousePalaceSynergy = {
      p1DayBranch: `${b1.char} (${b1.pinyin})`,
      p2DayBranch: `${b2.char} (${b2.pinyin})`,
      p1Animal: b1.animal,
      p2Animal: b2.animal,
      relationType: 'three_harmonies',
      relationName: 'Aliansi Tiga Harmoni (San He 三合)',
      score: 18,
      description: `Istana Pasangan Anda beresonansi dalam satu poros trinitas elemen (San He). Menandakan tujuan hidup bersama, cita-cita keluarga yang selaras, dan kekompakan dalam mengelola keuangan.`,
    };
  } else if (SIX_CLASHES[b1.char] === b2.char) {
    spousePalaceSynergy = {
      p1DayBranch: `${b1.char} (${b1.pinyin})`,
      p2DayBranch: `${b2.char} (${b2.pinyin})`,
      p1Animal: b1.animal,
      p2Animal: b2.animal,
      relationType: 'clash',
      relationName: 'Benturan Dinamis Istana (Liu Chong 六冲)',
      score: 8,
      description: `Terdapat benturan istana (${b1.animal} vs ${b2.animal}). Perbedaan pola hidup harian atau temperamen sesaat dapat memicu gesekan kecil. Solusinya adalah menghargai hobi dan ruang privasi masing-masing, serta tidak memaksakan ritme yang identik.`,
    };
  } else if (b1.char === b2.char) {
    spousePalaceSynergy = {
      p1DayBranch: `${b1.char} (${b1.pinyin})`,
      p2DayBranch: `${b2.char} (${b2.pinyin})`,
      p1Animal: b1.animal,
      p2Animal: b2.animal,
      relationType: 'same',
      relationName: 'Cabang Istana Identik',
      score: 14,
      description: `Memiliki pilar istana pasangan yang sama (${b1.animal}). Kebiasaan rumah tangga sangat mirip, saling memahami selera makan dan tempat tinggal, namun perlu menghindari sifat keras kepala bersama saat sedang berselisih.`,
    };
  } else {
    spousePalaceSynergy = {
      p1DayBranch: `${b1.char} (${b1.pinyin})`,
      p2DayBranch: `${b2.char} (${b2.pinyin})`,
      p1Animal: b1.animal,
      p2Animal: b2.animal,
      relationType: 'neutral',
      relationName: 'Netral & Damai',
      score: 13,
      description: `Hubungan antar istana pasangan berjalan tenang tanpa gejolak benturan tajam. Kualitas hubungan sangat ditentukan oleh kematangan komunikasi dan komitmen sadar berdua.`,
    };
  }

  // 4. YEAR BRANCH (SHIO) SYNERGY (0 - 10 points)
  const yb1 = chart1.yearPillar.branch;
  const yb2 = chart2.yearPillar.branch;
  let yearBranchSynergy: BranchSynergy;

  if (SIX_HARMONIES[yb1.char] === yb2.char) {
    yearBranchSynergy = {
      p1DayBranch: yb1.char,
      p2DayBranch: yb2.char,
      p1Animal: yb1.animal,
      p2Animal: yb2.animal,
      relationType: 'six_harmonies',
      relationName: 'Harmoni Shio Liu He',
      score: 10,
      description: `Shio ${yb1.animal} dan ${yb2.animal} sangat akur di mata keluarga besar dan lingkungan sosial.`,
    };
  } else if (THREE_HARMONIES.some((trio) => trio.includes(yb1.char) && trio.includes(yb2.char))) {
    yearBranchSynergy = {
      p1DayBranch: yb1.char,
      p2DayBranch: yb2.char,
      p1Animal: yb1.animal,
      p2Animal: yb2.animal,
      relationType: 'three_harmonies',
      relationName: 'Kombinasi Shio San He',
      score: 9,
      description: `Shio ${yb1.animal} dan ${yb2.animal} memiliki visi sosial dan nilai kekeluargaan yang saling mendukung.`,
    };
  } else if (SIX_CLASHES[yb1.char] === yb2.char) {
    yearBranchSynergy = {
      p1DayBranch: yb1.char,
      p2DayBranch: yb2.char,
      p1Animal: yb1.animal,
      p2Animal: yb2.animal,
      relationType: 'clash',
      relationName: 'Benturan Shio (Ciong)',
      score: 4,
      description: `Shio ${yb1.animal} dan ${yb2.animal} berada dalam polaritas berlawanan. Ini wajar dan mudah dijembatani dengan mendahulukan logika serta rasa hormat dalam interaksi dengan keluarga besar.`,
    };
  } else {
    yearBranchSynergy = {
      p1DayBranch: yb1.char,
      p2DayBranch: yb2.char,
      p1Animal: yb1.animal,
      p2Animal: yb2.animal,
      relationType: 'neutral',
      relationName: 'Kecocokan Shio Fleksibel',
      score: 7,
      description: `Shio ${yb1.animal} dan ${yb2.animal} memiliki hubungan yang adaptif dan bebas dari ciong mayor.`,
    };
  }

  // Calculate Combined Element Distribution
  const elements: ElementType[] = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const combinedElementPercentages: Record<ElementType, number> = {} as Record<ElementType, number>;
  for (const el of elements) {
    const avg = Math.round(((chart1.elementDistribution[el] || 0) + (chart2.elementDistribution[el] || 0)) / 2);
    combinedElementPercentages[el] = avg;
  }

  // Total Overall Score
  const rawTotal = dayMasterSynergy.score + yongShenSynergy.score + spousePalaceSynergy.score + yearBranchSynergy.score;
  const overallScore = Math.min(99, Math.max(45, Math.round(rawTotal)));

  let tier: PartnerCompatibilityResult['tier'];
  if (overallScore >= 88) tier = 'Luar Biasa Selaras';
  else if (overallScore >= 78) tier = 'Sangat Harmonis';
  else if (overallScore >= 68) tier = 'Seimbang & Saling Melengkapi';
  else if (overallScore >= 58) tier = 'Dinamis & Perlu Penyelarasan';
  else tier = 'Menantang tapi Menguatkan';

  // Strengths and Challenges
  const strengths: string[] = [];
  const challenges: string[] = [];

  if (dayMasterSynergy.score >= 25) {
    strengths.push(`Harmoni Batin: Day Master ${stem1.nameId} dan ${stem2.nameId} memiliki ikatan batin ${dayMasterSynergy.relationName.toLowerCase()}.`);
  }
  if (p1ProvidesP2 || p2ProvidesP1) {
    strengths.push(`Saling Menutrisi Hoki: Salah satu atau kedua pasangan membawa suplai Elemen Penolong (Yong Shen) yang dibutuhkan.`);
  }
  if (spousePalaceSynergy.score >= 15) {
    strengths.push(`Kecocokan Rumah Tangga: Istana Pasangan (${spousePalaceSynergy.p1Animal} - ${spousePalaceSynergy.p2Animal}) selaras untuk komitmen panjang.`);
  }

  if (spousePalaceSynergy.relationType === 'clash') {
    challenges.push(`Potensi friksi temperamen dalam kebiasaan rumah tangga sehari-hari (Benturan ${spousePalaceSynergy.p1Animal} vs ${spousePalaceSynergy.p2Animal}).`);
  }
  if (!p1ProvidesP2 && !p2ProvidesP1) {
    challenges.push(`Perlu usaha sadar untuk saling memahami kebutuhan emosional karena Elemen Penolong utama tidak otomatis terisi oleh bagan pasangan.`);
  }
  if (dayMasterSynergy.relationType === 'same') {
    challenges.push(`Sesama elemen ${stem1.element} dapat memicu persaingan ego bila keduanya ingin memegang kendali keputusan bersama.`);
  }
  if (challenges.length === 0) {
    challenges.push('Menjaga agar rutinitas tidak membuat hubungan menjadi monoton; jadwalkan liburan bersama secara berkala.');
  }

  // Harmonization Advice
  const sharedColors = Array.from(new Set([
    ...chart1.recommendations.colors.map((c) => c.name),
    ...chart2.recommendations.colors.map((c) => c.name),
  ])).slice(0, 5);

  const sharedElements: ElementType[] = Array.from(new Set([
    chart1.luckyElements.primaryYongShen,
    chart2.luckyElements.primaryYongShen,
    chart1.luckyElements.secondaryXiShen,
    chart2.luckyElements.secondaryXiShen,
  ]));

  const summary = `Pasangan ${p1Name} (${stem1.nameId}) dan ${p2Name} (${stem2.nameId}) memiliki tingkat kecocokan energi sebesar ${overallScore}% (${tier}). ${dayMasterSynergy.description}`;

  return {
    overallScore,
    tier,
    summary,
    dayMasterSynergy,
    yongShenSynergy,
    spousePalaceSynergy,
    yearBranchSynergy,
    combinedElementPercentages,
    strengths,
    challenges,
    harmonizationTips: {
      sharedColors,
      sharedElements,
      fengShuiAdvice: `Gunakan sektor ${chart1.recommendations.luckyDirections[0] || 'Timur'} atau ${chart2.recommendations.luckyDirections[0] || 'Selatan'} sebagai arah kepala tempat tidur atau ruang santai bersama untuk menstabilkan chi harmonis rumah tangga.`,
      communicationAdvice: `Saat berdiskusi penting, biarkan pihak ${stem1.polarity === 'Yin' ? p1Name : p2Name} mengutarakan perasaan terlebih dahulu, sementara pihak ${stem1.polarity === 'Yang' ? p1Name : p2Name} menyediakan solusi terstruktur tanpa memotong pembicaraan.`,
      jointActivities: [
        `Berjalan di alam terbuka atau taman hijau (mengaktifkan energi Kayu & Tanah)`,
        `Memasak hidangan hangat bersama di akhir pekan (menghidupkan kehangatan Api)`,
        `Mengatur tata letak dekorasi rumah dengan tanaman hias atau elemen air mancur mini`,
      ],
    },
  };
}
