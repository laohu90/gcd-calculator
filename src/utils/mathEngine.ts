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

// Helper: Find the smallest prime divisor dividing all numbers
function findCommonPrimeDivisor(nums: number[]): number | null {
  const minVal = Math.min(...nums);
  if (minVal <= 1) return null;

  if (nums.every((n) => n % 2 === 0)) return 2;

  for (let d = 3; d * d <= minVal; d += 2) {
    if (nums.every((n) => n % d === 0)) {
      return d;
    }
  }

  // If minVal itself is a common prime divisor
  if (minVal > 1 && nums.every((n) => n % minVal === 0)) {
    return minVal;
  }

  return null;
}

// Short Division for 2 or 3 numbers (小学奥数经典短除法)
export function getShortDivision(numbers: number[]): ShortDivisionResult {
  const current = numbers.map((n) => Math.max(1, Math.floor(Math.abs(n))));
  const steps: ShortDivisionRow[] = [];
  const gcdDivisors: number[] = [];

  let iterations = 0;
  while (iterations < 60) {
    iterations++;
    const p = findCommonPrimeDivisor(current);
    if (!p) break;

    steps.push({
      divisor: p,
      quotients: [...current],
    });
    gcdDivisors.push(p);
    for (let i = 0; i < current.length; i++) {
      current[i] /= p;
    }
  }

  const gcd = gcdDivisors.reduce((acc, v) => acc * v, 1);
  const lcm = gcd * current.reduce((acc, v) => acc * v, 1);

  return {
    initialNumbers: [...numbers],
    steps,
    finalQuotients: current,
    gcdDivisors,
    gcd,
    lcmDivisors: gcdDivisors,
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

// Divisibility Rules Analysis (2, 3, 4, 5, 6, 8, 9, 10, 11)
export interface DivisibilityRuleResult {
  divisor: number;
  divisible: boolean;
  ruleNameZh: string;
  ruleNameEn: string;
  reasonZh: string;
  reasonEn: string;
}

export function getDivisibilityRules(n: number): DivisibilityRuleResult[] {
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

  return [
    {
      divisor: 2,
      divisible: absN % 2 === 0,
      ruleNameZh: '被 2 整除',
      ruleNameEn: 'Divisible by 2',
      reasonZh: `末位数字为 ${lastDigit}（${absN % 2 === 0 ? '是偶数' : '是奇数'}）`,
      reasonEn: `Last digit is ${lastDigit} (${absN % 2 === 0 ? 'even' : 'odd'})`,
    },
    {
      divisor: 3,
      divisible: sumDigits % 3 === 0,
      ruleNameZh: '被 3 整除',
      ruleNameEn: 'Divisible by 3',
      reasonZh: `各位数字之和为 ${sumDigits}（${sumDigits % 3 === 0 ? '能被3整除' : '不能被3整除'}）`,
      reasonEn: `Sum of digits is ${sumDigits} (${sumDigits % 3 === 0 ? 'divisible by 3' : 'not divisible'})`,
    },
    {
      divisor: 4,
      divisible: lastTwo % 4 === 0,
      ruleNameZh: '被 4 整除',
      ruleNameEn: 'Divisible by 4',
      reasonZh: `末两位数字为 ${lastTwo}（${lastTwo % 4 === 0 ? '能被4整除' : '不能被4整除'}）`,
      reasonEn: `Last two digits are ${lastTwo} (${lastTwo % 4 === 0 ? 'divisible by 4' : 'not divisible'})`,
    },
    {
      divisor: 5,
      divisible: lastDigit === 0 || lastDigit === 5,
      ruleNameZh: '被 5 整除',
      ruleNameEn: 'Divisible by 5',
      reasonZh: `末位数字为 ${lastDigit}（${lastDigit === 0 || lastDigit === 5 ? '末位是0或5' : '末位非0也非5'}）`,
      reasonEn: `Last digit is ${lastDigit} (${lastDigit === 0 || lastDigit === 5 ? 'ends with 0 or 5' : 'does not end with 0 or 5'})`,
    },
    {
      divisor: 6,
      divisible: absN % 2 === 0 && sumDigits % 3 === 0,
      ruleNameZh: '被 6 整除',
      ruleNameEn: 'Divisible by 6',
      reasonZh: `必须同时能被 2 和 3 整除（${absN % 2 === 0 && sumDigits % 3 === 0 ? '符合条件' : '不符合条件'}）`,
      reasonEn: `Must be divisible by both 2 and 3 (${absN % 2 === 0 && sumDigits % 3 === 0 ? 'passed' : 'failed'})`,
    },
    {
      divisor: 8,
      divisible: lastThree % 8 === 0,
      ruleNameZh: '被 8 整除',
      ruleNameEn: 'Divisible by 8',
      reasonZh: `末三位数字为 ${lastThree}（${lastThree % 8 === 0 ? '能被8整除' : '不能被8整除'}）`,
      reasonEn: `Last three digits are ${lastThree} (${lastThree % 8 === 0 ? 'divisible by 8' : 'not divisible'})`,
    },
    {
      divisor: 9,
      divisible: sumDigits % 9 === 0,
      ruleNameZh: '被 9 整除',
      ruleNameEn: 'Divisible by 9',
      reasonZh: `各位数字之和为 ${sumDigits}（${sumDigits % 9 === 0 ? '能被9整除' : '不能被9整除'}）`,
      reasonEn: `Sum of digits is ${sumDigits} (${sumDigits % 9 === 0 ? 'divisible by 9' : 'not divisible'})`,
    },
    {
      divisor: 10,
      divisible: lastDigit === 0,
      ruleNameZh: '被 10 整除',
      ruleNameEn: 'Divisible by 10',
      reasonZh: `末位数字为 ${lastDigit}（${lastDigit === 0 ? '末位是0' : '末位不是0'}）`,
      reasonEn: `Last digit is ${lastDigit} (${lastDigit === 0 ? 'ends in 0' : 'does not end in 0'})`,
    },
    {
      divisor: 11,
      divisible: altSum % 11 === 0,
      ruleNameZh: '被 11 整除',
      ruleNameEn: 'Divisible by 11',
      reasonZh: `奇数位与偶数位数字差为 ${altSum}（${altSum % 11 === 0 ? '能被11整除' : '不能被11整除'}）`,
      reasonEn: `Alternating digit sum is ${altSum} (${altSum % 11 === 0 ? 'divisible by 11' : 'not divisible'})`,
    },
  ];
}

// Standard Homework Writeup Text Generator
export function generateHomeworkText(
  a: number,
  b: number,
  gcdVal: number,
  lcmVal: number,
  lang: 'zh' | 'en'
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
  } else {
    return `[Standard Homework Solution]
Problem: Find the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of ${a} and ${b}.

Solution:
1. Prime Factorization:
   ${a} = ${formatPrimeFactors(getPrimeFactorization(a))}
   ${b} = ${formatPrimeFactors(getPrimeFactorization(b))}

2. Find Greatest Common Divisor (GCD / GCF):
   Multiply all shared prime factors:
   gcd(${a}, ${b}) = ${gcdVal}

3. Find Least Common Multiple (LCM):
   Using product identity a × b = gcd(a, b) × lcm(a, b):
   lcm(${a}, ${b}) = (${a} × ${b}) / ${gcdVal} = ${lcmVal}

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
