import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ChartInputForm } from './components/ChartInputForm';
import { FourPillarsView } from './components/FourPillarsView';
import { FiveElementsCycle } from './components/FiveElementsCycle';
import { LuckyElementReport } from './components/LuckyElementReport';
import { ActionableRecommendations } from './components/ActionableRecommendations';
import { DaYunTimeline } from './components/DaYunTimeline';
import { DailyBaZiCalendar } from './components/DailyBaZiCalendar';
import { AppArchitectureGuide } from './components/AppArchitectureGuide';
import { BaZiAiConsultant } from './components/BaZiAiConsultant';
import { PathwayNavigation } from './components/PathwayNavigation';
import { PartnerCompatibilityView } from './components/PartnerCompatibilityView';
import { ExportPdfButton } from './components/ExportPdfButton';
import { DataBackupModal } from './components/DataBackupModal';
import { calculateBaZiChart } from './utils/baziCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [personName, setPersonName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('1990-05-15');
  const [birthTime, setBirthTime] = useState<string>('10:30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [timezone, setTimezone] = useState<string>('WIB (UTC+7)');
  const [isConsultantOpen, setIsConsultantOpen] = useState<boolean>(false);
  const [isBackupOpen, setIsBackupOpen] = useState<boolean>(false);

  // Calculate BaZi chart reactively whenever inputs change
  const chart = useMemo(() => {
    return calculateBaZiChart(birthDate, birthTime, gender, personName, timezone);
  }, [birthDate, birthTime, gender, personName, timezone]);

  // Unified smooth navigation between tabs & UI pathways
  const handleNavigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      const el = document.getElementById('main-content-view');
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* Top Bar following Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigateToTab}
        onOpenConsultant={() => setIsConsultantOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
      />

      {/* Hero Visual Section with Bright Modern Image */}
      <section className="relative border-b border-slate-200/90 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/bazi_five_elements_light_1792252682112.jpg"
            alt="Harmoni Elemen Alam Modern"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              {/* Brand & Metaphysics Tag */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-amber-800 font-semibold tracking-wide uppercase">
                <span className="px-2 py-0.5 rounded bg-amber-100/90 border border-amber-300/80 font-bold text-amber-900">
                  BaZi by PENGGILAS
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Metafisika Tionghoa Klasik</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Kalender Surya Hsia</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-serif leading-tight text-balance">
                Analisis Elemen Keberuntungan & Empat Pilar Takdir
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed text-pretty max-w-2xl">
                Temukan Day Master Anda, petakan keseimbangan lima elemen (Wu Xing), dan ketahui Elemen Penolong (Yong Shen) Anda untuk mengoptimalkan warna, arah feng shui, karier, serta momentum harian bersama <strong className="text-slate-900 font-bold">BaZi by PENGGILAS</strong>.
              </p>

              {/* Quick action buttons & architecture notice */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleNavigateToTab('daily')}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>📅 Kalender Harian Hari Ini</span>
                  <span className="text-amber-200">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateToTab('architecture')}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
                >
                  <span>Kaidah & Algoritma Surya</span>
                  <span className="text-amber-600 font-bold">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateToTab('compatibility')}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-900 border border-rose-300 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
                >
                  <span>💑 Partner Compatibility</span>
                  <span className="text-rose-500 font-bold">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsConsultantOpen(true)}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                >
                  <span className="text-amber-400">✨</span>
                  <span>Konsultasi AI</span>
                </button>
              </div>
            </div>

            {/* Right Hero Logo Exploration Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-md flex items-center gap-4 max-w-sm w-full">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-sm bg-white">
                  <img
                    src="/src/assets/images/penggilas_bazi_logo_1792257210556.jpg"
                    alt="Logo BaZi by PENGGILAS"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-amber-600 font-extrabold text-base">八字</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">PENGGILAS</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Authentic BaZi Metaphysics Engine & Interactive Wu Xing Calculator
                  </p>
                  <div className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                    Verified Solar Hsia Algorithm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full space-y-8 pb-24 lg:pb-8">
        {/* Input Form always visible for fast tweaking */}
        <ChartInputForm
          personName={personName}
          setPersonName={setPersonName}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          birthTime={birthTime}
          setBirthTime={setBirthTime}
          gender={gender}
          setGender={setGender}
          timezone={timezone}
          setTimezone={setTimezone}
          chart={chart}
          onOpenBackup={() => setIsBackupOpen(true)}
        />

        {/* Scroll anchor target for consistent pathway jumping */}
        <div id="main-content-view" className="scroll-mt-24" />

        {/* Tab 1: Calculator & Chart Overview */}
        {activeTab === 'calculator' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Analysis Tab Header with Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>✦</span>
                  <span>Bagan Empat Pilar & Analisis Elemen</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ringkasan komprehensif struktur BaZi, keseimbangan Wu Xing, dan Elemen Penolong (Yong Shen).
                </p>
              </div>
              <ExportPdfButton chart={chart} variant="primary" label="Simpan sebagai PDF" />
            </div>

            {/* Four Pillars 8 Characters */}
            <FourPillarsView chart={chart} />

            {/* Daily BaZi Calendar Live Resonance */}
            <DailyBaZiCalendar chart={chart} />

            {/* Five Elements Wu Xing Cycle */}
            <FiveElementsCycle chart={chart} />

            {/* Lucky Element (Yong Shen) Core Report */}
            <LuckyElementReport chart={chart} />

            {/* Actionable Recommendations Preview */}
            <ActionableRecommendations recommendations={chart.recommendations} />

            {/* Clear Next-Step Pathway Navigation */}
            <PathwayNavigation
              title="Jalur Langkah Selanjutnya"
              subtitle="Bagan Anda telah terbentuk. Pelajari bagaimana energi hari ini beresonansi atau bandingkan kecocokan energi bersama pasangan Anda."
              onNavigate={handleNavigateToTab}
              actions={[
                { label: 'Cek Kecocokan Pasangan', tabId: 'compatibility', icon: '💑', variant: 'primary' },
                { label: 'Kalender Energi Hari Ini', tabId: 'daily', icon: '📅', variant: 'secondary' },
                { label: 'Panduan Rezeki & Feng Shui', tabId: 'recommendations', icon: '☯', variant: 'secondary' },
                { label: 'Konsultasi AI BaZi', action: () => setIsConsultantOpen(true), icon: '✨', variant: 'dark' },
              ]}
            />
          </div>
        )}

        {/* Tab 2: Dedicated Daily BaZi Calendar */}
        {activeTab === 'daily' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Analysis Tab Header with Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>📅</span>
                  <span>Kalender Harian BaZi & Aliran Chi</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Peta energi hari ini terhadap Day Master Anda serta momentum terbaik mengambil keputusan.
                </p>
              </div>
              <ExportPdfButton chart={chart} variant="primary" label="Simpan sebagai PDF" />
            </div>

            <DailyBaZiCalendar chart={chart} />
            <LuckyElementReport chart={chart} />
            <ActionableRecommendations recommendations={chart.recommendations} />

            {/* Clear Next-Step Pathway Navigation */}
            <PathwayNavigation
              title="Jalur Langkah Selanjutnya"
              subtitle="Terapkan energi harian ini ke dalam gaya hidup, warna busana, dan sektor ruang kerja terbaik Anda."
              onNavigate={handleNavigateToTab}
              actions={[
                { label: 'Panduan Rezeki & Feng Shui Lengkap', tabId: 'recommendations', icon: '☯', variant: 'primary' },
                { label: 'Cek Kecocokan Pasangan', tabId: 'compatibility', icon: '💑', variant: 'secondary' },
                { label: 'Periksa Siklus 10 Tahun (Da Yun)', tabId: 'dayun', icon: '⏳', variant: 'secondary' },
                { label: 'Tanya Konsultan AI Hari Ini', action: () => setIsConsultantOpen(true), icon: '✨', variant: 'dark' },
              ]}
            />
          </div>
        )}

        {/* Tab 3: Full Practical Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Analysis Tab Header with Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>☯</span>
                  <span>Panduan Rezeki, Feng Shui & Karier</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rekomendasi taktis aktivasi Elemen Penolong (Yong Shen) dalam busana, ruang, dan karier Anda.
                </p>
              </div>
              <ExportPdfButton chart={chart} variant="primary" label="Simpan sebagai PDF" />
            </div>

            <LuckyElementReport chart={chart} />
            <ActionableRecommendations recommendations={chart.recommendations} />

            {/* Clear Next-Step Pathway Navigation */}
            <PathwayNavigation
              title="Jalur Langkah Selanjutnya"
              subtitle="Sinkronkan panduan rezeki Anda dengan periode dekade hidup (Da Yun) untuk mengetahui kapan waktu terbaik mengambil langkah strategis."
              onNavigate={handleNavigateToTab}
              actions={[
                { label: 'Telusuri Siklus 10 Tahun (Da Yun)', tabId: 'dayun', icon: '⏳', variant: 'primary' },
                { label: 'Cek Kecocokan Pasangan', tabId: 'compatibility', icon: '💑', variant: 'secondary' },
                { label: 'Buka Kalender Energi Harian', tabId: 'daily', icon: '📅', variant: 'secondary' },
                { label: 'Konsultasi Strategi Karier AI', action: () => setIsConsultantOpen(true), icon: '✨', variant: 'dark' },
              ]}
            />
          </div>
        )}

        {/* Tab 4: Da Yun 10-Year Luck Cycles */}
        {activeTab === 'dayun' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Analysis Tab Header with Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>⏳</span>
                  <span>Siklus 10 Tahun (Da Yun / 大运)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evolusi dekade kehidupan Anda dan prediksi momen keemasan saat pilar Da Yun membawa elemen Yong Shen.
                </p>
              </div>
              <ExportPdfButton chart={chart} variant="primary" label="Simpan sebagai PDF" />
            </div>

            <DaYunTimeline chart={chart} />
            <FourPillarsView chart={chart} />

            {/* Clear Next-Step Pathway Navigation */}
            <PathwayNavigation
              title="Jalur Langkah Selanjutnya"
              subtitle="Pahami fondasi kalkulasi solar astronomis Hsia yang mendasari siklus Da Yun dan pilar BaZi Anda."
              onNavigate={handleNavigateToTab}
              actions={[
                { label: 'Cek Kecocokan Pasangan', tabId: 'compatibility', icon: '💑', variant: 'primary' },
                { label: 'Kaidah & Algoritma Surya Hsia', tabId: 'architecture', icon: '📜', variant: 'secondary' },
                { label: 'Kembali ke Bagan & Elemen', tabId: 'calculator', icon: '✦', variant: 'secondary' },
                { label: 'Konsultasi Periode Emas AI', action: () => setIsConsultantOpen(true), icon: '✨', variant: 'dark' },
              ]}
            />
          </div>
        )}

        {/* Tab 5: Partner Compatibility (Kecocokan Pasangan) */}
        {activeTab === 'compatibility' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <PartnerCompatibilityView initialChart={chart} />

            {/* Clear Next-Step Pathway Navigation */}
            <PathwayNavigation
              title="Jalur Langkah Selanjutnya"
              subtitle="Tinjau detail pilar masing-masing atau sinkronkan langkah hidup berdua dengan kalender energi harian."
              onNavigate={handleNavigateToTab}
              actions={[
                { label: 'Bagan & Elemen Pribadi', tabId: 'calculator', icon: '✦', variant: 'primary' },
                { label: 'Kalender Energi Harian', tabId: 'daily', icon: '📅', variant: 'secondary' },
                { label: 'Panduan Rezeki & Feng Shui', tabId: 'recommendations', icon: '☯', variant: 'secondary' },
                { label: 'Konsultasi Hubungan dengan AI', action: () => setIsConsultantOpen(true), icon: '✨', variant: 'dark' },
              ]}
            />
          </div>
        )}

        {/* Tab 6: Architecture & "Is Image Enough?" Explanation */}
        {activeTab === 'architecture' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <AppArchitectureGuide />

            {/* Clear Next-Step Pathway Navigation */}
            <PathwayNavigation
              title="Jalur Langkah Selanjutnya"
              subtitle="Siap melihat kalkulasi presisi pada diri Anda sendiri? Mulai hitung bagan kelahiran Anda sekarang."
              onNavigate={handleNavigateToTab}
              actions={[
                { label: 'Hitung Bagan Saya Sekarang', tabId: 'calculator', icon: '✦', variant: 'primary' },
                { label: 'Cek Kecocokan Pasangan', tabId: 'compatibility', icon: '💑', variant: 'secondary' },
                { label: 'Buka Kalender Energi Hari Ini', tabId: 'daily', icon: '📅', variant: 'secondary' },
                { label: 'Tanya AI Seputar Metodologi', action: () => setIsConsultantOpen(true), icon: '✨', variant: 'dark' },
              ]}
            />
          </div>
        )}
      </main>

      {/* Interactive AI Consultant Modal */}
      <BaZiAiConsultant
        chart={chart}
        isOpen={isConsultantOpen}
        onClose={() => setIsConsultantOpen(false)}
      />

      {/* Comprehensive Data Backup & Export Modal */}
      <DataBackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        chart={chart}
      />

      {/* Mobile Bottom Navigation Bar (Sticky for touch comfort) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-1.5 py-1.5 flex items-center justify-around safe-area-bottom">
        {[
          { id: 'calculator', label: 'Bagan', icon: '✦' },
          { id: 'daily', label: 'Kalender', icon: '📅' },
          { id: 'recommendations', label: 'Rezeki', icon: '☯' },
          { id: 'dayun', label: 'Da Yun', icon: '⏳' },
          { id: 'compatibility', label: 'Pasangan', icon: '💑' },
          { id: 'architecture', label: 'Kaidah', icon: '📜' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleNavigateToTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer active:scale-95 ${
              activeTab === tab.id
                ? 'text-amber-900 font-bold bg-amber-100 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span className="text-[11px] mt-1 leading-tight font-semibold tracking-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Clean Modern Footer with Official Brand Logo & Identity */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/penggilas_bazi_logo_1792257210556.jpg"
              alt="BaZi by PENGGILAS Logo"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-lg object-cover border border-amber-300/80 shadow-2xs"
            />
            <div className="text-left">
              <span className="text-slate-900 font-bold text-sm block">
                BaZi by PENGGILAS
              </span>
              <span className="text-xs text-slate-500">
                Sistem Metafisika Empat Pilar & Kalender Energi Harian
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-600 sm:text-right">
            <div>Dibuat dengan standar Kalender Hsia Matahari & Wu Xing Klasik</div>
            <div className="text-slate-500 text-xs mt-0.5">© 2026 BaZi by PENGGILAS · Seluruh Hak Dilindungi</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
