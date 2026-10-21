import React from 'react';
import { MathView } from './MathView';
import { Language } from '../utils/i18n';
import { WIKI_DATA } from '../utils/wikiData';
import { BookOpen, Check, HelpCircle, Table2 } from 'lucide-react';

interface KnowledgeWikiProps {
  lang?: Language;
}

export const KnowledgeWiki: React.FC<KnowledgeWikiProps> = ({ lang = 'en' }) => {
  const data = WIKI_DATA[lang] || WIKI_DATA.en;

  return (
    <article className="space-y-10 text-slate-800">
      {/* 1. Definition and Concept */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>{data.badge}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {data.conceptHeading}
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          {data.conceptIntro}
        </p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-sm">
          <div className="font-semibold text-slate-800">{data.mathNotationTitle}</div>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            {data.mathNotations.map((item, idx) => (
              <li key={idx}>
                {item.label}
                <span className="font-mono text-indigo-700 font-semibold ml-1.5">
                  <MathView math={item.formula} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Core Mathematical Properties */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {data.propertiesHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {data.properties.map((prop, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{prop.title}</span>
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                {prop.desc}
              </p>
              <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-indigo-900 font-semibold text-center">
                <MathView math={prop.formula} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Algorithm Comparison Table */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase">
          <Table2 className="w-4 h-4" />
          <span>{data.tableHeading}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {data.tableSubtitle}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-semibold">
              <tr>
                <th className="border border-slate-200 p-3">{data.tableHeaders[0]}</th>
                <th className="border border-slate-200 p-3">{data.tableHeaders[1]}</th>
                <th className="border border-slate-200 p-3">{data.tableHeaders[2]}</th>
                <th className="border border-slate-200 p-3">{data.tableHeaders[3]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.tableRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-200 p-3 font-semibold text-indigo-900">
                    {row[0]}
                  </td>
                  <td className="border border-slate-200 p-3 text-slate-600">
                    {row[1]}
                  </td>
                  <td className="border border-slate-200 p-3 text-slate-800 font-medium">
                    {row[2]}
                  </td>
                  <td className="border border-slate-200 p-3 text-slate-600">
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. FAQ Section for SEO */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider uppercase">
          <HelpCircle className="w-4 h-4" />
          <span>FAQ</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {data.faqsHeading}
        </h2>

        <div className="space-y-4">
          {data.faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
