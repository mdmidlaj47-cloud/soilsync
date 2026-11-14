import React from 'react';
import { ArrowRight, Satellite, Sprout, ShieldCheck, Play, Sparkles, Droplets, LineChart } from 'lucide-react';

export default function SoilSyncHero({ onExploreClick, onGetStartedClick, selectedRegion }) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 sm:py-24">
      {/* High-Quality Aerial Satellite Agricultural Fields Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85"
          alt="Aerial view of green agricultural fields and circular pivot irrigation"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.12]"
        />
        {/* Futuristic Gradient Overlay tuned to #123D2A and #0b1f15 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f15]/85 via-[#123D2A]/75 to-[#0b1f15] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f15]/95 via-transparent to-[#0b1f15]/90" />

        {/* Futuristic Tech Grid / Coordinate overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#16A36A 1.5px, transparent 1.5px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* Floating Satellite Telemetry Badge (Top Right Deco) */}
      <div className="absolute top-8 right-8 z-10 hidden xl:flex items-center space-x-3 glass-card-soilsync px-4 py-2.5 rounded-2xl border border-[#16A36A]/30 shadow-2xl animate-float">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#16A36A]/20 text-[#16A36A]">
          <Satellite className="w-4 h-4 text-[#16A36A]" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#3478C9] animate-ping" />
        </div>
        <div className="text-left">
          <div className="text-[10px] font-mono text-[#3478C9] font-bold uppercase tracking-wider">
            NASA & Copernicus Constellation
          </div>
          <div className="text-xs font-semibold text-white">
            Live Field Sync: {selectedRegion.name.split('(')[0]}
          </div>
        </div>
      </div>

      {/* Hero Core Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pre-heading Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#123D2A]/90 border border-[#16A36A]/50 shadow-lg shadow-[#16A36A]/20 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A36A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A36A]" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#E7F4E9]">
            AI-POWERED SMART FARMING PLATFORM
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-xs font-mono text-[#3478C9] font-semibold">
            NASA & USDA INTEGRATED
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Grow Smarter. Farm Better.{' '}
          <span className="bg-gradient-to-r from-[#16A36A] via-[#E7F4E9] to-[#3478C9] bg-clip-text text-transparent">
            Protect Tomorrow.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#E7F4E9]/90 font-normal leading-relaxed mb-10">
          Empowering farmers with AI, satellite technology and real-time environmental insights for sustainable agriculture.
        </p>

        {/* Two Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#16A36A] hover:bg-[#18b577] text-white text-base font-bold shadow-xl shadow-[#16A36A]/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 group border border-[#16A36A]/50"
          >
            <span>Explore Smart Farming</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onGetStartedClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#123D2A]/80 hover:bg-[#123D2A] text-white text-base font-bold border border-[#16A36A]/40 backdrop-blur-md shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 text-[#E7F4E9]"
          >
            <Sparkles className="w-5 h-5 text-[#3478C9]" />
            <span>Get Started</span>
          </button>
        </div>

        {/* Live Performance & Impact Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-[#16A36A]/20">
          <div className="glass-card-soilsync p-4 rounded-2xl text-center border border-[#16A36A]/20">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#16A36A] block">25+</span>
            <span className="text-xs text-[#E7F4E9]/80 font-medium mt-0.5 block">Space & Soil Datasets</span>
          </div>

          <div className="glass-card-soilsync p-4 rounded-2xl text-center border border-[#16A36A]/20">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#3478C9] block">-35%</span>
            <span className="text-xs text-[#E7F4E9]/80 font-medium mt-0.5 block">Water Footprint Cut</span>
          </div>

          <div className="glass-card-soilsync p-4 rounded-2xl text-center border border-[#16A36A]/20">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 block">+0.42%</span>
            <span className="text-xs text-[#E7F4E9]/80 font-medium mt-0.5 block">5-Yr Soil Carbon (SOM)</span>
          </div>

          <div className="glass-card-soilsync p-4 rounded-2xl text-center border border-[#16A36A]/20">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 block">85%</span>
            <span className="text-xs text-[#E7F4E9]/80 font-medium mt-0.5 block">Erosion Loss Shield</span>
          </div>
        </div>
      </div>
    </section>
  );
}
