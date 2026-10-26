/**
 * Comprehensive Math Engine for GCD, LCM, Euclidean Algorithm,
 * Short Division (短除法), Prime Factorization, and Successive Subtractions.
 */

export interface PrimeFactor {
  prime: number;
  exponent: number;
}

export interface EuclideanStep {
  step: number;
  a: bigint;
  b: bigint;
  quotient: bigint;
  remainder: bigint;
  equation: string;
}

export interface ExtendedEuclideanResult {
  gcd: bigint;
  x: bigint;
  y: bigint;
  steps: string[];
}

export interface ShortDivisionRow {
  divisor: number;
  quotients: number[];
  dividedAll?: boolean;
  dividedIndices?: number[];
}

export interface ShortDivisionResult {
  initialNumbers: number[];
  steps: ShortDivisionRow[];
  finalQuotients: number[];
  gcdDivisors: number[];
  gcd: number;
  lcmDivisors: number[];
  lcmFinal: number[];
  lcm: number;
}

export interface SubtractionStep {
  step: number;
  larger: number;
  smaller: number;
  difference: number;
}

export interface SubtractionResult {
  initialA: number;
  initialB: number;
  halvingCount: number;
  steps: SubtractionStep[];
  baseGcd: number;
  finalGcd: number;
}

export interface FactoringTerm {
  coeff: number;
  xPower: number;
  yPower: number;
}

export interface FactoringResult {
  gcdCoeff: number;
  gcdXPower: number;
  gcdYPower: number;
  originalExpr: string;
  factoredExpr: string;
  quotients: { coeff: number; xPower: number; yPower: number }[];
}

// Helper: Greatest Common Divisor for BigInt
export function bigIntGcd(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

// Helper: Least Common Multiple for BigInt
export function bigIntLcm(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n;
  const g = bigIntGcd(a, b);
  if (g === 0n) return 0n;
  const x = a < 0n ? -a : a;
  const y = b < 0n ? -b : b;
  return (x / g) * y;
}

// Multi-number GCD
export function multiGcd(numbers: bigint[]): bigint {
  if (numbers.length === 0) return 0n;
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = bigIntGcd(result, numbers[i]);
  }
  return result;
}

// Multi-number LCM
export function multiLcm(numbers: bigint[]): bigint {
  if (numbers.length === 0) return 0n;
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = bigIntLcm(result, numbers[i]);
  }
  return result;
}

// Euclidean Algorithm Steps
export function getEuclideanSteps(a: bigint, b: bigint): EuclideanStep[] {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;

  if (y > x) {
    const temp = x;
    x = y;
    y = temp;
  }

  const steps: EuclideanStep[] = [];
  if (y === 0n) {
    steps.push({
      step: 1,
      a: x,
      b: 0n,
      quotient: 0n,
      remainder: 0n,
      equation: `${x} = 0 · 0 + ${x}`,
    });
    return steps;
  }

  let stepCount = 1;
  while (y !== 0n) {
    const q = x / y;
    const r = x % y;
    steps.push({
      step: stepCount++,
      a: x,
      b: y,
      quotient: q,
      remainder: r,
      equation: `${x} = ${y} × ${q} + ${r}`,
    });
    x = y;
    y = r;
  }

  return steps;
}

export interface MultiEuclideanStage {
  stageIndex: number;
  numA: bigint;
  numB: bigint;
  steps: EuclideanStep[];
  gcd: bigint;
  description: string;
}

export function getMultiEuclideanSteps(numbers: bigint[]): MultiEuclideanStage[] {
  const valid = numbers.map(n => (n < 0n ? -n : n)).filter(n => n > 0n);
  if (valid.length < 2) return [];

  const stages: MultiEuclideanStage[] = [];
  let currentGcd = valid[0];

  for (let i = 1; i < valid.length; i++) {
    const nextNum = valid[i];
    const steps = getEuclideanSteps(currentGcd, nextNum);
    const stageGcd = bigIntGcd(currentGcd, nextNum);
    stages.push({
      stageIndex: i,
      numA: currentGcd,
      numB: nextNum,
      steps,
      gcd: stageGcd,
      description: `Stage ${i}: gcd(${currentGcd}, ${nextNum}) = ${stageGcd}`,
    });
    currentGcd = stageGcd;
  }

  return stages;
}

