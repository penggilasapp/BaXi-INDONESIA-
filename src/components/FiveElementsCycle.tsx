import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BaZiChart, ElementType } from '../types/bazi';
import { WuXingRadarChart } from './WuXingRadarChart';

interface FiveElementsCycleProps {
  chart: BaZiChart;
}

export interface ElementInteraction {
  id: string;
  type: 'generate' | 'control'; // Sheng vs Ke
  source: ElementType;
  target: ElementType;
  sourceName: string;
  targetName: string;
  sourceChar: string;
  targetChar: string;
  chineseFormula: string;
  title: string;
  nature: string;
  description: string;
  baziImpact: string;
  isLine: boolean;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  d?: string;
  midX: number;
  midY: number;
}

const ELEMENT_INFO: Record<
  ElementType,
  {
    name: string;
    char: string;
    pinyin: string;
    color: string;
    fill: string;
    stroke: string;
    organ: string;
    emotion: string;
    nature: string;
  }
> = {
  Wood: {
    name: 'Kayu',
    char: '木',
    pinyin: 'Mù',
    color: 'text-emerald-700',
    fill: '#059669',
    stroke: '#047857',
    organ: 'Hati & Kantung Empedu',
    emotion: 'Kebaikan Hati vs Kemarahan',
    nature: 'Pertumbuhan, Fleksibilitas, Visi',
  },
  Fire: {
    name: 'Api',
    char: '火',
    pinyin: 'Huǒ',
    color: 'text-rose-700',
    fill: '#DC2626',
    stroke: '#B91C1C',
    organ: 'Jantung & Usus Kecil',
    emotion: 'Antusiasme vs Kegelisahan',
    nature: 'Karisma, Ketenaran, Transformasi',
  },
  Earth: {
    name: 'Tanah',
    char: '土',
    pinyin: 'Tǔ',
    color: 'text-amber-800',
    fill: '#D97706',
    stroke: '#B45309',
    organ: 'Lambung & Limpa',
    emotion: 'Kepercayaan vs Kekhawatiran',
    nature: 'Stabilitas, Fondasi, Kesabaran',
  },
  Metal: {
    name: 'Logam',
    char: '金',
    pinyin: 'Jīn',
    color: 'text-slate-700',
    fill: '#475569',
    stroke: '#334155',
    organ: 'Paru-paru & Usus Besar',
    emotion: 'Keadilan vs Kesedihan',
    nature: 'Ketegasan, Disiplin, Presisi',
  },
  Water: {
    name: 'Air',
    char: '水',
    pinyin: 'Shuǐ',
    color: 'text-sky-700',
    fill: '#0284C7',
    stroke: '#0369A1',
    organ: 'Ginjal & Kandung Kemih',
    emotion: 'Kebijaksanaan vs Ketakutan',
    nature: 'Kecerdasan, Aliran, Adaptasi',
  },
};

// Node coordinates on a circle of radius 110 centered at (150, 150)
const NODE_POSITIONS: Record<ElementType, { x: number; y: number }> = {
  Fire: { x: 150, y: 40 },
  Earth: { x: 255, y: 115 },
  Metal: { x: 215, y: 240 },
  Water: { x: 85, y: 240 },
  Wood: { x: 45, y: 115 },
};

