import React, { useState } from 'react';
import FieldMap from './FieldMap';
import NasaTelemetryPanel from './NasaTelemetryPanel';
import FarmerPriorities from './FarmerPriorities';
import RotationComparison from './RotationComparison';
import BareSoilScanner from './BareSoilScanner';
import RotationTimelineGantt from './RotationTimelineGantt';
import MultiSourceDataViewer from './MultiSourceDataViewer';

import { Satellite, Sprout, Droplets, Thermometer, Sparkles, AlertTriangle, Layers, Calendar, BarChart2, ShieldCheck, CheckCircle2, ChevronRight, Info } from 'lucide-react';

export default function SoilSyncDashboard({
  selectedRegion,
  onLocationChange,
  activeNasaLayer,
  setActiveNasaLayer,
  harmonizedData,
  strategies,
  selectedStrategyId,
  onSelectStrategy,
  onOpenDetailModal,
  farmerPriorities,
  onPriorityChange,
  soilParams,
  onSoilParamChange,
  constraints,
  onConstraintChange,
  onResetPriorities
}) {
  const [dashboardTab, setDashboardTab] = useState('overview'); // 'overview' | 'rotations' | 'soil' | 'weather' | 'timeline' | 'multisource'

  const { scenarioAdjusted, harmonizedIndices, rawTelemetry } = harmonizedData;
  const activeStrategy = strategies.find(s => s.id === selectedStrategyId) || strategies[0] || {};

  // NDVI calculation helper for active region
  const avgNdvi = selectedRegion.monthlyClimate.reduce((acc, m) => acc + m.ndvi, 0) / 12;

  return (
    <section id="dashboard" className="py-16 relative bg-[#0b1f15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#16A36A]/20 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#123D2A] text-[#16A36A] border border-[#16A36A]/40">
                SOILSYNC AG-AI COMMAND CENTER
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-mono text-[#3478C9] font-bold">
                {selectedRegion.name}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Interactive Smart Farming Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-[#E7F4E9]/80 mt-1 max-w-2xl font-normal">
              Real-time spaceborne observations and machine learning agronomy algorithms working together to monitor soil, predict stress, and adapt rotations.
            </p>
          </div>

          {/* Quick Dashboard Navigation Pills */}
          <div className="flex items-center space-x-1.5 bg-[#0e271b] p-1.5 rounded-2xl border border-[#16A36A]/25 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setDashboardTab('overview')}
              className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                dashboardTab === 'overview'
                  ? 'bg-[#16A36A] text-white font-bold shadow-md shadow-[#16A36A]/30'
                  : 'text-slate-300 hover:text-white hover:bg-[#123D2A]'
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Field Map & Sensors</span>
            </button>

            <button
              onClick={() => setDashboardTab('rotations')}
              className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                dashboardTab === 'rotations'
                  ? 'bg-[#16A36A] text-white font-bold shadow-md shadow-[#16A36A]/30'
                  : 'text-slate-300 hover:text-white hover:bg-[#123D2A]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Rotation Strategies (4)</span>
            </button>

            <button
              onClick={() => setDashboardTab('vulnerability')}
              className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                dashboardTab === 'vulnerability'
                  ? 'bg-[#16A36A] text-white font-bold shadow-md shadow-[#16A36A]/30'
                  : 'text-slate-300 hover:text-white hover:bg-[#123D2A]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>Bare Soil & Risks</span>
            </button>

            <button
              onClick={() => setDashboardTab('timeline')}
              className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                dashboardTab === 'timeline'
                  ? 'bg-[#16A36A] text-white font-bold shadow-md shadow-[#16A36A]/30'
                  : 'text-slate-300 hover:text-white hover:bg-[#123D2A]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#3478C9]" />
              <span>3-Yr Phenology Gantt</span>
            </button>

            <button
              onClick={() => setDashboardTab('multisource')}
              className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1.5 ${
                dashboardTab === 'multisource'
                  ? 'bg-[#16A36A] text-white font-bold shadow-md shadow-[#16A36A]/30'
                  : 'text-slate-300 hover:text-white hover:bg-[#123D2A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-300" />
              <span>USDA & OpenET Data</span>
            </button>
          </div>
        </div>

        {/* Top KPI Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* NDVI Metric */}
          <div className="glass-panel-soilsync p-3.5 rounded-2xl border border-[#16A36A]/25">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-semibold uppercase tracking-wider">Canopy NDVI</span>
              <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold font-mono text-white">0.82</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Peak Vigorous</span>
            </div>
            <div className="w-full bg-[#0a1d14] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#16A36A] h-full rounded-full" style={{ width: '82%' }} />
            </div>
          </div>

          {/* SMAP Root Moisture */}
          <div className="glass-panel-soilsync p-3.5 rounded-2xl border border-[#16A36A]/25">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-semibold uppercase tracking-wider">Root Moisture</span>
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold font-mono text-cyan-300">{scenarioAdjusted.smapRootZoneMoisture}</span>
              <span className="text-[10px] text-slate-400 font-mono">m³/m³</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">SMAP 0-100cm root zone</span>
          </div>

          {/* ECOSTRESS ESI */}
          <div className="glass-panel-soilsync p-3.5 rounded-2xl border border-[#16A36A]/25">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-semibold uppercase tracking-wider">Evap. Stress (ESI)</span>
              <span className="text-[10px] font-mono text-[#3478C9]">ISS 70m</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold font-mono text-[#3478C9]">{scenarioAdjusted.ecostressESI}</span>
              <span className="text-[10px] text-emerald-400 font-semibold">{scenarioAdjusted.ecostressESI > 0.6 ? 'Transpiring' : 'Stress'}</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">Actual / Potential ET</span>
          </div>

          {/* Annual Rainfall */}
          <div className="glass-panel-soilsync p-3.5 rounded-2xl border border-[#16A36A]/25">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-semibold uppercase tracking-wider">GPM Rainfall</span>
              <span className="text-[10px] font-mono text-blue-400">IMERG</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold font-mono text-blue-300">{scenarioAdjusted.gpmAnnualRainfall}</span>
              <span className="text-[10px] text-slate-400 font-mono">mm/yr</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">{scenarioAdjusted.gpmExtremeStormDays} severe storm days</span>
          </div>

          {/* Bare Ground Days */}
          <div className="glass-panel-soilsync p-3.5 rounded-2xl border border-[#16A36A]/25">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-semibold uppercase tracking-wider">Fallow Exposure</span>
              <span className="text-[10px] font-mono text-amber-400">Landsat</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold font-mono text-amber-300">{rawTelemetry.bareSoilDaysPerYear}</span>
              <span className="text-[10px] text-rose-400 font-semibold">Days Bare</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">Target with cover: &lt;30d</span>
          </div>

          {/* Active AI Recommendation Match */}
          <div className="glass-panel-soilsync p-3.5 rounded-2xl border border-[#16A36A]/40 bg-[#123D2A]/60">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-semibold uppercase tracking-wider text-[#16A36A]">AI Fit Match</span>
              <Sparkles className="w-3.5 h-3.5 text-[#16A36A]" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold font-mono text-white">{activeStrategy?.metrics?.compositeScore || 85}%</span>
              <span className="text-[10px] text-[#16A36A] font-bold">OPTIMIZED</span>
            </div>
            <span className="text-[10px] text-emerald-300 truncate block mt-1">
              {activeStrategy?.title ? activeStrategy.title.split(' ').slice(0, 2).join(' ') : 'Soil Health Regen'}
            </span>
          </div>
        </div>

        {/* TAB 1: OVERVIEW (FIELD MAP + SATELLITE TELEMETRY + FARMER OBJECTIVES) */}
        {dashboardTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Interactive Leaflet Satellite Field Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 px-1">
                <span className="font-bold uppercase tracking-wider text-[#E7F4E9] flex items-center">
                  <Satellite className="w-4 h-4 text-[#16A36A] mr-1.5" />
                  Live Field Boundary & Spaceborne Multi-Layer Map
                </span>
                <span className="text-slate-400 text-[11px]">
                  Coordinate Lock: {selectedRegion.lat.toFixed(4)}°N, {selectedRegion.lng.toFixed(4)}°W
                </span>
              </div>

              <FieldMap
                selectedRegion={selectedRegion}
                onLocationChange={onLocationChange}
                activeNasaLayer={activeNasaLayer}
                setActiveNasaLayer={setActiveNasaLayer}
              />
            </div>

            {/* NASA Telemetry Diagnostic Panel */}
            <NasaTelemetryPanel
              selectedRegion={selectedRegion}
              harmonizedData={harmonizedData}
            />

            {/* Multi-Source SSURGO & CropScape Data Viewer */}
            <MultiSourceDataViewer
              selectedRegion={selectedRegion}
            />

            {/* Farmer Objectives & Priorities */}
            <FarmerPriorities
              priorities={farmerPriorities}
              onPriorityChange={onPriorityChange}
              soilParams={soilParams}
              onSoilParamChange={onSoilParamChange}
              constraints={constraints}
              onConstraintChange={onConstraintChange}
              onResetPriorities={onResetPriorities}
            />
          </div>
        )}

        {/* TAB 2: AI ROTATION STRATEGIES (4 EVALUATED MODELS) */}
        {dashboardTab === 'rotations' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Priority sliders for immediate sensitivity testing */}
            <FarmerPriorities
              priorities={farmerPriorities}
              onPriorityChange={onPriorityChange}
              soilParams={soilParams}
              onSoilParamChange={onSoilParamChange}
              constraints={constraints}
              onConstraintChange={onConstraintChange}
              onResetPriorities={onResetPriorities}
            />

            {/* Rotation Comparison Cards */}
            <RotationComparison
              strategies={strategies}
              selectedStrategyId={selectedStrategyId}
              onSelectStrategy={onSelectStrategy}
              onOpenDetailModal={onOpenDetailModal}
            />

            {/* Multi-Source verification */}
            <MultiSourceDataViewer
              selectedRegion={selectedRegion}
            />
          </div>
        )}

        {/* TAB 3: BARE SOIL & RISK SCANNER */}
        {dashboardTab === 'vulnerability' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <BareSoilScanner
              selectedRegion={selectedRegion}
              harmonizedData={harmonizedData}
              selectedStrategy={activeStrategy}
            />

            <NasaTelemetryPanel
              selectedRegion={selectedRegion}
              harmonizedData={harmonizedData}
            />
          </div>
        )}

        {/* TAB 4: MULTI-YEAR TIMELINE GANTT */}
        {dashboardTab === 'timeline' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <RotationTimelineGantt
              selectedStrategy={activeStrategy}
            />

            <BareSoilScanner
              selectedRegion={selectedRegion}
              harmonizedData={harmonizedData}
              selectedStrategy={activeStrategy}
            />
          </div>
        )}

        {/* TAB 5: MULTI-SOURCE FEDERAL & GLOBAL DATA */}
        {dashboardTab === 'multisource' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <MultiSourceDataViewer
              selectedRegion={selectedRegion}
            />

            <NasaTelemetryPanel
              selectedRegion={selectedRegion}
              harmonizedData={harmonizedData}
            />
          </div>
        )}
      </div>
    </section>
  );
}
