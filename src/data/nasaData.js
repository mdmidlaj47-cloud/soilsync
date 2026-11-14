// NASA Earth Observations Catalog & Regional Agricultural Climatologies

export const NASA_DATASETS = [
  {
    id: 'smap',
    name: 'SMAP (Soil Moisture Active Passive)',
    sensor: 'L-Band Radiometer (1.41 GHz)',
    resolution: '9 km / 1 km downscaled, 2-3 day revisit',
    metrics: ['0-5cm Surface Soil Moisture', '0-100cm Root-Zone Soil Moisture (L4_SM)', 'Soil Moisture Anomaly (%)'],
    agriculturalUse: 'Quantifies root-zone plant available water, drought onset, and trafficability for planting/harvest machinery.',
    unit: 'm³/m³ (volumetric water content)',
    badgeColor: 'emerald',
    citation: 'NASA JPL / GSFC SMAP Science Team',
    url: 'https://www.earthdata.nasa.gov/data/platforms/space-based-platforms/smap'
  },
  {
    id: 'ecostress',
    name: 'ECOSTRESS (on the ISS)',
    sensor: 'Multispectral Thermal Infrared Radiometer',
    resolution: '70 m spatial, diurnal revisit (1-5 days)',
    metrics: ['Evaporative Stress Index (ESI)', 'Actual Evapotranspiration (ET)', 'Land Surface Temperature (LST)', 'Water Use Efficiency (WUE)'],
    agriculturalUse: 'Identifies plant thermal stress and crop transpiration shutdown days before visible leaf wilting or canopy browning occurs.',
    unit: 'ESI (0-1 dimensionless), ET (mm/day), LST (°C)',
    badgeColor: 'cyan',
    citation: 'NASA JPL ECOSTRESS Mission',
    url: 'https://ecostress.jpl.nasa.gov/data'
  },
  {
    id: 'gpm',
    name: 'GPM (Global Precipitation Measurement)',
    sensor: 'Dual-Frequency Precip Radar (DPR) & Microwave Imager (GMI)',
    resolution: '0.1° (~10 km), 30-minute to daily IMERG',
    metrics: ['Accumulated Precipitation (mm)', 'Rainfall Anomalies (%)', 'Extreme Rain Event Frequency (>50mm/24hr)', 'Dry-Spell Duration'],
    agriculturalUse: 'Calculates rainfall supply vs crop demand, erosive storm intensity, and optimal seeding moisture windows.',
    unit: 'mm / season or mm / 24hr',
    badgeColor: 'blue',
    citation: 'NASA GSFC / JAXA GPM',
    url: 'https://gpm.nasa.gov/data'
  },
  {
    id: 'landsat_modis',
    name: 'Landsat 8/9 & MODIS / VIIRS',
    sensor: 'OLI / TIRS (Landsat 30m) & MODIS (250m-1km daily)',
    resolution: '30 m (Landsat) / 250 m (MODIS), 16-day & daily',
    metrics: ['NDVI (Normalized Difference Vegetation Index)', 'EVI (Enhanced Veg Index)', 'Bare Soil Exposure Duration (days)', 'Phenology Dates'],
    agriculturalUse: 'Tracks historical crop vigor, identifies bare soil windows vulnerable to erosion, and verifies cover crop establishment success.',
    unit: 'NDVI (-0.2 to 1.0), Days bare/year',
    badgeColor: 'amber',
    citation: 'NASA GSFC / USGS Earth Resources Observation & Science',
    url: 'https://earthexplorer.usgs.gov/'
  },
  {
    id: 'nasa_power',
    name: 'NASA POWER (Energy & Ag Climatology)',
    sensor: 'CERES, MERRA-2, GEOS Reanalysis Models',
    resolution: '0.5° x 0.5° latitude/longitude, daily continuous (1981-present)',
    metrics: ['Growing Degree Days (GDD Base 10°C / 50°F)', 'Extreme Heat Days (>35°C / 95°F)', 'First/Last Freeze Dates', 'All-Sky Solar Insolation'],
    agriculturalUse: 'Determines crop thermal maturity zones, heat stress at pollination, frost danger for early cash crops or late winter covers.',
    unit: 'GDD (°C-days), Days/year, MJ/m²/day',
    badgeColor: 'purple',
    citation: 'NASA Langley Research Center POWER Project',
    url: 'https://power.larc.nasa.gov/'
  },
  {
    id: 'grace',
    name: 'GRACE & GRACE-FO',
    sensor: 'Twin Satellite Microwave & Laser Ranging Interferometry',
    resolution: '300 km footprint, monthly gravity field solutions',
    metrics: ['Terrestrial Water Storage Anomaly (TWSA)', 'Deep Aquifer Depletion Rate', 'Groundwater Storage Trend'],
    agriculturalUse: 'Warns of macro-scale regional aquifer exhaustion, guiding long-term conversion from water-intensive monocultures to dryland rotations.',
    unit: 'cm equivalent water height / year',
    badgeColor: 'rose',
    citation: 'NASA JPL / GFZ Potsdam',
    url: 'https://www.earthdata.nasa.gov/'
  },
  {
    id: 'srtm',
    name: 'SRTM & NASADEM',
    sensor: 'C-Band Radar Interferometry (30m elevation)',
    resolution: '30 m spatial resolution',
    metrics: ['Slope Gradient (%)', 'Topographic Wetness Index (TWI)', 'RUSLE LS-Factor (Erosion Risk)'],
    agriculturalUse: 'Identifies slope zones requiring contour cover crops, perennial buffers, or deep-rooting anchoring species to stop rill/gully erosion.',
    unit: 'meters elevation, % slope',
    badgeColor: 'orange',
    citation: 'NASA JPL / NGA Shuttle Radar Topography Mission',
    url: 'https://www.earthdata.nasa.gov/data/instruments/srtm'
  }
];

