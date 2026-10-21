import React, { useState } from 'react';
import { Language } from '../utils/i18n';
import { Table, Cpu, Zap, CheckCircle2, BookOpen, Clock } from 'lucide-react';

interface AlgorithmComparisonProps {
  lang?: Language;
}

export const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({ lang = 'en' }) => {
  const [testNumber, setTestNumber] = useState<string>('48');

  const parsedVal = parseInt(testNumber) || 0;

  const methods = [
    {
      name: {
        en: 'Euclidean Algorithm (辗转相除法)',
        zh: '欧几里得辗转相除法',
        es: 'Algoritmo de Euclides',
        fr: 'Algorithme d’Euclide',
        pt: 'Algoritmo de Euclides',
      }[lang],
      origin: 'Ancient Greece (Euclid, ~300 BC)',
      complexity: 'O(log(min(a, b)))',
      space: 'O(1)',
      operations: 'Division / Modulo',
      bestFor: 'Arbitrarily large numbers, cryptography (RSA), computer systems',
      curriculum: 'High School / College / Computer Science',
      pros: 'Extremely fast logarithmic convergence; handles billions easily.',
      cons: 'Does not immediately output the prime factors or LCM without using formula.',
    },
    {
      name: {
        en: 'Short Division / Ladder Method (短除法)',
        zh: '中国小学经典短除法',
        es: 'Método de Descomposición en Escalera',
        fr: 'Disposition en Échelle',
        pt: 'Dispositivo Prático / Fatoração Conjunta',
      }[lang],
      origin: 'Modern Primary & Middle School Pedagogy',
      complexity: 'O(sqrt(min(a, b)))',
      space: 'O(1)',
      operations: 'Trial Division by Small Primes',
      bestFor: 'Small & medium integers (1 to 10,000); mental math & classroom tests',
      curriculum: 'Primary School (Grade 4–6)',
      pros: 'Finds GCD and LCM simultaneously in a clean L-shaped chart.',
      cons: 'Slow when numbers have very large prime factors (e.g. 10007).',
    },
    {
      name: {
        en: 'Prime Factorization Venn Diagram (质因数分解法)',
        zh: '质因数分解法与维恩图',
        es: 'Descomposición en Factores Primos',
        fr: 'Décomposition en Facteurs Premiers',
        pt: 'Fatoração em Primos e Diagrama de Venn',
      }[lang],
      origin: 'Fundamental Theorem of Arithmetic (Euclid / Gauss)',
      complexity: 'O(sqrt(n)) without sieve',
      space: 'O(log n)',
      operations: 'Prime Factor Breakdown & Exponent Comparison',
      bestFor: 'Understanding algebraic structure, monoid bases, and polynomials',
      curriculum: 'Middle School (Grade 6–8)',
      pros: 'Deep structural clarity: GCD = min exponents, LCM = max exponents.',
      cons: 'Factorization of 100+ digit numbers is computationally intractable.',
    },
    {
      name: {
        en: 'Successive Subtractions (更相减损法)',
        zh: '更相减损术 (出自《九章算术》)',
        es: 'Restas Sucesivas (Nueve Capítulos)',
        fr: 'Soustractions Successives',
        pt: 'Subtrações Sucessivas',
      }[lang],
      origin: 'Ancient China (The Nine Chapters on the Mathematical Art, 1st Century AD)',
      complexity: 'O(max(a, b)) in worst case',
      space: 'O(1)',
      operations: 'Halving even numbers & repeated subtraction',
      bestFor: 'Historic understanding; hardware without hardware division unit',
      curriculum: 'Ancient Mathematical History / Elementary Math',
      pros: 'Only uses subtraction and halving; does not require division arithmetic.',
      cons: 'Degenerates to O(N) steps when a >> b (e.g., gcd(1000000, 1)).',
    },
    {
      name: {
        en: 'Binary GCD / Stein’s Algorithm (二进制Stein算法)',
        zh: '二进制 Stein 算法 (计算机底层专用)',
        es: 'Algoritmo Binario de Stein',
        fr: 'Algorithme Binaire de Stein',
        pt: 'Algoritmo Binário de Stein',
      }[lang],
      origin: 'Josef Stein (1967)',
      complexity: 'O(log²(n)) bit operations',
      space: 'O(1)',
      operations: 'Bitwise shifts (>> 1), subtractions, bitwise AND',
      bestFor: 'Low-level microprocessor assembly, cryptography hardware, BigInt libraries',
      curriculum: 'Computer Architecture & Cryptography',
      pros: 'Replaces costly CPU division with 1-cycle bit shifts.',
      cons: 'Less intuitive for human hand-calculation on paper.',
    },
  ];

  const getRecommendation = (val: number) => {
    if (val <= 100) {
      return {
        recommended: 'Short Division (短除法) or Prime Factorization',
        reason:
          'For small numbers under 100, short division is the most intuitive method because small prime factors (2, 3, 5, 7) can be spotted immediately by mental divisibility rules.',
      };
    } else if (val <= 10000) {
      return {
        recommended: 'Euclidean Algorithm (辗转相除法)',
        reason:
          'For 4-digit numbers, trial division becomes tedious. The Euclidean algorithm reduces the remainder by more than half every two steps, completing in under 8 division steps!',
      };
    } else {
      return {
        recommended: 'Euclidean Algorithm or Binary Stein Algorithm',
        reason:
          'For large numbers (millions+), Euclidean algorithm executes in microseconds with logarithmic time complexity O(log N). Factoring would be thousands of times slower.',
      };
    }
  };

  const rec = getRecommendation(parsedVal);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Table className="w-4 h-4 text-indigo-600" />
          <span>
            {lang === 'zh'
              ? '求最大公约数全算法全景对比与技术选型指南'
              : 'GCD Algorithm Comprehensive Comparison Matrix & Decision Guide'}
          </span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {lang === 'zh'
            ? '横向对比小学短除法、辗转相除法、质因数分解法、更相减损法及现代计算机二进制Stein算法的时间复杂度与适用场景。'
            : 'Detailed evaluation of time complexity, memory, operations, historical origin, and best pedagogical and engineering use cases.'}
        </p>
      </div>

      {/* Interactive Recommender */}
      <div className="p-4 bg-indigo-50/50 border border-indigo-150 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>
                {lang === 'zh'
                  ? '算法智能推荐引擎：'
                  : 'Interactive Algorithm Selection Engine:'}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {lang === 'zh'
                ? '输入您要计算的数值量级，系统将评估最优求解路径：'
                : 'Enter your target number scale to evaluate the optimal solving route:'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Magnitude:</span>
            <input
              type="number"
              value={testNumber}
              onChange={(e) => setTestNumber(e.target.value)}
              className="w-24 px-2 py-1 text-xs font-bold font-mono border border-slate-300 rounded bg-white text-slate-900"
            />
          </div>
        </div>

        <div className="p-3 bg-white border border-indigo-100 rounded-lg text-xs space-y-1">
          <div className="font-semibold text-indigo-800">
            Recommended: <span className="font-bold underline">{rec.recommended}</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">{rec.reason}</p>
        </div>
      </div>

      {/* Comparison Cards / Table */}
      <div className="space-y-4">
        {methods.map((m, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3 hover:border-indigo-200 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{m.name}</span>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Complexity: <span className="font-bold text-indigo-600">{m.complexity}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Core Operation
                </span>
                <span className="font-medium text-slate-800 mt-0.5 block">{m.operations}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Ideal Scope
                </span>
                <span className="font-medium text-slate-800 mt-0.5 block">{m.bestFor}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Historical Origin
                </span>
                <span className="font-medium text-slate-800 mt-0.5 block">{m.origin}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="text-emerald-800 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-150">
                <span className="font-bold">Advantages:</span> {m.pros}
              </div>
              <div className="text-amber-800 bg-amber-50/60 p-2.5 rounded-lg border border-amber-150">
                <span className="font-bold">Limitations:</span> {m.cons}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