// All 10 Wu Xing Interactions
const INTERACTIONS: ElementInteraction[] = [
  // Generating Cycle (Sheng / 相生)
  {
    id: 'sheng-wood-fire',
    type: 'generate',
    source: 'Wood',
    target: 'Fire',
    sourceName: 'Kayu',
    targetName: 'Api',
    sourceChar: '木',
    targetChar: '火',
    chineseFormula: '木生火 (Mù Shēng Huǒ)',
    title: 'Kayu Melahirkan Api',
    nature: 'Melahirkan (Sheng)',
    description: 'Kayu kering dan pepohonan menjadi bahan bakar utama yang memantik serta membesarkan kobaran api.',
    baziImpact: 'Kreativitas & Output (Shi/Shang): Ide, visi, dan bakat internal (Kayu) diekspresikan menjadi ketenaran, karisma, dan karya publik (Api).',
    isLine: false,
    d: `M ${NODE_POSITIONS.Wood.x + 10} ${NODE_POSITIONS.Wood.y - 15} Q 100 45 ${NODE_POSITIONS.Fire.x - 20} ${NODE_POSITIONS.Fire.y}`,
    midX: 100,
    midY: 45,
  },
  {
    id: 'sheng-fire-earth',
    type: 'generate',
    source: 'Fire',
    target: 'Earth',
    sourceName: 'Api',
    targetName: 'Tanah',
    sourceChar: '火',
    targetChar: '土',
    chineseFormula: '火生土 (Huǒ Shēng Tǔ)',
    title: 'Api Melahirkan Tanah',
    nature: 'Melahirkan (Sheng)',
    description: 'Api membakar materi menjadi abu vulkanik dan humus yang menyuburkan serta menambah lapisan tanah bumi.',
    baziImpact: 'Konsolidasi & Aset Nyata: Semangat membara dan karya intelektual (Api) diendapkan menjadi aset nyata, fondasi keluarga, dan kestabilan finansial (Tanah).',
    isLine: false,
    d: `M ${NODE_POSITIONS.Fire.x + 20} ${NODE_POSITIONS.Fire.y} Q 220 55 ${NODE_POSITIONS.Earth.x} ${NODE_POSITIONS.Earth.y - 15}`,
    midX: 220,
    midY: 55,
  },
  {
    id: 'sheng-earth-metal',
    type: 'generate',
    source: 'Earth',
    target: 'Metal',
    sourceName: 'Tanah',
    targetName: 'Logam',
    sourceChar: '土',
    targetChar: '金',
    chineseFormula: '土生金 (Tǔ Shēng Jīn)',
    title: 'Tanah Melahirkan Logam',
    nature: 'Melahirkan (Sheng)',
    description: 'Di dalam perut bumi dan kedalaman batuan pegunungan, bijih mineral keras dan logam mulia terkristalisasi seiring waktu.',
    baziImpact: 'Ketekunan Menghasilkan Nilai: Kesabaran, reliabilitas, dan konsistensi (Tanah) melahirkan ketegasan eksekusi, disiplin tinggi, dan prestise berharga (Logam).',
    isLine: false,
    d: `M ${NODE_POSITIONS.Earth.x} ${NODE_POSITIONS.Earth.y + 20} Q 260 190 ${NODE_POSITIONS.Metal.x + 15} ${NODE_POSITIONS.Metal.y}`,
    midX: 250,
    midY: 175,
  },
  {
    id: 'sheng-metal-water',
    type: 'generate',
    source: 'Metal',
    target: 'Water',
    sourceName: 'Logam',
    targetName: 'Air',
    sourceChar: '金',
    targetChar: '水',
    chineseFormula: '金生水 (Jīn Shēng Shuǐ)',
    title: 'Logam Melahirkan Air',
    nature: 'Melahirkan (Sheng)',
    description: 'Permukaan logam dingin mengembunkan udara menjadi tetesan air murni; logam juga berperan sebagai wadah saluran air bersih.',
    baziImpact: 'Kejernihan Logika Membuahkan Kebijaksanaan: Struktur berpikir yang rapi dan objektif (Logam) menghasilkan intuisi tajam, fleksibilitas bergaul, dan aliran rezeki tak terbatas (Air).',
    isLine: false,
    d: `M ${NODE_POSITIONS.Metal.x - 20} ${NODE_POSITIONS.Metal.y + 10} Q 150 270 ${NODE_POSITIONS.Water.x + 20} ${NODE_POSITIONS.Water.y + 10}`,
    midX: 150,
    midY: 260,
  },
  {
    id: 'sheng-water-wood',
    type: 'generate',
    source: 'Water',
    target: 'Wood',
    sourceName: 'Air',
    targetName: 'Kayu',
    sourceChar: '水',
    targetChar: '木',
    chineseFormula: '水生木 (Shuǐ Shēng Mù)',
    title: 'Air Melahirkan Kayu',
    nature: 'Melahirkan (Sheng)',
    description: 'Air hujan dan sungai yang mengalir menyiram benih tanaman serta menyuburkan pepohonan hingga bertumbuh rindang dan kuat.',
    baziImpact: 'Penaung Vitalitas (Resource / Yin): Kebijaksanaan mendalam, riset batin, dan ketenangan jiwa (Air) menjadi penopang utama ekspansi karier dan pertumbuhan hidup (Kayu).',
    isLine: false,
    d: `M ${NODE_POSITIONS.Water.x - 15} ${NODE_POSITIONS.Water.y} Q 40 195 ${NODE_POSITIONS.Wood.x} ${NODE_POSITIONS.Wood.y + 20}`,
    midX: 50,
    midY: 180,
  },

  // Controlling Cycle (Ke / 相克)
  {
    id: 'ke-wood-earth',
    type: 'control',
    source: 'Wood',
    target: 'Earth',
    sourceName: 'Kayu',
    targetName: 'Tanah',
    sourceChar: '木',
    targetChar: '土',
    chineseFormula: '木克土 (Mù Kè Tǔ)',
    title: 'Kayu Mengontrol Tanah',
    nature: 'Mengontrol (Ke)',
    description: 'Akar pepohonan menembus, mencengkeram, dan memecah lapisan tanah yang padat untuk menyerap nutrisi.',
    baziImpact: 'Penguasaan Rezeki (Wealth / Cai): Bagi Day Master Kayu, Tanah adalah Harta. Inisiatif kepemimpinan dan pertumbuhan menaklukkan sumber daya materi.',
    isLine: true,
    x1: NODE_POSITIONS.Wood.x,
    y1: NODE_POSITIONS.Wood.y,
    x2: NODE_POSITIONS.Earth.x,
    y2: NODE_POSITIONS.Earth.y,
    midX: 150,
    midY: 115,
  },
  {
    id: 'ke-earth-water',
    type: 'control',
    source: 'Earth',
    target: 'Water',
    sourceName: 'Tanah',
    targetName: 'Air',
    sourceChar: '土',
    targetChar: '水',
    chineseFormula: '土克水 (Tǔ Kè Shuǐ)',
    title: 'Tanah Mengontrol Air',
    nature: 'Mengontrol (Ke)',
    description: 'Tanggul tanah, pematang sawah, dan bendungan membatasi, menyerap, serta mengarahkan aliran arus air.',
    baziImpact: 'Regulasi & Fokus: Tanah memberikan batasan disiplin pada emosi dan gagasan liar (Air), mengubah potensi banjir menjadi bendungan energi produktif.',
    isLine: true,
    x1: NODE_POSITIONS.Earth.x,
    y1: NODE_POSITIONS.Earth.y,
    x2: NODE_POSITIONS.Water.x,
    y2: NODE_POSITIONS.Water.y,
    midX: 170,
    midY: 177,
  },
  {
    id: 'ke-water-fire',
    type: 'control',
    source: 'Water',
    target: 'Fire',
    sourceName: 'Air',
    targetName: 'Api',
    sourceChar: '水',
    targetChar: '火',
    chineseFormula: '水克火 (Shuǐ Kè Huǒ)',
    title: 'Air Mengontrol Api',
    nature: 'Mengontrol (Ke)',
    description: 'Curahan air dapat meredam dan memadamkan kobaran api yang berkobar tak terkendali.',
    baziImpact: 'Keseimbangan Emosional: Ketenangan batin dan logika mendinginkan ego, amarah berlebih, dan impulsivitas, mencegah burnout profesional.',
    isLine: true,
    x1: NODE_POSITIONS.Water.x,
    y1: NODE_POSITIONS.Water.y,
    x2: NODE_POSITIONS.Fire.x,
    y2: NODE_POSITIONS.Fire.y,
    midX: 117,
    midY: 140,
  },
  {
    id: 'ke-fire-metal',
    type: 'control',
    source: 'Fire',
    target: 'Metal',
    sourceName: 'Api',
    targetName: 'Logam',
    sourceChar: '火',
    targetChar: '金',
    chineseFormula: '火克金 (Huǒ Kè Jīn)',
    title: 'Api Mengontrol Logam',
    nature: 'Mengontrol (Ke)',
    description: 'Suhu panas api yang tinggi mampu melelehkan bijih besi dan menempa logam mentah menjadi pedang bermutu.',
    baziImpact: 'Penempaan Karakter & Otoritas (Officer / Guan): Tekanan tanggung jawab kepemimpinan membentuk integritas, keberanian, dan kehormatan sejati.',
    isLine: true,
    x1: NODE_POSITIONS.Fire.x,
    y1: NODE_POSITIONS.Fire.y,
    x2: NODE_POSITIONS.Metal.x,
    y2: NODE_POSITIONS.Metal.y,
    midX: 182,
    midY: 140,
  },
  {
    id: 'ke-metal-wood',
    type: 'control',
    source: 'Metal',
    target: 'Wood',
    sourceName: 'Logam',
    targetName: 'Kayu',
    sourceChar: '金',
    targetChar: '木',
    chineseFormula: '金克木 (Jīn Kè Mù)',
    title: 'Logam Mengontrol Kayu',
    nature: 'Mengontrol (Ke)',
    description: 'Kapak baja, gergaji, dan pisau memotong, memangkas, dan memahat batang kayu yang tumbuh liar.',
    baziImpact: 'Disiplin & Efisiensi: Batasan yang tegas dan manajemen waktu memangkas distorsi yang tidak bernilai, membuat fokus hidup terarah pada tujuan utama.',
    isLine: true,
    x1: NODE_POSITIONS.Metal.x,
    y1: NODE_POSITIONS.Metal.y,
    x2: NODE_POSITIONS.Wood.x,
    y2: NODE_POSITIONS.Wood.y,
    midX: 130,
    midY: 177,
  },
];

