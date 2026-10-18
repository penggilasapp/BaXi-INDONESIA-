import React from 'react';
import { BaZiChart, ElementType, Pillar } from '../types/bazi';
import { ExportPdfButton } from './ExportPdfButton';

interface FourPillarsViewProps {
  chart: BaZiChart;
}

const ELEMENT_COLORS: Record<ElementType, { bg: string; text: string; border: string; charColor: string; label: string }> = {
  Wood: { bg: 'bg-emerald-50/80', text: 'text-emerald-700', border: 'border-emerald-200', charColor: 'text-emerald-950', label: 'Kayu (木)' },
  Fire: { bg: 'bg-rose-50/80', text: 'text-rose-700', border: 'border-rose-200', charColor: 'text-rose-950', label: 'Api (火)' },
  Earth: { bg: 'bg-amber-50/80', text: 'text-amber-800', border: 'border-amber-200', charColor: 'text-amber-950', label: 'Tanah (土)' },
  Metal: { bg: 'bg-slate-100/90', text: 'text-slate-700', border: 'border-slate-200', charColor: 'text-slate-900', label: 'Logam (金)' },
  Water: { bg: 'bg-sky-50/80', text: 'text-sky-700', border: 'border-sky-200', charColor: 'text-sky-950', label: 'Air (水)' },
};

export const FourPillarsView: React.FC<FourPillarsViewProps> = ({ chart }) => {
  const pillars: { key: string; title: string; subtitle: string; pillar: Pillar; isDayMaster?: boolean }[] = [
    {
      key: 'hour',
      title: 'Pilar Jam (时柱)',
      subtitle: 'Anak · Masa Depan · Cita-cita',
      pillar: chart.hourPillar,
    },
    {
      key: 'day',
      title: 'Pilar Hari (日柱)',
      subtitle: 'Diri Inti (Day Master) · Pasangan',
      pillar: chart.dayPillar,
      isDayMaster: true,
    },
    {
      key: 'month',
      title: 'Pilar Bulan (月柱)',
      subtitle: 'Orang Tua · Karier · Musim',
      pillar: chart.monthPillar,
    },
    {
      key: 'year',
      title: 'Pilar Tahun (年柱)',
      subtitle: 'Leluhur · Citra Sosial · Lingkup Luar',
      pillar: chart.yearPillar,
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {chart.personName ? `Bagan Empat Pilar: ${chart.personName}` : 'Bagan Empat Pilar (BaZi Chart)'}
            </h3>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
              PENGGILAS
            </span>
            {chart.timezone && (
              <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                {chart.timezone}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Lahir: {chart.birthDate} pukul {chart.birthTime} ({chart.gender === 'male' ? 'Pria' : 'Wanita'}) · Musim {chart.solarTermName}
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
            <span>Day Master:</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {chart.dayMaster.nameId} ({chart.dayMaster.char})
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-medium text-slate-700">{chart.dayMasterStrength.level}</span>
          </div>

          <ExportPdfButton chart={chart} variant="primary" />
        </div>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6">
        {pillars.map((item) => {
          const stemColor = ELEMENT_COLORS[item.pillar.stem.element];
          const branchColor = ELEMENT_COLORS[item.pillar.branch.element];

          return (
            <div
              key={item.key}
              className={`rounded-xl border p-3 sm:p-4 flex flex-col justify-between transition-all ${
                item.isDayMaster
                  ? 'border-amber-300 bg-amber-50/30 shadow-xs'
                  : 'border-slate-200/80 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              {/* Header */}
              <div className="text-center pb-3 border-b border-slate-200/60">
                <span className="text-sm font-bold text-slate-900 block">{item.title}</span>
                <span className="text-xs text-slate-500 block mt-0.5">{item.subtitle}</span>
              </div>

              {/* Ten God of Stem */}
              <div className="py-2 text-center">
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    item.isDayMaster ? 'text-amber-800 font-bold bg-amber-100/70 px-2 py-0.5 rounded' : 'text-slate-700'
                  }`}
                >
                  {item.pillar.tenGod}
                </span>
              </div>

              {/* Heavenly Stem (Tian Gan) */}
              <div className={`p-4 rounded-xl border text-center my-1.5 ${stemColor.bg} ${stemColor.border} shadow-2xs`}>
                <div className={`text-3xl sm:text-4xl font-serif font-bold mb-1 ${stemColor.charColor}`}>
                  {item.pillar.stem.char}
                </div>
                <div className={`text-xs sm:text-sm font-bold ${stemColor.text}`}>
                  {item.pillar.stem.pinyin} ({stemColor.label})
                </div>
                <div className="text-xs text-slate-600 mt-0.5 font-semibold">
                  {item.pillar.stem.polarity}
                </div>
              </div>

              {/* Earthly Branch (Di Zhi) */}
              <div className={`p-4 rounded-xl border text-center my-1.5 ${branchColor.bg} ${branchColor.border} shadow-2xs`}>
                <div className={`text-3xl sm:text-4xl font-serif font-bold mb-1 ${branchColor.charColor}`}>
                  {item.pillar.branch.char}
                </div>
                <div className={`text-xs sm:text-sm font-bold ${branchColor.text}`}>
                  {item.pillar.branch.pinyin} · Shio {item.pillar.branch.animal}
                </div>
                <div className="text-xs text-slate-600 mt-0.5 font-semibold">
                  {branchColor.label}
                </div>
              </div>

              {/* Hidden Stems (Cang Gan) */}
              <div className="pt-3 mt-2 border-t border-slate-200/60">
                <span className="text-xs font-bold text-slate-600 block mb-1.5 uppercase tracking-wider text-center">
                  Hidden Stems (Cang Gan)
                </span>
                <div className="space-y-1.5">
                  {item.pillar.branch.hiddenStems.map((hs, i) => {
                    const hsElemColor = ELEMENT_COLORS[hs.stem.element];
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs"
                      >
                        <span className="font-serif font-bold text-slate-900">
                          {hs.stem.char} <span className="font-sans font-normal text-xs text-slate-500">({hs.stem.pinyin})</span>
                        </span>
                        <span className={`text-xs font-bold ${hsElemColor.text}`}>
                          {hs.stem.nameId.split(' ')[0]} {Math.round(hs.weight * 100)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
