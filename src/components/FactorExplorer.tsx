import React, { useState, useMemo } from 'react';
import {
  getDivisors,
  getFactorPairs,
  getDivisibilityRules,
  generateHomeworkText,
  isPrime,
} from '../utils/mathEngine';
import { MathView } from './MathView';
import {
  FileCheck,
  Check,
  Copy,
  Table,
  Sparkles,
  HelpCircle,
  Scissors,
  Gift,
  TreePine,
  Bus,
} from 'lucide-react';

interface FactorExplorerProps {
  a: number;
  b: number;
  gcd: number;
  lcm: number;
  lang: 'zh' | 'en';
}

export const FactorExplorer: React.FC<FactorExplorerProps> = ({
  a,
  b,
  gcd,
  lcm,
  lang,
}) => {
  const isZh = lang === 'zh';
  const [copiedHomework, setCopiedHomework] = useState(false);
  const [scenario, setScenario] = useState<'paper' | 'gift' | 'tree' | 'bus'>('paper');

  const safeA = Math.max(1, Math.floor(Math.abs(a)));
  const safeB = Math.max(1, Math.floor(Math.abs(b)));

  // Divisors
  const divisorsA = useMemo(() => getDivisors(safeA), [safeA]);
  const divisorsB = useMemo(() => getDivisors(safeB), [safeB]);
  const factorPairsA = useMemo(() => getFactorPairs(safeA), [safeA]);
  const factorPairsB = useMemo(() => getFactorPairs(safeB), [safeB]);

  // Divisibility rules
  const rulesA = useMemo(() => getDivisibilityRules(safeA), [safeA]);
  const rulesB = useMemo(() => getDivisibilityRules(safeB), [safeB]);

  // Homework writeup
  const homeworkText = useMemo(() => {
    return generateHomeworkText(safeA, safeB, gcd, lcm, lang);
  }, [safeA, safeB, gcd, lcm, lang]);

  const handleCopyHomework = () => {
    navigator.clipboard.writeText(homeworkText);
    setCopiedHomework(true);
    setTimeout(() => setCopiedHomework(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Standard Written Homework Solution Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {isZh ? '中小学作业标准答题规范范本 (可直接复制作答)' : 'Standard Homework Solution Template'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleCopyHomework}
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copiedHomework ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">{isZh ? '已复制范文' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isZh ? '一键复制标准答题' : 'Copy Solution'}</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
          {homeworkText}
        </pre>
      </div>

      {/* 2. All Factors & Factor Pairs Comparison Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs uppercase tracking-wider">
          <Table className="w-4 h-4" />
          <span>{isZh ? '因数全集与乘积因数对速查' : 'Complete Factor Pairs Table'}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
          {isZh ? `${safeA} 与 ${safeB} 的全部因数与因数对对比` : `Divisors & Factor Pairs for ${safeA} and ${safeB}`}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Number A */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm font-mono">{safeA} 的因数</span>
              <span className="text-[11px] text-slate-500">
                {isPrime(safeA) ? (isZh ? '质数 (素数)' : 'Prime') : (isZh ? `共 ${divisorsA.length} 个因数` : `${divisorsA.length} factors`)}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {divisorsA.map((d) => {
                const isShared = divisorsB.includes(d);
                const isGCD = d === gcd;
                return (
                  <span
                    key={d}
                    className={`px-2 py-0.5 rounded font-mono text-xs ${
                      isGCD
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : isShared
                        ? 'bg-indigo-100 text-indigo-800 font-semibold'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {d}
                    {isGCD ? ' (最大)' : ''}
                  </span>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600 font-mono text-[11px]">
              <div className="font-sans font-semibold text-slate-700 text-xs">因数对列表：</div>
              <div className="flex flex-wrap gap-2">
                {factorPairsA.map(([x, y], idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    {x} × {y} = {safeA}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Number B */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm font-mono">{safeB} 的因数</span>
              <span className="text-[11px] text-slate-500">
                {isPrime(safeB) ? (isZh ? '质数 (素数)' : 'Prime') : (isZh ? `共 ${divisorsB.length} 个因数` : `${divisorsB.length} factors`)}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {divisorsB.map((d) => {
                const isShared = divisorsA.includes(d);
                const isGCD = d === gcd;
                return (
                  <span
                    key={d}
                    className={`px-2 py-0.5 rounded font-mono text-xs ${
                      isGCD
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : isShared
                        ? 'bg-indigo-100 text-indigo-800 font-semibold'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {d}
                    {isGCD ? ' (最大)' : ''}
                  </span>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600 font-mono text-[11px]">
              <div className="font-sans font-semibold text-slate-700 text-xs">因数对列表：</div>
              <div className="flex flex-wrap gap-2">
                {factorPairsB.map(([x, y], idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    {x} × {y} = {safeB}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Divisibility Rules Diagnostic Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>{isZh ? '中小学数论重点：常见整除特征诊断 (2, 3, 4, 5, 6, 8, 9, 10, 11)' : 'Divisibility Rules Checker'}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
          {isZh ? '数字整除性与判定理由全解析' : 'Live Divisibility Test Results'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">除数</th>
                <th className="py-2.5 px-3 font-mono">{safeA} 是否整除</th>
                <th className="py-2.5 px-3 font-mono">{safeB} 是否整除</th>
                <th className="py-2.5 px-3">{isZh ? '判定原理与速查法则' : 'Divisibility Rule Explanation'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {rulesA.map((rA, idx) => {
                const rB = rulesB[idx];
                return (
                  <tr key={rA.divisor} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3 font-bold text-slate-800">
                      {isZh ? rA.ruleNameZh : rA.ruleNameEn}
                    </td>
                    <td className="py-2 px-3">
                      {rA.divisible ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
                          ✓ 能整除
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[11px]">
                          ✗ 否
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {rB.divisible ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
                          ✓ 能整除
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[11px]">
                          ✗ 否
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-slate-600 font-sans text-xs">
                      {isZh ? rA.reasonZh : rA.reasonEn}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Olympiad Real-World Word Problem Solver */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>{isZh ? '小学奥数应用题求解器' : 'Word Problem Solver'}</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
              {isZh ? '4 大经典真题情境一键反推' : '4 Classic Olympiad Scenarios'}
            </h3>
          </div>

          <div className="flex items-center flex-wrap gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setScenario('paper')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                scenario === 'paper' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              <Scissors className="w-3 h-3" />
              <span>{isZh ? '裁纸铺砖' : 'Tiling'}</span>
            </button>
            <button
              type="button"
              onClick={() => setScenario('gift')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                scenario === 'gift' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              <Gift className="w-3 h-3" />
              <span>{isZh ? '分发文具' : 'Distribute'}</span>
            </button>
            <button
              type="button"
              onClick={() => setScenario('tree')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                scenario === 'tree' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              <TreePine className="w-3 h-3" />
              <span>{isZh ? '等距植树' : 'Trees'}</span>
            </button>
            <button
              type="button"
              onClick={() => setScenario('bus')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                scenario === 'bus' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              <Bus className="w-3 h-3" />
              <span>{isZh ? '公交相遇' : 'Buses'}</span>
            </button>
          </div>
        </div>

        {/* Scenario Answer Box */}
        <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs sm:text-sm text-slate-700">
          {scenario === 'paper' && (
            <div>
              <p className="font-semibold text-indigo-950">
                【裁纸/铺砖问题】：有一张长 {safeA} 厘米、宽 {safeB} 厘米的长方形纸板，要裁成同样大小的正方形且没有剩余。
              </p>
              <div className="mt-2 p-3 bg-white rounded-lg border border-indigo-150 font-mono text-indigo-900 space-y-1">
                <div>① 正方形最大边长 = gcd({safeA}, {safeB}) = <strong className="text-base text-indigo-700 font-bold">{gcd}</strong> 厘米</div>
                <div>② 可裁总张数 = ({safeA} ÷ {gcd}) × ({safeB} ÷ {gcd}) = {safeA / gcd} × {safeB / gcd} = <strong className="text-base text-amber-600 font-bold">{(safeA / gcd) * (safeB / gcd)}</strong> 张</div>
              </div>
            </div>
          )}

          {scenario === 'gift' && (
            <div>
              <p className="font-semibold text-indigo-950">
                【物品均分问题】：老师有 {safeA} 支钢笔和 {safeB} 本笔记本，全部平均奖给优秀学生且刚好分完。
              </p>
              <div className="mt-2 p-3 bg-white rounded-lg border border-indigo-150 font-mono text-indigo-900 space-y-1">
                <div>① 最多可以奖励人数 = gcd({safeA}, {safeB}) = <strong className="text-base text-indigo-700 font-bold">{gcd}</strong> 人</div>
                <div>② 每名学生分得：钢笔 {safeA} ÷ {gcd} = <strong className="text-indigo-700 font-bold">{safeA / gcd}</strong> 支，笔记本 {safeB} ÷ {gcd} = <strong className="text-indigo-700 font-bold">{safeB / gcd}</strong> 本</div>
              </div>
            </div>
          )}

          {scenario === 'tree' && (
            <div>
              <p className="font-semibold text-indigo-950">
                【等距植树问题】：两条道路长度分别为 {safeA} 米与 {safeB} 米，要在两旁以相同的最大整数间距植树（端点必须植树）。
              </p>
              <div className="mt-2 p-3 bg-white rounded-lg border border-indigo-150 font-mono text-indigo-900 space-y-1">
                <div>① 树木最大相邻间距 = gcd({safeA}, {safeB}) = <strong className="text-base text-indigo-700 font-bold">{gcd}</strong> 米</div>
                <div>② 两路段各需树苗 = ({safeA} ÷ {gcd} + 1) + ({safeB} ÷ {gcd} + 1) = <strong className="text-base text-amber-600 font-bold">{safeA / gcd + 1 + (safeB / gcd + 1)}</strong> 棵</div>
              </div>
            </div>
          )}

          {scenario === 'bus' && (
            <div>
              <p className="font-semibold text-indigo-950">
                【周期相遇问题】：1路车每隔 {safeA} 分钟发一趟，2路车每隔 {safeB} 分钟发一趟。早晨 7:00 同时发车。
              </p>
              <div className="mt-2 p-3 bg-white rounded-lg border border-indigo-150 font-mono text-indigo-900 space-y-1">
                <div>① 下次再次同时发车的时间间隔 = lcm({safeA}, {safeB}) = <strong className="text-base text-amber-600 font-bold">{lcm}</strong> 分钟 ({Math.floor(lcm / 60)}小时{lcm % 60}分钟后)</div>
                <div>② 期间1路车共发 = {lcm} ÷ {safeA} = <strong className="text-indigo-700 font-bold">{lcm / safeA}</strong> 次；2路车发 = {lcm} ÷ {safeB} = <strong className="text-indigo-700 font-bold">{lcm / safeB}</strong> 次</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
