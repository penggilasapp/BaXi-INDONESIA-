import React, { useState } from 'react';
import {
  downloadBackupFile,
  exportAllAppDataAsJson,
  importAppDataFromJson,
  getSavedProfiles,
} from '../data/baziProfiles';
import { BaZiChart } from '../types/bazi';
import { exportChartSummaryToPdf } from '../utils/pdfExport';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  chart: BaZiChart;
  onDataChanged?: () => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  chart,
  onDataChanged,
}) => {
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'preview'>('export');

  if (!isOpen) return null;

  const profiles = getSavedProfiles();
  const jsonPreview = exportAllAppDataAsJson();

  const handleDownloadJson = () => {
    downloadBackupFile();
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonPreview);
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 3000);
    } catch {
      console.warn('Gagal menyalin data');
    }
  };

  const handleDownloadPdf = () => {
    exportChartSummaryToPdf(chart);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importAppDataFromJson(content);
        if (res.success) {
          setImportStatus({ type: 'success', message: res.message });
          if (onDataChanged) onDataChanged();
        } else {
          setImportStatus({ type: 'error', message: res.message });
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💾</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Pusat Cadangan & Ekspor Seluruh Data
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              BaZi by PENGGILAS · Unduh, simpan, atau pulihkan data Anda kapan saja tanpa pelacak eksternal.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 px-5 pt-2 bg-slate-50/40 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'export'
                ? 'border-amber-600 text-amber-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📦 Ekspor Data (Download)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'import'
                ? 'border-amber-600 text-amber-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📥 Impor / Pulihkan Data
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'border-amber-600 text-amber-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            👁️ Tinjau Format JSON
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-slate-700 space-y-1.5">
                <span className="font-bold text-amber-950 block text-sm">
                  Ringkasan Data Tersimpan:
                </span>
                <p>• Total Profil Tersimpan di Memori: <strong>{profiles.length} profil</strong></p>
                <p>• Profil Aktif Saat Ini: <strong>{chart.personName || 'Bagan Utama'}</strong> ({chart.birthDate})</p>
                <p>• Format Ekspor: Standar <strong>JSON Cadangan Resmi</strong> & <strong>PDF Laporan Siap Cetak</strong>.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="p-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold transition-all shadow-xs text-left cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">📦</span>
                    <span className="text-[10px] font-mono uppercase bg-amber-700/60 px-2 py-0.5 rounded">.JSON</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">Unduh Semua Data (.JSON)</div>
                    <div className="text-xs text-amber-100 mt-1">
                      File cadangan lengkap seluruh profil tersimpan untuk disimpan atau dipindahkan ke perangkat lain.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold transition-all shadow-xs text-left cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">📄</span>
                    <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded">.PDF</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">Unduh Laporan Lengkap (.PDF)</div>
                    <div className="text-xs text-slate-300 mt-1">
                      Dokumen resmi analisis Empat Pilar, keseimbangan Wu Xing, dan panduan rezeki Yong Shen.
                    </div>
                  </div>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>📋</span>
                  <span>{copyStatus ? 'Teks JSON Berhasil Disalin ke Clipboard!' : 'Salin Semua Data JSON ke Clipboard'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">
                  Cara Memulihkan Data:
                </span>
                <p>
                  Pilih file JSON cadangan yang telah Anda unduh sebelumnya. Seluruh profil akan digabungkan secara aman ke dalam penyimpanan browser perangkat ini.
                </p>
              </div>

              <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-6 text-center transition-all bg-slate-50/50">
                <span className="text-3xl block mb-2">📂</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block mb-1">
                  Pilih File Cadangan JSON (.json)
                </span>
                <span className="text-xs text-slate-500 block mb-4">
                  Klik tombol di bawah untuk memilih file dari komputer atau ponsel Anda
                </span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
                />
              </div>

              {importStatus.type && (
                <div
                  className={`p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 border ${
                    importStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-rose-50 text-rose-900 border-rose-300'
                  }`}
                >
                  <span>{importStatus.type === 'success' ? '✓' : '⚠️'}</span>
                  <span>{importStatus.message}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Struktur Data Mentah JSON (Raw Backup):
                </span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                >
                  {copyStatus ? 'Tersalin!' : 'Salin JSON'}
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] sm:text-xs rounded-xl overflow-x-auto max-h-64 scrollbar-thin">
                {jsonPreview}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Penyimpanan data lokal murni · Privasi 100% terjaga
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 cursor-pointer transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
