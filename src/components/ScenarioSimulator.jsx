import React from 'react';
import { X, Sliders, AlertTriangle, Thermometer, CloudRain, Zap, RefreshCw, Sparkles } from 'lucide-react';

export default function ScenarioSimulator({ scenario, onScenarioChange, onClose }) {
  const setPreset = (t, r, s) => {
    onScenarioChange({
      tempDelta: t,
      rainDelta: r,
      extremeStormDelta: s
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-slate-900 border border-indigo-700/60 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-800/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-900/80 border border-indigo-600 text-indigo-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Climate Shift Scenario Simulator</h2>
              <p className="text-xs text-indigo-200/80">
                Test rotation resilience against temperature anomalies and rainfall disruptions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Preset Buttons */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Climate Vulnerability Presets:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setPreset(0, 0, 0)}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-left"
              >
                <span className="font-semibold block">Baseline Normals</span>
                <span className="text-[10px] text-slate-400">Current NASA Climatology</span>
              </button>
              <button
                onClick={() => setPreset(1.5, -15, 25)}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-left"
              >
                <span className="font-semibold block text-amber-300">Moderate Warming (+1.5°C)</span>
                <span className="text-[10px] text-slate-400">-15% Rain, +25% Storms</span>
              </button>
              <button
                onClick={() => setPreset(3.0, -30, 10)}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-left"
              >
                <span className="font-semibold block text-rose-300">Severe Flash Drought (+3.0°C)</span>
                <span className="text-[10px] text-slate-400">-30% Rain, High Heat Spikes</span>
              </button>
              <button
                onClick={() => setPreset(1.0, 25, 60)}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-left"
              >
                <span className="font-semibold block text-blue-300">Erosive Deluge (+1.0°C)</span>
                <span className="text-[10px] text-slate-400">+25% Rain, +60% Extreme Storms</span>
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            {/* Temperature Slider */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200 flex items-center">
                  <Thermometer className="w-4 h-4 text-amber-400 mr-1.5" />
                  Mean Temperature Shift
                </span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  scenario.tempDelta > 0 ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {scenario.tempDelta > 0 ? `+${scenario.tempDelta}` : scenario.tempDelta}°C
                </span>
              </div>
              <input
                type="range"
                min="-1.0"
                max="4.0"
                step="0.5"
                value={scenario.tempDelta}
                onChange={(e) => onScenarioChange({ ...scenario, tempDelta: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Each +1°C adds ~6 days of extreme heat (&gt;35°C) during critical pollination windows.
              </span>
            </div>

            {/* Precipitation Slider */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200 flex items-center">
                  <CloudRain className="w-4 h-4 text-cyan-400 mr-1.5" />
                  Annual Precipitation Anomaly
                </span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  scenario.rainDelta < 0 ? 'bg-rose-950 text-rose-300' : scenario.rainDelta > 0 ? 'bg-blue-950 text-blue-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {scenario.rainDelta > 0 ? `+${scenario.rainDelta}` : scenario.rainDelta}%
                </span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="5"
                value={scenario.rainDelta}
                onChange={(e) => onScenarioChange({ ...scenario, rainDelta: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Simulates multi-year droughts or seasonal precipitation surplus.
              </span>
            </div>

            {/* Extreme Storms Slider */}
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200 flex items-center">
                  <Zap className="w-4 h-4 text-purple-400 mr-1.5" />
                  Extreme Cloudburst Frequency (&gt;50mm/24h)
                </span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  scenario.extremeStormDelta > 0 ? 'bg-purple-950 text-purple-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {scenario.extremeStormDelta > 0 ? `+${scenario.extremeStormDelta}` : scenario.extremeStormDelta}%
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="100"
                step="10"
                value={scenario.extremeStormDelta}
                onChange={(e) => onScenarioChange({ ...scenario, extremeStormDelta: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                GPM IMERG convective cloudbursts that detach topsoil particles and drive gully erosion.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={() => setPreset(0, 0, 0)}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Climatology</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Apply Scenario
          </button>
        </div>
      </div>
    </div>
  );
}
