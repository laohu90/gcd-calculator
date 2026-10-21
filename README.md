# 最大公约数 GCD & 最小公倍数 LCM 计算器 (GCD Math Hub)

> 专业在线最大公约数 (Greatest Common Divisor, GCD) 与最小公倍数 (Least Common Multiple, LCM) 计算器。包含小学梯形短除法、欧几里得辗转相除法、质因数分解韦恩图、更相减损法全步骤图解与初中因式分解提公因式、分数约分与可打印作业纸生成。

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 核心功能特性

### 1. 四大经典算法全步骤推导与图解
- **小学标准梯形短除法 (Ladder Method)**：还原中国中小学课本经典短除法梯形图，左侧除数相乘求 GCD，"L" 型相乘同步求 LCM。
- **欧几里得辗转相除法 (Euclidean Algorithm)**：带余除法 $a = b \times q + r$ 逐步迭代，包含竞赛特化——裴蜀定理与扩展欧几里得特解 $ax + by = \gcd(a, b)$。
- **质因数分解法与韦恩图 (Prime Factorization & Venn Diagram)**：标准素因子幂次分解，集合交集（GCD）与并集（LCM）极值法则图解。
- **《九章算术》更相减损法 (Method of Successive Subtractions)**：西汉传统“可半者半之，以少减多更相减损”古代经典算法复原。
- **几何铺砖切分可视化 (Geometric Tiling)**：以 $a \times b$ 长方形铺砖生动演示为什么最大公约数是最大正方形地砖边长。

### 2. 中小学解题与作业辅助
- **中小学标准答题范本生成**：自动生成包含步骤一、步骤二、步骤三及结论的规范答题文本，支持一键复制到剪贴板。
- **因数全集与乘积因数对速查**：列出所有因数、因数对乘积分解与公因数高亮标记。
- **2~11 整除特征诊断器**：动态分析各位数字之和、末位数字与交替和整除法则。
- **4 大奥数应用题求解器**：裁纸铺砖、物品均分、等距植树、公交发车相遇一键反推。

### 3. 初中代数因式分解前置
- **提公因式三步法**：一确定系数绝对值最大公约数、二确定公共字母、三确定最低次幂。
- **分数一步到位约分**：分子分母同除以最大公因数快速化为最简分数。

### 4. 国际化与 SEO 架构
- **中英双语 (zh-CN / en-US)** 一键切换。
- **动态 URL 参数**：自动将数字同步至地址栏（如 `?a=48&b=72`），方便分享与搜索引擎收录。
- **可打印 A4 试卷生成器**：支持按难度（基础、进阶、分数约分、奥数应用题）随机出题并一键打印或导出 PDF。
- **高频长尾搜索词速查矩阵**：收录 30+ 组课本与奥数高频考查数对。

---

## 🛠️ 本地开发与构建

### 安装依赖
```bash
npm install
```

### 启动本地开发服务
```bash
npm run dev
```

### 生产环境打包构建
```bash
npm run build
```

### 预览生产产物
```bash
npm run preview
```

---

## 📄 开源许可证

本项目基于 [MIT](LICENSE) 许可证开源。
