import React from 'react';
import { BENCHMARK_REGIONS } from '../data/nasaData';
import { Globe, Satellite, Sliders, BookOpen, Printer, AlertTriangle, ShieldCheck, Sparkles, Database } from 'lucide-react';

export default function Header({
  selectedRegion,
  onSelectRegion,
  onOpenScenarioModal,
  onOpenGlossaryModal,
  onOpenReportModal,
  activeTab,
  setActiveTab
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & NASA Branding */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-700 to-emerald-600 shadow-lg shadow-blue-900/30 ring-1 ring-white/20">
              <span className="text-xl">🌱</span>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                  Field Shift
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-950/80 text-cyan-300 border border-cyan-800/60">
                  NASA Earth Data
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Adapting Farm Crop Rotations with Satellite Observations & Soil Science
              </p>
            </div>
          </div>

          {/* Region Selector dropdown */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <label htmlFor="region-select" className="sr-only">Select Agricultural Region</label>
              <div className="flex items-center bg-slate-900/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 shadow-inner">
                <Globe className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                <select
                  id="region-select"
                  value={selectedRegion.id}
                  onChange={(e) => {
                    const r = BENCHMARK_REGIONS.find(item => item.id === e.target.value);
                    if (r) onSelectRegion(r);
                  }}
                  className="bg-transparent text-xs sm:text-sm text-slate-100 font-medium focus:outline-none cursor-pointer pr-2"
                >
                  {BENCHMARK_REGIONS.map((r) => (
                    <option key={r.id} value={r.id} className="bg-slate-900 text-slate-200">
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick action buttons */}
            <button
              onClick={onOpenScenarioModal}
              title="Climate Shift Simulator"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-950/70 hover:bg-indigo-900/90 text-indigo-200 border border-indigo-700/50 transition-all shadow-sm active:scale-95"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Climate Shift</span>
            </button>

            <button
              onClick={onOpenGlossaryModal}
              title="NASA Satellite Data Glossary & Ground Truth"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all shadow-sm active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Satellite Data Guide</span>
            </button>

            <button
              onClick={onOpenReportModal}
              title="Generate Farmer & Agronomist Advisory Report"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all shadow-md shadow-emerald-950/40 active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Advisory Report</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-t border-slate-800/60 py-1.5 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'explore'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>Interactive Map & NASA Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('rotations')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'rotations'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Rotation Strategies Comparison (4 Models)</span>
          </button>

          <button
            onClick={() => setActiveTab('vulnerabilities')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'vulnerabilities'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Bare Soil & Seasonal Risk Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'timeline'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
            <span>Multi-Year Phenology & Root Gantt</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'resources'
                ? 'bg-cyan-600 text-white shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Data Sources & Resources (25)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
