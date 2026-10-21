import React, { useState, useRef, useEffect } from 'react';
import { Language, LANGUAGE_OPTIONS } from '../utils/i18n';
import { Globe, Copy, Check, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onCopyResult: () => void;
  hasResult: boolean;
  copied: boolean;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onSelectTab?: (tab: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onCopyResult,
  hasResult,
  copied,
  lang,
  onSelectLang,
  onSelectTab,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const currentLangObj = LANGUAGE_OPTIONS.find((l) => l.code === lang) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent, tab: string, targetId: string) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLabels = {
    en: {
      brand: 'GCD Math Hub',
      calc: 'Calculator',
      algo: 'Algorithms',
      factors: 'Factors & Steps',
      factoring: 'Factoring',
      worksheet: 'Worksheets',
      copy: 'Copy Result',
      copied: 'Copied',
    },
    es: {
      brand: 'MCD Calculadora',
      calc: 'Calculadora',
      algo: 'Algoritmos',
      factors: 'Divisores y Pasos',
      factoring: 'Factorización',
      worksheet: 'Imprimibles',
      copy: 'Copiar',
      copied: 'Copiado',
    },
    fr: {
      brand: 'PGCD Math Hub',
      calc: 'Calculateur',
      algo: 'Algorithmes',
      factors: 'Diviseurs et Pas',
      factoring: 'Factorisation',
      worksheet: 'Fiches A4',
      copy: 'Copier',
      copied: 'Copié',
    },
    pt: {
      brand: 'MDC Math Hub',
      calc: 'Calculadora',
      algo: 'Algoritmos',
      factors: 'Divisores e Passos',
      factoring: 'Fatoração',
      worksheet: 'Imprimir',
      copy: 'Copiar',
      copied: 'Copiado',
    },
    zh: {
      brand: 'GCD 数学工坊',
      calc: '在线计算',
      algo: '四法演示',
      factors: '因数与作业',
      factoring: '因式分解',
      worksheet: '打印作业',
      copy: '复制结果',
      copied: '已复制',
    },
  }[lang];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#calculator"
          onClick={(e) => handleNavClick(e, 'algorithms', 'calculator')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          {navLabels.brand}
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'algorithms', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {navLabels.calc}
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'algorithms', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {navLabels.algo}
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'factors', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {navLabels.factors}
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'factoring', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {navLabels.factoring}
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'worksheet', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {navLabels.worksheet}
          </a>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Multi-language Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Select Language / Cambiar idioma / Changer de langue / Mudar idioma / 切换语言"
            >
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="hidden sm:inline font-medium">{currentLangObj.name}</span>
              <span className="sm:hidden uppercase">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white shadow-lg border border-slate-200 py-1.5 z-50 text-xs font-medium">
                {LANGUAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      onSelectLang(opt.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors ${
                      lang === opt.code
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{opt.flag}</span>
                      <span>{opt.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono font-normal">
                      {opt.symbol}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onCopyResult}
            className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{navLabels.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{navLabels.copy}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
