import React, { useState, useMemo } from 'react';
import { bigIntGcd, bigIntLcm } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { Printer, RefreshCw, CheckSquare, Square, FileText } from 'lucide-react';

interface QuestionItem {
  id: number;
  question: string;
  answer: string;
  steps: string;
}

export const WorksheetGenerator: React.FC<{ lang?: Language }> = ({ lang = 'en' }) => {
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
        const qText =
          lang === 'zh'
            ? `求 gcd(${a}, ${b}) 的最大公约数`
            : lang === 'es'
            ? `Calcular el MCD de ${a} y ${b}`
            : lang === 'fr'
            ? `Calculer le PGCD de ${a} et ${b}`
            : lang === 'pt'
            ? `Calcular o MDC de ${a} e ${b}`
            : `Find the GCD of ${a} and ${b}`;
        const aText = `gcd(${a}, ${b}) = ${g}`;
        const sText =
          lang === 'zh'
            ? `最大公约数为 ${g}`
            : lang === 'es'
            ? `El MCD es ${g}`
            : lang === 'fr'
            ? `Le PGCD est ${g}`
            : lang === 'pt'
            ? `O MDC é ${g}`
            : `The greatest common divisor is ${g}`;
        list.push({ id: i, question: qText, answer: aText, steps: sText });
      } else if (level === 'medium') {
        const a = pseudoRandom(i * 2, 24, 180);
        const b = pseudoRandom(i * 2 + 1, 24, 180);
        const g = Number(bigIntGcd(BigInt(a), BigInt(b)));
        const l = Number(bigIntLcm(BigInt(a), BigInt(b)));
        const qText =
          lang === 'zh'
            ? `求 ${a} 和 ${b} 的最大公约数与最小公倍数`
            : lang === 'es'
            ? `Hallar el MCD y el MCM de ${a} y ${b}`
            : lang === 'fr'
            ? `Calculer le PGCD et le PPCM de ${a} et ${b}`
            : lang === 'pt'
            ? `Encontrar o MDC e o MMC de ${a} e ${b}`
            : `Find both GCD and LCM of ${a} and ${b}`;
        list.push({
          id: i,
          question: qText,
          answer: `gcd = ${g}, lcm = ${l}`,
          steps: `GCD(${a}, ${b}) = ${g}, LCM(${a}, ${b}) = ${l}`,
        });
      } else if (level === 'fraction') {
        const mult = pseudoRandom(i, 3, 16);
        const p1 = pseudoRandom(i * 3, 2, 9);
        const p2 = pseudoRandom(i * 4, 3, 11);
        const num = mult * p1;
        const den = mult * (p1 === p2 ? p2 + 1 : p2);
        const g = Number(bigIntGcd(BigInt(num), BigInt(den)));
        const qText =
          lang === 'zh'
            ? `将分数 ${num}/${den} 化为最简分数`
            : lang === 'es'
            ? `Simplificar la fracción ${num}/${den}`
            : lang === 'fr'
            ? `Rendre irréductible la fraction ${num}/${den}`
            : lang === 'pt'
            ? `Simplificar a fração ${num}/${den}`
            : `Reduce fraction ${num}/${den} to simplest form`;
        list.push({
          id: i,
          question: qText,
          answer: `${num / g} / ${den / g}`,
          steps: `÷ ${g}`,
        });
      } else {
        const w = pseudoRandom(i * 2, 36, 120);
        const h = pseudoRandom(i * 2 + 1, 24, 90);
        const g = Number(bigIntGcd(BigInt(w), BigInt(h)));
        const total = (w / g) * (h / g);
        const qText =
          lang === 'zh'
            ? `长方形纸板长 ${w}cm、宽 ${h}cm，裁成最大等大正方形且无剩余。求正方形边长及总张数。`
            : lang === 'es'
            ? `Cartulina de ${w}cm × ${h}cm se corta en cuadrados iguales máximos sin sobrantes. Hallar lado y total.`
            : lang === 'fr'
            ? `Un carton de ${w}cm × ${h}cm est découpé en carrés maximaux sans chute. Trouver côté et total.`
            : lang === 'pt'
            ? `Cartolina de ${w}cm × ${h}cm é cortada em quadrados máximos sem sobras. Encontrar lado e total.`
            : `A board of ${w}cm × ${h}cm is cut into equal largest squares without leftover. Find edge and total.`;
        list.push({
          id: i,
          question: qText,
          answer: `Edge: ${g}cm, Total: ${total}`,
          steps: `gcd(${w}, ${h}) = ${g}; (${w}/${g}) × (${h}/${g}) = ${total}`,
        });
      }
    }

    return list;
  }, [level, count, seed, lang]);

  const handlePrint = () => {
    window.print();
  };

  const levelOptions = {
    en: [
      { id: 'basic', label: 'Basic: 2-Digit GCD' },
      { id: 'medium', label: 'Intermediate: GCD & LCM' },
      { id: 'fraction', label: 'Fraction Simplification' },
      { id: 'word', label: 'Word Problems (Tiling)' },
    ],
    es: [
      { id: 'basic', label: 'Básico: MCD de 2 cifras' },
      { id: 'medium', label: 'Intermedio: MCD y MCM' },
      { id: 'fraction', label: 'Simplificación de fracciones' },
      { id: 'word', label: 'Problemas de aplicación' },
    ],
    fr: [
      { id: 'basic', label: 'Base : PGCD à 2 chiffres' },
      { id: 'medium', label: 'Intermédiaire : PGCD & PPCM' },
      { id: 'fraction', label: 'Simplification de fractions' },
      { id: 'word', label: 'Problèmes de pavage / partage' },
    ],
    pt: [
      { id: 'basic', label: 'Básico: MDC de 2 dígitos' },
      { id: 'medium', label: 'Intermediário: MDC e MMC' },
      { id: 'fraction', label: 'Simplificação de frações' },
      { id: 'word', label: 'Problemas contextualizados' },
    ],
    zh: [
      { id: 'basic', label: '基础：两位数求 GCD' },
      { id: 'medium', label: '进阶：GCD 与 LCM 双求' },
      { id: 'fraction', label: '专项：分数约分化简' },
      { id: 'word', label: '奥数：地砖与裁纸应用题' },
    ],
  }[lang];

  const labels = {
    en: {
      topicLevel: 'Topic & Level',
      problemCount: 'Problem Count',
      showAnswer: 'Show Answer Key',
      newSet: 'Generate New Set',
      printPdf: 'Print / Save as PDF',
      worksheetTitle: 'Math Practice Worksheet: Greatest Common Factor & LCM',
      name: 'Name: ______________',
      class: 'Class: ______________',
      score: 'Score: ______________',
      date: 'Date: ______________',
      answerKey: 'Answer Key & Quick Notes',
      unitQ: 'problems',
    },
    es: {
      topicLevel: 'Nivel y tema',
      problemCount: 'Cantidad de ejercicios',
      showAnswer: 'Incluir respuestas',
      newSet: 'Generar nuevos ejercicios',
      printPdf: 'Imprimir / Guardar en PDF',
      worksheetTitle: 'Ficha de Ejercicios: Máximo Común Divisor y MCM',
      name: 'Nombre: ______________',
      class: 'Curso: ______________',
      score: 'Nota: ______________',
      date: 'Fecha: ______________',
      answerKey: 'Hoja de respuestas y soluciones',
      unitQ: 'ejercicios',
    },
    fr: {
      topicLevel: 'Niveau et thème',
      problemCount: 'Nombre d’exercices',
      showAnswer: 'Afficher le corrigé',
      newSet: 'Générer de nouveaux exercices',
      printPdf: 'Imprimer / Enregistrer en PDF',
      worksheetTitle: 'Fiche d’exercices : Plus Grand Commun Diviseur & PPCM',
      name: 'Nom : ______________',
      class: 'Classe : ______________',
      score: 'Note : ______________',
      date: 'Date : ______________',
      answerKey: 'Corrigé et rappels méthodologiques',
      unitQ: 'exercices',
    },
    pt: {
      topicLevel: 'Nível e tema',
      problemCount: 'Quantidade de questões',
      showAnswer: 'Mostrar gabarito',
      newSet: 'Gerar novos exercícios',
      printPdf: 'Imprimir / Salvar em PDF',
      worksheetTitle: 'Folha de Atividades: Máximo Divisor Comum e MMC',
      name: 'Nome: ______________',
      class: 'Turma: ______________',
      score: 'Nota: ______________',
      date: 'Data: ______________',
      answerKey: 'Gabarito e resoluções rápidas',
      unitQ: 'questões',
    },
    zh: {
      topicLevel: '练习题型难度',
      problemCount: '题目数量',
      showAnswer: '包含参考答案',
      newSet: '换一组新题',
      printPdf: '打印本页 / 另存为 PDF',
      worksheetTitle: '中小学数学 · 最大公因数与最小公倍数专项测试卷',
      name: '姓名: ______________',
      class: '班级: ______________',
      score: '得分: ______________',
      date: '日期: ______________',
      answerKey: '参考答案与解题提示',
      unitQ: '题',
    },
  }[lang];

  return (
    <div className="space-y-6">
      {/* Controls Bar (Hidden during print) */}
      <div className="no-print bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {labels.topicLevel}
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {levelOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {labels.problemCount}
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={5}>5 {labels.unitQ}</option>
              <option value={10}>10 {labels.unitQ}</option>
              <option value={15}>15 {labels.unitQ}</option>
              <option value={20}>20 {labels.unitQ} (A4)</option>
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
            <span>{labels.showAnswer}</span>
          </button>

          <button
            type="button"
            onClick={() => setSeed((prev) => prev + 1)}
            className="self-end px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 h-[34px]"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>{labels.newSet}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="self-end px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>{labels.printPdf}</span>
        </button>
      </div>

      {/* Printable Sheet Canvas */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Printable Header */}
        <div className="border-b border-slate-300 pb-4 text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {labels.worksheetTitle}
          </h2>
          <div className="flex justify-between items-center text-xs text-slate-500 pt-2 px-2">
            <span>{labels.name}</span>
            <span>{labels.class}</span>
            <span>{labels.score}</span>
            <span>{labels.date}</span>
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
              <span>{labels.answerKey}</span>
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
