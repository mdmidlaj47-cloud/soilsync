import React, { useState } from 'react';
import { Satellite, Brain, CloudRain, Droplets, Sparkles, Sprout, ArrowRight, Layers, Eye, ShieldCheck, Thermometer } from 'lucide-react';

export default function SoilSyncFeatures({ onFeatureClick }) {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  const features = [
    {
      id: 'satellite-monitoring',
      title: 'Satellite Monitoring',
      subtitle: 'Spaceborne Optical & Radar Imaging',
      desc: 'Monitor agricultural land and crop health continuously using multi-spectral satellite imagery from Landsat 8/9, Sentinel-2 (10m), and MODIS.',
      tag: 'NASA Landsat & Copernicus',
      icon: Satellite,
      color: 'text-[#3478C9]',
      bgGlow: 'from-[#3478C9]/20 to-transparent',
      borderColor: 'border-[#3478C9]/30',
      actionTab: 'satellite',
      details: [
        '30m and 10m high-resolution field boundary parcel tracking',
        'Multi-temporal NDVI, EVI, and NDRE vegetation health indices',
        'Detection of bare-ground fallow periods vulnerable to wind/rain erosion'
      ]
    },
    {
      id: 'ai-crop-analysis',
      title: 'AI Crop Analysis',
      subtitle: 'Predictive Phenology & Risk Detection',
      desc: 'Provide intelligent crop insights, phenological stage tracking, and early identification of potential crop disease, drought, and yield decline.',
      tag: 'Machine Learning Models',
      icon: Brain,
      color: 'text-[#16A36A]',
      bgGlow: 'from-[#16A36A]/20 to-transparent',
      borderColor: 'border-[#16A36A]/30',
      actionTab: 'crop-insights',
      details: [
        'Biological nitrogen fixation modeling (up to 165 kg N/ha replaced)',
        'Root architecture depth simulation (deep taproots vs fibrous roots to 220cm)',
        'Pest & nematode life-cycle break score powered by USDA CropScape'
      ]
    },
    {
      id: 'weather-intelligence',
      title: 'Weather Intelligence',
      subtitle: 'Agro-Meteorological Forecasts',
      desc: 'Display real-time temperature, rainfall accumulation, extreme cloudburst alerts, and multi-decadal historical climate normals.',
      tag: 'NASA POWER & GPM',
      icon: CloudRain,
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-500/20 to-transparent',
      borderColor: 'border-cyan-500/30',
      actionTab: 'weather',
      details: [
        'Growing Degree Days (GDD Base 10°C) accumulation curves',
        'Extreme thermal heat stress days (>35°C) during pollination',
        'High-intensity cloudburst tracking (>50mm in 24h) via GPM IMERG radar'
      ]
    },
    {
      id: 'soil-monitoring',
      title: 'Soil Monitoring',
      subtitle: 'Root-Zone Hydrology & Texture',
      desc: 'Display root-zone volumetric soil moisture, available water capacity (AWC), soil organic matter trends, and erosion susceptibility.',
      tag: 'NASA SMAP & USDA SSURGO',
      icon: Droplets,
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/20 to-transparent',
      borderColor: 'border-amber-500/30',
      actionTab: 'dashboard',
      details: [
        'NASA SMAP 0-100cm root-zone volumetric moisture (m³/m³)',
        'USDA NRCS Web Soil Survey hydrologic groups and Available Water Capacity',
        'Soil organic matter (SOM %) accumulation tracking over multi-year cycles'
      ]
    },
    {
      id: 'smart-recommendations',
      title: 'Smart Recommendations',
      subtitle: 'Data-Driven Rotation Strategies',
      desc: 'Provide practical, farmer-friendly crop rotation and cover crop recommendations tailored to your machinery, water availability, and financial goals.',
      tag: 'Decision Support Engine',
      icon: Sparkles,
      color: 'text-purple-400',
      bgGlow: 'from-purple-500/20 to-transparent',
      borderColor: 'border-purple-500/30',
      actionTab: 'dashboard',
      details: [
        'Side-by-side comparison of 4 customized rotation strategies',
        'Economic gross margin ($/ha) and market off-take certainty analysis',
        'Detailed NASA satellite evidence citations and information gap analysis'
      ]
    },
    {
      id: 'sustainable-agriculture',
      title: 'Sustainable Agriculture',
      subtitle: 'Ecosystem Regeneration & Carbon',
      desc: 'Encourage efficient, environmentally responsible farming that regenerates soil structure, stops runoff, and protects multigenerational farm equity.',
      tag: 'Regenerative Stewardship',
      icon: Sprout,
      color: 'text-emerald-300',
      bgGlow: 'from-emerald-400/20 to-transparent',
      borderColor: 'border-emerald-400/30',
      actionTab: 'about',
      details: [
        'Up to 88% reduction in topsoil erosion loss using living armor cover crops',
        'Conservation of 1,850 m³/ha of irrigation water in drought-prone aquifers',
        'Alleviation of subsoil hardpans using biological daikon radish bio-drills'
      ]
    }
  ];

  return (
    <section id="smart-farming" className="py-20 relative bg-[#0a1d14]">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#16A36A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#3478C9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#123D2A] border border-[#16A36A]/40 text-xs font-mono font-bold text-[#16A36A] uppercase tracking-wider mb-3">
            <span>INTELLIGENT FARMING CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Comprehensive Smart Farming Powered by Space & AI
          </h2>
          <p className="mt-4 text-base text-[#E7F4E9]/80 leading-relaxed font-normal">
            SoilSync synthesizes satellite observations, local soil characteristics, and agronomic intelligence to turn complex environmental data into straightforward farm management decisions.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            const isHovered = activeFeatureIdx === idx;

            return (
              <div
                key={f.id}
                onMouseEnter={() => setActiveFeatureIdx(idx)}
                className={`glass-panel-soilsync rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${f.borderColor} hover:border-[#16A36A]/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#16A36A]/15 group relative overflow-hidden`}
              >
                {/* Subtle gradient corner flare */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${f.bgGlow} blur-2xl group-hover:scale-150 transition-transform`} />

                <div>
                  {/* Top Bar: Icon & Tag */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#123D2A] border border-[#16A36A]/30 p-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className={`w-7 h-7 ${f.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#123D2A]/90 text-[#E7F4E9] border border-[#16A36A]/20">
                      {f.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <span className="text-xs font-mono font-semibold text-[#3478C9] uppercase tracking-wider block mb-1">
                    {f.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#16A36A] transition-colors leading-snug">
                    {f.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-[#E7F4E9]/80 leading-relaxed font-normal">
                    {f.desc}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="mt-4 pt-3 border-t border-[#16A36A]/15 space-y-1.5">
                    {f.details.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span className="text-[#16A36A] font-bold mt-0.5">•</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Link */}
                <div className="mt-6 pt-4 border-t border-[#16A36A]/15 flex items-center justify-between">
                  <button
                    onClick={() => onFeatureClick(f.actionTab)}
                    className="flex items-center space-x-1.5 text-xs font-bold text-[#16A36A] hover:text-white transition-colors group/btn"
                  >
                    <span>Launch in Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1} / 06</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
