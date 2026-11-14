import React from 'react';
import { Droplet, Flame, CloudRain, Sprout, Sun, Mountain, Compass, ShieldAlert, Cpu } from 'lucide-react';

export default function NasaTelemetryPanel({ selectedRegion, harmonizedData }) {
  const { scenarioAdjusted, harmonizedIndices, rawTelemetry, fusionNotes } = harmonizedData;

  const cards = [
    {
      title: 'SMAP Soil Moisture',
      sensor: 'L4_SM (9km/1km downscaled)',
      value: `${scenarioAdjusted.smapRootZoneMoisture} m³/m³`,
      subtext: `Root-Zone (0-100cm) | Anomaly: ${rawTelemetry.smapAnomaly > 0 ? '+' : ''}${rawTelemetry.smapAnomaly}%`,
      status: scenarioAdjusted.smapRootZoneMoisture < 0.18 ? 'Severe Deficit' : scenarioAdjusted.smapRootZoneMoisture < 0.25 ? 'Moderate' : 'Optimal Capacity',
      statusColor: scenarioAdjusted.smapRootZoneMoisture < 0.18 ? 'text-rose-400 bg-rose-950/60 border-rose-800' : 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
      icon: Droplet,
      iconColor: 'text-cyan-400'
    },
    {
      title: 'ECOSTRESS Evaporative Stress',
      sensor: 'ISS Thermal IR (70m)',
      value: `ESI ${scenarioAdjusted.ecostressESI}`,
      subtext: `LST: ${scenarioAdjusted.ecostressLST || rawTelemetry.ecostressLST}°C | Actual/Potential ET`,
      status: scenarioAdjusted.ecostressESI < 0.5 ? 'High Transpiration Stress' : 'Transpiring Actively',
      statusColor: scenarioAdjusted.ecostressESI < 0.5 ? 'text-amber-400 bg-amber-950/60 border-amber-800' : 'text-cyan-400 bg-cyan-950/60 border-cyan-800',
      icon: Flame,
      iconColor: 'text-amber-400'
    },
    {
      title: 'GPM Precipitation',
      sensor: 'IMERG DPR (0.1° ~10km)',
      value: `${scenarioAdjusted.gpmAnnualRainfall} mm/yr`,
      subtext: `${scenarioAdjusted.gpmExtremeStormDays} extreme cloudburst days (>50mm)`,
      status: scenarioAdjusted.gpmAnnualRainfall < 400 ? 'Arid Water Stress' : 'Sufficient Supply',
      statusColor: scenarioAdjusted.gpmAnnualRainfall < 400 ? 'text-orange-400 bg-orange-950/60 border-orange-800' : 'text-blue-400 bg-blue-950/60 border-blue-800',
      icon: CloudRain,
      iconColor: 'text-blue-400'
    },
    {
      title: 'Landsat/MODIS Phenology',
      sensor: 'OLI / TIRS & Terra/Aqua (30m)',
      value: `${rawTelemetry.bareSoilDaysPerYear} Days Bare`,
      subtext: `Unprotected Fallow Exposure Window | Peak NDVI: 0.82`,
      status: rawTelemetry.bareSoilDaysPerYear > 150 ? 'Excessive Bare Fallow' : 'Covered',
      statusColor: rawTelemetry.bareSoilDaysPerYear > 150 ? 'text-rose-400 bg-rose-950/60 border-rose-800' : 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
      icon: Sprout,
      iconColor: 'text-emerald-400'
    },
    {
      title: 'NASA POWER Thermal Climatology',
      sensor: 'MERRA-2 / CERES (0.5°)',
      value: `${scenarioAdjusted.nasaPowerGDD} GDD`,
      subtext: `${scenarioAdjusted.heatDaysAbove35} Days > 35°C | Frost-Free: ${rawTelemetry.frostFreeDays}d`,
      status: scenarioAdjusted.heatDaysAbove35 > 25 ? 'High Pollination Hazard' : 'Temperate Thermal Window',
      statusColor: scenarioAdjusted.heatDaysAbove35 > 25 ? 'text-amber-400 bg-amber-950/60 border-amber-800' : 'text-purple-400 bg-purple-950/60 border-purple-800',
      icon: Sun,
      iconColor: 'text-yellow-400'
    },
    {
      title: 'GRACE-FO Aquifer Gravity',
      sensor: 'Twin Microwave / Laser (300km)',
      value: `${scenarioAdjusted.graceGroundwaterTrend} cm/yr`,
      subtext: 'Terrestrial Water Storage Anomaly (TWSA)',
      status: harmonizedIndices.aquiferRiskLevel,
      statusColor: scenarioAdjusted.graceGroundwaterTrend < -1.5 ? 'text-rose-400 bg-rose-950/60 border-rose-800' : 'text-slate-400 bg-slate-900 border-slate-700',
      icon: Compass,
      iconColor: 'text-indigo-400'
    }
  ];

  return (
    <div className="space-y-4">
      {/* 6 Sensor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass-card p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">{card.sensor}</span>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center mt-0.5">
                    {card.title}
                  </h4>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/50">
                  <Icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold font-mono text-white tracking-tight">
                  {card.value}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${card.statusColor}`}>
                  {card.status}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400 font-medium">
                {card.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Scientific Harmonization & Data Fusion Banner */}
      <div className="glass-panel p-4 rounded-xl border border-cyan-800/40 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-emerald-950/30">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/50 shrink-0 text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-slate-100 flex items-center">
                <span>Multi-Sensor Resolution Harmonization</span>
                <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-700/50">
                  Spatial Resampling: 300km → 1km → 70m → 30m
                </span>
              </h4>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Field Vulnerability:</span>
                <span className="font-mono font-bold text-amber-400">
                  Water: {harmonizedIndices.waterStressIndex}/100
                </span>
                <span className="text-slate-600">|</span>
                <span className="font-mono font-bold text-rose-400">
                  Erosion: {harmonizedIndices.erosionHazardIndex}/100
                </span>
                <span className="text-slate-600">|</span>
                <span className="font-mono font-bold text-yellow-400">
                  Thermal: {harmonizedIndices.thermalHazardIndex}/100
                </span>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
              {fusionNotes.map((note, i) => (
                <div key={i} className="flex items-start space-x-1.5">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