// Curated Global Agricultural Benchmark Regions
export const BENCHMARK_REGIONS = [
  {
    id: 'us-midwest',
    name: 'Iowa Corn Belt (Boone County, USA)',
    country: 'United States',
    lat: 42.06,
    lng: -93.88,
    biome: 'Temperate Continental - Humid',
    soilType: 'Mollisols (Clarion-Nicollet-Webster Loam)',
    soilTexture: 'Silt Loam',
    baselineSOM: 3.8,
    drainage: 'Moderate (tile drained)',
    elevation: 320,
    slope: 2.1,
    typicalRotation: 'Continuous Corn or 2-Year Corn-Soybean (5 months winter fallow)',
    vulnerabilities: [
      '5 to 6 months of unprotected bare soil (November - April) driving topsoil erosion during heavy spring deluges',
      'High synthetic nitrogen leaching into tile drainage systems during wet Aprils',
      'Increasing frequency of mid-summer flash droughts and heatwaves during critical July tasseling'
    ],
    nasaTelemetry: {
      smapRootZoneMoisture: 0.28, // m3/m3
      smapAnomaly: -4.5, // % departure
      ecostressESI: 0.68, // Evaporative Stress Index (1=no stress, 0=extreme)
      ecostressLST: 31.4, // °C
      gpmAnnualRainfall: 890, // mm
      gpmExtremeStormDays: 4.2, // days >50mm
      nasaPowerGDD: 1650, // GDD base 10
      heatDaysAbove35: 8,
      frostFreeDays: 168,
      graceGroundwaterTrend: -0.8, // cm/yr
      bareSoilDaysPerYear: 165
    },
    monthlyClimate: [
      { month: 'Jan', temp: -6.5, rain: 22, smapMoist: 0.35, ndvi: 0.12, bare: true },
      { month: 'Feb', temp: -4.0, rain: 28, smapMoist: 0.36, ndvi: 0.14, bare: true },
      { month: 'Mar', temp: 3.2, rain: 54, smapMoist: 0.38, ndvi: 0.18, bare: true },
      { month: 'Apr', temp: 10.4, rain: 88, smapMoist: 0.34, ndvi: 0.25, bare: true },
      { month: 'May', temp: 16.8, rain: 115, smapMoist: 0.30, ndvi: 0.42, bare: false },
      { month: 'Jun', temp: 22.1, rain: 128, smapMoist: 0.28, ndvi: 0.72, bare: false },
      { month: 'Jul', temp: 24.3, rain: 104, smapMoist: 0.23, ndvi: 0.88, bare: false },
      { month: 'Aug', temp: 23.0, rain: 98, smapMoist: 0.21, ndvi: 0.82, bare: false },
      { month: 'Sep', temp: 18.2, rain: 82, smapMoist: 0.24, ndvi: 0.65, bare: false },
      { month: 'Oct', temp: 11.5, rain: 66, smapMoist: 0.27, ndvi: 0.35, bare: true },
      { month: 'Nov', temp: 3.8, rain: 48, smapMoist: 0.31, ndvi: 0.19, bare: true },
      { month: 'Dec', temp: -3.5, rain: 32, smapMoist: 0.33, ndvi: 0.13, bare: true }
    ],
    // --- INTEGRATED FEDERAL & GLOBAL DATASETS ---
    ssurgo: {
      hydrologicGroup: 'B (Moderate Infiltration)',
      awc: '0.21 cm/cm (High Water Storage)',
      tFactor: '5.0 tons/acre/yr (Tolerable Loss)',
      cec: '24 meq/100g',
      ph: 6.6,
      kFactor: '0.32 (Medium Erodibility)',
      source: 'USDA NRCS Web Soil Survey (SSURGO)'
    },
    cropscape: {
      history: [
        { year: 2021, crop: 'Corn (Maize)', cdlCode: 1 },
        { year: 2022, crop: 'Soybean', cdlCode: 5 },
        { year: 2023, crop: 'Corn (Maize)', cdlCode: 1 },
        { year: 2024, crop: 'Soybean', cdlCode: 5 },
        { year: 2025, crop: 'Corn (Maize)', cdlCode: 1 }
      ],
      monocultureRecurrenceIndex: '84/100 (Severe Recurrence)',
      dominantSequence: '2-Year Corn-Soy Duoculture',
      pestRisks: ['Corn Rootworm Variant Pressure', 'Soybean Cyst Nematode Egg Density Increasing', 'Tar Spot Overwinter Inoculum'],
      source: 'USDA NASS CropScape / CDL'
    },
    openET: {
      annualActualET: 618, // mm
      annualReferenceETo: 885, // mm
      peakMonthET: '155 mm (July Corn Tasseling)',
      ensembleModels: 'eeMETRIC, SSEBop, SIMS, PT-JPL, DisALEXI, geeSEBAL (R² = 0.88)',
      source: 'OpenET Operational Evapotranspiration'
    },
    usgsWater: {
      stationId: 'USGS 420336093535901 (Boone County)',
      depthToWaterFt: 18.2, // ft below land surface
      tenYearChangeFt: -2.4, // ft
      aquiferName: 'Glacial Drift / Mississippian Bedrock',
      source: 'USGS National Water Information System (NWIS)'
    },
    prismClimate: {
      normalAnnualPrecip: 882, // mm (1991-2020 normal)
      cocorahsStations: 14, // physical rain gauge verification sites
      satelliteBiasVsGPM: '-4.1% (GPM IMERG slightly overpredicts peak July cloudbursts)',
      source: 'PRISM Climate Group & CoCoRaHS Network'
    },
    marketEconomics: {
      cornPriceBu: 4.55,
      soyPriceBu: 11.20,
      sorghumPriceBu: 4.40,
      wheatPriceBu: 5.85,
      nassCountyAvgYieldCorn: 202, // bu/acre
      nassCountyAvgYieldSoy: 61, // bu/acre
      source: 'USDA AMS Market News & USDA NASS QuickStats'
    },
    faoGaez: {
      suitabilityClass: 'Very Suitable (VS) for Rainfed Cereals',
      lgpDays: 195, // Length of Growing Period
      source: 'FAO GAEZ v4 Agro-Ecological Zones'
    },
    gediBiomass: {
      canopyHeightM: 2.8,
      abovegroundBiomassMgHa: 14.8,
      landfireCover: 'Cultivated Agricultural Vegetation (EVT 3111)',
      source: 'NASA GEDI Lidar & LANDFIRE'
    }
  },
  {
    id: 'us-california',
    name: 'San Joaquin Valley (Fresno County, USA)',
    country: 'United States',
    lat: 36.74,
    lng: -119.78,
    biome: 'Mediterranean Arid / Semi-Arid Irrigated',
    soilType: 'Entisols / Aridisols (Sandy Loam to Clay Loam)',
    soilTexture: 'Sandy Loam',
    baselineSOM: 1.1,
    drainage: 'Well-drained to localized hardpan',
    elevation: 92,
    slope: 0.8,
    typicalRotation: 'Cotton / Processing Tomato / Fallow or Monoculture Orchard',
    vulnerabilities: [
      'Severe GRACE-tracked groundwater depletion due to Central Valley overdraft (-2.6 cm/yr)',
      'Extreme ECOSTRESS thermal heat stress (LST often exceeding 42°C in July/August)',
      'Soil salinity buildup and rapid soil organic carbon burn-off under intense solar radiation'
    ],
    nasaTelemetry: {
      smapRootZoneMoisture: 0.14,
      smapAnomaly: -18.2,
      ecostressESI: 0.42,
      ecostressLST: 38.6,
      gpmAnnualRainfall: 275,
      gpmExtremeStormDays: 0.8,
      nasaPowerGDD: 2480,
      heatDaysAbove35: 46,
      frostFreeDays: 285,
      graceGroundwaterTrend: -2.6,
      bareSoilDaysPerYear: 190
    },
    monthlyClimate: [
      { month: 'Jan', temp: 8.2, rain: 48, smapMoist: 0.22, ndvi: 0.22, bare: true },
      { month: 'Feb', temp: 11.4, rain: 44, smapMoist: 0.21, ndvi: 0.26, bare: false },
      { month: 'Mar', temp: 14.3, rain: 42, smapMoist: 0.19, ndvi: 0.34, bare: false },
      { month: 'Apr', temp: 17.6, rain: 22, smapMoist: 0.16, ndvi: 0.45, bare: false },
      { month: 'May', temp: 22.0, rain: 10, smapMoist: 0.13, ndvi: 0.58, bare: false },
      { month: 'Jun', temp: 26.5, rain: 3, smapMoist: 0.11, ndvi: 0.65, bare: false },
      { month: 'Jul', temp: 30.2, rain: 1, smapMoist: 0.09, ndvi: 0.62, bare: false },
      { month: 'Aug', temp: 29.4, rain: 1, smapMoist: 0.08, ndvi: 0.55, bare: false },
      { month: 'Sep', temp: 25.8, rain: 4, smapMoist: 0.10, ndvi: 0.38, bare: true },
      { month: 'Oct', temp: 19.6, rain: 15, smapMoist: 0.12, ndvi: 0.22, bare: true },
      { month: 'Nov', temp: 12.8, rain: 32, smapMoist: 0.17, ndvi: 0.18, bare: true },
      { month: 'Dec', temp: 8.0, rain: 45, smapMoist: 0.21, ndvi: 0.17, bare: true }
    ],
    ssurgo: {
      hydrologicGroup: 'A/B (High/Moderate Infiltration)',
      awc: '0.14 cm/cm (Low-Moderate Storage)',
      tFactor: '4.0 tons/acre/yr',
      cec: '15 meq/100g',
      ph: 7.4,
      kFactor: '0.24',
      source: 'USDA NRCS Web Soil Survey (SSURGO)'
    },
    cropscape: {
      history: [
        { year: 2021, crop: 'Cotton', cdlCode: 2 },
        { year: 2022, crop: 'Processing Tomato', cdlCode: 54 },
        { year: 2023, crop: 'Bare Fallow', cdlCode: 61 },
        { year: 2024, crop: 'Cotton', cdlCode: 2 },
        { year: 2025, crop: 'Processing Tomato', cdlCode: 54 }
      ],
      monocultureRecurrenceIndex: '72/100',
      dominantSequence: 'Cotton-Tomato-Fallow',
      pestRisks: ['Root-Knot Nematode Infestation', 'Verticillium Wilt', 'Fusarium Race 4'],
      source: 'USDA NASS CropScape / CDL'
    },
    openET: {
      annualActualET: 840,
      annualReferenceETo: 1420,
      peakMonthET: '190 mm (July Peak Demand)',
      ensembleModels: 'SIMS, eeMETRIC, SSEBop (High Evaporative Deficit)',
      source: 'OpenET Satellite Evapotranspiration'
    },
    usgsWater: {
      stationId: 'USGS 364429119565501 (Fresno County)',
      depthToWaterFt: 142.6,
      tenYearChangeFt: -26.0,
      aquiferName: 'Central Valley Regional Aquifer System',
      source: 'USGS NWIS Groundwater Levels'
    },
    prismClimate: {
      normalAnnualPrecip: 284,
      cocorahsStations: 9,
      satelliteBiasVsGPM: '+2.4%',
      source: 'PRISM Climate Group & CoCoRaHS'
    },
    marketEconomics: {
      cottonPriceLb: 0.78,
      tomatoPriceTon: 138.00,
      alfalfaPriceTon: 285.00,
      sorghumPriceBu: 4.80,
      source: 'USDA AMS Market News & NASS QuickStats'
    },
    faoGaez: {
      suitabilityClass: 'Marginal (m) for Rainfed; Very Suitable (VS) under Irrigation',
      lgpDays: 95,
      source: 'FAO GAEZ v4 Global Agro-Ecological Zones'
    },
    gediBiomass: {
      canopyHeightM: 1.2,
      abovegroundBiomassMgHa: 4.2,
      landfireCover: 'Semi-Desert Shrub & Cultivated Crops (EVT 3110)',
      source: 'NASA GEDI Lidar & LANDFIRE'
    }
  },
  {
    id: 'us-kansas',
    name: 'High Plains (Finney County, Kansas, USA)',
    country: 'United States',
    lat: 38.01,
    lng: -100.87,
    biome: 'Semi-Arid Steppe (Ogallala Aquifer Transition)',
    soilType: 'Mollisols / Ustolls (Richfield Silt Loam)',
    soilTexture: 'Silt Loam',
    baselineSOM: 1.8,
    drainage: 'Well-drained',
    elevation: 865,
    slope: 1.2,
    typicalRotation: 'Winter Wheat - Fallow (14-month bare fallow cycle)',
    vulnerabilities: [
      'Extended 14-month wheat-fallow periods leave soil exposed to wind erosion and moisture loss',
      'Ogallala aquifer decline making continuous corn irrigation unsustainable',
      'High-velocity spring winds with low SMAP surface moisture triggering dust events'
    ],
    nasaTelemetry: {
      smapRootZoneMoisture: 0.18,
      smapAnomaly: -12.4,
      ecostressESI: 0.52,
      ecostressLST: 34.2,
      gpmAnnualRainfall: 480,
      gpmExtremeStormDays: 2.1,
      nasaPowerGDD: 1920,
      heatDaysAbove35: 28,
      frostFreeDays: 182,
      graceGroundwaterTrend: -1.9,
      bareSoilDaysPerYear: 220
    },
    monthlyClimate: [
      { month: 'Jan', temp: -0.5, rain: 12, smapMoist: 0.20, ndvi: 0.16, bare: true },
      { month: 'Feb', temp: 2.1, rain: 15, smapMoist: 0.21, ndvi: 0.18, bare: true },
      { month: 'Mar', temp: 7.8, rain: 36, smapMoist: 0.22, ndvi: 0.25, bare: false },
      { month: 'Apr', temp: 13.2, rain: 52, smapMoist: 0.21, ndvi: 0.46, bare: false },
      { month: 'May', temp: 18.5, rain: 82, smapMoist: 0.19, ndvi: 0.68, bare: false },
      { month: 'Jun', temp: 24.6, rain: 76, smapMoist: 0.16, ndvi: 0.52, bare: false },
      { month: 'Jul', temp: 27.8, rain: 64, smapMoist: 0.13, ndvi: 0.25, bare: true },
      { month: 'Aug', temp: 26.5, rain: 60, smapMoist: 0.14, ndvi: 0.20, bare: true },
      { month: 'Sep', temp: 21.2, rain: 42, smapMoist: 0.15, ndvi: 0.22, bare: true },
      { month: 'Oct', temp: 14.1, rain: 34, smapMoist: 0.17, ndvi: 0.24, bare: false },
      { month: 'Nov', temp: 6.5, rain: 18, smapMoist: 0.19, ndvi: 0.22, bare: false },
      { month: 'Dec', temp: 0.6, rain: 14, smapMoist: 0.20, ndvi: 0.18, bare: true }
    ],
    ssurgo: {
      hydrologicGroup: 'B (Richfield Silt Loam)',
      awc: '0.19 cm/cm (Moderate-High Storage)',
      tFactor: '5.0 tons/acre/yr',
      cec: '22 meq/100g',
      ph: 7.2,
      kFactor: '0.28 (Wind/Water Sensitive)',
      source: 'USDA NRCS Web Soil Survey (SSURGO)'
    },
    cropscape: {
      history: [
        { year: 2021, crop: 'Winter Wheat', cdlCode: 24 },
        { year: 2022, crop: 'Bare Fallow (14-mo)', cdlCode: 61 },
        { year: 2023, crop: 'Winter Wheat', cdlCode: 24 },
        { year: 2024, crop: 'Bare Fallow', cdlCode: 61 },
        { year: 2025, crop: 'Grain Sorghum', cdlCode: 4 }
      ],
      monocultureRecurrenceIndex: '88/100 (Severe Wind Erosion Risk)',
      dominantSequence: 'Wheat-Fallow Monoculture',
      pestRisks: ['Wheat Streak Mosaic Virus', 'Cephus cinctus (Sawfly)', 'Russian Wheat Aphid'],
      source: 'USDA NASS CropScape / CDL'
    },
    openET: {
      annualActualET: 460,
      annualReferenceETo: 1120,
      peakMonthET: '125 mm (June Pre-Harvest Wheat)',
      ensembleModels: 'eeMETRIC, geeSEBAL, DisALEXI (High Spring Deficit)',
      source: 'OpenET Satellite Evapotranspiration'
    },
    usgsWater: {
      stationId: 'USGS 375549100492801 (Finney County)',
      depthToWaterFt: 218.4,
      tenYearChangeFt: -18.2,
      aquiferName: 'High Plains (Ogallala) Aquifer System',
      source: 'USGS NWIS Groundwater Levels'
    },
    prismClimate: {
      normalAnnualPrecip: 478,
      cocorahsStations: 11,
      satelliteBiasVsGPM: '-1.8%',
      source: 'PRISM Climate Group & CoCoRaHS'
    },
    marketEconomics: {
      wheatPriceBu: 5.95,
      sorghumPriceBu: 4.45,
      sunflowerPriceCwt: 23.80,
      cornPriceBu: 4.60,
      source: 'USDA AMS Market News & NASS QuickStats'
    },
    faoGaez: {
      suitabilityClass: 'Moderately Suitable (MS) for Dryland Winter Cereals',
      lgpDays: 135,
      source: 'FAO GAEZ v4 Global Agro-Ecological Zones'
    },
    gediBiomass: {
      canopyHeightM: 0.9,
      abovegroundBiomassMgHa: 3.8,
      landfireCover: 'Shortgrass Prairie & Cereal Dryland (EVT 3114)',
      source: 'NASA GEDI Lidar & LANDFIRE'
    }
  },
  {
    id: 'india-punjab',
    name: 'Indo-Gangetic Plain (Ludhiana, Punjab, India)',
    country: 'India',
    lat: 30.90,
    lng: 75.85,
    biome: 'Subtropical Semi-Arid Monsoonal',
    soilType: 'Inceptisols / Alluvial (Sandy Loam to Silt Loam)',
    soilTexture: 'Loam',
    baselineSOM: 0.7,
    drainage: 'Moderate to slow',
    elevation: 245,
    slope: 0.5,
    typicalRotation: 'Paddy Rice - Winter Wheat intensive monoculture',
    vulnerabilities: [
      'Extreme GRACE water table collapse (-3.1 cm/yr) driven by flood-irrigated summer paddy',
      'Severe soil microbial depletion and organic carbon loss due to high temperatures and tillage',
      'Terminal heat stress on wheat during March grain filling detected by ECOSTRESS/MODIS'
    ],
    nasaTelemetry: {
      smapRootZoneMoisture: 0.22,
      smapAnomaly: -8.0,
      ecostressESI: 0.58,
      ecostressLST: 36.8,
      gpmAnnualRainfall: 710,
      gpmExtremeStormDays: 5.6,
      nasaPowerGDD: 2750,
      heatDaysAbove35: 58,
      frostFreeDays: 340,
      graceGroundwaterTrend: -3.1,
      bareSoilDaysPerYear: 105
    },
    monthlyClimate: [
      { month: 'Jan', temp: 12.8, rain: 26, smapMoist: 0.24, ndvi: 0.58, bare: false },
      { month: 'Feb', temp: 16.2, rain: 32, smapMoist: 0.23, ndvi: 0.72, bare: false },
      { month: 'Mar', temp: 22.0, rain: 28, smapMoist: 0.20, ndvi: 0.68, bare: false },
      { month: 'Apr', temp: 28.5, rain: 14, smapMoist: 0.15, ndvi: 0.25, bare: true },
      { month: 'May', temp: 33.6, rain: 18, smapMoist: 0.12, ndvi: 0.16, bare: true },
      { month: 'Jun', temp: 34.8, rain: 72, smapMoist: 0.18, ndvi: 0.22, bare: false },
      { month: 'Jul', temp: 31.2, rain: 215, smapMoist: 0.36, ndvi: 0.65, bare: false },
      { month: 'Aug', temp: 30.1, rain: 185, smapMoist: 0.35, ndvi: 0.82, bare: false },
      { month: 'Sep', temp: 28.8, rain: 95, smapMoist: 0.28, ndvi: 0.74, bare: false },
      { month: 'Oct', temp: 25.0, rain: 12, smapMoist: 0.19, ndvi: 0.32, bare: true },
      { month: 'Nov', temp: 19.2, rain: 6, smapMoist: 0.21, ndvi: 0.24, bare: false },
      { month: 'Dec', temp: 14.1, rain: 12, smapMoist: 0.23, ndvi: 0.38, bare: false }
    ],
    ssurgo: {
      hydrologicGroup: 'B/C (Alluvial Loam)',
      awc: '0.17 cm/cm',
      tFactor: '4.5 tons/acre/yr',
      cec: '18 meq/100g',
      ph: 7.8,
      source: 'Global SoilGrids & FAO Harmonized World Soil Database'
    },
    cropscape: {
      history: [
        { year: 2021, crop: 'Paddy Rice', cdlCode: 3 },
        { year: 2022, crop: 'Winter Wheat', cdlCode: 24 },
        { year: 2023, crop: 'Paddy Rice', cdlCode: 3 },
        { year: 2024, crop: 'Winter Wheat', cdlCode: 24 },
        { year: 2025, crop: 'Paddy Rice', cdlCode: 3 }
      ],
      monocultureRecurrenceIndex: '95/100 (Extreme Monoculture Stress)',
      dominantSequence: 'Intensive Rice-Wheat Double Crop',
      pestRisks: ['Yellow Rust in Wheat', 'Stem Borer in Rice', 'Phalaris minor Herbicide Resistance'],
      source: 'Copernicus Sentinel-2 & GAEZ Cropping Sequence'
    },
    openET: {
      annualActualET: 1180,
      annualReferenceETo: 1350,
      peakMonthET: '220 mm (July Paddy Flood)',
      ensembleModels: 'geeSEBAL & eeMETRIC',
      source: 'Copernicus / OpenET Global Modeling'
    },
    usgsWater: {
      stationId: 'Central Ground Water Board (CGWB) Ludhiana',
      depthToWaterFt: 98.5,
      tenYearChangeFt: -31.0,
      aquiferName: 'Indo-Gangetic Deep Alluvium',
      source: 'CGWB & GRACE Satellite Gravity'
    },
    faoGaez: {
      suitabilityClass: 'High Potential with Groundwater Restructuring',
      lgpDays: 240,
      source: 'FAO GAEZ v4'
    }
  },
  {
    id: 'kenya-machakos',
    name: 'Eastern Drylands (Machakos County, Kenya)',
    country: 'Kenya',
    lat: -1.52,
    lng: 37.26,
    biome: 'Semi-Arid Tropical Savanna (Bimodal Rainfall)',
    soilType: 'Alfisols / Luvisols (Sandy Clay Loam - prone to crusting)',
    soilTexture: 'Sandy Clay Loam',
    baselineSOM: 1.2,
    drainage: 'Rapid surface runoff, crusting prone',
    elevation: 1140,
    slope: 4.8,
    typicalRotation: 'Continuous Maize - Bean intercrop with prolonged dry season bare soil',
    vulnerabilities: [
      'Bimodal rainfall seasons (Long Rains Mar-May, Short Rains Oct-Dec) with high interannual variability',
      'Severe slope erosion during torrential GPM convective cloudbursts on crusted soils',
      'Rapid soil moisture depletion within 14 days after rain ceases (SMAP root-zone drops < 0.12)'
    ],
    nasaTelemetry: {
      smapRootZoneMoisture: 0.16,
      smapAnomaly: -14.2,
      ecostressESI: 0.48,
      ecostressLST: 32.5,
      gpmAnnualRainfall: 640,
      gpmExtremeStormDays: 3.8,
      nasaPowerGDD: 2300,
      heatDaysAbove35: 12,
      frostFreeDays: 365,
      graceGroundwaterTrend: -0.9,
      bareSoilDaysPerYear: 175
    },
    monthlyClimate: [
      { month: 'Jan', temp: 21.0, rain: 45, smapMoist: 0.18, ndvi: 0.36, bare: false },
      { month: 'Feb', temp: 22.2, rain: 35, smapMoist: 0.14, ndvi: 0.24, bare: true },
      { month: 'Mar', temp: 22.5, rain: 95, smapMoist: 0.25, ndvi: 0.48, bare: false },
      { month: 'Apr', temp: 21.8, rain: 140, smapMoist: 0.32, ndvi: 0.72, bare: false },
      { month: 'May', temp: 20.4, rain: 55, smapMoist: 0.22, ndvi: 0.58, bare: false },
      { month: 'Jun', temp: 18.8, rain: 10, smapMoist: 0.15, ndvi: 0.35, bare: true },
      { month: 'Jul', temp: 18.1, rain: 6, smapMoist: 0.12, ndvi: 0.22, bare: true },
      { month: 'Aug', temp: 18.6, rain: 8, smapMoist: 0.11, ndvi: 0.18, bare: true },
      { month: 'Sep', temp: 20.2, rain: 14, smapMoist: 0.11, ndvi: 0.16, bare: true },
      { month: 'Oct', temp: 21.8, rain: 65, smapMoist: 0.20, ndvi: 0.32, bare: false },
      { month: 'Nov', temp: 21.1, rain: 135, smapMoist: 0.30, ndvi: 0.68, bare: false },
      { month: 'Dec', temp: 20.6, rain: 80, smapMoist: 0.24, ndvi: 0.55, bare: false }
    ],
    ssurgo: {
      hydrologicGroup: 'C/D (Crusting Alfisols)',
      awc: '0.11 cm/cm (Low Effective Storage)',
      tFactor: '2.5 tons/acre/yr (High Erosion Sensitivity)',
      cec: '11 meq/100g',
      ph: 6.2,
      source: 'Global SoilGrids 250m & Kenya Soil Survey'
    },
    cropscape: {
      history: [
        { year: 2021, crop: 'White Maize', cdlCode: 1 },
        { year: 2022, crop: 'Common Beans', cdlCode: 5 },
        { year: 2023, crop: 'White Maize', cdlCode: 1 },
        { year: 2024, crop: 'Dry Fallow', cdlCode: 61 },
        { year: 2025, crop: 'White Maize', cdlCode: 1 }
      ],
      monocultureRecurrenceIndex: '81/100',
      dominantSequence: 'Maize-Bean Intercrop with Extended Fallow',
      pestRisks: ['Fall Armyworm (Spodoptera frugiperda)', 'Maize Lethal Necrosis (MLND)', 'Bean Fly'],
      source: 'Copernicus Sentinel-2 & FAO Crop Calendar'
    },
    openET: {
      annualActualET: 610,
      annualReferenceETo: 1450,
      peakMonthET: '110 mm (Nov Short Rains / Apr Long Rains)',
      ensembleModels: 'eeMETRIC & SSEBop Global',
      source: 'OpenET Global DisALEXI Framework'
    },
    faoGaez: {
      suitabilityClass: 'Moderately Suitable (MS) with Water Harvesting',
      lgpDays: 120,
      source: 'FAO GAEZ v4 Global Agro-Ecological Zones'
    }
  },
  {
    id: 'spain-castile',
    name: 'Castile-La Mancha / Andalusia Border (Spain)',
    country: 'Spain',
    lat: 38.98,
    lng: -3.92,
    biome: 'Mediterranean Dryland Plateau (Meseta)',
    soilType: 'Calcisols / Cambisols (Chalky Clay Loam)',
    soilTexture: 'Clay Loam',
    baselineSOM: 1.4,
    drainage: 'Moderate, high CaCO3',
    elevation: 640,
    slope: 3.2,
    typicalRotation: 'Barley / Durum Wheat - Summer Fallow ("Ano y Vez")',
    vulnerabilities: [
      'Extreme summer heat waves (ECOSTRESS LST > 44°C) causing total soil microbial dormancy',
      'Low annual rainfall (390mm) with long dry summers of 4+ consecutive months under 10mm rain',
      'High wind and rill erosion across exposed bare fallow cereal plains'
    ],
    nasaTelemetry: {
      smapRootZoneMoisture: 0.15,
      smapAnomaly: -11.5,
      ecostressESI: 0.44,
      ecostressLST: 37.4,
      gpmAnnualRainfall: 410,
      gpmExtremeStormDays: 1.9,
      nasaPowerGDD: 1880,
      heatDaysAbove35: 38,
      frostFreeDays: 220,
      graceGroundwaterTrend: -1.7,
      bareSoilDaysPerYear: 205
    },
    monthlyClimate: [
      { month: 'Jan', temp: 6.2, rain: 38, smapMoist: 0.22, ndvi: 0.28, bare: false },
      { month: 'Feb', temp: 8.5, rain: 35, smapMoist: 0.22, ndvi: 0.36, bare: false },
      { month: 'Mar', temp: 12.0, rain: 42, smapMoist: 0.20, ndvi: 0.52, bare: false },
      { month: 'Apr', temp: 14.8, rain: 48, smapMoist: 0.19, ndvi: 0.65, bare: false },
      { month: 'May', temp: 19.5, rain: 38, smapMoist: 0.15, ndvi: 0.54, bare: false },
      { month: 'Jun', temp: 25.2, rain: 18, smapMoist: 0.11, ndvi: 0.26, bare: true },
      { month: 'Jul', temp: 29.8, rain: 4, smapMoist: 0.08, ndvi: 0.14, bare: true },
      { month: 'Aug', temp: 29.2, rain: 6, smapMoist: 0.08, ndvi: 0.13, bare: true },
      { month: 'Sep', temp: 24.1, rain: 26, smapMoist: 0.10, ndvi: 0.15, bare: true },
      { month: 'Oct', temp: 17.5, rain: 52, smapMoist: 0.16, ndvi: 0.20, bare: true },
      { month: 'Nov', temp: 10.8, rain: 46, smapMoist: 0.20, ndvi: 0.22, bare: true },
      { month: 'Dec', temp: 7.1, rain: 44, smapMoist: 0.21, ndvi: 0.25, bare: false }
    ],
    ssurgo: {
      hydrologicGroup: 'B/C (Calcisols with Petrocalcic Horizon)',
      awc: '0.13 cm/cm',
      tFactor: '3.0 tons/acre/yr',
      cec: '20 meq/100g',
      ph: 8.2,
      source: 'European Soil Data Centre (ESDAC) & FAO HWSD'
    },
    cropscape: {
      history: [
        { year: 2021, crop: 'Winter Barley', cdlCode: 21 },
        { year: 2022, crop: 'Summer Bare Fallow (Barbecho)', cdlCode: 61 },
        { year: 2023, crop: 'Durum Wheat', cdlCode: 24 },
        { year: 2024, crop: 'Bare Fallow', cdlCode: 61 },
        { year: 2025, crop: 'Winter Barley', cdlCode: 21 }
      ],
      monocultureRecurrenceIndex: '86/100 (Severe Desertification Risk)',
      dominantSequence: 'Cereal - Bare Fallow ("Ano y Vez")',
      pestRisks: ['Barley Powdery Mildew', 'Cereal Cyst Nematode (Heterodera avenae)'],
      source: 'Copernicus Sentinel-2 & MAPA Spain SIGPAC'
    },
    openET: {
      annualActualET: 380,
      annualReferenceETo: 1280,
      peakMonthET: '85 mm (May Cereal Fill)',
      ensembleModels: 'Copernicus Sentinel-2 Land Surface Temperature / ET',
      source: 'Copernicus Climate Change Service (C3S)'
    },
    faoGaez: {
      suitabilityClass: 'Moderate to Marginal for Dryland Winter Cereals',
      lgpDays: 140,
      source: 'FAO GAEZ v4 Global Agro-Ecological Zones'
    }
  }
];
