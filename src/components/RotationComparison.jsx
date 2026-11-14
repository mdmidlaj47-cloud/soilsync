import React from 'react';
import { CROPS_DATABASE } from '../data/cropsDatabase';
import { Award, Droplet, Sprout, ShieldCheck, DollarSign, ArrowRight, Zap, CheckCircle2, ChevronRight, AlertCircle, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RotationComparison({
  strategies,
  selectedStrategyId,
  onSelectStrategy,
  onOpenDetailModal
}) {
  const getCropInfo = (cropId) => {
    return CROPS_DATABASE.find(c => c.id === cropId) || {
      name: cropId === 'fallow' ? 'Winter Fallow' : cropId,
      category: cropId === 'fallow' ? 'Exposed Fallow' : 'Crop',
      color: cropId === 'fallow' ? '#EF4444' : '#64748B'
    };
  };

  const handleAdoptStrategy = (s) => {
    onSelectStrategy(s.id);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center">
            <span>Rotation Strategies Comparison</span>
            <span className="ml-2.5 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
              4 Evaluated Scenarios
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Compare long-term soil health, water demand, synthetic fertilizer cuts, and erosion reduction against baseline farm practice.
          </p>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((strategy) => {
          const isSelected = selectedStrategyId === strategy.id;
          const m = strategy.metrics;

          // Theme styling based on strategy type
          let headerBadge = 'bg-slate-800 text-slate-300 border-slate-700';
          let borderStyle = isSelected ? 'ring-2 ring-emerald-500 border-emerald-500 shadow-emerald-900/30' : 'border-slate-800/90';
          if (strategy.type === 'baseline') {
            headerBadge = 'bg-rose-950/70 text-rose-300 border-rose-800/60';
          } else if (strategy.type === 'water') {
            headerBadge = 'bg-cyan-950/70 text-cyan-300 border-cyan-800/60';
          } else if (strategy.type === 'regenerative') {
            headerBadge = 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60';
          } else if (strategy.type === 'adaptive') {
            headerBadge = 'bg-indigo-950/70 text-indigo-300 border-indigo-800/60';
          }

          return (
            <div
              key={strategy.id}
              className={`glass-panel rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 shadow-xl ${borderStyle} ${
                isSelected ? 'bg-slate-900/90' : 'hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header & Match Score */}
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${headerBadge}`}>
                    {strategy.type.toUpperCase()}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Farmer Fit</span>
                    <span className={`text-xl font-extrabold font-mono ${
                      m.compositeScore >= 80 ? 'text-emerald-400' : m.compositeScore >= 65 ? 'text-cyan-400' : 'text-slate-400'
                    }`}>
                      {m.compositeScore}%
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-tight">
                  {strategy.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {strategy.subtitle}
                </p>

                {/* Crops in Rotation Sequence */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                    Rotation Sequence:
                  </span>
                  <div className="space-y-1.5">
                    {strategy.crops.map((c, i) => {
                      const crop = getCropInfo(c.cropId);
                      return (
                        <div key={i} className="flex items-center justify-between text-xs bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: crop.color }} />
                            <span className="font-semibold text-slate-200 truncate max-w-[130px]">{crop.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{c.months}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Impact Numbers */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">5-Yr SOM Delta</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      +{m.projectedSOMGain5Yr}%
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Water Saved</span>
                    <span className="font-mono font-bold text-cyan-400 text-sm">
                      {m.waterSavedM3PerHa} m³/ha
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Synthetic N Cut</span>
                    <span className="font-mono font-bold text-purple-400 text-sm">
                      {m.syntheticNReducedKg} kg/ha
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Erosion Reduction</span>
                    <span className="font-mono font-bold text-rose-400 text-sm">
                      {m.soilLossReductionPct}%
                    </span>
                  </div>
                </div>

                {/* Score Progress Meters */}
                <div className="mt-4 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Soil Health:</span>
                    <span className="font-mono font-bold text-emerald-300">{m.soilHealthScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${m.soilHealthScore}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Water Resilience:</span>
                    <span className="font-mono font-bold text-cyan-300">{m.waterResilienceScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${m.waterResilienceScore}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Gross Margin:</span>
                    <span className="font-mono font-bold text-yellow-300">${m.netGrossMargin}/ha</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${m.economicScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => onOpenDetailModal(strategy)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 flex items-center justify-center space-x-1.5 transition-all active:scale-98"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NASA Evidence & Risks</span>
                </button>

                <button
                  onClick={() => handleAdoptStrategy(strategy)}
                  className={`w-full py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-98 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/25'
                      : 'bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-700/50'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>Active Rotation Choice</span>
                    </>
                  ) : (
                    <>
                      <span>Select This Strategy</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
