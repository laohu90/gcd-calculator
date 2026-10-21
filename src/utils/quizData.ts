import { Language } from './i18n';

export interface QuizQuestion {
  id: number;
  type: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  mathFormula: string;
}

export const QUIZ_DATA: Record<Language, QuizQuestion[]> = {
  en: [
    {
      id: 1,
      type: 'Classic Olympiad · Rectangular Paper Cut',
      question:
        'A rectangular cardboard sheet is 72 cm long and 48 cm wide. It is to be cut into equal-sized square pieces without any leftover paper. What is the maximum side length of each square piece, and how many squares can be cut in total?',
      options: [
        'Max side 12 cm, 24 squares in total',
        'Max side 24 cm, 6 squares in total',
        'Max side 24 cm, 12 squares in total',
        'Max side 16 cm, 8 squares in total',
      ],
      correctIndex: 1,
      explanation:
        'The maximum square edge equals the greatest common divisor gcd(72, 48) = 24 cm. The length yields 72 ÷ 24 = 3 pieces, and the width yields 48 ÷ 24 = 2 pieces. Total count = 3 × 2 = 6 squares.',
      mathFormula: '\\gcd(72, 48) = 24; \\quad \\frac{72}{24} \\times \\frac{48}{24} = 3 \\times 2 = 6',
    },
    {
      id: 2,
      type: 'Number Theory · Relatively Prime (Coprime)',
      question: 'Which of the following pairs of numbers consists of relatively prime integers (gcd = 1)?',
      options: ['51 and 85', '39 and 65', '14 and 25', '27 and 57'],
      correctIndex: 2,
      explanation:
        '14 = 2 × 7, while 25 = 5². They share no common prime factor, so gcd(14, 25) = 1. Others: 51 and 85 share 17; 39 and 65 share 13; 27 and 57 share 3.',
      mathFormula: '\\gcd(14, 25) = 1',
    },
    {
      id: 3,
      type: 'Olympiad Word Problem · Fair Item Distribution',
      question:
        'A school buys 84 pencils and 126 notebooks to award honor students equally. If each student receives the same number of pencils and notebooks with nothing left over, what is the maximum number of students that can be awarded?',
      options: ['21 students', '28 students', '42 students', '63 students'],
      correctIndex: 2,
      explanation:
        'The student count must be a common factor of 84 and 126. To maximize the number of students, calculate gcd(84, 126) = 42 students. Each receives 84 ÷ 42 = 2 pencils and 126 ÷ 42 = 3 notebooks.',
      mathFormula: '\\gcd(84, 126) = 42',
    },
    {
      id: 4,
      type: 'Fundamental Law · GCD and LCM Relationship',
      question:
        'For two positive integers a and b, their greatest common divisor is gcd(a, b) = 12, and their least common multiple is lcm(a, b) = 360. If a = 72, what is the value of b?',
      options: ['48', '60', '84', '96'],
      correctIndex: 1,
      explanation:
        'Using the product identity a × b = gcd(a, b) × lcm(a, b), we have 72 × b = 12 × 360 = 4320. Thus, b = 4320 ÷ 72 = 60.',
      mathFormula: 'a \\times b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b) \\implies b = \\frac{12 \\times 360}{72} = 60',
    },
  ],

  es: [
    {
      id: 1,
      type: 'Olimpiada Matemática · Corte de cartulina',
      question:
        'Una lámina de cartulina mide 72 cm de largo por 48 cm de ancho. Se desea recortar en piezas cuadradas iguales sin que sobre material. ¿Cuál es la mayor longitud posible del lado de cada cuadrado y cuántos cuadrados se obtienen?',
      options: [
        'Lado 12 cm, 24 cuadrados en total',
        'Lado 24 cm, 6 cuadrados en total',
        'Lado 24 cm, 12 cuadrados en total',
        'Lado 16 cm, 8 cuadrados en total',
      ],
      correctIndex: 1,
      explanation:
        'El lado máximo del cuadrado corresponde al máximo común divisor mcd(72, 48) = 24 cm. El largo se divide en 72 ÷ 24 = 3 tiras y el ancho en 48 ÷ 24 = 2 tiras. Total = 3 × 2 = 6 cuadrados.',
      mathFormula: '\\operatorname{mcd}(72, 48) = 24; \\quad \\frac{72}{24} \\times \\frac{48}{24} = 3 \\times 2 = 6',
    },
    {
      id: 2,
      type: 'Teoría de números · Números primos entre sí',
      question: '¿Cuál de las siguientes parejas de números está formada por números primos entre sí (mcd = 1)?',
      options: ['51 y 85', '39 y 65', '14 y 25', '27 y 57'],
      correctIndex: 2,
      explanation:
        '14 = 2 × 7 y 25 = 5². No comparten ningún factor primo común, por lo que mcd(14, 25) = 1. Las demás parejas comparten: 51 y 85 comparten el 17; 39 y 65 el 13; 27 y 57 el 3.',
      mathFormula: '\\operatorname{mcd}(14, 25) = 1',
    },
    {
      id: 3,
      type: 'Problema de aplicación · Reparto equitativo',
      question:
        'Un colegio adquiere 84 lápices y 126 cuadernos para premiar a estudiantes destacados. Si todos reciben el mismo número de lápices y cuadernos sin que sobre nada, ¿cuál es el número máximo de alumnos premiados?',
      options: ['21 alumnos', '28 alumnos', '42 alumnos', '63 alumnos'],
      correctIndex: 2,
      explanation:
        'El número de estudiantes debe ser divisor común de 84 y 126. Para obtener el máximo posible, calculamos mcd(84, 126) = 42 alumnos. Cada uno recibe 84 ÷ 42 = 2 lápices y 126 ÷ 42 = 3 cuadernos.',
      mathFormula: '\\operatorname{mcd}(84, 126) = 42',
    },
    {
      id: 4,
      type: 'Propiedad fundamental · Relación MCD y MCM',
      question:
        'Dados dos enteros positivos a y b, su mcd(a, b) = 12 y su mcm(a, b) = 360. Si a = 72, ¿cuál es el valor de b?',
      options: ['48', '60', '84', '96'],
      correctIndex: 1,
      explanation:
        'Por la propiedad del producto a × b = mcd(a, b) × mcm(a, b), tenemos 72 × b = 12 × 360 = 4320. Despejando b = 4320 ÷ 72 = 60.',
      mathFormula: 'a \\times b = \\operatorname{mcd}(a, b) \\times \\operatorname{mcm}(a, b) \\implies b = \\frac{12 \\times 360}{72} = 60',
    },
  ],

  fr: [
    {
      id: 1,
      type: 'Olympiades · Découpage de carton',
      question:
        'Une feuille rectangulaire mesure 72 cm de longueur sur 48 cm de largeur. On souhaite la découper en carrés identiques les plus grands possibles, sans chute. Quelle est la longueur du côté d’un carré et combien de carrés obtient-on ?',
      options: [
        'Côté 12 cm, 24 carrés au total',
        'Côté 24 cm, 6 carrés au total',
        'Côté 24 cm, 12 carrés au total',
        'Côté 16 cm, 8 carrés au total',
      ],
      correctIndex: 1,
      explanation:
        'La longueur maximale du côté est le PGCD(72, 48) = 24 cm. La longueur donne 72 ÷ 24 = 3 carrés, et la largeur 48 ÷ 24 = 2 carrés. Total = 3 × 2 = 6 carrés.',
      mathFormula: '\\operatorname{pgcd}(72, 48) = 24; \\quad \\frac{72}{24} \\times \\frac{48}{24} = 3 \\times 2 = 6',
    },
    {
      id: 2,
      type: 'Arithmétique · Nombres premiers entre eux',
      question: 'Parmi les paires suivantes, laquelle est constituée de nombres premiers entre eux (pgcd = 1) ?',
      options: ['51 et 85', '39 et 65', '14 et 25', '27 et 57'],
      correctIndex: 2,
      explanation:
        '14 = 2 × 7 et 25 = 5². Ils n’ont aucun diviseur premier commun, donc pgcd(14, 25) = 1. Autres paires : 51 et 85 ont 17 en commun ; 39 et 65 ont 13 ; 27 et 57 ont 3.',
      mathFormula: '\\operatorname{pgcd}(14, 25) = 1',
    },
    {
      id: 3,
      type: 'Problème de partage · Distribution équitable',
      question:
        'Une école achète 84 crayons et 126 cahiers pour récompenser des élèves. Chaque élève reçoit le même nombre de crayons et de cahiers sans reste. Quel est le nombre maximal d’élèves récompensés ?',
      options: ['21 élèves', '28 élèves', '42 élèves', '63 élèves'],
      correctIndex: 2,
      explanation:
        'Le nombre d’élèves est un diviseur commun de 84 et 126. Au maximum, c’est pgcd(84, 126) = 42 élèves. Chacun reçoit 84 ÷ 42 = 2 crayons et 126 ÷ 42 = 3 cahiers.',
      mathFormula: '\\operatorname{pgcd}(84, 126) = 42',
    },
    {
      id: 4,
      type: 'Relation fondamentale · PGCD et PPCM',
      question:
        'Pour deux entiers a et b, on a pgcd(a, b) = 12 et ppcm(a, b) = 360. Si a = 72, que vaut b ?',
      options: ['48', '60', '84', '96'],
      correctIndex: 1,
      explanation:
        'En appliquant la formule a × b = pgcd(a, b) × ppcm(a, b), on a 72 × b = 12 × 360 = 4320, d’où b = 4320 ÷ 72 = 60.',
      mathFormula: 'a \\times b = \\operatorname{pgcd}(a, b) \\times \\operatorname{ppcm}(a, b) \\implies b = \\frac{12 \\times 360}{72} = 60',
    },
  ],

  pt: [
    {
      id: 1,
      type: 'Olimpíada de Matemática · Corte de papelão',
      question:
        'Uma placa de papelão mede 72 cm de comprimento por 48 cm de largura. Deve ser cortada em quadrados iguais e máximos sem sobras. Qual o comprimento do lado de cada quadrado e quantos quadrados serão obtidos?',
      options: [
        'Lado 12 cm, 24 quadrados no total',
        'Lado 24 cm, 6 quadrados no total',
        'Lado 24 cm, 12 quadrados no total',
        'Lado 16 cm, 8 quadrados no total',
      ],
      correctIndex: 1,
      explanation:
        'O lado máximo do quadrado é o mdc(72, 48) = 24 cm. No comprimento cabem 72 ÷ 24 = 3 quadrados e na largura 48 ÷ 24 = 2 quadrados. Total = 3 × 2 = 6 quadrados.',
      mathFormula: '\\operatorname{mdc}(72, 48) = 24; \\quad \\frac{72}{24} \\times \\frac{48}{24} = 3 \\times 2 = 6',
    },
    {
      id: 2,
      type: 'Teoria dos números · Números primos entre si',
      question: 'Qual dos seguintes pares é composto por números primos entre si (mdc = 1)?',
      options: ['51 e 85', '39 e 65', '14 e 25', '27 e 57'],
      correctIndex: 2,
      explanation:
        '14 = 2 × 7 e 25 = 5². Não compartilham fatores primos comuns, logo mdc(14, 25) = 1. Outros pares: 51 e 85 compartilham 17; 39 e 65 compartilham 13; 27 e 57 compartilham 3.',
      mathFormula: '\\operatorname{mdc}(14, 25) = 1',
    },
    {
      id: 3,
      type: 'Problema de divisão · Repartição justa',
      question:
        'Uma escola tem 84 lápis e 126 cadernos para premiar alunos igualmente sem sobras. Qual é o número máximo de alunos que podem ser premiados?',
      options: ['21 alunos', '28 alunos', '42 alunos', '63 alunos'],
      correctIndex: 2,
      explanation:
        'O número de alunos deve ser divisor comum de 84 e 126. No máximo, temos mdc(84, 126) = 42 alunos. Cada um recebe 84 ÷ 42 = 2 lápis e 126 ÷ 42 = 3 cadernos.',
      mathFormula: '\\operatorname{mdc}(84, 126) = 42',
    },
    {
      id: 4,
      type: 'Propriedade fundamental · Relação MDC e MMC',
      question:
        'Para dois inteiros positivos a e b, temos mdc(a, b) = 12 e mmc(a, b) = 360. Se a = 72, qual é o valor de b?',
      options: ['48', '60', '84', '96'],
      correctIndex: 1,
      explanation:
        'Pela relação a × b = mdc(a, b) × mmc(a, b), temos 72 × b = 12 × 360 = 4320, donde b = 4320 ÷ 72 = 60.',
      mathFormula: 'a \\times b = \\operatorname{mdc}(a, b) \\times \\operatorname{mmc}(a, b) \\implies b = \\frac{12 \\times 360}{72} = 60',
    },
  ],

  zh: [
    {
      id: 1,
      type: '小学奥数 · 经典裁纸题',
      question:
        '有一张长 72 厘米、宽 48 厘米的长方形硬纸板。要把这张纸裁成若干张大小相同的正方形纸片，且纸张没有剩余。正方形纸片的边长最大是多少厘米？一共可以裁多少张？',
      options: [
        '最大边长 12 厘米，可裁 24 张',
        '最大边长 24 厘米，可裁 6 张',
        '最大边长 24 厘米，可裁 12 张',
        '最大边长 16 厘米，可裁 8 张',
      ],
      correctIndex: 1,
      explanation:
        '正方形的最大边长即为长与宽的最大公约数 gcd(72, 48) = 24 厘米。长边可切 72 ÷ 24 = 3 段，宽边可切 48 ÷ 24 = 2 段，总张数 = 3 × 2 = 6 张。',
      mathFormula: '\\gcd(72, 48) = 24; \\quad \\frac{72}{24} \\times \\frac{48}{24} = 3 \\times 2 = 6',
    },
    {
      id: 2,
      type: '中考前置 · 互质数特征',
      question: '下列各组数字中，哪一组属于“互质数”（即最大公约数为 1）？',
      options: ['51 与 85', '39 与 65', '14 与 25', '27 与 57'],
      correctIndex: 2,
      explanation:
        '14 的因数有 1, 2, 7, 14；25 的因数有 1, 5, 25。两数的公因数只有 1，因此 gcd(14, 25) = 1，属于互质数。其余选项：51 与 85 公因数有 17；39 与 65 公因数有 13；27 与 57 公因数有 3。',
      mathFormula: '\\gcd(14, 25) = 1',
    },
    {
      id: 3,
      type: '小学奥数 · 物品分组均分',
      question:
        '学校买来 84 支铅笔和 126 本笔记本，打算平均分给获奖的优秀学生。如果每位同学分得的铅笔数相同，笔记本数也相同，且全部刚好分完，最多可以奖励多少名学生？',
      options: ['21 名', '28 名', '42 名', '63 名'],
      correctIndex: 2,
      explanation:
        '学生人数必须同时是 84 和 126 的公因数；要求“最多”，即求最大公约数 gcd(84, 126) = 42 人。此时每人分得铅笔 84 ÷ 42 = 2 支，笔记本 126 ÷ 42 = 3 本。',
      mathFormula: '\\gcd(84, 126) = 42',
    },
    {
      id: 4,
      type: '数论核心公式 · GCD 与 LCM 关系',
      question:
        '已知两个正整数 a 与 b，它们的最大公约数 gcd(a, b) = 12，最小公倍数 lcm(a, b) = 360。如果已知其中一个数 a = 72，那么另一个数 b 是多少？',
      options: ['48', '60', '84', '96'],
      correctIndex: 1,
      explanation:
        '根据两数乘积定理 a × b = gcd(a, b) × lcm(a, b)，代入已知量得 72 × b = 12 × 360 = 4320，因此 b = 4320 ÷ 72 = 60。',
      mathFormula: 'a \\times b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b) \\implies b = \\frac{12 \\times 360}{72} = 60',
    },
  ],
};
