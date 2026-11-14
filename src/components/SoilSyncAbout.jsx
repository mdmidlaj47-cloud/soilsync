import React from 'react';
import { Satellite, Brain, Sprout, ShieldCheck, Globe, Droplet, Users, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SoilSyncAbout() {
  const steps = [
    {
      num: '01',
      title: 'Spaceborne Radiometry',
      subtitle: 'NASA & Copernicus Feeds',
      desc: 'Constellations of Earth-observing satellites scan surface temperatures, microwave soil moisture, and photosynthetic spectral bands.',
      tag: 'SMAP • ECOSTRESS • Landsat'
    },
    {
      num: '02',
      title: 'In-Situ Soil & Climate Grounding',
      subtitle: 'USDA & Local Taxonomy',
      desc: 'Orbital signals are harmonized with field-scale SSURGO soil texture classes, available water capacity (AWC), and 30-year PRISM climate normals.',
      tag: 'SSURGO • OpenET • PRISM'
    },
    {
      num: '03',
      title: 'AI Machine Learning Synthesis',
      subtitle: 'Agronomic Modeling',
      desc: 'Our neural models simulate multi-year crop rotations, calculating biological nitrogen fixation, root penetration depth, and erosion reduction.',
      tag: 'Crop Phenology Models'
    },
    {
      num: '04',
      title: 'Farmer-Guided Action',
      subtitle: 'Human-in-the-Loop Decisions',
      desc: 'Clear, explainable rotation options with quantified benefits, data gaps, and agronomic review safeguards for farmer-extension collaboration.',
      tag: 'Certified Crop Advisor Ready'
    }
  ];

  return (
    <section id="about" className="py-20 relative bg-[#0e271b] border-t border-[#16A36A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#123D2A] border border-[#16A36A]/40 text-xs font-mono font-bold text-[#16A36A] uppercase tracking-wider mb-3">
            <span>ABOUT SOILSYNC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Bridging Space Technology & Ground-Level Agriculture
          </h2>
          <p className="mt-4 text-base text-[#E7F4E9]/80 leading-relaxed font-normal">
            SoilSync was inspired by multigenerational farming experience—generations of families who lived through seasons where better environmental tracking could have helped identify more resilient rotation choices. Today, we fuse NASA Earth observations with artificial intelligence to protect farms for generations to come.
          </p>
        </div>

        {/* 4-Step Pipeline Flow */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3478C9]">
              HOW SOILSYNC WORKS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              From Low-Earth Orbit to Your Seedbed
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="glass-panel-soilsync rounded-3xl p-6 border border-[#16A36A]/25 hover:border-[#16A36A]/60 transition-all hover:-translate-y-1 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-mono text-[#16A36A]">{s.num}</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#123D2A] text-slate-300 border border-[#16A36A]/20">
                    {s.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-0.5">{s.title}</h4>
                <span className="text-xs font-mono text-[#3478C9] block mb-2">{s.subtitle}</span>
                <p className="text-xs text-[#E7F4E9]/80 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-[#16A36A]/20">
          <div className="glass-card-soilsync rounded-3xl p-7 border border-[#16A36A]/25">
            <div className="w-12 h-12 rounded-2xl bg-[#16A36A]/20 text-[#16A36A] flex items-center justify-center mb-4">
              <Droplet className="w-6 h-6 text-[#16A36A]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Climate Resilience & Water Conservation</h3>
            <p className="text-xs sm:text-sm text-[#E7F4E9]/80 leading-relaxed">
              Drought and water shortages threaten conventional crops. SoilSync models C4 drought-hardy grains (like grain sorghum and pearl millet) and taproot cover crops to slash water consumption by up to 35% while maintaining crop profitability.
            </p>
          </div>

          <div className="glass-card-soilsync rounded-3xl p-7 border border-[#16A36A]/25">
            <div className="w-12 h-12 rounded-2xl bg-[#3478C9]/20 text-[#3478C9] flex items-center justify-center mb-4">
              <Sprout className="w-6 h-6 text-[#3478C9]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Soil Health & Living Carbon Armor</h3>
            <p className="text-xs sm:text-sm text-[#E7F4E9]/80 leading-relaxed">
              Exposing bare soil during extended 5-month fallow windows accelerates erosion and organic carbon loss. SoilSync designs continuous living root systems that sequester organic carbon (+0.42% SOM), feed mycorrhizal fungi, and bio-drill subsoil compaction.
            </p>
          </div>

          <div className="glass-card-soilsync rounded-3xl p-7 border border-[#16A36A]/25">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Farmer-Centered Human Decision Support</h3>
            <p className="text-xs sm:text-sm text-[#E7F4E9]/80 leading-relaxed">
              SoilSync is built to empower—never replace—farmer judgment. Every recommendation highlights the exact satellite evidence behind it, acknowledges information gaps (such as subsoil pH or seed distributor inventory), and provides actionable agronomist review checklists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
