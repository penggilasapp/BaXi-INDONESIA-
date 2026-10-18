export type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
export type PolarityType = 'Yang' | 'Yin';

export interface HeavenlyStem {
  index: number;
  char: string;
  pinyin: string;
  nameId: string;
  element: ElementType;
  polarity: PolarityType;
  description: string;
  archetype: string;
}

export interface EarthlyBranch {
  index: number;
  char: string;
  pinyin: string;
  animal: string;
  element: ElementType;
  hiddenStems: {
    stem: HeavenlyStem;
    weight: number; // e.g. 0.6 for primary, 0.3, 0.1
    tenGodName?: string;
  }[];
  season: string;
  direction: string;
  monthIndex: number; // Solar term month (1-12)
}

export interface Pillar {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  tenGod: string; // Relation to Day Master
  branchTenGod: string; // Primary hidden stem relation
  phaseNaYin?: string;
}

export interface BaZiChart {
  personName?: string;
  timezone?: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  gender: 'male' | 'female';
  solarTermName: string;
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  dayMaster: HeavenlyStem;
  elementDistribution: Record<ElementType, number>; // percentages 0-100
  elementScores: Record<ElementType, number>; // raw weighted scores
  dayMasterStrength: {
    level: 'Sangat Lemah' | 'Lemah' | 'Seimbang' | 'Kuat' | 'Sangat Kuat';
    score: number; // 0 - 100
    isSupportedBySeason: boolean;
    seasonSummary: string;
    description: string;
  };
  luckyElements: {
    primaryYongShen: ElementType; // Elemen Penolong Utama
    secondaryXiShen: ElementType; // Elemen Pendukung
    neutralXianShen: ElementType; // Elemen Netral
    unfavorableJiShen: ElementType; // Elemen Tantangan / Pantangan
    rationale: string;
  };
  recommendations: ElementRecommendations;
  daYunList: DaYunCycle[];
}

export interface DaYunCycle {
  ageStart: number;
  ageEnd: number;
  pillar: Pillar;
  element: ElementType;
  isFavorable: boolean;
  theme: string;
  notes: string;
}

export interface ElementRecommendations {
  element: ElementType;
  chineseName: string;
  colors: {
    name: string;
    hex: string;
    advice: string;
  }[];
  luckyDirections: string[];
  bestRoomSectors: string[];
  careers: string[];
  dailyHabits: string[];
  nutritionAndFoods: string[];
  gemstonesAndCrystals: string[];
  avoidFactors: string[];
}
