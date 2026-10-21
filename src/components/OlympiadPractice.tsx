import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MathView } from './MathView';
import { Award, CheckCircle2, XCircle, RotateCcw, Lightbulb } from 'lucide-react';

interface QuizQuestion {
  id: number;
  type: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  mathFormula: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: '小学奥数 · 经典裁纸题',
    question:
      '有一张长 72 厘米、宽 48 厘米的长方形硬纸板。要把这张纸裁成若干张大小相同的正方形纸片，且纸张没有剩余。正方形纸片的边长最大是多少厘米？一共可以裁多少张？',
    options: [
      '最大边长 12 厘米，可裁 24 张',
      '最大边长 24 厘米，可裁 6 张',
      '最大边长 24 厘米，可裁 12 张',
      '最大边长 16 厘米，可裁 8 张',
    ],
    correctIndex: 1,
    explanation:
      '正方形的最大边长即为长与宽的最大公约数 gcd(72, 48) = 24 厘米。长边可切 72 ÷ 24 = 3 段，宽边可切 48 ÷ 24 = 2 段，总张数 = 3 × 2 = 6 张。',
    mathFormula: '\\gcd(72, 48) = 24; \\quad \\frac{72}{24} \\times \\frac{48}{24} = 3 \\times 2 = 6',
  },
  {
    id: 2,
    type: '中考前置 · 互质数特征',
    question: '下列各组数字中，哪一组属于“互质数”（即最大公约数为 1）？',
    options: ['51 与 85', '39 与 65', '14 与 25', '27 与 57'],
    correctIndex: 2,
    explanation:
      '14 的因数有 1, 2, 7, 14；25 的因数有 1, 5, 25。两数的公因数只有 1，因此 gcd(14, 25) = 1，属于互质数。其余选项：51 与 85 公因数有 17；39 与 65 公因数有 13；27 与 57 公因数有 3。',
    mathFormula: '\\gcd(14, 25) = 1',
  },
  {
    id: 3,
    type: '小学奥数 · 物品分组均分',
    question:
      '学校买来 84 支铅笔和 126 本笔记本，打算平均分给获奖的优秀学生。如果每位同学分得的铅笔数相同，笔记本数也相同，且全部刚好分完，最多可以奖励多少名学生？',
    options: ['21 名', '28 名', '42 名', '63 名'],
    correctIndex: 2,
    explanation:
      '学生人数必须同时是 84 和 126 的公因数；要求“最多”，即求最大公约数 gcd(84, 126) = 42 人。此时每人分得铅笔 84 ÷ 42 = 2 支，笔记本 126 ÷ 42 = 3 本。',
    mathFormula: '\\gcd(84, 126) = 42',
  },
  {
    id: 4,
    type: '数论核心公式 · GCD 与 LCM 关系',
    question:
      '已知两个正整数 a 与 b，它们的最大公约数 gcd(a, b) = 12，最小公倍数 lcm(a, b) = 360。如果已知其中一个数 a = 72，那么另一个数 b 是多少？',
    options: ['48', '60', '84', '96'],
    correctIndex: 1,
    explanation:
      '根据两数乘积定理 a × b = gcd(a, b) × lcm(a, b)，代入已知量得 72 × b = 12 × 360 = 4320，因此 b = 4320 ÷ 72 = 60。',
    mathFormula: 'a \\times b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b) \\implies b = \\frac{12 \\times 360}{72} = 60',
  },
];

export const OlympiadPractice: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});

  const handleSelect = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
    setShowExplanation((prev) => ({
      ...prev,
      [questionId]: true,
    }));

    // Trigger confetti if correct
    const q = QUIZ_QUESTIONS.find((item) => item.id === questionId);
    if (q && q.correctIndex === optionIdx) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowExplanation({});
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
            <Award className="w-4 h-4" />
            <span>提分实战：小学奥数与初中衔接自测</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            最大公因数经典真题精选
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            涵盖等长切分、植树分发、互质特征与双数乘积定律。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-600 font-mono">
            进度: <span className="font-bold text-indigo-600">{answeredCount}</span> /{' '}
            {QUIZ_QUESTIONS.length}
            {answeredCount > 0 && (
              <span className="ml-2 text-emerald-600">
                (正确: {correctCount})
              </span>
            )}
          </div>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新测验</span>
            </button>
          )}
        </div>
      </div>

      {/* Quiz List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const hasAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-indigo-600">
                    {q.type}
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {idx + 1}. {q.question}
                  </h4>
                </div>
                {hasAnswered && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 回答正确
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> 需再思考
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  let btnStyle =
                    'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30';
                  if (hasAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (optIdx === selected) {
                      btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                    } else {
                      btnStyle = 'border-slate-200 bg-white text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={hasAnswered}
                      className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Explanation */}
              {showExplanation[q.id] && (
                <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-100 space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-1.5 font-semibold text-indigo-900">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>解题思路与数学算式：</span>
                  </div>
                  <p className="leading-relaxed">{q.explanation}</p>
                  <div className="p-2 bg-white rounded border border-indigo-150 font-mono text-indigo-900">
                    <MathView math={q.mathFormula} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
