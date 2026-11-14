import React, { useState, useMemo } from 'react';
import SoilSyncNavbar from './components/SoilSyncNavbar';
import SoilSyncHero from './components/SoilSyncHero';
import SoilSyncFeatures from './components/SoilSyncFeatures';
import SoilSyncDashboard from './components/SoilSyncDashboard';
import SoilSyncAbout from './components/SoilSyncAbout';
import SoilSyncContactModal from './components/SoilSyncContactModal';
import SoilSyncFooter from './components/SoilSyncFooter';

import ResourcesHub from './components/ResourcesHub';
import StrategyDetailModal from './components/StrategyDetailModal';
import ScenarioSimulator from './components/ScenarioSimulator';
import SatelliteGlossaryModal from './components/SatelliteGlossaryModal';
import FarmerAdvisoryReport from './components/FarmerAdvisoryReport';

import { BENCHMARK_REGIONS } from './data/nasaData';
import { harmonizeNasaData } from './services/nasaFusionEngine';
import { evaluateRotationStrategies } from './services/rotationEngine';
import { Sliders, RefreshCw, Sparkles, Database } from 'lucide-react';

export default function App() {
  // Region Selection
  const [selectedRegion, setSelectedRegion] = useState(BENCHMARK_REGIONS[0]);

  // Active Map Overlay Layer
  const [activeNasaLayer, setActiveNasaLayer] = useState('smap');

  // Active Navigation Section
  const [activeSection, setActiveSection] = useState('home');

  // Climate Shift Scenario Simulation
  const [climateScenario, setClimateScenario] = useState({
    tempDelta: 0,
    rainDelta: 0,
    extremeStormDelta: 0
  });

  // Farmer Priorities (Weights 0 - 100)
  const defaultPriorities = {
    waterConservation: 75,
    soilHealth: 85,
    profitability: 70,
    erosionControl: 65,
    fertilizerReduction: 80,
    pestManagement: 60
  };
  const [farmerPriorities, setFarmerPriorities] = useState(defaultPriorities);

  // Field Soil Characteristics
  const [soilParams, setSoilParams] = useState({
    texture: selectedRegion.soilTexture,
    baselineSOM: selectedRegion.baselineSOM
  });

  // Operational Constraints
  const [constraints, setConstraints] = useState({
    irrigation: 'rainfed',
    machinery: 'notill'
  });

  // Active Selected Strategy for Farm Implementation
  const [selectedStrategyId, setSelectedStrategyId] = useState('soil-health-regen');

  // Modals state
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [strategyForDetailModal, setStrategyForDetailModal] = useState(null);

  // Synchronize soil texture and SOM when region changes
  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setSoilParams({
      texture: region.soilTexture,
      baselineSOM: region.baselineSOM
    });
  };

  // Custom coordinate pick from map
  const handleLocationChange = (lat, lng) => {
    setSelectedRegion((prev) => ({
      ...prev,
      lat,
      lng
    }));
  };

  const handlePriorityChange = (key, value) => {
    setFarmerPriorities((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSoilParamChange = (key, value) => {
    setSoilParams((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConstraintChange = (key, value) => {
    setConstraints((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetPriorities = () => {
    setFarmerPriorities(defaultPriorities);
  };

  // Dynamic Multi-Sensor NASA Harmonization Calculation
  const harmonizedData = useMemo(() => {
    return harmonizeNasaData(selectedRegion, {}, climateScenario);
  }, [selectedRegion, climateScenario]);

  // Dynamic Rotation Strategy Evaluation Calculation
  const strategies = useMemo(() => {
    return evaluateRotationStrategies(selectedRegion, harmonizedData, farmerPriorities, soilParams);
  }, [selectedRegion, harmonizedData, farmerPriorities, soilParams]);

  const hasScenarioActive = climateScenario.tempDelta !== 0 || climateScenario.rainDelta !== 0 || climateScenario.extremeStormDelta !== 0;

  const scrollToSection = (id) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1f15] text-slate-100 flex flex-col font-sans selection:bg-[#16A36A] selection:text-white">
      {/* SoilSync Futuristic Navbar */}
      <SoilSyncNavbar
        selectedRegion={selectedRegion}
        onSelectRegion={handleSelectRegion}
        activeSection={activeSection}
        setActiveSection={scrollToSection}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onOpenScenarioModal={() => setIsScenarioModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Active Scenario Alert Bar (if climate shift is non-zero) */}
      {hasScenarioActive && (
        <div className="bg-gradient-to-r from-[#123D2A] via-[#16A36A]/80 to-[#123D2A] border-b border-[#16A36A]/40 px-4 py-2 text-xs flex items-center justify-between z-30">
          <div className="flex items-center space-x-2 text-white">
            <Sliders className="w-4 h-4 text-[#3478C9] shrink-0" />
            <span>
              <strong>Active Climate Shift Scenario:</strong> Temp {climateScenario.tempDelta > 0 ? `+${climateScenario.tempDelta}` : climateScenario.tempDelta}°C | Precip {climateScenario.rainDelta > 0 ? `+${climateScenario.rainDelta}` : climateScenario.rainDelta}% | Extreme Storms {climateScenario.extremeStormDelta > 0 ? `+${climateScenario.extremeStormDelta}` : climateScenario.extremeStormDelta}%
            </span>
          </div>
          <button
            onClick={() => setClimateScenario({ tempDelta: 0, rainDelta: 0, extremeStormDelta: 0 })}
            className="flex items-center space-x-1 font-semibold text-white hover:underline text-[11px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Climatology</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <SoilSyncHero
          onExploreClick={() => scrollToSection('dashboard')}
          onGetStartedClick={() => setIsGetStartedOpen(true)}
          selectedRegion={selectedRegion}
        />

        {/* 2. Main Features (6 Feature Cards) */}
        <SoilSyncFeatures
          onFeatureClick={(tab) => {
            if (tab === 'about') {
              scrollToSection('about');
            } else {
              scrollToSection('dashboard');
            }
          }}
        />

        {/* 3. Smart Farming Dashboard */}
        <SoilSyncDashboard
          selectedRegion={selectedRegion}
          onLocationChange={handleLocationChange}
          activeNasaLayer={activeNasaLayer}
          setActiveNasaLayer={setActiveNasaLayer}
          harmonizedData={harmonizedData}
          strategies={strategies}
          selectedStrategyId={selectedStrategyId}
          onSelectStrategy={setSelectedStrategyId}
          onOpenDetailModal={(s) => setStrategyForDetailModal(s)}
          farmerPriorities={farmerPriorities}
          onPriorityChange={handlePriorityChange}
          soilParams={soilParams}
          onSoilParamChange={handleSoilParamChange}
          constraints={constraints}
          onConstraintChange={handleConstraintChange}
          onResetPriorities={handleResetPriorities}
        />

        {/* 4. About SoilSync */}
        <SoilSyncAbout />

        {/* 5. Authoritative Data Sources & Portals Section */}
        <section id="resources" className="py-20 bg-[#0a1d14] border-t border-[#16A36A]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ResourcesHub />
          </div>
        </section>
      </main>

      {/* SoilSync Footer */}
      <SoilSyncFooter
        onNavClick={scrollToSection}
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenGlossary={() => setIsGlossaryModalOpen(true)}
        onOpenContact={() => setIsGetStartedOpen(true)}
      />

      {/* Modals */}
      {isGetStartedOpen && (
        <SoilSyncContactModal
          onClose={() => setIsGetStartedOpen(false)}
        />
      )}

      {strategyForDetailModal && (
        <StrategyDetailModal
          strategy={strategyForDetailModal}
          onClose={() => setStrategyForDetailModal(null)}
        />
      )}

      {isScenarioModalOpen && (
        <ScenarioSimulator
          scenario={climateScenario}
          onScenarioChange={setClimateScenario}
          onClose={() => setIsScenarioModalOpen(false)}
        />
      )}

      {isGlossaryModalOpen && (
        <SatelliteGlossaryModal
          onClose={() => setIsGlossaryModalOpen(false)}
        />
      )}

      {isReportModalOpen && (
        <FarmerAdvisoryReport
          selectedRegion={selectedRegion}
          harmonizedData={harmonizedData}
          strategies={strategies}
          selectedStrategyId={selectedStrategyId}
          soilParams={soilParams}
          farmerPriorities={farmerPriorities}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
    </div>
  );
}
