import React, { useState, useMemo } from 'react';
import { calculateRealWorldScenarios } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { MathView } from './MathView';
import { LayoutGrid, Gift, Scissors, Timer, ArrowRight, Check } from 'lucide-react';

interface RealWorldScenariosProps {
  initialA?: number;
  initialB?: number;
  lang?: Language;
}

export const RealWorldScenarios: React.FC<RealWorldScenariosProps> = ({
  initialA = 48,
  initialB = 72,
  lang = 'en',
}) => {
  const [valA, setValA] = useState<number>(initialA);
  const [valB, setValB] = useState<number>(initialB);
  const [activeScenario, setActiveScenario] = useState<
    'tiling' | 'giftBags' | 'cutting' | 'runners'
  >('tiling');

  const res = useMemo(
    () => calculateRealWorldScenarios(valA, valB),
    [valA, valB]
  );

  const labels = {
    en: {
      title: 'Real-World Word Problems & Applications (GCD & LCM in Daily Life)',
      sub: 'Explore how Greatest Common Divisor and Least Common Multiple solve practical engineering, packing, logistics, and scheduling problems.',
      tabTiling: 'Square Tiling Problem',
      tabGifts: 'Gift Bag Packaging',
      tabCutting: 'Ribbon / Plank Cutting',
      tabRunners: 'Cycle Synchronization',
      paramA: 'Dimension / Quantity A',
      paramB: 'Dimension / Quantity B',
      solutionTitle: 'Mathematical Resolution & Explanation',
    },
    zh: {
      title: '生活与工程实际应用场景（GCD & LCM 经典应用题）',
      sub: '探究最大公约数与最小公倍数在房间地砖铺设、物品无余数平分打包、长木料等长切分及多周期同步相遇中的实际解法。',
      tabTiling: '方砖无缝铺地问题',
      tabGifts: '礼品袋平均分发',
      tabCutting: '彩带/木料最长切分',
      tabRunners: '跑道圈数与周期同步',
      paramA: '参数 / 数量 A',
      paramB: '参数 / 数量 B',
      solutionTitle: '应用题标准解析与图解推导',
    },
    es: {
      title: 'Problemas Reales y Aplicaciones Cotidianas (MCD y MCM)',
      sub: 'Descubre cómo el MCD y el MCM resuelven problemas de embalaje, corte de materiales y sincronización.',
      tabTiling: 'Embaldosado de Suelos',
      tabGifts: 'Bolsas de Regalo',
      tabCutting: 'Corte de Tablas/Cintas',
      tabRunners: 'Sincronización de Ciclos',
      paramA: 'Medida / Cantidad A',
      paramB: 'Medida / Cantidad B',
      solutionTitle: 'Resolución y Explicación Paso a Paso',
    },
    fr: {
      title: 'Problèmes Pratiques et Applications Réelles (PGCD & PPCM)',
      sub: 'Comment le PGCD et le PPCM résolvent le carrelage optimal, le découpage de rubans et la synchronisation cyclique.',
      tabTiling: 'Carrelage Optimal',
      tabGifts: 'Sachets Cadeaux',
      tabCutting: 'Découpage de Tringles',
      tabRunners: 'Synchronisation de Pistes',
      paramA: 'Quantité A',
      paramB: 'Quantité B',
      solutionTitle: 'Résolution Mathématique & Analyse',
    },
    pt: {
      title: 'Problemas Práticos e Aplicações Reais (MDC & MMC)',
      sub: 'Descubra como o MDC e o MMC resolvem problemas práticos de ladrilhamento, embalagem e ciclos simultâneos.',
      tabTiling: 'Ladrilhamento de Pisos',
      tabGifts: 'Montagem de Brindes',
      tabCutting: 'Corte de Fitas/Madeira',
      tabRunners: 'Sincronização de Voltas',
      paramA: 'Medida A',
      paramB: 'Medida B',
      solutionTitle: 'Resolução e Análise Completa',
    },
  }[lang];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-indigo-600" />
          <span>{labels.title}</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">{labels.sub}</p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveScenario('tiling')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeScenario === 'tiling'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{labels.tabTiling}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveScenario('giftBags')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeScenario === 'giftBags'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>{labels.tabGifts}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveScenario('cutting')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeScenario === 'cutting'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>{labels.tabCutting}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveScenario('runners')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeScenario === 'runners'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>{labels.tabRunners}</span>
        </button>
      </div>

      {/* Interactive Controls & Scenario Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4">
          <div className="text-xs font-bold text-slate-800">Parameters:</div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-600 mb-1">
                {activeScenario === 'tiling'
                  ? 'Room Length (A):'
                  : activeScenario === 'giftBags'
                  ? 'Total Apples / Item 1 (A):'
                  : activeScenario === 'cutting'
                  ? 'First Ribbon Length (A):'
                  : 'Runner A Lap Time (sec):'}
              </label>
              <input
                type="number"
                min="1"
                max="50000"
                value={valA}
                onChange={(e) => setValA(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">
                {activeScenario === 'tiling'
                  ? 'Room Width (B):'
                  : activeScenario === 'giftBags'
                  ? 'Total Oranges / Item 2 (B):'
                  : activeScenario === 'cutting'
                  ? 'Second Ribbon Length (B):'
                  : 'Runner B Lap Time (sec):'}
              </label>
              <input
                type="number"
                min="1"
                max="50000"
                value={valB}
                onChange={(e) => setValB(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
            <div className="text-slate-500">Core Math Values:</div>
            <div className="font-mono font-bold text-slate-900 flex justify-between">
              <span>GCD(A, B):</span>
              <span className="text-indigo-600">{res.gcd}</span>
            </div>
            <div className="font-mono font-bold text-slate-900 flex justify-between">
              <span>LCM(A, B):</span>
              <span className="text-indigo-600">{res.lcm}</span>
            </div>
          </div>
        </div>

        {/* Right Output: Interactive Visualization & Solution (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Scenario 1: Tiling */}
          {activeScenario === 'tiling' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Floor Tiling with Largest Square Tiles (地砖铺砖问题)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Problem: You have a rectangular floor measuring {valA} × {valB}. What is the
                    largest square tile size that can cover the entire floor without cutting?
                  </p>
                </div>
              </div>

              {/* Key Results Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-indigo-50/70 border border-indigo-150 rounded-lg text-center">
                  <div className="text-[11px] text-indigo-700 font-semibold">Max Tile Size</div>
                  <div className="text-xl font-black font-mono text-indigo-950 mt-0.5">
                    {res.tiling.tileSize} × {res.tiling.tileSize}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-600 font-semibold">Tiles on Length</div>
                  <div className="text-xl font-black font-mono text-slate-900 mt-0.5">
                    {res.tiling.tilesWide}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-600 font-semibold">Tiles on Width</div>
                  <div className="text-xl font-black font-mono text-slate-900 mt-0.5">
                    {res.tiling.tilesHigh}
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                  <div className="text-[11px] text-emerald-800 font-semibold">Total Tiles</div>
                  <div className="text-xl font-black font-mono text-emerald-950 mt-0.5">
                    {res.tiling.totalTiles}
                  </div>
                </div>
              </div>

              {/* Visual Tiling Preview */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-semibold text-slate-600">
                  Floor Grid Representation ({res.tiling.tilesWide} cols × {res.tiling.tilesHigh}{' '}
                  rows = {res.tiling.totalTiles} squares of {res.tiling.tileSize}×
                  {res.tiling.tileSize}):
                </div>
                <div
                  className="grid gap-1 bg-white p-3 rounded-lg border border-slate-200 max-h-48 overflow-auto"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(res.tiling.tilesWide, 20)}, minmax(14px, 1fr))`,
                  }}
                >
                  {Array.from({
                    length: Math.min(res.tiling.totalTiles, 100),
                  }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-indigo-100 hover:bg-indigo-300 transition-colors rounded-xs border border-indigo-200 flex items-center justify-center text-[9px] text-indigo-700 font-mono"
                    >
                      {res.tiling.tileSize}
                    </div>
                  ))}
                </div>
                {res.tiling.totalTiles > 100 && (
                  <div className="text-[11px] text-slate-400 text-center">
                    (Showing first 100 of {res.tiling.totalTiles} tiles for performance)
                  </div>
                )}
              </div>

              {/* Step by step text */}
              <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">Step-by-Step Mathematical Proof:</div>
                <p>
                  1. A square tile must divide both the length ({valA}) and the width ({valB}) evenly
                  without any fractional cuts. Therefore, the tile side length must be a common
                  divisor of {valA} and {valB}.
                </p>
                <p>
                  2. To minimize the number of tiles, we maximize the tile size, which is the{' '}
                  <span className="font-semibold text-indigo-700">Greatest Common Divisor</span>:
                  gcd({valA}, {valB}) = {res.gcd}.
                </p>
                <p>
                  3. Total number of tiles needed = ({valA} ÷ {res.gcd}) × ({valB} ÷ {res.gcd}) ={' '}
                  {res.tiling.tilesWide} × {res.tiling.tilesHigh} ={' '}
                  <span className="font-semibold text-indigo-700">{res.tiling.totalTiles}</span>{' '}
                  tiles.
                </p>
              </div>
            </div>
          )}

          {/* Scenario 2: Gift Bags */}
          {activeScenario === 'giftBags' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Even Gift Packaging Problem (礼包无余数平分问题)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Problem: You have {valA} apples (Item A) and {valB} oranges (Item B). What is the
                  maximum number of identical gift packages you can make with zero leftovers?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-indigo-50/70 border border-indigo-150 rounded-lg text-center">
                  <div className="text-[11px] text-indigo-700 font-semibold">
                    Maximum Gift Bags (GCD)
                  </div>
                  <div className="text-2xl font-black font-mono text-indigo-950 mt-0.5">
                    {res.giftBags.totalBags}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-600 font-semibold">Item A per Bag</div>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">
                    {res.giftBags.itemsAperBag}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-600 font-semibold">Item B per Bag</div>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">
                    {res.giftBags.itemsBperBag}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900">Solution:</div>
                <p>
                  To make identical packages, the number of packages must divide {valA} and {valB}.
                  The maximum possible count is{' '}
                  <span className="font-bold text-indigo-700">
                    gcd({valA}, {valB}) = {res.giftBags.totalBags} bags
                  </span>
                  .
                </p>
                <p>
                  Each package will contain exactly {valA} ÷ {res.gcd} ={' '}
                  <span className="font-bold">{res.giftBags.itemsAperBag}</span> of Item A, and{' '}
                  {valB} ÷ {res.gcd} ={' '}
                  <span className="font-bold">{res.giftBags.itemsBperBag}</span> of Item B.
                </p>
              </div>
            </div>
          )}

          {/* Scenario 3: Cutting */}
          {activeScenario === 'cutting' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Ribbon / Wood Plank Cutting (木料/彩带等长切割)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Problem: You have two ribbons of lengths {valA} cm and {valB} cm. You want to cut
                  both ribbons into equal pieces of the longest possible length without waste.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-indigo-50/70 border border-indigo-150 rounded-lg text-center">
                  <div className="text-[11px] text-indigo-700 font-semibold">
                    Longest Piece Length (GCD)
                  </div>
                  <div className="text-2xl font-black font-mono text-indigo-950 mt-0.5">
                    {res.cutting.maxPieceLength} cm
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-600 font-semibold">Pieces from A</div>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">
                    {res.cutting.piecesA}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-600 font-semibold">Pieces from B</div>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">
                    {res.cutting.piecesB}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-900">Total Pieces Produced:</div>
                <div className="text-slate-700">
                  {res.cutting.piecesA} + {res.cutting.piecesB} ={' '}
                  <span className="font-bold text-indigo-700">{res.cutting.totalPieces} pieces</span>{' '}
                  of length {res.cutting.maxPieceLength} cm.
                </div>
              </div>
            </div>
          )}

          {/* Scenario 4: Runners / LCM Cycle */}
          {activeScenario === 'runners' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Track Lap Synchronization (LCM 跑道圈数与周期相遇)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Problem: Runner A completes a lap in {valA} seconds, and Runner B completes a lap
                  in {valB} seconds. If they start together, after how many seconds will they meet
                  again at the starting line?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-indigo-50/70 border border-indigo-150 rounded-lg text-center">
                  <div className="text-[11px] text-indigo-700 font-semibold">
                    First Meet Time (LCM)
                  </div>
                  <div className="text-2xl font-black font-mono text-indigo-950 mt-0.5">
                    {res.runners.syncTimeSeconds} s
                  </div>
                  <div className="text-[10px] text-slate-500">
                    ≈ {(res.runners.syncTimeSeconds / 60).toFixed(1)} mins
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-600 font-semibold">Runner A Laps</div>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">
                    {res.runners.lapsA}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                  <div className="text-[11px] text-slate-600 font-semibold">Runner B Laps</div>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">
                    {res.runners.lapsB}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-900">LCM Principle:</div>
                <p>
                  Runner A returns to start at times: {valA}, {valA * 2}, {valA * 3}... (multiples
                  of {valA}).
                </p>
                <p>
                  Runner B returns to start at times: {valB}, {valB * 2}, {valB * 3}... (multiples
                  of {valB}).
                </p>
                <p>
                  The first common time is the{' '}
                  <span className="font-bold text-indigo-700">Least Common Multiple</span>: lcm(
                  {valA}, {valB}) = {res.lcm} seconds.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
