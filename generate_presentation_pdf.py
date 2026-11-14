import os
import sys
from fpdf import FPDF

class SlideDeck(FPDF):
    def __init__(self):
        super().__init__(orientation='L', unit='mm', format='A4')
        self.set_auto_page_break(auto=False)
        self.total_slides = 7

    def draw_slide_chrome(self, slide_num, title, category="SOILSYNC - NASA SPACE APPS CHALLENGE 2026"):
        # Background
        self.set_fill_color(246, 249, 247)
        self.rect(0, 0, 297, 210, 'F')
        
        # Top banner bar (Deep Forest Green)
        self.set_fill_color(18, 61, 42)
        self.rect(0, 0, 297, 26, 'F')
        
        # Emerald accent line under banner
        self.set_fill_color(22, 163, 106)
        self.rect(0, 26, 297, 1.8, 'F')

        # Category pill text
        self.set_font('Arial', 'B', 8)
        self.set_text_color(167, 243, 208) # light emerald
        self.set_xy(14, 4)
        self.cell(200, 5, category.upper(), 0, 0, 'L')

        # Slide Title
        self.set_font('Arial', 'B', 14)
        self.set_text_color(255, 255, 255)
        self.set_xy(14, 10)
        self.cell(200, 12, title, 0, 0, 'L')

        # Top right brand pill
        self.set_fill_color(22, 163, 106)
        self.rect(236, 6, 47, 14, 'F')
        self.set_font('Arial', 'B', 10)
        self.set_text_color(255, 255, 255)
        self.set_xy(236, 6)
        self.cell(47, 14, 'SoilSync AI', 0, 0, 'C')

        # Footer bar
        self.set_fill_color(230, 238, 233)
        self.rect(0, 198, 297, 12, 'F')
        self.set_fill_color(22, 163, 106)
        self.rect(0, 198, 297, 0.6, 'F')

        # Footer Text
        self.set_font('Arial', '', 8)
        self.set_text_color(71, 85, 105)
        self.set_xy(14, 201)
        self.cell(180, 6, "Field Shift: Adapting Farms with NASA Data | Decision-Support Platform", 0, 0, 'L')

        # Slide Number
        self.set_font('Arial', 'B', 9)
        self.set_text_color(18, 61, 42)
        self.set_xy(240, 201)
        self.cell(43, 6, f"Slide {slide_num} of {self.total_slides}", 0, 0, 'R')

    def draw_card(self, x, y, w, h, title=None, header_bg=(235, 245, 238), border_color=(200, 225, 210)):
        # Card body
        self.set_fill_color(255, 255, 255)
        self.set_draw_color(*border_color)
        self.set_line_width(0.4)
        self.rect(x, y, w, h, 'DF')

        if title:
            self.set_fill_color(*header_bg)
            self.rect(x, y, w, 9, 'DF')
            self.set_font('Arial', 'B', 10)
            self.set_text_color(18, 61, 42)
            self.set_xy(x + 4, y + 1)
            self.cell(w - 8, 7, title, 0, 0, 'L')

    def draw_kpi(self, x, y, w, h, value, label, sub=""):
        self.set_fill_color(255, 255, 255)
        self.set_draw_color(200, 225, 210)
        self.set_line_width(0.4)
        self.rect(x, y, w, h, 'DF')
        
        # Accent top strip
        self.set_fill_color(22, 163, 106)
        self.rect(x, y, w, 2.5, 'F')

        self.set_font('Arial', 'B', 15)
        self.set_text_color(18, 61, 42)
        self.set_xy(x + 2, y + 4)
        self.cell(w - 4, 8, value, 0, 0, 'C')

        self.set_font('Arial', 'B', 8)
        self.set_text_color(71, 85, 105)
        self.set_xy(x + 2, y + 12)
        self.cell(w - 4, 5, label, 0, 0, 'C')

        if sub:
            self.set_font('Arial', '', 7)
            self.set_text_color(100, 116, 139)
            self.set_xy(x + 2, y + 17)
            self.cell(w - 4, 4, sub, 0, 0, 'C')


