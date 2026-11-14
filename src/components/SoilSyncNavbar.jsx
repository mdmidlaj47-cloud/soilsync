import React, { useState } from 'react';
import { Globe, Satellite, Sparkles, Menu, X, ArrowRight, ShieldCheck, Database, Sliders } from 'lucide-react';
import { BENCHMARK_REGIONS } from '../data/nasaData';

export default function SoilSyncNavbar({
  selectedRegion,
  onSelectRegion,
  activeSection,
  setActiveSection,
  onOpenGetStarted,
  onOpenScenarioModal,
  onOpenReportModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'dashboard', label: 'Smart Farming' },
    { id: 'satellite', label: 'Satellite Monitoring' },
    { id: 'crop-insights', label: 'Crop Insights' },
    { id: 'weather', label: 'Weather' },
    { id: 'resources', label: 'Data Sources' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    // Scroll smoothly to section if on page
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0e271b]/90 backdrop-blur-md border-b border-[#16A36A]/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* SoilSync Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Custom Modern Leaf + Satellite Logo Icon */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#123D2A] via-[#16A36A] to-[#3478C9] p-0.5 shadow-lg shadow-[#16A36A]/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0e271b] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                {/* Orbiting Satellite Ring (Tech Blue) */}
                <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none">
                  {/* Orbit ellipse */}
                  <ellipse cx="18" cy="18" rx="14" ry="7" stroke="#3478C9" strokeWidth="1.5" strokeDasharray="3 2" transform="rotate(-30 18 18)" opacity="0.85" />
                  {/* Satellite node */}
                  <circle cx="28" cy="11" r="2.2" fill="#3478C9" />
                  <circle cx="28" cy="11" r="4" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
                  {/* Leaf silhouette */}
                  <path d="M12 24 C12 15, 18 12, 24 12 C24 21, 20 26, 12 24 Z" fill="#16A36A" />
                  <path d="M14 22 Q18 18 22 14" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  Soil<span className="text-[#16A36A]">Sync</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#3478C9]/20 text-[#3478C9] border border-[#3478C9]/40">
                  AI + SATELLITE
                </span>
              </div>
              <p className="text-[11px] text-[#E7F4E9]/70 tracking-wide font-normal -mt-0.5 hidden sm:block">
                Smart Agriculture Environmental Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'text-white bg-[#16A36A]/20 font-semibold border border-[#16A36A]/40 text-[#E7F4E9]'
                      : 'text-slate-300 hover:text-white hover:bg-[#123D2A]/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions & Region Selector */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Region Selector */}
            <div className="relative">
              <label htmlFor="nav-region" className="sr-only">Farm Region</label>
              <div className="flex items-center bg-[#123D2A]/80 border border-[#16A36A]/30 rounded-xl px-2.5 py-1.5 shadow-inner">
                <Globe className="w-3.5 h-3.5 text-[#16A36A] mr-1.5 shrink-0" />
                <select
                  id="nav-region"
                  value={selectedRegion.id}
                  onChange={(e) => {
                    const r = BENCHMARK_REGIONS.find(item => item.id === e.target.value);
                    if (r) onSelectRegion(r);
                  }}
                  className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer pr-1"
                >
                  {BENCHMARK_REGIONS.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#123D2A] text-white">
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Climate Shift trigger */}
            <button
              onClick={onOpenScenarioModal}
              title="Climate Shift Simulator"
              className="p-2 rounded-xl bg-[#123D2A]/70 hover:bg-[#123D2A] text-slate-300 hover:text-white border border-[#16A36A]/30 transition-all active:scale-95"
            >
              <Sliders className="w-4 h-4 text-[#3478C9]" />
            </button>

            {/* Primary CTA */}
            <button
              onClick={onOpenGetStarted}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#16A36A] to-[#123D2A] hover:from-[#18b577] hover:to-[#16A36A] text-white text-xs font-bold shadow-lg shadow-[#16A36A]/25 border border-[#16A36A]/40 transition-all active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenGetStarted}
              className="px-3 py-1.5 rounded-lg bg-[#16A36A] text-white text-xs font-bold"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#123D2A] border border-[#16A36A]/30 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#16A36A]/20 py-4 px-2 space-y-2 bg-[#0e271b] rounded-b-2xl animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium ${
                    activeSection === link.id
                      ? 'bg-[#16A36A] text-white font-bold'
                      : 'text-slate-300 hover:bg-[#123D2A]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#16A36A]/20 flex items-center justify-between">
              <span className="text-xs text-slate-400">Region:</span>
              <select
                value={selectedRegion.id}
                onChange={(e) => {
                  const r = BENCHMARK_REGIONS.find(item => item.id === e.target.value);
                  if (r) onSelectRegion(r);
                }}
                className="bg-[#123D2A] text-xs text-white p-1.5 rounded-lg border border-[#16A36A]/40"
              >
                {BENCHMARK_REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
