import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  bigIntGcd,
  bigIntLcm,
  multiGcd,
  multiLcm,
  getEuclideanSteps,
  getExtendedEuclidean,
  getShortDivision,
  getSuccessiveSubtractions,
  getDivisors,
} from './utils/mathEngine';
import { translations, Language } from './utils/i18n';
import { Navbar } from './components/Navbar';
import { ShortDivisionView } from './components/ShortDivisionView';
import { EuclideanView } from './components/EuclideanView';
import { PrimeFactorView } from './components/PrimeFactorView';
import { SubtractionView } from './components/SubtractionView';
import { GeometricTilingView } from './components/GeometricTilingView';
import { FactoringTool } from './components/FactoringTool';
import { FactorExplorer } from './components/FactorExplorer';
import { OlympiadPractice } from './components/OlympiadPractice';
import { KnowledgeWiki } from './components/KnowledgeWiki';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { PopularPairsDirectory } from './components/PopularPairsDirectory';
import { AdSenseSideRail } from './components/AdSenseSlot';
import {
  Copy,
  Check,
  Share2,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Award,
  BookOpen,
  Calculator,
  FileCheck,
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const t = translations[lang];

  // Input state
  const [mode, setMode] = useState<'two' | 'multi'>('two');
  const [numAStr, setNumAStr] = useState<string>('48');
  const [numBStr, setNumBStr] = useState<string>('72');
  const [multiInputStr, setMultiInputStr] = useState<string>('84, 126, 210');

  // Main navigation tab for compact workbench layout
  const [activeMainTab, setActiveMainTab] = useState<
    'algorithms' | 'factors' | 'factoring' | 'directory' | 'worksheet' | 'practice' | 'wiki'
  >('algorithms');

  // Algorithm sub-tabs for 2-number mode
  const [activeAlgoTab, setActiveAlgoTab] = useState<
    'short' | 'euclid' | 'prime' | 'subtraction' | 'tiling'
  >('short');

  // Feedback states
  const [copied, setCopied] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Initialize from URL query parameters on load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlA = params.get('a');
      const urlB = params.get('b');
      const urlNums = params.get('nums');
      const urlLang = params.get('lang');

      if (urlLang === 'en' || urlLang === 'zh') {
        setLang(urlLang);
      }
      if (urlA && urlB) {
        setMode('two');
        setNumAStr(urlA);
        setNumBStr(urlB);
      } else if (urlNums) {
        setMode('multi');
        setMultiInputStr(urlNums);
      }
    } catch {
      // Fallback
    }
  }, []);

  // Update browser URL query params dynamically for SEO and sharing
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (mode === 'two' && numAStr && numBStr) {
        url.searchParams.set('a', numAStr);
        url.searchParams.set('b', numBStr);
        url.searchParams.delete('nums');
      } else if (mode === 'multi' && multiInputStr) {
        url.searchParams.set('nums', multiInputStr);
        url.searchParams.delete('a');
        url.searchParams.delete('b');
      }
      if (lang === 'en') {
        url.searchParams.set('lang', 'en');
      } else {
        url.searchParams.delete('lang');
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  }, [mode, numAStr, numBStr, multiInputStr, lang]);

  // Parse numbers safely
  const parsedA = useMemo(() => {
    try {
      const clean = numAStr.replace(/[^0-9]/g, '');
      return clean ? BigInt(clean) : 0n;
    } catch {
      return 0n;
    }
  }, [numAStr]);

  const parsedB = useMemo(() => {
    try {
      const clean = numBStr.replace(/[^0-9]/g, '');
      return clean ? BigInt(clean) : 0n;
    } catch {
      return 0n;
    }
  }, [numBStr]);

  const parsedMulti = useMemo(() => {
    const tokens = multiInputStr.split(/[,，\s]+/).filter(Boolean);
    const nums: bigint[] = [];
    for (const token of tokens) {
      try {
        const c = token.replace(/[^0-9]/g, '');
        if (c) nums.push(BigInt(c));
      } catch {
        // ignore
      }
    }
    return nums.length > 0 ? nums : [0n];
  }, [multiInputStr]);

  // Calculations for Two-Number Mode
  const twoGcd = useMemo(() => bigIntGcd(parsedA, parsedB), [parsedA, parsedB]);
  const twoLcm = useMemo(() => bigIntLcm(parsedA, parsedB), [parsedA, parsedB]);
  const isCoprime = twoGcd === 1n && parsedA > 1n && parsedB > 1n;

  // Multi-number calculations
  const multiGcdVal = useMemo(() => multiGcd(parsedMulti), [parsedMulti]);
  const multiLcmVal = useMemo(() => multiLcm(parsedMulti), [parsedMulti]);

  // Dynamic Document Title for SEO indexing
  useEffect(() => {
    if (mode === 'two' && parsedA > 0n && parsedB > 0n) {
      document.title =
        lang === 'zh'
          ? `gcd(${parsedA}, ${parsedB}) = ${twoGcd} 最大公约数计算与步骤 - GCD 数学工坊`
          : `GCD of ${parsedA} and ${parsedB} is ${twoGcd} | GCD Math Hub`;
    } else {
      document.title =
        lang === 'zh'
          ? '最大公约数GCD计算器 - 在线求最大公因数与最小公倍数(含短除法与详细步骤)'
          : 'Greatest Common Divisor (GCD/GCF) Calculator with Steps | GCD Math Hub';
    }
  }, [mode, parsedA, parsedB, twoGcd, lang]);

  // Safe numbers for visualizers
  const safeA = Number(parsedA > 1000000n ? 1000000n : parsedA);
  const safeB = Number(parsedB > 1000000n ? 1000000n : parsedB);
  const safeGcd = Number(twoGcd > 1000000n ? 1000000n : twoGcd);

  // Euclidean steps
  const euclideanSteps = useMemo(() => {
    if (parsedA <= 0n || parsedB <= 0n) return [];
    return getEuclideanSteps(parsedA, parsedB);
  }, [parsedA, parsedB]);

  // Extended Euclidean
  const extendedEuclid = useMemo(() => {
    if (parsedA <= 0n || parsedB <= 0n) return undefined;
    return getExtendedEuclidean(parsedA, parsedB);
  }, [parsedA, parsedB]);

  // Short division data
  const shortDivData = useMemo(() => {
    if (safeA <= 1 || safeB <= 1) {
      return getShortDivision([Math.max(1, safeA), Math.max(1, safeB)]);
    }
    return getShortDivision([safeA, safeB]);
  }, [safeA, safeB]);

  // Subtraction data
  const subtractionData = useMemo(() => {
    if (safeA <= 1 || safeB <= 1) {
      return getSuccessiveSubtractions(Math.max(1, safeA), Math.max(1, safeB));
    }
    return getSuccessiveSubtractions(safeA, safeB);
  }, [safeA, safeB]);

  // Common divisors for A and B
  const commonDivisors = useMemo(() => {
    if (safeGcd <= 0 || safeGcd > 50000) return [];
    return getDivisors(safeGcd);
  }, [safeGcd]);

  // Copy result action
  const handleCopyResult = useCallback(() => {
    let text = '';
    if (mode === 'two') {
      text =
        lang === 'zh'
          ? `【最大公约数与最小公倍数计算结果】\n数字: a = ${parsedA.toString()}, b = ${parsedB.toString()}\n最大公约数 GCD: gcd(${parsedA.toString()}, ${parsedB.toString()}) = ${twoGcd.toString()}\n最小公倍数 LCM: lcm(${parsedA.toString()}, ${parsedB.toString()}) = ${twoLcm.toString()}\n恒等式: ${parsedA.toString()} × ${parsedB.toString()} = ${twoGcd.toString()} × ${twoLcm.toString()}\n在线步骤: ${window.location.href}`
          : `[GCD & LCM Calculation Result]\nNumbers: a = ${parsedA.toString()}, b = ${parsedB.toString()}\nGCD: gcd(${parsedA.toString()}, ${parsedB.toString()}) = ${twoGcd.toString()}\nLCM: lcm(${parsedA.toString()}, ${parsedB.toString()}) = ${twoLcm.toString()}\nIdentity: ${parsedA.toString()} × ${parsedB.toString()} = ${twoGcd.toString()} × ${twoLcm.toString()}\nURL: ${window.location.href}`;
    } else {
      text =
        lang === 'zh'
          ? `【多数字最大公因数与最小公倍数】\n数字: [${parsedMulti.map((n) => n.toString()).join(', ')}]\nGCD: ${multiGcdVal.toString()}\nLCM: ${multiLcmVal.toString()}\n在线步骤: ${window.location.href}`
          : `[Multiple Numbers GCD & LCM]\nNumbers: [${parsedMulti.map((n) => n.toString()).join(', ')}]\nGCD: ${multiGcdVal.toString()}\nLCM: ${multiLcmVal.toString()}\nURL: ${window.location.href}`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [mode, parsedA, parsedB, twoGcd, twoLcm, parsedMulti, multiGcdVal, multiLcmVal, lang]);

  // Share link action
  const handleShareLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  }, []);

  // Preset loaders
  const loadPair = (a: number, b: number) => {
    setMode('two');
    setNumAStr(a.toString());
    setNumBStr(b.toString());
  };

  const loadMulti = (str: string) => {
    setMode('multi');
    setMultiInputStr(str);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans">
      {/* Top Bar following Top Bar Contract */}
      <Navbar
        onCopyResult={handleCopyResult}
        hasResult={twoGcd > 0n}
        copied={copied}
        lang={lang}
        onToggleLang={() => setLang(lang === 'zh' ? 'en' : 'zh')}
        onSelectTab={setActiveMainTab}
      />

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{t.shareToast}</span>
        </div>
      )}

      {/* Outer wrapper: 3-column Layout with Left & Right Side Rails on Widescreen */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 flex justify-center gap-6">
        {/* Left Side Rail: Google AdSense Skyscraper (160x600) */}
        <AdSenseSideRail position="left" slotId="LEFT_SKYSCRAPER" lang={lang} />

        {/* Center Main Stage (Focused, Compact, Highly Usable) */}
        <main className="flex-1 min-w-0 max-w-5xl space-y-5">
          {/* Compact Hero Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-200/80">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.heroHeading}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'zh'
                  ? '小学奥数短除法 · 欧几里得辗转相除 · 质因数分解 · 初中因式分解前置'
                  : 'Fast online GCD & LCM calculator with complete step-by-step solutions'}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-xs">
              <button
                type="button"
                onClick={handleShareLink}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5"
                title={t.shareBtn}
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === 'zh' ? '分享此题' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Unified Compact Calculator Dashboard */}
          <section
            id="calculator"
            className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4"
          >
            {/* Top Toolbar: Mode tabs & Quick Presets in one line */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setMode('two')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    mode === 'two'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'zh' ? '两个数步骤模式' : 'Two Numbers'}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('multi')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    mode === 'multi'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'zh' ? '多数字模式 (3+)' : 'Multiple (3+)'}
                </button>
              </div>

              {/* Quick Presets row */}
              <div className="flex items-center flex-wrap gap-1 text-[11px]">
                <span className="text-slate-400 mr-0.5">{lang === 'zh' ? '例题:' : 'Presets:'}</span>
                <button
                  type="button"
                  onClick={() => loadPair(48, 72)}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-mono transition-colors"
                >
                  (48, 72)
                </button>
                <button
                  type="button"
                  onClick={() => loadPair(105, 252)}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-mono transition-colors"
                >
                  (105, 252)
                </button>
                <button
                  type="button"
                  onClick={() => loadPair(1071, 462)}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-mono transition-colors"
                >
                  (1071, 462)
                </button>
                <button
                  type="button"
                  onClick={() => loadPair(17, 23)}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-mono transition-colors"
                >
                  (17, 23 互质)
                </button>
                <button
                  type="button"
                  onClick={() => loadMulti('84, 126, 210')}
                  className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-mono transition-colors"
                >
                  (84, 126, 210)
                </button>
              </div>
            </div>

            {/* Split Screen: Left Inputs vs Right Instant Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* Left Column: Number inputs & common divisors (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                {mode === 'two' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {lang === 'zh' ? '整数 A (第一个数)' : 'Integer A'}
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={numAStr}
                        onChange={(e) => setNumAStr(e.target.value)}
                        placeholder="48"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {lang === 'zh' ? '整数 B (第二个数)' : 'Integer B'}
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={numBStr}
                        onChange={(e) => setNumBStr(e.target.value)}
                        placeholder="72"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'zh' ? '输入多个整数 (逗号或空格隔开)' : 'Enter Integers (3 or more)'}
                    </label>
                    <input
                      type="text"
                      value={multiInputStr}
                      onChange={(e) => setMultiInputStr(e.target.value)}
                      placeholder="84, 126, 210, 420"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}

                {/* Compact Divisors strip */}
                {mode === 'two' && commonDivisors.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-2">
                    <span className="text-slate-500 shrink-0">
                      {lang === 'zh' ? '公共因数:' : 'Common Divisors:'}
                    </span>
                    <div className="flex flex-wrap gap-1 font-mono">
                      {commonDivisors.map((d) => (
                        <span
                          key={d}
                          className={`px-1.5 py-0.5 rounded text-[11px] ${
                            d === safeGcd
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: GCD, LCM & Identity (5 cols) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
                {/* GCD Box */}
                <div className="p-3.5 rounded-xl bg-indigo-600 text-white shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] text-indigo-100 font-medium">
                    <span>{lang === 'zh' ? '最大公约数 GCD' : 'Greatest Common Divisor'}</span>
                    <span className="font-mono">gcd(a,b)</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight tabular-nums my-1 break-all">
                    {mode === 'two' ? twoGcd.toString() : multiGcdVal.toString()}
                  </div>
                  <div className="text-[10px] text-indigo-200 truncate">
                    {isCoprime
                      ? lang === 'zh'
                        ? '两数互质 (gcd=1)'
                        : 'Coprime pair'
                      : lang === 'zh'
                      ? '最大公有约数'
                      : 'Highest divisor'}
                  </div>
                </div>

                {/* LCM Box */}
                <div className="p-3.5 rounded-xl bg-slate-900 text-white shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{lang === 'zh' ? '最小公倍数 LCM' : 'Least Common Multiple'}</span>
                    <span className="font-mono">lcm(a,b)</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight tabular-nums my-1 text-amber-400 break-all">
                    {mode === 'two' ? twoLcm.toString() : multiLcmVal.toString()}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {lang === 'zh' ? '最小公有倍数' : 'Smallest multiple'}
                  </div>
                </div>

                {/* Identity banner spans 2 cols */}
                <div className="col-span-2 p-2 rounded-lg bg-slate-100 border border-slate-200 text-xs flex items-center justify-between font-mono">
                  {mode === 'two' ? (
                    <span className="text-slate-700 truncate">
                      {parsedA.toString()} × {parsedB.toString()} = {twoGcd.toString()} × {twoLcm.toString()}
                    </span>
                  ) : (
                    <span className="text-slate-600 text-xs">
                      {lang === 'zh' ? '多数字计算已完成' : 'Multi-number calculated'}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleCopyResult}
                    className="ml-2 text-indigo-600 hover:text-indigo-800 text-xs font-semibold shrink-0"
                  >
                    {copied ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制公式' : 'Copy')}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Compact Feature Tabs Navigation Bar */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl overflow-x-auto text-xs font-medium no-print">
            <button
              type="button"
              onClick={() => setActiveMainTab('algorithms')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'algorithms'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'zh' ? '四法图解' : 'Step Visualizers'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab('factors')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'factors'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'zh' ? '因数与规范作业' : 'Factors & Solution'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab('factoring')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'factoring'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'zh' ? '因式分解与约分' : 'Factoring & Fractions'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab('directory')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'directory'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'zh' ? '高频数对速查' : 'Search Directory'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab('worksheet')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'worksheet'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'zh' ? '生成打印作业' : 'Worksheets'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab('practice')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'practice'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'zh' ? '奥数真题自测' : 'Olympiad Quiz'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab('wiki')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'wiki'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'zh' ? '数论百科与FAQ' : 'Theory & FAQs'}</span>
            </button>
          </div>

          {/* Active Tab Panel Content */}
          <div className="transition-all">
            {/* 1. Algorithm Visualizers */}
            {activeMainTab === 'algorithms' && (
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-2xs space-y-4">
                {/* Algorithm Subtabs */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div className="text-xs font-bold text-slate-800">
                    {lang === 'zh' ? '详细推导方法切换：' : 'Select Method:'}
                  </div>
                  <div className="flex items-center flex-wrap gap-1 p-0.5 bg-slate-100 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveAlgoTab('short')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeAlgoTab === 'short'
                          ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.tabShort}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAlgoTab('euclid')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeAlgoTab === 'euclid'
                          ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.tabEuclid}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAlgoTab('prime')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeAlgoTab === 'prime'
                          ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.tabPrime}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAlgoTab('subtraction')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeAlgoTab === 'subtraction'
                          ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.tabSubtraction}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAlgoTab('tiling')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeAlgoTab === 'tiling'
                          ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.tabTiling}
                    </button>
                  </div>
                </div>

                {/* Subtab Content */}
                {activeAlgoTab === 'short' && <ShortDivisionView data={shortDivData} />}
                {activeAlgoTab === 'euclid' && (
                  <EuclideanView
                    steps={euclideanSteps}
                    extended={extendedEuclid}
                    a={parsedA}
                    b={parsedB}
                  />
                )}
                {activeAlgoTab === 'prime' && <PrimeFactorView a={safeA} b={safeB} />}
                {activeAlgoTab === 'subtraction' && (
                  <SubtractionView data={subtractionData} />
                )}
                {activeAlgoTab === 'tiling' && (
                  <GeometricTilingView a={safeA} b={safeB} gcd={safeGcd} />
                )}
              </div>
            )}

            {/* 2. Factor Pairs, Homework Solution & Divisibility Rules */}
            {activeMainTab === 'factors' && (
              <FactorExplorer
                a={safeA}
                b={safeB}
                gcd={safeGcd}
                lcm={Number(twoLcm > 1000000000n ? 1000000000n : twoLcm)}
                lang={lang}
              />
            )}

            {/* 3. Factoring Precursor */}
            {activeMainTab === 'factoring' && <FactoringTool />}

            {/* 3. Programmatic SEO Directory */}
            {activeMainTab === 'directory' && (
              <PopularPairsDirectory
                onSelectPair={loadPair}
                onSelectMulti={loadMulti}
                lang={lang}
              />
            )}

            {/* 4. Worksheet Generator */}
            {activeMainTab === 'worksheet' && <WorksheetGenerator lang={lang} />}

            {/* 5. Olympiad Practice Quiz */}
            {activeMainTab === 'practice' && <OlympiadPractice />}

            {/* 6. Math Encyclopedia & SEO Wiki */}
            {activeMainTab === 'wiki' && <KnowledgeWiki />}
          </div>
        </main>

        {/* Right Side Rail: Google AdSense Skyscraper (160x600) */}
        <AdSenseSideRail position="right" slotId="RIGHT_SKYSCRAPER" lang={lang} />
      </div>

      {/* Footer strictly anti-slop */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">
              {lang === 'zh' ? 'GCD 数学工坊' : 'GCD Math Hub'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {lang === 'zh'
                ? '免费在线最大公约数与最小公倍数计算器'
                : 'Free Online GCD & LCM Step-by-Step Calculator'}
            </span>
          </div>
          <div className="text-slate-400">
            {lang === 'zh'
              ? '支持短除法 · 辗转相除 · 质因数分解 · 几何铺砖 · 可打印作业'
              : 'Ladder Method · Euclidean Algorithm · Prime Venn · Worksheets'}
          </div>
        </div>
      </footer>
    </div>
  );
}
