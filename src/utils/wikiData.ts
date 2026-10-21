import { Language } from './i18n';

export interface WikiSectionData {
  badge: string;
  conceptHeading: string;
  conceptIntro: string;
  mathNotationTitle: string;
  mathNotations: { label: string; formula: string }[];
  propertiesHeading: string;
  properties: { title: string; desc: string; formula: string }[];
  tableHeading: string;
  tableSubtitle: string;
  tableHeaders: [string, string, string, string];
  tableRows: [string, string, string, string][];
  faqsHeading: string;
  faqs: { q: string; a: string }[];
}

export const WIKI_DATA: Record<Language, WikiSectionData> = {
  en: {
    badge: 'Number Theory Concepts & Notation',
    conceptHeading: 'What is the Greatest Common Divisor (GCD / GCF)?',
    conceptIntro:
      'The Greatest Common Divisor (also known as the Greatest Common Factor, GCF, or Highest Common Factor, HCF) of two or more non-zero integers is the largest positive integer that divides each of the integers without leaving a remainder.',
    mathNotationTitle: 'Standard Mathematical Notations:',
    mathNotations: [
      { label: 'International standard in mathematics and algebra:', formula: '\\gcd(a, b) = d' },
      { label: 'Parentheses shorthand often used in competitions:', formula: '(a, b) = d' },
      { label: 'Corresponding Least Common Multiple notation:', formula: '\\operatorname{lcm}(a, b) = [a, b] = m' },
    ],
    propertiesHeading: 'Fundamental Theorems & Fast Calculation Rules',
    properties: [
      {
        title: 'Dual Product Theorem (GCD & LCM Relation)',
        desc: 'For any two positive integers a and b, the product of their GCD and LCM strictly equals the product of the numbers:',
        formula: 'a \\times b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b)',
      },
      {
        title: 'Multiple Divisibility Property',
        desc: 'If integer a is a multiple of integer b (a = k · b), then b is the GCD and a is the LCM:',
        formula: '\\gcd(a, b) = b, \\quad \\operatorname{lcm}(a, b) = a',
      },
      {
        title: 'Linear Shift Invariance (Euclidean Basis)',
        desc: 'Subtracting any multiple of b from a leaves the GCD completely unchanged:',
        formula: '\\gcd(a, b) = \\gcd(b, a - k \\cdot b)',
      },
      {
        title: 'Consecutive Natural Numbers are Coprime',
        desc: 'Any two consecutive positive integers n and n + 1 always have a GCD of 1:',
        formula: '\\gcd(n, n + 1) = 1',
      },
    ],
    tableHeading: 'Comprehensive Comparison of 4 GCD Algorithms',
    tableSubtitle: 'When to choose Euclidean Algorithm, Ladder Method, Prime Factorization, or Subtractions',
    tableHeaders: ['Algorithm Name', 'Core Principle', 'Best For', 'Pros & Cons'],
    tableRows: [
      [
        'Euclidean Algorithm',
        'Repeated division with remainder until remainder is 0',
        'Large numbers, computer algorithms, cryptography',
        'Fastest logarithmic convergence; requires long division',
      ],
      [
        'Ladder (Short Division)',
        'Simultaneous division by shared primes until quotients are coprime',
        'School homework, mental math, simultaneous LCM',
        'Intuitive L-shape visualization; hard when prime factors are huge',
      ],
      [
        'Prime Factorization',
        'Factor both numbers and take lowest exponents of shared primes',
        'Understanding number theory, Venn diagram sets',
        'Exposes the prime architecture; slow for large composites',
      ],
      [
        'Successive Subtractions',
        'Repeated subtraction of smaller from larger until equal',
        'Historical Nine Chapters algorithm, hardware without division',
        'Only requires subtraction; slow when one number is much larger',
      ],
    ],
    faqsHeading: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        q: 'What is the difference between GCD and LCM?',
        a: 'GCD (Greatest Common Divisor) is the largest integer that divides both numbers evenly. LCM (Least Common Multiple) is the smallest integer divisible by both numbers. They are bound by the law: a × b = gcd(a, b) × lcm(a, b).',
      },
      {
        q: 'What does "coprime" or "relatively prime" mean?',
        a: 'Two numbers are coprime if their only positive common divisor is 1, meaning gcd(a, b) = 1. For example, 14 and 25 are coprime even though neither is a prime number.',
      },
      {
        q: 'Can the GCD of two numbers be greater than either number?',
        a: 'No. The GCD of positive integers a and b can never exceed min(a, b). For example, gcd(12, 18) cannot exceed 12.',
      },
      {
        q: 'How does finding the GCD help with polynomial factoring in algebra?',
        a: 'Finding the GCD of numerical coefficients is the essential first step of factoring by grouping or extracting common monomial terms, e.g., in 12x³ + 18x², gcd(12, 18) = 6, yielding 6x²(2x + 3).',
      },
    ],
  },

  es: {
    badge: 'Conceptos de Teoría de Números y Notación',
    conceptHeading: '¿Qué es el Máximo Común Divisor (MCD)?',
    conceptIntro:
      'El Máximo Común Divisor (MCD) de dos o más números enteros positivos es el mayor número entero que divide exactamente a todos ellos sin dejar resto.',
    mathNotationTitle: 'Notaciones matemáticas habituales:',
    mathNotations: [
      { label: 'Notación estándar internacional:', formula: '\\operatorname{mcd}(a, b) = d' },
      { label: 'Notación abreviada entre paréntesis:', formula: '(a, b) = d' },
      { label: 'Notación correspondiente para el MCM:', formula: '\\operatorname{mcm}(a, b) = [a, b] = m' },
    ],
    propertiesHeading: 'Propiedades Fundamentales y Leyes de Cálculo Rápido',
    properties: [
      {
        title: 'Teorema del producto dual (Relación MCD y MCM)',
        desc: 'Para cualesquiera dos enteros positivos a y b, el producto de su MCD y MCM es igual al producto de los números:',
        formula: 'a \\times b = \\operatorname{mcd}(a, b) \\times \\operatorname{mcm}(a, b)',
      },
      {
        title: 'Propiedad de inclusión de múltiplos',
        desc: 'Si a es múltiplo de b (a = k · b), entonces el menor número es el MCD y el mayor es el MCM:',
        formula: '\\operatorname{mcd}(a, b) = b, \\quad \\operatorname{mcm}(a, b) = a',
      },
      {
        title: 'Invarianza por traslación lineal (Base de Euclides)',
        desc: 'Restar cualquier múltiplo de b al número a mantiene el MCD inalterado:',
        formula: '\\operatorname{mcd}(a, b) = \\operatorname{mcd}(b, a - k \\cdot b)',
      },
      {
        title: 'Números consecutivos son primos entre sí',
        desc: 'Dos números naturales consecutivos n y n + 1 siempre tienen MCD igual a 1:',
        formula: '\\operatorname{mcd}(n, n + 1) = 1',
      },
    ],
    tableHeading: 'Comparativa de los 4 Algoritmos de MCD',
    tableSubtitle: 'Cuándo elegir Euclides, divisiones sucesivas, descomposición en factores primos o restas',
    tableHeaders: ['Algoritmo', 'Principio básico', 'Ámbito ideal', 'Ventajas y desventajas'],
    tableRows: [
      [
        'Algoritmo de Euclides',
        'Divisiones sucesivas con resto hasta que el resto sea 0',
        'Números grandes, algoritmos informáticos, criptografía',
        'Convergencia logarítmica ultra rápida; requiere divisiones',
      ],
      [
        'Descomposición simultánea (Escalera)',
        'Divisiones simultáneas entre primos comunes hasta cocientes coprimos',
        'Ejercicios escolares, cálculo mental, cálculo conjunto con MCM',
        'Visualización en "L" muy clara; laborioso si los primos son altos',
      ],
      [
        'Factores primos (Venn)',
        'Descomponer en factores primos y tomar menores exponentes',
        'Comprensión conceptual, conjuntos de divisores',
        'Revela la estructura prima; costoso para compuestos grandes',
      ],
      [
        'Restas sucesivas',
        'Restar sucesivamente el menor del mayor hasta la igualdad',
        'Historia matemática antigua, circuitos que no dividen',
        'Solo emplea restas; lento si la diferencia inicial es enorme',
      ],
    ],
    faqsHeading: 'Preguntas Frecuentes (FAQ)',
    faqs: [
      {
        q: '¿Cuál es la diferencia entre MCD y MCM?',
        a: 'El MCD es el mayor divisor común que divide a ambos números sin dejar resto. El MCM es el menor múltiplo positivo divisible por ambos. Se relacionan mediante a × b = mcd(a, b) × mcm(a, b).',
      },
      {
        q: '¿Qué significa que dos números sean primos entre sí (coprimos)?',
        a: 'Dos números son coprimos si su único divisor común positivo es 1, es decir, mcd(a, b) = 1. Por ejemplo, 14 y 25 son coprimos aunque ninguno de ellos sea un número primo.',
      },
      {
        q: '¿Puede el MCD ser mayor que alguno de los números?',
        a: 'No. El MCD de dos enteros positivos nunca puede superar al menor de los dos números: mcd(a, b) ≤ min(a, b).',
      },
      {
        q: '¿Cómo ayuda el MCD en la factorización de polinomios en álgebra?',
        a: 'Calcular el MCD de los coeficientes numéricos es el paso inicial para sacar factor común monomio, por ejemplo en 12x³ + 18x², mcd(12, 18) = 6, obteniendo 6x²(2x + 3).',
      },
    ],
  },

  fr: {
    badge: 'Notions d’Arithmétique et Notations',
    conceptHeading: 'Qu’est-ce que le Plus Grand Commun Diviseur (PGCD) ?',
    conceptIntro:
      'Le Plus Grand Commun Diviseur (PGCD) de deux ou plusieurs entiers naturels non nuls est le plus grand entier qui les divise tous sans laisser de reste.',
    mathNotationTitle: 'Notations mathématiques usuelles :',
    mathNotations: [
      { label: 'Notation usuelle en mathématiques :', formula: '\\operatorname{pgcd}(a, b) = d' },
      { label: 'Notation abrégée entre parenthèses :', formula: '(a, b) = d' },
      { label: 'Notation correspondante pour le PPCM :', formula: '\\operatorname{ppcm}(a, b) = [a, b] = m' },
    ],
    propertiesHeading: 'Propriétés Fondamentales et Formules de Calcul',
    properties: [
      {
        title: 'Théorème du produit (Lien PGCD et PPCM)',
        desc: 'Pour tous entiers positifs a et b, le produit de leur PGCD et de leur PPCM est égal au produit des deux nombres :',
        formula: 'a \\times b = \\operatorname{pgcd}(a, b) \\times \\operatorname{ppcm}(a, b)',
      },
      {
        title: 'Cas où un nombre est multiple de l’autre',
        desc: 'Si a est divisible par b (a = k · b), alors b est le PGCD et a est le PPCM :',
        formula: '\\operatorname{pgcd}(a, b) = b, \\quad \\operatorname{ppcm}(a, b) = a',
      },
      {
        title: 'Invariance par combinaison euclidienne',
        desc: 'Soustraire un multiple de b à a ne modifie pas le PGCD :',
        formula: '\\operatorname{pgcd}(a, b) = \\operatorname{pgcd}(b, a - k \\cdot b)',
      },
      {
        title: 'Entiers consécutifs premiers entre eux',
        desc: 'Deux entiers naturels consécutifs n et n + 1 sont toujours premiers entre eux :',
        formula: '\\operatorname{pgcd}(n, n + 1) = 1',
      },
    ],
    tableHeading: 'Comparatif des 4 Algorithmes de Calcul du PGCD',
    tableSubtitle: 'Comment choisir entre l’algorithme d’Euclide, la disposition en échelle, les facteurs premiers et les soustractions',
    tableHeaders: ['Nom de l’algorithme', 'Principe', 'Domaine d’excellence', 'Avantages et limites'],
    tableRows: [
      [
        'Algorithme d’Euclide',
        'Divisions euclidiennes successives jusqu’à l’obtention d’un reste nul',
        'Grands nombres, calcul informatique, cryptographie',
        'Convergence ultra rapide ; nécessite la division posée',
      ],
      [
        'Disposition en échelle',
        'Divisions simultanées par des nombres premiers jusqu’à coprimalité',
        'Calcul mental, devoirs au collège, calcul conjoint du PPCM',
        'Lecture en « L » très pratique ; difficile avec de grands facteurs',
      ],
      [
        'Décomposition en facteurs premiers',
        'Décomposition en puissances de premiers et choix du plus petit exposant',
        'Compréhension fondamentale et ensembles de diviseurs',
        'Structure arithmétique limpide ; lente sur les très grands nombres',
      ],
      [
        'Soustractions successives',
        'Soustraction du plus petit au plus grand jusqu’à égalité',
        'Méthode historique chinoise, processeurs sans diviseur',
        'N’utilise que des soustractions ; lente si écart initial élevé',
      ],
    ],
    faqsHeading: 'Foire Aux Questions (FAQ)',
    faqs: [
      {
        q: 'Quelle est la différence entre le PGCD et le PPCM ?',
        a: 'Le PGCD est le plus grand entier qui divise les deux nombres. Le PPCM est le plus petit entier positif multiple de l’un et de l’autre. Ils vérifient la relation a × b = pgcd(a, b) × ppcm(a, b).',
      },
      {
        q: 'Que signifie que deux nombres sont premiers entre eux ?',
        a: 'Deux nombres sont dits premiers entre eux si leur PGCD est égal à 1. Par exemple, 14 et 25 sont premiers entre eux bien qu’aucun des deux ne soit un nombre premier.',
      },
      {
        q: 'Le PGCD peut-il être plus grand que l’un des nombres ?',
        a: 'Non, le PGCD de deux entiers naturels non nuls est toujours inférieur ou égal au plus petit des deux : pgcd(a, b) ≤ min(a, b).',
      },
      {
        q: 'À quoi sert le PGCD lors de la factorisation en algèbre ?',
        a: 'Le calcul du PGCD des coefficients est l’étape indispensable pour extraire un facteur commun d’une expression, comme dans 12x³ + 18x² où pgcd(12, 18) = 6 permet d’écrire 6x²(2x + 3).',
      },
    ],
  },

  pt: {
    badge: 'Conceitos de Aritmética e Notações',
    conceptHeading: 'O que é o Máximo Divisor Comum (MDC)?',
    conceptIntro:
      'O Máximo Divisor Comum (MDC) de dois ou mais números inteiros positivos é o maior número inteiro que divide exatamente a todos sem deixar resto.',
    mathNotationTitle: 'Notações matemáticas consagradas:',
    mathNotations: [
      { label: 'Notação corrente em matemática:', formula: '\\operatorname{mdc}(a, b) = d' },
      { label: 'Notação resumida entre parênteses:', formula: '(a, b) = d' },
      { label: 'Notação correspondente para o MMC:', formula: '\\operatorname{mmc}(a, b) = [a, b] = m' },
    ],
    propertiesHeading: 'Propriedades Fundamentais e Regras Práticas',
    properties: [
      {
        title: 'Teorema do produto duplo (Relação MDC e MMC)',
        desc: 'Para quaisquer dois inteiros positivos a e b, o produto do seu MDC pelo seu MMC é rigorosamente igual ao produto dos números:',
        formula: 'a \\times b = \\operatorname{mdc}(a, b) \\times \\operatorname{mmc}(a, b)',
      },
      {
        title: 'Propriedade de múltiplos inclusos',
        desc: 'Se a é múltiplo de b (a = k · b), então o menor número é o MDC e o maior é o MMC:',
        formula: '\\operatorname{mdc}(a, b) = b, \\quad \\operatorname{mmc}(a, b) = a',
      },
      {
        title: 'Invariância por subtração múltipla (Euclides)',
        desc: 'Subtrair qualquer múltiplo de b ao valor de a não altera o MDC:',
        formula: '\\operatorname{mdc}(a, b) = \\operatorname{mdc}(b, a - k \\cdot b)',
      },
      {
        title: 'Números naturais consecutivos são primos entre si',
        desc: 'Dois números naturais consecutivos n e n + 1 possuem sempre MDC igual a 1:',
        formula: '\\operatorname{mdc}(n, n + 1) = 1',
      },
    ],
    tableHeading: 'Quadro Comparativo dos 4 Métodos de Cálculo do MDC',
    tableSubtitle: 'Quando utilizar o Algoritmo de Euclides, o Método da Escada, Fatores Primos ou Subtrações',
    tableHeaders: ['Nome do Método', 'Princípio de Cálculo', 'Melhor Aplicação', 'Pontos Fortes e Limites'],
    tableRows: [
      [
        'Algoritmo de Euclides',
        'Divisões sucessivas com resto até resto igual a 0',
        'Números grandes, programação, criptografia',
        'Convergência logarítmica extremamente veloz; exige divisões longas',
      ],
      [
        'Método da Escada (Divisões Simultâneas)',
        'Divisões simultâneas por primos até quocientes primos entre si',
        'Ensino básico, cálculo mental rápido, cálculo conjunto com MMC',
        'Disposição em "L" muito clara; trabalhoso para primos muito grandes',
      ],
      [
        'Fatoração em Primos',
        'Decomposição e seleção de primos comuns com menor expoente',
        'Compreensão teórica e conjuntos de divisores',
        'Visualização transparente; demorado para números compostos gigantes',
      ],
      [
        'Subtrações Sucessivas',
        'Subtração repetida do menor ao maior até que se igualem',
        'Método histórico chinês, hardware sem unidade de divisão',
        'Usa apenas subtrações; lento quando a diferença inicial é grande',
      ],
    ],
    faqsHeading: 'Perguntas Mais Frequentes (FAQ)',
    faqs: [
      {
        q: 'Qual é a diferença entre MDC e MMC?',
        a: 'O MDC é o maior divisor comum que divide exatamente ambos os números. O MMC é o menor múltiplo positivo divisível por ambos. Relacionam-se pela fórmula a × b = mdc(a, b) × mmc(a, b).',
      },
      {
        q: 'O que significa dois números serem primos entre si (coprimos)?',
        a: 'Significa que o único divisor positivo comum entre eles é o número 1, ou seja, mdc(a, b) = 1. Por exemplo, 14 e 25 são primos entre si mesmo sem serem individualmente primos.',
      },
      {
        q: 'O MDC pode ser maior do que um dos números dados?',
        a: 'Não. O MDC de dois números inteiros positivos nunca pode ser maior que o menor dos números: mdc(a, b) ≤ min(a, b).',
      },
      {
        q: 'Como o MDC é aplicado na fatoração algébrica no ensino fundamental?',
        a: 'O cálculo do MDC dos coeficientes numéricos é o passo inicial indispensável para colocar termos comuns em evidência, como em 12x³ + 18x² onde mdc(12, 18) = 6 leva a 6x²(2x + 3).',
      },
    ],
  },

  zh: {
    badge: '数论基础概念与数学符号',
    conceptHeading: '什么是最大公约数 (Greatest Common Divisor, GCD)？',
    conceptIntro:
      '最大公约数（Greatest Common Divisor，简写作 GCD，小学课本中常称作最大公因数），是指两个或多个非零整数共有约数（因数）中数值最大的一个。',
    mathNotationTitle: '常见数学表达记号：',
    mathNotations: [
      { label: '国际数论与高年级代数中常记作：', formula: '\\gcd(a, b) = d' },
      { label: '中国中小学数学竞赛中经常简写为圆括号形式：', formula: '(a, b) = d' },
      { label: '而相应的最小公倍数 (LCM) 则常记作方括号形式：', formula: '\\operatorname{lcm}(a, b) = [a, b] = m' },
    ],
    propertiesHeading: '最大公因数核心性质与奥数速算定律',
    properties: [
      {
        title: '双数乘积定律 (GCD 与 LCM 关系)',
        desc: '对于任意两个正整数 a 和 b，它们的最大公因数与最小公倍数的乘积严格等于两数本身的乘积：',
        formula: 'a \\times b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b)',
      },
      {
        title: '整倍数特征 (倍数包含律)',
        desc: '如果正整数 a 能被 b 整除（即 a = k · b），那么较小的数即为最大公因数：',
        formula: '\\gcd(a, b) = b, \\quad \\operatorname{lcm}(a, b) = a',
      },
      {
        title: '公因数线性可加性',
        desc: '对于任意整数 a, b 与倍数 k，两数的最大公约数保持不变：',
        formula: '\\gcd(a, b) = \\gcd(b, a - k \\cdot b)',
      },
      {
        title: '互质数判定与欧拉函数',
        desc: '若 gcd(a, b) = 1，则称 a 与 b 互质。两个连续自然数（如 n 与 n+1）必互质；两相异质数必互质。',
        formula: '\\gcd(n, n + 1) = 1',
      },
    ],
    tableHeading: '求最大公约数四种算法全方位横评',
    tableSubtitle: '辗转相除法、短除法、质因数分解法、更相减损法适用场景对比',
    tableHeaders: ['算法名称', '核心计算机制', '最佳适用场景', '主要优势与缺点'],
    tableRows: [
      [
        '辗转相除法 (欧几里得法)',
        '重复用较小数除较大数，直到余数为 0',
        '超大整数、编程计算机实现、初高中数论',
        '收敛速度最快，对大数无需试除质数；缺点是手工算除法需列竖式',
      ],
      [
        '梯形短除法 (中小学标准)',
        '同时除以公共素数，商直至互质',
        '小学奥数日常、小中型数字手算、求分数约分',
        '视觉清晰，“L”型乘积同步算出 LCM；缺点是数字极大时难以看出质因数',
      ],
      [
        '质因数分解法 (指数极值)',
        '分解素因子后取公共质因数最低次幂',
        '理解数论本质、中考质数分解大题、韦恩图分析',
        '逻辑严谨；缺点是合数极大时分解质因数极为费时',
      ],
      [
        '更相减损法 (九章算术)',
        '偶数先折半，其后大数减小数直至差与减数相等',
        '中国传统古代数学计算、缺乏除法器硬件环境',
        '仅需加减法运算；两数悬殊时减法步数较多',
      ],
    ],
    faqsHeading: '常见疑难问题解答 (FAQ)',
    faqs: [
      {
        q: '最大公因数 (GCD) 和最小公倍数 (LCM) 有什么区别？',
        a: '最大公因数是两数共同拥有的最大约数（数值小于等于较小数）；最小公倍数是两数共同拥有的最小倍数（数值大于等于较大数）。二者乘积等于两数原本之积。',
      },
      {
        q: '两数互质（Coprime）是什么意思？一定是两个质数吗？',
        a: '互质是指两个正整数的最大公因数为 1。互质的两个数不一定是质数，例如 8（合数）与 9（合数）的最大公约数为 1，它们是互质数。',
      },
      {
        q: '两个数的最大公因数能大于其中较小的那个数吗？',
        a: '绝对不可能。公因数必须能整除较小数，因此必定小于或等于较小的那个数字。例如 gcd(12, 18) 绝不可能大于 12。',
      },
      {
        q: '最大公约数对初中因式分解有什么帮助？',
        a: '在初一代数“提公因式法”中，第一步就是提取各项系数的最大公约数。例如 12x³ + 18x²，系数 12 和 18 的最大公约数是 6，提取后化为 6x²(2x + 3)。',
      },
    ],
  },
};
