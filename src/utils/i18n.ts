export type Language = 'zh' | 'en';

export interface Translations {
  siteTitle: string;
  tagline: string;
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  twoNumMode: string;
  multiNumMode: string;
  presetTitle: string;
  inputALabel: string;
  inputBLabel: string;
  multiInputLabel: string;
  gcdCardTitle: string;
  gcdCardDesc: string;
  lcmCardTitle: string;
  lcmCardDesc: string;
  identityTitle: string;
  copyBtn: string;
  copiedBtn: string;
  coprimeBadge: string;
  commonFactorsTitle: string;
  algorithmSectionTitle: string;
  algorithmSectionSub: string;
  tabShort: string;
  tabEuclid: string;
  tabPrime: string;
  tabSubtraction: string;
  tabTiling: string;
  tabWorksheet: string;
  shareBtn: string;
  shareToast: string;
  popularPairsTitle: string;
  popularPairsSub: string;
  printWorksheetTitle: string;
  adPlaceholder: string;
}

export const translations: Record<Language, Translations> = {
  zh: {
    siteTitle: 'GCD 数学工坊',
    tagline: '最大公约数 & 最小公倍数全能计算器',
    heroBadge: '在线工具箱 · 小学奥数 · 初中因式分解 · 竞赛数论',
    heroHeading: '最大公约数 GCD & 最小公倍数 LCM 在线计算器',
    heroSubheading:
      '支持两数及多数字快速求解，提供梯形短除法、辗转相除法、质因数分解韦恩图、更相减损法与几何切分铺砖全步骤。大数运算精准无溢出，初中因式分解与约分必备利器。',
    twoNumMode: '两个数详细步骤 (短除法/辗转相除)',
    multiNumMode: '多数字模式 (3个及以上)',
    presetTitle: '课本高频题:',
    inputALabel: '输入整数 A (第一个数)',
    inputBLabel: '输入整数 B (第二个数)',
    multiInputLabel: '输入多个正整数（逗号或空格隔开，支持 3 个或更多）',
    gcdCardTitle: '最大公约数 (GCD / 最大公因数)',
    gcdCardDesc: '能同时整除输入所有数字的最大整数',
    lcmCardTitle: '最小公倍数 (LCM)',
    lcmCardDesc: '能同时被输入所有数字整除的最小正整数',
    identityTitle: '数论恒等关系',
    copyBtn: '复制公式与步骤',
    copiedBtn: '已复制到剪贴板',
    coprimeBadge: '两数互质 (Coprime)',
    commonFactorsTitle: '所有公因数列表',
    algorithmSectionTitle: '求最大公因数四大算法步骤图解',
    algorithmSectionSub: '切换查看小学短除法、欧几里得辗转相除法、质因数分解韦恩图与几何铺砖',
    tabShort: '梯形短除法',
    tabEuclid: '辗转相除法',
    tabPrime: '质因数分解',
    tabSubtraction: '更相减损法',
    tabTiling: '几何铺砖图解',
    tabWorksheet: '生成打印作业纸',
    shareBtn: '分享此计算链接',
    shareToast: '链接已复制，发给同学/家长随时查看！',
    popularPairsTitle: '高频搜索数字对速查表 (Programmatic SEO Index)',
    popularPairsSub: '点击任一数字对即可秒出步骤图解与结论',
    printWorksheetTitle: '打印练习题生成器',
    adPlaceholder: '赞助商展示广告位 (Google AdSense 规范尺寸预留)',
  },
  en: {
    siteTitle: 'GCD Math Hub',
    tagline: 'Greatest Common Divisor & LCM Calculator with Steps',
    heroBadge: 'Online Math Tool · Olympiad · Factoring Precursor · Number Theory',
    heroHeading: 'Greatest Common Divisor (GCD/GCF/HCF) Calculator',
    heroSubheading:
      'Fast online calculator for Greatest Common Divisor and Least Common Multiple with detailed step-by-step solutions: Ladder method, Euclidean algorithm, Prime factorization Venn diagrams, and Geometric tiling visualizer.',
    twoNumMode: 'Two Numbers (Full Step-by-Step)',
    multiNumMode: 'Multiple Numbers (3 or more)',
    presetTitle: 'Common Pairs:',
    inputALabel: 'Enter Integer A (First number)',
    inputBLabel: 'Enter Integer B (Second number)',
    multiInputLabel: 'Enter integers separated by commas or spaces (3 or more)',
    gcdCardTitle: 'Greatest Common Divisor (GCD / GCF)',
    gcdCardDesc: 'The largest positive integer that divides all input numbers',
    lcmCardTitle: 'Least Common Multiple (LCM)',
    lcmCardDesc: 'The smallest positive integer divisible by all numbers',
    identityTitle: 'Fundamental Math Identity',
    copyBtn: 'Copy Result & Formula',
    copiedBtn: 'Copied to Clipboard!',
    coprimeBadge: 'Relatively Prime (Coprime)',
    commonFactorsTitle: 'List of Common Factors',
    algorithmSectionTitle: '4 Methods with Step-by-Step Visualizations',
    algorithmSectionSub: 'Compare Short Division Ladder, Euclidean Division, Prime Venn Diagram, and Tiling',
    tabShort: 'Ladder Method',
    tabEuclid: 'Euclidean Algorithm',
    tabPrime: 'Prime Factorization',
    tabSubtraction: 'Successive Subtractions',
    tabTiling: 'Geometric Tiling',
    tabWorksheet: 'Printable Worksheets',
    shareBtn: 'Share Calculation Link',
    shareToast: 'Link copied! Anyone with the link will see this calculation.',
    popularPairsTitle: 'Frequently Searched Number Pairs Index',
    popularPairsSub: 'Click any pair for instant calculation, formulas, and visual diagrams',
    printWorksheetTitle: 'Printable Math Worksheet Generator',
    adPlaceholder: 'Sponsored Advertisement Space (Google AdSense Standard Unit)',
  },
};
