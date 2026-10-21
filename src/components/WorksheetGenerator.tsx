import React, { useState, useMemo } from 'react';
import { bigIntGcd, bigIntLcm } from '../utils/mathEngine';
import { Printer, RefreshCw, CheckSquare, Square, FileText } from 'lucide-react';

interface QuestionItem {
  id: number;
  question: string;
  answer: string;
  steps: string;
}

export const WorksheetGenerator: React.FC<{ lang: 'zh' | 'en' }> = ({ lang }) => {
  const isZh = lang === 'zh';
  const [level, setLevel] = useState<'basic' | 'medium' | 'fraction' | 'word'>('basic');
  const [count, setCount] = useState<number>(10);
  const [showAnswers, setShowAnswers] = useState<boolean>(true);
  const [seed, setSeed] = useState<number>(1);

  // Generate reproducible questions based on seed
  const questions: QuestionItem[] = useMemo(() => {
    const list: QuestionItem[] = [];

    const pseudoRandom = (idx: number, min: number, max: number) => {
      const x = Math.sin(seed * 997 + idx * 37) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };

    for (let i = 1; i <= count; i++) {
      if (level === 'basic') {
        const a = pseudoRandom(i * 2, 12, 96);
        const b = pseudoRandom(i * 2 + 1, 12, 96);
        const g = Number(bigIntGcd(BigInt(a), BigInt(b)));
        list.push({
          id: i,
          question: isZh ? `求 gcd(${a}, ${b}) 的最大公约数` : `Find the GCD of ${a} and ${b}`,
          answer: `gcd(${a}, ${b}) = ${g}`,
          steps: isZh ? `最大公因数为 ${g}` : `The greatest common divisor is ${g}`,
        });
      } else if (level === 'medium') {
        const a = pseudoRandom(i * 2, 24, 180);
        const b = pseudoRandom(i * 2 + 1, 24, 180);
        const g = Number(bigIntGcd(BigInt(a), BigInt(b)));
        const l = Number(bigIntLcm(BigInt(a), BigInt(b)));
        list.push({
          id: i,
          question: isZh
            ? `求 ${a} 和 ${b} 的最大公约数与最小公倍数`
            : `Find both GCD and LCM of ${a} and ${b}`,
          answer: `gcd = ${g}, lcm = ${l}`,
          steps: isZh
            ? `gcd(${a}, ${b}) = ${g}, lcm(${a}, ${b}) = ${l}`
            : `GCD(${a}, ${b}) = ${g}, LCM(${a}, ${b}) = ${l}`,
        });
      } else if (level === 'fraction') {
        const mult = pseudoRandom(i, 3, 16);
        const p1 = pseudoRandom(i * 3, 2, 9);
        const p2 = pseudoRandom(i * 4, 3, 11);
        const num = mult * p1;
        const den = mult * (p1 === p2 ? p2 + 1 : p2);
        const g = Number(bigIntGcd(BigInt(num), BigInt(den)));
        list.push({
          id: i,
          question: isZh ? `将分数 ${num}/${den} 化为最简分数` : `Reduce the fraction ${num}/${den} to lowest terms`,
          answer: `${num / g} / ${den / g}`,
          steps: isZh ? `分子分母同时除以公因数 ${g}` : `Divide numerator and denominator by GCD ${g}`,
        });
      } else {
        const w = pseudoRandom(i * 2, 36, 120);
        const h = pseudoRandom(i * 2 + 1, 24, 90);
        const g = Number(bigIntGcd(BigInt(w), BigInt(h)));
        const total = (w / g) * (h / g);
        list.push({
          id: i,
          question: isZh
            ? `一张长 ${w}cm、宽 ${h}cm 的长方形纸板，裁成最大的等大正方形且无剩余。求正方形边长及总张数。`
            : `A board of ${w}cm × ${h}cm is cut into equal largest squares without leftover. Find the square edge and total squares.`,
          answer: isZh ? `最大边长 ${g}cm，共裁 ${total} 张` : `Edge: ${g}cm, Total: ${total} squares`,
          steps: isZh
            ? `边长 = gcd(${w}, ${h}) = ${g}; 张数 = (${w}/${g}) × (${h}/${g}) = ${total}`
            : `Edge = gcd(${w}, ${h}) = ${g}; Count = (${w}/${g}) × (${h}/${g}) = ${total}`,
        });
      }
    }

    return list;
  }, [level, count, seed, isZh]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar (Hidden during print) */}
      <div className="no-print bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isZh ? '练习题型难度' : 'Topic & Level'}
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="basic">{isZh ? '基础：两位数求 GCD' : 'Basic: 2-Digit GCD'}</option>
              <option value="medium">{isZh ? '进阶：GCD 与 LCM 双求' : 'Intermediate: GCD & LCM'}</option>
              <option value="fraction">{isZh ? '专项：分数约分化简' : 'Fraction Simplification'}</option>
              <option value="word">{isZh ? '奥数：地砖与裁纸应用题' : 'Word Problems (Tiling)'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isZh ? '题目数量' : 'Problem Count'}
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={5}>5 题</option>
              <option value={10}>10 题 (推荐)</option>
              <option value={15}>15 题</option>
              <option value={20}>20 题 (A4 满版)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowAnswers(!showAnswers)}
            className="self-end px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 h-[34px]"
          >
            {showAnswers ? (
              <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
            ) : (
              <Square className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>{isZh ? '包含参考答案' : 'Show Answer Key'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSeed((prev) => prev + 1)}
            className="self-end px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 h-[34px]"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>{isZh ? '换一组新题' : 'Generate New Set'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="self-end px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>{isZh ? '打印本页 / 另存为 PDF' : 'Print / Save as PDF'}</span>
        </button>
      </div>

      {/* Printable Sheet Canvas */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Printable Header */}
        <div className="border-b border-slate-300 pb-4 text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {isZh ? '小学奥数与初中数学 · 最大公因数专项测试卷' : 'Math Practice Worksheet: Greatest Common Factor'}
          </h2>
          <div className="flex justify-between items-center text-xs text-slate-500 pt-2 px-2">
            <span>{isZh ? '姓名: ______________' : 'Name: ______________'}</span>
            <span>{isZh ? '班级: ______________' : 'Class: ______________'}</span>
            <span>{isZh ? '得分: ______________' : 'Score: ______________'}</span>
            <span>{isZh ? '日期: ______________' : 'Date: ______________'}</span>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {questions.map((q) => (
            <div key={q.id} className="p-3 border-b border-slate-100 pb-4 space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 text-sm font-mono shrink-0">
                  {q.id}.
                </span>
                <span className="text-sm font-medium text-slate-800 leading-snug">
                  {q.question}
                </span>
              </div>
              <div className="h-8 border-b border-dashed border-slate-300 print:h-12" />
            </div>
          ))}
        </div>

        {/* Answer Key (at bottom or printed) */}
        {showAnswers && (
          <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-300 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>{isZh ? '参考答案与解题提示' : 'Answer Key & Quick Notes'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-600">
              {questions.map((q) => (
                <div key={q.id} className="flex items-baseline gap-2">
                  <span className="font-bold font-mono text-slate-800">{q.id}.</span>
                  <span className="font-semibold text-emerald-700 font-mono">{q.answer}</span>
                  <span className="text-slate-400 text-[11px]">({q.steps})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
