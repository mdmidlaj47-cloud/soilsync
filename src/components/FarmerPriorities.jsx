import React from 'react';
import { Sliders, Wrench, Sprout, Droplets, DollarSign, Shield, Zap, Bug, RefreshCw } from 'lucide-react';

export default function FarmerPriorities({
  priorities,
  onPriorityChange,
  soilParams,
  onSoilParamChange,
  constraints,
  onConstraintChange,
  onResetPriorities
}) {
  const priorityItems = [
    {
      key: 'waterConservation',
      label: 'Water Conservation & Drought Defense',
      desc: 'Prioritizes low-ET crops, deep root scavenging, and soil moisture blankets.',
      icon: Droplets,
      color: 'text-cyan-400',
      accent: 'accent-cyan-400'
    },
    {
      key: 'soilHealth',
      label: 'Soil Health & Organic Matter (SOM)',
      desc: 'Maximizes living root duration, mycorrhizal fungi, and carbon sequestration.',
      icon: Sprout,
      color: 'text-emerald-400',
      accent: 'accent-emerald-400'
    },
    {
      key: 'profitability',
      label: 'Economic Return & Cash Flow',
      desc: 'Protects gross cash margin $/ha and commodity market liquidity.',
      icon: DollarSign,
      color: 'text-yellow-400',
      accent: 'accent-yellow-400'
    },
    {
      key: 'erosionControl',
      label: 'Erosion & Storm Runoff Defense',
      desc: 'Maintains fibrous root anchoring to halt rill/gully loss on slopes.',
      icon: Shield,
      color: 'text-rose-400',
      accent: 'accent-rose-400'
    },
    {
      key: 'fertilizerReduction',
      label: 'Biological N-Fixation (Fertilizer Cut)',
      desc: 'Uses high-yielding legumes to slash synthetic nitrogen purchases.',
      icon: Zap,
      color: 'text-purple-400',
      accent: 'accent-purple-400'
    },
    {
      key: 'pestManagement',
      label: 'Weed & Pest Cycle Disruption',
      desc: 'Breaks insect egg banks, rootworm, nematodes, and herbicide-resistant weeds.',
      icon: Bug,
      color: 'text-amber-400',
      accent: 'accent-amber-400'
    }
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-700/80 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-emerald-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Farmer Objectives & Constraints</h3>
            <p className="text-xs text-slate-400">
              Customize weighting to calibrate rotation algorithms to your management goals and field equipment.
            </p>
          </div>
        </div>
        <button
          onClick={onResetPriorities}
          title="Reset to Balanced Defaults"
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sliders Grid */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
          <span>Priority Weighting (Interactive Sliders)</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {priorityItems.map((item) => {
            const Icon = item.icon;
            const val = priorities[item.key];
            return (
              <div key={item.key} className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                    {val}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight mb-2.5">
                  {item.desc}
                </p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={val}
                  onChange={(e) => onPriorityChange(item.key, Number(e.target.value))}
                  className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${item.accent}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Soil & Constraints Selector */}
      <div className="border-t border-slate-800/80 pt-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
          <Wrench className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
          <span>Field Soil Information & Operational Constraints</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Soil Texture */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <label className="block text-slate-400 font-medium mb-1.5">Soil Texture Class</label>
            <select
              value={soilParams.texture}
              onChange={(e) => onSoilParamChange('texture', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="Silt Loam">Silt Loam (High AWC)</option>
              <option value="Sandy Loam">Sandy Loam (Fast Infiltration)</option>
              <option value="Clay Loam">Clay Loam (Moderate Drainage)</option>
              <option value="Heavy Clay">Heavy Clay (Cracking/Slow)</option>
              <option value="Coarse Sand">Coarse Sand (High Leaching)</option>
            </select>
          </div>

          {/* Baseline SOM % */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-400 font-medium">Baseline SOM</label>
              <span className="font-mono font-bold text-emerald-400">{soilParams.baselineSOM}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6.0"
              step="0.1"
              value={soilParams.baselineSOM}
              onChange={(e) => onSoilParamChange('baselineSOM', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="text-[10px] text-slate-400 block mt-1">Laboratory soil test organic matter</span>
          </div>

          {/* Irrigation Availability */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <label className="block text-slate-400 font-medium mb-1.5">Irrigation Capacity</label>
            <select
              value={constraints.irrigation}
              onChange={(e) => onConstraintChange('irrigation', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="rainfed">100% Rainfed (Dryland)</option>
              <option value="drip">Subsurface Drip (High Efficiency)</option>
              <option value="pivot">Center Pivot (Supplemental)</option>
              <option value="flood">Surface / Furrow (High Volume)</option>
            </select>
          </div>

          {/* Machinery on Hand */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <label className="block text-slate-400 font-medium mb-1.5">Primary Seeding Equipment</label>
            <select
              value={constraints.machinery}
              onChange={(e) => onConstraintChange('machinery', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="notill">No-Till Drill + Roller Crimper</option>
              <option value="standard">Standard Row Planter + Drill</option>
              <option value="broadcast">Air Seeder / Broadcast Interseeder</option>
              <option value="tillage">Conventional Chisel / Disking</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
