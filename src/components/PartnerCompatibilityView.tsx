import React, { useState, useMemo } from 'react';
import { BaZiChart, ElementType } from '../types/bazi';
import { calculateBaZiChart } from '../utils/baziCalculator';
import {
  calculatePartnerCompatibility,
  PartnerCompatibilityResult,
} from '../utils/partnerCompatibility';
import { exportPartnerCompatibilityToPdf } from '../utils/pdfExport';
import { getSavedProfiles, UserSavedProfile } from '../data/baziProfiles';

interface PartnerCompatibilityViewProps {
  initialChart: BaZiChart;
}

export const PartnerCompatibilityView: React.FC<PartnerCompatibilityViewProps> = ({
  initialChart,
}) => {
  // Partner 1 State (default from current active chart)
  const [p1Name, setP1Name] = useState<string>(initialChart.personName || 'Bagan Utama');
  const [p1Date, setP1Date] = useState<string>(initialChart.birthDate);
  const [p1Time, setP1Time] = useState<string>(initialChart.birthTime);
  const [p1Gender, setP1Gender] = useState<'male' | 'female'>(initialChart.gender);
  const [p1Timezone, setP1Timezone] = useState<string>(initialChart.timezone || 'WIB (UTC+7)');

  // Partner 2 State (default partner example)
  const [p2Name, setP2Name] = useState<string>('Pasangan');
  const [p2Date, setP2Date] = useState<string>('1992-09-18');
  const [p2Time, setP2Time] = useState<string>('14:15');
  const [p2Gender, setP2Gender] = useState<'male' | 'female'>('female');
  const [p2Timezone, setP2Timezone] = useState<string>('WIB (UTC+7)');

  // Profile selection dropdown state
  const [savedProfiles, setSavedProfiles] = useState<UserSavedProfile[]>([]);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved profiles from localStorage
  React.useEffect(() => {
    setSavedProfiles(getSavedProfiles());
  }, []);

  // Compute BaZi charts for both partners
  const chart1 = useMemo(() => {
    return calculateBaZiChart(p1Date, p1Time, p1Gender, p1Name, p1Timezone);
  }, [p1Date, p1Time, p1Gender, p1Name, p1Timezone]);

  const chart2 = useMemo(() => {
    return calculateBaZiChart(p2Date, p2Time, p2Gender, p2Name, p2Timezone);
  }, [p2Date, p2Time, p2Gender, p2Name, p2Timezone]);

  // Compute deep partner compatibility
  const compatibilityResult: PartnerCompatibilityResult = useMemo(() => {
    return calculatePartnerCompatibility(chart1, chart2);
  }, [chart1, chart2]);

  // Handle swapping partners
  const handleSwapPartners = () => {
    const tempName = p1Name;
    const tempDate = p1Date;
    const tempTime = p1Time;
    const tempGender = p1Gender;
    const tempTimezone = p1Timezone;

    setP1Name(p2Name);
    setP1Date(p2Date);
    setP1Time(p2Time);
    setP1Gender(p2Gender);
    setP1Timezone(p2Timezone);

    setP2Name(tempName);
    setP2Date(tempDate);
    setP2Time(tempTime);
    setP2Gender(tempGender);
    setP2Timezone(tempTimezone);

    showToast('Posisi pasangan berhasil ditukar');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle PDF Export
  const handleExportCompatibilityPdf = () => {
    try {
      setIsExportingPdf(true);
      exportPartnerCompatibilityToPdf(chart1, chart2, compatibilityResult);
      showToast('Laporan Kecocokan berhasil diunduh sebagai PDF!');
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const loadProfileInto = (target: 'p1' | 'p2', profile: UserSavedProfile) => {
    if (target === 'p1') {
      setP1Name(profile.name);
      setP1Date(profile.birthDate);
      setP1Time(profile.birthTime);
      setP1Gender(profile.gender);
      setP1Timezone(profile.timezone);
    } else {
      setP2Name(profile.name);
      setP2Date(profile.birthDate);
      setP2Time(profile.birthTime);
      setP2Gender(profile.gender);
      setP2Timezone(profile.timezone);
    }
    showToast(`Profil "${profile.name}" dimuat ke Pasangan ${target === 'p1' ? '1' : '2'}`);
  };

  // Color mapping for score
  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (score >= 70) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (score >= 60) return 'bg-sky-100 text-sky-800 border-sky-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <span className="text-emerald-400">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header & Dual Action Controls */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-rose-100 text-rose-800 border border-rose-300">
                Fitur Baru
              </span>
              <span className="text-xs font-semibold text-slate-500">He Hun (合婚)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight mt-1">
              Partner Compatibility (Kecocokan Pasangan)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Bandingkan dua bagan BaZi secara mendalam untuk meninjau resonansi batin (Day Master), kemampuan saling menutrisi Elemen Penolong (Yong Shen), serta keharmonisan Istana Pasangan.
            </p>
          </div>

          {/* Action Buttons: Save PDF & Swap */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleSwapPartners}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-98"
              title="Tukar posisi pasangan 1 dan pasangan 2"
            >
              <span>⇄</span>
              <span>Tukar Posisi</span>
            </button>

            <button
              type="button"
              onClick={handleExportCompatibilityPdf}
              disabled={isExportingPdf}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <span>📄</span>
              <span>{isExportingPdf ? 'Menyusun Dokumen...' : 'Simpan sebagai PDF'}</span>
            </button>
          </div>
        </div>

        {/* Dual Input Panels: Partner 1 & Partner 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
          {/* Partner 1 Card */}
          <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Bagan Pertama (Anda)</h3>
              </div>

              {savedProfiles.length > 0 && (
                <div className="relative">
                  <select
                    onChange={(e) => {
                      const prof = savedProfiles.find((p) => p.id === e.target.value);
                      if (prof) loadProfileInto('p1', prof);
                    }}
                    value=""
                    className="text-[11px] font-medium bg-white text-slate-700 border border-slate-300 rounded-lg px-2 py-1 cursor-pointer focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="" disabled>
                      Pilih dari Profil Tersimpan
                    </option>
                    {savedProfiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.birthDate})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama / Label
                </label>
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  placeholder="Nama Lengkap / Panggilan"
                  className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={p1Date}
                    onChange={(e) => setP1Date(e.target.value)}
                    className="w-full text-xs sm:text-sm font-mono font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Jam Lahir
                  </label>
                  <input
                    type="time"
                    value={p1Time}
                    onChange={(e) => setP1Time(e.target.value)}
                    className="w-full text-xs sm:text-sm font-mono font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={p1Gender}
                    onChange={(e) => setP1Gender(e.target.value as 'male' | 'female')}
                    className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                  >
                    <option value="male">Pria (Laki-laki)</option>
                    <option value="female">Wanita (Perempuan)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Zona Waktu
                  </label>
                  <select
                    value={p1Timezone}
                    onChange={(e) => setP1Timezone(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                  >
                    <option value="WIB (UTC+7)">WIB (UTC+7)</option>
                    <option value="WITA (UTC+8)">WITA (UTC+8)</option>
                    <option value="WIT (UTC+9)">WIT (UTC+9)</option>
                    <option value="GMT/UTC">GMT / UTC</option>
                  </select>
                </div>
              </div>

              {/* Quick Summary Pill for Partner 1 */}
              <div className="pt-2 flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500">Day Master:</span>
                <span className="font-bold text-amber-800">
                  {chart1.dayMaster.char} · {chart1.dayMaster.nameId}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">Yong Shen:</span>
                <span className="font-bold text-emerald-700">
                  {chart1.luckyElements.primaryYongShen}
                </span>
              </div>
            </div>
          </div>

          {/* Partner 2 Card */}
          <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-sm">Bagan Kedua (Pasangan)</h3>
              </div>

              {savedProfiles.length > 0 && (
                <div className="relative">
                  <select
                    onChange={(e) => {
                      const prof = savedProfiles.find((p) => p.id === e.target.value);
                      if (prof) loadProfileInto('p2', prof);
                    }}
                    value=""
                    className="text-[11px] font-medium bg-white text-slate-700 border border-slate-300 rounded-lg px-2 py-1 cursor-pointer focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="" disabled>
                      Pilih dari Profil Tersimpan
                    </option>
                    {savedProfiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.birthDate})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama / Label
                </label>
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  placeholder="Nama Lengkap / Panggilan"
                  className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={p2Date}
                    onChange={(e) => setP2Date(e.target.value)}
                    className="w-full text-xs sm:text-sm font-mono font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Jam Lahir
                  </label>
                  <input
                    type="time"
                    value={p2Time}
                    onChange={(e) => setP2Time(e.target.value)}
                    className="w-full text-xs sm:text-sm font-mono font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    value={p2Gender}
                    onChange={(e) => setP2Gender(e.target.value as 'male' | 'female')}
                    className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                  >
                    <option value="female">Wanita (Perempuan)</option>
                    <option value="male">Pria (Laki-laki)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Zona Waktu
                  </label>
                  <select
                    value={p2Timezone}
                    onChange={(e) => setP2Timezone(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                  >
                    <option value="WIB (UTC+7)">WIB (UTC+7)</option>
                    <option value="WITA (UTC+8)">WITA (UTC+8)</option>
                    <option value="WIT (UTC+9)">WIT (UTC+9)</option>
                    <option value="GMT/UTC">GMT / UTC</option>
                  </select>
                </div>
              </div>

              {/* Quick Summary Pill for Partner 2 */}
              <div className="pt-2 flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500">Day Master:</span>
                <span className="font-bold text-amber-800">
                  {chart2.dayMaster.char} · {chart2.dayMaster.nameId}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">Yong Shen:</span>
                <span className="font-bold text-emerald-700">
                  {chart2.luckyElements.primaryYongShen}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OVERALL SCORE HERO CARD */}
      <div className="bg-gradient-to-br from-amber-500/10 via-white to-slate-50 rounded-2xl p-6 sm:p-8 border border-amber-200/90 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Circular Score Badge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white border-4 border-amber-400 shadow-md flex flex-col items-center justify-center p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kecocokan Energi
              </span>
              <span className="text-4xl sm:text-5xl font-black font-serif text-slate-900 leading-none my-1">
                {compatibilityResult.overallScore}%
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getScoreBadgeColor(
                  compatibilityResult.overallScore
                )}`}
              >
                {compatibilityResult.tier}
              </span>
            </div>
          </div>

          {/* Core Summary Description */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-amber-600 font-extrabold text-xl">八字合婚</span>
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
                Diagnosis Metafisika Pasangan
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {compatibilityResult.summary}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white/95 p-4 rounded-xl border border-emerald-200 shadow-2xs">
                <span className="text-xs sm:text-sm font-bold text-emerald-900 flex items-center gap-1.5 mb-1.5">
                  <span>✦</span> Kekuatan Hubungan:
                </span>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
                  {compatibilityResult.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/95 p-4 rounded-xl border border-amber-200 shadow-2xs">
                <span className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5 mb-1.5">
                  <span>⚡</span> Penyelarasan Sadar:
                </span>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
                  {compatibilityResult.challenges.map((ch, i) => (
                    <li key={i}>{ch}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 CORE DIAGNOSTIC TILES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tile 1: Day Master (Batin & Jiwa) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-lg">☯</span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  1. Resonansi Batin (Day Master)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Skor: {compatibilityResult.dayMasterSynergy.score} / 35
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="text-center flex-1">
                  <span className="text-xs font-semibold text-slate-500 block">{p1Name}</span>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    <span className="font-serif text-xl sm:text-2xl text-amber-700 mr-1.5">{chart1.dayMaster.char}</span>
                    <span>{chart1.dayMaster.nameId}</span>
                  </div>
                </div>
                <span className="px-3 font-bold text-lg text-amber-600">⇄</span>
                <div className="text-center flex-1">
                  <span className="text-xs font-semibold text-slate-500 block">{p2Name}</span>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    <span className="font-serif text-xl sm:text-2xl text-amber-700 mr-1.5">{chart2.dayMaster.char}</span>
                    <span>{chart2.dayMaster.nameId}</span>
                  </div>
                </div>
              </div>

              {compatibilityResult.dayMasterSynergy.combinationTitle && (
                <div className="bg-emerald-50 text-emerald-950 text-xs sm:text-sm font-bold p-3 rounded-xl border border-emerald-300 flex items-center gap-2">
                  <span>✨</span>
                  <span>{compatibilityResult.dayMasterSynergy.combinationTitle}</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {compatibilityResult.dayMasterSynergy.description}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-xs text-slate-500 italic">
            Hubungan Batang Langit Hari mencerminkan kedekatan jiwa dan pemahaman tanpa kata di antara pasangan.
          </div>
        </div>

        {/* Tile 2: Yong Shen (Saling Menutrisi Keberuntungan) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌿</span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  2. Saling Menutrisi Hoki (Yong Shen 用神)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                Skor: {compatibilityResult.yongShenSynergy.score} / 35
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-xs font-semibold text-slate-500 block">Kebutuhan {p1Name}:</span>
                  <strong className="text-slate-900 text-sm">
                    Yong Shen: {chart1.luckyElements.primaryYongShen}
                  </strong>
                  <div className="text-xs text-slate-700 mt-1">
                    Tersedia di {p2Name}:{' '}
                    <strong className="text-emerald-700 font-bold">
                      {chart2.elementDistribution[chart1.luckyElements.primaryYongShen] || 0}%
                    </strong>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-xs font-semibold text-slate-500 block">Kebutuhan {p2Name}:</span>
                  <strong className="text-slate-900 text-sm">
                    Yong Shen: {chart2.luckyElements.primaryYongShen}
                  </strong>
                  <div className="text-xs text-slate-700 mt-1">
                    Tersedia di {p1Name}:{' '}
                    <strong className="text-emerald-700 font-bold">
                      {chart1.elementDistribution[chart2.luckyElements.primaryYongShen] || 0}%
                    </strong>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {compatibilityResult.yongShenSynergy.description}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-xs sm:text-sm text-slate-800 font-medium bg-amber-50/80 p-3 rounded-xl border border-amber-200 leading-relaxed">
            💡 {compatibilityResult.yongShenSynergy.recommendation}
          </div>
        </div>

        {/* Tile 3: Spouse Palace (Istana Pasangan / Cabang Hari) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏡</span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  3. Istana Rumah Tangga (Ri Zhi 日支)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                Skor: {compatibilityResult.spousePalaceSynergy.score} / 20
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="text-center flex-1">
                  <span className="text-xs font-semibold text-slate-500 block">Istana {p1Name}</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    <span className="font-serif text-lg text-purple-700 mr-1">{chart1.dayPillar.branch.char}</span>
                    <span>{chart1.dayPillar.branch.animal}</span>
                  </span>
                </div>
                <span className="text-xs font-bold text-purple-700 px-2 bg-purple-50 py-1 rounded border border-purple-200">
                  {compatibilityResult.spousePalaceSynergy.relationName}
                </span>
                <div className="text-center flex-1">
                  <span className="text-xs font-semibold text-slate-500 block">Istana {p2Name}</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    <span className="font-serif text-lg text-purple-700 mr-1">{chart2.dayPillar.branch.char}</span>
                    <span>{chart2.dayPillar.branch.animal}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {compatibilityResult.spousePalaceSynergy.description}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-xs text-slate-600 font-medium">
            Shio Tahun: {chart1.yearPillar.branch.animal} vs {chart2.yearPillar.branch.animal} ({compatibilityResult.yearBranchSynergy.relationName})
          </div>
        </div>

        {/* Tile 4: Wu Xing Combined Balance */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  4. Keseimbangan Elemen Gabungan
                </h4>
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Wu Xing</span>
            </div>

            <div className="mt-4 space-y-2">
              {([
                { name: 'Kayu (Wood)', key: 'Wood' as ElementType, color: 'bg-emerald-500' },
                { name: 'Api (Fire)', key: 'Fire' as ElementType, color: 'bg-rose-500' },
                { name: 'Tanah (Earth)', key: 'Earth' as ElementType, color: 'bg-amber-600' },
                { name: 'Logam (Metal)', key: 'Metal' as ElementType, color: 'bg-slate-400' },
                { name: 'Air (Water)', key: 'Water' as ElementType, color: 'bg-blue-500' },
              ] as const).map((item) => {
                const pct = compatibilityResult.combinedElementPercentages[item.key] || 0;
                return (
                  <div key={item.key} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-900 font-bold">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500">
            Perpaduan dua bagan menyelaraskan kekurangan elemen individu menjadi satu kesatuan yang lebih utuh.
          </div>
        </div>
      </div>

      {/* ACTIONABLE HARMONIZATION GUIDE */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 text-base">
              Panduan Praktis Harmonisasi Energi Berdua
            </h4>
            <p className="text-xs text-slate-500">
              Rekomendasi feng shui, warna bersama, dan gaya komunikasi untuk melipatgandakan rezeki serta kedamaian rumah tangga.
            </p>
          </div>

          {/* Quick PDF download button */}
          <button
            type="button"
            onClick={handleExportCompatibilityPdf}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <span>📄</span>
            <span>Unduh Laporan Lengkap (PDF)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>🎨</span> Warna Harmoni Bersama:
            </span>
            <p className="text-xs sm:text-sm text-slate-800 font-semibold">
              {compatibilityResult.harmonizationTips.sharedColors.join(', ')}
            </p>
            <span className="text-xs text-slate-500 block pt-1 leading-normal">
              Kenakan saat menghadiri acara penting bersama atau jadikan sebagai warna aksen interior ruang tinggal.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>🧭</span> Arah Feng Shui Kamar:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {compatibilityResult.harmonizationTips.fengShuiAdvice}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>💬</span> Dinamika Komunikasi:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {compatibilityResult.harmonizationTips.communicationAdvice}
            </p>
          </div>
        </div>

        {/* Joint Activities */}
        <div className="pt-2">
          <span className="text-xs sm:text-sm font-bold text-slate-900 block mb-2">
            Aktivitas Bersama Penguat Resonansi Hoki:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {compatibilityResult.harmonizationTips.jointActivities.map((act, idx) => (
              <div
                key={idx}
                className="text-xs sm:text-sm text-slate-800 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 flex items-start gap-2.5 leading-relaxed"
              >
                <span className="text-amber-700 font-bold shrink-0">0{idx + 1}.</span>
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
