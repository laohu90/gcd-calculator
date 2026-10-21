import { Language } from './i18n';

export interface ComponentLocale {
  euclid: {
    principleTitle: string;
    principleDesc: string;
    colStep: string;
    colDividend: string;
    colDivisor: string;
    colQuotient: string;
    colRemainder: string;
    colEquation: string;
    conclusionTitle: string;
    conclusionDesc: (stepCount: number) => string;
    totalSteps: (count: number) => string;
    bezoutToggle: string;
    bezoutDesc: string;
    bezoutSolution: (x: string, y: string) => string;
  };
  shortDivision: {
    emptyNote: (nums: string) => string;
    emptySub: (nums: string, lcm: number) => string;
    badgeTitle: string;
    badgeHint: string;
    quotientLabel: string;
    gcdCardTitle: string;
    gcdCardDesc: string;
    lcmCardTitle: string;
    lcmCardDesc: string;
    stopRuleTitle: string;
    stopRuleDesc: string;
  };
  primeFactor: {
    canonicalA: string;
    canonicalB: string;
    vennTitle: string;
    vennSubtitle: string;
    labelOnlyA: (n: number) => string;
    labelOnlyB: (n: number) => string;
    labelIntersection: string;
    none: string;
    gcdRuleTitle: string;
    gcdRuleDesc: string;
    lcmRuleTitle: string;
    lcmRuleDesc: string;
    tableTitle: string;
    colPrime: string;
    colExpA: (n: number) => string;
    colExpB: (n: number) => string;
    colMinExp: string;
    colMaxExp: string;
  };
  subtraction: {
    quoteTitle: string;
    quoteBody: string;
    halvingTitle: string;
    halvingDesc: (a: number, b: number, count: number, factor: number) => string;
    halvingResult: (count: number, newA: number, newB: number) => string;
    colRound: string;
    colLarger: string;
    colSmaller: string;
    colDiff: string;
    colEquation: string;
    conclusionTitle: string;
    conclusionDesc: (equalVal: number, halvingCount: number, finalGcd: number) => string;
  };
  tiling: {
    tabTiling: string;
    tabCuts: string;
    dimLabel: (w: number, h: number) => string;
    maxSquareTitle: (gcd: number) => string;
    totalCount: (total: number, x: number, y: number) => string;
    cutDesc: string;
    cutStep: (step: number, size: number, count: number) => string;
    scaleNotice: string;
  };
  factorExplorer: {
    templateTitle: string;
    copyBtn: string;
    copiedBtn: string;
    pairsTitle: string;
    pairsSubtitle: (a: number, b: number) => string;
    factorsOf: (n: number) => string;
    primeLabel: string;
    factorCount: (c: number) => string;
    maxBadge: string;
    pairsList: string;
    divisibilityTitle: string;
    divisibilitySubtitle: string;
    colDivisor: string;
    colDivisibleA: (a: number) => string;
    colDivisibleB: (b: number) => string;
    colReason: string;
    yesBadge: string;
    noBadge: string;
    solverTitle: string;
    solverSubtitle: string;
    scenarios: {
      paperTab: string;
      giftTab: string;
      treeTab: string;
      busTab: string;
      paperText: (a: number, b: number, gcd: number) => { title: string; s1: string; s2: string };
      giftText: (a: number, b: number, gcd: number) => { title: string; s1: string; s2: string };
      treeText: (a: number, b: number, gcd: number) => { title: string; s1: string; s2: string };
      busText: (a: number, b: number, lcm: number) => { title: string; s1: string; s2: string };
    };
  };
  factoring: {
    title: string;
    subtitle: string;
    methodBadge: string;
    presetsLabel: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    fractionTitle: string;
    fractionSubtitle: string;
    numLabel: string;
    denLabel: string;
    gcdFound: (g: number) => string;
    divideStep: string;
    reducedResult: string;
  };
  directory: {
    all: string;
    textbook: string;
    factoring: string;
    coprime: string;
    large: string;
    three: string;
    clickHint: string;
    lcmLabel: string;
  };
}

