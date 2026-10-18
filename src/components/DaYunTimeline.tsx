import React, { useState } from 'react';
import { BaZiChart, DaYunCycle } from '../types/bazi';
import { ExportPdfButton } from './ExportPdfButton';

interface DaYunTimelineProps {
  chart: BaZiChart;
}

export const DaYunTimeline: React.FC<DaYunTimelineProps> = ({ chart }) => {
  const [selectedCycle, setSelectedCycle] = useState<DaYunCycle>(chart.daYunList[2] || chart.daYunList[0]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Pilar Keberuntungan 10 Tahunan (Da Yun / 大运)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Perjalanan siklus energi hidup Anda tiap dekade. Periode emas terjadi ketika Da Yun membawa elemen Yong Shen.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-xs text-slate-600 font-medium">
            Arah Da Yun: <span className="text-amber-800 font-bold">{chart.gender === 'male' ? 'Pria' : 'Wanita'} ({chart.yearPillar.stem.polarity} Year)</span>
          </div>
          <ExportPdfButton chart={chart} variant="primary" label="Simpan sebagai PDF" />
        </div>
      </div>

      {/* Da Yun Horizontal Timeline */}
      <div className="space-y-1">
        <span className="text-[10px] text-slate-400 sm:hidden block">
          ← Geser jari untuk melihat siklus usia berikutnya →
        </span>
        <div className="overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex gap-2.5 sm:gap-3 min-w-[650px]">
          {chart.daYunList.map((cycle, i) => {
            const isSelected = selectedCycle.ageStart === cycle.ageStart;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedCycle(cycle)}
                className={`flex-1 p-3.5 rounded-xl border text-center transition-all cursor-pointer active:scale-[0.98] ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 shadow-xs ring-2 ring-amber-400/30 font-semibold'
                    : cycle.isFavorable
                    ? 'border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <span className="text-[11px] font-mono font-semibold text-slate-500 block mb-1">
                  Usia {cycle.ageStart} - {cycle.ageEnd}
                </span>

                <div className="text-2xl font-serif font-bold text-slate-900 my-1">
                  {cycle.pillar.stem.char}
                  {cycle.pillar.branch.char}
                </div>

                <div className="text-xs font-bold text-slate-700">
                  {cycle.pillar.stem.pinyin} {cycle.pillar.branch.pinyin}
                </div>

                <div className="mt-2 text-[10px]">
                  {cycle.isFavorable ? (
                    <span className="text-emerald-700 font-bold">★ Mendukung</span>
                  ) : (
                    <span className="text-slate-400 font-medium">Konsolidasi</span>
                  )}
                </div>
              </button>
            );
          })}
          </div>
        </div>
      </div>

      {/* Selected Cycle Detailed Focus */}
      {selectedCycle && (
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/90 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-2xs">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold block">
              Detail Siklus Terpilih
            </span>
            <div className="text-xl font-bold text-slate-900 mt-1">
              Usia {selectedCycle.ageStart} - {selectedCycle.ageEnd} Tahun
            </div>
            <div className="text-sm font-bold text-amber-800 mt-0.5">
              Tema: {selectedCycle.theme}
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div>
              <span className="text-slate-500">Pilar Langit & Bumi: </span>
              <span className="font-bold text-slate-900">
                {selectedCycle.pillar.stem.nameId} / {selectedCycle.pillar.branch.animal}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Ten God Utama: </span>
              <span className="font-semibold text-slate-800">
                {selectedCycle.pillar.tenGod}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Resonansi Elemen: </span>
              <span className="font-semibold text-slate-800">
                Elemen {selectedCycle.element}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
            <p>
              {selectedCycle.isFavorable
                ? 'Pada fase ini energi kosmik membawa elemen keberuntungan Anda. Sangat ideal untuk ekspansi bisnis, memulai usaha baru, atau membeli aset strategis.'
                : 'Fase ini memerlukan kewaspadaan dan manajemen risiko yang matang. Fokuskan pada peningkatan kompetensi, kesehatan keluarga, dan akumulasi cadangan kas.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
