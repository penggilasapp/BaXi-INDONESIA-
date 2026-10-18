import React, { useState } from 'react';
import { ElementRecommendations } from '../types/bazi';

interface ActionableRecommendationsProps {
  recommendations: ElementRecommendations;
}

export const ActionableRecommendations: React.FC<ActionableRecommendationsProps> = ({
  recommendations,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'colors' | 'fengshui' | 'careers' | 'lifestyle' | 'crystals'
  >('colors');

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Panduan Aksi Nyata Elemen Keberuntungan: {recommendations.element} ({recommendations.chineseName})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Aplikasi konkret dalam keseharian untuk mengaktifkan medan energi positif dan kelimpahan rezeki.
          </p>
        </div>

        {/* Category Segmented Control (Interactive Filter Buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto max-w-full scrollbar-thin w-full sm:w-auto">
          {[
            { id: 'colors', label: 'Warna & Busana', icon: '🎨' },
            { id: 'fengshui', label: 'Arah & Ruang Kerja', icon: '🧭' },
            { id: 'careers', label: 'Karier & Bisnis', icon: '💼' },
            { id: 'lifestyle', label: 'Kebiasaan & Nutrisi', icon: '🍵' },
            { id: 'crystals', label: 'Kristal & Ornamen', icon: '💎' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 active:scale-[0.98] ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span className="text-xs">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on Active Category */}
      {activeCategory === 'colors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.colors.map((c, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-8 h-8 rounded-lg shadow-sm border border-slate-300 inline-block shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">{c.name}</span>
                      <span className="text-[11px] font-mono text-slate-500 font-medium">{c.hex}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.advice}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-slate-800 space-y-2 shadow-2xs">
            <span className="font-bold text-amber-900 block">Saran Aplikasi Fashion:</span>
            <p className="text-slate-700">
              Gunakan warna-warna ini pada pakaian kerja saat menghadiri pertemuan bisnis krusial, wawancara kerja, menandatangani kontrak, atau sebagai warna dompet/tas utama Anda.
            </p>
          </div>
        </div>
      )}

      {activeCategory === 'fengshui' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Arah Mata Angin Keberuntungan
              </span>
              <ul className="space-y-2">
                {recommendations.luckyDirections.map((dir, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">›</span>
                    <span className="font-medium">{dir}</span>
                  </li>
                ))}
              </ul>
              <span className="text-[11px] text-slate-500 block pt-2 border-t border-slate-200">
                Posisikan meja kerja menghadap ke arah ini atau gunakan saat bepergian dinas.
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 block">
                Tata Letak Sektor Ruangan Rumah / Kantor
              </span>
              <ul className="space-y-2">
                {recommendations.bestRoomSectors.map((sector, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-sky-600 font-bold">›</span>
                    <span className="font-medium">{sector}</span>
                  </li>
                ))}
              </ul>
              <span className="text-[11px] text-slate-500 block pt-2 border-t border-slate-200">
                Pastikan sektor ini selalu bersih, memiliki pencahayaan memadai, dan bebas dari barang menumpuk.
              </span>
            </div>
          </div>
        </div>
      )}

      {activeCategory === 'careers' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 font-medium">
            Bidang karier dan sektor industri yang paling selaras dengan elemen {recommendations.element}, mempermudah Anda mencapai pengakuan dan akumulasi finansial:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recommendations.careers.map((career, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center gap-3 text-xs text-slate-800 font-semibold shadow-2xs"
              >
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-mono text-[10px] flex items-center justify-center shrink-0 border border-amber-300 font-bold">
                  {i + 1}
                </span>
                <span>{career}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeCategory === 'lifestyle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Kebiasaan Harian Penguat Energi
            </span>
            <ul className="space-y-2.5">
              {recommendations.dailyHabits.map((habit, i) => (
                <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{habit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Nutrisi & Makanan Selaras (TCM)
            </span>
            <ul className="space-y-2.5">
              {recommendations.nutritionAndFoods.map((food, i) => (
                <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>{food}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              Menjaga asupan gizi yang mendukung organ utama elemen Anda sangat krusial untuk kestabilan fokus jangka panjang.
            </div>
          </div>
        </div>
      )}

      {activeCategory === 'crystals' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recommendations.gemstonesAndCrystals.map((gem, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-center shadow-2xs"
              >
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  {gem}
                </span>
                <span className="text-[10px] text-slate-500">
                  Gelang / Liontin / Kristal Meja
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 text-xs text-slate-800 space-y-2 shadow-2xs">
            <span className="font-bold text-rose-900 block">Faktor yang Sebaiknya Dihindari:</span>
            <ul className="space-y-1">
              {recommendations.avoidFactors.map((af, i) => (
                <li key={i} className="flex items-start gap-2 text-rose-800">
                  <span className="text-rose-600 font-bold">×</span>
                  <span>{af}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