export interface SelectedRelationInsight {
  role: string;
  badge: string;
  text: string;
  colorBadge: string;
}

export const getInteractionRelationWithSelected = (
  interaction: ElementInteraction,
  currentElement: ElementType
): SelectedRelationInsight => {
  if (interaction.source === currentElement && interaction.target === currentElement) {
    return {
      role: 'Elemen Mandiri',
      badge: 'Energi Sejenis',
      text: `Ini adalah elemen yang sama dengan elemen terpilih Anda (${ELEMENT_INFO[currentElement].name}).`,
      colorBadge: 'bg-slate-100 text-slate-800 border-slate-300',
    };
  }

  if (interaction.source === currentElement) {
    if (interaction.type === 'generate') {
      return {
        role: 'Output / Ekspresi Kreatif (Shi Shen / Shang Guan)',
        badge: 'Energi Yang Dikeluarkan',
        text: `Elemen terpilih Anda (${ELEMENT_INFO[currentElement].name}) mengalirkan energinya untuk melahirkan ${interaction.targetName}. Dalam BaZi, ini merepresentasikan karya, bakat berekspresi, kecerdasan terapan, dan daya tarik publik.`,
        colorBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      };
    } else {
      return {
        role: 'Harta & Penguasaan Sumber Daya (Zheng Cai / Pian Cai)',
        badge: 'Energi Yang Dikontrol (Rezeki)',
        text: `Elemen terpilih Anda (${ELEMENT_INFO[currentElement].name}) menaklukkan dan mengendalikan ${interaction.targetName}. Dalam BaZi, elemen yang Anda kontrol adalah lambang Harta / Rezeki (Cai) dan kapasitas manajerial Anda.`,
        colorBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      };
    }
  } else if (interaction.target === currentElement) {
    if (interaction.type === 'generate') {
      return {
        role: 'Penaung / Sumber Daya Batin (Zheng Yin / Pian Yin)',
        badge: 'Energi Penopang (Resource)',
        text: `${interaction.sourceName} melahirkan dan memberi makan langsung elemen terpilih Anda (${ELEMENT_INFO[currentElement].name}). Ini adalah elemen Penopang hidup (Resource) yang memberikan kebijaksanaan, perlindungan, dan kenyamanan batin.`,
        colorBadge: 'bg-sky-100 text-sky-900 border-sky-300',
      };
    } else {
      return {
        role: 'Otoritas & Disiplin (Zheng Guan / Qi Sha)',
        badge: 'Energi Pembina / Pengontrol',
        text: `${interaction.sourceName} mengendalikan dan membatasi elemen terpilih Anda (${ELEMENT_INFO[currentElement].name}). Ini menuntut disiplin tinggi, integritas kepemimpinan, kepatuhan sistem, dan kesabaran saat menghadapi tekanan.`,
        colorBadge: 'bg-rose-100 text-rose-900 border-rose-300',
      };
    }
  } else {
    return {
      role: 'Aliran Penyeimbang Kosmik',
      badge: 'Sirkulasi Eksternal',
      text: `Interaksi antara ${interaction.sourceName} dan ${interaction.targetName} membentuk sirkulasi pendukung dalam ekosistem bagan Wu Xing Anda, menjaga agar chi tidak macet.`,
      colorBadge: 'bg-slate-100 text-slate-700 border-slate-200',
    };
  }
};

