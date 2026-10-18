import React, { useState } from 'react';
import { BaZiChart } from '../types/bazi';
import { exportChartSummaryToPdf } from '../utils/pdfExport';

interface ExportPdfButtonProps {
  chart: BaZiChart;
  variant?: 'primary' | 'secondary' | 'compact' | 'light';
  className?: string;
  label?: string;
}

export const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({
  chart,
  variant = 'primary',
  className = '',
  label = 'Simpan sebagai PDF',
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleExport = () => {
    try {
      setIsExporting(true);
      // Generate and trigger download
      exportChartSummaryToPdf(chart);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3500);
    } catch (err) {
      console.error('Gagal mengunduh PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const getStyleClass = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs';
      case 'compact':
        return 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs py-1.5 px-3 shadow-2xs';
      case 'light':
        return 'bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-900 border border-amber-200 shadow-2xs';
      case 'primary':
      default:
        return 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-xs';
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        title="Unduh ringkasan empat pilar dan rekomendasi elemen keberuntungan dalam format PDF"
        className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-wait ${getStyleClass()} ${className}`}
      >
        <span className="text-sm">📄</span>
        <span>{isExporting ? 'Menyiapkan Dokumen...' : label}</span>
        <span className="text-[11px] opacity-75 hidden sm:inline">PDF</span>
      </button>

      {/* Success Notification Tooltip */}
      {showSuccessToast && (
        <div className="absolute right-0 top-full mt-2 z-30 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 whitespace-nowrap animate-in fade-in slide-in-from-top-1">
          <span className="text-emerald-400">✓</span>
          <span>PDF berhasil diunduh!</span>
        </div>
      )}
    </div>
  );
};
