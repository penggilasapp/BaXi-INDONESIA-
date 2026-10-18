/**
 * PDF Export Utility
 * BaZi by PENGGILAS
 * 
 * Generates structured, high-fidelity PDF documents using jsPDF:
 * 1. BaZi Full Pillars & Lucky Element Summary Report
 * 2. Partner Compatibility Energy Synergy Report
 */

import { jsPDF } from 'jspdf';
import { BaZiChart } from '../types/bazi';
import { PartnerCompatibilityResult } from './partnerCompatibility';

/**
 * Clean string for safe file name
 */
function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\u4e00-\u9fa5-]/g, '_').slice(0, 40);
}

/**
 * Export full BaZi Chart Summary & Lucky Elements to PDF
 */
export function exportChartSummaryToPdf(chart: BaZiChart): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const personName = chart.personName || 'Pribadi';
  let y = 16;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gold accent line
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Brand title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('BaZi by PENGGILAS', 14, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text('Analisis Empat Pilar Takdir & Rekomendasi Elemen Keberuntungan', 14, 21);

  // Date printed
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Dicetak: ${todayStr}`, pageWidth - 14, 21, { align: 'right' });

  y = 38;

  // Profile Information Box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(14, y, pageWidth - 28, 24, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`Pemilik Bagan: ${personName}`, 18, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Tanggal Lahir: ${chart.birthDate}  |  Jam: ${chart.birthTime} (${chart.timezone || 'WIB'})  |  Gender: ${chart.gender === 'male' ? 'Pria' : 'Wanita'}`,
    18,
    y + 15
  );
  doc.text(`Solar Term: ${chart.solarTermName}  |  Day Master: ${chart.dayMaster.nameId} (${chart.dayMaster.polarity})`, 18, y + 20);

  y += 32;

  // SECTION 1: Empat Pilar (Four Pillars Grid)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Tabel Empat Pilar Takdir (BaZi 四柱)', 14, y);

  y += 6;
  const colWidth = (pageWidth - 28) / 4;
  const pillars = [
    { title: 'Pilar Jam (Hour)', data: chart.hourPillar },
    { title: 'Pilar Hari (Day)', data: chart.dayPillar },
    { title: 'Pilar Bulan (Month)', data: chart.monthPillar },
    { title: 'Pilar Tahun (Year)', data: chart.yearPillar },
  ];

  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);

  pillars.forEach((p, idx) => {
    const x = 14 + idx * colWidth;
    doc.text(p.title, x + colWidth / 2, y + 5, { align: 'center' });
  });

  y += 7;

  // Table Rows: Heavenly Stem, Earthly Branch, 10 Gods, Melody NaYin
  const rows = [
    {
      label: 'Batang Langit (Tian Gan)',
      getter: (p: any) => `${p.data.stem.char} - ${p.data.stem.nameId}`,
    },
    {
      label: '10 Dewa (Shi Shen)',
      getter: (p: any) => p.data.tenGod || 'Day Master (Diri)',
    },
    {
      label: 'Cabang Bumi (Di Zhi)',
      getter: (p: any) => `${p.data.branch.char} - ${p.data.branch.animal} (${p.data.branch.element})`,
    },
    {
      label: 'Melodi Suara (Na Yin)',
      getter: (p: any) => p.data.phaseNaYin || '-',
    },
  ];

  rows.forEach((r, rIdx) => {
    const rowH = 9;
    if (rIdx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, pageWidth - 28, rowH, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y + rowH, pageWidth - 14, y + rowH);

    pillars.forEach((p, cIdx) => {
      const x = 14 + cIdx * colWidth;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      const text = r.getter(p);
      doc.text(text, x + colWidth / 2, y + 6, { align: 'center' });
    });
    y += rowH;
  });

  y += 8;

  // SECTION 2: Analisis Kekuatan & Elemen Keberuntungan (Yong Shen)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Elemen Penolong (Yong Shen 用神) & Keseimbangan Lima Elemen', 14, y);

  y += 6;

  // Yong Shen Summary Card
  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(245, 158, 11); // amber-500
  doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(146, 64, 14); // amber-800
  doc.text(
    `Elemen Penolong Utama (Yong Shen): ${chart.luckyElements.primaryYongShen.toUpperCase()}`,
    18,
    y + 7
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(
    `• Elemen Pendukung (Xi Shen): ${chart.luckyElements.secondaryXiShen}   |   Elemen Tantangan (Ji Shen): ${chart.luckyElements.unfavorableJiShen}`,
    18,
    y + 13
  );
  doc.text(
    `• Kekuatan Day Master: ${chart.dayMasterStrength.level} (${chart.dayMasterStrength.score}/100) - ${chart.dayMasterStrength.seasonSummary}`,
    18,
    y + 18
  );

  const rationaleSplit = doc.splitTextToSize(
    `• Alasan: ${chart.luckyElements.rationale}`,
    pageWidth - 36
  );
  doc.text(rationaleSplit[0] || '', 18, y + 23);

  y += 34;

  // Five Elements Percentage Distribution
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Distribusi Lima Elemen (Wu Xing 五行):', 14, y);

  y += 5;
  const elementsList = [
    { name: 'Kayu (Wood)', val: chart.elementDistribution.Wood || 0, color: [22, 163, 74] },
    { name: 'Api (Fire)', val: chart.elementDistribution.Fire || 0, color: [220, 38, 38] },
    { name: 'Tanah (Earth)', val: chart.elementDistribution.Earth || 0, color: [217, 119, 6] },
    { name: 'Logam (Metal)', val: chart.elementDistribution.Metal || 0, color: [100, 116, 139] },
    { name: 'Air (Water)', val: chart.elementDistribution.Water || 0, color: [37, 99, 235] },
  ];

  const elColW = (pageWidth - 28) / 5;
  elementsList.forEach((el, idx) => {
    const x = 14 + idx * elColW;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, y, elColW - 2, 12, 1, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(el.color[0], el.color[1], el.color[2]);
    doc.text(`${el.val}%`, x + (elColW - 2) / 2, y + 5, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(el.name.split(' ')[0], x + (elColW - 2) / 2, y + 9.5, { align: 'center' });
  });

  y += 20;

  // SECTION 3: Rekomendasi Praktis Kehidupan (Actionable Recommendations)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Panduan Praktis Feng Shui & Optimalisasi Rezeki', 14, y);

  y += 6;

  const recCards = [
    {
      title: 'Warna Keberuntungan',
      text: chart.recommendations.colors.map((c) => c.name).join(', ') || 'Sesuai elemen penolong',
    },
    {
      title: 'Arah Feng Shui Terbaik',
      text: chart.recommendations.luckyDirections.join(', ') || 'Timur, Selatan',
    },
    {
      title: 'Karier & Industri Selaras',
      text: chart.recommendations.careers.slice(0, 3).join(', ') || 'Karier terkait elemen Yong Shen',
    },
    {
      title: 'Nutrisi & Gaya Hidup',
      text: chart.recommendations.nutritionAndFoods.slice(0, 2).join('; ') || 'Konsumsi nutrisi seimbang',
    },
  ];

  recCards.forEach((rc, idx) => {
    const cardY = y + idx * 13;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, cardY, pageWidth - 28, 11, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`• ${rc.title}:`, 18, cardY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(rc.text, 65, cardY + 7);
  });

  y += 56;

  // Footer Disclaimer
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 280, pageWidth - 14, 280);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Dihitung berdasarkan Kaidah Kalender Hsia Surya Klasik (Li Chun) · BaZi by PENGGILAS · Seluruh Hak Dilindungi',
    pageWidth / 2,
    286,
    { align: 'center' }
  );

  // Trigger download
  const filename = `BaZi_PENGGILAS_${sanitizeFilename(personName)}_Ringkasan.pdf`;
  doc.save(filename);
}

