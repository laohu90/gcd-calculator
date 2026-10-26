import React from 'react';
import { ShortDivisionResult } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { COMPONENT_TRANSLATIONS } from '../utils/componentTranslations';
import { MathView } from './MathView';
import { Info } from 'lucide-react';

interface ShortDivisionViewProps {
  data: ShortDivisionResult;
  lang?: Language;
}

export const ShortDivisionView: React.FC<ShortDivisionViewProps> = ({ data, lang = 'en' }) => {
  const { initialNumbers, steps, finalQuotients, gcdDivisors, gcd, lcmDivisors = gcdDivisors, lcm } = data;
  const t = COMPONENT_TRANSLATIONS[lang].shortDivision;

  if (steps.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
        <p className="text-slate-700 font-medium text-base">
          {t.emptyNote(initialNumbers.join(', '))}
        </p>
        <p className="text-slate-500 text-sm mt-2">
          {t.emptySub(initialNumbers.join(' × '), lcm)}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Short division ladder visualization */}
      <div className="overflow-x-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-xl shadow-inner font-mono text-base sm:text-lg">
        <div className="text-xs uppercase tracking-wider text-slate-400 mb-4 font-sans font-medium flex items-center justify-between">
          <span>{t.badgeTitle}</span>
          <span className="text-indigo-300">{t.badgeHint}</span>
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
            <div className="w-16 sm:w-20 text-right pr-3 shrink-0 text-slate-400 text-xs font-sans">
              {t.quotientLabel}
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
              {t.gcdCardTitle}
            </h4>
          </div>
          <p className="text-xs text-slate-600">
            {t.gcdCardDesc}
          </p>
          <div className="bg-white p-3 rounded-lg border border-indigo-150 text-indigo-900 font-mono text-sm sm:text-base font-semibold">
            <MathView
              math={`\\gcd(${initialNumbers.join(', ')}) = ${gcdDivisors.length > 0 ? gcdDivisors.join(' \\times ') : '1'} = ${gcd}`}
            />
          </div>
        </div>

        {/* LCM Calculation */}
        <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h4 className="font-semibold text-slate-900 text-sm">
              {t.lcmCardTitle}
            </h4>
          </div>
          <p className="text-xs text-slate-600">
            {t.lcmCardDesc}
          </p>
          <div className="bg-white p-3 rounded-lg border border-amber-150 text-amber-900 font-mono text-sm sm:text-base font-semibold break-all">
            <MathView
              math={`\\operatorname{lcm}(${initialNumbers.join(', ')}) = ${[...lcmDivisors, ...finalQuotients].join(' \\times ')} = ${lcm}`}
            />
          </div>
        </div>
      </div>

      {/* Primary Math Rule Note */}
      <div className="text-xs text-slate-600 bg-slate-100/80 rounded-lg p-3 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">{t.stopRuleTitle}</span>{' '}
          {t.stopRuleDesc}
        </div>
      </div>
    </div>
  );
};
