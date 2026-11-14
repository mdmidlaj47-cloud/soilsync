import React, { useState, useMemo } from 'react';
import { AUTHORITATIVE_RESOURCES } from '../data/authoritativeResources';
import { ExternalLink, Search, Filter, Database, Globe, Check, Copy, Sparkles, Layers, BookOpen, ShieldCheck } from 'lucide-react';

export default function ResourcesHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgency, setSelectedAgency] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    'All',
    'NASA Earth Observations',
    'USDA Soils & Cropland Systems',
    'Hydrology & Evapotranspiration',
    'High-Resolution Weather & Climate',
    'Economics & Crop Statistics',
    'Global & Copernicus Observatories',
    'Ecosystems & Spaceborne Lidar'
  ];

  const agencies = ['All', 'NASA', 'USDA', 'USGS', 'FAO', 'Copernicus', 'OpenET'];

  const filteredResources = useMemo(() => {
    return AUTHORITATIVE_RESOURCES.filter((res) => {
      const matchesSearch =
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.integration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;

      const matchesAgency =
        selectedAgency === 'All' ||
        (selectedAgency === 'NASA' && res.agency.includes('NASA')) ||
        (selectedAgency === 'USDA' && res.agency.includes('USDA')) ||
        (selectedAgency === 'USGS' && res.agency.includes('USGS')) ||
        (selectedAgency === 'FAO' && res.agency.includes('FAO')) ||
        (selectedAgency === 'Copernicus' && (res.agency.includes('Copernicus') || res.agency.includes('ECMWF') || res.agency.includes('ESA'))) ||
        (selectedAgency === 'OpenET' && res.agency.includes('OpenET'));

      return matchesSearch && matchesCategory && matchesAgency;
    });
  }, [searchQuery, selectedCategory, selectedAgency]);

  const handleCopyLink = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-blue-900/60 bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/60 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Authoritative Data Portals & APIs
              </span>
              <span className="text-xs text-slate-400 font-medium">|</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {AUTHORITATIVE_RESOURCES.length} Curated Federal & Global Sources
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 tracking-tight flex items-center">
              <span>Scientific Data Sources & Verification Portals</span>
              <Sparkles className="w-5 h-5 text-cyan-400 ml-2.5 hidden sm:inline" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Field Shift grounds every rotation recommendation in open, peer-reviewed federal and global datasets. Browse, inspect, and directly access the official satellite, soil, hydrology, and market portals powering our decision models.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Data Partners</span>
              <span className="text-lg font-bold font-mono text-white">NASA • USDA • USGS</span>
            </div>
          </div>
        </div>

        {/* Search & Agency Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by satellite mission, sensor, soil property, keyword (e.g. SMAP, AWC, ESI, GPM, PRISM)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Agency Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Agency:
            </span>
            {agencies.map((agency) => (
              <button
                key={agency}
                onClick={() => setSelectedAgency(agency)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedAgency === agency
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                {agency}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-3 flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong>{filteredResources.length}</strong> of {AUTHORITATIVE_RESOURCES.length} authoritative data resources</span>
        {(searchQuery || selectedCategory !== 'All' || selectedAgency !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedAgency('All');
            }}
            className="text-cyan-400 hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => {
          const isCopied = copiedId === res.id;

          let agencyBadgeColor = 'bg-blue-950 text-blue-300 border-blue-800';
          if (res.agency.includes('NASA')) {
            agencyBadgeColor = 'bg-blue-950 text-cyan-300 border-cyan-700';
          } else if (res.agency.includes('USDA')) {
            agencyBadgeColor = 'bg-amber-950 text-amber-300 border-amber-700';
          } else if (res.agency.includes('USGS')) {
            agencyBadgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-700';
          } else if (res.agency.includes('FAO')) {
            agencyBadgeColor = 'bg-orange-950 text-orange-300 border-orange-700';
          } else if (res.agency.includes('Copernicus') || res.agency.includes('ECMWF')) {
            agencyBadgeColor = 'bg-indigo-950 text-indigo-300 border-indigo-700';
          }

          return (
            <div
              key={res.id}
              className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-all shadow-md group"
            >
              <div>
                {/* Agency & Category Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${agencyBadgeColor}`}>
                    {res.agency}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                    {res.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {res.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {res.description}
                </p>

                {/* How Field Shift Uses It */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                    Role in Field Shift:
                  </span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {res.integration}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {res.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyLink(res.id, res.url)}
                  title="Copy link to clipboard"
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy URL</span>
                    </>
                  )}
                </button>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
                >
                  <span>Launch Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
