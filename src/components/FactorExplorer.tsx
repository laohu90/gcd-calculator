import React, { useState, useMemo } from 'react';
import {
  getDivisors,
  getFactorPairs,
  getDivisibilityRules,
  generateHomeworkText,
  isPrime,
} from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { COMPONENT_TRANSLATIONS } from '../utils/componentTranslations';
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
  lang?: Language;
}

export const FactorExplorer: React.FC<FactorExplorerProps> = ({
  a,
  b,
  gcd,
  lcm,
  lang = 'en',
}) => {
  const t = COMPONENT_TRANSLATIONS[lang].factorExplorer;
  const [copiedHomework, setCopiedHomework] = useState(false);
  const [scenario, setScenario] = useState<'paper' | 'gift' | 'tree' | 'bus'>('paper');

  const safeA = Math.max(1, Math.floor(Math.abs(a)));
  const safeB = Math.max(1, Math.floor(Math.abs(b)));

  // Divisors
  const divisorsA = useMemo(() => getDivisors(safeA), [safeA]);
  const divisorsB = useMemo(() => getDivisors(safeB), [safeB]);
  const factorPairsA = useMemo(() => getFactorPairs(safeA), [safeA]);
  const factorPairsB = useMemo(() => getFactorPairs(safeB), [safeB]);

  // Divisibility rules with localized reasons
  const rulesA = useMemo(() => getDivisibilityRules(safeA, lang), [safeA, lang]);
  const rulesB = useMemo(() => getDivisibilityRules(safeB, lang), [safeB, lang]);

  // Homework writeup
  const homeworkText = useMemo(() => {
    return generateHomeworkText(safeA, safeB, gcd, lcm, lang);
  }, [safeA, safeB, gcd, lcm, lang]);

  const handleCopyHomework = () => {
    navigator.clipboard.writeText(homeworkText);
    setCopiedHomework(true);
    setTimeout(() => setCopiedHomework(false), 2000);
  };

  const scenarioContent = useMemo(() => {
    if (scenario === 'paper') {
      return t.scenarios.paperText(safeA, safeB, gcd);
    } else if (scenario === 'gift') {
      return t.scenarios.giftText(safeA, safeB, gcd);
    } else if (scenario === 'tree') {
      return t.scenarios.treeText(safeA, safeB, gcd);
    } else {
      return t.scenarios.busText(safeA, safeB, lcm);
    }
  }, [scenario, safeA, safeB, gcd, lcm, t]);

  return (
    <div className="space-y-6">
      {/* 1. Standard Written Homework Solution Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {t.templateTitle}
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
                <span className="text-emerald-700">{t.copiedBtn}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyBtn}</span>
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
          <span>{t.pairsTitle}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
          {t.pairsSubtitle(safeA, safeB)}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Number A */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm font-mono">
                {t.factorsOf(safeA)}
              </span>
              <span className="text-[11px] text-slate-500">
                {isPrime(safeA) ? t.primeLabel : t.factorCount(divisorsA.length)}
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
                    {isGCD ? t.maxBadge : ''}
                  </span>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600 font-mono text-[11px]">
              <div className="font-sans font-semibold text-slate-700 text-xs">{t.pairsList}</div>
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
              <span className="font-bold text-slate-800 text-sm font-mono">
                {t.factorsOf(safeB)}
              </span>
              <span className="text-[11px] text-slate-500">
                {isPrime(safeB) ? t.primeLabel : t.factorCount(divisorsB.length)}
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
                    {isGCD ? t.maxBadge : ''}
                  </span>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600 font-mono text-[11px]">
              <div className="font-sans font-semibold text-slate-700 text-xs">{t.pairsList}</div>
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
          <span>{t.divisibilityTitle}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
          {t.divisibilitySubtitle}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{t.colDivisor}</th>
                <th className="py-2.5 px-3 font-mono">{t.colDivisibleA(safeA)}</th>
                <th className="py-2.5 px-3 font-mono">{t.colDivisibleB(safeB)}</th>
                <th className="py-2.5 px-3">{t.colReason}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {rulesA.map((rA, idx) => {
                const rB = rulesB[idx];
                return (
                  <tr key={rA.divisor} className="hover:bg-slate-50/70">
                    <td className="py-2 px-3 font-bold text-slate-800">
                      {rA.ruleName}
                    </td>
                    <td className="py-2 px-3">
                      {rA.divisible ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
                          {t.yesBadge}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[11px]">
                          {t.noBadge}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {rB.divisible ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
                          {t.yesBadge}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[11px]">
                          {t.noBadge}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-slate-600 font-sans text-xs">
                      {rA.reason}
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
              <span>{t.solverTitle}</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
              {t.solverSubtitle}
            </h3>
          </div>

          <div className="flex items-center flex-wrap gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setScenario('paper')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                scenario === 'paper'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-600'
              }`}
            >
              <Scissors className="w-3 h-3" />
              <span>{t.scenarios.paperTab}</span>
            </button>
            <button
              type="button"
              onClick={() => setScenario('gift')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                scenario === 'gift'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-600'
              }`}
            >
              <Gift className="w-3 h-3" />
              <span>{t.scenarios.giftTab}</span>
            </button>
            <button
              type="button"
              onClick={() => setScenario('tree')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                scenario === 'tree'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-600'
              }`}
            >
              <TreePine className="w-3 h-3" />
              <span>{t.scenarios.treeTab}</span>
            </button>
            <button
              type="button"
              onClick={() => setScenario('bus')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                scenario === 'bus'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-600'
              }`}
            >
              <Bus className="w-3 h-3" />
              <span>{t.scenarios.busTab}</span>
            </button>
          </div>
        </div>

        {/* Scenario Answer Box */}
        <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs sm:text-sm text-slate-700">
          <div>
            <p className="font-semibold text-indigo-950">
              {scenarioContent.title}
            </p>
            <div className="mt-2 p-3 bg-white rounded-lg border border-indigo-150 font-mono text-indigo-900 space-y-1">
              <div>{scenarioContent.s1}</div>
              <div>{scenarioContent.s2}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
