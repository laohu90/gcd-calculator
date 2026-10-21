import React, { useMemo, useState } from 'react';
import { MathView } from './MathView';
import { Grid, Eye, Scissors } from 'lucide-react';

interface GeometricTilingViewProps {
  a: number;
  b: number;
  gcd: number;
}

export const GeometricTilingView: React.FC<GeometricTilingViewProps> = ({ a, b, gcd }) => {
  const [viewMode, setViewMode] = useState<'tiling' | 'euclideanCut'>('tiling');

  // Guard inputs to guarantee valid positive integers
  const safeA = Math.max(1, Math.floor(Math.abs(a)));
  const safeB = Math.max(1, Math.floor(Math.abs(b)));
  const safeGcd = Math.max(1, Math.floor(Math.abs(gcd)));

  // Guard for huge values to keep SVG responsive
  const maxDisplayable = 120;
  const isScaleTooLarge = safeA > maxDisplayable || safeB > maxDisplayable;

  // Compute number of tiles along width & height
  const tilesX = Math.round(safeA / safeGcd);
  const tilesY = Math.round(safeB / safeGcd);
  const totalTiles = tilesX * tilesY;

  // Generate recursive square cuts for Euclidean geometric visualization
  const euclideanCuts = useMemo(() => {
    let w = safeA;
    let h = safeB;
    const cuts: { x: number; y: number; size: number; count: number; color: string }[] = [];
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
    let colorIdx = 0;

    let curX = 0;
    let curY = 0;

    while (w > 0 && h > 0 && cuts.length < 20) {
      if (w >= h) {
        const count = Math.floor(w / h);
        for (let i = 0; i < count; i++) {
          cuts.push({
            x: curX + i * h,
            y: curY,
            size: h,
            count: 1,
            color: colors[colorIdx % colors.length],
          });
        }
        curX += count * h;
        w = w % h;
      } else {
        const count = Math.floor(h / w);
        for (let i = 0; i < count; i++) {
          cuts.push({
            x: curX,
            y: curY + i * w,
            size: w,
            count: 1,
            color: colors[colorIdx % colors.length],
          });
        }
        curY += count * w;
        h = h % w;
      }
      colorIdx++;
    }

    return cuts;
  }, [safeA, safeB]);

  return (
    <div className="space-y-6">
      {/* View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h4 className="font-semibold text-slate-800 text-sm">
            几何直观：为什么最大公约数是“最大正方形铺砖边长”？
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            长方形尺寸为 {a} × {b}，用边长为 {gcd} 的正方形地砖可严丝合缝完全铺满。
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('tiling')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'tiling'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>网格铺砖视图</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('euclideanCut')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'euclideanCut'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>欧几里得正方形切分法</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="bg-slate-900 rounded-xl p-4 sm:p-6 text-slate-100 flex flex-col items-center justify-center min-h-[300px] border border-slate-800">
        {isScaleTooLarge && viewMode === 'tiling' ? (
          <div className="text-center p-6 space-y-3">
            <p className="text-amber-300 font-medium text-sm">
              当前数值较大 ({a} × {b})，全部微小网格渲染会降低性能。
            </p>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              建议切换至右上角「欧几里得正方形切分法」查看宏观几何切分，或在上方输入较小数字（如 24 与 18、36 与 24）体验精细铺砖。
            </p>
          </div>
        ) : (
          <div className="w-full max-w-xl">
            {viewMode === 'tiling' ? (
              <svg
                viewBox={`0 0 ${Math.max(safeA, 100)} ${Math.max(safeB, 80)}`}
                className="w-full h-auto max-h-[340px] border border-slate-700 rounded-lg bg-slate-950/60 shadow"
              >
                {/* Tiling pattern */}
                <defs>
                  <pattern
                    id="tileGrid"
                    width={safeGcd}
                    height={safeGcd}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      width={safeGcd}
                      height={safeGcd}
                      fill="#1e1b4b"
                      stroke="#4338ca"
                      strokeWidth={Math.max(0.2, safeGcd / 30)}
                    />
                  </pattern>
                </defs>

                <rect width={safeA} height={safeB} fill="url(#tileGrid)" />

                {/* Dimension annotations */}
                <text
                  x={safeA / 2}
                  y={safeB / 2}
                  fill="#c7d2fe"
                  fontSize={Math.max(6, Math.min(safeA, safeB) / 7)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="bold"
                  opacity={0.8}
                >
                  {tilesX} × {tilesY} = {totalTiles} 块砖
                </text>
              </svg>
            ) : (
              <svg
                viewBox={`0 0 ${safeA} ${safeB}`}
                className="w-full h-auto max-h-[340px] border border-slate-700 rounded-lg bg-slate-950/60 shadow"
              >
                {euclideanCuts.map((cut, idx) => (
                  <g key={idx}>
                    <rect
                      x={cut.x}
                      y={cut.y}
                      width={cut.size}
                      height={cut.size}
                      fill={cut.color}
                      fillOpacity="0.25"
                      stroke={cut.color}
                      strokeWidth={Math.max(0.5, Math.min(a, b) / 80)}
                    />
                    <text
                      x={cut.x + cut.size / 2}
                      y={cut.y + cut.size / 2}
                      fill={cut.color}
                      fontSize={Math.max(5, cut.size / 3.5)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontWeight="bold"
                    >
                      {cut.size}²
                    </text>
                  </g>
                ))}
              </svg>
            )}
          </div>
        )}

        {/* Legend / Metrics */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl text-center text-xs">
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-slate-400 block">长方形宽 (A)</span>
            <span className="font-mono font-bold text-slate-100 text-sm">{a}</span>
          </div>
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-slate-400 block">长方形高 (B)</span>
            <span className="font-mono font-bold text-slate-100 text-sm">{b}</span>
          </div>
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-indigo-300 block">地砖边长 (GCD)</span>
            <span className="font-mono font-bold text-indigo-400 text-sm">{gcd}</span>
          </div>
          <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
            <span className="text-amber-300 block">所需正方形总数</span>
            <span className="font-mono font-bold text-amber-400 text-sm">{totalTiles} 块</span>
          </div>
        </div>
      </div>

      {/* Practical Application Explanatory Card */}
      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2 text-xs sm:text-sm text-slate-700">
        <div className="font-semibold text-indigo-950 flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-600" />
          <span>小学奥数经典场景：裁纸与地砖问题</span>
        </div>
        <p className="leading-relaxed">
          题目形式：“有一张长 {a} 厘米、宽 {b} 厘米的长方形纸板，要把它裁成若干同样大小的正方形纸片，且纸片边长为整厘米数，没有剩余。纸片的边长最大是多少？一共能裁多少张？”
        </p>
        <div className="bg-white p-2.5 rounded-lg border border-indigo-150 font-mono text-indigo-900 text-xs">
          解法：正方形最大边长 = <MathView math={`\\gcd(${a}, ${b}) = ${gcd}`} /> 厘米；
          纸片总张数 = <MathView math={`(${a} \\div ${gcd}) \\times (${b} \\div ${gcd}) = ${tilesX} \\times ${tilesY} = ${totalTiles}`} /> 张。
        </div>
      </div>
    </div>
  );
};
