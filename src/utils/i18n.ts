export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  symbol: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', symbol: 'GCD / LCM' },
  { code: 'es', name: 'Español', flag: '🇪🇸', symbol: 'MCD / MCM' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', symbol: 'PGCD / PPCM' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', symbol: 'MDC / MMC' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳', symbol: '最大公因数 / 公倍数' },
];

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
  tabFactors: string;
  tabFactoring: string;
  tabDirectory: string;
  tabWorksheet: string;
  tabQuiz: string;
  tabWiki: string;
  shareBtn: string;
  shareToast: string;
  popularPairsTitle: string;
  popularPairsSub: string;
  printWorksheetTitle: string;
  adPlaceholder: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    siteTitle: 'GCD Math Hub',
    tagline: 'Greatest Common Divisor & LCM Calculator with Steps',
    heroBadge: 'Online Math Tool · Olympiad · Factoring Precursor · Number Theory',
    heroHeading: 'Greatest Common Divisor (GCD / GCF) Calculator with Steps',
    heroSubheading:
      'Fast online calculator for Greatest Common Divisor (GCD) and Least Common Multiple (LCM) with complete step-by-step solutions: Ladder method, Euclidean algorithm, Prime factorization Venn diagrams, and Geometric tiling visualizer.',
    twoNumMode: 'Two Numbers (Full Step-by-Step)',
    multiNumMode: 'Multiple Numbers (3 or more)',
    presetTitle: 'Common Examples:',
    inputALabel: 'Enter Integer A (First number)',
    inputBLabel: 'Enter Integer B (Second number)',
    multiInputLabel: 'Enter integers separated by commas or spaces (3 or more)',
    gcdCardTitle: 'Greatest Common Divisor (GCD / GCF)',
    gcdCardDesc: 'The largest positive integer that divides all input numbers',
    lcmCardTitle: 'Least Common Multiple (LCM)',
    lcmCardDesc: 'The smallest positive integer divisible by all input numbers',
    identityTitle: 'Fundamental Math Identity',
    copyBtn: 'Copy Result & Formula',
    copiedBtn: 'Copied to Clipboard!',
    coprimeBadge: 'Relatively Prime (Coprime)',
    commonFactorsTitle: 'List of Common Factors',
    algorithmSectionTitle: '4 Methods with Step-by-Step Visualizations',
    algorithmSectionSub: 'Compare Short Division Ladder, Euclidean Division, Prime Venn Diagram, and Geometric Tiling',
    tabShort: 'Ladder Method',
    tabEuclid: 'Euclidean Algorithm',
    tabPrime: 'Prime Factorization',
    tabSubtraction: 'Successive Subtractions',
    tabTiling: 'Geometric Tiling',
    tabFactors: 'Factors & Homework Solution',
    tabFactoring: 'Factoring & Fractions',
    tabDirectory: 'High-Frequency Pairs Index',
    tabWorksheet: 'Printable Worksheets',
    tabQuiz: 'Olympiad Quiz',
    tabWiki: 'Theory & FAQs',
    shareBtn: 'Share Calculation Link',
    shareToast: 'Link copied! Anyone with the link will see this calculation.',
    popularPairsTitle: 'Frequently Searched Number Pairs Index',
    popularPairsSub: 'Click any pair for instant calculation, formulas, and visual diagrams',
    printWorksheetTitle: 'Printable Math Worksheet Generator',
    adPlaceholder: 'Sponsored Advertisement Space (Google AdSense Standard Unit)',
  },
  es: {
    siteTitle: 'MCD Calculadora Hub',
    tagline: 'Calculadora de Máximo Común Divisor y Mínimo Común Múltiplo',
    heroBadge: 'Herramienta Matemática · Olimpiadas · Factorización · Teoría de Números',
    heroHeading: 'Calculadora de Máximo Común Divisor (MCD) y MCM Paso a Paso',
    heroSubheading:
      'Calculadora en línea gratuita de Máximo Común Divisor (MCD) y Mínimo Común Múltiplo (MCM) con pasos detallados: método de descomposición simultánea, algoritmo de Euclides, diagrama de Venn de factores primos y mosaico geométrico.',
    twoNumMode: 'Dos números (Paso a paso)',
    multiNumMode: 'Múltiples números (3 o más)',
    presetTitle: 'Ejemplos comunes:',
    inputALabel: 'Primer número entero (A)',
    inputBLabel: 'Segundo número entero (B)',
    multiInputLabel: 'Ingrese números enteros separados por comas o espacios',
    gcdCardTitle: 'Máximo Común Divisor (MCD)',
    gcdCardDesc: 'El mayor entero positivo que divide exactamente a todos los números',
    lcmCardTitle: 'Mínimo Común Múltiplo (MCM)',
    lcmCardDesc: 'El menor entero positivo múltiplo de todos los números ingresados',
    identityTitle: 'Propiedad fundamental del producto',
    copyBtn: 'Copiar resultado y pasos',
    copiedBtn: '¡Copiado al portapapeles!',
    coprimeBadge: 'Primos entre sí (Coprimos)',
    commonFactorsTitle: 'Divisores comunes',
    algorithmSectionTitle: '4 Métodos con demostraciones paso a paso',
    algorithmSectionSub: 'Compare el método de divisiones sucesivas, Euclides, factores primos y mosaico',
    tabShort: 'Divisiones simultáneas',
    tabEuclid: 'Algoritmo de Euclides',
    tabPrime: 'Factores primos (Venn)',
    tabSubtraction: 'Restas sucesivas',
    tabTiling: 'Mosaico geométrico',
    tabFactors: 'Divisores y solución escrita',
    tabFactoring: 'Factorización y fracciones',
    tabDirectory: 'Índice de pares frecuentes',
    tabWorksheet: 'Hojas imprimibles',
    tabQuiz: 'Cuestionario de práctica',
    tabWiki: 'Teoría y preguntas frecuentes',
    shareBtn: 'Compartir enlace de cálculo',
    shareToast: '¡Enlace copiado! Cualquiera con el enlace verá este cálculo.',
    popularPairsTitle: 'Índice de pares de números más buscados',
    popularPairsSub: 'Haga clic en cualquier par para ver el cálculo y pasos completos',
    printWorksheetTitle: 'Generador de hojas de ejercicios para imprimir',
    adPlaceholder: 'Espacio publicitario patrocinado (Google AdSense)',
  },
  fr: {
    siteTitle: 'PGCD Math Hub',
    tagline: 'Calculateur de Plus Grand Commun Diviseur et PPCM',
    heroBadge: 'Outil Mathématique · Olympiades · Factorisation · Arithmétique',
    heroHeading: 'Calculateur de Plus Grand Commun Diviseur (PGCD) et PPCM',
    heroSubheading:
      'Calculateur en ligne gratuit du PGCD et du PPCM avec explications pas à pas : disposition pratique en tableau, algorithme d’Euclide, décomposition en facteurs premiers (diagramme de Venn) et pavage géométrique.',
    twoNumMode: 'Deux nombres (Détail des étapes)',
    multiNumMode: 'Plusieurs nombres (3 ou plus)',
    presetTitle: 'Exemples classiques :',
    inputALabel: 'Premier entier (A)',
    inputBLabel: 'Deuxième entier (B)',
    multiInputLabel: 'Entrez des entiers séparés par des virgules ou des espaces',
    gcdCardTitle: 'Plus Grand Commun Diviseur (PGCD)',
    gcdCardDesc: 'Le plus grand entier naturel qui divise tous les nombres donnés',
    lcmCardTitle: 'Plus Petit Commun Multiple (PPCM)',
    lcmCardDesc: 'Le plus petit entier strictement positif multiple de tous les nombres',
    identityTitle: 'Relation fondamentale du produit',
    copyBtn: 'Copier le résultat et la formule',
    copiedBtn: 'Copié dans le presse-papiers !',
    coprimeBadge: 'Nombres premiers entre eux',
    commonFactorsTitle: 'Liste des diviseurs communs',
    algorithmSectionTitle: '4 Méthodes avec visualisations détaillées',
    algorithmSectionSub: 'Comparez l’algorithme d’Euclide, la décomposition en facteurs premiers et le pavage',
    tabShort: 'Disposition en échelle',
    tabEuclid: 'Algorithme d’Euclide',
    tabPrime: 'Facteurs premiers (Venn)',
    tabSubtraction: 'Soustractions successives',
    tabTiling: 'Pavage géométrique',
    tabFactors: 'Diviseurs et solution rédigée',
    tabFactoring: 'Factorisation et fractions',
    tabDirectory: 'Index des paires fréquentes',
    tabWorksheet: 'Fiches d’exercices à imprimer',
    tabQuiz: 'Quiz d’entraînement',
    tabWiki: 'Théorie et FAQ',
    shareBtn: 'Partager le lien du calcul',
    shareToast: 'Lien copié ! Vos contacts verront directement ce calcul.',
    popularPairsTitle: 'Index des paires de nombres les plus recherchées',
    popularPairsSub: 'Cliquez sur une paire pour charger le calcul immédiat et ses étapes',
    printWorksheetTitle: 'Générateur de fiches d’exercices imprimables A4',
    adPlaceholder: 'Emplacement publicitaire sponsorisé (Google AdSense)',
  },
  pt: {
    siteTitle: 'MDC Math Hub',
    tagline: 'Calculadora de Máximo Divisor Comum e Mínimo Múltiplo Comum',
    heroBadge: 'Ferramenta Matemática · Olimpíadas · Fatoração · Teoria dos Números',
    heroHeading: 'Calculadora de Máximo Divisor Comum (MDC) e MMC com Passos',
    heroSubheading:
      'Calculadora online gratuita de MDC e MMC com resolução passo a passo: dispositivo prático de divisões simultâneas, algoritmo de Euclides, diagrama de Venn de fatores primos e ladrilhamento geométrico.',
    twoNumMode: 'Dois números (Passo a passo)',
    multiNumMode: 'Múltiplos números (3 ou mais)',
    presetTitle: 'Exemplos comuns:',
    inputALabel: 'Primeiro número inteiro (A)',
    inputBLabel: 'Segundo número inteiro (B)',
    multiInputLabel: 'Digite números inteiros separados por vírgulas ou espaços',
    gcdCardTitle: 'Máximo Divisor Comum (MDC)',
    gcdCardDesc: 'O maior número inteiro positivo que divide todos os números dados',
    lcmCardTitle: 'Mínimo Múltiplo Comum (MMC)',
    lcmCardDesc: 'O menor inteiro positivo múltiplo de todos os números inseridos',
    identityTitle: 'Propriedade fundamental do produto',
    copyBtn: 'Copiar resultado e passos',
    copiedBtn: 'Copiado para a área de transferência!',
    coprimeBadge: 'Primos entre si',
    commonFactorsTitle: 'Divisores comuns',
    algorithmSectionTitle: '4 Métodos com resolução passo a passo',
    algorithmSectionSub: 'Compare o dispositivo prático, o algoritmo de Euclides, fatores primos e ladrilhamento',
    tabShort: 'Divisões simultâneas',
    tabEuclid: 'Algoritmo de Euclides',
    tabPrime: 'Fatores primos (Venn)',
    tabSubtraction: 'Subtrações sucessivas',
    tabTiling: 'Ladrilhamento geométrico',
    tabFactors: 'Divisores e resolução escrita',
    tabFactoring: 'Fatoração e frações',
    tabDirectory: 'Índice de pares populares',
    tabWorksheet: 'Folhas para imprimir',
    tabQuiz: 'Quiz de exercícios',
    tabWiki: 'Teoria e perguntas frequentes',
    shareBtn: 'Compartilhar link do cálculo',
    shareToast: 'Link copiado com sucesso!',
    popularPairsTitle: 'Índice de pares de números mais buscados',
    popularPairsSub: 'Clique em qualquer par para carregar os passos e fórmulas',
    printWorksheetTitle: 'Gerador de folhas de exercícios para impressão',
    adPlaceholder: 'Espaço publicitário patrocinado (Google AdSense)',
  },
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
    tabFactors: '因数与规范作业',
    tabFactoring: '因式分解与约分',
    tabDirectory: '高频数对速查',
    tabWorksheet: '生成打印作业纸',
    tabQuiz: '奥数真题自测',
    tabWiki: '数论百科与FAQ',
    shareBtn: '分享此计算链接',
    shareToast: '链接已复制，发给同学/家长随时查看！',
    popularPairsTitle: '高频搜索数字对速查表 (Programmatic SEO Index)',
    popularPairsSub: '点击任一数字对即可秒出步骤图解与结论',
    printWorksheetTitle: '打印练习题生成器',
    adPlaceholder: '赞助商展示广告位 (Google AdSense 规范尺寸预留)',
  },
};
