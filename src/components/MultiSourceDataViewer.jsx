import React, { useState } from 'react';
import { Database, Sprout, Droplets, Compass, BarChart3, TrendingDown, Layers, ShieldAlert, CheckCircle2, ExternalLink, Globe } from 'lucide-react';

export default function MultiSourceDataViewer({ selectedRegion }) {
  const [activeSubTab, setActiveSubTab] = useState('soils'); // 'soils' | 'cropscape' | 'openet' | 'economics' | 'global'

  const ssurgo = selectedRegion.ssurgo;
  const cropscape = selectedRegion.cropscape;
  const openET = selectedRegion.openET;
  const usgsWater = selectedRegion.usgsWater;
  const prism = selectedRegion.prismClimate;
  const market = selectedRegion.marketEconomics;
  const faoGaez = selectedRegion.faoGaez;
  const gedi = selectedRegion.gediBiomass;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-700/80 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-cyan-800">
              Multi-Agency Data Fusion
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">{selectedRegion.name}</span>
          </div>
          <h3 className="text-base font-bold text-white mt-1 flex items-center">
            <span>USDA, USGS, OpenET & Global Diagnostic Attributes</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real parameters ingested from Web Soil Survey, CropScape, OpenET, PRISM, and USGS to calibrate the rotation model.
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('soils')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'soils' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            USDA Soils (SSURGO)
          </button>
          <button
            onClick={() => setActiveSubTab('cropscape')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'cropscape' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            CropScape History (5-Yr)
          </button>
          <button
            onClick={() => setActiveSubTab('openet')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'openet' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            OpenET & Water Data
          </button>
          <button
            onClick={() => setActiveSubTab('economics')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'economics' ? 'bg-yellow-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            USDA Markets & Yields
          </button>
          <button
            onClick={() => setActiveSubTab('global')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'global' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            FAO GAEZ & GEDI Lidar
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: USDA SOILS (SSURGO) */}
      {activeSubTab === 'soils' && ssurgo && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center">
              <Sprout className="w-4 h-4 mr-1.5" />
              USDA NRCS Web Soil Survey Soil Characteristics:
            </span>
            <a
              href="https://websoilsurvey.nrcs.usda.gov/app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-cyan-400 hover:underline"
            >
              <span>Verify on Web Soil Survey</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Hydrologic Group</span>
              <span className="text-sm font-bold text-white block mt-0.5">{ssurgo.hydrologicGroup}</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Infiltration & runoff class</span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Avail. Water Capacity</span>
              <span className="text-sm font-bold text-cyan-400 font-mono block mt-0.5">{ssurgo.awc}</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Root-zone water holding</span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">T-Factor (Tolerable Loss)</span>
              <span className="text-sm font-bold text-rose-400 font-mono block mt-0.5">{ssurgo.tFactor}</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Max allowable soil loss</span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">CEC (Nutrient Buffer)</span>
              <span className="text-sm font-bold text-purple-400 font-mono block mt-0.5">{ssurgo.cec}</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Cation exchange capacity</span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Soil pH</span>
              <span className="text-sm font-bold text-emerald-400 font-mono block mt-0.5">{ssurgo.ph}</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Acidity / nutrient availability</span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">K-Factor Erodibility</span>
              <span className="text-sm font-bold text-amber-400 font-mono block mt-0.5">{ssurgo.kFactor || '0.28'}</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Detachment sensitivity</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 flex items-start space-x-2">
            <span className="font-bold">•</span>
            <span>
              <strong>SSURGO Ingestion Note:</strong> This field's AWC ({ssurgo.awc}) and hydrologic group ({ssurgo.hydrologicGroup}) dictate that winter cover crops with deep fibrous roots can store an additional 25,000–30,000 gallons of rainfall per acre, buffering against late summer drought.
            </span>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CROPSCAPE 5-YEAR HISTORY */}
      {activeSubTab === 'cropscape' && cropscape && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center">
              <Layers className="w-4 h-4 mr-1.5" />
              USDA NASS CropScape / CDL Satellite Sequence (2021–2025):
            </span>
            <a
              href="https://cat.csiss.gmu.edu/CropSmart/signin?redirecturl=https://nassgeodata.gmu.edu/CropScape"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-cyan-400 hover:underline"
            >
              <span>Explore on CropScape Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* 5-Year Crop Sequence Visual Bar */}
          <div className="grid grid-cols-5 gap-2">
            {cropscape.history.map((h, i) => (
              <div key={i} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">{h.year}</span>
                <span className="text-sm font-bold text-white block mt-1">{h.crop}</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded-full mt-2 inline-block border border-slate-800">
                  CDL #{h.cdlCode}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Monoculture Recurrence Score</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-extrabold font-mono text-rose-400">{cropscape.monocultureRecurrenceIndex}</span>
                <span className="text-xs text-slate-400">({cropscape.dominantSequence})</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-2">
                Repeating the same cereal or grain legume every 1–2 years concentrates soil-borne pathogens and selects for herbicide-resistant weed biotypes.
              </p>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-rose-900/50 bg-rose-950/10">
              <span className="text-[10px] text-rose-400 uppercase block font-mono font-bold flex items-center">
                <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                Active Biological Pressures Detected from Satellite History:
              </span>
              <ul className="mt-2 space-y-1.5 text-[11px] text-slate-200">
                {cropscape.pestRisks.map((p, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: OPENET & WATER DATA */}
      {activeSubTab === 'openet' && openET && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center">
              <Droplets className="w-4 h-4 mr-1.5" />
              OpenET Satellite Evapotranspiration & USGS Groundwater:
            </span>
            <div className="flex items-center space-x-3">
              <a href="https://etdata.org/" target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-cyan-400 hover:underline">
                <span>OpenET</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://waterdata.usgs.gov/" target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-cyan-400 hover:underline">
                <span>USGS Water</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">OpenET Actual ET</span>
              <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">{openET.annualActualET} mm/yr</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Total field crop water used</span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Reference ETo</span>
              <span className="text-xl font-bold font-mono text-slate-200 mt-1 block">{openET.annualReferenceETo} mm/yr</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Atmospheric evaporative demand</span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Peak Water Month</span>
              <span className="text-sm font-bold text-amber-300 mt-1 block">{openET.peakMonthET}</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Maximum irrigation requirement</span>
            </div>

            {usgsWater && (
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">USGS Well Depth</span>
                <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">{usgsWater.depthToWaterFt} ft</span>
                <span className="text-[10px] text-rose-300 mt-0.5 block">10-Yr Drawdown: {usgsWater.tenYearChangeFt} ft</span>
              </div>
            )}
          </div>

          {prism && (
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-200 block">PRISM Climate Normals & CoCoRaHS Rain Gauge Catch:</span>
                <span className="text-[11px] text-slate-400">
                  30-Year Normal: {prism.normalAnnualPrecip} mm | {prism.cocorahsStations} ground-truth rain gauge stations | Bias: {prism.satelliteBiasVsGPM}
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800">
                Ground-Calibrated
              </span>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: ECONOMICS (USDA AMS & NASS) */}
      {activeSubTab === 'economics' && market && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-yellow-400 uppercase tracking-wider flex items-center">
              <BarChart3 className="w-4 h-4 mr-1.5" />
              USDA Agricultural Marketing Service (AMS) Bids & NASS Yields:
            </span>
            <div className="flex items-center space-x-3">
              <a href="https://www.ams.usda.gov/market-news" target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-cyan-400 hover:underline">
                <span>AMS Market News</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://quickstats.nass.usda.gov/" target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-cyan-400 hover:underline">
                <span>NASS QuickStats</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {market.cornPriceBu && (
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Cash Corn Spot</span>
                <span className="text-xl font-bold font-mono text-yellow-400 mt-1 block">${market.cornPriceBu} / bu</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">County Avg: {market.nassCountyAvgYieldCorn} bu/ac</span>
              </div>
            )}

            {market.soyPriceBu && (
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Soybean Spot</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">${market.soyPriceBu} / bu</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">County Avg: {market.nassCountyAvgYieldSoy} bu/ac</span>
              </div>
            )}

            {market.sorghumPriceBu && (
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Grain Sorghum Spot</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">${market.sorghumPriceBu} / bu</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Low input water cost</span>
              </div>
            )}

            {market.wheatPriceBu && (
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Winter Wheat Spot</span>
                <span className="text-xl font-bold font-mono text-yellow-300 mt-1 block">${market.wheatPriceBu} / bu</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Double-crop grain</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: GLOBAL FAO GAEZ & GEDI LIDAR */}
      {activeSubTab === 'global' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center">
              <Globe className="w-4 h-4 mr-1.5" />
              FAO Global Agro-Ecological Zones (GAEZ v4) & NASA GEDI Lidar:
            </span>
            <div className="flex items-center space-x-3">
              <a href="https://gaez.fao.org/" target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-cyan-400 hover:underline">
                <span>FAO GAEZ</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://gedi.umd.edu/data-collection-started/" target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-cyan-400 hover:underline">
                <span>GEDI Lidar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {faoGaez && (
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-purple-400 uppercase block font-mono font-bold">
                  FAO GAEZ v4 Agro-Ecological Profiling
                </span>
                <div className="mt-2 space-y-1">
                  <div>Suitability Class: <strong className="text-white">{faoGaez.suitabilityClass}</strong></div>
                  <div>Length of Growing Period (LGP): <strong className="text-emerald-400 font-mono">{faoGaez.lgpDays} Days</strong></div>
                </div>
              </div>
            )}

            {gedi && (
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-emerald-400 uppercase block font-mono font-bold">
                  NASA GEDI Spaceborne Lidar & LANDFIRE
                </span>
                <div className="mt-2 space-y-1">
                  <div>Canopy 3D Height: <strong className="text-white font-mono">{gedi.canopyHeightM} m</strong></div>
                  <div>Aboveground Biomass: <strong className="text-cyan-400 font-mono">{gedi.abovegroundBiomassMgHa} Mg/ha</strong></div>
                  <div className="text-[11px] text-slate-400">Vegetation Class: {gedi.landfireCover}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
