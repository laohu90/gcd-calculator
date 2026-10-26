import React, { useState } from 'react';
import { EuclideanStep, ExtendedEuclideanResult, MultiEuclideanStage } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { COMPONENT_TRANSLATIONS } from '../utils/componentTranslations';
import { MathView } from './MathView';
import { ChevronDown, ChevronUp, Sparkles, BookOpen, Layers } from 'lucide-react';

interface EuclideanViewProps {
  steps: EuclideanStep[];
  extended?: ExtendedEuclideanResult;
  a: bigint;
  b: bigint;
  lang?: Language;
  multiStages?: MultiEuclideanStage[];
  allNumbers?: bigint[];
}

export const EuclideanView: React.FC<EuclideanViewProps> = ({
  steps,
  extended,
  a,
  b,
  lang = 'en',
  multiStages,
  allNumbers,
}) => {
  const [showExtended, setShowExtended] = useState(false);
  const t = COMPONENT_TRANSLATIONS[lang].euclid;

  // If in multi-number mode with progressive stages
  if (multiStages && multiStages.length > 0) {
    const finalGcd = multiStages[multiStages.length - 1].gcd;
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 pb-2 border-b border-slate-200">
          <div>
            <span className="font-semibold text-slate-700">
              {lang === 'zh' ? '多数字欧几里得辗转相除法' : 'Multi-Number Euclidean Algorithm'}
            </span>
            <span className="font-mono ml-2 text-slate-800">
              \gcd(a, b, c, ...) = \gcd(\gcd(a, b), c)
            </span>
          </div>
          <span className="text-slate-400">
            {lang === 'zh' ? `共 ${multiStages.length} 轮逐步归约` : `${multiStages.length} reduction stages`}
          </span>
        </div>

        {multiStages.map((stage) => (
          <div key={stage.stageIndex} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between font-semibold text-sm text-indigo-900 border-b border-slate-200/80 pb-2">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>
                  {lang === 'zh' ? `第 ${stage.stageIndex} 轮：求 gcd(${stage.numA}, ${stage.numB})` : `Stage ${stage.stageIndex}: gcd(${stage.numA}, ${stage.numB})`}
                </span>
              </span>
              <span className="font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs">
                = {stage.gcd.toString()}
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100 text-slate-600 font-sans font-semibold">
                  <tr>
                    <th className="py-2 px-3 text-center w-12">{t.colStep}</th>
                    <th className="py-2 px-3">{t.colDividend}</th>
                    <th className="py-2 px-3">{t.colDivisor}</th>
                    <th className="py-2 px-3">{t.colQuotient}</th>
                    <th className="py-2 px-3">{t.colRemainder}</th>
                    <th className="py-2 px-3">{t.colEquation}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stage.steps.map((st) => (
                    <tr key={st.step} className="hover:bg-slate-50/70">
                      <td className="py-1.5 px-3 text-center text-slate-400 font-sans">{st.step}</td>
                      <td className="py-1.5 px-3">{st.a.toString()}</td>
                      <td className="py-1.5 px-3 text-slate-700">{st.b.toString()}</td>
                      <td className="py-1.5 px-3 text-slate-500">{st.quotient.toString()}</td>
                      <td className="py-1.5 px-3">
                        <span className={`px-1.5 py-0.5 rounded text-xs ${st.remainder === 0n ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-800'}`}>
                          {st.remainder.toString()}
                        </span>
                      </td>
                      <td className="py-1.5 px-3 text-slate-800">
                        <MathView math={st.equation.replace(/×/g, '\\times ')} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-indigo-300">
            {lang === 'zh' ? '多数字最终最大公约数：' : 'Final Multiple Numbers GCD:'}
          </span>
          <span className="text-xl font-bold font-mono text-emerald-400">
            GCD({(allNumbers || []).join(', ')}) = {finalGcd.toString()}
          </span>
        </div>
      </div>
    );
  }

  const finalStep = steps[steps.length - 1];
  const gcdValue = finalStep
    ? finalStep.remainder === 0n
      ? finalStep.b
      : finalStep.remainder
    : 1n;

  return (
    <div className="space-y-6">
      {/* Algorithm introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 pb-2 border-b border-slate-200">
        <div>
          <span className="font-semibold text-slate-700">{t.principleTitle}</span>
          <span className="font-mono ml-1 text-slate-800">
            <MathView math="\gcd(a, b) = \gcd(b, a \bmod b)" />
          </span>
        </div>
        <span className="text-slate-400">{t.principleDesc}</span>
      </div>

      {/* Step by step table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-3 sm:px-4 text-center w-14">{t.colStep}</th>
              <th className="py-3 px-3 sm:px-4">{t.colDividend}</th>
              <th className="py-3 px-3 sm:px-4">{t.colDivisor}</th>
              <th className="py-3 px-3 sm:px-4">{t.colQuotient}</th>
              <th className="py-3 px-3 sm:px-4">{t.colRemainder}</th>
              <th className="py-3 px-3 sm:px-4 font-mono">{t.colEquation}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {steps.map((st, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <tr
                  key={st.step}
                  className={`transition-colors ${
                    isLast
                      ? 'bg-indigo-50/70 font-semibold text-indigo-950'
                      : 'hover:bg-slate-50/60'
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
          <span>{t.conclusionTitle}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {t.conclusionDesc(steps.length)}
        </p>
        <div className="p-2.5 bg-slate-800/80 rounded-lg text-emerald-300 font-mono text-base font-bold flex items-center justify-between">
          <span>
            <MathView math={`\\gcd(${a.toString()}, ${b.toString()}) = ${gcdValue.toString()}`} />
          </span>
          <span className="text-xs text-slate-400 font-sans font-normal">
            {t.totalSteps(steps.length)}
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
                {t.bezoutToggle}
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
                {t.bezoutDesc}
              </p>
              <div className="p-3 bg-white border border-slate-200 rounded-lg font-mono text-indigo-900 font-semibold">
                <MathView
                  math={`(${extended.x.toString()}) \\times ${a.toString()} + (${extended.y.toString()}) \\times ${b.toString()} = ${extended.gcd.toString()}`}
                />
              </div>
              <div className="text-xs text-slate-500">
                {t.bezoutSolution(extended.x.toString(), extended.y.toString())}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
