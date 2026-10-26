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
  getMultiEuclideanSteps,
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
import { FractionStudio } from './components/FractionStudio';
import { RealWorldScenarios } from './components/RealWorldScenarios';
import { AlgorithmComparison } from './components/AlgorithmComparison';
import { EdgeCasesTool } from './components/EdgeCasesTool';
import { HomeworkFormatter } from './components/HomeworkFormatter';
import { AdSenseSideRail } from './components/AdSenseSlot';
import { simplifyFraction } from './utils/mathEngine';
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
  Divide,
  LayoutGrid,
  Table,
  HelpCircle,
  FileText,
  AlertTriangle,
  Info,
} from 'lucide-react';

export default function App() {
  // Default language is English ('en') as requested
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;

  // Input state
  const [mode, setMode] = useState<'two' | 'multi'>('two');
  const [numAStr, setNumAStr] = useState<string>('48');
  const [numBStr, setNumBStr] = useState<string>('72');
  const [multiInputStr, setMultiInputStr] = useState<string>('84, 126, 210');

  // Main navigation tab for compact workbench layout
  const [activeMainTab, setActiveMainTab] = useState<
    | 'algorithms'
    | 'fractions'
    | 'realworld'
    | 'comparison'
    | 'edgecases'
    | 'homework'
    | 'factors'
    | 'factoring'
    | 'directory'
    | 'worksheet'
    | 'practice'
    | 'wiki'
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

      if (
        urlLang === 'en' ||
        urlLang === 'es' ||
        urlLang === 'fr' ||
        urlLang === 'pt' ||
        urlLang === 'zh'
      ) {
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
      if (lang !== 'en') {
        url.searchParams.set('lang', lang);
      } else {
        url.searchParams.delete('lang');
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  }, [mode, numAStr, numBStr, multiInputStr, lang]);

  // Helper to parse input integer safely with sign and validity detection
  const parseToken = useCallback((str: string) => {
    const trimmed = str.trim();
    if (!trimmed) {
      return { value: 0n, absVal: 0n, isValid: true, isNegative: false };
    }
    if (/^-?\d+$/.test(trimmed)) {
      try {
        const val = BigInt(trimmed);
        return {
          value: val,
          absVal: val < 0n ? -val : val,
          isValid: true,
          isNegative: val < 0n,
        };
      } catch {
        return { value: 0n, absVal: 0n, isValid: false, isNegative: false };
      }
    }
    return { value: 0n, absVal: 0n, isValid: false, isNegative: false };
  }, []);

  const parseResultA = useMemo(() => parseToken(numAStr), [numAStr, parseToken]);
  const parseResultB = useMemo(() => parseToken(numBStr), [numBStr, parseToken]);
  const parsedA = parseResultA.value;
  const parsedB = parseResultB.value;
  const absA = parseResultA.absVal;
  const absB = parseResultB.absVal;

  const parsedMultiTokens = useMemo(() => {
    const tokens = multiInputStr.split(/[,，\s]+/).filter(Boolean);
    const nums: bigint[] = [];
    const absNums: bigint[] = [];
    const invalidList: string[] = [];
    for (const t of tokens) {
      const res = parseToken(t);
      if (!res.isValid) {
        invalidList.push(t);
      } else {
        nums.push(res.value);
        absNums.push(res.absVal);
      }
    }
    return {
      nums: nums.length > 0 ? nums : [0n],
      absNums: absNums.length > 0 ? absNums : [0n],
      hasInvalid: invalidList.length > 0,
      invalidTokens: invalidList,
    };
  }, [multiInputStr, parseToken]);

  const parsedMulti = parsedMultiTokens.nums;
  const parsedMultiAbs = parsedMultiTokens.absNums;

  // Validation Error message
  const inputErrorMessage = useMemo(() => {
    if (mode === 'two') {
      const errs: string[] = [];
      if (!parseResultA.isValid) errs.push(`"${numAStr}"`);
      if (!parseResultB.isValid) errs.push(`"${numBStr}"`);
      if (errs.length > 0) {
        return lang === 'zh'
          ? `输入格式无效 ${errs.join('、')}：请输入有效整数（支持负数，不能包含字母或其他非数字符号）`
          : `Invalid format ${errs.join(', ')}: Please enter valid integers (letters and non-numeric symbols are not allowed).`;
      }
    } else if (parsedMultiTokens.hasInvalid) {
      return lang === 'zh'
        ? `多数字中包含无效格式 "${parsedMultiTokens.invalidTokens.join(', ')}"：请输入逗号分隔的整数`
        : `Invalid input "${parsedMultiTokens.invalidTokens.join(', ')}": Please enter comma-separated integers.`;
    }
    return null;
  }, [mode, parseResultA.isValid, parseResultB.isValid, numAStr, numBStr, parsedMultiTokens, lang]);

  // Special gcd(0, 0) condition
  const isGcdZeroZero = mode === 'two'
    ? (parsedA === 0n && parsedB === 0n && parseResultA.isValid && parseResultB.isValid)
    : (parsedMulti.every((n) => n === 0n) && !parsedMultiTokens.hasInvalid);

  // Calculations for Two-Number Mode (GCD & LCM are strictly non-negative)
  const twoGcd = useMemo(() => bigIntGcd(absA, absB), [absA, absB]);
  const twoLcm = useMemo(() => bigIntLcm(absA, absB), [absA, absB]);
  const isCoprime = twoGcd === 1n && absA > 1n && absB > 1n;

  // Fraction simplification for two-number mode (accurately preserves negative sign!)
  const fractionReduction = useMemo(() => {
    if (parsedB === 0n) return null;
    return simplifyFraction(parsedA, parsedB);
  }, [parsedA, parsedB]);

  // Multi-number calculations
  const multiGcdVal = useMemo(() => multiGcd(parsedMultiAbs), [parsedMultiAbs]);
  const multiLcmVal = useMemo(() => multiLcm(parsedMultiAbs), [parsedMultiAbs]);

  // Dynamic Document Title and HTML lang attribute for SEO indexing across 5 languages
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;

    const hasNumbers = mode === 'two' && absA > 0n && absB > 0n;
    const titles: Record<Language, string> = {
      en: hasNumbers
        ? `GCD of ${parsedA} and ${parsedB} is ${twoGcd} | Step-by-Step Calculator`
        : 'Greatest Common Divisor (GCD/GCF) & LCM Calculator with Steps | GCD Math Hub',
      es: hasNumbers
        ? `MCD de ${parsedA} y ${parsedB} es ${twoGcd} | Calculadora Paso a Paso`
        : 'Calculadora de Máximo Común Divisor (MCD) y MCM Paso a Paso',
      fr: hasNumbers
        ? `PGCD de ${parsedA} et ${parsedB} est ${twoGcd} | Calculateur avec Étapes`
        : 'Calculateur de Plus Grand Commun Diviseur (PGCD) et PPCM avec Étapes',
      pt: hasNumbers
        ? `MDC de ${parsedA} e ${parsedB} é ${twoGcd} | Calculadora com Passos`
        : 'Calculadora de Máximo Divisor Comum (MDC) e MMC com Passos',
      zh: hasNumbers
        ? `gcd(${parsedA}, ${parsedB}) = ${twoGcd} 最大公约数计算与步骤 - GCD 数学工坊`
        : '最大公约数GCD计算器 - 在线求最大公因数与最小公倍数(含短除法与详细步骤)',
    };
    document.title = titles[lang] || titles.en;
  }, [mode, parsedA, parsedB, absA, absB, twoGcd, lang]);

  // Safe numbers for visualizers
  const safeA = Number(absA > 1000000n ? 1000000n : absA);
  const safeB = Number(absB > 1000000n ? 1000000n : absB);
  const safeGcd = Number(twoGcd > 1000000n ? 1000000n : twoGcd);

  // Euclidean steps
  const euclideanSteps = useMemo(() => {
    if (absA <= 0n || absB <= 0n) return [];
    return getEuclideanSteps(absA, absB);
  }, [absA, absB]);

  // Multi-number Euclidean stages
  const multiEuclideanStages = useMemo(() => {
    if (mode !== 'multi') return [];
    return getMultiEuclideanSteps(parsedMultiAbs);
  }, [mode, parsedMultiAbs]);

  // Extended Euclidean
  const extendedEuclid = useMemo(() => {
    if (absA <= 0n || absB <= 0n) return undefined;
    return getExtendedEuclidean(absA, absB);
  }, [absA, absB]);

  // Short division data (supports both 2 numbers and multi numbers!)
  const shortDivData = useMemo(() => {
    if (mode === 'multi') {
      const multiList = parsedMultiAbs
        .map((n) => Number(n > 1000000n ? 1000000n : n))
        .filter((n) => n > 0);
      if (multiList.length < 2) return getShortDivision([12, 18, 24]);
      return getShortDivision(multiList);
    }
    if (safeA <= 1 || safeB <= 1) {
      return getShortDivision([Math.max(1, safeA), Math.max(1, safeB)]);
    }
    return getShortDivision([safeA, safeB]);
  }, [mode, parsedMultiAbs, safeA, safeB]);

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

  // Copy result action formatted in 5 languages
  const handleCopyResult = useCallback(() => {
    let text = '';
    const currentUrl = window.location.href;

    if (lang === 'zh') {
      text =
        mode === 'two'
          ? `【最大公约数与最小公倍数计算结果】\n数字: a = ${parsedA.toString()}, b = ${parsedB.toString()}\n最大公约数 GCD: gcd(${parsedA.toString()}, ${parsedB.toString()}) = ${twoGcd.toString()}\n最小公倍数 LCM: lcm(${parsedA.toString()}, ${parsedB.toString()}) = ${twoLcm.toString()}\n恒等式: ${parsedA.toString()} × ${parsedB.toString()} = ${twoGcd.toString()} × ${twoLcm.toString()}\n在线步骤: ${currentUrl}`
          : `【多数字最大公因数与最小公倍数】\n数字: [${parsedMulti.map((n) => n.toString()).join(', ')}]\nGCD: ${multiGcdVal.toString()}\nLCM: ${multiLcmVal.toString()}\n在线步骤: ${currentUrl}`;
    } else if (lang === 'es') {
      text =
        mode === 'two'
          ? `[Resultado de cálculo MCD y MCM]\nNúmeros: a = ${parsedA.toString()}, b = ${parsedB.toString()}\nMCD: mcd(${parsedA.toString()}, ${parsedB.toString()}) = ${twoGcd.toString()}\nMCM: mcm(${parsedA.toString()}, ${parsedB.toString()}) = ${twoLcm.toString()}\nIdentidad: ${parsedA.toString()} × ${parsedB.toString()} = ${twoGcd.toString()} × ${twoLcm.toString()}\nPasos completos: ${currentUrl}`
          : `[MCD y MCM de múltiples números]\nNúmeros: [${parsedMulti.map((n) => n.toString()).join(', ')}]\nMCD: ${multiGcdVal.toString()}\nMCM: ${multiLcmVal.toString()}\nPasos completos: ${currentUrl}`;
    } else if (lang === 'fr') {
      text =
        mode === 'two'
          ? `[Résultat du calcul PGCD et PPCM]\nNombres: a = ${parsedA.toString()}, b = ${parsedB.toString()}\nPGCD: pgcd(${parsedA.toString()}, ${parsedB.toString()}) = ${twoGcd.toString()}\nPPCM: ppcm(${parsedA.toString()}, ${parsedB.toString()}) = ${twoLcm.toString()}\nIdentité: ${parsedA.toString()} × ${parsedB.toString()} = ${twoGcd.toString()} × ${twoLcm.toString()}\nÉtapes détaillées: ${currentUrl}`
          : `[PGCD et PPCM de plusieurs nombres]\nNombres: [${parsedMulti.map((n) => n.toString()).join(', ')}]\nPGCD: ${multiGcdVal.toString()}\nPPCM: ${multiLcmVal.toString()}\nÉtapes détaillées: ${currentUrl}`;
    } else if (lang === 'pt') {
      text =
        mode === 'two'
          ? `[Resultado do cálculo MDC e MMC]\nNúmeros: a = ${parsedA.toString()}, b = ${parsedB.toString()}\nMDC: mdc(${parsedA.toString()}, ${parsedB.toString()}) = ${twoGcd.toString()}\nMMC: mmc(${parsedA.toString()}, ${parsedB.toString()}) = ${twoLcm.toString()}\nIdentidade: ${parsedA.toString()} × ${parsedB.toString()} = ${twoGcd.toString()} × ${twoLcm.toString()}\nResolução online: ${currentUrl}`
          : `[MDC e MMC de múltiplos números]\nNúmeros: [${parsedMulti.map((n) => n.toString()).join(', ')}]\nMDC: ${multiGcdVal.toString()}\nMMC: ${multiLcmVal.toString()}\nResolução online: ${currentUrl}`;
    } else {
      text =
        mode === 'two'
          ? `[GCD & LCM Calculation Result]\nNumbers: a = ${parsedA.toString()}, b = ${parsedB.toString()}\nGCD: gcd(${parsedA.toString()}, ${parsedB.toString()}) = ${twoGcd.toString()}\nLCM: lcm(${parsedA.toString()}, ${parsedB.toString()}) = ${twoLcm.toString()}\nIdentity: ${parsedA.toString()} × ${parsedB.toString()} = ${twoGcd.toString()} × ${twoLcm.toString()}\nStep-by-step URL: ${currentUrl}`
          : `[Multiple Numbers GCD & LCM]\nNumbers: [${parsedMulti.map((n) => n.toString()).join(', ')}]\nGCD: ${multiGcdVal.toString()}\nLCM: ${multiLcmVal.toString()}\nStep-by-step URL: ${currentUrl}`;
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
        onSelectLang={setLang}
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
                {t.heroSubheading}
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
                <span>{t.shareBtn}</span>
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
                  {t.twoNumMode}
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
                  {t.multiNumMode}
                </button>
              </div>

              {/* Quick Presets row */}
              <div className="flex items-center flex-wrap gap-1 text-[11px]">
                <span className="text-slate-400 mr-0.5">{t.presetTitle}</span>
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
                  (17, 23)
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
                {/* Error Banner for invalid inputs */}
                {inputErrorMessage && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{inputErrorMessage}</span>
                  </div>
                )}

                {/* Mathematical Notice for gcd(0, 0) */}
                {isGcdZeroZero && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-semibold">{lang === 'zh' ? '数学特别说明：' : 'Mathematical Note: '}</span>
                      {lang === 'zh'
                        ? 'gcd(0, 0) 在严格数学上未定义 (Undefined / Indeterminate)，因为任何整数都能整除 0。在计算机代数系统中通常约定返回 0。'
                        : 'gcd(0, 0) is mathematically undefined (indeterminate) because every integer divides 0. The standard programming convention returns 0.'}
                    </div>
                  </div>
                )}

                {mode === 'two' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.inputALabel}
                      </label>
                      <input
                        type="text"
                        value={numAStr}
                        onChange={(e) => setNumAStr(e.target.value)}
                        placeholder="48"
                        className={`w-full px-3 py-2 rounded-lg border font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          !parseResultA.isValid ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.inputBLabel}
                      </label>
                      <input
                        type="text"
                        value={numBStr}
                        onChange={(e) => setNumBStr(e.target.value)}
                        placeholder="72"
                        className={`w-full px-3 py-2 rounded-lg border font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          !parseResultB.isValid ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                        }`}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.multiInputLabel}
                    </label>
                    <input
                      type="text"
                      value={multiInputStr}
                      onChange={(e) => setMultiInputStr(e.target.value)}
                      placeholder="84, 126, 210, 420"
                      className={`w-full px-3 py-2 rounded-lg border font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        parsedMultiTokens.hasInvalid ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                )}

                {/* Compact Divisors strip */}
                {mode === 'two' && commonDivisors.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-2">
                    <span className="text-slate-500 shrink-0">
                      {t.commonFactorsTitle}:
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

              {/* Right Column: Hero Metrics & Identity in 1 concise card (5 cols) */}
              <div className="lg:col-span-5 p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40 flex flex-col justify-between space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {/* GCD Result */}
                  <div className="p-2.5 rounded-lg bg-white border border-indigo-100 shadow-2xs">
                    <div className="text-[11px] font-semibold text-indigo-700">
                      {lang === 'zh' ? '最大公因数 GCD' : lang === 'es' ? 'MCD' : lang === 'fr' ? 'PGCD' : lang === 'pt' ? 'MDC' : 'GCD / GCF'}
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-indigo-900 tracking-tight mt-0.5">
                      {isGcdZeroZero
                        ? (lang === 'zh' ? '未定义' : 'Undefined')
                        : (mode === 'two' ? twoGcd.toString() : multiGcdVal.toString())}
                    </div>
                    {isGcdZeroZero ? (
                      <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 mt-1">
                        {lang === 'zh' ? '约定: 0' : 'Convention: 0'}
                      </span>
                    ) : mode === 'two' && isCoprime ? (
                      <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 mt-1">
                        {t.coprimeBadge}
                      </span>
                    ) : null}
                  </div>

                  {/* LCM Result */}
                  <div className="p-2.5 rounded-lg bg-white border border-indigo-100 shadow-2xs">
                    <div className="text-[11px] font-semibold text-slate-600">
                      {lang === 'zh' ? '最小公倍数 LCM' : lang === 'es' ? 'MCM' : lang === 'fr' ? 'PPCM' : lang === 'pt' ? 'MMC' : 'LCM'}
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight mt-0.5">
                      {mode === 'two' ? twoLcm.toString() : multiLcmVal.toString()}
                    </div>
                  </div>
                </div>

                {/* Instant Fraction Reduction Metric (Traffic Booster) */}
                {mode === 'two' && fractionReduction && parsedB !== 0n && (
                  <div className="p-2 bg-white/95 rounded-lg border border-indigo-100 flex items-center justify-between text-xs font-mono shadow-2xs">
                    <div className="flex items-center gap-1.5 text-indigo-950 font-bold truncate">
                      <Divide className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>
                        {parsedA.toString()}/{parsedB.toString()} = {fractionReduction.simplifiedNum.toString()}/{fractionReduction.simplifiedDen.toString()}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal shrink-0">
                      ({fractionReduction.percentageStr})
                    </span>
                  </div>
                )}

                {/* Identity banner with copy button */}
                <div className="p-2 rounded-lg bg-white/90 border border-indigo-150 flex items-center justify-between text-[11px] font-mono">
                  {mode === 'two' ? (
                    <span className="text-slate-700 truncate">
                      {parsedA.toString()} × {parsedB.toString()} = {twoGcd.toString()} × {twoLcm.toString()}
                    </span>
                  ) : (
                    <span className="text-slate-600 text-xs">
                      {lang === 'zh' ? '多数字计算已完成' : 'Multi-number calculation complete'}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleCopyResult}
                    className="ml-2 text-indigo-600 hover:text-indigo-800 text-xs font-semibold shrink-0"
                  >
                    {copied ? t.copiedBtn : t.copyBtn}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Compact Feature Tabs Navigation Bar */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl overflow-x-auto text-xs font-medium no-print">
            {/* 1. Algorithms */}
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
              <span>
                {lang === 'zh'
                  ? '四法图解'
                  : lang === 'es'
                  ? 'Algoritmos'
                  : lang === 'fr'
                  ? 'Algorithmes'
                  : lang === 'pt'
                  ? 'Algoritmos'
                  : 'Visualizers'}
              </span>
            </button>

            {/* 2. Fractions Studio */}
            <button
              type="button"
              onClick={() => setActiveMainTab('fractions')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'fractions'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Divide className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {lang === 'zh'
                  ? '分数约分'
                  : lang === 'es'
                  ? 'Fracciones'
                  : lang === 'fr'
                  ? 'Fractions'
                  : lang === 'pt'
                  ? 'Frações'
                  : 'Fractions Studio'}
              </span>
            </button>

            {/* 3. Real-World Applications */}
            <button
              type="button"
              onClick={() => setActiveMainTab('realworld')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'realworld'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {lang === 'zh'
                  ? '生活应用题'
                  : lang === 'es'
                  ? 'Aplicaciones'
                  : lang === 'fr'
                  ? 'Problèmes'
                  : lang === 'pt'
                  ? 'Aplicações'
                  : 'Real-World'}
              </span>
            </button>

            {/* 4. Algorithm Comparison Matrix */}
            <button
              type="button"
              onClick={() => setActiveMainTab('comparison')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'comparison'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {lang === 'zh'
                  ? '算法全景'
                  : lang === 'es'
                  ? 'Comparativa'
                  : lang === 'fr'
                  ? 'Comparatif'
                  : lang === 'pt'
                  ? 'Comparativo'
                  : 'Algorithm Matrix'}
              </span>
            </button>

            {/* 5. Edge Cases & Decimals */}
            <button
              type="button"
              onClick={() => setActiveMainTab('edgecases')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'edgecases'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {lang === 'zh'
                  ? '小数与边界'
                  : lang === 'es'
                  ? 'Casos Especiales'
                  : lang === 'fr'
                  ? 'Cas Particuliers'
                  : lang === 'pt'
                  ? 'Casos Especiais'
                  : 'Edge Cases'}
              </span>
            </button>

            {/* 6. Homework Formatter & LaTeX */}
            <button
              type="button"
              onClick={() => setActiveMainTab('homework')}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeMainTab === 'homework'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {lang === 'zh'
                  ? '作业规范/LaTeX'
                  : lang === 'es'
                  ? 'Formato Tarea/LaTeX'
                  : lang === 'fr'
                  ? 'Devoir/LaTeX'
                  : lang === 'pt'
                  ? 'Formato/LaTeX'
                  : 'Exam & LaTeX'}
              </span>
            </button>

            {/* 7. Factor Explorer */}
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
              <span>{t.tabFactors}</span>
            </button>

            {/* 8. Factoring Precursor */}
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
              <span>{t.tabFactoring}</span>
            </button>

            {/* 9. Popular Pairs Directory */}
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
              <span>{t.tabDirectory}</span>
            </button>

            {/* 10. Printable Worksheets */}
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
              <span>{t.tabWorksheet}</span>
            </button>

            {/* 11. Olympiad Practice Quiz */}
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
              <span>{t.tabQuiz}</span>
            </button>

            {/* 12. Math Wiki & FAQs */}
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
              <span>{t.tabWiki}</span>
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
                    {lang === 'zh'
                      ? '详细推导方法切换：'
                      : lang === 'es'
                      ? 'Cambiar método de resolución:'
                      : lang === 'fr'
                      ? 'Changer de méthode :'
                      : lang === 'pt'
                      ? 'Mudar método de resolução:'
                      : 'Select Method:'}
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
                {activeAlgoTab === 'short' && (
                  <ShortDivisionView data={shortDivData} lang={lang} />
                )}
                {activeAlgoTab === 'euclid' && (
                  <EuclideanView
                    steps={euclideanSteps}
                    extended={extendedEuclid}
                    a={parsedA}
                    b={parsedB}
                    lang={lang}
                    multiStages={mode === 'multi' ? multiEuclideanStages : undefined}
                    allNumbers={mode === 'multi' ? parsedMulti : undefined}
                  />
                )}
                {activeAlgoTab === 'prime' && (
                  <PrimeFactorView
                    a={safeA}
                    b={safeB}
                    lang={lang}
                    multiNumbers={mode === 'multi' ? parsedMultiAbs.map((n) => Number(n)) : undefined}
                  />
                )}
                {activeAlgoTab === 'subtraction' && (
                  <SubtractionView data={subtractionData} lang={lang} />
                )}
                {activeAlgoTab === 'tiling' && (
                  <GeometricTilingView a={safeA} b={safeB} gcd={safeGcd} lang={lang} />
                )}
              </div>
            )}

            {/* 2. Fraction Studio (High Intent & Traffic) */}
            {activeMainTab === 'fractions' && (
              <FractionStudio initialA={parsedA} initialB={parsedB} lang={lang} />
            )}

            {/* 3. Real-World Practical Scenarios & Word Problems */}
            {activeMainTab === 'realworld' && (
              <RealWorldScenarios initialA={safeA} initialB={safeB} lang={lang} />
            )}

            {/* 4. Comprehensive Algorithm Comparison Matrix */}
            {activeMainTab === 'comparison' && <AlgorithmComparison lang={lang} />}

            {/* 5. Edge Cases, Decimals, Negative & Coprime Solver */}
            {activeMainTab === 'edgecases' && <EdgeCasesTool lang={lang} />}

            {/* 6. Standard Homework Exam Formatter & LaTeX Export */}
            {activeMainTab === 'homework' && (
              <HomeworkFormatter a={parsedA} b={parsedB} lang={lang} />
            )}

            {/* 7. Factor Pairs, Homework Solution & Divisibility Rules */}
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
            {activeMainTab === 'factoring' && <FactoringTool lang={lang} />}

            {/* 4. Programmatic SEO Directory */}
            {activeMainTab === 'directory' && (
              <PopularPairsDirectory
                onSelectPair={loadPair}
                onSelectMulti={loadMulti}
                lang={lang}
              />
            )}

            {/* 5. Worksheet Generator */}
            {activeMainTab === 'worksheet' && <WorksheetGenerator lang={lang} />}

            {/* 6. Olympiad Practice Quiz */}
            {activeMainTab === 'practice' && <OlympiadPractice lang={lang} />}

            {/* 7. Math Encyclopedia & SEO Wiki */}
            {activeMainTab === 'wiki' && <KnowledgeWiki lang={lang} />}
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
              {t.siteTitle}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {t.tagline}
            </span>
          </div>
          <div className="text-slate-400">
            {lang === 'zh'
              ? '支持短除法 · 辗转相除 · 质因数分解 · 几何铺砖 · 可打印作业'
              : lang === 'es'
              ? 'Método de descomposición · Euclides · Factores primos · Imprimibles'
              : lang === 'fr'
              ? 'Disposition en échelle · Algorithme d’Euclide · Fiches d’exercices'
              : lang === 'pt'
              ? 'Dispositivo prático · Algoritmo de Euclides · Fatores primos · Folhas A4'
              : 'Ladder Method · Euclidean Algorithm · Prime Venn · Worksheets'}
          </div>
        </div>
      </footer>
    </div>
  );
}