// Extended Euclidean Algorithm (Bezout's Identity: ax + by = gcd(a, b))
export function getExtendedEuclidean(a: bigint, b: bigint): ExtendedEuclideanResult {
  let old_r = a, r = b;
  let old_s = 1n, s = 0n;
  let old_t = 0n, t = 1n;

  const steps: string[] = [];

  while (r !== 0n) {
    const quotient = old_r / r;
    const temp_r = r;
    r = old_r - quotient * r;
    old_r = temp_r;

    const temp_s = s;
    s = old_s - quotient * s;
    old_s = temp_s;

    const temp_t = t;
    t = old_t - quotient * t;
    old_t = temp_t;

    steps.push(`${old_r} = (${old_s}) × ${a} + (${old_t}) × ${b}`);
  }

  return {
    gcd: old_r,
    x: old_s,
    y: old_t,
    steps,
  };
}

// Prime Factorization
export function getPrimeFactorization(n: number): PrimeFactor[] {
  if (n <= 1) return [];
  const factors: PrimeFactor[] = [];
  let remaining = Math.floor(Math.abs(n));

  // Factor out 2
  let count2 = 0;
  while (remaining % 2 === 0) {
    count2++;
    remaining /= 2;
  }
  if (count2 > 0) {
    factors.push({ prime: 2, exponent: count2 });
  }

  // Factor out odd numbers up to sqrt
  let d = 3;
  while (d * d <= remaining) {
    let count = 0;
    while (remaining % d === 0) {
      count++;
      remaining /= d;
    }
    if (count > 0) {
      factors.push({ prime: d, exponent: count });
    }
    d += 2;
  }

  if (remaining > 1) {
    factors.push({ prime: remaining, exponent: 1 });
  }

  return factors;
}

