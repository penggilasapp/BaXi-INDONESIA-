import React, { useState } from 'react';
import { BaZiChart } from '../types/bazi';
import { GoogleGenAI } from '@google/genai';

interface BaZiAiConsultantProps {
  chart: BaZiChart;
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_QUESTIONS = [
  'Bagaimana strategi tercepat mengaktifkan elemen keberuntungan (Yong Shen) saya?',
  'Apakah jika suatu elemen kosong (0%) dalam bagan, otomatis menjadi elemen hoki saya?',
  'Bidang bisnis apa yang paling mendatangkan cuan maksimal bagi Day Master saya?',
  'Bagaimana pengaruh elemen keberuntungan terhadap hubungan asmara dan relasi kerja?',
  'Apa warna dan arah meja kerja terbaik saat saya menghadapi negosiasi kritis?',
];

export const BaZiAiConsultant: React.FC<BaZiAiConsultantProps> = ({ chart, isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConsult = async (selectedQuery?: string) => {
    const q = selectedQuery || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setResponse(null);

    const apiKey =
      (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
      (import.meta as any).env?.VITE_GEMINI_API_KEY;

    try {
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
Anda adalah seorang Master Metafisika BaZi (Empat Pilar Takdir) profesional dan ramah.
Berikut adalah data bagan BaZi pengguna:
- Tanggal Lahir: ${chart.birthDate} ${chart.birthTime} (Gender: ${chart.gender})
- Day Master: ${chart.dayMaster.nameId} (${chart.dayMaster.char}) - Karakter: ${chart.dayMaster.archetype}
- Kekuatan Day Master: ${chart.dayMasterStrength.level} (${chart.dayMasterStrength.score}% dukungan)
- Pilar Tahun: ${chart.yearPillar.stem.nameId} / ${chart.yearPillar.branch.animal}
- Pilar Bulan: ${chart.monthPillar.stem.nameId} / ${chart.monthPillar.branch.animal} (${chart.solarTermName})
- Pilar Hari: ${chart.dayPillar.stem.nameId} / ${chart.dayPillar.branch.animal}
- Pilar Jam: ${chart.hourPillar.stem.nameId} / ${chart.hourPillar.branch.animal}
- Distribusi 5 Elemen: Kayu ${chart.elementDistribution.Wood}%, Api ${chart.elementDistribution.Fire}%, Tanah ${chart.elementDistribution.Earth}%, Logam ${chart.elementDistribution.Metal}%, Air ${chart.elementDistribution.Water}%
- Elemen Penolong Utama (Yong Shen): ${chart.luckyElements.primaryYongShen}
- Elemen Pendukung (Xi Shen): ${chart.luckyElements.secondaryXiShen}
- Elemen Tantangan (Ji Shen): ${chart.luckyElements.unfavorableJiShen}

Pertanyaan Pengguna: "${q}"

Tolong berikan jawaban yang:
1. Sangat relevan, praktis, dan memberdayakan (tanpa fatalisme/nakut-nakutin).
2. Menjelaskan secara spesifik kaitannya dengan Day Master ${chart.dayMaster.nameId} dan elemen keberuntungan ${chart.luckyElements.primaryYongShen}.
3. Menyertakan 3-4 langkah aksi konkret yang bisa langsung diterapkan dalam kehidupan sehari-hari (warna, kebiasaan, pola pikir, atau arah kerja).
Gunakan bahasa Indonesia yang santun, elegan, dan terstruktur rapi.
`;

        const res = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        if (res.text) {
          setResponse(res.text);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('API error, falling back to smart BaZi engine interpretation', e);
    }

    // Built-in expert rule engine fallback
    setTimeout(() => {
      const generated = generateExpertAdvice(chart, q);
      setResponse(generated);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-amber-600 font-serif font-bold">智</span>
                Konsultan BaZi & Elemen Keberuntungan
              </h3>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 font-bold">
                PENGGILAS
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Analisis khusus untuk {chart.personName ? <strong className="text-slate-800">{chart.personName} · </strong> : null}Day Master {chart.dayMaster.nameId} · Yong Shen: {chart.luckyElements.primaryYongShen}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Quick Prompt Cards */}
          <div>
            <span className="text-xs font-semibold text-slate-600 block mb-2">
              Pertanyaan Populer Seputar Bagan Anda:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_QUESTIONS.map((sq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(sq);
                    handleConsult(sq);
                  }}
                  className="text-left text-xs px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 transition-all cursor-pointer active:scale-[0.98]"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Atau Tanyakan Hal Spesifik Lainnya:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Misal: Kapan waktu terbaik mulai bisnis baru? atau Warna pakaian wawancara kerja?"
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConsult();
                }}
              />
              <button
                type="button"
                onClick={() => handleConsult()}
                disabled={isLoading}
                className="px-4 py-2.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                {isLoading ? 'Menganalisis...' : 'Analisis'}
              </button>
            </div>
          </div>

          {/* Response Box */}
          {isLoading && (
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-2 shadow-2xs">
              <div className="text-amber-600 font-serif text-xl animate-pulse font-bold">☯</div>
              <p className="text-xs text-slate-600">Menghubungkan prinsip lima elemen dengan konfigurasi pilar lahir Anda...</p>
            </div>
          )}

          {response && !isLoading && (
            <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 text-xs text-slate-800 space-y-3 leading-relaxed whitespace-pre-line shadow-2xs">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-200/80 text-amber-900 font-bold text-xs">
                <span>Jawaban Konsultasi BaZi</span>
              </div>
              {response}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-500">
            Interpretasi BaZi bertujuan sebagai pemandu harmoni dan keselarasan energi, bukan penentu mutlak nasib.
          </span>
        </div>
      </div>
    </div>
  );
};

function generateExpertAdvice(chart: BaZiChart, q: string): string {
  const dm = chart.dayMaster.nameId;
  const strength = chart.dayMasterStrength.level;
  const yongShen = chart.luckyElements.primaryYongShen;
  const xiShen = chart.luckyElements.secondaryXiShen;
  const jiShen = chart.luckyElements.unfavorableJiShen;

  let adviceIntro = `Berdasarkan pembacaan bagan BaZi Anda dengan Day Master ${dm} berkategori **${strength}**, elemen penolong utama Anda adalah **${yongShen}** dan elemen pendukungnya adalah **${xiShen}**.\n\n`;

  if (q.toLowerCase().includes('kosong') || q.toLowerCase().includes('0%')) {
    return (
      adviceIntro +
      `**Penjelasan Mengenai Elemen Kosong (0%):**\n` +
      `Banyak pemula salah mengira bahwa elemen yang persentasenya 0% dalam bagan otomatis harus ditambah. Dalam tradisi BaZi klasik, ini adalah KELIRU.\n` +
      `- Jika Day Master Anda berstatus Kuat, maka elemen yang hilang jika itu adalah elemen Penaung (Resource) justru menguntungkan, karena menambah elemen yang sudah berlebih hanya akan menyebabkan stagnasi energi.\n` +
      `- Yang paling penting adalah **Yong Shen (${yongShen})**, bukan membuat kelima elemen sama rata 20%. Tubuh dan rezeki manusia membutuhkan poros keseimbangan yang tepat, bukan keseragaman mutlak.`
    );
  }

  if (q.toLowerCase().includes('cuan') || q.toLowerCase().includes('bisnis') || q.toLowerCase().includes('karier')) {
    return (
      adviceIntro +
      `**Strategi Karier & Akumulasi Keuangan:**\n` +
      `1. **Fokus pada Sektor Elemen ${yongShen}:** Anda akan merasakan akselerasi rezeki jika berbisnis atau berkarier di bidang yang resonan dengan ${yongShen}. Peluang partnership dan kemudahan closing kontrak akan jauh lebih mengalir.\n` +
      `2. **Pola Manajemen:** Karena status Day Master Anda adalah **${strength}**, ${
        strength.includes('Lemah')
          ? 'jangan ragu mengajak mitra bisnis terpercaya yang memiliki elemen kuat untuk saling melengkapi beban kerja.'
          : 'Anda memiliki kapasitas kepemimpinan yang besar untuk mengontrol proyek skala luas dan mengambil inisiatif mandiri.'
      }\n` +
      `3. **Hindari Dominasi Elemen ${jiShen}:** Jangan menempatkan diri dalam lingkungan bisnis yang terlalu banyak benturan dengan ${jiShen} agar terhindar dari pemborosan energi yang sia-sia.`
    );
  }

  return (
    adviceIntro +
    `**Panduan Praktis Menyelaraskan Energi:**\n` +
    `1. **Warna & Busana:** Prioritaskan mengenakan warna turunan elemen **${yongShen}** saat momentum krusial. Ini akan menaikkan pancaran aura personal (Qi) Anda.\n` +
    `2. **Tata Ruang Kerja:** Arahkan hadap meja kerja Anda ke sektor yang selaras dengan ${yongShen} (hindari membelakangi pintu utama).\n` +
    `3. **Pola Kebiasaan Harian:** Rutin lakukan aktivitas penyeimbang elemen seperti menjaga hidrasi, meditasi grounding, atau olahraga teratur sesuai panduan.\n` +
    `4. **Waktu Emas:** Manfaatkan siklus tahun dan bulan yang membawa elemen ${yongShen} untuk mengeksekusi rencana-rencana penting.`
  );
}
