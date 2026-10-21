import React, { useMemo } from 'react';
import { getPrimeFactorization, formatPrimeFactors, PrimeFactor } from '../utils/mathEngine';
import { MathView } from './MathView';
import { Layers } from 'lucide-react';

interface PrimeFactorViewProps {
  a: number;
  b: number;
}

export const PrimeFactorView: React.FC<PrimeFactorViewProps> = ({ a, b }) => {
  const factorsA = useMemo(() => getPrimeFactorization(a), [a]);
  const factorsB = useMemo(() => getPrimeFactorization(b), [b]);

  // Expand into array of prime tokens: e.g., 2^3 => [2, 2, 2]
  const listA = useMemo(() => {
    const res: number[] = [];
    factorsA.forEach((f) => {
      for (let i = 0; i < f.exponent; i++) res.push(f.prime);
    });
    return res;
  }, [factorsA]);

  const listB = useMemo(() => {
    const res: number[] = [];
    factorsB.forEach((f) => {
      for (let i = 0; i < f.exponent; i++) res.push(f.prime);
    });
    return res;
  }, [factorsB]);

  // Compute Venn partition (shared, only A, only B)
  const { sharedPrimes, onlyA, onlyB, gcdVal, lcmVal } = useMemo(() => {
    const shared: number[] = [];
    const bCopy = [...listB];
    const aRemaining: number[] = [];

    listA.forEach((num) => {
      const idx = bCopy.indexOf(num);
      if (idx !== -1) {
        shared.push(num);
        bCopy.splice(idx, 1);
      } else {
        aRemaining.push(num);
      }
    });

    const g = shared.reduce((acc, v) => acc * v, 1);
    const l = g * aRemaining.reduce((acc, v) => acc * v, 1) * bCopy.reduce((acc, v) => acc * v, 1);

    return {
      sharedPrimes: shared,
      onlyA: aRemaining,
      onlyB: bCopy,
      gcdVal: g,
      lcmVal: l,
    };
  }, [listA, listB]);

  // All distinct primes
  const allPrimes = useMemo(() => {
    const set = new Set<number>();
    factorsA.forEach((f) => set.add(f.prime));
    factorsB.forEach((f) => set.add(f.prime));
    return Array.from(set).sort((x, y) => x - y);
  }, [factorsA, factorsB]);

  const primeExponentsComparison = useMemo(() => {
    return allPrimes.map((p) => {
      const expA = factorsA.find((f) => f.prime === p)?.exponent || 0;
      const expB = factorsB.find((f) => f.prime === p)?.exponent || 0;
      const minExp = Math.min(expA, expB);
      const maxExp = Math.max(expA, expB);
      return { p, expA, expB, minExp, maxExp };
    });
  }, [allPrimes, factorsA, factorsB]);

  return (
    <div className="space-y-6">
      {/* Prime factor canonical forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
          <div className="text-xs text-slate-500 font-semibold">数字 A 的标准分解式</div>
          <div className="text-lg font-mono text-indigo-900 font-bold">
            <MathView math={`${a} = ${formatPrimeFactors(factorsA)}`} />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {listA.map((p, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
          <div className="text-xs text-slate-500 font-semibold">数字 B 的标准分解式</div>
          <div className="text-lg font-mono text-emerald-900 font-bold">
            <MathView math={`${b} = ${formatPrimeFactors(factorsB)}`} />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {listB.map((p, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Venn Diagram Visualizer */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h4 className="font-semibold text-sm">质因数韦恩图 (Venn Diagram) 集合分解</h4>
          </div>
          <span className="text-xs text-slate-400">交集为 GCD · 并集为 LCM</span>
        </div>

        <div className="relative max-w-xl mx-auto py-6">
          <svg viewBox="0 0 600 300" className="w-full h-auto select-none">
            {/* Left Circle A */}
            <circle
              cx="240"
              cy="150"
              r="130"
              fill="#6366f1"
              fillOpacity="0.22"
              stroke="#818cf8"
              strokeWidth="2.5"
            />
            {/* Right Circle B */}
            <circle
              cx="360"
              cy="150"
              r="130"
              fill="#10b981"
              fillOpacity="0.22"
              stroke="#34d399"
              strokeWidth="2.5"
            />

            {/* Labels */}
            <text x="160" y="55" fill="#c7d2fe" fontSize="16" fontWeight="bold">
              {a} 专属因数
            </text>
            <text x="380" y="55" fill="#a7f3d0" fontSize="16" fontWeight="bold">
              {b} 专属因数
            </text>
            <text x="300" y="45" fill="#fef08a" fontSize="14" fontWeight="bold" textAnchor="middle">
              交集 ∩ (公有因数)
            </text>

            {/* Elements inside A only */}
            <foreignObject x="135" y="80" width="100" height="140">
              <div className="flex flex-wrap gap-1.5 justify-center items-center h-full p-2 text-indigo-200 font-mono text-sm">
                {onlyA.length > 0 ? (
                  onlyA.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-indigo-950/80 border border-indigo-400/30 rounded"
                    >
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">无</span>
                )}
              </div>
            </foreignObject>

            {/* Elements inside Shared (Intersection) */}
            <foreignObject x="255" y="70" width="90" height="160">
              <div className="flex flex-wrap gap-1.5 justify-center items-center h-full p-1 text-amber-300 font-mono text-sm font-bold">
                {sharedPrimes.length > 0 ? (
                  sharedPrimes.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-amber-950/80 border border-amber-400/50 rounded shadow"
                    >
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">互质(1)</span>
                )}
              </div>
            </foreignObject>

            {/* Elements inside B only */}
            <foreignObject x="365" y="80" width="100" height="140">
              <div className="flex flex-wrap gap-1.5 justify-center items-center h-full p-2 text-emerald-200 font-mono text-sm">
                {onlyB.length > 0 ? (
                  onlyB.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-400/30 rounded"
                    >
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">无</span>
                )}
              </div>
            </foreignObject>
          </svg>
        </div>

        {/* Math results extracted from Venn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm mt-2">
          <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700">
            <span className="text-indigo-300 font-semibold block mb-1">
              最大公约数 (韦恩图中间交集之积)：
            </span>
            <div className="font-mono text-amber-300 font-bold">
              {sharedPrimes.length > 0 ? `${sharedPrimes.join(' × ')} = ${gcdVal}` : '1 (两数互质)'}
            </div>
          </div>
          <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700">
            <span className="text-emerald-300 font-semibold block mb-1">
              最小公倍数 (韦恩图全集所有数字之积)：
            </span>
            <div className="font-mono text-emerald-300 font-bold">
              {[...onlyA, ...sharedPrimes, ...onlyB].join(' × ')} = {lcmVal}
            </div>
          </div>
        </div>
      </div>

      {/* Exponents Comparison Table (min / max rules) */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
        <h4 className="font-semibold text-slate-800 text-sm">
          质因数幂次极值法则：各素因数指数取最小值 (GCD) 与 最大值 (LCM)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">素数因数 (p)</th>
                <th className="py-2.5 px-3 font-mono">{a} 的指数</th>
                <th className="py-2.5 px-3 font-mono">{b} 的指数</th>
                <th className="py-2.5 px-3 bg-indigo-50/50 text-indigo-900 font-semibold">
                  GCD 取 min(a, b)
                </th>
                <th className="py-2.5 px-3 bg-emerald-50/50 text-emerald-900 font-semibold">
                  LCM 取 max(a, b)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {primeExponentsComparison.map((row) => (
                <tr key={row.p} className="hover:bg-slate-50/70">
                  <td className="py-2 px-3 font-bold text-slate-800">{row.p}</td>
                  <td className="py-2 px-3 text-slate-600">{row.expA}</td>
                  <td className="py-2 px-3 text-slate-600">{row.expB}</td>
                  <td className="py-2 px-3 bg-indigo-50/30 text-indigo-700 font-bold">
                    {row.minExp} {row.minExp > 0 ? `(${row.p}^${row.minExp})` : '(无此因子)'}
                  </td>
                  <td className="py-2 px-3 bg-emerald-50/30 text-emerald-700 font-bold">
                    {row.maxExp} ({row.p}^{row.maxExp})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
