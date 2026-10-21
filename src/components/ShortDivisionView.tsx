import React from 'react';
import { ShortDivisionResult } from '../utils/mathEngine';
import { MathView } from './MathView';
import { CheckCircle2, Info } from 'lucide-react';

interface ShortDivisionViewProps {
  data: ShortDivisionResult;
}

export const ShortDivisionView: React.FC<ShortDivisionViewProps> = ({ data }) => {
  const { initialNumbers, steps, finalQuotients, gcdDivisors, gcd, lcm } = data;

  if (steps.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
        <p className="text-slate-700 font-medium text-base">
          数字 [{initialNumbers.join(', ')}] 没有大于 1 的共同素因数（互质或已无法继续短除）。
        </p>
        <p className="text-slate-500 text-sm mt-2">
          因此最大公约数 <span className="font-semibold text-slate-800">gcd = 1</span>，最小公倍数{' '}
          <span className="font-semibold text-slate-800">
            lcm = {initialNumbers.join(' × ')} = {lcm}
          </span>
          。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Short division ladder visualization */}
      <div className="overflow-x-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-xl shadow-inner font-mono text-base sm:text-lg">
        <div className="text-xs uppercase tracking-wider text-slate-400 mb-4 font-sans font-medium flex items-center justify-between">
          <span>小学标准短除法梯形图解 (Ladder Diagram)</span>
          <span className="text-indigo-300">左侧为公因数 · 底部为互质商</span>
        </div>

        <div className="inline-block min-w-full sm:min-w-[420px] py-2">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center my-1">
              {/* Left divisor with badge */}
              <div className="w-16 sm:w-20 text-right pr-3 shrink-0">
                <span className="inline-block px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">
                  {step.divisor}
                </span>
              </div>

              {/* Ladder line and current quotients */}
              <div className="border-l-2 border-b-2 border-slate-400 pl-4 pr-6 py-1.5 flex gap-6 sm:gap-10 text-slate-200">
                {step.quotients.map((q, qIdx) => (
                  <span key={qIdx} className="w-12 sm:w-16 text-center tabular-nums font-semibold">
                    {q}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom final quotients row */}
          <div className="flex items-center mt-2">
            <div className="w-16 sm:w-20 text-right pr-3 shrink-0 text-slate-500 text-xs">
              商(互质)
            </div>
            <div className="pl-4 pr-6 py-1 flex gap-6 sm:gap-10 text-amber-300">
              {finalQuotients.map((q, qIdx) => (
                <span
                  key={qIdx}
                  className="w-12 sm:w-16 text-center tabular-nums font-bold bg-amber-400/10 border border-amber-400/30 rounded px-1.5 py-0.5"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Calculation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GCD Calculation */}
        <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h4 className="font-semibold text-slate-900 text-sm">
              最大公约数 (GCD) = 左侧所有除数相乘
            </h4>
          </div>
          <p className="text-xs text-slate-600">
            仅将每一步短除提取出的公有质因数（左侧竖列）相乘：
          </p>
          <div className="bg-white p-3 rounded-lg border border-indigo-150 text-indigo-900 font-mono text-sm sm:text-base font-semibold">
            <MathView
              math={`\\gcd(${initialNumbers.join(', ')}) = ${gcdDivisors.join(' \\times ')} = ${gcd}`}
            />
          </div>
        </div>

        {/* LCM Calculation */}
        <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h4 className="font-semibold text-slate-900 text-sm">
              最小公倍数 (LCM) = “L”型全部数字相乘
            </h4>
          </div>
          <p className="text-xs text-slate-600">
            短除法口诀：“左侧公因数 × 底部互质商”，呈英文“L”型相乘：
          </p>
          <div className="bg-white p-3 rounded-lg border border-amber-150 text-amber-900 font-mono text-sm sm:text-base font-semibold break-all">
            <MathView
              math={`\\operatorname{lcm}(${initialNumbers.join(', ')}) = ${[...gcdDivisors, ...finalQuotients].join(' \\times ')} = ${lcm}`}
            />
          </div>
        </div>
      </div>

      {/* Primary Math Rule Note */}
      <div className="text-xs text-slate-600 bg-slate-100/80 rounded-lg p-3 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">短除法终止原则：</span>
          当底部的商两两互质（即除了 1 之外没有共同的因数）时，短除结束。这是小学奥数与初中代数最推荐的速算心算技法。
        </div>
      </div>
    </div>
  );
};
