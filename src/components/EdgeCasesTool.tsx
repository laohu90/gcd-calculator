import React, { useState, useMemo } from 'react';
import { decimalGcd, eulerTotient, bigIntGcd } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { HelpCircle, Calculator, ShieldAlert, Check, Copy } from 'lucide-react';

interface EdgeCasesToolProps {
  lang?: Language;
}

export const EdgeCasesTool: React.FC<EdgeCasesToolProps> = ({ lang = 'en' }) => {
  // Decimal GCD state
  const [decA, setDecA] = useState<string>('1.75');
  const [decB, setDecB] = useState<string>('2.5');

  // Euler totient state
  const [totientN, setTotientN] = useState<string>('36');

  const [copied, setCopied] = useState<boolean>(false);

  // Decimal GCD calculation
  const decResult = useMemo(() => {
    try {
      if (!decA || !decB) return null;
      return decimalGcd(decA, decB);
    } catch {
      return null;
    }
  }, [decA, decB]);

  // Totient calculation
  const totientVal = useMemo(() => {
    const n = parseInt(totientN) || 0;
    return n > 0 && n <= 1000000 ? eulerTotient(n) : 0;
  }, [totientN]);

  const copyDecimalAns = () => {
    if (!decResult) return;
    const text = `gcd(${decA}, ${decB}) = ${decResult.finalDecimalGcd} (Scaled: gcd(${decResult.intA}, ${decResult.intB}) = ${decResult.intGcd} / ${decResult.scaledFactor})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>
            {lang === 'zh'
              ? '数学特殊边界情况与小数/负数/零求解工具'
              : 'Mathematical Edge Cases: Decimals, Negative Numbers, Zero & Coprimes'}
          </span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {lang === 'zh'
            ? '解答中小学及高等数学中关于零的公因数、负数最大公约数定则、小数公约数求法与欧拉函数互质统计的难点疑问。'
            : 'Clear pedagogical rules and online tools for tricky edge cases: GCD with zero, negative integers, decimal conversion, and Euler’s totient function.'}
        </p>
      </div>

      {/* 1. Decimal GCD Converter Tool */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>
                {lang === 'zh' ? '小数最大公约数计算器' : 'Decimal GCD Calculator & Converter'}
              </span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'zh'
                ? '通过同乘 10ⁿ 放大为整数计算 GCD 后复原除以 10ⁿ。'
                : 'Scale both decimals by 10ⁿ to integers, calculate integer GCD, and scale back.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Decimal A:</label>
            <input
              type="text"
              value={decA}
              onChange={(e) => setDecA(e.target.value)}
              placeholder="1.75"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Decimal B:</label>
            <input
              type="text"
              value={decB}
              onChange={(e) => setDecB(e.target.value)}
              placeholder="2.5"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {decResult && (
          <div className="p-4 bg-indigo-50/60 border border-indigo-150 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-indigo-700 font-semibold uppercase text-[10px] tracking-wider block">
                Result
              </span>
              <span className="text-xl font-black font-mono text-indigo-950">
                gcd({decA}, {decB}) = {decResult.finalDecimalGcd}
              </span>
              <div className="text-slate-600 mt-1 font-mono text-[11px]">
                Scaled by ×{decResult.scaledFactor} → gcd({decResult.intA}, {decResult.intB}) ={' '}
                {decResult.intGcd} → {decResult.intGcd} ÷ {decResult.scaledFactor} ={' '}
                {decResult.finalDecimalGcd}
              </div>
            </div>
            <button
              type="button"
              onClick={copyDecimalAns}
              className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-50 font-medium transition-colors flex items-center gap-1 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Educational Q&A on Negative Numbers, Zero, and 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Zero Case */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs">
          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>What is gcd(a, 0)? (零的公约数)</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            By definition, every non-zero integer divides 0 (since 0 = k × 0). Therefore, the
            divisors of 0 are all integers.
          </p>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded font-mono font-bold text-indigo-900 text-center">
            gcd(a, 0) = |a| (where a ≠ 0)
          </div>
          <p className="text-slate-500 text-[11px]">
            Example: gcd(48, 0) = 48. Note: gcd(0, 0) is mathematically undefined (or defined as 0
            in some computer algebra systems).
          </p>
        </div>

        {/* Negative Numbers Case */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs">
          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>Can GCD be Negative? (负数的最大公约数)</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            In standard number theory, the Greatest Common Divisor is{' '}
            <span className="font-bold text-slate-800">always strictly positive</span> by
            definition.
          </p>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded font-mono font-bold text-indigo-900 text-center">
            gcd(-a, b) = gcd(a, -b) = gcd(-a, -b) = gcd(|a|, |b|)
          </div>
          <p className="text-slate-500 text-[11px]">
            Example: gcd(-48, 72) = 24. A negative number like -24 is a common divisor, but 24 is
            greater!
          </p>
        </div>

        {/* What if GCD = 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs">
          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>What are Coprime (互质) Numbers?</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Two numbers a and b are called <span className="font-bold">relatively prime</span> or{' '}
            <span className="font-bold">coprime</span> if their only positive common divisor is 1:
          </p>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded font-mono font-bold text-indigo-900 text-center">
            gcd(a, b) = 1 ⟺ a and b are coprime
          </div>
          <p className="text-slate-500 text-[11px]">
            Important: The numbers themselves do not have to be prime! For instance, 8 and 9 are
            both composite, but gcd(8, 9) = 1, so they are coprime.
          </p>
        </div>

        {/* Euler's Totient Tool */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs">
          <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>Euler’s Totient Function φ(n)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-500">n =</span>
              <input
                type="number"
                value={totientN}
                onChange={(e) => setTotientN(e.target.value)}
                className="w-16 px-1.5 py-0.5 border border-slate-300 rounded font-mono text-center font-bold"
              />
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed">
            φ(n) counts integers from 1 to n that are coprime to n:
          </p>
          <div className="p-2 bg-indigo-50 border border-indigo-150 rounded font-mono font-bold text-indigo-900 text-center">
            φ({totientN}) = {totientVal}
          </div>
          <p className="text-slate-500 text-[11px]">
            Key in RSA cryptography: If p and q are prime, φ(p×q) = (p - 1)(q - 1).
          </p>
        </div>
      </div>
    </div>
  );
};
