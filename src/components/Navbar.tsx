import React from 'react';
import { Language } from '../utils/i18n';
import { Globe, Copy, Check } from 'lucide-react';

interface NavbarProps {
  onCopyResult: () => void;
  hasResult: boolean;
  copied: boolean;
  lang: Language;
  onToggleLang: () => void;
  onSelectTab?: (tab: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onCopyResult,
  hasResult,
  copied,
  lang,
  onToggleLang,
  onSelectTab,
}) => {
  const isZh = lang === 'zh';

  const handleNavClick = (e: React.MouseEvent, tab: string, targetId: string) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#calculator"
          onClick={(e) => handleNavClick(e, 'algorithms', 'calculator')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          {isZh ? 'GCD 数学工坊' : 'GCD Math Hub'}
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'algorithms', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {isZh ? '在线计算' : 'Calculator'}
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'algorithms', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {isZh ? '四法演示' : 'Algorithms'}
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'factors', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {isZh ? '因数与作业' : 'Factors & Solution'}
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'factoring', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {isZh ? '因式分解' : 'Factoring'}
          </a>
          <a
            href="#calculator"
            onClick={(e) => handleNavClick(e, 'worksheet', 'calculator')}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            {isZh ? '打印作业' : 'Worksheets'}
          </a>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={onToggleLang}
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="Switch Language / 切换语言"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isZh ? 'English' : '中文'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onCopyResult}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isZh ? '已复制' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isZh ? '复制计算结果' : 'Copy Result'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

