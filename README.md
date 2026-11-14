# SoilSync: AI-Powered Smart Farming & Space-to-Soil Intelligence

[![NASA Space Apps Challenge 2026](https://img.shields.io/badge/NASA%20Space%20Apps-Challenge%202026-blue.svg)](https://www.spaceappschallenge.org/)
[![Track](https://img.shields.io/badge/Track-Field%20Shift%3A%20Adapting%20Farms-16A36A.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://react.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900.svg)](https://leafletjs.com/)

> **"Grow Smarter. Farm Better. Protect Tomorrow."**  
> Empowering farmers with AI, NASA Earth observations, and real-time environmental insights for sustainable, resilient agriculture.

---

## 📄 Official Demonstration (7 Slides PDF)

As required by the **NASA Space Apps Challenge Global Awards Guidelines**, our official 7-slide presentation is available directly in this repository:

* 📥 **[Download 7-Slide PDF Presentation (Direct File)](./SoilSync_Project_Demonstration_7_Slides.pdf)**

---

## 📌 Project Overview

**SoilSync** is an autonomous agro-ecological decision-support platform engineered to solve the **"Field Shift: Adapting Farms with NASA Data"** challenge.

Farmers around the world face unprecedented challenges: shifting temperatures, erratic rainfall, groundwater overdraft, topsoil erosion, and declining soil organic matter. Selecting new crops to adapt to these pressures is complex because crops that improve soil health in one region may deplete water, conflict with local markets, or miss seasonal thermal windows elsewhere.

SoilSync bridges this gap by fusing **petabytes of NASA spaceborne environmental data** (SMAP, ECOSTRESS, GPM, Landsat, GRACE-FO, SRTM) with **local ground data** (USDA SSURGO, CropScape CDL, OpenET, PRISM) and **farmer priorities** to model and compare **four distinct, climate-resilient crop rotation pathways**.

---

## 🛰️ NASA Earth Observations & Ingested Datasets

SoilSync harmonizes datasets across wide spatial scales (from 300 km gravity anomalies to 10 m multispectral pixels) into a unified field-scale analysis grid:

| Dataset / Mission | Spatial Resolution | Temporal Frequency | Biophysical Parameter & Agronomic Application |
| :--- | :--- | :--- | :--- |
| **NASA SMAP** (L4) | 9 km / 3 km | 3 hours | **Root-Zone Soil Moisture (0–100 cm)**: Pre-planting drought detection and root saturation thresholds. |
| **NASA ECOSTRESS** | 70 m | 1–5 days | **Evaporative Stress Index (ESI)**: Thermal canopy stress alerts 7–10 days before visual leaf wilting. |
| **NASA GPM IMERG** | 0.1° (~10 km) | 30 minutes | **Precipitation Anomalies & Cloudbursts**: High-intensity rainfall runoff and soil detachment hazards. |
| **Landsat 8/9 & Sentinel-2** | 30 m / 10 m | 5–16 days | **NDVI / EVI / NDRE**: Photosynthetic canopy vigor and automatic bare-ground fallow detection. |
| **NASA GRACE / GRACE-FO** | ~300 km | Monthly | **Terrestrial Water Storage (TWS)**: Deep agricultural aquifer depletion trends (e.g. Ogallala, Central Valley). |
| **NASA SRTM** | 30 m | Static DEM | **Topographic Slope & Aspect**: Flow accumulation and RUSLE-2 water erosion hazard modeling. |
| **NASA POWER** | 0.5° x 0.5° | Daily | **Agroclimatology**: Growing Degree Days (GDD Base 10°C), solar insolation, and frost risk envelopes. |
| **USDA SSURGO** | Vector / 10 m | Annual | **Soil Diagnostic Properties**: Available water capacity, drainage classes, hydrologic groups (A–D), and baseline SOM. |
| **USDA CropScape CDL** | 30 m | Annual | **5-Year Historical Rotation Sequences**: Crop frequency tracking and monoculture detection. |
| **OpenET** | 30 m | Monthly | **Consumptive Water Use**: Field-scale actual evapotranspiration (ETa) accounting. |

---

## 🔄 The Rotation Engine: 4-Strategy Comparison

SoilSync simulates and compares 4 multi-year rotation strategies against historical benchmarks:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 SOILSYNC MULTI-OBJECTIVE ROTATION ENGINE                               │
├──────────────────────────┬──────────────────────────┬──────────────────────────┬───────────────────────┤
│ Strategy A (Baseline)    │ Strategy B (Water-Res.)  │ Strategy C (Living Armor)│ Strategy D (Adaptive) │
├──────────────────────────┼──────────────────────────┼──────────────────────────┼───────────────────────┤
│ Continuous Corn-Soy      │ Sorghum-Wheat-Tepary     │ Corn+Rye-Soy+Clover-Rad. │ Dynamic Climate Mix   │
│ • Water: 680 mm/yr       │ • Water: 440 mm (-35%)   │ • Water: 590 mm (-13%)   │ • Water: 485 mm (-29%)│
│ • Fallow: 165 days bare  │ • Fallow: 95 days bare   │ • Fallow: 25 days bare   │ • Fallow: 35 days bare│
│ • 5-Yr SOM: -0.15%       │ • 5-Yr SOM: +0.18%       │ • 5-Yr SOM: +0.42% (Max) │ • 5-Yr SOM: +0.31%    │
│ • Erosion: 3.8 t/ha/yr   │ • Erosion: 2.1 t/ha/yr   │ • Erosion: 0.6 t/ha/yr   │ • Erosion: 0.9 t/ha/yr│
│ • Margin: $680/ha        │ • Margin: $720/ha        │ • N-Fixation: +110 kg/ha │ • Margin: $865 (+$185)│
└──────────────────────────┴──────────────────────────┴──────────────────────────┴───────────────────────┘
```

1. **Continuous Monoculture (Baseline)**: Corn $\rightarrow$ Soybean standard rotation. Identifies 165 days of bare-soil winter vulnerability and ongoing topsoil loss.
2. **Water-Resilient Rotation**: Grain Sorghum $\rightarrow$ Winter Wheat $\rightarrow$ Tepary Bean. Achieves a **35% reduction in irrigation water demand** through deep taproots.
3. **Regenerative Living Armor**: Corn + Cereal Rye $\rightarrow$ Soybean + Crimson Clover $\rightarrow$ Tillage Radish. Cuts soil erosion by **85%** and increases 5-year Soil Organic Matter (SOM) by **+0.42%**.
4. **NASA Climate-Adaptive**: Dynamic rotation matching seasonal GPM precipitation and SMAP root-zone moisture anomalies. Generates **+$185/ha in net economic margin** while disrupting pest cycles (92/100 score).

---

## 💻 Tech Stack & Architecture

* **Frontend**: React 18, Vite 5, Tailwind CSS
* **Mapping**: Leaflet 1.9.4 with OpenStreetMap & Esri World Imagery
* **Icons & Animation**: Lucide-React, Canvas-Confetti
* **Design Identity**: Deep Forest Green (`#123D2A`), Emerald Green (`#16A36A`), Light Green (`#E7F4E9`), Technology Blue (`#3478C9`), Poppins typography.
* **Testing & Verification**: Headless Browser UI Verification with 0 console errors.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
* Node.js 18+ and npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/mdmidlaj47-cloud/soilsync.git
cd soilsync

# Install dependencies
npm install

# Start the local development server
npm run dev

# Or build for production & preview
npm run build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌍 Benchmark Regions

SoilSync is pre-configured and tested across 6 diverse agricultural regions:
1. **US Midwest Corn Belt** (Boone County, Iowa)
2. **California Central Valley** (Fresno County, California)
3. **US High Plains** (Thomas County, Kansas)
4. **Punjab Breadbasket** (Ludhiana District, India)
5. **Semi-Arid Drylands** (Machakos County, Kenya)
6. **Mediterranean Plateau** (Castile and León, Spain)

---

## 👥 Author & Acknowledgements

* **Developer**: mdmidlaj47-cloud ([mdmidlaj47@gmail.com](mailto:mdmidlaj47@gmail.com))
* **Challenge**: NASA International Space Apps Challenge 2026
* **Data Providers**: NASA Earthdata, LP DAAC, NASA Goddard Space Flight Center, USGS Earth Resources Observation and Science (EROS), USDA Natural Resources Conservation Service (NRCS), European Space Agency (ESA) Copernicus Programme.

---

*SoilSync is an evidence-backed decision-support system designed to empower human judgment and local agronomic expertise.*