def generate_deck(output_path):
    pdf = SlideDeck()

    # ==========================================
    # SLIDE 1: Title & Vision
    # ==========================================
    pdf.add_page()
    # Dark hero background
    pdf.set_fill_color(18, 61, 42)
    pdf.rect(0, 0, 297, 210, 'F')

    # Decorative accent gradient-like blocks
    pdf.set_fill_color(22, 163, 106)
    pdf.rect(0, 0, 10, 210, 'F')
    pdf.rect(287, 0, 10, 210, 'F')

    # Header badge
    pdf.set_fill_color(30, 85, 60)
    pdf.rect(40, 22, 217, 10, 'F')
    pdf.set_font('Arial', 'B', 9)
    pdf.set_text_color(167, 243, 208)
    pdf.set_xy(40, 22)
    pdf.cell(217, 10, "NASA INTERNATIONAL SPACE APPS CHALLENGE 2026 | GLOBAL ENTRY", 0, 0, 'C')

    # Main Project Title
    pdf.set_font('Arial', 'B', 32)
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(30, 38)
    pdf.cell(237, 16, "SoilSync", 0, 1, 'C')

    # Subtitle
    pdf.set_font('Arial', 'B', 15)
    pdf.set_text_color(110, 231, 183) # mint green
    pdf.set_xy(30, 56)
    pdf.cell(237, 9, "Space-to-Soil Crop Rotation Intelligence Platform", 0, 1, 'C')

    # Challenge track
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(226, 232, 240)
    pdf.set_xy(30, 68)
    pdf.cell(237, 7, "Challenge: Field Shift - Adapting Farms with NASA Earth Observations", 0, 1, 'C')

    # Center Feature Card
    pdf.set_fill_color(255, 255, 255)
    pdf.rect(35, 82, 227, 68, 'F')
    pdf.set_fill_color(22, 163, 106)
    pdf.rect(35, 82, 227, 4, 'F')

    pdf.set_font('Arial', 'B', 12)
    pdf.set_text_color(18, 61, 42)
    pdf.set_xy(45, 90)
    pdf.cell(207, 7, "Core Mission: Grow Smarter. Farm Better. Protect Tomorrow.", 0, 1, 'L')

    pdf.set_font('Arial', '', 10)
    pdf.set_text_color(51, 65, 85)
    pdf.set_xy(45, 99)
    intro_text = (
        "SoilSync bridges the gap between petabytes of NASA spaceborne environmental data and field-scale\n"
        "agronomy. By harmonizing NASA SMAP, ECOSTRESS, GPM, Landsat, and GRACE-FO with local USDA SSURGO\n"
        "soils and farmer priorities, SoilSync empowers producers to transition from fragile monocultures\n"
        "to climate-resilient, water-efficient, and soil-enriching crop rotations."
    )
    pdf.multi_cell(207, 5.5, intro_text)

    # 4 Quick Pillar Badges inside center card
    pillars = [
        ("25+ Data Sources", "NASA + USDA + ESA"),
        ("-35% Water Footprint", "Drought Resilient"),
        ("+0.42% 5-Yr SOM", "Carbon Sequestration"),
        ("-85% Soil Erosion", "Continuous Groundcover")
    ]
    px = 45
    for title, desc in pillars:
        pdf.set_fill_color(235, 245, 238)
        pdf.set_draw_color(167, 243, 208)
        pdf.rect(px, 126, 48, 18, 'DF')
        pdf.set_font('Arial', 'B', 9)
        pdf.set_text_color(18, 61, 42)
        pdf.set_xy(px, 128)
        pdf.cell(48, 6, title, 0, 0, 'C')
        pdf.set_font('Arial', '', 7.5)
        pdf.set_text_color(71, 85, 105)
        pdf.set_xy(px, 134)
        pdf.cell(48, 6, desc, 0, 0, 'C')
        px += 53

    # Bottom link bar
    pdf.set_fill_color(14, 46, 32)
    pdf.rect(35, 160, 227, 24, 'F')
    pdf.set_font('Arial', 'B', 9)
    pdf.set_text_color(226, 232, 240)
    pdf.set_xy(45, 164)
    pdf.cell(207, 5, "Author: mdmidlaj47-cloud | Live Interactive Web Application & GitHub Repository", 0, 1, 'C')
    pdf.set_font('Arial', '', 8.5)
    pdf.set_text_color(110, 231, 183)
    pdf.set_xy(45, 171)
    pdf.cell(207, 5, "https://github.com/mdmidlaj47-cloud/soilsync | Public NASA Demonstration Deck", 0, 1, 'C')

    # ==========================================
    # SLIDE 2: The Challenge
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_chrome(2, "The Challenge: Fragile Monocultures Under Accelerating Climate Stress")

    # 4 Issue Cards
    issues = [
        ("1. Shifting Precipitation & Extreme Heat",
         "Erratic cloudbursts alternate with sudden heat waves during critical grain-filling stages. High vapor pressure deficits (VPD) trigger premature stomatal closure, slashing crop yields up to 40% under traditional single-crop systems.",
         (254, 242, 242), (239, 68, 68)),
        ("2. The Fallow Vulnerability Window",
         "Standard corn-soy rotations leave fields exposed and completely bare for 120-165 days each winter and spring. Heavy early-spring rains cause irreversible topsoil sheet erosion averaging 3.8 tons/hectare annually.",
         (255, 251, 235), (245, 158, 11)),
        ("3. Groundwater Depletion & Aquifer Stress",
         "Intensive irrigation has depleted critical agricultural aquifers (e.g. Ogallala, Central Valley) by over 30% since 1980. Traditional crops demand water beyond natural recharge capacities without proactive replenishment.",
         (239, 246, 255), (59, 130, 246)),
        ("4. Soil Organic Matter (SOM) Exhaustion",
         "Repeated continuous tillage and absence of organic residue cycles deplete soil carbon below 1.5%. Degraded soils lose water-holding capacity, creating a compounding cycle of drought vulnerability and synthetic fertilizer dependency.",
         (245, 243, 255), (139, 92, 246))
    ]

    cx = 14
    cy = 34
    cw = 130
    ch = 72

    for i, (title, desc, bg, acc) in enumerate(issues):
        x = cx if i % 2 == 0 else cx + cw + 9
        y = cy if i < 2 else cy + ch + 8
        pdf.draw_card(x, y, cw, ch, title, header_bg=bg)
        
        # Left accent stripe
        pdf.set_fill_color(*acc)
        pdf.rect(x, y, 2.5, ch, 'F')

        pdf.set_font('Arial', '', 9.5)
        pdf.set_text_color(51, 65, 85)
        pdf.set_xy(x + 6, y + 13)
        pdf.multi_cell(cw - 10, 5.2, desc)

    # Bottom summary callout
    pdf.set_fill_color(235, 245, 238)
    pdf.set_draw_color(22, 163, 106)
    pdf.set_line_width(0.5)
    pdf.rect(14, 168, 269, 22, 'DF')
    pdf.set_font('Arial', 'B', 10)
    pdf.set_text_color(18, 61, 42)
    pdf.set_xy(18, 171)
    pdf.cell(260, 6, "The Core Problem Farmers Face Today:", 0, 1, 'L')
    pdf.set_font('Arial', '', 9)
    pdf.set_text_color(30, 41, 59)
    pdf.set_xy(18, 178)
    pdf.cell(260, 5, "Farmers know diversification builds resilience, but lack localized, field-scale intelligence to evaluate how new rotation crops", 0, 1, 'L')
    pdf.set_xy(18, 183)
    pdf.cell(260, 5, "will interact with their specific soil horizons, regional water budgets, and market dynamics under changing weather extremes.", 0, 1, 'L')

    # ==========================================
    # SLIDE 3: The Solution
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_chrome(3, "The Solution: SoilSync Autonomous Space-to-Soil Architecture")

    # Workflow Columns
    stages = [
        ("STAGE 1: INGESTION", "Satellite & Terrestrial Data",
         ["NASA SMAP (Moisture)", "NASA ECOSTRESS (ESI)", "NASA GPM (Rainfall)", "Landsat 8/9 & Sentinel-2", "GRACE-FO Aquifer Trends", "USDA SSURGO & CropScape"],
         14),
        ("STAGE 2: FUSION", "Multi-Resolution Harmonization",
         ["Bilinear Spatial Resampling", "Temporal Gap-Filling", "Harmonization: 300km to 30m", "Bare Soil Spectral Masking", "Water Balance Calculations", "Heat Envelope Modeling"],
         81),
        ("STAGE 3: AGRO-AI", "Agronomic Simulation Engine",
         ["24+ Crop Trait Database", "Phenology Windows (GDD)", "Biological N-Fixation Model", "Soil Organic Matter (SOM)", "Erosion Hazard (RUSLE-2)", "Gross Margin Economics"],
         148),
        ("STAGE 4: OUTCOME", "Farmer Decision Support",
         ["4 Multi-Criteria Rotations", "Interactive Leaflet Field HUD", "3-Year Gantt Timeline", "Bare-Ground Shield Metrics", "Climate Anomaly Simulator", "Printable Advisory Reports"],
         215)
    ]

    for title, sub, bullets, x in stages:
        pdf.draw_card(x, 34, 63, 126, title)
        pdf.set_font('Arial', 'B', 8.5)
        pdf.set_text_color(22, 163, 106)
        pdf.set_xy(x + 3, 44)
        pdf.cell(57, 5, sub, 0, 1, 'L')

        by = 52
        for b in bullets:
            pdf.set_fill_color(22, 163, 106)
            pdf.rect(x + 4, by + 1.8, 1.8, 1.8, 'F')
            pdf.set_font('Arial', '', 8.5)
            pdf.set_text_color(51, 65, 85)
            pdf.set_xy(x + 8, by)
            pdf.cell(52, 5, b, 0, 1, 'L')
            by += 8.5

    # Bottom Banner: Non-prescriptive philosophy
    pdf.set_fill_color(18, 61, 42)
    pdf.rect(14, 166, 269, 24, 'F')
    pdf.set_font('Arial', 'B', 10)
    pdf.set_text_color(110, 231, 183)
    pdf.set_xy(20, 170)
    pdf.cell(257, 5, "Farmer-Centered Decision Support -- Not an Automated Black Box", 0, 1, 'L')
    pdf.set_font('Arial', '', 9)
    pdf.set_text_color(226, 232, 240)
    pdf.set_xy(20, 177)
    pdf.multi_cell(257, 5, "SoilSync does not replace farmer judgment or certified local agronomists. It clarifies trade-offs, highlights bare-ground\nexposure windows, and simulates evidence-backed rotation scenarios so farmers can make informed, resilient decisions.")

    # ==========================================
    # SLIDE 4: NASA Earth Observations
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_chrome(4, "NASA Earth Observations & Ground-Truth Fusion")

    sensors = [
        ("NASA SMAP", "Soil Moisture Active Passive", "9 km / 3 km (L4 Root Zone)", "Monitors moisture in top 100 cm root-zone. Detects planting-season deficits to prevent seed mortality.", (235, 245, 238)),
        ("NASA ECOSTRESS", "Space Station Thermal Radiometer", "70 m (ESI / ET Evaporation)", "Evaporative Stress Index detects plant thermal stress 7-10 days before visual wilting occurs.", (254, 242, 242)),
        ("NASA GPM IMERG", "Global Precipitation Measurement", "0.1 deg (~10 km) Multi-satellite", "30-min cloudburst detection. Identifies high-intensity erosive rain events and flood runoff hazards.", (239, 246, 255)),
        ("Landsat 8/9 & Sentinel-2", "USGS / NASA / ESA Multispectral", "30 m / 10 m Optical Imagery", "Computes seasonal NDVI, EVI, and NDRE canopy vigor. Automates detection of bare-ground exposure.", (240, 253, 244)),
        ("NASA GRACE-FO", "Gravity Recovery & Climate Exp.", "~300 km Gravity Anomalies", "Tracks multi-year terrestrial water storage & deep aquifer decline trends (e.g. Ogallala depletion).", (245, 243, 255)),
        ("NASA SRTM", "Shuttle Radar Topography Mission", "30 m Digital Elevation (DEM)", "Derives slope angle, flow accumulation, and watershed topography to model RUSLE-2 erosion risks.", (255, 251, 235))
    ]

    sx = 14
    sy = 33
    sw = 87
    sh = 52

    for i, (name, role, res, detail, bg) in enumerate(sensors):
        col = i % 3
        row = i // 3
        x = sx + col * (sw + 4)
        y = sy + row * (sh + 5)
        pdf.draw_card(x, y, sw, sh, name, header_bg=bg)

        pdf.set_font('Arial', 'B', 8.5)
        pdf.set_text_color(22, 163, 106)
        pdf.set_xy(x + 4, y + 11)
        pdf.cell(sw - 8, 4.5, role, 0, 1, 'L')

        pdf.set_font('Arial', 'I', 7.5)
        pdf.set_text_color(100, 116, 139)
        pdf.set_xy(x + 4, y + 16)
        pdf.cell(sw - 8, 4, f"Native Resolution: {res}", 0, 1, 'L')

        pdf.set_font('Arial', '', 8)
        pdf.set_text_color(51, 65, 85)
        pdf.set_xy(x + 4, y + 22)
        pdf.multi_cell(sw - 8, 4.2, detail)

    # Ingestion badge at bottom
    pdf.set_fill_color(255, 255, 255)
    pdf.set_draw_color(200, 225, 210)
    pdf.rect(14, 150, 269, 40, 'DF')
    pdf.set_font('Arial', 'B', 9.5)
    pdf.set_text_color(18, 61, 42)
    pdf.set_xy(18, 153)
    pdf.cell(260, 5, "Cross-Resolution Data Harmonization Engine: 25+ Authoritative Portals Integrated", 0, 1, 'L')

    sub_sources = (
        "- USDA SSURGO Soils: Drainage classes, available water capacity (AWC), hydrologic groups (A-D), and organic matter baseline.\n"
        "- USDA CropScape CDL: 5-year historical crop rotation sequences at 30 m resolution to diagnose continuous monocultures.\n"
        "- OpenET & PRISM: Consumptive water use data and high-resolution 4 km temperature/precipitation normals.\n"
        "- USDA AMS & FAO GAEZ: Real-time agricultural commodity prices, regional yield potentials, and global agro-climatic constraints."
    )
    pdf.set_font('Arial', '', 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.set_xy(18, 160)
    pdf.multi_cell(260, 4.5, sub_sources)

    # ==========================================
    # SLIDE 5: The Rotation Engine
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_chrome(5, "The Rotation Engine: Multi-Objective Strategy Comparison")

    strats = [
        ("Strategy A: Monoculture (Baseline)",
         "Corn -> Soybean (Continuous)",
         [("Water Demand", "680 mm/yr (100%)", (239, 68, 68)),
          ("Bare Fallow Exposure", "165 Days Bare / Yr", (239, 68, 68)),
          ("5-Yr SOM Delta", "-0.15% (Loss)", (239, 68, 68)),
          ("Soil Erosion Loss", "3.8 tons / ha / yr", (239, 68, 68)),
          ("Net Gross Margin", "$680 / ha", (100, 116, 139))],
         14),
        ("Strategy B: Water-Resilient Rotation",
         "Grain Sorghum -> Winter Wheat -> Tepary Bean",
         [("Water Demand", "440 mm/yr (-35%)", (22, 163, 106)),
          ("Bare Fallow Exposure", "95 Days / Yr (-42%)", (22, 163, 106)),
          ("5-Yr SOM Delta", "+0.18% (Gain)", (22, 163, 106)),
          ("Deep Taproot Depth", "180 cm (Moisture Access)", (22, 163, 106)),
          ("Net Gross Margin", "$720 / ha (+$40)", (22, 163, 106))],
         81),
        ("Strategy C: Regenerative Living Armor",
         "Corn + Rye Cover -> Soy + Crimson Clover -> Tillage Radish",
         [("Water Demand", "590 mm/yr (-13%)", (22, 163, 106)),
          ("Bare Fallow Exposure", "25 Days / Yr (-85%)", (22, 163, 106)),
          ("5-Yr SOM Delta", "+0.42% (Max Carbon)", (22, 163, 106)),
          ("Soil Erosion Loss", "0.6 tons/ha (-84%)", (22, 163, 106)),
          ("Biological N-Fixation", "+110 kg N / ha", (22, 163, 106))],
         148),
        ("Strategy D: NASA Climate-Adaptive",
         "Dynamic Multi-Crop Sequenced to GPM & SMAP Anomalies",
         [("Water Demand", "485 mm/yr (-29%)", (22, 163, 106)),
          ("Bare Fallow Exposure", "35 Days / Yr (-79%)", (22, 163, 106)),
          ("Pest Cycle Disruption", "Score: 92/100 (Superior)", (22, 163, 106)),
          ("Climate Stress Buffer", "High (Thermal + Rain)", (22, 163, 106)),
          ("Net Gross Margin", "$865 / ha (+$185/ha)", (22, 163, 106))],
         215)
    ]

    for title, sub, metrics, x in strats:
        pdf.draw_card(x, 34, 63, 126, title, header_bg=(235, 245, 238) if "Baseline" not in title else (254, 242, 242))
        pdf.set_font('Arial', 'I', 8)
        pdf.set_text_color(71, 85, 105)
        pdf.set_xy(x + 3, 44)
        pdf.multi_cell(57, 3.8, sub)

        my = 57
        for label, val, col in metrics:
            pdf.set_fill_color(248, 250, 249)
            pdf.rect(x + 3, my, 57, 12, 'F')
            pdf.set_font('Arial', '', 7.5)
            pdf.set_text_color(100, 116, 139)
            pdf.set_xy(x + 4, my + 1)
            pdf.cell(55, 4, label, 0, 1, 'L')

            pdf.set_font('Arial', 'B', 8.5)
            pdf.set_text_color(*col)
            pdf.set_xy(x + 4, my + 6)
            pdf.cell(55, 5, val, 0, 1, 'L')
            my += 13.5

    # Bottom trade-off indicator
    pdf.set_fill_color(235, 245, 238)
    pdf.set_draw_color(22, 163, 106)
    pdf.rect(14, 166, 269, 24, 'DF')
    pdf.set_font('Arial', 'B', 9.5)
    pdf.set_text_color(18, 61, 42)
    pdf.set_xy(18, 170)
    pdf.cell(260, 5, "Multi-Criteria Optimization Engine Balancing 6 Agronomic Dimensions:", 0, 1, 'L')
    pdf.set_font('Arial', '', 8.5)
    pdf.set_text_color(51, 65, 85)
    pdf.set_xy(18, 177)
    pdf.cell(260, 5, "1. Water Conservation  |  2. Soil Organic Carbon  |  3. Economic Gross Margin  |  4. Erosion Shield  |  5. Nitrogen Fixation  |  6. Pest Disruption", 0, 1, 'L')

    # ==========================================
    # SLIDE 6: Live Product & UI
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_chrome(6, "Live Product & Farmer Experience: Interactive Field Intelligence")

    # 4 UI Module Cards
    ui_mods = [
        ("1. Interactive Geospatial Field Map",
         "Built with Leaflet.js, featuring high-resolution satellite basemaps and interactive parcel polygon delineation (~64 ha). Allows farmers to toggle 8 live NASA raster overlays: SMAP Root-Zone Moisture, ECOSTRESS Evaporation, GPM IMERG Rainfall, Landsat 8/9 NDVI, OpenET, USDA CropScape, GRACE Aquifer Trends, and SRTM Topography.",
         14, 34, 130, 60),
        ("2. Real-Time Telemetry & Sensor HUD",
         "Floating cockpit meters display real-time biophysical readings for the selected field parcel: Canopy NDVI (0.82), Root Moisture (0.28 m3/m3), Evaporative Stress ESI (0.68), Annual Rainfall (890 mm), and Days of Bare Soil Exposure (165 days). Features 1-click climate shift simulation (-40% to +40% rain, +4 deg C warming).",
         153, 34, 130, 60),
        ("3. 3-Year Phenology Timeline (Gantt)",
         "Visualizes growing windows, dormant periods, and cover crop canopy coverage across a 36-month horizon. Directly flags bare-soil vulnerability windows in red, showing exactly when interseeded cover crops (e.g. cereal rye, crimson clover) close the erosion gap and shield vulnerable topsoil.",
         14, 100, 130, 60),
        ("4. Agronomic Advisory Report Generator",
         "Generates a complete, print-ready agronomic assessment report formatted for regional extension officers. Includes verified NASA dataset citations, SSURGO soil diagnostics, uncertainty bounds, agronomic safeguards, and required soil-testing validation steps before planting.",
         153, 100, 130, 60)
    ]

    for title, desc, x, y, w, h in ui_mods:
        pdf.draw_card(x, y, w, h, title)
        pdf.set_fill_color(22, 163, 106)
        pdf.rect(x, y, 2.5, h, 'F')
        pdf.set_font('Arial', '', 8.5)
        pdf.set_text_color(51, 65, 85)
        pdf.set_xy(x + 5, y + 12)
        pdf.multi_cell(w - 9, 4.8, desc)

    # Bottom link bar
    pdf.set_fill_color(18, 61, 42)
    pdf.rect(14, 167, 269, 23, 'F')
    pdf.set_font('Arial', 'B', 10)
    pdf.set_text_color(110, 231, 183)
    pdf.set_xy(20, 171)
    pdf.cell(257, 5, "Live Web Platform Tested Across 6 Benchmark Agricultural Regions Globally:", 0, 1, 'L')
    pdf.set_font('Arial', '', 8.5)
    pdf.set_text_color(226, 232, 240)
    pdf.set_xy(20, 178)
    pdf.cell(257, 5, "USA Midwest Corn Belt  |  California Central Valley  |  Kansas High Plains  |  Punjab Breadbasket  |  Machakos Kenya  |  Castile Spain", 0, 1, 'L')

    # ==========================================
    # SLIDE 7: Impact & Roadmap
    # ==========================================
    pdf.add_page()
    pdf.draw_slide_chrome(7, "Global Impact, Scalability & Roadmap")

    # 4 Impact Pillars
    impacts = [
        ("Environmental Resilience",
         "- Reduces irrigation water demand by up to 35%\n- Cuts topsoil erosion by up to 85% with living armor\n- Sequesters +0.42% soil organic carbon over 5 years\n- Shields depleted agricultural aquifers from overdraft",
         14, 34, 130, 62),
        ("Economic Sustainability",
         "- Enhances net farmer gross margins up to +$185 / ha\n- Reduces synthetic nitrogen costs via legume fixation\n- Diversifies farm income across multiple market crops\n- Minimizes crop failure risks during extreme drought",
         153, 34, 130, 62),
        ("Open Science & Scalability",
         "- Built exclusively on 100% open-access NASA & public data\n- Pre-benchmarked across North America, Asia, Africa, Europe\n- Zero proprietary lock-in; reproducible algorithms\n- Fully responsive web UI accessible on desktop, tablet, mobile",
         14, 102, 130, 62),
        ("Future Roadmap",
         "- Phase 1: On-farm IoT soil probe & weather station telemetry\n- Phase 2: Offline-first PWA for low-connectivity rural fields\n- Phase 3: Automated carbon credit verification & registry\n- Phase 4: Localized multi-language audio advisories",
         153, 102, 130, 62)
    ]

    for title, desc, x, y, w, h in impacts:
        pdf.draw_card(x, y, w, h, title)
        pdf.set_fill_color(52, 120, 201) if "Roadmap" in title else (22, 163, 106)
        pdf.rect(x, y, 2.5, h, 'F')
        pdf.set_font('Arial', '', 8.5)
        pdf.set_text_color(51, 65, 85)
        pdf.set_xy(x + 5, y + 12)
        pdf.multi_cell(w - 9, 4.8, desc)

    # Bottom Closing Tagline
    pdf.set_fill_color(18, 61, 42)
    pdf.rect(14, 170, 269, 21, 'F')
    pdf.set_font('Arial', 'B', 12)
    pdf.set_text_color(255, 255, 255)
    pdf.set_xy(20, 173)
    pdf.cell(257, 7, "SoilSync: Grow Smarter. Farm Better. Protect Tomorrow.", 0, 1, 'C')
    pdf.set_font('Arial', '', 8.5)
    pdf.set_text_color(110, 231, 183)
    pdf.set_xy(20, 181)
    pdf.cell(257, 5, "NASA Space Apps Challenge 2026 | Public Repository: https://github.com/mdmidlaj47-cloud/soilsync", 0, 1, 'C')

    # Output file
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path, 'F')
    print(f"Presentation PDF successfully created at: {output_path}")

if __name__ == '__main__':
    out_file = sys.argv[1] if len(sys.argv) > 1 else "SoilSync_Project_Demonstration_7_Slides.pdf"
    generate_deck(out_file)
