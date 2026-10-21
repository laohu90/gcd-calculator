import React, { useState, useMemo } from 'react';
import { generateHomeworkText, formatLatexSolution, bigIntGcd, bigIntLcm } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { FileText, Code2, Copy, Check, Download } from 'lucide-react';

interface HomeworkFormatterProps {
  a?: bigint;
  b?: bigint;
  lang?: Language;
}

export const HomeworkFormatter: React.FC<HomeworkFormatterProps> = ({
  a = 48n,
  b = 72n,
  lang = 'en',
}) => {
  const [activeTab, setActiveTab] = useState<'standard' | 'latex'>('standard');
  const [copied, setCopied] = useState<boolean>(false);

  const safeA = Number(a > 1000000n ? 1000000n : a);
  const safeB = Number(b > 1000000n ? 1000000n : b);

  const standardText = useMemo(() => {
    return generateHomeworkText(safeA, safeB, lang);
  }, [safeA, safeB, lang]);

  const latexCode = useMemo(() => {
    return formatLatexSolution(a, b);
  }, [a, b]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([activeTab === 'standard' ? standardText : latexCode], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gcd_${a}_${b}_${activeTab === 'standard' ? 'solution.txt' : 'equation.tex'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>
              {lang === 'zh'
                ? '标准课后作业答题规范与 LaTeX 代码导出'
                : 'Standard Classroom Homework Formatter & LaTeX Export'}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'zh'
              ? '一键生成符合中小学数学考试标准的完整解题步骤，或导出 LaTeX 源码用于排版排版。'
              : 'Generate curriculum-compliant full exam solution steps or copy clean LaTeX math markup.'}
          </p>
        </div>

        {/* Tab & Download toolbar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('standard')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'standard'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? '标准作业格式' : 'Exam Solution'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('latex')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'latex'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>LaTeX Code</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="p-1.5 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-slate-700 text-xs transition-colors"
            title="Download file"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor / Code Container */}
      <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/60 text-xs text-slate-300 font-mono">
          <span>{activeTab === 'standard' ? 'solution_export.txt' : 'math_equations.tex'}</span>
          <button
            type="button"
            onClick={() => handleCopy(activeTab === 'standard' ? standardText : latexCode)}
            className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono text-slate-100 overflow-x-auto leading-relaxed max-h-96 whitespace-pre-wrap">
          {activeTab === 'standard' ? standardText : latexCode}
        </pre>
      </div>
    </div>
  );
};
