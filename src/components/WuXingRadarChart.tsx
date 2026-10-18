import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { BaZiChart, ElementType } from '../types/bazi';

interface WuXingRadarChartProps {
  chart: BaZiChart;
}

interface RadarDataPoint {
  element: ElementType;
  name: string;
  char: string;
  pinyin: string;
  value: number; // percentage (0 - 100)
  score: number; // raw weighted score
  color: string;
  borderColor: string;
  isDayMaster: boolean;
  isYongShen: boolean;
  isXiShen: boolean;
  angle: number;
}

const ELEMENT_CONFIG: Record<
  ElementType,
  { name: string; char: string; pinyin: string; color: string; border: string; index: number }
> = {
  Fire: { name: 'Api', char: '火', pinyin: 'Huǒ', color: '#DC2626', border: '#E11D48', index: 0 },
  Earth: { name: 'Tanah', char: '土', pinyin: 'Tǔ', color: '#D97706', border: '#B45309', index: 1 },
  Metal: { name: 'Logam', char: '金', pinyin: 'Jīn', color: '#475569', border: '#334155', index: 2 },
  Water: { name: 'Air', char: '水', pinyin: 'Shuǐ', color: '#0284C7', border: '#0369A1', index: 3 },
  Wood: { name: 'Kayu', char: '木', pinyin: 'Mù', color: '#059669', border: '#047857', index: 4 },
};

