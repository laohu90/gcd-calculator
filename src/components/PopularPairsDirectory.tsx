import React, { useState } from 'react';
import { bigIntGcd, bigIntLcm } from '../utils/mathEngine';
import { Language } from '../utils/i18n';
import { COMPONENT_TRANSLATIONS } from '../utils/componentTranslations';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface PairItem {
  a: number;
  b: number;
  c?: number;
  label?: Record<Language, string>;
  category: 'textbook' | 'coprime' | 'large' | 'three' | 'factoring';
}

const POPULAR_PAIRS: PairItem[] = [
  // Textbook classics
  {
    a: 12,
    b: 18,
    category: 'textbook',
    label: {
      en: '4th Grade Classic',
      es: 'Clásico de primaria',
      fr: 'Classique d’école',
      pt: 'Clássico fundamental',
      zh: '四年级上册入门',
    },
  },
  {
    a: 24,
    b: 36,
    category: 'textbook',
    label: {
      en: 'Standard Homework Pair',
      es: 'Ejercicio estándar',
      fr: 'Exercice standard',
      pt: 'Exercício padrão',
      zh: '五年级公因数标准',
    },
  },
  {
    a: 48,
    b: 72,
    category: 'textbook',
    label: {
      en: 'Olympiad High-Frequency',
      es: 'Alta frecuencia olimpiada',
      fr: 'Fréquence élevée concours',
      pt: 'Alta frequência olimpíada',
      zh: '小学奥数高频双数',
    },
  },
  {
    a: 36,
    b: 60,
    category: 'textbook',
    label: {
      en: 'Clock & Cycle Meeting',
      es: 'Reloj y periodicidad',
      fr: 'Horloge et cycle',
      pt: 'Relógio e ciclo',
      zh: '钟表与周期相遇',
    },
  },
  {
    a: 15,
    b: 25,
    category: 'textbook',
    label: {
      en: 'Multiples ending in 5',
      es: 'Múltiplos en 5',
      fr: 'Multiples finissant par 5',
      pt: 'Múltiplos terminados em 5',
      zh: '末位为5的公倍数',
    },
  },
  {
    a: 16,
    b: 24,
    category: 'textbook',
    label: {
      en: 'Powers of 2 Division',
      es: 'Potencias de 2',
      fr: 'Puissances de 2',
      pt: 'Potências de 2',
      zh: '2的幂次提取',
    },
  },
  {
    a: 32,
    b: 48,
    category: 'textbook',
    label: {
      en: 'Fraction Reduction Drill',
      es: 'Práctica de fracciones',
      fr: 'Entraînement fractions',
      pt: 'Treino de frações',
      zh: '倍数约分训练',
    },
  },
  {
    a: 45,
    b: 75,
    category: 'textbook',
    label: {
      en: 'Simplification Example',
      es: 'Ejemplo de reducción',
      fr: 'Exemple de simplification',
      pt: 'Exemplo de simplificação',
      zh: '分数化简例题',
    },
  },

  // Factoring Coefficients
  {
    a: 12,
    b: 30,
    category: 'factoring',
    label: {
      en: 'Monomial GCF Factoring',
      es: 'Factor común monomio',
      fr: 'Mise en facteur commun',
      pt: 'Fator comum em evidência',
      zh: '因式分解提公因式',
    },
  },
  {
    a: 18,
    b: 27,
    category: 'factoring',
    label: {
      en: 'Powers of 3 Factoring',
      es: 'Potencias de 3 en álgebra',
      fr: 'Puissances de 3 en algèbre',
      pt: 'Potências de 3 na álgebra',
      zh: '初中公因式3的方幂',
    },
  },
  {
    a: 54,
    b: 72,
    category: 'factoring',
    label: {
      en: 'Difference of Squares Prep',
      es: 'Diferencia de cuadrados',
      fr: 'Différence de carrés',
      pt: 'Diferença de quadrados',
      zh: '平方差公式前置',
    },
  },
  {
    a: 64,
    b: 96,
    category: 'factoring',
    label: {
      en: 'Algebra Expansion Coeffs',
      es: 'Coeficientes algebraicos',
      fr: 'Coefficients algébriques',
      pt: 'Coeficientes algébricos',
      zh: '完全平方展开系数',
    },
  },
  {
    a: 42,
    b: 70,
    category: 'factoring',
    label: {
      en: 'Linear Diophantine Eq',
      es: 'Ecuación diofántica',
      fr: 'Équation diophantienne',
      pt: 'Equação diofantina',
      zh: '二元一次不定方程',
    },
  },
  {
    a: 28,
    b: 42,
    category: 'factoring',
    label: {
      en: 'Polynomial Monomial GCF',
      es: 'MCD de polinomio',
      fr: 'PGCD de polynôme',
      pt: 'MDC de polinômio',
      zh: '多项式最大公因式',
    },
  },

  // Coprimes
  {
    a: 17,
    b: 23,
    category: 'coprime',
    label: {
      en: 'Dual Primes are Coprime',
      es: 'Primos gemelos coprimos',
      fr: 'Deux nombres premiers',
      pt: 'Dois números primos',
      zh: '双质数必互质',
    },
  },
  {
    a: 14,
    b: 25,
    category: 'coprime',
    label: {
      en: 'Composite Coprimes',
      es: 'Compuestos coprimos',
      fr: 'Composés premiers entre eux',
      pt: 'Compostos primos entre si',
      zh: '合数互质经典题',
    },
  },
  {
    a: 21,
    b: 22,
    category: 'coprime',
    label: {
      en: 'Consecutive Integers n, n+1',
      es: 'Enteros consecutivos n, n+1',
      fr: 'Entiers consécutifs n, n+1',
      pt: 'Inteiros consecutivos n, n+1',
      zh: '连续自然数互质',
    },
  },
  {
    a: 35,
    b: 36,
    category: 'coprime',
    label: {
      en: 'Consecutive gcd = 1',
      es: 'Consecutivos mcd = 1',
      fr: 'Consécutifs pgcd = 1',
      pt: 'Consecutivos mdc = 1',
      zh: '连续数 gcd=1',
    },
  },
  {
    a: 19,
    b: 31,
    category: 'coprime',
    label: {
      en: 'Prime Pairs',
      es: 'Parejas primas',
      fr: 'Paires de premiers',
      pt: 'Pares primos',
      zh: '数论孪生素数',
    },
  },
  {
    a: 8,
    b: 15,
    category: 'coprime',
    label: {
      en: 'Even & Odd Coprimes',
      es: 'Par e impar coprimos',
      fr: 'Pair et impair copremiers',
      pt: 'Par e ímpar coprimos',
      zh: '偶奇互质反例',
    },
  },

  // Large Euclidean
  {
    a: 1071,
    b: 462,
    category: 'large',
    label: {
      en: 'Classic Euclid Example',
      es: 'Ejemplo clásico Euclides',
      fr: 'Exemple classique Euclide',
      pt: 'Exemplo clássico Euclides',
      zh: '欧几里得经典例题',
    },
  },
  {
    a: 252,
    b: 105,
    category: 'large',
    label: {
      en: 'Fast Euclidean Division',
      es: 'Euclides convergencia veloz',
      fr: 'Euclide convergence rapide',
      pt: 'Euclides convergência rápida',
      zh: '辗转相除法快速收敛',
    },
  },
  {
    a: 825,
    b: 315,
    category: 'large',
    label: {
      en: '3-Digit Number Division',
      es: 'División de 3 dígitos',
      fr: 'Division à 3 chiffres',
      pt: 'Divisão de 3 dígitos',
      zh: '百位数短除示范',
    },
  },
  {
    a: 1260,
    b: 756,
    category: 'large',
    label: {
      en: 'Complex Quotient Steps',
      es: 'Divisiones con resto',
      fr: 'Divisions successives',
      pt: 'Divisões sucessivas',
      zh: '复杂带余除法',
    },
  },
  {
    a: 495,
    b: 225,
    category: 'large',
    label: {
      en: 'Subtractions Example',
      es: 'Ejemplo de restas',
      fr: 'Exemple de soustractions',
      pt: 'Exemplo de subtrações',
      zh: '西汉更相减损例',
    },
  },
  {
    a: 2310,
    b: 1050,
    category: 'large',
    label: {
      en: 'Large Prime Factorization',
      es: 'Factores de números grandes',
      fr: 'Facteurs de grands nombres',
      pt: 'Fatores de grandes números',
      zh: '大数质因子分解',
    },
  },

  // Three numbers
  {
    a: 12,
    b: 18,
    c: 24,
    category: 'three',
    label: {
      en: '3 Numbers Basic',
      es: '3 números básico',
      fr: '3 nombres de base',
      pt: '3 números básico',
      zh: '三数短除法初阶',
    },
  },
  {
    a: 84,
    b: 126,
    c: 210,
    category: 'three',
    label: {
      en: 'Olympiad 3-Number Tiling',
      es: '3 números olimpiada',
      fr: '3 nombres concours',
      pt: '3 números olimpíada',
      zh: '奥数三数裁纸',
    },
  },
  {
    a: 18,
    b: 24,
    c: 36,
    category: 'three',
    label: {
      en: 'Associative Property Test',
      es: 'Propiedad asociativa',
      fr: 'Propriété associative',
      pt: 'Propriedade associativa',
      zh: '三数结合律验证',
    },
  },
  {
    a: 30,
    b: 45,
    c: 75,
    category: 'three',
    label: {
      en: 'Triple Factorization',
      es: 'Factorización triple',
      fr: 'Décomposition triple',
      pt: 'Fatoração tripla',
      zh: '三数互质与非两两互质',
    },
  },
];

