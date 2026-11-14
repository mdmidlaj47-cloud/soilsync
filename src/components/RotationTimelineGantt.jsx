import React from 'react';
import { CROPS_DATABASE } from '../data/cropsDatabase';
import { Calendar, Sprout, ShieldCheck, ArrowDown, Sparkles } from 'lucide-react';

export default function RotationTimelineGantt({ selectedStrategy }) {
  if (!selectedStrategy) return null;

  const getCrop = (cropId) => {
    return CROPS_DATABASE.find(c => c.id === cropId) || {
      name: cropId === 'fallow' ? 'Bare Winter Fallow' : cropId,
      category: cropId === 'fallow' ? 'Fallow' : 'Crop',
      rootDepth: 20,
      rootType: 'None',
      nitrogenFixation: 0,
      color: cropId === 'fallow' ? '#EF4444' : '#64748B'
    };
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center">
            <span>Multi-Year Phenology & Root Architecture Gantt</span>
            <span className="ml-2.5 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-400 border border-purple-800">
              3-Year Cycle
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Visualizing cash crop windows, living cover crop bridges, and biological root depths down to 220cm.
          </p>
        </div>
      </div>

      {/* Strategy Title Banner */}
      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
            Selected Strategy
          </span>
          <h4 className="text-sm font-bold text-white">{selectedStrategy.title}</h4>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
          Match: {selectedStrategy.metrics.compositeScore}%
        </span>
      </div>

      {/* Multi-Year Timeline Grid */}
      <div className="space-y-4">
        {selectedStrategy.crops.map((item, idx) => {
          const crop = getCrop(item.cropId);
          const isFallow = item.cropId === 'fallow';

          return (
            <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: crop.color }} />
                  <span className="font-bold text-white text-sm">{crop.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    isFallow
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : item.cover
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : 'bg-blue-950 text-blue-300 border-blue-800'
                  }`}>
                    {item.season}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-300 font-medium">
                  {item.months}
                </span>
              </div>

              {/* Month Visual Bar */}
              <div className="grid grid-cols-12 gap-1 my-2">
                {months.map((m, mIdx) => {
                  return (
                    <div key={mIdx} className="text-center">
                      <div className="h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                           style={{
                             backgroundColor: isFallow ? 'rgba(239, 68, 68, 0.25)' : `${crop.color}35`,
                             border: `1px solid ${crop.color}60`,
                             color: isFallow ? '#FCA5A5' : '#F1F5F9'
                           }}>
                        {m}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Agronomic Details / Root Depth Indicator */}
              {!isFallow && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
                  <div>
                    <span className="text-slate-400 block">Root Architecture:</span>
                    <span className="font-semibold text-slate-200">{crop.rootType} ({crop.rootDepth}cm)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Biological N Fixation:</span>
                    <span className="font-semibold text-emerald-400 font-mono">
                      {crop.nitrogenFixation > 0 ? `+${crop.nitrogenFixation} kg N/ha` : '0 kg (Consumer)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Water ET Demand:</span>
                    <span className="font-semibold text-cyan-400 font-mono">{crop.seasonET} mm</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Pest Break Impact:</span>
                    <span className="font-semibold text-amber-300 truncate block">{crop.pestBreakValue || 'Moderate'}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
