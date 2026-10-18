import React from 'react';

export interface PathwayAction {
  label: string;
  tabId?: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'dark';
  action?: () => void;
  badge?: string;
}

interface PathwayNavigationProps {
  title?: string;
  subtitle?: string;
  actions: PathwayAction[];
  onNavigate: (tabId: string) => void;
}

export const PathwayNavigation: React.FC<PathwayNavigationProps> = ({
  title = 'Jalur Analisis Selanjutnya',
  subtitle = 'Lanjutkan eksplorasi potensi dan panduan energi BaZi Anda ke tahap berikutnya.',
  actions,
  onNavigate,
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-50/70 via-slate-50 to-white border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-xs mt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-600 font-serif font-bold text-sm">✦</span>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {title}
            </h4>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
              Alur Panduan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Action Button Pathway Flow */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {actions.map((act, idx) => {
            const isPrimary = act.variant === 'primary' || (!act.variant && idx === 0);
            const isDark = act.variant === 'dark';

            let btnClasses =
              'px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] whitespace-nowrap ';

            if (isPrimary) {
              btnClasses +=
                'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-amber-600/20';
            } else if (isDark) {
              btnClasses +=
                'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-slate-900/20';
            } else {
              btnClasses +=
                'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (act.action) {
                    act.action();
                  } else if (act.tabId) {
                    onNavigate(act.tabId);
                  }
                }}
                className={btnClasses}
              >
                {act.icon && <span className="text-sm">{act.icon}</span>}
                <span>{act.label}</span>
                {act.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-950 font-bold">
                    {act.badge}
                  </span>
                )}
                <span className="text-xs opacity-70">→</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
