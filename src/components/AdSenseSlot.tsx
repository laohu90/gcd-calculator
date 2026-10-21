import React from 'react';

interface AdSenseSideRailProps {
  position: 'left' | 'right';
  slotId?: string;
  lang?: 'zh' | 'en';
}

/**
 * Standard Skyscraper Ad Unit (160x600 / 120x600) for Left & Right Margins
 * Follows Google Publisher Policies and does not disrupt main content.
 */
export const AdSenseSideRail: React.FC<AdSenseSideRailProps> = ({
  position,
  slotId = 'SKYSCRAPER_01',
  lang = 'zh',
}) => {
  const isZh = lang === 'zh';

  return (
    <aside
      aria-label={position === 'left' ? 'Left Advertisement' : 'Right Advertisement'}
      className="hidden 2xl:flex flex-col items-center w-[160px] shrink-0 sticky top-20 self-start no-print select-none"
    >
      <div className="w-[160px] h-[600px] rounded-xl border border-slate-200 bg-white shadow-xs p-3 flex flex-col justify-between text-center overflow-hidden">
        {/* Top small label */}
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium border-b border-slate-100 pb-1.5">
          {isZh ? '赞助商侧栏' : 'Sponsored'}
        </div>

        {/* Center content */}
        <div className="my-auto space-y-2 py-4">
          <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-mono text-xs font-bold">
            AD
          </div>
          <div className="text-xs font-semibold text-slate-700">
            {isZh ? '160×600 侧边栏广告' : '160×600 Skyscraper'}
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            {isZh
              ? '左右两侧原生广告位，不遮挡核心内容'
              : 'Left & Right side rails for Google AdSense'}
          </p>
        </div>

        {/* Bottom small hint */}
        <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-1.5">
          {isZh ? '上线后载入代码' : 'Ready for AdSense'}
        </div>
      </div>
    </aside>
  );
};
