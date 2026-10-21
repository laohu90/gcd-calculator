import React from 'react';
import { SubtractionResult } from '../utils/mathEngine';
import { MathView } from './MathView';
import { ScrollText, Sparkles } from 'lucide-react';

interface SubtractionViewProps {
  data: SubtractionResult;
}

export const SubtractionView: React.FC<SubtractionViewProps> = ({ data }) => {
  const { initialA, initialB, halvingCount, steps, baseGcd, finalGcd } = data;

  return (
    <div className="space-y-6">
      {/* Historical Quote Header */}
      <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-1.5">
        <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
          <ScrollText className="w-4 h-4 text-amber-700" />
          <span>出自西汉《九章算术》· 方田章</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed font-serif italic">
          “可半者半之，不可半者，副置分母、子之数，以少减多，更相减损，求其等也。以等数约之。”
        </p>
      </div>

      {/* Halving phase if any */}
      {halvingCount > 0 && (
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="font-semibold text-sm text-slate-800">
              第一阶段：“可半者半之” (偶数折半)
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            原数 ({initialA}, {initialB}) 均为偶数，先同时除以 2 提取出公因数{' '}
            <span className="font-mono font-bold text-indigo-700">
              2^{halvingCount} = {Math.pow(2, halvingCount)}
            </span>
            ，折半后变为奇偶混合数：
          </p>
          <div className="font-mono text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800">
            折半 {halvingCount} 次后新基数：A = {initialA / Math.pow(2, halvingCount)}, B ={' '}
            {initialB / Math.pow(2, halvingCount)}
          </div>
        </div>
      )}

      {/* Subtraction phase table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3 sm:px-4 text-center w-14">减法轮次</th>
              <th className="py-2.5 px-3 sm:px-4">较大数</th>
              <th className="py-2.5 px-3 sm:px-4">较小数</th>
              <th className="py-2.5 px-3 sm:px-4 text-indigo-700">减损差 (大 - 小)</th>
              <th className="py-2.5 px-3 sm:px-4 font-mono">减损算式</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {steps.map((st, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <tr
                  key={st.step}
                  className={`transition-colors ${
                    isLast ? 'bg-amber-50/80 font-bold text-amber-950' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="py-2 px-3 sm:px-4 text-center text-slate-400 font-sans">
                    第 {st.step} 次
                  </td>
                  <td className="py-2 px-3 sm:px-4">{st.larger}</td>
                  <td className="py-2 px-3 sm:px-4 text-slate-600">{st.smaller}</td>
                  <td className="py-2 px-3 sm:px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-900 font-semibold">
                      {st.difference}
                    </span>
                  </td>
                  <td className="py-2 px-3 sm:px-4 text-slate-700">
                    {st.larger} - {st.smaller} = {st.difference}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Final conclusion */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2">
        <h4 className="text-sm font-semibold text-amber-300">第二阶段：“以等数约之” (求等数结果)</h4>
        <p className="text-xs sm:text-sm text-slate-300">
          当减数与差相等时，即得到“等数” <span className="font-mono text-amber-400 font-bold">{baseGcd}</span>。
          {halvingCount > 0 ? (
            <span>
              再乘以之前折半提取的因子 <MathView math={`2^{${halvingCount}} = ${Math.pow(2, halvingCount)}`} />，最终最大公约数为：
            </span>
          ) : (
            '无需折半补偿，最终最大公约数为：'
          )}
        </p>
        <div className="p-2.5 bg-slate-800 rounded-lg text-emerald-300 font-mono text-base font-bold">
          <MathView
            math={`\\gcd(${initialA}, ${initialB}) = ${
              halvingCount > 0 ? `${baseGcd} \\times 2^{${halvingCount}} = ` : ''
            }${finalGcd}`}
          />
        </div>
      </div>
    </div>
  );
};
