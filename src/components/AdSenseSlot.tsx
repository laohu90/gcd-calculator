import React from 'react';
import { Language } from '../utils/i18n';

interface AdSenseSideRailProps {
  position: 'left' | 'right';
  slotId?: string;
  lang?: Language;
}

/**
 * Standard Skyscraper Ad Unit (160x600) for Left & Right Margins.
 * Returns null if no live ad or ad client is enabled, adhering to user requirement:
 * "侧面的广告栏没有广告不要显示出来" (Do not display side ad rails when there are no ads).
 */
export const AdSenseSideRail: React.FC<AdSenseSideRailProps> = ({
  position,
  slotId = 'SKYSCRAPER_01',
  lang = 'en',
}) => {
  // Check if ads are explicitly enabled via environment variable or ad script
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true';

  if (!adsEnabled) {
    return null;
  }

  const labels = {
    en: {
      sponsored: 'Sponsored Ad',
      title: '160×600 Skyscraper',
      desc: 'Left & Right side rails for Google AdSense',
      ready: 'Google AdSense Ready',
    },
    es: {
      sponsored: 'Patrocinado',
      title: '160×600 Banner lateral',
      desc: 'Espacio lateral para Google AdSense',
      ready: 'Espacio publicitario',
    },
    fr: {
      sponsored: 'Sponsorisé',
      title: '160×600 Gratte-ciel',
      desc: 'Bandeaux latéraux Google AdSense',
      ready: 'Emplacement publicitaire',
    },
    pt: {
      sponsored: 'Patrocinado',
      title: '160×600 Arranha-céu',
      desc: 'Painéis laterais para Google AdSense',
      ready: 'Espaço publicitário',
    },
    zh: {
      sponsored: '赞助商展示栏',
      title: '160×600 侧边栏广告',
      desc: '左右两侧原生广告位，不遮挡核心内容',
      ready: 'Google AdSense 规范尺寸预留',
    },
  }[lang];

  return (
    <aside
      aria-label={position === 'left' ? 'Left Advertisement' : 'Right Advertisement'}
      className="hidden 2xl:flex flex-col items-center w-[160px] shrink-0 sticky top-20 self-start no-print select-none"
    >
      <div className="w-[160px] h-[600px] rounded-xl border border-slate-200 bg-white shadow-xs p-3 flex flex-col justify-between text-center overflow-hidden">
        {/* Top small label */}
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium border-b border-slate-100 pb-1.5">
          {labels.sponsored}
        </div>

        {/* Center content */}
        <div className="my-auto space-y-2 py-4">
          <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-mono text-xs font-bold">
            AD
          </div>
          <div className="text-xs font-semibold text-slate-700">
            {labels.title}
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            {labels.desc}
          </p>
        </div>

        {/* Bottom small hint */}
        <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-1.5">
          {labels.ready}
        </div>
      </div>
    </aside>
  );
};
