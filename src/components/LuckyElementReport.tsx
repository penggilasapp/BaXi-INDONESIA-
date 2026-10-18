import React from 'react';
import { BaZiChart, ElementType } from '../types/bazi';
import { ExportPdfButton } from './ExportPdfButton';

interface LuckyElementReportProps {
  chart: BaZiChart;
}

const ELEMENT_LABELS: Record<ElementType, { name: string; char: string; color: string; bg: string }> = {
  Wood: { name: 'Kayu', char: '木 (Mù)', color: 'text-emerald-800', bg: 'bg-emerald-50/90 border-emerald-300' },
  Fire: { name: 'Api', char: '火 (Huǒ)', color: 'text-rose-800', bg: 'bg-rose-50/90 border-rose-300' },
  Earth: { name: 'Tanah', char: '土 (Tǔ)', color: 'text-amber-900', bg: 'bg-amber-50/90 border-amber-300' },
  Metal: { name: 'Logam', char: '金 (Jīn)', color: 'text-slate-800', bg: 'bg-slate-100/90 border-slate-300' },
  Water: { name: 'Air', char: '水 (Shuǐ)', color: 'text-sky-800', bg: 'bg-sky-50/90 border-sky-300' },
};

export const LuckyElementReport: React.FC<LuckyElementReportProps> = ({ chart }) => {
  const yongShen = ELEMENT_LABELS[chart.luckyElements.primaryYongShen];
  const xiShen = ELEMENT_LABELS[chart.luckyElements.secondaryXiShen];
  const jiShen = ELEMENT_LABELS[chart.luckyElements.unfavorableJiShen];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Laporan Analisis Elemen Keberuntungan {chart.personName ? `· ${chart.personName}` : ''} (Yong Shen 用神)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Prinsip metafisika klasik Tiongkok untuk menyeimbangkan dinamika Chi dan membuka aliran rezeki.
          </p>
        </div>
        <ExportPdfButton chart={chart} variant="primary" label="Simpan sebagai PDF" />
      </div>

      {/* Primary Hero Cards: Yong Shen & Xi Shen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Yong Shen */}
        <div className={`p-5 rounded-xl border ${yongShen.bg} relative overflow-hidden flex flex-col justify-between shadow-2xs`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Elemen Penolong Utama
              </span>
              <span className="text-xs font-mono font-semibold text-amber-900">Yong Shen (用神)</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {yongShen.name} <span className="font-serif text-lg font-normal text-amber-800">{yongShen.char}</span>
            </div>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              Kunci utama harmonisasi bagan. Elemen ini yang paling efektif membuka peluang karier, relasi menguntungkan, dan kesehatan prima.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-200 text-[11px] text-amber-900 font-semibold">
            Prioritas tertinggi dalam warna, arah, dan dekorasi lingkungan.
          </div>
        </div>

        {/* Xi Shen */}
        <div className={`p-5 rounded-xl border ${xiShen.bg} relative overflow-hidden flex flex-col justify-between shadow-2xs`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                Elemen Pendukung Favorit
              </span>
              <span className="text-xs font-mono font-semibold text-sky-900">Xi Shen (喜神)</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {xiShen.name} <span className="font-serif text-lg font-normal text-sky-800">{xiShen.char}</span>
            </div>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              Melahirkan atau memperkuat elemen penolong. Berfungsi menjaga stabilitas ketika terjadi benturan tahunan (Chong) atau masa transisi.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sky-200 text-[11px] text-sky-900 font-semibold">
            Sangat baik dikombinasikan dengan elemen utama dalam busana.
          </div>
        </div>

        {/* Ji Shen */}
        <div className={`p-5 rounded-xl border ${jiShen.bg} relative overflow-hidden flex flex-col justify-between shadow-2xs`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                Elemen Tantangan / Dibatasi
              </span>
              <span className="text-xs font-mono font-semibold text-rose-900">Ji Shen (忌神)</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {jiShen.name} <span className="font-serif text-lg font-normal text-rose-800">{jiShen.char}</span>
            </div>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              Elemen yang jika berlebihan dapat menekan Day Master atau merusak elemen penolong. Tidak perlu ditakuti, cukup dikelola secara proporsional.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-rose-200 text-[11px] text-rose-900 font-semibold">
            Hindari dominasi warna ini di kamar tidur atau ruang kerja utama.
          </div>
        </div>
      </div>

      {/* Rationale & Diagnosis Section */}
      <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-4 shadow-2xs">
        <h4 className="text-sm font-bold text-slate-900">
          Metodologi & Alasan Penentuan (Diagnosis BaZi)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-600">
              <span>Status Kekuatan Day Master:</span>
              <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {chart.dayMasterStrength.level} ({chart.dayMasterStrength.score}% Dukungan)
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Dukungan Musim (De Ling):</span>
              <span className={chart.dayMasterStrength.isSupportedBySeason ? 'text-emerald-700 font-semibold' : 'text-slate-600'}>
                {chart.dayMasterStrength.isSupportedBySeason ? 'Mendapat Musim (De Ling)' : 'Tidak Mendapat Musim (Shi Ling)'}
              </span>
            </div>
            <div className="text-slate-600">
              <span>Iklim Musim Lahir: </span>
              <span className="text-slate-800 font-medium">{chart.dayMasterStrength.seasonSummary}</span>
            </div>
          </div>

          <div className="text-slate-700 leading-relaxed border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
            <p>{chart.luckyElements.rationale}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
