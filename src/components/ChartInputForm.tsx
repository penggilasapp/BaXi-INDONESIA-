import React, { useState, useEffect } from 'react';
import { BaZiChart } from '../types/bazi';
import {
  UserSavedProfile,
  getSavedProfiles,
  saveProfile,
  deleteProfile,
} from '../data/baziProfiles';

interface ChartInputFormProps {
  personName: string;
  setPersonName: (name: string) => void;
  birthDate: string;
  setBirthDate: (date: string) => void;
  birthTime: string;
  setBirthTime: (time: string) => void;
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;
  timezone: string;
  setTimezone: (tz: string) => void;
  chart: BaZiChart;
  onOpenBackup?: () => void;
}

const DOUBLE_HOURS = [
  { value: '00:00', label: '23:00 - 00:59 (Jam Tikus / Zǐ 子)' },
  { value: '02:00', label: '01:00 - 02:59 (Jam Kerbau / Chǒu 丑)' },
  { value: '04:00', label: '03:00 - 04:59 (Jam Macan / Yín 寅)' },
  { value: '06:00', label: '05:00 - 06:59 (Jam Kelinci / Mǎo 卯)' },
  { value: '08:00', label: '07:00 - 08:59 (Jam Naga / Chén 辰)' },
  { value: '10:00', label: '09:00 - 10:59 (Jam Ular / Sì 巳)' },
  { value: '12:00', label: '11:00 - 12:59 (Jam Kuda / Wǔ 午)' },
  { value: '14:00', label: '13:00 - 14:59 (Jam Kambing / Wèi 未)' },
  { value: '16:00', label: '15:00 - 16:59 (Jam Monyet / Shēn 申)' },
  { value: '18:00', label: '17:00 - 18:59 (Jam Ayam / Yǒu 酉)' },
  { value: '20:00', label: '19:00 - 20:59 (Jam Anjing / Xū 戌)' },
  { value: '22:00', label: '21:00 - 22:59 (Jam Babi / Hài 亥)' },
];

const TIMEZONE_OPTIONS = [
  { value: 'WIB (UTC+7)', label: 'WIB (UTC+7) - Jakarta, Bandung, Surabaya, Medan' },
  { value: 'WITA (UTC+8)', label: 'WITA (UTC+8) - Bali, Makassar, Manado, Balikpapan' },
  { value: 'WIT (UTC+9)', label: 'WIT (UTC+9) - Jayapura, Ambon, Maluku' },
  { value: 'UTC+8 (SGT/HKT)', label: 'UTC+8 (SGT/HKT) - Singapura, Malaysia, Tiongkok' },
  { value: 'UTC+0 (GMT)', label: 'UTC+0 (GMT) - London / Standar Internasional' },
  { value: 'UTC-5 (EST)', label: 'UTC-5 (EST) - New York / Amerika Timur' },
  { value: 'UTC-8 (PST)', label: 'UTC-8 (PST) - Los Angeles / Amerika Pasifik' },
];

