import React from 'react';
import { SubtractionResult } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { COMPONENT_TRANSLATIONS } from '../utils/componentTranslations';
import { MathView } from './MathView';
import { ScrollText, Sparkles } from 'lucide-react';

interface SubtractionViewProps {
  data: SubtractionResult;
  lang?: Language;
}

export const SubtractionView: React.FC<SubtractionViewProps> = ({ data, lang = 'en' }) => {
  const { initialA, initialB, halvingCount, steps, baseGcd, finalGcd } = data;
  const t = COMPONENT_TRANSLATIONS[lang].subtraction;

  return (
    <div className="space-y-6">
      {/* Historical Quote Header */}
      <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-1.5">
        <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
          <ScrollText className="w-4 h-4 text-amber-700" />
          <span>{t.quoteTitle}</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed font-serif italic">
          {t.quoteBody}
        </p>
      </div>

      {/* Halving phase if any */}
      {halvingCount > 0 && (
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="font-semibold text-sm text-slate-800">
              {t.halvingTitle}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.halvingDesc(initialA, initialB, halvingCount, Math.pow(2, halvingCount))}
          </p>
          <div className="font-mono text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800">
            {t.halvingResult(
              halvingCount,
              initialA / Math.pow(2, halvingCount),
              initialB / Math.pow(2, halvingCount)
            )}
          </div>
        </div>
      )}

      {/* Subtraction phase table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3 sm:px-4 text-center w-14">{t.colRound}</th>
              <th className="py-2.5 px-3 sm:px-4">{t.colLarger}</th>
              <th className="py-2.5 px-3 sm:px-4">{t.colSmaller}</th>
              <th className="py-2.5 px-3 sm:px-4 text-indigo-700">{t.colDiff}</th>
              <th className="py-2.5 px-3 sm:px-4 font-mono">{t.colEquation}</th>
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
                    #{st.step}
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
        <h4 className="text-sm font-semibold text-amber-300">{t.conclusionTitle}</h4>
        <p className="text-xs sm:text-sm text-slate-300">
          {t.conclusionDesc(baseGcd, halvingCount, finalGcd)}
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