export const FiveElementsCycle: React.FC<FiveElementsCycleProps> = ({ chart }) => {
  const [selectedElement, setSelectedElement] = useState<ElementType>(
    chart.luckyElements.primaryYongShen
  );
  const [chartViewMode, setChartViewMode] = useState<'radar' | 'cycle'>('radar');
  const [hoveredInteraction, setHoveredInteraction] = useState<ElementInteraction | null>(null);
  const [pinnedInteraction, setPinnedInteraction] = useState<ElementInteraction | null>(null);

  const elementsOrder: ElementType[] = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const info = ELEMENT_INFO[selectedElement];
  const percent = chart.elementDistribution[selectedElement];

  const activeInteraction = hoveredInteraction || pinnedInteraction;
  const selectedRelation = activeInteraction
    ? getInteractionRelationWithSelected(activeInteraction, selectedElement)
    : null;

  const handleInteractionClick = (interaction: ElementInteraction) => {
    if (pinnedInteraction?.id === interaction.id) {
      setPinnedInteraction(null);
    } else {
      setPinnedInteraction(interaction);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 flex-wrap">
            <span>Keseimbangan Lima Elemen (Wu Xing 五行)</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
              by PENGGILAS
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">
              D3.js
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Eksplorasi distribusi kekuatan dan hukum interaksi Melahirkan (Sheng) & Mengontrol (Ke).
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setChartViewMode('radar')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              chartViewMode === 'radar'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Diagram Radar D3 (Spider)
          </button>
          <button
            onClick={() => setChartViewMode('cycle')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              chartViewMode === 'cycle'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Siklus Aliran (Sheng & Ke)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Left Stage: Radar Chart or Circular Cycle */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${chart.birthDate}_${chart.birthTime}_${chart.gender}_${chartViewMode}`}
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center"
            >
              {chartViewMode === 'radar' ? (
                <WuXingRadarChart chart={chart} />
              ) : (
                <div className="flex flex-col items-center w-full">
              {/* Legend with interactive hint */}
              <div className="w-full flex items-center justify-between pb-2 text-[11px]">
                <span className="text-slate-500 text-[10px] font-medium">
                  Arahkan kursor ke panah untuk detail
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <span className="w-2.5 h-0.5 bg-amber-600 inline-block"></span> Sheng (Melahirkan)
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <span className="w-2.5 h-0.5 bg-rose-600 border-t border-dashed border-rose-600 inline-block"></span> Ke (Mengontrol)
                  </span>
                </div>
              </div>

              {/* SVG Canvas Container */}
              <div className="relative w-[300px] h-[300px]">
                <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                  <defs>
                    {/* Normal Markers */}
                    <marker
                      id="arrow-sheng"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 8 5 L 0 9 z" fill="#D97706" />
                    </marker>
                    <marker
                      id="arrow-ke"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="4"
                      markerHeight="4"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 8 5 L 0 9 z" fill="#E11D48" />
                    </marker>

                    {/* Active Hover Glow Markers */}
                    <marker
                      id="arrow-sheng-active"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#B45309" />
                    </marker>
                    <marker
                      id="arrow-ke-active"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#BE123C" />
                    </marker>

                    {/* Light Glow filter */}
                    <filter id="arrow-glow-light" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. Controlling Cycle Lines (Ke) */}
                  {INTERACTIONS.filter((i) => i.type === 'control').map((item) => {
                    const isActive = activeInteraction?.id === item.id;
                    return (
                      <g
                        key={item.id}
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredInteraction(item)}
                        onMouseLeave={() => setHoveredInteraction(null)}
                        onClick={() => handleInteractionClick(item)}
                      >
                        {/* Hidden thick hit-area line for easy hover */}
                        <line
                          x1={item.x1}
                          y1={item.y1}
                          x2={item.x2}
                          y2={item.y2}
                          stroke="transparent"
                          strokeWidth="16"
                          pointerEvents="stroke"
                        />

                        {/* Visible Line */}
                        <line
                          x1={item.x1}
                          y1={item.y1}
                          x2={item.x2}
                          y2={item.y2}
                          stroke={isActive ? '#BE123C' : '#E11D48'}
                          strokeWidth={isActive ? 3.2 : 1.5}
                          strokeDasharray={isActive ? 'none' : '4 3'}
                          markerEnd={isActive ? 'url(#arrow-ke-active)' : 'url(#arrow-ke)'}
                          opacity={isActive ? 1 : 0.55}
                          filter={isActive ? 'url(#arrow-glow-light)' : undefined}
                          className="transition-all duration-200"
                        />
                      </g>
                    );
                  })}

                  {/* 2. Generating Cycle Paths (Sheng) */}
                  {INTERACTIONS.filter((i) => i.type === 'generate').map((item) => {
                    const isActive = activeInteraction?.id === item.id;
                    return (
                      <g
                        key={item.id}
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredInteraction(item)}
                        onMouseLeave={() => setHoveredInteraction(null)}
                        onClick={() => handleInteractionClick(item)}
                      >
                        {/* Hidden thick hit-area path for easy hover */}
                        <path
                          d={item.d}
                          fill="none"
                          stroke="transparent"
                          strokeWidth="18"
                          pointerEvents="stroke"
                        />

                        {/* Visible Curved Path */}
                        <path
                          d={item.d}
                          fill="none"
                          stroke={isActive ? '#B45309' : '#D97706'}
                          strokeWidth={isActive ? 3.2 : 1.6}
                          markerEnd={isActive ? 'url(#arrow-sheng-active)' : 'url(#arrow-sheng)'}
                          opacity={isActive ? 1 : 0.8}
                          filter={isActive ? 'url(#arrow-glow-light)' : undefined}
                          className="transition-all duration-200"
                        />
                      </g>
                    );
                  })}

                  {/* 3. Element Interactive Nodes */}
                  {elementsOrder.map((elem) => {
                    const pos = NODE_POSITIONS[elem];
                    const elemData = ELEMENT_INFO[elem];
                    const isSelected = selectedElement === elem;
                    const isDayMaster = chart.dayMaster.element === elem;
                    const isLucky = chart.luckyElements.primaryYongShen === elem;

                    const isSourceInActive = activeInteraction?.source === elem;
                    const isTargetInActive = activeInteraction?.target === elem;

                    return (
                      <g
                        key={elem}
                        className="cursor-pointer transition-transform hover:scale-105"
                        onClick={() => setSelectedElement(elem)}
                      >
                        {/* Ring for DayMaster / Lucky */}
                        {isLucky && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="30"
                            fill="none"
                            stroke="#D97706"
                            strokeWidth="2"
                            strokeDasharray="3 2"
                            opacity="0.9"
                          />
                        )}
                        {isDayMaster && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="33"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="1.8"
                            opacity="0.85"
                          />
                        )}

                        {/* Highlight ring if part of active interaction */}
                        {(isSourceInActive || isTargetInActive) && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="28"
                            fill="none"
                            stroke={isSourceInActive ? '#D97706' : '#0284C7'}
                            strokeWidth="2.2"
                            className="animate-pulse"
                          />
                        )}

                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="24"
                          fill={elemData.fill}
                          stroke="#FFFFFF"
                          strokeWidth="2.2"
                          className="transition-all shadow-sm"
                        />
                        <text
                          x={pos.x}
                          y={pos.y - 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFFFFF"
                          fontSize="14"
                          fontWeight="bold"
                          fontFamily="'Noto Serif TC', serif"
                        >
                          {elemData.char}
                        </text>
                        <text
                          x={pos.x}
                          y={pos.y + 13}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFFFFF"
                          fontSize="9"
                          fontWeight="700"
                        >
                          {elemData.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Tooltip inside SVG Canvas */}
                {activeInteraction && (
                  <div
                    className="absolute pointer-events-none z-20 transition-all duration-150"
                    style={{
                      left: `${Math.min(Math.max(activeInteraction.midX - 95, 8), 110)}px`,
                      top: `${Math.min(Math.max(activeInteraction.midY - 55, 8), 190)}px`,
                    }}
                  >
                    <div className="bg-white/95 border border-slate-200/90 rounded-xl p-3 shadow-xl backdrop-blur-md max-w-[225px] text-left animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-slate-100 text-[10px]">
                        <span
                          className={`font-bold px-1.5 py-0.5 rounded ${
                            activeInteraction.type === 'generate'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}
                        >
                          {activeInteraction.type === 'generate' ? '● Melahirkan (Sheng)' : '▲ Mengontrol (Ke)'}
                        </span>
                        <span className="font-serif text-slate-800 font-bold">
                          {activeInteraction.sourceChar} ➔ {activeInteraction.targetChar}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-slate-900 mt-1.5">
                        {activeInteraction.chineseFormula}
                      </div>

                      {selectedRelation && (
                        <div className="mt-1 text-[9.5px] font-semibold text-amber-800 bg-amber-50/80 px-1.5 py-0.5 rounded border border-amber-200/70">
                          {selectedRelation.badge}
                        </div>
                      )}

                      <p className="text-[10px] text-slate-600 mt-1 leading-snug line-clamp-3">
                        {activeInteraction.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Interactive Interaction Card */}
              <div className="w-full mt-3 min-h-[110px] p-3.5 rounded-xl border border-slate-200 bg-slate-50/90 text-xs text-slate-700 transition-all shadow-2xs">
                {activeInteraction ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            activeInteraction.type === 'generate'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}
                        >
                          Hukum {activeInteraction.nature}
                        </span>
                        <span className="font-bold text-slate-900 text-xs">
                          {activeInteraction.chineseFormula}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {pinnedInteraction ? (
                          <button
                            onClick={() => setPinnedInteraction(null)}
                            className="text-[10px] text-amber-800 font-semibold hover:underline cursor-pointer"
                          >
                            Lepas Pin ✕
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400">Klik panah untuk pin</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-800 leading-relaxed">
                      {activeInteraction.description}
                    </p>

                    {/* Contextual relation with currently selected element */}
                    {selectedRelation && (
                      <div className={`p-2 rounded-lg border text-[11px] leading-relaxed ${selectedRelation.colorBadge}`}>
                        <div className="font-bold flex items-center gap-1.5 mb-0.5">
                          <span>⚡ Kaitannya dengan Elemen Terpilih ({ELEMENT_INFO[selectedElement].name}):</span>
                          <span className="font-semibold underline underline-offset-2">{selectedRelation.role}</span>
                        </div>
                        <p>{selectedRelation.text}</p>
                      </div>
                    )}

                    <div className="text-[11px] text-slate-600 leading-relaxed pt-1 border-t border-slate-200/60">
                      <strong className="text-amber-800">Dinamika BaZi: </strong>
                      {activeInteraction.baziImpact}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center text-center text-slate-500 space-y-1 py-1">
                    <span className="text-xs font-semibold text-slate-800">
                      Arahkan kursor atau klik panah untuk melihat interaksi Sheng & Ke
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Pelajari relasi hukum Melahirkan (Kayu ➔ Api ➔ Tanah ➔ Logam ➔ Air) dan Mengontrol (Kayu ➔ Tanah ➔ Air ➔ Api ➔ Logam) serta pengaruhnya terhadap elemen terpilih Anda.
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>

        {/* Right side: Detailed Breakdown & Percentage Bars */}
        <div className="lg:col-span-7 space-y-6">
          {/* Distribution Bars */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              Distribusi Kekuatan Elemen dalam Bagan (Skor Tertimbang)
            </span>
            <div className="space-y-2">
              {elementsOrder.map((elem) => {
                const elemData = ELEMENT_INFO[elem];
                const p = chart.elementDistribution[elem];
                const isDayMaster = chart.dayMaster.element === elem;
                const isLucky = chart.luckyElements.primaryYongShen === elem;

                return (
                  <div
                    key={elem}
                    onClick={() => setSelectedElement(elem)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedElement === elem
                        ? 'border-amber-400 bg-amber-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${elemData.color}`}>
                          {elemData.char} {elemData.name} ({elemData.pinyin})
                        </span>
                        {isDayMaster && (
                          <span className="text-[10px] text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 font-semibold">
                            Day Master
                          </span>
                        )}
                        {isLucky && (
                          <span className="text-[10px] text-amber-900 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-300 font-semibold">
                            Elemen Penolong (Yong Shen)
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-slate-800 tabular-nums font-bold">
                        {p}%
                      </span>
                    </div>

                    {/* Progress Track with Motion Animated Fill */}
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: elemData.fill }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(p, 4)}%` }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Element Insight Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <span className="text-xl font-serif font-bold text-slate-900">{info.char}</span>
                <span className="text-sm font-bold text-slate-800">
                  Elemen {info.name} ({percent}%)
                </span>
              </div>
              <span className="text-xs font-mono font-medium text-slate-500">
                {percent >= 30 ? 'Dominan / Berlimpah' : percent <= 12 ? 'Kurang / Defisit' : 'Sedang / Cukup'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Karakter Alam:</span>
                <span className="text-slate-800 font-semibold">{info.nature}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Organ Tubuh (TCM):</span>
                <span className="text-slate-800 font-semibold">{info.organ}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Sifat Emosi:</span>
                <span className="text-slate-800 font-semibold">{info.emotion}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
