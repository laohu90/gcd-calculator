import React, { useState, useMemo, useEffect } from 'react';
import { simplifyFraction, fractionAddSubtract } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { MathView } from './MathView';
import { Divide, Plus, Minus, ArrowRight, Check, Sparkles } from 'lucide-react';

interface FractionStudioProps {
  initialA?: bigint;
  initialB?: bigint;
  lang?: Language;
}

export const FractionStudio: React.FC<FractionStudioProps> = ({
  initialA = 48n,
  initialB = 72n,
  lang = 'en',
}) => {
  // Input fractions
  const [numStr, setNumStr] = useState<string>(initialA.toString());
  const [denStr, setDenStr] = useState<string>(initialB.toString());

  useEffect(() => {
    setNumStr(initialA.toString());
  }, [initialA]);

  useEffect(() => {
    setDenStr(initialB.toString());
  }, [initialB]);

  // Fraction addition/subtraction mode
  const [addN1, setAddN1] = useState<string>('3');
  const [addD1, setAddD1] = useState<string>('8');
  const [addN2, setAddN2] = useState<string>('5');
  const [addD2, setAddD2] = useState<string>('12');
  const [op, setOp] = useState<'+' | '-'>('+');

  const [copied, setCopied] = useState<boolean>(false);

  const parsedNum = useMemo(() => {
    try {
      const clean = numStr.replace(/[^0-9-]/g, '');
      return clean ? BigInt(clean) : 0n;
    } catch {
      return 0n;
    }
  }, [numStr]);

  const parsedDen = useMemo(() => {
    try {
      const clean = denStr.replace(/[^0-9-]/g, '');
      return clean ? BigInt(clean) : 1n;
    } catch {
      return 1n;
    }
  }, [denStr]);

  const reduction = useMemo(
    () => simplifyFraction(parsedNum, parsedDen),
    [parsedNum, parsedDen]
  );

  // Arithmetic calculation using LCM
  const arithmeticResult = useMemo(() => {
    try {
      const n1 = BigInt(addN1.replace(/[^0-9-]/g, '') || '0');
      const d1 = BigInt(addD1.replace(/[^0-9]/g, '') || '1');
      const n2 = BigInt(addN2.replace(/[^0-9-]/g, '') || '0');
      const d2 = BigInt(addD2.replace(/[^0-9]/g, '') || '1');
      if (d1 === 0n || d2 === 0n) return null;
      return fractionAddSubtract(n1, d1, n2, d2, op);
    } catch {
      return null;
    }
  }, [addN1, addD1, addN2, addD2, op]);

  const labels = {
    en: {
      title: 'Fraction Reduction & Arithmetic Studio (Powered by GCD & LCM)',
      sub: 'Simplify any fraction to irreducible form using Greatest Common Divisor, and compute fraction addition/subtraction using Least Common Multiple as the common denominator.',
      numLabel: 'Numerator (Top)',
      denLabel: 'Denominator (Bottom)',
      simplifiedResult: 'Simplified Fraction (Irreducible)',
      reductionSteps: 'Step-by-Step Reduction',
      mixedFraction: 'Mixed Number Form',
      decimalEquiv: 'Decimal Value',
      percentage: 'Percentage',
      arithmeticTitle: 'Fraction Addition & Subtraction via LCM Denominator',
      arithmeticDesc: 'See how Least Common Multiple (LCM) finds the Lowest Common Denominator (LCD) to add/subtract fractions.',
      commonDenom: 'Lowest Common Denominator (LCM)',
      copyResult: 'Copy Fraction Answer',
      copied: 'Copied!',
      properFraction: 'Proper Fraction',
      improperFraction: 'Improper Fraction',
    },
    zh: {
      title: '分数约分与最简分式计算工坊（基于 GCD & LCM）',
      sub: '利用最大公约数(GCD)将任意分数一键化简为最简真/假分数，并利用最小公倍数(LCM)求公分母进行分数的通分加减运算。',
      numLabel: '分子 (Numerator)',
      denLabel: '分母 (Denominator)',
      simplifiedResult: '化简后最简分数',
      reductionSteps: '详细约分推导步骤',
      mixedFraction: '带分数形式',
      decimalEquiv: '对应十进制小数值',
      percentage: '百分比换算',
      arithmeticTitle: '利用最小公倍数 (LCM) 通分与分数加减法',
      arithmeticDesc: '演示两分数相加减时，如何以分母的最小公倍数作为最简公分母进行通分与化简。',
      commonDenom: '最简公分母 (分母 LCM)',
      copyResult: '复制分数答案',
      copied: '已复制！',
      properFraction: '真分数',
      improperFraction: '假分数',
    },
    es: {
      title: 'Simplificador de Fracciones y Operaciones (MCD y MCM)',
      sub: 'Simplifica cualquier fracción a su forma irreducible usando el Máximo Común Divisor, y suma o resta fracciones con el MCM como común denominador.',
      numLabel: 'Numerador',
      denLabel: 'Denominador',
      simplifiedResult: 'Fracción Irreducible',
      reductionSteps: 'Pasos de Reducción',
      mixedFraction: 'Número Mixto',
      decimalEquiv: 'Valor Decimal',
      percentage: 'Porcentaje',
      arithmeticTitle: 'Suma y Resta de Fracciones con MCM',
      arithmeticDesc: 'Aprende cómo el MCM permite hallar el mínimo común denominador.',
      commonDenom: 'Mínimo Común Denominador (MCM)',
      copyResult: 'Copiar Respuesta',
      copied: '¡Copiado!',
      properFraction: 'Fracción Propia',
      improperFraction: 'Fracción Impropia',
    },
    fr: {
      title: 'Simplificateur de Fractions et Arithmétique (PGCD & PPCM)',
      sub: 'Rendez n’importe quelle fraction irréductible grâce au PGCD, et effectuez l’addition/soustraction grâce au PPCM des dénominateurs.',
      numLabel: 'Numérateur',
      denLabel: 'Dénominateur',
      simplifiedResult: 'Fraction Irréductible',
      reductionSteps: 'Étapes de Simplification',
      mixedFraction: 'Nombre Mixte',
      decimalEquiv: 'Valeur Décimale',
      percentage: 'Pourcentage',
      arithmeticTitle: 'Addition et Soustraction via PPCM',
      arithmeticDesc: 'Le PPCM des dénominateurs fournit le dénominateur commun optimal.',
      commonDenom: 'Plus Petit Dénominateur Commun (PPCM)',
      copyResult: 'Copier',
      copied: 'Copié !',
      properFraction: 'Fraction Propre',
      improperFraction: 'Fraction Impropre',
    },
    pt: {
      title: 'Simplificador de Frações e Operações (MDC & MMC)',
      sub: 'Simplifique frações à forma irredutível via MDC e efetue adições/subtrações encontrando o menor denominador comum via MMC.',
      numLabel: 'Numerador',
      denLabel: 'Denominador',
      simplifiedResult: 'Fração Irredutível',
      reductionSteps: 'Passos da Simplificação',
      mixedFraction: 'Número Misto',
      decimalEquiv: 'Valor Decimal',
      percentage: 'Porcentagem',
      arithmeticTitle: 'Adição e Subtração de Frações via MMC',
      arithmeticDesc: 'O MMC dos denominadores estabelece o menor denominador comum para a soma.',
      commonDenom: 'Mínimo Denominador Comum (MMC)',
      copyResult: 'Copiar',
      copied: 'Copiado!',
      properFraction: 'Fração Própria',
      improperFraction: 'Fração Imprópria',
    },
  }[lang];

  const handleCopyFraction = () => {
    const text = `${parsedNum}/${parsedDen} = ${reduction.simplifiedNum}/${reduction.simplifiedDen} (GCD = ${reduction.gcd}) = ${reduction.decimalStr}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header text */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Divide className="w-4 h-4 text-indigo-600" />
          <span>{labels.title}</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">{labels.sub}</p>
      </div>

      {/* Main Fraction Simplifier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {labels.numLabel}
              </label>
              <input
                type="text"
                value={numStr}
                onChange={(e) => setNumStr(e.target.value)}
                placeholder="48"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center justify-center text-slate-400 font-bold text-lg">
              /
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {labels.denLabel}
              </label>
              <input
                type="text"
                value={denStr}
                onChange={(e) => setDenStr(e.target.value)}
                placeholder="72"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleCopyFraction}
              className="w-full py-2 px-3 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{labels.copied}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{labels.copyResult}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output & Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Hero Result Banner */}
          <div className="p-4 bg-indigo-50/60 border border-indigo-150 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                {labels.simplifiedResult}
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-950 mt-1">
                <MathView
                  math={`\\frac{${parsedNum}}{${parsedDen}} = \\frac{${reduction.simplifiedNum}}{${reduction.simplifiedDen}}`}
                />
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {reduction.isProper ? labels.properFraction : labels.improperFraction} · GCD(
                {parsedNum.toString()}, {parsedDen.toString()}) = {reduction.gcd.toString()}
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-indigo-200 sm:pl-4">
              <div className="text-xs text-slate-500">{labels.decimalEquiv}</div>
              <div className="text-lg font-bold font-mono text-slate-900">
                ≈ {reduction.decimalStr}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono">{reduction.percentageStr}</div>
            </div>
          </div>

          {/* Mixed Number (if improper) */}
          {!reduction.isProper && reduction.simplifiedDen > 1n && reduction.wholeNumber > 0n && (
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">{labels.mixedFraction}:</span>
              <span className="text-base font-mono font-bold text-indigo-900">
                <MathView
                  math={`${reduction.wholeNumber} \\frac{${reduction.remainderNum / reduction.gcd}}{${reduction.simplifiedDen}}`}
                />
              </span>
            </div>
          )}

          {/* Detailed step explanation */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 text-xs">
            <div className="font-bold text-slate-900">{labels.reductionSteps}:</div>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 leading-relaxed">
              <li>
                Calculate the Greatest Common Divisor (GCD) of numerator {parsedNum.toString()} and
                denominator {parsedDen.toString()}:
                <span className="font-mono font-bold ml-1 text-indigo-700">
                  gcd({parsedNum.toString()}, {parsedDen.toString()}) = {reduction.gcd.toString()}
                </span>
              </li>
              <li>
                Divide both the numerator and denominator by {reduction.gcd.toString()}:
                <div className="my-2 p-2 bg-slate-50 rounded-lg font-mono text-slate-900 text-center">
                  <MathView
                    math={`\\frac{${parsedNum} \\div ${reduction.gcd}}{${parsedDen} \\div ${reduction.gcd}} = \\frac{${reduction.simplifiedNum}}{${reduction.simplifiedDen}}`}
                  />
                </div>
              </li>
              <li>
                Since {reduction.simplifiedNum.toString()} and {reduction.simplifiedDen.toString()}{' '}
                share no common factors greater than 1,{' '}
                <span className="font-mono font-bold">
                  {reduction.simplifiedNum.toString()}/{reduction.simplifiedDen.toString()}
                </span>{' '}
                is in irreducible lowest terms.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Fraction Addition & Subtraction using LCM */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>{labels.arithmeticTitle}</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">{labels.arithmeticDesc}</p>
        </div>

        {/* Input Equation Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-slate-50/70 border border-slate-200 rounded-xl font-mono">
          {/* Fraction 1 */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={addN1}
              onChange={(e) => setAddN1(e.target.value)}
              className="w-14 text-center py-1 px-1 text-sm font-bold border border-slate-300 rounded bg-white"
            />
            <div className="w-full h-0.5 bg-slate-400 my-1"></div>
            <input
              type="text"
              value={addD1}
              onChange={(e) => setAddD1(e.target.value)}
              className="w-14 text-center py-1 px-1 text-sm font-bold border border-slate-300 rounded bg-white"
            />
          </div>

          {/* Operator Toggle */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setOp('+')}
              className={`p-1.5 rounded-lg border transition-all ${
                op === '+'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setOp('-')}
              className={`p-1.5 rounded-lg border transition-all ${
                op === '-'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Fraction 2 */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={addN2}
              onChange={(e) => setAddN2(e.target.value)}
              className="w-14 text-center py-1 px-1 text-sm font-bold border border-slate-300 rounded bg-white"
            />
            <div className="w-full h-0.5 bg-slate-400 my-1"></div>
            <input
              type="text"
              value={addD2}
              onChange={(e) => setAddD2(e.target.value)}
              className="w-14 text-center py-1 px-1 text-sm font-bold border border-slate-300 rounded bg-white"
            />
          </div>

          <ArrowRight className="w-5 h-5 text-indigo-500 mx-2" />

          {/* Result */}
          {arithmeticResult && (
            <div className="text-base font-bold text-indigo-900 bg-white px-3 py-2 rounded-lg border border-indigo-200 shadow-2xs">
              <MathView
                math={`= \\frac{${arithmeticResult.simplified.simplifiedNum}}{${arithmeticResult.simplified.simplifiedDen}}`}
              />
            </div>
          )}
        </div>

        {/* Step-by-step LCM Common Denominator Explanation */}
        {arithmeticResult && (
          <div className="p-3 bg-indigo-50/40 border border-indigo-150 rounded-lg text-xs space-y-1.5">
            <div className="font-semibold text-indigo-900">
              {labels.commonDenom}: lcm({addD1}, {addD2}) = {arithmeticResult.commonDenom.toString()}
            </div>
            <div className="text-slate-700 font-mono text-[11px] leading-relaxed">
              <MathView
                math={`\\frac{${addN1}}{${addD1}} ${op} \\frac{${addN2}}{${addD2}} = \\frac{${addN1} \\times ${arithmeticResult.factor1}}{${arithmeticResult.commonDenom}} ${op} \\frac{${addN2} \\times ${arithmeticResult.factor2}}{${arithmeticResult.commonDenom}} = \\frac{${arithmeticResult.scaledNum1} ${op} ${arithmeticResult.scaledNum2}}{${arithmeticResult.commonDenom}} = \\frac{${arithmeticResult.resultNum}}{${arithmeticResult.commonDenom}} = \\frac{${arithmeticResult.simplified.simplifiedNum}}{${arithmeticResult.simplified.simplifiedDen}}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