/**
 * Export Partner Compatibility report to PDF
 */
export function exportPartnerCompatibilityToPdf(
  chart1: BaZiChart,
  chart2: BaZiChart,
  result: PartnerCompatibilityResult
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const p1Name = chart1.personName || 'Pasangan 1';
  const p2Name = chart2.personName || 'Pasangan 2';
  let y = 16;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gold accent line
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Brand title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('BaZi by PENGGILAS', 14, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text('Laporan Analisis Kecocokan Pasangan & Harmoni Energi (Partner Compatibility)', 14, 21);

  // Date printed
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Dicetak: ${todayStr}`, pageWidth - 14, 21, { align: 'right' });

  y = 36;

  // Overall Score Banner
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(14, y, pageWidth - 28, 26, 3, 3, 'FD');

  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`Skor Keselarasan: ${result.overallScore}% (${result.tier})`, 18, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const sumLines = doc.splitTextToSize(result.summary, pageWidth - 36);
  doc.text(sumLines.slice(0, 2), 18, y + 16);

  y += 34;

  // Partners Compare Grid
  const halfW = (pageWidth - 32) / 2;

  // Partner 1 Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, halfW, 30, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`1. ${p1Name}`, 18, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`• Lahir: ${chart1.birthDate} (${chart1.birthTime})`, 18, y + 13);
  doc.text(`• Day Master: ${chart1.dayMaster.nameId}`, 18, y + 18);
  doc.text(`• Yong Shen: ${chart1.luckyElements.primaryYongShen}`, 18, y + 23);

  // Partner 2 Box
  const p2X = 18 + halfW;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(p2X, y, halfW, 30, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`2. ${p2Name}`, p2X + 4, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`• Lahir: ${chart2.birthDate} (${chart2.birthTime})`, p2X + 4, y + 13);
  doc.text(`• Day Master: ${chart2.dayMaster.nameId}`, p2X + 4, y + 18);
  doc.text(`• Yong Shen: ${chart2.luckyElements.primaryYongShen}`, p2X + 4, y + 23);

  y += 37;

  // SECTION 1: Interaksi Day Master
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Dinamika Karakter & Harmoni Batin (Day Master)', 14, y);

  y += 5;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9);
  doc.text(
    `${result.dayMasterSynergy.relationName} (Skor: ${result.dayMasterSynergy.score}/35)`,
    18,
    y + 7
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const dmDesc = doc.splitTextToSize(result.dayMasterSynergy.description, pageWidth - 36);
  doc.text(dmDesc.slice(0, 2), 18, y + 13);

  y += 28;

  // SECTION 2: Saling Melengkapi Elemen Penolong (Yong Shen)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Asuhan Rezeki & Elemen Penolong (Yong Shen 互补)', 14, y);

  y += 5;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(37, 99, 235);
  doc.text(
    `Penolong: ${p1Name} (${result.yongShenSynergy.p1YongShen}) & ${p2Name} (${result.yongShenSynergy.p2YongShen}) - Skor: ${result.yongShenSynergy.score}/35`,
    18,
    y + 7
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const ysDesc = doc.splitTextToSize(result.yongShenSynergy.description, pageWidth - 36);
  doc.text(ysDesc.slice(0, 2), 18, y + 13);

  y += 28;

  // SECTION 3: Istana Pasangan & Shio
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Istana Pasangan (Rumah Tangga) & Shio', 14, y);

  y += 5;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`• ${result.spousePalaceSynergy.relationName}:`, 18, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  const spDesc = doc.splitTextToSize(result.spousePalaceSynergy.description, pageWidth - 40);
  doc.text(spDesc[0] || '', 18, y + 11);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`• ${result.yearBranchSynergy.relationName}:`, 18, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(result.yearBranchSynergy.description, 60, y + 16);

  y += 26;

  // SECTION 4: Saran Harmonisasi
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('4. Tips Penyelarasan Energi Bersama', 14, y);

  y += 5;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(`• Warna Harmoni Bersama: ${result.harmonizationTips.sharedColors.join(', ')}`, 18, y + 6);
  const fengText = doc.splitTextToSize(`• Feng Shui Kamar: ${result.harmonizationTips.fengShuiAdvice}`, pageWidth - 36);
  doc.text(fengText[0] || '', 18, y + 12);
  const commText = doc.splitTextToSize(`• Komunikasi: ${result.harmonizationTips.communicationAdvice}`, pageWidth - 36);
  doc.text(commText[0] || '', 18, y + 18);

  // Footer Disclaimer
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 280, pageWidth - 14, 280);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Dihitung berdasarkan Kaidah Kalender Hsia Surya Klasik (Li Chun) · BaZi by PENGGILAS · Seluruh Hak Dilindungi',
    pageWidth / 2,
    286,
    { align: 'center' }
  );

  const filename = `BaZi_PENGGILAS_Kecocokan_${sanitizeFilename(p1Name)}_${sanitizeFilename(p2Name)}.pdf`;
  doc.save(filename);
}
