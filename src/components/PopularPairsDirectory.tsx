import React, { useState } from 'react';
import { bigIntGcd, bigIntLcm } from '../utils/mathEngine';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface PairItem {
  a: number;
  b: number;
  c?: number;
  label?: string;
  category: 'textbook' | 'coprime' | 'large' | 'three' | 'factoring';
}

const POPULAR_PAIRS: PairItem[] = [
  // Textbook classics
  { a: 12, b: 18, category: 'textbook', label: '四年级上册入门' },
  { a: 24, b: 36, category: 'textbook', label: '五年级公因数标准' },
  { a: 48, b: 72, category: 'textbook', label: '小学奥数高频双数' },
  { a: 36, b: 60, category: 'textbook', label: '钟表与周期相遇' },
  { a: 15, b: 25, category: 'textbook', label: '末位为5的公倍数' },
  { a: 16, b: 24, category: 'textbook', label: '2的幂次提取' },
  { a: 32, b: 48, category: 'textbook', label: '倍数约分训练' },
  { a: 45, b: 75, category: 'textbook', label: '分数化简例题' },

  // Factoring Coefficients
  { a: 12, b: 30, category: 'factoring', label: '因式分解提公因式' },
  { a: 18, b: 27, category: 'factoring', label: '初中公因式3的方幂' },
  { a: 54, b: 72, category: 'factoring', label: '平方差公式前置' },
  { a: 64, b: 96, category: 'factoring', label: '完全平方展开系数' },
  { a: 42, b: 70, category: 'factoring', label: '二元一次不定方程' },
  { a: 28, b: 42, category: 'factoring', label: '多项式最大公因式' },

  // Coprimes
  { a: 17, b: 23, category: 'coprime', label: '双质数必互质' },
  { a: 14, b: 25, category: 'coprime', label: '合数互质经典题' },
  { a: 21, b: 22, category: 'coprime', label: '连续自然数互质' },
  { a: 35, b: 36, category: 'coprime', label: '连续数 gcd=1' },
  { a: 19, b: 31, category: 'coprime', label: '数论孪生素数' },
  { a: 8, b: 15, category: 'coprime', label: '偶奇互质反例' },

  // Large Euclidean
  { a: 1071, b: 462, category: 'large', label: '欧几里得经典例题' },
  { a: 252, b: 105, category: 'large', label: '辗转相除法快速收敛' },
  { a: 825, b: 315, category: 'large', label: '百位数短除示范' },
  { a: 1260, b: 756, category: 'large', label: '复杂带余除法' },
  { a: 495, b: 225, category: 'large', label: '西汉更相减损例' },
  { a: 2310, b: 1050, category: 'large', label: '大数质因子分解' },

  // Three numbers
  { a: 12, b: 18, c: 24, category: 'three', label: '三数短除法初阶' },
  { a: 84, b: 126, c: 210, category: 'three', label: '奥数三数裁纸' },
  { a: 18, b: 24, c: 36, category: 'three', label: '三数结合律验证' },
  { a: 30, b: 45, c: 75, category: 'three', label: '三数互质与非两两互质' },
];

interface PopularPairsDirectoryProps {
  onSelectPair: (a: number, b: number) => void;
  onSelectMulti: (str: string) => void;
  lang: 'zh' | 'en';
}

export const PopularPairsDirectory: React.FC<PopularPairsDirectoryProps> = ({
  onSelectPair,
  onSelectMulti,
  lang,
}) => {
  const isZh = lang === 'zh';
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'textbook' | 'factoring' | 'coprime' | 'large' | 'three'
  >('all');

  const filtered =
    activeCategory === 'all'
      ? POPULAR_PAIRS
      : POPULAR_PAIRS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase">
            <TrendingUp className="w-4 h-4" />
            <span>Google 搜索高频数字对速查矩阵</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {isZh ? '常见最大公因数与最小公倍数速查表' : 'High-Frequency Number Pairs Directory'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isZh
              ? '收录中小学教材与奥数高频考查数对，点击任一组直接查看全部推导步骤'
              : 'Click any pair for instant calculation, formulas, and visual diagrams'}
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'all'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            全部 ({POPULAR_PAIRS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('textbook')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'textbook'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            课本经典
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('factoring')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'factoring'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            因式分解
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('coprime')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'coprime'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            互质数特辑
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('large')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'large'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            大数辗转
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('three')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'three'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            三数题型
          </button>
        </div>
      </div>

      {/* Grid of Long-tail pairs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map((item, idx) => {
          const isThree = item.c !== undefined;
          const gcdVal = isThree
            ? Number(bigIntGcd(bigIntGcd(BigInt(item.a), BigInt(item.b)), BigInt(item.c!)))
            : Number(bigIntGcd(BigInt(item.a), BigInt(item.b)));
          const lcmVal = isThree
            ? Number(bigIntLcm(bigIntLcm(BigInt(item.a), BigInt(item.b)), BigInt(item.c!)))
            : Number(bigIntLcm(BigInt(item.a), BigInt(item.b)));

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (isThree) {
                  onSelectMulti(`${item.a}, ${item.b}, ${item.c}`);
                } else {
                  onSelectPair(item.a, item.b);
                }
                const el = document.getElementById('calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-400 hover:shadow-md transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="truncate text-[11px] font-sans">{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
              </div>

              <div className="font-mono font-bold text-slate-900 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">
                {isThree ? `(${item.a}, ${item.b}, ${item.c})` : `(${item.a}, ${item.b})`}
              </div>

              <div className="pt-1 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-indigo-700 font-semibold">GCD: {gcdVal}</span>
                <span className="text-slate-500">LCM: {lcmVal}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
