import React, { useState } from 'react';
import { multiGcd } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { COMPONENT_TRANSLATIONS } from '../utils/componentTranslations';
import { MathView } from './MathView';
import { Divide, Split, CheckCircle2, ArrowRight } from 'lucide-react';

interface PolynomialTerm {
  coeff: number;
  xPower: number;
  yPower: number;
}

interface FactoringToolProps {
  lang?: Language;
}

export const FactoringTool: React.FC<FactoringToolProps> = ({ lang = 'en' }) => {
  const t = COMPONENT_TRANSLATIONS[lang].factoring;

  // Preset polynomials for middle school practice
  const presets: { label: string; terms: PolynomialTerm[] }[] = [
    {
      label: `${lang === 'zh' ? '例题 1' : lang === 'es' ? 'Ej 1' : 'Ex 1'}: 12x³y² + 18x²y³ - 24x²y`,
      terms: [
        { coeff: 12, xPower: 3, yPower: 2 },
        { coeff: 18, xPower: 2, yPower: 3 },
        { coeff: -24, xPower: 2, yPower: 1 },
      ],
    },
    {
      label: `${lang === 'zh' ? '例题 2' : lang === 'es' ? 'Ej 2' : 'Ex 2'}: 8x²y - 12xy² + 4xy`,
      terms: [
        { coeff: 8, xPower: 2, yPower: 1 },
        { coeff: -12, xPower: 1, yPower: 2 },
        { coeff: 4, xPower: 1, yPower: 1 },
      ],
    },
    {
      label: `${lang === 'zh' ? '例题 3' : lang === 'es' ? 'Ej 3' : 'Ex 3'}: 15x⁴ - 25x²`,
      terms: [
        { coeff: 15, xPower: 4, yPower: 0 },
        { coeff: -25, xPower: 2, yPower: 0 },
      ],
    },
  ];

  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [terms, setTerms] = useState<PolynomialTerm[]>(presets[0].terms);

  // Fraction simplifier state
  const [fracNum, setFracNum] = useState<string>('84');
  const [fracDen, setFracDen] = useState<string>('126');

  // Compute polynomial factor
  const coeffBigInts = terms.map((term) => BigInt(Math.abs(term.coeff)));
  const gcdCoeff = Number(multiGcd(coeffBigInts));
  const minXPower = Math.min(...terms.map((term) => term.xPower));
  const minYPower = Math.min(...terms.map((term) => term.yPower));

  const formatTerm = (c: number, xP: number, yP: number, isLeading = false) => {
    let s = '';
    if (!isLeading && c >= 0) s += '+ ';
    if (c < 0) s += isLeading ? '-' : '- ';
    const absC = Math.abs(c);

    let vars = '';
    if (xP > 0) vars += xP === 1 ? 'x' : `x^${xP}`;
    if (yP > 0) vars += yP === 1 ? 'y' : `y^${yP}`;

    if (absC === 1 && vars !== '') {
      s += vars;
    } else {
      s += `${absC}${vars}`;
    }
    return s;
  };

  const originalStr = terms
    .map((term, idx) => formatTerm(term.coeff, term.xPower, term.yPower, idx === 0))
    .join(' ');

  const remainingTerms = terms.map((term) => ({
    coeff: term.coeff / gcdCoeff,
    xPower: term.xPower - minXPower,
    yPower: term.yPower - minYPower,
  }));

  const remainingStr = remainingTerms
    .map((term, idx) => formatTerm(term.coeff, term.xPower, term.yPower, idx === 0))
    .join(' ');

  let gcfVars = '';
  if (minXPower > 0) gcfVars += minXPower === 1 ? 'x' : `x^${minXPower}`;
  if (minYPower > 0) gcfVars += minYPower === 1 ? 'y' : `y^${minYPower}`;

  let gcfStr = '';
  if (gcdCoeff !== 1 || !gcfVars) gcfStr += `${gcdCoeff}`;
  gcfStr += gcfVars;

  const factoredFinalStr = `${gcfStr}(${remainingStr})`;

  // Fraction calculation
  const parsedNum = Math.abs(parseInt(fracNum, 10)) || 1;
  const parsedDen = Math.abs(parseInt(fracDen, 10)) || 1;
  const fracGcd = Number(multiGcd([BigInt(parsedNum), BigInt(parsedDen)]));
  const simplifiedNum = parsedNum / fracGcd;
  const simplifiedDen = parsedDen / fracGcd;

  return (
    <div className="space-y-8">
      {/* Module 1: Factoring Precursor */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
            <Split className="w-4 h-4" />
            <span>{t.methodBadge}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {t.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActivePresetIndex(idx);
                setTerms(preset.terms);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activePresetIndex === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* 3 Step Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">
              {lang === 'zh' ? '第 1 步：定系数' : lang === 'es' ? 'Paso 1: Coeficientes' : 'Step 1: Coefficients'}
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {lang === 'zh' ? '系数绝对值的 GCD' : 'GCD of Coefficients'}
            </div>
            <p className="text-xs text-slate-600">
              [{terms.map((term) => Math.abs(term.coeff)).join(', ')}]
            </p>
            <div className="p-2 bg-white rounded border border-slate-200 font-mono text-indigo-900 font-bold text-sm">
              GCD = {gcdCoeff}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">
              {lang === 'zh' ? '第 2 步：定字母' : lang === 'es' ? 'Paso 2: Variables' : 'Step 2: Variables'}
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {lang === 'zh' ? '共同字母因子' : 'Common Variables'}
            </div>
            <p className="text-xs text-slate-600">
              {lang === 'zh' ? '检查各单项式公有字母：' : 'Shared literal terms:'}
            </p>
            <div className="p-2 bg-white rounded border border-slate-200 font-mono text-slate-800 font-semibold text-sm">
              {[minXPower > 0 ? 'x' : null, minYPower > 0 ? 'y' : null].filter(Boolean).join(' , ') || (lang === 'zh' ? '无共同字母' : 'None')}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">
              {lang === 'zh' ? '第 3 步：定指数' : lang === 'es' ? 'Paso 3: Exponentes' : 'Step 3: Exponents'}
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {lang === 'zh' ? '字母最低次幂' : 'Lowest Exponent'}
            </div>
            <p className="text-xs text-slate-600">
              min(degree)
            </p>
            <div className="p-2 bg-white rounded border border-slate-200 font-mono text-indigo-900 font-bold text-sm">
              {gcfVars || '-'}
            </div>
          </div>
        </div>

        {/* Factored Result Banner */}
        <div className="p-5 rounded-xl bg-slate-900 text-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.step2Title}</span>
            <span className="text-emerald-400 font-semibold">GCF: {gcfStr}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-base sm:text-lg font-mono">
            <span className="text-slate-300">
              <MathView math={originalStr} />
            </span>
            <ArrowRight className="w-5 h-5 text-indigo-400 shrink-0 hidden sm:block" />
            <div className="p-2.5 bg-slate-800 border border-indigo-500/40 rounded-lg text-emerald-300 font-bold shadow-inner">
              <MathView math={factoredFinalStr} />
            </div>
          </div>
        </div>
      </div>

      {/* Module 2: Fraction Simplification */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
            <Divide className="w-4 h-4" />
            <span>{t.fractionTitle}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {t.fractionSubtitle}
          </h3>
        </div>

        {/* Fraction Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.numLabel}
            </label>
            <input
              type="number"
              value={fracNum}
              onChange={(e) => setFracNum(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.denLabel}
            </label>
            <input
              type="number"
              value={fracDen}
              onChange={(e) => setFracDen(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-mono text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Step Visualizer */}
        <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-indigo-950 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>{t.gcdFound(fracGcd)}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-base sm:text-lg font-mono">
            {/* Original Fraction */}
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <MathView math={`\\frac{${parsedNum}}{${parsedDen}}`} />
            </div>

            <span className="text-slate-400 font-sans">=</span>

            {/* Division by GCD */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-indigo-900">
              <MathView
                math={`\\frac{${parsedNum} \\div \\mathbf{${fracGcd}}}{${parsedDen} \\div \\mathbf{${fracGcd}}}`}
              />
            </div>

            <span className="text-slate-400 font-sans">=</span>

            {/* Final Reduced Fraction */}
            <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-sm font-bold">
              <MathView math={`\\frac{${simplifiedNum}}{${simplifiedDen}}`} />
            </div>
          </div>

          <div className="text-xs text-slate-600">
            {t.reducedResult}{' '}
            <span className="font-bold font-mono text-slate-800">({simplifiedNum}/{simplifiedDen})</span>.
          </div>
        </div>
      </div>
    </div>
  );
};
