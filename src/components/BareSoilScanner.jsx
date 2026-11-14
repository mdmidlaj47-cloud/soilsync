import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Thermometer, CloudRain, Sun, Sprout, Info } from 'lucide-react';

export default function BareSoilScanner({ selectedRegion, harmonizedData, selectedStrategy }) {
  const { monthlyClimate, nasaTelemetry } = selectedRegion;
  const { scenarioAdjusted } = harmonizedData;
  const [activeMonthIdx, setActiveMonthIdx] = useState(6); // Default July

  const activeMonth = monthlyClimate[activeMonthIdx];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-700/80 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center">
            <span>Bare Soil & Seasonal Vulnerability Scanner</span>
            <span className="ml-2.5 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">
              Landsat, MODIS & GPM Data
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Satellite phenology reveals extended fallow windows when exposed topsoil suffers rapid erosion, evaporation, and carbon oxidation.
          </p>
        </div>
      </div>

      {/* 12-Month Calendar Comparison Bars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider">Annual Ground Cover Trajectory (12 Months)</span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5" />Bare Unprotected Soil</span>
            <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" />Living Plant Shield / Cover</span>
          </div>
        </div>

        {/* Month Selector Buttons */}
        <div className="grid grid-cols-12 gap-1 sm:gap-2">
          {monthlyClimate.map((m, idx) => {
            const isSelected = activeMonthIdx === idx;
            return (
              <button
                key={m.month}
                onClick={() => setActiveMonthIdx(idx)}
                className={`py-2 px-1 text-center rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-md shadow-blue-900/50 scale-105'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border-slate-800'
                }`}
              >
                <span className="text-[11px] block">{m.month}</span>
                <span className={`w-2 h-2 rounded-full mx-auto mt-1 block ${
                  m.bare ? 'bg-rose-500' : 'bg-emerald-500'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Comparison Rows */}
        <div className="space-y-2 pt-2">
          {/* Baseline Row */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-rose-300">Baseline Conventional Monoculture</span>
              <span className="font-mono text-rose-400 font-bold">{nasaTelemetry.bareSoilDaysPerYear} Days Bare Soil / Year</span>
            </div>
            <div className="grid grid-cols-12 gap-1 h-3 rounded-md overflow-hidden bg-slate-950 p-0.5">
              {monthlyClimate.map((m, idx) => (
                <div
                  key={idx}
                  className={`h-full rounded-sm ${
                    m.bare ? 'bg-rose-600/90' : 'bg-emerald-600/90'
                  }`}
                  title={`${m.month}: ${m.bare ? 'Bare Soil' : 'Vegetated'}`}
                />
              ))}
            </div>
          </div>

          {/* Adapted Strategy Row */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-emerald-300">Field Shift Adapted Rotation (Living Armor)</span>
              <span className="font-mono text-emerald-400 font-bold">
                {selectedStrategy ? selectedStrategy.metrics.bareSoilDays : 25} Days Bare Soil / Year (85% Reduction)
              </span>
            </div>
            <div className="grid grid-cols-12 gap-1 h-3 rounded-md overflow-hidden bg-slate-950 p-0.5">
              {monthlyClimate.map((m, idx) => {
                // In adapted rotation, cover crops fill almost all bare months
                const isStillBare = idx === 3; // only brief spring window for seeding
                return (
                  <div
                    key={idx}
                    className={`h-full rounded-sm ${
                      isStillBare ? 'bg-amber-500/80' : 'bg-emerald-500'
                    }`}
                    title={`${m.month}: Continuous Cover Shield`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Month Climate & Satellite Telemetry Details */}
      <div className="glass-card p-4 rounded-xl border border-blue-900/50 bg-slate-900/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm">Month Details: {activeMonth.month}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              activeMonth.bare ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
            }`}>
              {activeMonth.bare ? 'Conventional Bare Window' : 'Vegetated Canopy Active'}
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Historical NASA POWER & GPM Climatology
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span>Mean Temp</span>
            </div>
            <span className="text-base font-bold font-mono text-white">{activeMonth.temp}°C</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {activeMonth.temp > 28 ? 'Heat Stress Alert' : activeMonth.temp < 0 ? 'Frost Risk Window' : 'Optimal Growth'}
            </span>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
              <span>GPM Rainfall</span>
            </div>
            <span className="text-base font-bold font-mono text-white">{activeMonth.rain} mm</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {activeMonth.bare && activeMonth.rain > 60 ? 'Severe Storm Runoff Risk' : 'Normal Seasonal Precip'}
            </span>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
              <Sun className="w-3.5 h-3.5 text-cyan-400" />
              <span>SMAP Moisture</span>
            </div>
            <span className="text-base font-bold font-mono text-white">{activeMonth.smapMoist} m³/m³</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {activeMonth.smapMoist < 0.15 ? 'Critical Root Deficit' : 'Soil Water Adequate'}
            </span>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span>Canopy NDVI</span>
            </div>
            <span className="text-base font-bold font-mono text-white">{activeMonth.ndvi}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {activeMonth.ndvi < 0.2 ? 'Bare / Stubble' : 'Dense Photosynthesis'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