// Format Prime Factorization to string like "2³ × 3²"
export function formatPrimeFactors(factors: PrimeFactor[]): string {
  if (factors.length === 0) return '1';
  return factors
    .map((f) => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`))
    .join(' × ');
}

// Helper: Fast prime check
function isPrimeNumber(n: number): boolean {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// Helper: Find the smallest prime divisor dividing all numbers
function findCommonPrimeDivisorAll(nums: number[]): number | null {
  const minVal = Math.min(...nums);
  if (minVal <= 1) return null;

  if (nums.every((n) => n % 2 === 0)) return 2;

  for (let d = 3; d <= minVal; d += 2) {
    if (nums.every((n) => n % d === 0)) {
      if (isPrimeNumber(d)) return d;
    }
  }

  return null;
}

// Helper: Find the smallest prime divisor dividing at least 2 numbers (for LCM coprime reduction)
function findCommonPrimeDivisorAtLeastTwo(nums: number[]): number | null {
  const maxVal = Math.max(...nums);
  if (maxVal <= 1) return null;

  if (nums.filter((n) => n % 2 === 0).length >= 2) return 2;

  for (let d = 3; d <= maxVal; d += 2) {
    if (nums.filter((n) => n % d === 0).length >= 2) {
      if (isPrimeNumber(d)) return d;
    }
  }

  return null;
}

// Short Division for 2 or more numbers (小学奥数阶梯法/短除法)
export function getShortDivision(numbers: number[]): ShortDivisionResult {
  const current = numbers.map((n) => Math.max(1, Math.floor(Math.abs(n))));
  const steps: ShortDivisionRow[] = [];
  const gcdDivisors: number[] = [];
  const lcmOnlyDivisors: number[] = [];

  let iterations = 0;
  // Phase 1: Divide all numbers by common prime factors (GCD divisors)
  while (iterations < 100) {
    iterations++;
    const p = findCommonPrimeDivisorAll(current);
    if (!p) break;

    steps.push({
      divisor: p,
      quotients: [...current],
      dividedAll: true,
      dividedIndices: current.map((_, idx) => idx),
    });
    gcdDivisors.push(p);
    for (let i = 0; i < current.length; i++) {
      current[i] /= p;
    }
  }

  // Phase 2: If 3 or more numbers, continue dividing if any prime divides >= 2 numbers
  // This satisfies: "Stop dividing when the quotients on the bottom are pairwise coprime"
  if (numbers.length >= 3) {
    while (iterations < 100) {
      iterations++;
      const p = findCommonPrimeDivisorAtLeastTwo(current);
      if (!p) break;

      const dividedIndices: number[] = [];
      const rowQuotients = [...current];
      for (let i = 0; i < current.length; i++) {
        if (current[i] % p === 0) {
          dividedIndices.push(i);
          current[i] /= p;
        }
      }

      steps.push({
        divisor: p,
        quotients: rowQuotients,
        dividedAll: dividedIndices.length === current.length,
        dividedIndices,
      });
      lcmOnlyDivisors.push(p);
    }
  }

  const gcd = gcdDivisors.length > 0 ? gcdDivisors.reduce((acc, v) => acc * v, 1) : 1;
  const allDivisors = [...gcdDivisors, ...lcmOnlyDivisors];
  const allDivisorsProduct = allDivisors.length > 0 ? allDivisors.reduce((acc, v) => acc * v, 1) : 1;
  const finalQuotientsProduct = current.reduce((acc, v) => acc * v, 1);
  const lcm = allDivisorsProduct * finalQuotientsProduct;

  return {
    initialNumbers: [...numbers],
    steps,
    finalQuotients: current,
    gcdDivisors,
    gcd,
    lcmDivisors: allDivisors,
    lcmFinal: current,
    lcm,
  };
}

// Method of Successive Subtractions (更相减损法 / 《九章算术》)
export function getSuccessiveSubtractions(a: number, b: number): SubtractionResult {
  let x = Math.max(1, Math.abs(a));
  let y = Math.max(1, Math.abs(b));
  let halvingCount = 0;

  // Step 1: Divide by 2 if both are even
  while (x % 2 === 0 && y % 2 === 0) {
    x /= 2;
    y /= 2;
    halvingCount++;
  }

  const steps: SubtractionStep[] = [];
  let step = 1;

  while (x !== y && step < 100) {
    const larger = Math.max(x, y);
    const smaller = Math.min(x, y);
    const diff = larger - smaller;
    steps.push({
      step: step++,
      larger,
      smaller,
      difference: diff,
    });
    x = smaller;
    y = diff;
  }

  const baseGcd = x;
  const finalGcd = baseGcd * Math.pow(2, halvingCount);

  return {
    initialA: a,
    initialB: b,
    halvingCount,
    steps,
    baseGcd,
    finalGcd,
  };
}

// Factoring out common monomial (初中提取公因式)
export function extractCommonMonomial(terms: FactoringTerm[]): FactoringResult {
  if (terms.length === 0) {
    return {
      gcdCoeff: 1,
      gcdXPower: 0,
      gcdYPower: 0,
      originalExpr: '0',
      factoredExpr: '0',
      quotients: [],
    };
  }

  const coeffs = terms.map((t) => BigInt(Math.abs(t.coeff)));
  const gcdC = Number(multiGcd(coeffs));
  const minX = Math.min(...terms.map((t) => t.xPower));
  const minY = Math.min(...terms.map((t) => t.yPower));

  const formatTerm = (c: number, xP: number, yP: number, isLeading = false) => {
    let s = '';
    if (!isLeading && c >= 0) s += '+ ';
    if (c < 0) s += isLeading ? '-' : '- ';
    const absC = Math.abs(c);
    
    let vars = '';
    if (xP > 0) vars += xP === 1 ? 'x' : `x^${xP}`;
    if (yP > 0) vars += yP === 1 ? 'y' : `y^${yP}`;

    if (absC === 1 && vars !== '') {
      s += vars;
    } else {
      s += `${absC}${vars}`;
    }
    return s;
  };

  const originalExpr = terms.map((t, idx) => formatTerm(t.coeff, t.xPower, t.yPower, idx === 0)).join(' ');

  const quotients = terms.map((t) => ({
    coeff: t.coeff / gcdC,
    xPower: t.xPower - minX,
    yPower: t.yPower - minY,
  }));

  const innerExpr = quotients.map((q, idx) => formatTerm(q.coeff, q.xPower, q.yPower, idx === 0)).join(' ');

  let gcdOuter = '';
  if (gcdC !== 1 || (minX === 0 && minY === 0)) gcdOuter += `${gcdC}`;
  if (minX > 0) gcdOuter += minX === 1 ? 'x' : `x^${minX}`;
  if (minY > 0) gcdOuter += minY === 1 ? 'y' : `y^${minY}`;
  if (!gcdOuter) gcdOuter = '1';

  const factoredExpr = `${gcdOuter}(${innerExpr})`;

  return {
    gcdCoeff: gcdC,
    gcdXPower: minX,
    gcdYPower: minY,
    originalExpr,
    factoredExpr,
    quotients,
  };
}

// Find all positive divisors of a number
export function getDivisors(n: number): number[] {
  if (n <= 0) return [];
  const divisors: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (i * i !== n) {
        divisors.push(n / i);
      }
    }
  }
  return divisors.sort((a, b) => a - b);
}

// Factor pairs: e.g. for 48: [(1, 48), (2, 24), (3, 16), (4, 12), (6, 8)]
export function getFactorPairs(n: number): [number, number][] {
  if (n <= 0) return [];
  const pairs: [number, number][] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      pairs.push([i, n / i]);
    }
  }
  return pairs;
}

// Check if a number is prime
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// Divisibility Rules Analysis (2, 3, 4, 5, 6, 8, 9, 10, 11) for 5 languages
export interface DivisibilityRuleResult {
  divisor: number;
  divisible: boolean;
  ruleName: string;
  reason: string;
}

export function getDivisibilityRules(
  n: number,
  lang: 'en' | 'es' | 'fr' | 'pt' | 'zh' = 'en'
): DivisibilityRuleResult[] {
  const absN = Math.abs(n);
  const digits = absN.toString().split('').map(Number);
  const sumDigits = digits.reduce((acc, d) => acc + d, 0);
  const lastDigit = digits[digits.length - 1];
  const lastTwo = absN % 100;
  const lastThree = absN % 1000;

  // Alternate sum for 11
  let altSum = 0;
  for (let i = 0; i < digits.length; i++) {
    altSum += i % 2 === 0 ? digits[digits.length - 1 - i] : -digits[digits.length - 1 - i];
  }

  const d2 = absN % 2 === 0;
  const d3 = sumDigits % 3 === 0;
  const d4 = lastTwo % 4 === 0;
  const d5 = lastDigit === 0 || lastDigit === 5;
  const d6 = d2 && d3;
  const d8 = lastThree % 8 === 0;
  const d9 = sumDigits % 9 === 0;
  const d10 = lastDigit === 0;
  const d11 = altSum % 11 === 0;

  if (lang === 'zh') {
    return [
      { divisor: 2, divisible: d2, ruleName: '被 2 整除', reason: `末位数字为 ${lastDigit}（${d2 ? '是偶数' : '是奇数'}）` },
      { divisor: 3, divisible: d3, ruleName: '被 3 整除', reason: `各位数字之和为 ${sumDigits}（${d3 ? '能被3整除' : '不能被3整除'}）` },
      { divisor: 4, divisible: d4, ruleName: '被 4 整除', reason: `末两位数字为 ${lastTwo}（${d4 ? '能被4整除' : '不能被4整除'}）` },
      { divisor: 5, divisible: d5, ruleName: '被 5 整除', reason: `末位数字为 ${lastDigit}（${d5 ? '末位是0或5' : '末位非0也非5'}）` },
      { divisor: 6, divisible: d6, ruleName: '被 6 整除', reason: `需同时被2和3整除（${d6 ? '满足条件' : '不满足'}）` },
      { divisor: 8, divisible: d8, ruleName: '被 8 整除', reason: `末三位数字为 ${lastThree}（${d8 ? '能被8整除' : '不能被8整除'}）` },
      { divisor: 9, divisible: d9, ruleName: '被 9 整除', reason: `各位数字之和为 ${sumDigits}（${d9 ? '能被9整除' : '不能被9整除'}）` },
      { divisor: 10, divisible: d10, ruleName: '被 10 整除', reason: `末位数字为 ${lastDigit}（${d10 ? '末位是0' : '末位不是0'}）` },
      { divisor: 11, divisible: d11, ruleName: '被 11 整除', reason: `奇偶位交错和为 ${altSum}（${d11 ? '能被11整除' : '不能被11整除'}）` },
    ];
  }

  if (lang === 'es') {
    return [
      { divisor: 2, divisible: d2, ruleName: 'Divisible por 2', reason: `La última cifra es ${lastDigit} (${d2 ? 'es par' : 'es impar'})` },
      { divisor: 3, divisible: d3, ruleName: 'Divisible por 3', reason: `La suma de cifras es ${sumDigits} (${d3 ? 'múltiplo de 3' : 'no divisible'})` },
      { divisor: 4, divisible: d4, ruleName: 'Divisible por 4', reason: `Las 2 últimas cifras son ${lastTwo} (${d4 ? 'divisible por 4' : 'no divisible'})` },
      { divisor: 5, divisible: d5, ruleName: 'Divisible por 5', reason: `La última cifra es ${lastDigit} (${d5 ? 'termina en 0 o 5' : 'no termina en 0 o 5'})` },
      { divisor: 6, divisible: d6, ruleName: 'Divisible por 6', reason: `Debe ser divisible por 2 y por 3 (${d6 ? 'cumple ambas' : 'falla'})` },
      { divisor: 8, divisible: d8, ruleName: 'Divisible por 8', reason: `Las 3 últimas cifras son ${lastThree} (${d8 ? 'divisible por 8' : 'no divisible'})` },
      { divisor: 9, divisible: d9, ruleName: 'Divisible por 9', reason: `La suma de cifras es ${sumDigits} (${d9 ? 'múltiplo de 9' : 'no divisible'})` },
      { divisor: 10, divisible: d10, ruleName: 'Divisible por 10', reason: `La última cifra es ${lastDigit} (${d10 ? 'termina en 0' : 'no termina en 0'})` },
      { divisor: 11, divisible: d11, ruleName: 'Divisible por 11', reason: `Suma alternada es ${altSum} (${d11 ? 'múltiplo de 11' : 'no divisible'})` },
    ];
  }

  if (lang === 'fr') {
    return [
      { divisor: 2, divisible: d2, ruleName: 'Divisible par 2', reason: `Le dernier chiffre est ${lastDigit} (${d2 ? 'est pair' : 'est impair'})` },
      { divisor: 3, divisible: d3, ruleName: 'Divisible par 3', reason: `La somme des chiffres est ${sumDigits} (${d3 ? 'multiple de 3' : 'non divisible'})` },
      { divisor: 4, divisible: d4, ruleName: 'Divisible par 4', reason: `Les deux derniers chiffres sont ${lastTwo} (${d4 ? 'divisible par 4' : 'non divisible'})` },
      { divisor: 5, divisible: d5, ruleName: 'Divisible par 5', reason: `Le dernier chiffre est ${lastDigit} (${d5 ? 'se termine par 0 ou 5' : 'ne se termine pas par 0/5'})` },
      { divisor: 6, divisible: d6, ruleName: 'Divisible par 6', reason: `Doit être divisible par 2 et 3 (${d6 ? 'vérifié' : 'non vérifié'})` },
      { divisor: 8, divisible: d8, ruleName: 'Divisible par 8', reason: `Les 3 derniers chiffres sont ${lastThree} (${d8 ? 'divisible par 8' : 'non divisible'})` },
      { divisor: 9, divisible: d9, ruleName: 'Divisible par 9', reason: `La somme des chiffres est ${sumDigits} (${d9 ? 'multiple de 9' : 'non divisible'})` },
      { divisor: 10, divisible: d10, ruleName: 'Divisible par 10', reason: `Le dernier chiffre est ${lastDigit} (${d10 ? 'finit par 0' : 'ne finit pas par 0'})` },
      { divisor: 11, divisible: d11, ruleName: 'Divisible par 11', reason: `Différence alternée est ${altSum} (${d11 ? 'multiple de 11' : 'non divisible'})` },
    ];
  }

  if (lang === 'pt') {
    return [
      { divisor: 2, divisible: d2, ruleName: 'Divisível por 2', reason: `O último algarismo é ${lastDigit} (${d2 ? 'é par' : 'é ímpar'})` },
      { divisor: 3, divisible: d3, ruleName: 'Divisível por 3', reason: `A soma dos algarismos é ${sumDigits} (${d3 ? 'múltiplo de 3' : 'não divisível'})` },
      { divisor: 4, divisible: d4, ruleName: 'Divisível por 4', reason: `Os 2 últimos algarismos são ${lastTwo} (${d4 ? 'divisível por 4' : 'não divisível'})` },
      { divisor: 5, divisible: d5, ruleName: 'Divisível por 5', reason: `O último algarismo é ${lastDigit} (${d5 ? 'termina em 0 ou 5' : 'não termina em 0/5'})` },
      { divisor: 6, divisible: d6, ruleName: 'Divisível por 6', reason: `Deve ser divisível por 2 e por 3 (${d6 ? 'cumpre ambas' : 'não cumpre'})` },
      { divisor: 8, divisible: d8, ruleName: 'Divisível por 8', reason: `Os 3 últimos algarismos são ${lastThree} (${d8 ? 'divisível por 8' : 'não divisível'})` },
      { divisor: 9, divisible: d9, ruleName: 'Divisível por 9', reason: `A soma dos algarismos é ${sumDigits} (${d9 ? 'múltiplo de 9' : 'não divisível'})` },
      { divisor: 10, divisible: d10, ruleName: 'Divisível por 10', reason: `O último algarismo é ${lastDigit} (${d10 ? 'termina em 0' : 'não termina em 0'})` },
      { divisor: 11, divisible: d11, ruleName: 'Divisível por 11', reason: `Soma alternada é ${altSum} (${d11 ? 'múltiplo de 11' : 'não divisível'})` },
    ];
  }

  // Default English ('en')
  return [
    { divisor: 2, divisible: d2, ruleName: 'Divisible by 2', reason: `Last digit is ${lastDigit} (${d2 ? 'even number' : 'odd number'})` },
    { divisor: 3, divisible: d3, ruleName: 'Divisible by 3', reason: `Sum of digits is ${sumDigits} (${d3 ? 'divisible by 3' : 'not divisible'})` },
    { divisor: 4, divisible: d4, ruleName: 'Divisible by 4', reason: `Last two digits are ${lastTwo} (${d4 ? 'divisible by 4' : 'not divisible'})` },
    { divisor: 5, divisible: d5, ruleName: 'Divisible by 5', reason: `Last digit is ${lastDigit} (${d5 ? 'ends in 0 or 5' : 'does not end in 0/5'})` },
    { divisor: 6, divisible: d6, ruleName: 'Divisible by 6', reason: `Must be divisible by both 2 and 3 (${d6 ? 'passed' : 'failed'})` },
    { divisor: 8, divisible: d8, ruleName: 'Divisible by 8', reason: `Last three digits are ${lastThree} (${d8 ? 'divisible by 8' : 'not divisible'})` },
    { divisor: 9, divisible: d9, ruleName: 'Divisible by 9', reason: `Sum of digits is ${sumDigits} (${d9 ? 'divisible by 9' : 'not divisible'})` },
    { divisor: 10, divisible: d10, ruleName: 'Divisible by 10', reason: `Last digit is ${lastDigit} (${d10 ? 'ends in 0' : 'does not end in 0'})` },
    { divisor: 11, divisible: d11, ruleName: 'Divisible by 11', reason: `Alternating digit sum is ${altSum} (${d11 ? 'divisible by 11' : 'not divisible'})` },
  ];
}

// Standard Homework Writeup Text Generator for 5 languages
export function generateHomeworkText(
  a: number,
  b: number,
  gcdVal: number,
  lcmVal: number,
  lang: 'en' | 'es' | 'fr' | 'pt' | 'zh'
): string {
  if (lang === 'zh') {
    return `【规范解题过程】
题目：求正整数 ${a} 与 ${b} 的最大公因数（GCD）与最小公倍数（LCM）。

解：
一、质因数分解：
  ${a} 的因数分解为：${formatPrimeFactors(getPrimeFactorization(a))}
  ${b} 的因数分解为：${formatPrimeFactors(getPrimeFactorization(b))}

二、求最大公因数：
  选取两数公有的全部质因数乘积：
  gcd(${a}, ${b}) = ${gcdVal}

三、求最小公倍数：
  根据双数乘积定律公式 a × b = gcd(a, b) × lcm(a, b)：
  lcm(${a}, ${b}) = (${a} × ${b}) ÷ ${gcdVal} = ${lcmVal}

答：${a} 和 ${b} 的最大公约数是 ${gcdVal}，最小公倍数是 ${lcmVal}。`;
  } else if (lang === 'es') {
    return `[Solución Formal de la Tarea]
Problema: Hallar el Máximo Común Divisor (MCD) y el Mínimo Común Múltiplo (MCM) de ${a} y ${b}.

Solución:
1. Descomposición en factores primos:
   ${a} = ${formatPrimeFactors(getPrimeFactorization(a))}
   ${b} = ${formatPrimeFactors(getPrimeFactorization(b))}

2. Cálculo del Máximo Común Divisor (MCD):
   Multiplicar los factores primos comunes con su menor exponente:
   MCD(${a}, ${b}) = ${gcdVal}

3. Cálculo del Mínimo Común Múltiplo (MCM):
   Aplicando la propiedad a × b = MCD(a, b) × MCM(a, b):
   MCM(${a}, ${b}) = (${a} × ${b}) ÷ ${gcdVal} = ${lcmVal}

Respuesta: El MCD de ${a} y ${b} es ${gcdVal}, y el MCM es ${lcmVal}.`;
  } else if (lang === 'fr') {
    return `[Solution Rédigée Conforme]
Problème : Déterminer le Plus Grand Commun Diviseur (PGCD) et le PPCM de ${a} et ${b}.

Résolution :
1. Décomposition en facteurs premiers :
   ${a} = ${formatPrimeFactors(getPrimeFactorization(a))}
   ${b} = ${formatPrimeFactors(getPrimeFactorization(b))}

2. Calcul du PGCD :
   Produit des facteurs premiers communs affectés du plus petit exposant :
   PGCD(${a}, ${b}) = ${gcdVal}

3. Calcul du PPCM :
   En utilisant la formule a × b = PGCD(a, b) × PPCM(a, b) :
   PPCM(${a}, ${b}) = (${a} × ${b}) ÷ ${gcdVal} = ${lcmVal}

Conclusion : Le PGCD de ${a} et ${b} est ${gcdVal}, et le PPCM est ${lcmVal}.`;
  } else if (lang === 'pt') {
    return `[Resolução Formal de Exercício]
Problema: Encontrar o Máximo Divisor Comum (MDC) e o Mínimo Múltiplo Comum (MMC) de ${a} e ${b}.

Resolução:
1. Decomposição em fatores primos:
   ${a} = ${formatPrimeFactors(getPrimeFactorization(a))}
   ${b} = ${formatPrimeFactors(getPrimeFactorization(b))}

2. Determinação do MDC:
   Multiplicar todos os fatores primos comuns elevados ao menor expoente:
   MDC(${a}, ${b}) = ${gcdVal}

3. Determinação do MMC:
   Pela relação fundamental a × b = MDC(a, b) × MMC(a, b):
   MMC(${a}, ${b}) = (${a} × ${b}) ÷ ${gcdVal} = ${lcmVal}

Resposta: O MDC de ${a} e ${b} é ${gcdVal}, e o MMC é ${lcmVal}.`;
  } else {
    return `[Standard Homework Solution]
Problem: Find the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of ${a} and ${b}.

Solution:
1. Prime Factorization:
   ${a} = ${formatPrimeFactors(getPrimeFactorization(a))}
   ${b} = ${formatPrimeFactors(getPrimeFactorization(b))}

2. Find Greatest Common Divisor (GCD / GCF):
   Multiply all common prime factors with lowest exponents:
   gcd(${a}, ${b}) = ${gcdVal}

3. Find Least Common Multiple (LCM):
   Using product identity a × b = gcd(a, b) × lcm(a, b):
   lcm(${a}, ${b}) = (${a} × ${b}) ÷ ${gcdVal} = ${lcmVal}

Answer: The GCD of ${a} and ${b} is ${gcdVal}, and the LCM is ${lcmVal}.`;
  }
}

// Euler's Totient function phi(n)
export function eulerTotient(n: number): number {
  if (n <= 0) return 0;
  let result = n;
  let p = 2;
  let temp = n;
  while (p * p <= temp) {
    if (temp % p === 0) {
      while (temp % p === 0) temp /= p;
      result -= Math.floor(result / p);
    }
    p++;
  }
  if (temp > 1) {
    result -= Math.floor(result / temp);
  }
  return result;
}

export interface FractionSimplification {
  originalNum: bigint;
  originalDen: bigint;
  simplifiedNum: bigint;
  simplifiedDen: bigint;
  gcd: bigint;
  isProper: boolean;
  wholeNumber: bigint;
  remainderNum: bigint;
  decimalValue: number;
  decimalStr: string;
  percentageStr: string;
}

export function simplifyFraction(num: bigint, den: bigint): FractionSimplification {
  if (den === 0n) {
    return {
      originalNum: num,
      originalDen: den,
      simplifiedNum: 0n,
      simplifiedDen: 0n,
      gcd: 0n,
      isProper: true,
      wholeNumber: 0n,
      remainderNum: 0n,
      decimalValue: 0,
      decimalStr: 'undefined (div by 0)',
      percentageStr: 'N/A',
    };
  }

  const sign = (num < 0n && den > 0n) || (num > 0n && den < 0n) ? -1n : 1n;
  const absNum = num < 0n ? -num : num;
  const absDen = den < 0n ? -den : den;
  const g = bigIntGcd(absNum, absDen);

  const sNum = (absNum / g) * sign;
  const sDen = absDen / g;

  const isProper = absNum < absDen;
  const wholeNumber = absNum / absDen;
  const remainderNum = absNum % absDen;

  const decVal = Number(absNum) / Number(absDen);
  const signPrefix = sign < 0n ? '-' : '';

  return {
    originalNum: num,
    originalDen: den,
    simplifiedNum: sNum,
    simplifiedDen: sDen,
    gcd: g,
    isProper,
    wholeNumber,
    remainderNum,
    decimalValue: decVal * (sign < 0n ? -1 : 1),
    decimalStr: `${signPrefix}${decVal.toFixed(6).replace(/0+$/, '').replace(/\.$/, '')}`,
    percentageStr: `${signPrefix}${(decVal * 100).toFixed(2)}%`,
  };
}

export function fractionAddSubtract(
  n1: bigint,
  d1: bigint,
  n2: bigint,
  d2: bigint,
  op: '+' | '-'
) {
  if (d1 === 0n || d2 === 0n) {
    throw new Error('Denominator cannot be zero');
  }
  const commonDenom = bigIntLcm(d1, d2);
  const factor1 = commonDenom / d1;
  const factor2 = commonDenom / d2;
  const scaledNum1 = n1 * factor1;
  const scaledNum2 = n2 * factor2;
  const resultNum = op === '+' ? scaledNum1 + scaledNum2 : scaledNum1 - scaledNum2;
  const simplified = simplifyFraction(resultNum, commonDenom);

  return {
    commonDenom,
    factor1,
    factor2,
    scaledNum1,
    scaledNum2,
    resultNum,
    simplified,
  };
}

export interface RealWorldScenarioResult {
  a: number;
  b: number;
  gcd: number;
  lcm: number;
  tiling: {
    tileSize: number;
    tilesWide: number;
    tilesHigh: number;
    totalTiles: number;
  };
  giftBags: {
    totalBags: number;
    itemsAperBag: number;
    itemsBperBag: number;
  };
  cutting: {
    maxPieceLength: number;
    piecesA: number;
    piecesB: number;
    totalPieces: number;
  };
  runners: {
    syncTimeSeconds: number;
    lapsA: number;
    lapsB: number;
  };
}

export function calculateRealWorldScenarios(a: number, b: number): RealWorldScenarioResult {
  const safeA = Math.max(1, Math.min(a, 10000000));
  const safeB = Math.max(1, Math.min(b, 10000000));
  const g = Number(bigIntGcd(BigInt(safeA), BigInt(safeB)));
  const l = Number(bigIntLcm(BigInt(safeA), BigInt(safeB)));

  return {
    a: safeA,
    b: safeB,
    gcd: g,
    lcm: l,
    tiling: {
      tileSize: g,
      tilesWide: safeA / g,
      tilesHigh: safeB / g,
      totalTiles: (safeA / g) * (safeB / g),
    },
    giftBags: {
      totalBags: g,
      itemsAperBag: safeA / g,
      itemsBperBag: safeB / g,
    },
    cutting: {
      maxPieceLength: g,
      piecesA: safeA / g,
      piecesB: safeB / g,
      totalPieces: safeA / g + safeB / g,
    },
    runners: {
      syncTimeSeconds: l,
      lapsA: safeA > 0 ? l / safeA : 0,
      lapsB: safeB > 0 ? l / safeB : 0,
    },
  };
}

export function decimalGcd(aStr: string, bStr: string) {
  const getDecPlaces = (s: string) => {
    const parts = s.split('.');
    return parts.length > 1 ? parts[1].length : 0;
  };
  const d1 = getDecPlaces(aStr);
  const d2 = getDecPlaces(bStr);
  const maxDec = Math.max(d1, d2);
  const factor = 10 ** maxDec;

  const intA = Math.round(parseFloat(aStr) * factor);
  const intB = Math.round(parseFloat(bStr) * factor);
  const intGcd = Number(bigIntGcd(BigInt(Math.abs(intA)), BigInt(Math.abs(intB))));
  const finalDecimalGcd = intGcd / factor;

  return {
    scaledFactor: factor,
    intA,
    intB,
    intGcd,
    finalDecimalGcd,
  };
}

export function formatLatexSolution(a: bigint, b: bigint): string {
  const g = bigIntGcd(a, b);
  const l = bigIntLcm(a, b);
  return `% LaTeX Code for GCD and LCM
\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
\\section*{Greatest Common Divisor \\& LCM}
\\begin{align*}
  a &= ${a}, \\quad b = ${b} \\\\[6pt]
  \\gcd(${a}, ${b}) &= ${g} \\\\[6pt]
  \\operatorname{lcm}(${a}, ${b}) &= ${l} \\\\[6pt]
  a \\times b &= \\gcd(a, b) \\times \\operatorname{lcm}(a, b) \\\\[6pt]
  ${a} \\times ${b} &= ${g} \\times ${l} = ${a * b}
\\end{align*}

\\subsection*{Fraction Reduction}
\\[
  \\frac{${a}}{${b}} = \\frac{${a} \\div ${g}}{${b} \\div ${g}} = \\frac{${b !== 0n ? a / g : 0n}}{${b !== 0n ? b / g : 0n}}
\\]
\\end{document}`;
}
