import React, { useState } from 'react';
import { X, Satellite, BookOpen, Layers, CheckCircle2, Cpu, Radio, ShieldCheck, ExternalLink } from 'lucide-react';
import { NASA_DATASETS } from '../data/nasaData';

export default function SatelliteGlossaryModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('missions'); // 'missions' | 'terms' | 'groundtruth'

  const scientificTerms = [
    {
      term: 'Evapotranspiration (ET) & Evaporative Stress Index (ESI)',
      formula: 'ESI = Actual ET / Potential ET (PET)',
      explanation: 'ET measures the total water transferred from soil and plant transpiration to the atmosphere. When crops lack root water, stomata close, reducing transpiration and raising leaf temperature. ECOSTRESS measures this thermal signature from space to detect stress days before leaves visually wilt.'
    },
    {
      term: 'Volumetric Soil Moisture (m³/m³) & SMAP Anomaly',
      formula: 'θ = Volume of Water / Total Soil Volume',
      explanation: 'Expressed as cubic meters of water per cubic meter of soil. Typical field capacities range from 0.28 to 0.36 m³/m³. SMAP anomalies compare current root-zone moisture (0-100cm) against a 10-year satellite baseline to detect hydrological drought.'
    },
    {
      term: 'Normalized Difference Vegetation Index (NDVI)',
      formula: 'NDVI = (NIR - Red) / (NIR + Red)',
      explanation: 'Chlorophyll absorbs red light while healthy leaf mesophyll cell structures strongly scatter near-infrared (NIR). NDVI tracks crop canopy coverage and photosynthetic vigor. Crucially, when NDVI drops below 0.20, it flags exposed bare fallow topsoil.'
    },
    {
      term: 'Terrestrial Water Storage Anomaly (TWSA - GRACE)',
      formula: 'ΔS = Groundwater + Soil Moisture + Surface Water + Snow',
      explanation: 'GRACE twin satellites measure minute variations in Earth’s gravitational field caused by the movement of water mass. A persistent negative trend (e.g. -2.5 cm/yr) indicates deep regional aquifer overdraft that irrigation pumps cannot sustain indefinitely.'
    },
    {
      term: 'Growing Degree Days (GDD) & Frost Risk Envelopes',
      formula: 'GDD = Σ [ ((Tmax + Tmin) / 2) - Tbase ]',
      explanation: 'NASA POWER models daily thermal accumulation driving crop phenology. By comparing local GDD accumulation rates and historical first/last freeze dates, farmers can safely sequence double crops and winter cover crops without freeze-kill risk.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border-b border-slate-700">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">NASA Earth Observations & Science Guide</h2>
              <p className="text-xs text-slate-400">
                Demystifying satellite data, remote sensing terms, and ground-truth sensor integration.
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

        {/* Sub-Tabs */}
        <div className="flex border-b border-slate-800 px-6 pt-2 bg-slate-950/50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('missions')}
            className={`py-2 px-3 border-b-2 transition-all ${
              activeTab === 'missions'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            NASA Satellite Missions (7 Sensors)
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-2 px-3 border-b-2 transition-all ${
              activeTab === 'terms'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Remote Sensing Scientific Glossary
          </button>
          <button
            onClick={() => setActiveTab('groundtruth')}
            className={`py-2 px-3 border-b-2 transition-all ${
              activeTab === 'groundtruth'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Satellite vs Ground-Truth In-Situ Probes
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {/* TAB 1: MISSIONS */}
          {activeTab === 'missions' && (
            <div className="space-y-3.5">
              {NASA_DATASETS.map((d) => (
                <div key={d.id} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="font-bold text-white text-sm flex items-center">
                      <Satellite className="w-4 h-4 text-cyan-400 mr-2 shrink-0" />
                      {d.name}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                      Res: {d.resolution}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {d.agriculturalUse}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                    <div>
                      <span className="text-slate-400">Sensor: </span>
                      <span className="text-slate-200 font-mono">{d.sensor}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Units: </span>
                      <span className="text-emerald-300 font-mono">{d.unit}</span>
                    </div>
                    {d.url && (
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                      >
                        <span>Official Data Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              {scientificTerms.map((t, idx) => (
                <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                    <h4 className="font-bold text-white text-sm">{t.term}</h4>
                    <span className="text-[11px] font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {t.formula}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {t.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: GROUND TRUTH VS SATELLITE */}
          {activeTab === 'groundtruth' && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-emerald-950/30 border border-slate-700">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center">
                  <Radio className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                  Why Combining Satellite Observations with Ground In-Situ Measurements is Essential
                </h4>
                <p className="leading-relaxed">
                  Neither spaceborne satellites nor physical field sensors alone provide the complete agricultural picture. Data fusion unites the macro-scale coverage of satellites with the pinpoint calibration of ground instruments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <h5 className="font-bold text-cyan-300 text-sm mb-2 flex items-center">
                    <Satellite className="w-4 h-4 mr-1.5" />
                    Satellite Observations (Space)
                  </h5>
                  <ul className="space-y-2 text-[11px]">
                    <li className="flex items-start space-x-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span><strong>Complete Spatial Coverage:</strong> Measures entire fields, counties, and watersheds uniformly without blind spots.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span><strong>Historical Consistency:</strong> 40+ years of Landsat & MODIS records enable benchmarking against past 1-in-50 year droughts.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="text-rose-400 font-bold">⚠</span>
                      <span><strong>Limitation:</strong> Radiometers average over large footprints and can be obscured by dense clouds or high vegetation canopies.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <h5 className="font-bold text-emerald-300 text-sm mb-2 flex items-center">
                    <Radio className="w-4 h-4 mr-1.5" />
                    Ground Sensors (In-Situ)
                  </h5>
                  <ul className="space-y-2 text-[11px]">
                    <li className="flex items-start space-x-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span><strong>Direct Physical Depth:</strong> TDR and capacitance probes measure moisture at exact 10cm, 30cm, and 60cm soil horizons continuously.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span><strong>Instantaneous Response:</strong> Eddy covariance flux towers and on-farm weather stations record second-by-second wind and rain.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="text-rose-400 font-bold">⚠</span>
                      <span><strong>Limitation:</strong> Highly localized point measurements ($&lt;1m^2$ footprint) that can miss spatial soil heterogeneity across large 160-acre fields.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-bold text-slate-100 block mb-1">
                  The Field Shift Hybrid Data Fusion Protocol:
                </span>
                <p className="text-[11px] text-slate-400">
                  Use SMAP, ECOSTRESS, and GPM to spot broad regional drought fronts, bare fallow erosion windows, and historical climate shifts, then validate local soil texture, hardpan depth, and seedbed moisture with a handheld penetrometer and soil corer before final planter pass.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Sources: NASA Earthdata, JPL, Goddard Space Flight Center</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