export const WuXingRadarChart: React.FC<WuXingRadarChartProps> = ({ chart }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<RadarDataPoint | null>(null);
  const [showIdealBalance, setShowIdealBalance] = useState<boolean>(true);

  // Map elements into an ordered array of 5 points for the radar
  const data: RadarDataPoint[] = [
    'Fire',
    'Earth',
    'Metal',
    'Water',
    'Wood',
  ].map((elemKey, i) => {
    const elem = elemKey as ElementType;
    const cfg = ELEMENT_CONFIG[elem];
    const val = chart.elementDistribution[elem] || 0;
    const score = Math.round(chart.elementScores[elem] || 0);

    return {
      element: elem,
      name: cfg.name,
      char: cfg.char,
      pinyin: cfg.pinyin,
      value: val,
      score,
      color: cfg.color,
      borderColor: cfg.border,
      isDayMaster: chart.dayMaster.element === elem,
      isYongShen: chart.luckyElements.primaryYongShen === elem,
      isXiShen: chart.luckyElements.secondaryXiShen === elem,
      angle: (Math.PI * 2 * i) / 5 - Math.PI / 2, // 0 at top (Fire)
    };
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 360;
    const height = 360;
    const margin = 48;
    const radius = Math.min(width, height) / 2 - margin;
    const center = { x: width / 2, y: height / 2 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Container group
    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${center.x},${center.y})`);

    // Dynamic scale: max value with headroom (at least 45% or higher if max > 40%)
    const maxVal = Math.max(45, d3.max(data, (d) => d.value) || 45);
    const rScale = d3.scaleLinear().domain([0, maxVal]).range([0, radius]);

    // Grid levels (10%, 20%, 30%, 40%, etc.)
    const levels = [10, 20, 30, 40];
    if (maxVal > 45) levels.push(50);

    // Defs & subtle glow
    const defs = svg.append('defs');
    const glowFilter = defs
      .append('filter')
      .attr('id', 'd3-radar-glow')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');
    glowFilter
      .append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'blur');
    glowFilter
      .append('feComposite')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'blur')
      .attr('operator', 'over');

    // Concentric web / polygons (Light mode slate strokes)
    levels.forEach((level) => {
      const levelRadius = rScale(level);
      const points = data.map((d) => {
        const x = levelRadius * Math.cos(d.angle);
        const y = levelRadius * Math.sin(d.angle);
        return `${x},${y}`;
      });

      // Pentagon grid line
      g.append('polygon')
        .attr('points', points.join(' '))
        .attr('fill', level === 20 && showIdealBalance ? '#F59E0B' : 'none')
        .attr('fill-opacity', level === 20 && showIdealBalance ? 0.08 : 0)
        .attr('stroke', level === 20 && showIdealBalance ? '#D97706' : '#E2E8F0')
        .attr('stroke-width', level === 20 && showIdealBalance ? 1.6 : 1)
        .attr('stroke-dasharray', level === 20 && showIdealBalance ? '4 3' : '2 2')
        .attr('opacity', 1);

      // Level label along the top-right axis
      const labelAngle = data[1].angle;
      const lx = (levelRadius - 4) * Math.cos(labelAngle);
      const ly = (levelRadius - 4) * Math.sin(labelAngle);
      g.append('text')
        .attr('x', lx)
        .attr('y', ly)
        .attr('font-size', '9px')
        .attr('font-family', 'monospace')
        .attr('font-weight', '500')
        .attr('fill', level === 20 && showIdealBalance ? '#B45309' : '#94A3B8')
        .attr('text-anchor', 'middle')
        .text(`${level}%`);
    });

    // Radial axis lines from center to outer radius
    data.forEach((d) => {
      const x2 = radius * Math.cos(d.angle);
      const y2 = radius * Math.sin(d.angle);

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', 0)
        .attr('stroke', '#E2E8F0')
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', '3 3')
        .transition()
        .duration(450)
        .ease(d3.easeCubicOut)
        .attr('x2', x2)
        .attr('y2', y2);

      // Label at each axis endpoint
      const labelDist = radius + 22;
      const lx = labelDist * Math.cos(d.angle);
      const ly = labelDist * Math.sin(d.angle);

      const labelGroup = g
        .append('g')
        .attr('transform', `translate(${lx},${ly})`)
        .attr('class', 'cursor-pointer select-none')
        .attr('opacity', 0)
        .on('mouseenter', () => setHoveredPoint(d))
        .on('mouseleave', () => setHoveredPoint(null));

      labelGroup
        .transition()
        .delay(100)
        .duration(400)
        .attr('opacity', 1);

      // Chinese character
      labelGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('dy', '-5px')
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('font-family', "'Noto Serif TC', serif")
        .attr('fill', d.borderColor)
        .text(d.char);

      // Name & percentage
      labelGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('dy', '11px')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('fill', '#1E293B')
        .text(`${d.name} ${d.value}%`);
    });

    // Compute user polygon points
    const userPolygonPoints = data.map((d) => {
      const r = rScale(d.value);
      return [r * Math.cos(d.angle), r * Math.sin(d.angle)] as [number, number];
    });

    const polygonString = userPolygonPoints.map((p) => p.join(',')).join(' ');
    const zeroPolygon = data.map(() => '0,0').join(' ');

    // User Data Polygon Fill with smooth morph transition
    g.append('polygon')
      .attr('points', zeroPolygon)
      .attr('fill', '#D97706')
      .attr('fill-opacity', 0.22)
      .attr('stroke', '#D97706')
      .attr('stroke-width', 2.4)
      .attr('filter', 'url(#d3-radar-glow)')
      .transition()
      .duration(650)
      .ease(d3.easeCubicOut)
      .attr('points', polygonString);

    // Data points (Dots at vertices) with staggered entry
    userPolygonPoints.forEach((point, i) => {
      const d = data[i];
      const dotGroup = g
        .append('g')
        .attr('transform', 'translate(0,0)')
        .attr('opacity', 0)
        .attr('class', 'cursor-pointer')
        .on('mouseenter', () => setHoveredPoint(d))
        .on('mouseleave', () => setHoveredPoint(null));

      dotGroup
        .transition()
        .delay(150 + i * 50)
        .duration(600)
        .ease(d3.easeBackOut.overshoot(1.1))
        .attr('transform', `translate(${point[0]},${point[1]})`)
        .attr('opacity', 1);

      // Outer ring for key elements (DayMaster / YongShen)
      if (d.isYongShen) {
        dotGroup
          .append('circle')
          .attr('r', 8)
          .attr('fill', 'none')
          .attr('stroke', '#D97706')
          .attr('stroke-width', 1.8)
          .attr('stroke-dasharray', '2 2');
      }

      if (d.isDayMaster) {
        dotGroup
          .append('circle')
          .attr('r', 10)
          .attr('fill', 'none')
          .attr('stroke', '#2563EB')
          .attr('stroke-width', 1.8);
      }

      // Main dot with clean white border
      dotGroup
        .append('circle')
        .attr('r', 4.8)
        .attr('fill', d.borderColor)
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 2);
    });
  }, [chart, showIdealBalance]);

  const chartKey = `${chart.birthDate}_${chart.birthTime}_${chart.gender}`;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top control bar inside chart */}
      <div className="w-full flex items-center justify-between pb-3 text-xs">
        <span className="text-slate-600 font-semibold">Visualisasi Radar D3.js (Wu Xing)</span>
        <button
          onClick={() => setShowIdealBalance(!showIdealBalance)}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
            showIdealBalance
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900'
          }`}
        >
          {showIdealBalance ? '● Garis Ekuilibrium 20% Aktif' : '○ Tampilkan Garis 20% Ideal'}
        </button>
      </div>

      {/* SVG Canvas with Framer Motion Entry/Exit Transitions */}
      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={chartKey}
            initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 3 }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <svg ref={svgRef} className="w-full h-full overflow-visible" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hover Info / Status Box */}
      <motion.div
        layout
        className="w-full mt-3 min-h-[48px] p-3 rounded-xl border border-slate-200 bg-slate-50/80 text-xs text-slate-700 transition-all flex items-center justify-between shadow-2xs"
      >
        {hoveredPoint ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: hoveredPoint.borderColor }}
              />
              <span className="font-bold text-slate-900">
                {hoveredPoint.char} {hoveredPoint.name} ({hoveredPoint.pinyin}):
              </span>
              <span className="font-mono text-amber-700 font-bold tabular-nums">
                {hoveredPoint.value}%
              </span>
              <span className="text-[11px] text-slate-500">
                (Skor Bobot: {hoveredPoint.score} pts)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              {hoveredPoint.isDayMaster && (
                <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 font-semibold">
                  Day Master
                </span>
              )}
              {hoveredPoint.isYongShen && (
                <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-semibold">
                  Yong Shen
                </span>
              )}
              {hoveredPoint.isXiShen && (
                <span className="text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200 font-semibold">
                  Xi Shen
                </span>
              )}
              <span className="text-slate-500 font-medium">
                {hoveredPoint.value >= 30
                  ? 'Dominan'
                  : hoveredPoint.value <= 12
                  ? 'Defisit'
                  : 'Cukup'}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 text-center w-full">
            Arahkan kursor pada sudut atau label elemen untuk melihat analisis detail bobot.
          </div>
        )}
      </motion.div>
    </div>
  );
};