export const ChartInputForm: React.FC<ChartInputFormProps> = ({
  personName,
  setPersonName,
  birthDate,
  setBirthDate,
  birthTime,
  setBirthTime,
  gender,
  setGender,
  timezone,
  setTimezone,
  chart,
  onOpenBackup,
}) => {
  const [savedProfiles, setSavedProfiles] = useState<UserSavedProfile[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveNameInput, setSaveNameInput] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);

  // Load saved profiles on mount
  useEffect(() => {
    setSavedProfiles(getSavedProfiles());
  }, []);

  // Quick Action: Set real-time current date & time
  const handleSetCurrentTime = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    setBirthDate(`${yyyy}-${mm}-${dd}`);
    setBirthTime(`${hh}:${min}`);
    if (!personName) {
      setPersonName('Bagan Waktu Saat Ini');
    }
  };

  // Quick Action: Save profile to localStorage
  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = (saveNameInput || personName || 'Bagan Saya').trim();
    if (!trimmed) return;

    const saved = saveProfile({
      name: trimmed,
      birthDate,
      birthTime,
      gender,
      timezone,
    });

    setPersonName(trimmed);
    setSavedProfiles(getSavedProfiles());
    setIsSaving(false);
    setSaveNameInput('');
  };

  // Quick Action: Load a saved profile
  const handleSelectSavedProfile = (profile: UserSavedProfile) => {
    setPersonName(profile.name);
    setBirthDate(profile.birthDate);
    setBirthTime(profile.birthTime);
    setGender(profile.gender);
    if (profile.timezone) setTimezone(profile.timezone);
  };

  // Quick Action: Delete a saved profile
  const handleDeleteSavedProfile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteProfile(id);
    setSavedProfiles(updated);
  };

  // Quick Action: Copy BaZi Summary
  const handleCopySummary = async () => {
    const summary = [
      `=== RINGKASAN BAGAN BAZI (EMPAT PILAR TAKDIR) ===`,
      `Aplikasi: BaZi by PENGGILAS`,
      `Nama Pemilik: ${personName || 'Pengguna'}`,
      `Tanggal Lahir: ${birthDate} | Jam: ${birthTime} (${timezone})`,
      `Jenis Kelamin: ${gender === 'male' ? 'Pria (Nan 乾)' : 'Wanita (Nv 坤)'}`,
      `Day Master: ${chart.dayMaster.nameId} (${chart.dayMaster.char} ${chart.dayMaster.pinyin})`,
      `Karakter Utama: ${chart.dayMaster.archetype}`,
      `Kekuatan Day Master: ${chart.dayMasterStrength.level} (${chart.dayMasterStrength.score}%)`,
      `Elemen Penolong (Yong Shen): ${chart.luckyElements.primaryYongShen}`,
      `Elemen Pendukung (Xi Shen): ${chart.luckyElements.secondaryXiShen}`,
      `Pilar Tahun: ${chart.yearPillar.stem.nameId} / ${chart.yearPillar.branch.animal}`,
      `Pilar Bulan: ${chart.monthPillar.stem.nameId} / ${chart.monthPillar.branch.animal} (Musim ${chart.solarTermName})`,
      `Pilar Hari: ${chart.dayPillar.stem.nameId} / ${chart.dayPillar.branch.animal}`,
      `Pilar Jam: ${chart.hourPillar.stem.nameId} / ${chart.hourPillar.branch.animal}`,
      `Distribusi Lima Elemen: Kayu ${chart.elementDistribution.Wood}%, Api ${chart.elementDistribution.Fire}%, Tanah ${chart.elementDistribution.Earth}%, Logam ${chart.elementDistribution.Metal}%, Air ${chart.elementDistribution.Water}%`,
      `================================================`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    } catch {
      // Fallback
      console.warn('Gagal menyalin ringkasan ke clipboard');
    }
  };

  // Print chart
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6">
      {/* Top Header & Real-World Utility Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Kalkulator Empat Pilar Takdir (BaZi)
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
              by PENGGILAS
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sistem Nyata & Presisi
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Masukkan data kelahiran nyata Anda untuk menghitung 8 Karakter, Day Master, dan Elemen Penolong (Yong Shen) secara akurat.
          </p>
        </div>

        {/* Real App Actions: Current Time, Save Profile, Copy, Print */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSetCurrentTime}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-900 border border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-[0.98]"
            title="Gunakan waktu sekarang untuk melihat peta BaZi saat ini"
          >
            <span>⚡</span>
            <span>Waktu Sekarang</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSaveNameInput(personName || '');
              setIsSaving(true);
            }}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-300/80 transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
            title="Simpan profil bagan ini ke penyimpanan lokal perangkat Anda"
          >
            <span>💾</span>
            <span>Simpan Profil</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-2xs"
            title="Salin ringkasan analisis BaZi ke clipboard"
          >
            <span>📋</span>
            <span>{copiedToast ? 'Tersalin!' : 'Salin Ringkasan'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-2xs"
            title="Cetak atau simpan sebagai file PDF"
          >
            <span>🖨️</span>
            <span>Cetak / PDF</span>
          </button>

          {onOpenBackup && (
            <button
              type="button"
              onClick={onOpenBackup}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
              title="Pusat cadangan: Unduh seluruh data ke file JSON atau pulihkan data"
            >
              <span>📦</span>
              <span>Ekspor Semua Data</span>
            </button>
          )}
        </div>
      </div>

      {/* Save Profile Inline Modal / Box */}
      {isSaving && (
        <form
          onSubmit={handleSaveProfileSubmit}
          className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 flex flex-col sm:flex-row items-center gap-3 animate-in fade-in"
        >
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-amber-950 mb-1">
              Beri Nama Profil Bagan Ini
            </label>
            <input
              type="text"
              autoFocus
              value={saveNameInput}
              onChange={(e) => setSaveNameInput(e.target.value)}
              placeholder="Contoh: Bagan Pribadi, Pasangan, Klien A"
              className="w-full bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center mt-2 sm:mt-4 w-full sm:w-auto">
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white cursor-pointer shadow-xs"
            >
              Simpan ke Perangkat
            </button>
            <button
              type="button"
              onClick={() => setIsSaving(false)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Saved Profiles Strip (Genuine User Profiles, NO Dummy Celebrities) */}
      {savedProfiles.length > 0 && (
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span>👤 Profil Tersimpan Anda ({savedProfiles.length}):</span>
            </span>
            <span className="text-xs text-slate-600 font-medium">Klik profil untuk memuat otomatis</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {savedProfiles.map((p) => {
              const isSelected = personName === p.name && birthDate === p.birthDate;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectSavedProfile(p)}
                  className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="text-xs text-slate-500 font-mono">
                    ({p.birthDate})
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteSavedProfile(e, p.id)}
                    className="text-slate-400 hover:text-rose-600 text-sm ml-1.5 p-0.5 rounded cursor-pointer transition-colors"
                    title="Hapus profil tersimpan ini"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-2">
        {/* Profile Name / Label */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Nama / Label Profil (Opsional)
          </label>
          <input
            type="text"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            placeholder="Masukkan nama pemilik bagan..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
          />
          <span className="text-xs text-slate-500 mt-1 block">
            Nama akan dicantumkan pada ringkasan analisis dan cetakan PDF.
          </span>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Tanggal Lahir (Masehi / Solar)
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono font-medium transition-all"
            max="2035-12-31"
            min="1920-01-01"
          />
          <span className="text-xs text-slate-500 mt-1 block">
            Dikonversi otomatis ke batas pergantian musim Li Chun (~4 Feb).
          </span>
        </div>

        {/* Time of Birth */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Jam Lahir & 12 Shi Chen
          </label>
          <div className="flex gap-1.5">
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-24 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500 font-mono transition-all shrink-0"
            />
            <select
              value={
                DOUBLE_HOURS.find((h) => {
                  const hourNum = parseInt(birthTime.split(':')[0], 10);
                  const doubleHourIdx = Math.floor(((hourNum + 1) % 24) / 2);
                  return DOUBLE_HOURS[doubleHourIdx]?.value === h.value;
                })?.value || '12:00'
              }
              onChange={(e) => setBirthTime(e.target.value)}
              className="flex-1 min-w-0 bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-amber-500 transition-all cursor-pointer truncate"
            >
              {DOUBLE_HOURS.map((h) => (
                <option key={h.value} value={h.value}>
                  {h.label}
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Pilar Jam mewakili aspirasi, karier masa depan, dan anak.
          </span>
        </div>

        {/* Gender & Timezone */}
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Jenis Kelamin (Arah Da Yun)
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center active:scale-[0.98] ${
                  gender === 'male'
                    ? 'bg-amber-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Pria (Nan 乾)
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center active:scale-[0.98] ${
                  gender === 'female'
                    ? 'bg-amber-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Wanita (Nv 坤)
              </button>
            </div>
          </div>

          <div>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:bg-white focus:border-amber-500 transition-all cursor-pointer"
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary Submit / Scroll Pathway Bar */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Kalkulasi astronomis tersinkronisasi presisi dengan Kalender Hsia</span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('main-content-view');
              if (el) {
                const yOffset = -70;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>✦</span>
            <span>Eksplorasi Analisis Bagan BaZi</span>
            <span className="text-amber-200 text-sm">↓</span>
          </button>
        </div>
      </div>
    </div>
  );
};
