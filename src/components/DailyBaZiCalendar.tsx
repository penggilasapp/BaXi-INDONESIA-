import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BaZiChart, ElementType } from '../types/bazi';
import { ExportPdfButton } from './ExportPdfButton';
import {
  DailyBaZiEnergy,
  getDailyBaZiEnergy,
  getDailyBaZiWeekStrip,
} from '../utils/dailyBazi';

interface DailyBaZiCalendarProps {
  chart: BaZiChart;
}

const ELEMENT_BADGES: Record<
  ElementType,
  { bg: string; text: string; border: string; char: string; name: string }
> = {
  Wood: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', char: '木', name: 'Kayu' },
  Fire: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', char: '火', name: 'Api' },
  Earth: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300', char: '土', name: 'Tanah' },
  Metal: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300', char: '金', name: 'Logam' },
  Water: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-300', char: '水', name: 'Air' },
};

export const DailyBaZiCalendar: React.FC<DailyBaZiCalendarProps> = ({ chart }) => {
  // Default to today's local date
  const todayStr = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Compute daily energy for the selected date
  const dailyEnergy: DailyBaZiEnergy = useMemo(() => {
    return getDailyBaZiEnergy(selectedDate, chart);
  }, [selectedDate, chart]);

  // Compute 7-day strip around selected date
  const weekStrip = useMemo(() => {
    return getDailyBaZiWeekStrip(selectedDate, chart, 7);
  }, [selectedDate, chart]);

  const handleStepDay = (step: number) => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + step);
    const newY = dateObj.getFullYear();
    const newM = String(dateObj.getMonth() + 1).padStart(2, '0');
    const newD = String(dateObj.getDate()).padStart(2, '0');
    setSelectedDate(`${newY}-${newM}-${newD}`);
  };

  const dayStemElem = ELEMENT_BADGES[dailyEnergy.dayPillar.stem.element];
  const dayBranchElem = ELEMENT_BADGES[dailyEnergy.dayPillar.branch.element];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Kalender Harian BaZi & Aliran Chi
            </h3>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
              by PENGGILAS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Analisis pengaruh elemen pilar hari ini terhadap Day Master{' '}
            {chart.personName && (
              <span className="font-bold text-slate-800">{chart.personName} · </span>
            )}
            <strong className="text-amber-800 font-semibold">
              {chart.dayMaster.nameId} ({chart.dayMaster.char})
            </strong>{' '}
            dan panduan praktis memanfaatkan momentum harian.
          </p>
        </div>

        {/* Quick Date Stepper & Picker (Responsive for touch) */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleStepDay(-1)}
            className="px-3.5 py-2 rounded-xl border border-slate-300/80 bg-white hover:bg-slate-50 active:bg-slate-100 text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
            title="Hari Sebelumnya"
          >
            ← Kemarin
          </button>
          <button
            type="button"
            onClick={() => setSelectedDate(todayStr)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-[0.98] ${
              selectedDate === todayStr
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs font-bold'
                : 'bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300/80 text-slate-700 shadow-2xs'
            }`}
          >
            Hari Ini
          </button>
          <button
            type="button"
            onClick={() => handleStepDay(1)}
            className="px-3.5 py-2 rounded-xl border border-slate-300/80 bg-white hover:bg-slate-50 active:bg-slate-100 text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
            title="Hari Berikutnya"
          >
            Besok →
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:bg-white focus:border-amber-500 transition-all cursor-pointer"
          />

          <ExportPdfButton chart={chart} variant="primary" label="Simpan sebagai PDF" />
        </div>
      </div>

      {/* 7-Day Interactive Date Strip (Smooth touch swipe on mobile, grid on desktop) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 block">
            Pilih Tanggal dalam Pekan Ini:
          </span>
          <span className="text-[10px] text-slate-400 sm:hidden">
            ← Geser jari untuk melihat hari lain →
          </span>
        </div>
        <div className="flex sm:grid sm:grid-cols-7 gap-2 overflow-x-auto pb-2 scrollbar-thin snap-x">
          {weekStrip.map((item) => {
            const isSelected = item.dateStr === selectedDate;
            const stemBadge = ELEMENT_BADGES[item.dayPillar.stem.element];
            return (
              <button
                key={item.dateStr}
                onClick={() => setSelectedDate(item.dateStr)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between shrink-0 min-w-[76px] sm:min-w-0 snap-center ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/30'
                    : item.isYongShenDay
                    ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-[10px] font-medium text-slate-500 uppercase">
                  {item.dayOfWeek.slice(0, 3)}
                </span>
                <span className="text-base font-bold text-slate-900 my-0.5">
                  {item.dateStr.split('-')[2]}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-serif font-bold text-slate-800">
                    {item.dayPillar.combinedChar}
                  </span>
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-bold ${stemBadge.bg} ${stemBadge.text}`}
                  >
                    {stemBadge.char}
                  </span>
                </div>
                {item.isYongShenDay ? (
                  <span className="text-[9px] text-amber-700 font-bold mt-1">
                    ★ Emas
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-400 mt-1">
                    {'★'.repeat(item.luckStars)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Animated Energy Board */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Hero Banner: Date, Day Pillar, and Overall Rating */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative overflow-hidden shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: Date & Pillar Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-900 text-sm">
                    {dailyEnergy.dayOfWeek}, {dailyEnergy.formattedDate}
                  </span>
                  {dailyEnergy.isToday && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px]">
                      Hari Ini
                    </span>
                  )}
                </div>

                {/* Pillar 8-char highlight */}
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                    <div className="text-3xl font-serif font-bold text-slate-900">
                      {dailyEnergy.dayPillar.combinedChar}
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">
                      {dailyEnergy.dayPillar.combinedPinyin}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-bold border ${dayStemElem.bg} ${dayStemElem.text} ${dayStemElem.border}`}
                      >
                        Batang: {dayStemElem.name} ({dailyEnergy.dayPillar.stem.polarity})
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-bold border ${dayBranchElem.bg} ${dayBranchElem.text} ${dayBranchElem.border}`}
                      >
                        Cabang: {dailyEnergy.dayPillar.branch.animal} ({dayBranchElem.name})
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      <strong>Melodi Na Yin: </strong>
                      <span className="font-medium text-slate-800">
                        {dailyEnergy.dayPillar.naYin}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Compatibility Rating Badge & PENGGILAS Seal */}
              <div className="flex flex-col items-start lg:items-end justify-center space-y-2 lg:text-right">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md overflow-hidden border border-amber-300 shadow-2xs shrink-0">
                    <img
                      src="/src/assets/images/penggilas_bazi_logo_1792257210556.jpg"
                      alt="PENGGILAS Seal"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500 text-lg">
                    {'★'.repeat(dailyEnergy.luckStars)}
                    <span className="text-slate-300">
                      {'★'.repeat(5 - dailyEnergy.luckStars)}
                    </span>
                    <span className="text-xs font-bold text-slate-700 font-mono ml-1">
                      ({dailyEnergy.luckScore}/100)
                    </span>
                  </div>
                </div>

                <div
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                    dailyEnergy.luckScore >= 80
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : dailyEnergy.luckScore >= 60
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  {dailyEnergy.overallRatingLabel}
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  {dailyEnergy.isYongShenDay && (
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                      ✓ Membawa Yong Shen Anda
                    </span>
                  )}
                  {dailyEnergy.isXiShenDay && (
                    <span className="text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">
                      ✓ Elemen Pendukung (Xi Shen)
                    </span>
                  )}
                  {dailyEnergy.isJiShenDay && (
                    <span className="text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">
                      ⚠ Elemen Tantangan (Ji Shen)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ten Gods Influence on User's Day Master */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <h4 className="text-sm font-bold text-slate-900">
                  Resonansi Day Master Anda Hari Ini: {dailyEnergy.tenGodName}
                </h4>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                Tema: {dailyEnergy.energyTheme}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {dailyEnergy.detailedInfluence}
            </p>

            {/* Clash / Harmony Notice if applicable */}
            {dailyEnergy.branchInteractionNote && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                  dailyEnergy.clashWithDayBranch || dailyEnergy.clashWithYearBranch
                    ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                }`}
              >
                <span className="text-base shrink-0">
                  {dailyEnergy.clashWithDayBranch || dailyEnergy.clashWithYearBranch
                    ? '⚡'
                    : '✨'}
                </span>
                <div>
                  <strong>Interaksi Cabang Bumi (Shio): </strong>
                  {dailyEnergy.branchInteractionNote}
                </div>
              </div>
            )}
          </div>

          {/* Actionable Recommendations: Do's, Don'ts & Color/Affirmation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Do's: Disarankan */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 pb-2 border-b border-emerald-200/60">
                <span>✓ Aktivitas Sangat Disarankan Hari Ini</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {dailyEnergy.recommendedActions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">●</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts: Hindari */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900 pb-2 border-b border-rose-200/60">
                <span>✕ Hal Yang Sebaiknya Dihindari / Diwaspadai</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {dailyEnergy.avoidActions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">▲</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Auspicious Hourly Timings (12 Double-Hours) */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                <h4 className="text-sm font-bold text-slate-900">
                  Panduan Jam Hoki Hari Ini (12 Shi Chen / 双时辰)
                </h4>
              </div>
              <span className="text-[11px] text-slate-500">
                Pilih jam berlabel ★ Emas untuk eksekusi krusial
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {dailyEnergy.luckyHours.map((h, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    h.isAuspicious
                      ? 'border-amber-400 bg-amber-50/80 shadow-2xs'
                      : h.note.includes('Benturan')
                      ? 'border-rose-200 bg-rose-50/50 text-rose-900'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <span className="text-[10px] font-mono font-semibold text-slate-500 block">
                    {h.timeRange}
                  </span>
                  <div className="text-sm font-serif font-bold text-slate-900 my-0.5">
                    {h.stemChar}{h.branchName} ({h.animal})
                  </div>
                  <span
                    className={`text-[9.5px] font-bold block ${
                      h.isAuspicious
                        ? 'text-amber-800'
                        : h.note.includes('Benturan')
                        ? 'text-rose-800'
                        : 'text-slate-500'
                    }`}
                  >
                    {h.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Balancing Color & Personal Affirmation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Color Recommendation */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center gap-3.5 shadow-2xs">
              <div
                className="w-12 h-12 rounded-xl shadow-xs border border-white shrink-0"
                style={{ backgroundColor: dailyEnergy.luckyColorHex }}
              />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Warna Busana Penyeimbang
                </span>
                <div className="text-sm font-bold text-slate-900">
                  {dailyEnergy.luckyColorName}
                </div>
                <p className="text-[10px] text-slate-500">
                  Perkuat aura keberuntungan dan redam kelelahan Chi.
                </p>
              </div>
            </div>

            {/* Mindset Affirmation */}
            <div className="md:col-span-2 p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex flex-col justify-center space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                Afirmasi Mindset Hari Ini
              </span>
              <p className="text-xs font-semibold text-slate-800 italic leading-relaxed">
                "{dailyEnergy.dailyAffirmation}"
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
