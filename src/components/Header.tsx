import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultant: () => void;
  onOpenBackup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenConsultant,
  onOpenBackup,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'calculator', label: 'Bagan & Elemen', icon: '✦' },
    { id: 'daily', label: 'Kalender Harian', icon: '📅' },
    { id: 'recommendations', label: 'Panduan Rezeki & Feng Shui', icon: '☯' },
    { id: 'dayun', label: 'Siklus 10 Tahun (Da Yun)', icon: '⏳' },
    { id: 'compatibility', label: 'Partner Compatibility', icon: '💑' },
    { id: 'architecture', label: 'Kaidah & Algoritma Surya', icon: '📜' },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          {/* Logo Container with Golden Ring Glow */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-amber-300/80 shadow-xs bg-white flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src="/src/assets/images/penggilas_bazi_logo_1792257210556.jpg"
              alt="Logo BaZi by PENGGILAS"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-amber-600 font-extrabold text-lg leading-none">
                八字
              </span>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                BaZi
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                by PENGGILAS
              </span>
            </div>
            <span className="text-xs text-slate-600 font-medium hidden sm:block">
              Analisis Elemen & Empat Pilar Takdir
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 cursor-pointer ${
                activeTab === item.id
                  ? 'text-amber-700 font-bold border-b-2 border-amber-600 pb-1'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenBackup}
            title="Ekspor seluruh data aplikasi (Backup JSON & Laporan Lengkap)"
            className="px-2.5 sm:px-3 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-lg transition-all shadow-2xs whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>📦</span>
            <span className="hidden sm:inline">Ekspor Data</span>
          </button>

          <button
            onClick={onOpenConsultant}
            className="px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span className="text-amber-400">✨</span>
            <span className="hidden xs:inline sm:inline">Tanya Ahli</span> AI
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/90 bg-white/98 backdrop-blur-md px-4 py-3 shadow-md animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-amber-100/80 text-amber-900 border border-amber-300/80 shadow-2xs font-bold'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <span className="ml-auto text-amber-600 font-bold text-xs">Aktif</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
