import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MathView } from './MathView';
import { Language } from '../utils/i18n';
import { QUIZ_DATA } from '../utils/quizData';
import { Award, CheckCircle2, XCircle, RotateCcw, Lightbulb } from 'lucide-react';

interface OlympiadPracticeProps {
  lang?: Language;
}

export const OlympiadPractice: React.FC<OlympiadPracticeProps> = ({ lang = 'en' }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});

  const questions = QUIZ_DATA[lang] || QUIZ_DATA.en;

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
    const q = questions.find((item) => item.id === questionId);
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
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const uiText = {
    en: {
      badge: 'Interactive Practice: Olympiad & Middle School Math',
      title: 'Real-World Math & Olympiad Challenge Quiz',
      subtitle: 'Immediate automated grading, visual formulas, and step-by-step reasoning',
      scoreLabel: 'Current Score:',
      resetBtn: 'Restart Quiz',
      explanationTitle: 'Solution & Step-by-Step Reasoning:',
      correctBadge: 'Correct Answer!',
      incorrectBadge: 'Incorrect. Check the explanation below:',
    },
    es: {
      badge: 'Práctica interactiva: Olimpiadas y Secundaria',
      title: 'Cuestionario de problemas reales y de olimpiadas',
      subtitle: 'Corrección automática inmediata con fórmulas y explicación paso a paso',
      scoreLabel: 'Puntuación:',
      resetBtn: 'Reiniciar prueba',
      explanationTitle: 'Solución y razonamiento detallado:',
      correctBadge: '¡Respuesta correcta!',
      incorrectBadge: 'Incorrecto. Revisa la explicación:',
    },
    fr: {
      badge: 'Entraînement interactif : Olympiades et Collège',
      title: 'Quiz de défis mathématiques et problèmes concrets',
      subtitle: 'Correction automatique immédiate avec formules et démarches détaillées',
      scoreLabel: 'Score actuel :',
      resetBtn: 'Recommencer le quiz',
      explanationTitle: 'Solution et démarche détaillée :',
      correctBadge: 'Bonne réponse !',
      incorrectBadge: 'Incorrect. Consultez l’explication :',
    },
    pt: {
      badge: 'Prática interativa: Olimpíadas e Ensino Fundamental',
      title: 'Quiz de desafios matemáticos e situações reais',
      subtitle: 'Correção automática imediata com fórmulas e passo a passo detalhado',
      scoreLabel: 'Pontuação atual:',
      resetBtn: 'Reiniciar quiz',
      explanationTitle: 'Resolução e justificativa passo a passo:',
      correctBadge: 'Resposta correta!',
      incorrectBadge: 'Incorreto. Veja a explicação a seguir:',
    },
    zh: {
      badge: '提分实战：小学奥数与初中衔接自测',
      title: '真题考场：常见典型应用题与竞赛自测',
      subtitle: '即时判分、详细解析与两数乘积定理公式验证',
      scoreLabel: '答题战报：',
      resetBtn: '重新练习',
      explanationTitle: '名师思路与完整步骤：',
      correctBadge: '回答正确！',
      incorrectBadge: '回答错误，请仔细查看下方解析：',
    },
  }[lang];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
            <Award className="w-4 h-4" />
            <span>{uiText.badge}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {uiText.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {uiText.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
            {uiText.scoreLabel}{' '}
            <span className="font-mono text-indigo-600 font-bold text-sm">
              {correctCount}
            </span>{' '}
            / {questions.length}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title={uiText.resetBtn}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-semibold">
                  {q.type}
                </span>
                {isAnswered && (
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{uiText.correctBadge}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>{uiText.incorrectBadge}</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                {q.id}. {q.question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option, optIdx) => {
                  let optStyle =
                    'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30';

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (optIdx === userChoice) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                    } else {
                      optStyle = 'border-slate-200 bg-white/60 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`p-3 rounded-lg border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {showExplanation[q.id] && (
                <div className="mt-3 p-4 rounded-lg bg-white border border-slate-200 space-y-2 text-xs sm:text-sm">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{uiText.explanationTitle}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
                  <div className="pt-2 border-t border-slate-100 font-mono text-indigo-900 font-semibold">
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