export const COMPONENT_TRANSLATIONS: Record<Language, ComponentLocale> = {
  en: {
    euclid: {
      principleTitle: 'Euclidean Algorithm Principle:',
      principleDesc: 'Classic algorithm formulated by Euclid in "Elements" c. 300 BC',
      colStep: 'Step',
      colDividend: 'Dividend (a)',
      colDivisor: 'Divisor (b)',
      colQuotient: 'Quotient (q)',
      colRemainder: 'Remainder (r)',
      colEquation: 'Euclidean Division Identity',
      conclusionTitle: 'Algorithm Termination & Result',
      conclusionDesc: (n) => `At step ${n}, the remainder reaches 0. The last non-zero remainder (current divisor) is the Greatest Common Divisor:`,
      totalSteps: (c) => `Solved in ${c} division steps`,
      bezoutToggle: "Bézout's Identity & Extended Euclidean Algorithm",
      bezoutDesc: "Bézout's identity states that for any integers a and b, there exist integers x and y such that:",
      bezoutSolution: (x, y) => `Particular solution: x = ${x}, y = ${y}`,
    },
    shortDivision: {
      emptyNote: (nums) => `Numbers [${nums}] have no common prime factor greater than 1 (they are coprime).`,
      emptySub: (nums, lcm) => `Therefore GCD = 1, and LCM = ${nums} = ${lcm}.`,
      badgeTitle: 'Ladder Method (Simultaneous Division)',
      badgeHint: 'Left column: Common Divisors · Bottom: Coprime Quotients',
      quotientLabel: 'Quotients',
      gcdCardTitle: 'Greatest Common Divisor (GCD) = Product of Left Divisors',
      gcdCardDesc: 'Multiply all common prime factors extracted in the left column:',
      lcmCardTitle: 'Least Common Multiple (LCM) = Product of L-Shape Numbers',
      lcmCardDesc: 'Multiply all left column divisors and bottom row quotients (L-shape):',
      stopRuleTitle: 'Ladder Termination Rule:',
      stopRuleDesc: 'Stop dividing when the quotients on the bottom are pairwise coprime (share no common factor other than 1).',
    },
    primeFactor: {
      canonicalA: 'Prime Factorization of Number A',
      canonicalB: 'Prime Factorization of Number B',
      vennTitle: 'Prime Factor Venn Diagram Partition',
      vennSubtitle: 'Intersection = GCD · Union = LCM',
      labelOnlyA: (n) => `Factors unique to ${n}`,
      labelOnlyB: (n) => `Factors unique to ${n}`,
      labelIntersection: 'Intersection ∩ (Shared)',
      none: 'None',
      gcdRuleTitle: 'GCD from Prime Factors (Lowest Exponent Rule)',
      gcdRuleDesc: 'Take all common prime factors raised to their lowest powers:',
      lcmRuleTitle: 'LCM from Prime Factors (Highest Exponent Rule)',
      lcmRuleDesc: 'Take all distinct prime factors raised to their highest powers:',
      tableTitle: 'Prime Factor Exponents Comparison',
      colPrime: 'Prime (p)',
      colExpA: (n) => `Exp in ${n}`,
      colExpB: (n) => `Exp in ${n}`,
      colMinExp: 'Min (GCD)',
      colMaxExp: 'Max (LCM)',
    },
    subtraction: {
      quoteTitle: 'From "The Nine Chapters on the Mathematical Art" (c. 100 BC)',
      quoteBody: '"If both numbers can be halved, halve them. If not, set down the larger and smaller, subtract the smaller from the larger repeatedly, seeking equality. Simplify by the equal number."',
      halvingTitle: 'Phase 1: Even Numbers Halving',
      halvingDesc: (a, b, count, factor) => `Initial numbers (${a}, ${b}) are both even. Repeatedly divide by 2 to extract 2^${count} = ${factor}:`,
      halvingResult: (count, newA, newB) => `After halving ${count} time(s): A = ${newA}, B = ${newB}`,
      colRound: 'Round',
      colLarger: 'Larger (x)',
      colSmaller: 'Smaller (y)',
      colDiff: 'Difference (x - y)',
      colEquation: 'Subtraction Formula',
      conclusionTitle: 'Termination & Equal Value',
      conclusionDesc: (eq, h, g) => `The numbers reached equality at ${eq}. Re-multiplying the halved factor 2^${h} = ${Math.pow(2, h)} gives final GCD = ${g}.`,
    },
    tiling: {
      tabTiling: 'Square Tiling Grid',
      tabCuts: 'Euclidean Geometric Cuts',
      dimLabel: (w, h) => `Rectangle Dimensions: ${w} × ${h}`,
      maxSquareTitle: (gcd) => `Largest Square Tile: ${gcd} × ${gcd}`,
      totalCount: (t, x, y) => `Total tiles required: ${t} tiles (${x} horizontal × ${y} vertical)`,
      cutDesc: 'Euclid’s algorithm visualized as cutting the largest possible square from remaining area:',
      cutStep: (s, sz, c) => `Step ${s}: Cut ${c} square(s) of size ${sz} × ${sz}`,
      scaleNotice: 'Numbers scaled for interactive visual clarity on screen.',
    },
    factorExplorer: {
      templateTitle: 'Standard Homework Solution Template (Ready to Copy)',
      copyBtn: 'Copy Solution',
      copiedBtn: 'Copied to Clipboard!',
      pairsTitle: 'Complete Divisors & Factor Pairs Table',
      pairsSubtitle: (a, b) => `All divisors and multiplication pairs for ${a} and ${b}`,
      factorsOf: (n) => `Factors of ${n}`,
      primeLabel: 'Prime Number',
      factorCount: (c) => `${c} factors`,
      maxBadge: ' (Greatest)',
      pairsList: 'Factor pairs:',
      divisibilityTitle: 'Divisibility Rules Diagnostic (2, 3, 4, 5, 6, 8, 9, 10, 11)',
      divisibilitySubtitle: 'Quick divisibility test and step-by-step reasoning',
      colDivisor: 'Divisor',
      colDivisibleA: (a) => `Divisible for ${a}`,
      colDivisibleB: (b) => `Divisible for ${b}`,
      colReason: 'Mathematical Reason & Rule',
      yesBadge: '✓ Divisible',
      noBadge: '✗ Not divisible',
      solverTitle: 'Olympiad Word Problem Solver',
      solverSubtitle: 'Interactive solutions for 4 classic real-world scenarios',
      scenarios: {
        paperTab: 'Tile / Paper Cut',
        giftTab: 'Distribute Items',
        treeTab: 'Tree Planting',
        busTab: 'Bus Interval',
        paperText: (a, b, g) => ({
          title: `[Paper Tiling Problem]: A rectangular board has length ${a} cm and width ${b} cm. We want to cut it into equal-sized square pieces without any leftover paper.`,
          s1: `① Maximum side length of square = gcd(${a}, ${b}) = ${g} cm`,
          s2: `② Total squares = (${a} ÷ ${g}) × (${b} ÷ ${g}) = ${(a / g) * (b / g)} pieces`,
        }),
        giftText: (a, b, g) => ({
          title: `[Item Distribution Problem]: A teacher has ${a} pens and ${b} notebooks to distribute evenly among students with no items remaining.`,
          s1: `① Maximum number of students = gcd(${a}, ${b}) = ${g} students`,
          s2: `② Each student receives: ${a / g} pen(s) and ${b / g} notebook(s)`,
        }),
        treeText: (a, b, g) => ({
          title: `[Tree Planting Problem]: Two roads of lengths ${a} meters and ${b} meters need trees planted at equal maximum integer intervals along both sides.`,
          s1: `① Maximum interval distance between trees = gcd(${a}, ${b}) = ${g} meters`,
          s2: `② Total saplings needed = (${a} ÷ ${g} + 1) + (${b} ÷ ${g} + 1) = ${a / g + 1 + b / g + 1} trees`,
        }),
        busText: (a, b, l) => ({
          title: `[Bus Schedule Interval Problem]: Route 1 departs every ${a} minutes, and Route 2 departs every ${b} minutes. Both depart simultaneously at 7:00 AM.`,
          s1: `① Next simultaneous departure interval = lcm(${a}, ${b}) = ${l} minutes (${Math.floor(l / 60)}h ${l % 60}m later)`,
          s2: `② During this period: Route 1 departs ${l / a} times; Route 2 departs ${l / b} times`,
        }),
      },
    },
    factoring: {
      title: 'Polynomial GCF Extraction & Fraction Simplifier',
      subtitle: 'Elementary factoring precursor and fraction reduction by GCD',
      methodBadge: 'Common Monomial Factoring Method',
      presetsLabel: 'Textbook Practice Examples:',
      step1Title: 'Step 1: Extract Numerical GCF & Common Variables',
      step1Desc: 'Identify the greatest common divisor of coefficients and lowest power of each shared variable:',
      step2Title: 'Step 2: Factored Form & Remainder Polynomial',
      step2Desc: 'Divide each original term by the extracted greatest common factor:',
      fractionTitle: 'Step-by-Step Fraction Simplifier',
      fractionSubtitle: 'Divide both numerator and denominator by their greatest common divisor',
      numLabel: 'Numerator (Top)',
      denLabel: 'Denominator (Bottom)',
      gcdFound: (g) => `Common Divisor GCD = ${g}`,
      divideStep: 'Divide numerator and denominator by GCD:',
      reducedResult: 'Final irreducible fraction:',
    },
    directory: {
      all: 'All Pairs',
      textbook: 'Textbook Classics',
      factoring: 'Factoring Precursors',
      coprime: 'Coprimes (GCD = 1)',
      large: 'Large Euclidean',
      three: 'Three Numbers',
      clickHint: 'Click to load full calculation',
      lcmLabel: 'LCM',
    },
  },

  es: {
    euclid: {
      principleTitle: 'Principio del Algoritmo de Euclides:',
      principleDesc: 'Algoritmo clásico propuesto por Euclides en los "Elementos" hacia el 300 a. C.',
      colStep: 'Paso',
      colDividend: 'Dividendo (a)',
      colDivisor: 'Divisor (b)',
      colQuotient: 'Cociente (q)',
      colRemainder: 'Resto (r)',
      colEquation: 'Identidad de división con resto',
      conclusionTitle: 'Conclusión del algoritmo',
      conclusionDesc: (n) => `En el paso ${n}, el resto se hace 0. El último resto no nulo (divisor actual) es el Máximo Común Divisor:`,
      totalSteps: (c) => `Resuelto en ${c} divisiones sucesivas`,
      bezoutToggle: 'Identidad de Bézout y Algoritmo de Euclides Extendido',
      bezoutDesc: 'La identidad de Bézout afirma que para cualesquiera enteros a y b existen enteros x e y tales que:',
      bezoutSolution: (x, y) => `Solución particular: x = ${x}, y = ${y}`,
    },
    shortDivision: {
      emptyNote: (nums) => `Los números [${nums}] no tienen factores primos comunes mayores que 1 (son primos entre sí).`,
      emptySub: (nums, lcm) => `Por lo tanto MCD = 1 y MCM = ${nums} = ${lcm}.`,
      badgeTitle: 'Método de Descomposición Simultánea (Escalera)',
      badgeHint: 'Columna izquierda: Divisores comunes · Abajo: Cocientes primos entre sí',
      quotientLabel: 'Cocientes',
      gcdCardTitle: 'Máximo Común Divisor (MCD) = Producto de la columna izquierda',
      gcdCardDesc: 'Multiplicar todos los divisores primos extraídos a la izquierda:',
      lcmCardTitle: 'Mínimo Común Múltiplo (MCM) = Producto en forma de "L"',
      lcmCardDesc: 'Multiplicar los divisores de la izquierda y los cocientes finales en "L":',
      stopRuleTitle: 'Regla de parada del método:',
      stopRuleDesc: 'La descomposición finaliza cuando los cocientes inferiores son primos entre sí.',
    },
    primeFactor: {
      canonicalA: 'Descomposición prima del número A',
      canonicalB: 'Descomposición prima del número B',
      vennTitle: 'Diagrama de Venn de Factores Primos',
      vennSubtitle: 'Intersección = MCD · Unión = MCM',
      labelOnlyA: (n) => `Factores exclusivos de ${n}`,
      labelOnlyB: (n) => `Factores exclusivos de ${n}`,
      labelIntersection: 'Intersección ∩ (Comunes)',
      none: 'Ninguno',
      gcdRuleTitle: 'Cálculo del MCD (Menor Exponente)',
      gcdRuleDesc: 'Factores primos comunes elevados al menor exponente:',
      lcmRuleTitle: 'Cálculo del MCM (Mayor Exponente)',
      lcmRuleDesc: 'Todos los factores primos elevados al mayor exponente:',
      tableTitle: 'Comparación de exponentes de factores primos',
      colPrime: 'Primo (p)',
      colExpA: (n) => `Exp en ${n}`,
      colExpB: (n) => `Exp en ${n}`,
      colMinExp: 'Mín (MCD)',
      colMaxExp: 'Máx (MCM)',
    },
    subtraction: {
      quoteTitle: 'De "Los nueve capítulos sobre el arte matemático" (s. I a. C.)',
      quoteBody: '"Si ambos números pueden reducirse a la mitad, hágalo. Si no, reste el menor del mayor repetidamente buscando la igualdad."',
      halvingTitle: 'Fase 1: Reducción de pares',
      halvingDesc: (a, b, count, factor) => `Los números (${a}, ${b}) son pares. Se divide entre 2 repetidamente obteniendo 2^${count} = ${factor}:`,
      halvingResult: (count, newA, newB) => `Tras ${count} reducción(es): A = ${newA}, B = ${newB}`,
      colRound: 'Ronda',
      colLarger: 'Mayor (x)',
      colSmaller: 'Menor (y)',
      colDiff: 'Diferencia (x - y)',
      colEquation: 'Fórmula de resta',
      conclusionTitle: 'Término e igualdad',
      conclusionDesc: (eq, h, g) => `Los números se igualaron en ${eq}. Multiplicando por 2^${h} = ${Math.pow(2, h)} resulta MCD = ${g}.`,
    },
    tiling: {
      tabTiling: 'Cuadrícula de baldosas',
      tabCuts: 'Cortes geométricos euclidianos',
      dimLabel: (w, h) => `Dimensiones del rectángulo: ${w} × ${h}`,
      maxSquareTitle: (gcd) => `Baldosa cuadrada máxima: ${gcd} × ${gcd}`,
      totalCount: (t, x, y) => `Total de baldosas necesarias: ${t} (${x} horizontales × ${y} verticales)`,
      cutDesc: 'Visualización del algoritmo euclidiano cortando cuadrados máximos:',
      cutStep: (s, sz, c) => `Paso ${s}: Cortar ${c} cuadrado(s) de lado ${sz}`,
      scaleNotice: 'Dimensiones escaladas para visualización óptima en pantalla.',
    },
    factorExplorer: {
      templateTitle: 'Plantilla de solución formal de tarea (Lista para copiar)',
      copyBtn: 'Copiar solución',
      copiedBtn: '¡Copiado al portapapeles!',
      pairsTitle: 'Tabla completa de divisores y pares de factores',
      pairsSubtitle: (a, b) => `Todos los divisores y parejas de multiplicación para ${a} y ${b}`,
      factorsOf: (n) => `Divisores de ${n}`,
      primeLabel: 'Número primo',
      factorCount: (c) => `${c} divisores`,
      maxBadge: ' (Máximo)',
      pairsList: 'Pares de factores:',
      divisibilityTitle: 'Diagnóstico de criterios de divisibilidad (2, 3, 4, 5, 6, 8, 9, 10, 11)',
      divisibilitySubtitle: 'Comprobación rápida con justificación matemática paso a paso',
      colDivisor: 'Divisor',
      colDivisibleA: (a) => `Divisible para ${a}`,
      colDivisibleB: (b) => `Divisible para ${b}`,
      colReason: 'Justificación y regla matemática',
      yesBadge: '✓ Divisible',
      noBadge: '✗ No divisible',
      solverTitle: 'Resolutor de problemas de aplicación',
      solverSubtitle: 'Resolución de 4 situaciones clásicas de olimpiadas escolares',
      scenarios: {
        paperTab: 'Cortar papel',
        giftTab: 'Reparto equitativo',
        treeTab: 'Plantación',
        busTab: 'Coincidencia buses',
        paperText: (a, b, g) => ({
          title: `[Problema de corte de papel]: Se dispone de una cartulina de ${a} cm de largo por ${b} cm de ancho. Se desea cortar en cuadrados iguales sin que sobre papel.`,
          s1: `① Lado máximo del cuadrado = mcd(${a}, ${b}) = ${g} cm`,
          s2: `② Cantidad total de cuadrados = (${a} ÷ ${g}) × (${b} ÷ ${g}) = ${(a / g) * (b / g)} cuadrados`,
        }),
        giftText: (a, b, g) => ({
          title: `[Reparto de material escolar]: Un profesor tiene ${a} bolígrafos y ${b} libretas para repartir en partes iguales entre sus alumnos.`,
          s1: `① Número máximo de alumnos beneficiados = mcd(${a}, ${b}) = ${g} alumnos`,
          s2: `② Cada alumno recibe: ${a / g} bolígrafo(s) y ${b / g} libreta(s)`,
        }),
        treeText: (a, b, g) => ({
          title: `[Plantación a igual distancia]: En dos avenidas de ${a} m y ${b} m se plantan árboles a distancias enteras iguales máximas.`,
          s1: `① Distancia máxima entre árboles = mcd(${a}, ${b}) = ${g} metros`,
          s2: `② Total de árboles necesarios = (${a} ÷ ${g} + 1) + (${b} ÷ ${g} + 1) = ${a / g + 1 + b / g + 1} árboles`,
        }),
        busText: (a, b, l) => ({
          title: `[Horario de líneas de autobús]: La línea 1 sale cada ${a} min y la línea 2 cada ${b} min. Ambas parten a las 7:00 h.`,
          s1: `① Próxima coincidencia = mcm(${a}, ${b}) = ${l} minutos (${Math.floor(l / 60)}h ${l % 60}m después)`,
          s2: `② En ese intervalo: la línea 1 sale ${l / a} veces y la línea 2 sale ${l / b} veces`,
        }),
      },
    },
    factoring: {
      title: 'Extracción de factor común y simplificación de fracciones',
      subtitle: 'Herramienta didáctica para álgebra y reducción por MCD',
      methodBadge: 'Método de factor común monomio',
      presetsLabel: 'Ejercicios típicos de secundaria:',
      step1Title: 'Paso 1: Extraer MCD numérico y variables comunes',
      step1Desc: 'Hallar el máximo común divisor de los coeficientes y el menor exponente de cada variable:',
      step2Title: 'Paso 2: Polinomio factorizado',
      step2Desc: 'Dividir cada término original por el factor común extraído:',
      fractionTitle: 'Simplificador de fracciones paso a paso',
      fractionSubtitle: 'Dividir numerador y denominador por su máximo común divisor',
      numLabel: 'Numerador',
      denLabel: 'Denominador',
      gcdFound: (g) => `Divisor común MCD = ${g}`,
      divideStep: 'Dividir numerador y denominador entre el MCD:',
      reducedResult: 'Fracción irreducible final:',
    },
    directory: {
      all: 'Todos',
      textbook: 'Clásicos de texto',
      factoring: 'Coeficientes de álgebra',
      coprime: 'Coprimos (MCD = 1)',
      large: 'Grandes números',
      three: 'Tres números',
      clickHint: 'Clic para cargar el cálculo completo',
      lcmLabel: 'MCM',
    },
  },

  fr: {
    euclid: {
      principleTitle: 'Principe de l’algorithme d’Euclide :',
      principleDesc: 'Algorithme classique exposé dans les Éléments d’Euclide vers 300 av. J.-C.',
      colStep: 'Étape',
      colDividend: 'Dividende (a)',
      colDivisor: 'Diviseur (b)',
      colQuotient: 'Quotient (q)',
      colRemainder: 'Reste (r)',
      colEquation: 'Identité de division euclidienne',
      conclusionTitle: 'Conclusion et arrêt de l’algorithme',
      conclusionDesc: (n) => `À l'étape ${n}, le reste devient 0. Le dernier reste non nul (diviseur actuel) est le PGCD :`,
      totalSteps: (c) => `Résolu en ${c} divisions euclidiennes`,
      bezoutToggle: 'Théorème de Bézout et Algorithme d’Euclide étendu',
      bezoutDesc: 'L’identité de Bézout garantit que pour tous entiers a et b, il existe des entiers relatifs x et y tels que :',
      bezoutSolution: (x, y) => `Solution particulière : x = ${x}, y = ${y}`,
    },
    shortDivision: {
      emptyNote: (nums) => `Les nombres [${nums}] n’ont pas de diviseur premier commun strictement supérieur à 1.`,
      emptySub: (nums, lcm) => `Par conséquent PGCD = 1 et PPCM = ${nums} = ${lcm}.`,
      badgeTitle: 'Méthode des divisions simultanées en échelle',
      badgeHint: 'Colonne de gauche : diviseurs communs · Bas : quotients premiers entre eux',
      quotientLabel: 'Quotients',
      gcdCardTitle: 'Plus Grand Commun Diviseur (PGCD) = Produit de la colonne de gauche',
      gcdCardDesc: 'Multiplier tous les diviseurs premiers extraits à gauche :',
      lcmCardTitle: 'Plus Petit Commun Multiple (PPCM) = Produit en forme de « L »',
      lcmCardDesc: 'Multiplier les diviseurs de gauche et les quotients du bas en « L » :',
      stopRuleTitle: 'Règle d’arrêt des divisions :',
      stopRuleDesc: 'On s’arrête dès que les quotients situés en bas sont premiers entre eux.',
    },
    primeFactor: {
      canonicalA: 'Décomposition en facteurs premiers de A',
      canonicalB: 'Décomposition en facteurs premiers de B',
      vennTitle: 'Diagramme de Venn des Facteurs Premiers',
      vennSubtitle: 'Intersection = PGCD · Union = PPCM',
      labelOnlyA: (n) => `Facteurs propres à ${n}`,
      labelOnlyB: (n) => `Facteurs propres à ${n}`,
      labelIntersection: 'Intersection ∩ (Communs)',
      none: 'Aucun',
      gcdRuleTitle: 'Calcul du PGCD (Règle du plus petit exposant)',
      gcdRuleDesc: 'Produit des facteurs premiers communs affectés du plus petit exposant :',
      lcmRuleTitle: 'Calcul du PPCM (Règle du plus grand exposant)',
      lcmRuleDesc: 'Produit de tous les facteurs premiers affectés du plus grand exposant :',
      tableTitle: 'Comparaison des puissances de facteurs premiers',
      colPrime: 'Premier (p)',
      colExpA: (n) => `Exp dans ${n}`,
      colExpB: (n) => `Exp dans ${n}`,
      colMinExp: 'Min (PGCD)',
      colMaxExp: 'Max (PPCM)',
    },
    subtraction: {
      quoteTitle: 'Extrait des « Neuf Chapitres sur l’art mathématique »',
      quoteBody: '« Si les deux nombres peuvent être réduits de moitié, divisez-les par deux. Sinon, soustrayez le plus petit du plus grand jusqu’à égalité. »',
      halvingTitle: 'Phase 1 : Réduction des pairs',
      halvingDesc: (a, b, count, factor) => `Les nombres (${a}, ${b}) sont pairs. En divisant par 2 successivement, on extrait 2^${count} = ${factor} :`,
      halvingResult: (count, newA, newB) => `Après ${count} division(s) par deux : A = ${newA}, B = ${newB}`,
      colRound: 'Tour',
      colLarger: 'Plus grand (x)',
      colSmaller: 'Plus petit (y)',
      colDiff: 'Différence (x - y)',
      colEquation: 'Formule de soustraction',
      conclusionTitle: 'Terminaison et égalité',
      conclusionDesc: (eq, h, g) => `Les valeurs se rejoignent à ${eq}. En multipliant par 2^${h} = ${Math.pow(2, h)}, on obtient PGCD = ${g}.`,
    },
    tiling: {
      tabTiling: 'Pavage en carrés',
      tabCuts: 'Découpage euclidien',
      dimLabel: (w, h) => `Dimensions du rectangle : ${w} × ${h}`,
      maxSquareTitle: (gcd) => `Plus grand carré de pavage : ${gcd} × ${gcd}`,
      totalCount: (t, x, y) => `Nombre total de carrés : ${t} (${x} en largeur × ${y} en hauteur)`,
      cutDesc: 'Visualisation de l’algorithme d’Euclide par découpage de carrés maximaux :',
      cutStep: (s, sz, c) => `Étape ${s} : Découpe de ${c} carré(s) de côté ${sz}`,
      scaleNotice: 'Échelle ajustée pour un affichage interactif clair.',
    },
    factorExplorer: {
      templateTitle: 'Modèle de rédaction conforme pour devoirs (Prêt à copier)',
      copyBtn: 'Copier la rédaction',
      copiedBtn: 'Copié dans le presse-papiers !',
      pairsTitle: 'Tableau complet des diviseurs et paires de facteurs',
      pairsSubtitle: (a, b) => `Ensemble des diviseurs et paires multiplicatives pour ${a} et ${b}`,
      factorsOf: (n) => `Diviseurs de ${n}`,
      primeLabel: 'Nombre premier',
      factorCount: (c) => `${c} diviseurs`,
      maxBadge: ' (Plus grand)',
      pairsList: 'Paires de facteurs :',
      divisibilityTitle: 'Critères de divisibilité usuels (2, 3, 4, 5, 6, 8, 9, 10, 11)',
      divisibilitySubtitle: 'Test pas à pas et règles mathématiques applicables',
      colDivisor: 'Diviseur',
      colDivisibleA: (a) => `Divisible pour ${a}`,
      colDivisibleB: (b) => `Divisible pour ${b}`,
      colReason: 'Règle et justification',
      yesBadge: '✓ Divisible',
      noBadge: '✗ Non divisible',
      solverTitle: 'Résolution de problèmes d’arithmétique',
      solverSubtitle: 'Solutions détaillées pour 4 problèmes types de collège',
      scenarios: {
        paperTab: 'Découpe papier',
        giftTab: 'Partage équitable',
        treeTab: 'Plantation arbres',
        busTab: 'Croisement bus',
        paperText: (a, b, g) => ({
          title: `[Problème de découpe] : On dispose d’un carton rectangulaire de ${a} cm de long sur ${b} cm de large. On souhaite le découper en carrés identiques sans chute.`,
          s1: `① Côté maximal d’un carré = pgcd(${a}, ${b}) = ${g} cm`,
          s2: `② Nombre total de carrés = (${a} ÷ ${g}) × (${b} ÷ ${g}) = ${(a / g) * (b / g)} carrés`,
        }),
        giftText: (a, b, g) => ({
          title: `[Problème de distribution] : Un enseignant souhaite distribuer ${a} stylos et ${b} cahiers équitablement entre des élèves.`,
          s1: `① Nombre maximal d’élèves récompensés = pgcd(${a}, ${b}) = ${g} élèves`,
          s2: `② Chaque élève reçoit : ${a / g} stylo(s) et ${b / g} cahier(s)`,
        }),
        treeText: (a, b, g) => ({
          title: `[Problème de plantation] : Deux allées de ${a} m et ${b} m doivent être plantées d’arbres à intervalles réguliers maximaux.`,
          s1: `① Espacement maximal entre arbres = pgcd(${a}, ${b}) = ${g} mètres`,
          s2: `② Total d’arbres nécessaires = (${a} ÷ ${g} + 1) + (${b} ÷ ${g} + 1) = ${a / g + 1 + b / g + 1} arbres`,
        }),
        busText: (a, b, l) => ({
          title: `[Périodicité des bus] : La ligne 1 part toutes les ${a} min et la ligne 2 toutes les ${b} min. Premier départ à 7h00.`,
          s1: `① Prochain départ simultané = ppcm(${a}, ${b}) = ${l} minutes (${Math.floor(l / 60)}h ${l % 60}m plus tard)`,
          s2: `② Durant cet intervalle : ligne 1 = ${l / a} départs ; ligne 2 = ${l / b} départs`,
        }),
      },
    },
    factoring: {
      title: 'Mise en facteur commun et simplification de fractions',
      subtitle: 'Outil d’aide à la factorisation et à la réduction par le PGCD',
      methodBadge: 'Méthode du facteur commun',
      presetsLabel: 'Exemples types du collège :',
      step1Title: 'Étape 1 : PGCD des coefficients et variables communes',
      step1Desc: 'Extraire le plus grand commun diviseur des coefficients et la plus petite puissance de chaque variable :',
      step2Title: 'Étape 2 : Forme factorisée',
      step2Desc: 'Diviser chaque terme initial par le monôme facteur commun :',
      fractionTitle: 'Simplification de fractions étape par étape',
      fractionSubtitle: 'Division du numérateur et du dénominateur par leur PGCD',
      numLabel: 'Numérateur',
      denLabel: 'Dénominateur',
      gcdFound: (g) => `Diviseur commun PGCD = ${g}`,
      divideStep: 'Division par le PGCD :',
      reducedResult: 'Fraction irréductible finale :',
    },
    directory: {
      all: 'Toutes les paires',
      textbook: 'Classiques des manuels',
      factoring: 'Pré-requis factorisation',
      coprime: 'Nombres premiers entre eux',
      large: 'Grands nombres',
      three: 'Trois nombres',
      clickHint: 'Cliquer pour charger le calcul',
      lcmLabel: 'PPCM',
    },
  },

  pt: {
    euclid: {
      principleTitle: 'Princípio do Algoritmo de Euclides:',
      principleDesc: 'Método formulado por Euclides nos "Elementos" por volta de 300 a.C.',
      colStep: 'Passo',
      colDividend: 'Dividendo (a)',
      colDivisor: 'Divisor (b)',
      colQuotient: 'Quociente (q)',
      colRemainder: 'Resto (r)',
      colEquation: 'Identidade da divisão euclidiana',
      conclusionTitle: 'Conclusão e término do algoritmo',
      conclusionDesc: (n) => `No passo ${n}, o resto atinge 0. O último resto não nulo (divisor atual) é o MDC:`,
      totalSteps: (c) => `Resolvido em ${c} divisões sucessivas`,
      bezoutToggle: 'Identidade de Bézout e Algoritmo de Euclides Estendido',
      bezoutDesc: 'O teorema de Bézout garante que para quaisquer inteiros a e b existem inteiros x e y tais que:',
      bezoutSolution: (x, y) => `Solução particular: x = ${x}, y = ${y}`,
    },
    shortDivision: {
      emptyNote: (nums) => `Os números [${nums}] não possuem fatores primos comuns maiores que 1 (são primos entre si).`,
      emptySub: (nums, lcm) => `Logo, MDC = 1 e MMC = ${nums} = ${lcm}.`,
      badgeTitle: 'Dispositivo Prático das Divisões Sucessivas (Escada)',
      badgeHint: 'Coluna esquerda: Divisores comuns · Linha inferior: Quocientes primos entre si',
      quotientLabel: 'Quocientes',
      gcdCardTitle: 'Máximo Divisor Comum (MDC) = Produto dos divisores da esquerda',
      gcdCardDesc: 'Multiplicar todos os fatores primos extraídos à esquerda:',
      lcmCardTitle: 'Mínimo Múltiplo Comum (MMC) = Produto em formato de "L"',
      lcmCardDesc: 'Multiplicar os divisores da esquerda e os quocientes da linha inferior:',
      stopRuleTitle: 'Critério de parada:',
      stopRuleDesc: 'As divisões terminam quando os quocientes inferiores são primos entre si.',
    },
    primeFactor: {
      canonicalA: 'Fatoração prima do número A',
      canonicalB: 'Fatoração prima do número B',
      vennTitle: 'Diagrama de Venn dos Fatores Primos',
      vennSubtitle: 'Interseção = MDC · União = MMC',
      labelOnlyA: (n) => `Fatores exclusivos de ${n}`,
      labelOnlyB: (n) => `Fatores exclusivos de ${n}`,
      labelIntersection: 'Interseção ∩ (Comuns)',
      none: 'Nenhum',
      gcdRuleTitle: 'Cálculo do MDC (Menor Expoente)',
      gcdRuleDesc: 'Fatores primos comuns com os seus menores expoentes:',
      lcmRuleTitle: 'Cálculo do MMC (Maior Expoente)',
      lcmRuleDesc: 'Todos os fatores primos distintos com os seus maiores expoentes:',
      tableTitle: 'Comparação de expoentes dos fatores primos',
      colPrime: 'Primo (p)',
      colExpA: (n) => `Exp em ${n}`,
      colExpB: (n) => `Exp em ${n}`,
      colMinExp: 'Mín (MDC)',
      colMaxExp: 'Máx (MMC)',
    },
    subtraction: {
      quoteTitle: 'Dos "Nove Capítulos sobre a Arte Matemática" (séc. I a.C.)',
      quoteBody: '"Se ambos os números puderem ser reduzidos à metade, reduza-os. Se não, subtraia o menor do maior repetidamente até alcançar a igualdade."',
      halvingTitle: 'Fase 1: Redução de pares à metade',
      halvingDesc: (a, b, count, factor) => `Os números (${a}, ${b}) são pares. Dividindo por 2 consecutivamente obtém-se 2^${count} = ${factor}:`,
      halvingResult: (count, newA, newB) => `Após ${count} redução(ões): A = ${newA}, B = ${newB}`,
      colRound: 'Rodada',
      colLarger: 'Maior (x)',
      colSmaller: 'Menor (y)',
      colDiff: 'Diferença (x - y)',
      colEquation: 'Equação de subtração',
      conclusionTitle: 'Terminação e igualdade',
      conclusionDesc: (eq, h, g) => `Os valores igualaram-se em ${eq}. Multiplicando por 2^${h} = ${Math.pow(2, h)}, o MDC final é ${g}.`,
    },
    tiling: {
      tabTiling: 'Grade de ladrilhamento',
      tabCuts: 'Cortes geométricos euclidianos',
      dimLabel: (w, h) => `Dimensões do retângulo: ${w} × ${h}`,
      maxSquareTitle: (gcd) => `Maior ladrilho quadrado: ${gcd} × ${gcd}`,
      totalCount: (t, x, y) => `Total de ladrilhos: ${t} (${x} na largura × ${y} na altura)`,
      cutDesc: 'Visualização geométrica do algoritmo de Euclides cortando quadrados máximos:',
      cutStep: (s, sz, c) => `Passo ${s}: Cortar ${c} quadrado(s) de lado ${sz}`,
      scaleNotice: 'Dimensões ajustadas para visualização nítida na tela.',
    },
    factorExplorer: {
      templateTitle: 'Modelo de resolução formal de exercícios (Pronto para copiar)',
      copyBtn: 'Copiar resolução',
      copiedBtn: 'Copiado para a área de transferência!',
      pairsTitle: 'Tabela completa de divisores e pares de fatores',
      pairsSubtitle: (a, b) => `Todos os divisores e pares multiplicativos de ${a} e ${b}`,
      factorsOf: (n) => `Divisores de ${n}`,
      primeLabel: 'Número primo',
      factorCount: (c) => `${c} divisores`,
      maxBadge: ' (Máximo)',
      pairsList: 'Pares de fatores:',
      divisibilityTitle: 'Critérios de divisibilidade práticos (2, 3, 4, 5, 6, 8, 9, 10, 11)',
      divisibilitySubtitle: 'Verificação rápida com justificativa matemática detalhada',
      colDivisor: 'Divisor',
      colDivisibleA: (a) => `Divisível para ${a}`,
      colDivisibleB: (b) => `Divisível para ${b}`,
      colReason: 'Regra e justificativa matemática',
      yesBadge: '✓ Divisível',
      noBadge: '✗ Não divisível',
      solverTitle: 'Solucionador de situações-problema',
      solverSubtitle: 'Resoluções detalhadas para 4 cenários clássicos de olimpíadas',
      scenarios: {
        paperTab: 'Cortar papel',
        giftTab: 'Distribuição justa',
        treeTab: 'Plantio de árvores',
        busTab: 'Partida de ônibus',
        paperText: (a, b, g) => ({
          title: `[Problema de corte de papel]: Uma placa retangular mede ${a} cm de comprimento por ${b} cm de largura. Deseja-se cortá-la em quadrados iguais sem sobras.`,
          s1: `① Lado máximo do quadrado = mdc(${a}, ${b}) = ${g} cm`,
          s2: `② Quantidade total de quadrados = (${a} ÷ ${g}) × (${b} ÷ ${g}) = ${(a / g) * (b / g)} peças`,
        }),
        giftText: (a, b, g) => ({
          title: `[Distribuição de material escolar]: Um professor tem ${a} canetas e ${b} cadernos para distribuir igualmente entre os alunos.`,
          s1: `① Número máximo de alunos premiados = mdc(${a}, ${b}) = ${g} alunos`,
          s2: `② Cada aluno recebe: ${a / g} caneta(s) e ${b / g} caderno(s)`,
        }),
        treeText: (a, b, g) => ({
          title: `[Plantio equidistante]: Duas ruas de comprimentos ${a} m e ${b} m devem ter árvores plantadas em intervalos iguais e máximos.`,
          s1: `① Espaçamento máximo entre árvores = mdc(${a}, ${b}) = ${g} metros`,
          s2: `② Total de mudas necessárias = (${a} ÷ ${g} + 1) + (${b} ÷ ${g} + 1) = ${a / g + 1 + b / g + 1} árvores`,
        }),
        busText: (a, b, l) => ({
          title: `[Horários coincidentes de linhas de ônibus]: A linha 1 sai a cada ${a} min e a linha 2 a cada ${b} min. Partem juntas às 7h00.`,
          s1: `① Próxima partida simultânea = mmc(${a}, ${b}) = ${l} minutos (${Math.floor(l / 60)}h ${l % 60}m após)`,
          s2: `② Nesse intervalo: a linha 1 parte ${l / a} vezes; a linha 2 parte ${l / b} vezes`,
        }),
      },
    },
    factoring: {
      title: 'Fatoração por termo comum e simplificação de frações',
      subtitle: 'Ferramenta auxiliar para fatoração algébrica e cancelamento por MDC',
      methodBadge: 'Fatoração por termo comum em evidência',
      presetsLabel: 'Exemplos clássicos de fixação:',
      step1Title: 'Passo 1: Fator comum dos coeficientes e variáveis',
      step1Desc: 'Encontrar o MDC dos coeficientes numéricos e a menor potência de cada letra comum:',
      step2Title: 'Passo 2: Polinômio fatorado',
      step2Desc: 'Dividir cada termo pelo monômio fator comum colocado em evidência:',
      fractionTitle: 'Simplificador de frações passo a passo',
      fractionSubtitle: 'Dividir numerador e denominador pelo seu máximo divisor comum',
      numLabel: 'Numerador',
      denLabel: 'Denominador',
      gcdFound: (g) => `Divisor comum MDC = ${g}`,
      divideStep: 'Dividir numerador e denominador pelo MDC:',
      reducedResult: 'Fração irredutível final:',
    },
    directory: {
      all: 'Todos os pares',
      textbook: 'Clássicos escolares',
      factoring: 'Coeficientes algébricos',
      coprime: 'Primos entre si (MDC = 1)',
      large: 'Grandes números',
      three: 'Três números',
      clickHint: 'Clique para carregar a resolução',
      lcmLabel: 'MMC',
    },
  },

  zh: {
    euclid: {
      principleTitle: '辗转相除法原理：',
      principleDesc: '两千多年前欧几里得在《几何原本》中提出的经典算法',
      colStep: '步骤',
      colDividend: '被除数 (a)',
      colDivisor: '除数 (b)',
      colQuotient: '商 (q)',
      colRemainder: '余数 (r)',
      colEquation: '带余除法恒等式',
      conclusionTitle: '算法结论判定',
      conclusionDesc: (n) => `当步骤 ${n} 中余数首次变为 0 时，此时的除数就是两数的最大公约数：`,
      totalSteps: (c) => `总共耗时 ${c} 次带余除法`,
      bezoutToggle: '竞赛拓展：裴蜀定理与扩展欧几里得 (Bézout\'s identity)',
      bezoutDesc: '裴蜀定理指出：对于任意整数 a, b，一定存在整数解 x, y 满足线性丢番图方程：',
      bezoutSolution: (x, y) => `特解结果：x = ${x}，y = ${y}`,
    },
    shortDivision: {
      emptyNote: (nums) => `数字 [${nums}] 没有大于 1 的共同素因数（互质或已无法继续短除）。`,
      emptySub: (nums, lcm) => `因此最大公约数 gcd = 1，最小公倍数 lcm = ${nums} = ${lcm}。`,
      badgeTitle: '小学标准短除法梯形图解 (Ladder Diagram)',
      badgeHint: '左侧为公因数 · 底部为互质商',
      quotientLabel: '商(互质)',
      gcdCardTitle: '最大公约数 (GCD) = 左侧所有除数相乘',
      gcdCardDesc: '仅将每一步短除提取出的公有质因数（左侧竖列）相乘：',
      lcmCardTitle: '最小公倍数 (LCM) = “L”型全部数字相乘',
      lcmCardDesc: '短除法口诀：“左侧公因数 × 底部互质商”，呈英文“L”型相乘：',
      stopRuleTitle: '短除法终止原则：',
      stopRuleDesc: '当底部的商两两互质（即除了 1 之外没有共同的因数）时，短除结束。这是小学奥数与初中代数最推荐的速算心算技法。',
    },
    primeFactor: {
      canonicalA: '数字 A 的标准分解式',
      canonicalB: '数字 B 的标准分解式',
      vennTitle: '质因数韦恩图 (Venn Diagram) 集合分解',
      vennSubtitle: '交集为 GCD · 并集为 LCM',
      labelOnlyA: (n) => `${n} 专属因数`,
      labelOnlyB: (n) => `${n} 专属因数`,
      labelIntersection: '交集 ∩ (公有因数)',
      none: '无',
      gcdRuleTitle: '质因数分解求最大公约数 (取最小指数)',
      gcdRuleDesc: '所有公有质因数的最低次方相乘：',
      lcmRuleTitle: '质因数分解求最小公倍数 (取最高指数)',
      lcmRuleDesc: '所有出现过的质因数的最高次方相乘：',
      tableTitle: '各质因子指数对照表 (取极值定公约与公倍)',
      colPrime: '质因子 (p)',
      colExpA: (n) => `${n} 中指数`,
      colExpB: (n) => `${n} 中指数`,
      colMinExp: '最小指数 (GCD)',
      colMaxExp: '最高指数 (LCM)',
    },
    subtraction: {
      quoteTitle: '出自西汉《九章算术》· 方田章',
      quoteBody: '“可半者半之，不可半者，副置分母、子之数，以少减多，更相减损，求其等也。以等数约之。”',
      halvingTitle: '第一阶段：“可半者半之” (偶数折半)',
      halvingDesc: (a, b, count, factor) => `原数 (${a}, ${b}) 均为偶数，先同时除以 2 提取出公因数 2^${count} = ${factor}，折半后变为奇偶混合数：`,
      halvingResult: (count, newA, newB) => `折半 ${count} 次后新基数：A = ${newA}, B = ${newB}`,
      colRound: '减法轮次',
      colLarger: '较大数',
      colSmaller: '较小数',
      colDiff: '减损差 (大 - 小)',
      colEquation: '减损算式',
      conclusionTitle: '终止条件：求其等也',
      conclusionDesc: (eq, h, g) => `减损差与较小数相等，等数为 ${eq}。结合前期偶数折半因数 2^${h} = ${Math.pow(2, h)}，得到最终最大公因数 gcd = ${g}。`,
    },
    tiling: {
      tabTiling: '网格铺砖视角',
      tabCuts: '欧氏矩形切分',
      dimLabel: (w, h) => `长方形规格：${w} × ${h}`,
      maxSquareTitle: (gcd) => `最大正方形地砖边长：${gcd} × ${gcd}`,
      totalCount: (t, x, y) => `所需地砖总块数：${t} 块 (横向铺 ${x} 块 × 纵向铺 ${y} 块)`,
      cutDesc: '欧几里得辗转相除法的几何图形直观：每次从长方形中切出最大的正方形，最后正好铺满的正方形边长即为最大公因数。',
      cutStep: (s, sz, c) => `第 ${s} 轮切分：切出 ${c} 个边长为 ${sz} 的正方形`,
      scaleNotice: '图示按比例动态缩放以适应屏幕展示。',
    },
    factorExplorer: {
      templateTitle: '中小学作业标准答题规范范本 (可直接复制作答)',
      copyBtn: '一键复制标准答题',
      copiedBtn: '已复制范文',
      pairsTitle: '因数全集与乘积因数对速查',
      pairsSubtitle: (a, b) => `${a} 与 ${b} 的全部因数与因数对对比`,
      factorsOf: (n) => `${n} 的因数`,
      primeLabel: '质数 (素数)',
      factorCount: (c) => `共 ${c} 个因数`,
      maxBadge: ' (最大)',
      pairsList: '因数对列表：',
      divisibilityTitle: '中小学数论重点：常见整除特征诊断 (2, 3, 4, 5, 6, 8, 9, 10, 11)',
      divisibilitySubtitle: '数字整除性与判定理由全解析',
      colDivisor: '除数',
      colDivisibleA: (a) => `${a} 是否整除`,
      colDivisibleB: (b) => `${b} 是否整除`,
      colReason: '判定原理与速查法则',
      yesBadge: '✓ 能整除',
      noBadge: '✗ 否',
      solverTitle: '小学奥数应用题求解器',
      solverSubtitle: '4 大经典真题情境一键反推',
      scenarios: {
        paperTab: '裁纸铺砖',
        giftTab: '分发文具',
        treeTab: '等距植树',
        busTab: '公交相遇',
        paperText: (a, b, g) => ({
          title: `【裁纸/铺砖问题】：有一张长 ${a} 厘米、宽 ${b} 厘米的长方形纸板，要裁成同样大小的正方形且没有剩余。`,
          s1: `① 正方形最大边长 = gcd(${a}, ${b}) = ${g} 厘米`,
          s2: `② 可裁总张数 = (${a} ÷ ${g}) × (${b} ÷ ${g}) = ${(a / g) * (b / g)} 张`,
        }),
        giftText: (a, b, g) => ({
          title: `【物品均分问题】：老师有 ${a} 支钢笔和 ${b} 本笔记本，全部平均奖给优秀学生且刚好分完。`,
          s1: `① 最多可以奖励人数 = gcd(${a}, ${b}) = ${g} 人`,
          s2: `② 每名学生分得：钢笔 ${a} ÷ ${g} = ${a / g} 支，笔记本 ${b} ÷ ${g} = ${b / g} 本`,
        }),
        treeText: (a, b, g) => ({
          title: `【等距植树问题】：两条道路长度分别为 ${a} 米与 ${b} 米，要在两旁以相同的最大整数间距植树（端点必须植树）。`,
          s1: `① 树木最大相邻间距 = gcd(${a}, ${b}) = ${g} 米`,
          s2: `② 两路段各需树苗 = (${a} ÷ ${g} + 1) + (${b} ÷ ${g} + 1) = ${a / g + 1 + b / g + 1} 棵`,
        }),
        busText: (a, b, l) => ({
          title: `【周期相遇问题】：1路车每隔 ${a} 分钟发一趟，2路车每隔 ${b} 分钟发一趟。早晨 7:00 同时发车。`,
          s1: `① 下次再次同时发车的时间间隔 = lcm(${a}, ${b}) = ${l} 分钟 (${Math.floor(l / 60)}小时${l % 60}分钟后)`,
          s2: `② 期间1路车共发 = ${l} ÷ ${a} = ${l / a} 次；2路车发 = ${l} ÷ ${b} = ${l / b} 次`,
        }),
      },
    },
    factoring: {
      title: '因式分解提公因式与分数约分辅助器',
      subtitle: '初中代数因式分解前置核心：系数最大公约数与字母最低次幂提取',
      methodBadge: '初一代数基础 · 提公因式法',
      presetsLabel: '课本因式分解典型例题：',
      step1Title: '第一步：提取公因式 (系数 GCD 与公共字母最低指数)',
      step1Desc: '分别求各项系数的绝对值最大公约数，并提取每个公共变量的最低次方：',
      step2Title: '第二步：各项除以公因式，得出因式分解结果',
      step2Desc: '原多项式写成“公因式 × (商多项式)”的乘积形式：',
      fractionTitle: '分数约分化简步骤演示 (因式分解前置)',
      fractionSubtitle: '利用分子与分母的最大公因数同步约分，秒得最简真分数/假分数',
      numLabel: '分子',
      denLabel: '分母',
      gcdFound: (g) => `分子分母公因数 GCD = ${g}`,
      divideStep: '分子分母同时除以公因数：',
      reducedResult: '最终最简分数结果：',
    },
    directory: {
      all: '全部高频数对',
      textbook: '课本经典例题',
      factoring: '因式分解系数',
      coprime: '互质数专区 (GCD=1)',
      large: '大数相除 (欧几里得)',
      three: '三数综合运算',
      clickHint: '点击秒看详细步骤与图解',
      lcmLabel: '最小公倍数',
    },
  },
};
