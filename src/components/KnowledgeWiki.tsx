import React from 'react';
import { MathView } from './MathView';
import { BookOpen, Check, HelpCircle, Table2 } from 'lucide-react';

export const KnowledgeWiki: React.FC = () => {
  return (
    <article className="space-y-10 text-slate-800">
      {/* 1. Definition and Concept */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>数论基础概念与数学符号</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          什么是最大公约数 (Greatest Common Divisor, GCD)？
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          最大公约数（Greatest Common Divisor，简写作{' '}
          <strong className="text-slate-900 font-semibold">GCD</strong>，小学课本中常称作{' '}
          <strong className="text-slate-900 font-semibold">最大公因数</strong>），是指两个或多个非零整数共有约数（因数）中数值最大的一个。
        </p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-sm">
          <div className="font-semibold text-slate-800">常见数学表达记号：</div>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>
              国际数论与高年级代数中常记作：
              <span className="font-mono text-indigo-700 font-semibold ml-1">
                <MathView math="\gcd(a, b)" />
              </span>
            </li>
            <li>
              中国中小学数学竞赛中经常简写为圆括号形式：
              <span className="font-mono text-indigo-700 font-semibold ml-1">
                <MathView math="(a, b) = d" />
              </span>
            </li>
            <li>
              而相应的最小公倍数 (LCM) 则常记作方括号形式：
              <span className="font-mono text-emerald-700 font-semibold ml-1">
                <MathView math="[a, b] = m" />
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Core Mathematical Properties */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          最大公因数核心性质与奥数速算定律
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>双数乘积定律 (GCD 与 LCM 关系)</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              对于任意两个正整数 <MathView math="a" /> 和 <MathView math="b" />，它们的最大公因数与最小公倍数的乘积严格等于两数本身的乘积：
            </p>
            <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-indigo-900 font-semibold text-center">
              <MathView math="a \times b = \gcd(a, b) \times \operatorname{lcm}(a, b)" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>整倍数特征 (倍数包含律)</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              如果正整数 <MathView math="a" /> 能被 <MathView math="b" /> 整除（即 <MathView math="a = k \cdot b" />），那么较小的数即为最大公因数：
            </p>
            <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-indigo-900 font-semibold text-center">
              <MathView math="\gcd(a, b) = b, \quad \operatorname{lcm}(a, b) = a" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>公因数线性可加性</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              对于任意整数 <MathView math="a, b" /> 与倍数 <MathView math="k" />，两数的最大公约数保持不变：
            </p>
            <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-indigo-900 font-semibold text-center">
              <MathView math="\gcd(a, b) = \gcd(b, a - k \cdot b)" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>互质数判定与欧拉函数</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              若 <MathView math="\gcd(a, b) = 1" />，则称 <MathView math="a" /> 与 <MathView math="b" /> 互质。两个连续自然数（如 n 与 n+1）必互质；两相异质数必互质。
            </p>
            <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-indigo-900 font-semibold text-center">
              <MathView math="\gcd(n, n + 1) = 1" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Algorithm Comparison Table */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase">
          <Table2 className="w-4 h-4" />
          <span>求最大公约数四种算法全方位横评</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          辗转相除法、短除法、质因数分解法、更相减损法适用场景对比
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-semibold">
              <tr>
                <th className="border border-slate-200 p-3">算法名称</th>
                <th className="border border-slate-200 p-3">核心计算机制</th>
                <th className="border border-slate-200 p-3">最佳适用场景</th>
                <th className="border border-slate-200 p-3">主要优势与缺点</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="border border-slate-200 p-3 font-semibold text-indigo-900">
                  辗转相除法 (欧几里得法)
                </td>
                <td className="border border-slate-200 p-3 text-slate-600">
                  重复用较小数除较大数，直到余数为 0
                </td>
                <td className="border border-slate-200 p-3 text-slate-800 font-medium">
                  超大整数、编程计算机实现、初高中数论
                </td>
                <td className="border border-slate-200 p-3 text-slate-600">
                  收敛速度最快，对大数无需试除质数；缺点是手工算除法需列竖式
                </td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-3 font-semibold text-indigo-900">
                  梯形短除法 (中小学标准)
                </td>
                <td className="border border-slate-200 p-3 text-slate-600">
                  同时除以公共素数，商直至互质
                </td>
                <td className="border border-slate-200 p-3 text-slate-800 font-medium">
                  小学奥数日常、小中型数字手算、求分数约分
                </td>
                <td className="border border-slate-200 p-3 text-slate-600">
                  视觉清晰，“L”型乘积同步算出 LCM；缺点是数字极大时难以看出质因数
                </td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-3 font-semibold text-indigo-900">
                  质因数分解法 (指数极值)
                </td>
                <td className="border border-slate-200 p-3 text-slate-600">
                  各数分解为素数乘幂，取指数最小值 min
                </td>
                <td className="border border-slate-200 p-3 text-slate-800 font-medium">
                  初中因式分解提公因式、数论证明题
                </td>
                <td className="border border-slate-200 p-3 text-slate-600">
                  数学结构最透彻，与因式分解直接统一；大数分解素因数极其困难
                </td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-3 font-semibold text-indigo-900">
                  更相减损法 (九章算术)
                </td>
                <td className="border border-slate-200 p-3 text-slate-600">
                  偶数先折半，其后“以少减多，更相减损”
                </td>
                <td className="border border-slate-200 p-3 text-slate-800 font-medium">
                  古代数学文化、中国传统算筹、减法硬件电路
                </td>
                <td className="border border-slate-200 p-3 text-slate-600">
                  完全无需除法运算只需减法；缺点是当两数悬殊时减法步数较多
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. FAQ Section for SEO */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase">
          <HelpCircle className="w-4 h-4" />
          <span>学生与家长常见疑问解答 (FAQ)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          最大公因数与最小公倍数常考疑难解答
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              问：三个数的最大公约数与最小公倍数怎么求？能直接两两套用乘积公式吗？
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              答：求三个数的最大公约数可以连续计算：<MathView math="\gcd(a, b, c) = \gcd(\gcd(a, b), c)" />。
              <strong>需要特别注意：</strong> 双数乘积公式 <MathView math="a \times b = \gcd \times \operatorname{lcm}" /> <strong>不适用于三个或三个以上的数字</strong>！
              三个数短除法求最小公倍数时，只要其中任意两个数有公因数就需要继续除，另一个数落下来，这是小学奥数最容易失分的易错点。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              问：为什么因式分解提取公因式必须要先求系数的最大公约数？
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              答：因式分解要求“分解彻底”。如果提取的系数不是最大公约数（例如多项式各系数是 12, 18，却只提取了 2 留下 6 和 9），括号内的各项依然含有公因数 3，中考判卷会被扣除全部分数。因此必须一步提净最大公约数。
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              问：0 和某个正整数的最大公约数是多少？
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              答：根据数论严格定义，任何非零整数 a 都能整除 0（即 0 = 0 × a），因此对于任意正整数 a，有 <MathView math="\gcd(a, 0) = a" />。而 <MathView math="\gcd(0, 0)" /> 未定义。
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};
