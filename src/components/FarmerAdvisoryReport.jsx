import React from 'react';
import { X, Printer, Download, CheckCircle, AlertTriangle, ShieldCheck, UserCheck, FileText, Globe, Droplet, Sprout } from 'lucide-react';

export default function FarmerAdvisoryReport({
  selectedRegion,
  harmonizedData,
  strategies,
  selectedStrategyId,
  soilParams,
  farmerPriorities,
  onClose
}) {
  const { scenarioAdjusted, harmonizedIndices, rawTelemetry } = harmonizedData;
  const activeStrategy = strategies.find(s => s.id === selectedStrategyId) || strategies[2];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-4 sm:my-8 bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-300 print:m-0 print:border-none print:shadow-none">
        {/* Screen-Only Header Bar */}
        <div className="no-print flex items-center justify-between p-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Farmer & Agronomist Advisory Report (Print / PDF Ready)</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-900 bg-white">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-blue-900">
                  FIELD SHIFT
                </span>
                <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">
                  NASA Earth Observations Advisory
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 mt-1">
                Crop Rotation Adaptation & Soil Health Strategy Report
              </h1>
              <p className="text-xs text-slate-600">
                Decision Support Protocol | Prepared for Agricultural Operator & Agronomic Advisor Review
              </p>
            </div>

            <div className="text-right text-xs text-slate-600 font-mono">
              <div>Date Generated: {new Date().toLocaleDateString()}</div>
              <div>Report ID: FS-NASA-{Math.floor(Math.random() * 89999 + 10000)}</div>
              <div className="text-emerald-700 font-bold">Status: Ready for Field Validation</div>
            </div>
          </div>

          {/* Section 1: Field Coordinates & Baseline Soil Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px] mb-1">
                Field Location & Agro-Ecological Biome
              </span>
              <div className="font-bold text-sm text-slate-900">{selectedRegion.name}</div>
              <div className="font-mono text-slate-600 mt-0.5">
                Coordinates: {selectedRegion.lat.toFixed(4)}°N, {selectedRegion.lng.toFixed(4)}°W
              </div>
              <div className="text-slate-600">Elevation: {selectedRegion.elevation}m | Slope Gradient: {selectedRegion.slope}% (SRTM 30m)</div>
              <div className="text-slate-600 mt-1">Biome: {selectedRegion.biome}</div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px] mb-1">
                Soil Profile & Hydrological Parameters
              </span>
              <div>Soil Class: <strong className="text-slate-900">{selectedRegion.soilType}</strong></div>
              <div>Texture: <strong className="text-slate-900">{soilParams.texture}</strong></div>
              <div>Baseline SOM: <strong className="text-emerald-700">{soilParams.baselineSOM}%</strong></div>
              <div>Drainage: <span className="text-slate-700">{selectedRegion.drainage}</span></div>
            </div>
          </div>

          {/* Section 2: NASA Satellite Telemetry Diagnostic Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center">
              <span>NASA Earth Observations Diagnostic Summary (Harmonized)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block font-mono">SMAP Moisture</span>
                <span className="font-bold text-slate-900 font-mono text-sm">{scenarioAdjusted.smapRootZoneMoisture} m³/m³</span>
                <span className="text-[10px] text-slate-600 block">Root-Zone 0-100cm</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block font-mono">ECOSTRESS ESI</span>
                <span className="font-bold text-slate-900 font-mono text-sm">ESI {scenarioAdjusted.ecostressESI}</span>
                <span className="text-[10px] text-slate-600 block">Actual/Potential ET</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block font-mono">GPM Rainfall</span>
                <span className="font-bold text-slate-900 font-mono text-sm">{scenarioAdjusted.gpmAnnualRainfall} mm</span>
                <span className="text-[10px] text-slate-600 block">{scenarioAdjusted.gpmExtremeStormDays} deluge days</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block font-mono">Landsat Bare Soil</span>
                <span className="font-bold text-rose-700 font-mono text-sm">{rawTelemetry.bareSoilDaysPerYear} Days/yr</span>
                <span className="text-[10px] text-slate-600 block">Exposed topsoil</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block font-mono">NASA POWER Heat</span>
                <span className="font-bold text-slate-900 font-mono text-sm">{scenarioAdjusted.heatDaysAbove35} Days &gt;35°C</span>
                <span className="text-[10px] text-slate-600 block">Pollination hazard</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block font-mono">GRACE Aquifer</span>
                <span className="font-bold text-slate-900 font-mono text-sm">{scenarioAdjusted.graceGroundwaterTrend} cm/yr</span>
                <span className="text-[10px] text-slate-600 block">Gravity trend</span>
              </div>
            </div>
          </div>

          {/* Section 3: Rotation Strategies Comparison Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Evaluated Crop Rotation Strategies
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-2.5 font-bold">Strategy</th>
                    <th className="p-2.5 font-bold">Fit Score</th>
                    <th className="p-2.5 font-bold">5-Yr SOM</th>
                    <th className="p-2.5 font-bold">Water Saved</th>
                    <th className="p-2.5 font-bold">Synth. N Cut</th>
                    <th className="p-2.5 font-bold">Erosion Cut</th>
                    <th className="p-2.5 font-bold">Bare Days</th>
                    <th className="p-2.5 font-bold">Net Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {strategies.map((s) => {
                    const isRec = s.id === activeStrategy.id;
                    const m = s.metrics;
                    return (
                      <tr key={s.id} className={isRec ? 'bg-emerald-50/70 font-semibold' : ''}>
                        <td className="p-2.5">
                          <div className="font-bold text-slate-900 flex items-center">
                            {s.title}
                            {isRec && (
                              <span className="ml-1.5 px-1.5 py-0.2 rounded text-[9px] bg-emerald-600 text-white font-bold">
                                RECOMMENDED
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 font-normal">{s.subtitle}</div>
                        </td>
                        <td className="p-2.5 font-mono font-bold text-slate-900">{m.compositeScore}%</td>
                        <td className="p-2.5 font-mono text-emerald-700">+{m.projectedSOMGain5Yr}%</td>
                        <td className="p-2.5 font-mono text-cyan-700">{m.waterSavedM3PerHa} m³</td>
                        <td className="p-2.5 font-mono text-purple-700">-{m.syntheticNReducedKg} kg</td>
                        <td className="p-2.5 font-mono text-rose-700">-{m.soilLossReductionPct}%</td>
                        <td className="p-2.5 font-mono text-slate-700">{m.bareSoilDays} d</td>
                        <td className="p-2.5 font-mono text-slate-900">${m.netGrossMargin}/ha</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Recommended Strategy Deep Dive */}
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 text-xs space-y-2">
            <h3 className="font-bold text-emerald-950 text-sm flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-700 mr-2" />
              Agronomic Rationale for Recommended Plan: {activeStrategy.title}
            </h3>
            <p className="text-slate-800 leading-relaxed">
              {activeStrategy.whySuggested}
            </p>
            <div className="pt-2 border-t border-emerald-200/80">
              <span className="font-bold text-slate-900 block mb-1">Rotation Sequence:</span>
              <div className="flex flex-wrap gap-2">
                {activeStrategy.crops.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white border border-emerald-300 text-slate-800 font-medium">
                    {c.season}: {c.cropId} ({c.months})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Agronomist & Extension Review Safeguards */}
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-xs space-y-2">
            <h3 className="font-bold text-amber-950 text-sm flex items-center">
              <AlertTriangle className="w-4 h-4 text-amber-700 mr-2" />
              Risks & On-Farm Implementation Safeguards (Extension Review Required)
            </h3>
            <ul className="space-y-1.5 text-slate-800">
              {activeStrategy.risksAndAgronomistChecklist.map((r, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Authoritative Data Verification Directory */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center">
              <Globe className="w-3.5 h-3.5 text-blue-700 mr-1.5" />
              Authoritative Data Sources & Reference Directory
            </h3>
            <p className="text-[11px] text-slate-600">
              The data and models in this advisory report are cross-verified against open federal and global datasets:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[10px]">
              <div>
                <strong className="text-slate-800">NASA SMAP:</strong>{' '}
                <a href="https://www.earthdata.nasa.gov/data/platforms/space-based-platforms/smap" target="_blank" rel="noreferrer" className="text-blue-600 underline">SMAP Data Portal</a>
              </div>
              <div>
                <strong className="text-slate-800">NASA ECOSTRESS:</strong>{' '}
                <a href="https://ecostress.jpl.nasa.gov/data" target="_blank" rel="noreferrer" className="text-blue-600 underline">ECOSTRESS JPL</a>
              </div>
              <div>
                <strong className="text-slate-800">NASA GPM:</strong>{' '}
                <a href="https://gpm.nasa.gov/data" target="_blank" rel="noreferrer" className="text-blue-600 underline">GPM IMERG Rain</a>
              </div>
              <div>
                <strong className="text-slate-800">NASA POWER:</strong>{' '}
                <a href="https://power.larc.nasa.gov/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Agroclimatology</a>
              </div>
              <div>
                <strong className="text-slate-800">NASA SRTM:</strong>{' '}
                <a href="https://www.earthdata.nasa.gov/data/instruments/srtm" target="_blank" rel="noreferrer" className="text-blue-600 underline">SRTM Elevation</a>
              </div>
              <div>
                <strong className="text-slate-800">USDA Web Soil Survey:</strong>{' '}
                <a href="https://websoilsurvey.nrcs.usda.gov/app/" target="_blank" rel="noreferrer" className="text-blue-600 underline">SSURGO Soils</a>
              </div>
              <div>
                <strong className="text-slate-800">USDA CropScape:</strong>{' '}
                <a href="https://cat.csiss.gmu.edu/CropSmart/signin?redirecturl=https://nassgeodata.gmu.edu/CropScape" target="_blank" rel="noreferrer" className="text-blue-600 underline">CDL Rotations</a>
              </div>
              <div>
                <strong className="text-slate-800">OpenET:</strong>{' '}
                <a href="https://etdata.org/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Evapotranspiration</a>
              </div>
              <div>
                <strong className="text-slate-800">USGS Water Data:</strong>{' '}
                <a href="https://waterdata.usgs.gov/" target="_blank" rel="noreferrer" className="text-blue-600 underline">NWIS Stream/Wells</a>
              </div>
              <div>
                <strong className="text-slate-800">PRISM Climate:</strong>{' '}
                <a href="https://prism.oregonstate.edu/" target="_blank" rel="noreferrer" className="text-blue-600 underline">30-Yr Normals</a>
              </div>
              <div>
                <strong className="text-slate-800">USDA Market News:</strong>{' '}
                <a href="https://www.ams.usda.gov/market-news" target="_blank" rel="noreferrer" className="text-blue-600 underline">Commodity Prices</a>
              </div>
              <div>
                <strong className="text-slate-800">FAO GAEZ:</strong>{' '}
                <a href="https://gaez.fao.org/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Agro-Ecological Zones</a>
              </div>
            </div>
          </div>

          {/* Section 7: Human-in-the-Loop Sign-off & Co-Review Block */}
          <div className="border-t-2 border-slate-300 pt-4 text-xs space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 italic">
              <strong>Disclaimer & Legal Notice:</strong> Field Shift is an exploratory decision-support platform utilizing publicly available NASA Earth observations and generalized agronomic models. It does not replace on-farm soil testing, certified crop advice, or localized pest scouting. Implementation decisions remain the sole responsibility of the farm operator.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="border-t border-slate-400 pt-2">
                <span className="text-[10px] text-slate-500 uppercase block">Farm Operator / Producer</span>
                <div className="h-8"></div>
                <div className="border-b border-dashed border-slate-400 w-full mb-1"></div>
                <span className="text-[10px] text-slate-600">Signature & Date</span>
              </div>

              <div className="border-t border-slate-400 pt-2">
                <span className="text-[10px] text-slate-500 uppercase block">Certified Crop Advisor (CCA) / Extension</span>
                <div className="h-8"></div>
                <div className="border-b border-dashed border-slate-400 w-full mb-1"></div>
                <span className="text-[10px] text-slate-600">Agronomist Review & Date</span>
              </div>

              <div className="border-t border-slate-400 pt-2">
                <span className="text-[10px] text-slate-500 uppercase block">USDA NRCS / Soil Conservation Officer</span>
                <div className="h-8"></div>
                <div className="border-b border-dashed border-slate-400 w-full mb-1"></div>
                <span className="text-[10px] text-slate-600">Conservation Co-Sign & Date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
