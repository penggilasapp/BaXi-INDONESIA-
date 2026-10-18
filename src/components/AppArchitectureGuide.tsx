import React, { useState } from 'react';

export const AppArchitectureGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whyNotJustImages' | 'recommendedFeatures' | 'techStack'>('whyNotJustImages');

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Panduan Arsitektur: Analisis Fitur Aplikasi BaZi Modern
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Jawaban komprehensif atas pertanyaan fitur apa yang harus disertakan dan mengapa tidak cukup hanya gambar saja.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto max-w-full scrollbar-thin w-full sm:w-auto">
          {[
            { id: 'whyNotJustImages', label: 'Apakah Cukup Gambar Saja?' },
            { id: 'recommendedFeatures', label: 'Daftar Fitur Rekomendasi' },
            { id: 'techStack', label: 'Alur Logika & AI' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Why Not Just Images? */}
      {activeTab === 'whyNotJustImages' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/70 space-y-3 shadow-2xs">
            <h4 className="text-sm font-bold text-amber-900">
              Jawaban Inti: Mengapa TIDAK CUKUP Jika Hanya Memberikan Gambar Saja?
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Dalam metafisika Tionghoa kuno, BaZi bukanlah ramalan kartu statis seperti horoskop bintang umum. BaZi adalah <strong className="text-slate-900 font-bold">sistem kalkulasi energetik multidimensi</strong> dengan 518.400 variasi kombinasi dasar.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Jika aplikasi hanya memberikan gambar (misalnya foto ilustrasi shio atau kartu lima elemen biasa), pengguna tidak mendapatkan esensi utama: <strong className="text-amber-900 font-bold">Kalkulasi presisi, pemahaman alasan (aliran Chi), dan panduan aksi personal</strong>.
            </p>
          </div>

          {/* Comparison Matrix Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="p-3.5 font-bold">Dimensi Aspek</th>
                  <th className="p-3.5 font-bold text-rose-800">Hanya Gambar Saja (Statis)</th>
                  <th className="p-3.5 font-bold text-emerald-800">Aplikasi Interaktif Berbasis Sistem (Ideal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Personalisasi</td>
                  <td className="p-3.5 text-slate-500">Hanya berdasarkan tahun lahir / shio umum (1 dari 12 kemungkinan).</td>
                  <td className="p-3.5 text-emerald-900 font-semibold bg-emerald-50/20">Dihitung dari 4 Pilar (Tahun, Bulan, Hari, Jam) hingga 518.400 kombinasi unik.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Penentuan Elemen Keberuntungan</td>
                  <td className="p-3.5 text-slate-500">Sering salah tebak (misal mengira elemen yang kosong otomatis jadi elemen hoki).</td>
                  <td className="p-3.5 text-emerald-900 font-semibold bg-emerald-50/20">Menganalisis kekuatan Day Master (Wang/Shuai), musim lahir (De Ling), dan penyeimbang iklim (Tiao Hou).</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Dampak Aksi Nyata</td>
                  <td className="p-3.5 text-slate-500">Pengguna bingung: "Lalu saya harus apa setelah melihat gambar ini?".</td>
                  <td className="p-3.5 text-emerald-900 font-semibold bg-emerald-50/20">Panduan jelas: Warna pakaian harian, arah meja kerja, karier cocok, nutrisi TCM, dan kristal penyeimbang.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Dimensi Waktu (Timeline)</td>
                  <td className="p-3.5 text-slate-500">Tidak ada proyeksi masa depan.</td>
                  <td className="p-3.5 text-emerald-900 font-semibold bg-emerald-50/20">Siklus 10 Tahun (Da Yun) & Tahun Berjalan (Liu Nian) untuk mengetahui kapan periode emas tiba.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900">Retensi & Kepercayaan Pengguna</td>
                  <td className="p-3.5 text-slate-500">Dilihat sekali lalu ditinggalkan (Zero Retention).</td>
                  <td className="p-3.5 text-emerald-900 font-semibold bg-emerald-50/20">Menjadi alat konsultasi berkala, perencanaan karier, dan referensi keluarga.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 shadow-2xs">
            <span className="font-bold text-amber-900 block mb-1">Peran Gambar yang Sebenarnya:</span>
            Gambar tetap sangat penting, tetapi fungsinya adalah sebagai <strong className="text-slate-900 font-bold">visualizer infografis intuitif</strong> (seperti diagram radar D3.js, roda Wu Xing interaktif, dan palet warna nyata), bukan satu-satunya konten.
          </div>
        </div>
      )}

      {/* Tab 2: Recommended Features Roadmap */}
      {activeTab === 'recommendedFeatures' && (
        <div className="space-y-6">
          <p className="text-xs text-slate-600 font-medium">
            Berikut adalah arsitektur 9 modul fitur esensial yang sebaiknya Anda sediakan saat membangun aplikasi BaZi profesional:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">1. Kalkulator Kalender Surya Hsia</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Konversi kalender Masehi ke kalender Hsia dengan cutoff 24 Solar Terms (Li Chun ~4 Feb) dan 12 jam ganda (Shi Chen).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">2. Bagan 4 Pilar & Ten Gods (Shi Shen)</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visualisasi 8 karakter lengkap dengan Hidden Stems (Cang Gan) dan relasi 10 Dewa (Zheng Cai, Pian Cai, Zheng Guan, Qi Sha, dll.).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">3. Analisis Kekuatan Day Master</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menghitung apakah Day Master Lemah (Ruo) atau Kuat (Wang) berdasarkan dukungan musim dan distribusi elemen dalam persentase.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">4. Penentu Elemen Penolong (Yong Shen)</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menentukan Yong Shen (elemen keberuntungan utama), Xi Shen (elemen pendukung), dan Ji Shen (elemen tantangan) beserta alasannya.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">5. Rekomendasi Lifestyle & Feng Shui</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rekomendasi warna pakaian, arah meja kerja terbaik, sektor kamar tidur, daftar bidang karier yang cocok, dan nutrisi TCM.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">6. Siklus Keberuntungan 10 Tahun (Da Yun)</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Timeline dekade yang memperlihatkan kapan elemen Yong Shen tiba dalam siklus umur untuk momentum ekspansi atau konsolidasi.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">7. Asisten Konsultan BaZi Berbasis AI</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fitur tanya-jawab interaktif bertenaga Gemini AI untuk menjawab pertanyaan kontekstual seperti "Kapan waktu tepat ganti kerja?".
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">8. Visualisasi Radar D3.js (Spider Chart)</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pemetaan visual polygon dinamis 5 elemen dengan garis ekuilibrium 20% dan interaksi hover titik bobot real-time.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">9. Kalender Harian BaZi Berbasis Day Master</span>
                <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Tersedia</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Perhitungan pilar 60 Jia Zi harian, Dewa Sepuluh (Shi Shen) hari ini terhadap Day Master Anda, deteksi benturan (Chong) / harmoni (He), dan jam hoki 12 Shi Chen.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">10. Komparasi Sinergi Pasangan / Partner</span>
                <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Fitur Lanjutan</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fitur pencocokan dua bagan untuk melihat apakah elemen pasangan saling melengkapi (Yong Shen satu sama lain).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Alur Logika & AI */}
      {activeTab === 'techStack' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-4 shadow-2xs">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              Alur Kerja Algoritma BaZi yang Diterapkan di Aplikasi Ini
            </span>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center font-bold shrink-0">1</span>
                <div>
                  <strong className="text-slate-900 font-bold">Normalisasi Waktu & Tanggal Surya:</strong> Menghitung Julian Day Number (JDN) untuk mencocokkan siklus 60 Jia Zi tanpa terdistorsi kalender lunar/masehi biasa.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center font-bold shrink-0">2</span>
                <div>
                  <strong className="text-slate-900 font-bold">Penetapan Pilar Jam & Bulan:</strong> Menggunakan aturan "Lima Harimau" (Wu Hu Dun) untuk bulan dan "Lima Tikus" (Wu Shu Dun) untuk jam.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center font-bold shrink-0">3</span>
                <div>
                  <strong className="text-slate-900 font-bold">Pembobotan 5 Elemen (Weight Engine):</strong> Menghitung kontribusi akar tersembunyi (Hidden Stems), di mana cabang bulan memiliki pengaruh terbesar (~40%).
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center font-bold shrink-0">4</span>
                <div>
                  <strong className="text-slate-900 font-bold">Formula Seleksi Yong Shen:</strong> Menerapkan aturan Fu Yi (penyeimbang kekuatan), Tiao Hou (penyeimbang suhu musim dingin/panas), dan Tong Guan (jembatan konflik elemen).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
