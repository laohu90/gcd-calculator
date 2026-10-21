import React, { useState } from 'react';
import { EuclideanStep, ExtendedEuclideanResult } from '../utils/mathEngine';
import { MathView } from './MathView';
import { ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

interface EuclideanViewProps {
  steps: EuclideanStep[];
  extended?: ExtendedEuclideanResult;
  a: bigint;
  b: bigint;
}

export const EuclideanView: React.FC<EuclideanViewProps> = ({ steps, extended, a, b }) => {
  const [showExtended, setShowExtended] = useState(false);

  const finalStep = steps[steps.length - 1];
  const gcdValue = finalStep ? (finalStep.remainder === 0n ? finalStep.b : finalStep.remainder) : 1n;

  return (
    <div className="space-y-6">
      {/* Algorithm introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 pb-2 border-b border-slate-200">
        <div>
          <span className="font-semibold text-slate-700">辗转相除法原理：</span>
          <span className="font-mono ml-1 text-slate-800">
            <MathView math="\gcd(a, b) = \gcd(b, a \bmod b)" />
          </span>
        </div>
        <span className="text-slate-400">两千多年前欧几里得在《几何原本》中提出的经典算法</span>
      </div>

      {/* Step by step table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-3 sm:px-4 text-center w-14">步骤</th>
              <th className="py-3 px-3 sm:px-4">被除数 (a)</th>
              <th className="py-3 px-3 sm:px-4">除数 (b)</th>
              <th className="py-3 px-3 sm:px-4">商 (q)</th>
              <th className="py-3 px-3 sm:px-4">余数 (r)</th>
              <th className="py-3 px-3 sm:px-4 font-mono">带余除法恒等式</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {steps.map((st, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <tr
                  key={st.step}
                  className={`transition-colors ${
                    isLast ? 'bg-indigo-50/70 font-semibold text-indigo-950' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="py-2.5 px-3 sm:px-4 text-center text-slate-400 font-sans">
                    {st.step}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4">{st.a.toString()}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-slate-700">{st.b.toString()}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-slate-500">{st.quotient.toString()}</td>
                  <td className="py-2.5 px-3 sm:px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${
                        st.remainder === 0n
                          ? 'bg-emerald-100 text-emerald-800 font-bold'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {st.remainder.toString()}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-slate-800">
                    <MathView math={st.equation.replace(/×/g, '\\times ')} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Result explanation box */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>算法结论判定</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          当步骤 {steps.length} 中余数首次变为 <span className="text-emerald-400 font-mono font-bold">0</span> 时，
          此时的除数就是两数的最大公约数：
        </p>
        <div className="p-2.5 bg-slate-800/80 rounded-lg text-emerald-300 font-mono text-base font-bold flex items-center justify-between">
          <span>
            <MathView math={`\\gcd(${a.toString()}, ${b.toString()}) = ${gcdValue.toString()}`} />
          </span>
          <span className="text-xs text-slate-400 font-sans font-normal">
            总共耗时 {steps.length} 次带余除法
          </span>
        </div>
      </div>

      {/* Extended Euclidean Algorithm (Bezout's Identity) */}
      {extended && (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setShowExtended(!showExtended)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-sm text-slate-800">
                竞赛拓展：裴蜀定理与扩展欧几里得 (Bézout's identity)
              </span>
            </div>
            {showExtended ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showExtended && (
            <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50 text-xs sm:text-sm">
              <p className="text-slate-600">
                裴蜀定理指出：对于任意整数 <MathView math="a, b" />，一定存在整数解{' '}
                <MathView math="x, y" /> 满足线性丢番图方程：
              </p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg font-mono text-indigo-900 font-semibold">
                <MathView
                  math={`(${extended.x.toString()}) \\times ${a.toString()} + (${extended.y.toString()}) \\times ${b.toString()} = ${extended.gcd.toString()}`}
                />
              </div>
              <div className="text-xs text-slate-500">
                特解结果：<span className="font-mono text-slate-800 font-semibold">x = {extended.x.toString()}</span>，
                <span className="font-mono text-slate-800 font-semibold ml-2">y = {extended.y.toString()}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