interface PopularPairsDirectoryProps {
  onSelectPair: (a: number, b: number) => void;
  onSelectMulti: (str: string) => void;
  lang?: Language;
}

export const PopularPairsDirectory: React.FC<PopularPairsDirectoryProps> = ({
  onSelectPair,
  onSelectMulti,
  lang = 'en',
}) => {
  const t = COMPONENT_TRANSLATIONS[lang].directory;
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
            <span>SEO Directory Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {lang === 'zh'
              ? '常见最大公因数与最小公倍数速查表'
              : lang === 'es'
              ? 'Directorio de pares de números de alta frecuencia'
              : lang === 'fr'
              ? 'Répertoire des paires de nombres fréquentes'
              : lang === 'pt'
              ? 'Diretório de pares de números frequentes'
              : 'High-Frequency Number Pairs Directory'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.clickHint}
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
            {t.all} ({POPULAR_PAIRS.length})
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
            {t.textbook}
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
            {t.factoring}
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
            {t.coprime}
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
            {t.large}
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
            {t.three}
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

          const itemLabel = item.label ? item.label[lang] || item.label.en : '';

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
                <span className="truncate text-[11px] font-sans">{itemLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
              </div>

              <div className="font-mono font-bold text-slate-900 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">
                {isThree ? `(${item.a}, ${item.b}, ${item.c})` : `(${item.a}, ${item.b})`}
              </div>

              <div className="pt-1 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-indigo-700 font-semibold">GCD: {gcdVal}</span>
                <span className="text-slate-500">{t.lcmLabel}: {lcmVal}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
