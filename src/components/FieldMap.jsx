import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, MapPin, Eye, Info, Sparkles, Navigation } from 'lucide-react';

export default function FieldMap({
  selectedRegion,
  onLocationChange,
  activeNasaLayer,
  setActiveNasaLayer
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const polygonRef = useRef(null);
  const layerOverlayRef = useRef(null);

  const [fieldAreaHectares, setFieldAreaHectares] = useState(64); // standard quarter-section (160 acres = ~64.7 ha)

  // Satellite and Base Map Tile Providers
  const TILE_PROVIDERS = {
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };

  const [baseMapType, setBaseMapType] = useState('satellite');

  // Layer details and color ramps
  const NASA_LAYERS = [
    {
      id: 'smap',
      name: 'SMAP Root-Zone Moisture',
      sensor: 'SMAP L4_SM 9km/1km',
      unit: 'm³/m³',
      range: '0.08 (Arid) → 0.38 (Saturated)',
      gradient: 'from-amber-600 via-yellow-400 to-emerald-500',
      description: 'L-Band radiometer measuring water available to crop roots (0-100cm depth).'
    },
    {
      id: 'ecostress',
      name: 'ECOSTRESS Evaporative Stress (ESI)',
      sensor: 'ISS ECOSTRESS 70m',
      unit: 'ESI Index (0 - 1)',
      range: '0.2 (Severe Stress) → 0.9 (Healthy Transpiration)',
      gradient: 'from-red-600 via-orange-400 to-cyan-400',
      description: 'Thermal IR on ISS detecting canopy transpiration shutdown before visible browning.'
    },
    {
      id: 'gpm',
      name: 'GPM Extreme Precipitation',
      sensor: 'GPM IMERG 0.1° DPR',
      unit: 'mm / season',
      range: '200mm → 1200mm',
      gradient: 'from-blue-300 via-blue-600 to-indigo-900',
      description: 'Multi-satellite precipitation tracking erosive convective cloudbursts.'
    },
    {
      id: 'landsat',
      name: 'Landsat/MODIS NDVI & Bare Soil',
      sensor: 'Landsat 8/9 30m',
      unit: 'NDVI Index',
      range: '0.1 (Bare Soil) → 0.85 (Dense Canopy)',
      gradient: 'from-amber-700 via-lime-500 to-emerald-700',
      description: 'Detects photosynthetic vigor and verifies bare-ground exposure windows.'
    },
    {
      id: 'openet',
      name: 'OpenET Field Evapotranspiration',
      sensor: 'OpenET Landsat 30m Ensemble',
      unit: 'mm / month ET',
      range: '20mm (Low) → 190mm (Peak Demand)',
      gradient: 'from-blue-200 via-cyan-500 to-indigo-700',
      description: '30m field-scale ensemble evapotranspiration for precision irrigation and water budget accounting.'
    },
    {
      id: 'cropscape',
      name: 'USDA CropScape Land Cover',
      sensor: 'USDA NASS CDL 30m',
      unit: 'CDL Classification',
      range: 'Corn (Yellow) • Soy (Green) • Wheat (Brown)',
      gradient: 'from-yellow-400 via-green-600 to-amber-800',
      description: 'Geo-referenced satellite cropland classification verifying multi-year crop sequences.'
    },
    {
      id: 'grace',
      name: 'GRACE Deep Aquifer Anomaly',
      sensor: 'GRACE-FO Gravimetry',
      unit: 'cm/yr water equivalent',
      range: '-3.5 cm/yr (Depletion) → +1.0 cm/yr (Recharge)',
      gradient: 'from-rose-700 via-purple-500 to-blue-500',
      description: 'Measures macro-scale gravity shifts indicating regional groundwater depletion.'
    },
    {
      id: 'srtm',
      name: 'SRTM Topography & Slope Runoff',
      sensor: 'SRTM / NASADEM 30m',
      unit: '% Slope / TWI',
      range: '0.5% (Flat) → 12% (Severe Runoff Risk)',
      gradient: 'from-emerald-600 via-amber-500 to-red-600',
      description: 'Calculates topographic slope and flow accumulation driving rill erosion.'
    }
  ];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Reset container if it was previously initialized
    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (err) {
        // ignore
      }
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        center: [selectedRegion.lat, selectedRegion.lng],
        zoom: 13,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer(TILE_PROVIDERS[baseMapType], {
        maxZoom: 18,
      }).addTo(map);

      // Custom pulsing SVG marker
      const customIcon = L.divIcon({
        className: 'custom-farm-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
            <div style="position: absolute; width: 36px; height: 36px; background: rgba(22, 163, 106, 0.35); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 22px; height: 22px; background: #16A36A; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
              <div style="width: 6px; height: 6px; background: #FFFFFF; border-radius: 50%;"></div>
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([selectedRegion.lat, selectedRegion.lng], {
        icon: customIcon,
        draggable: true
      }).addTo(map);

      marker.on('dragend', (e) => {
        const { lat, lng } = e.target.getLatLng();
        onLocationChange(Number(lat.toFixed(4)), Number(lng.toFixed(4)));
      });

      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        updateFieldPolygon(map, lat, lng);
        onLocationChange(Number(lat.toFixed(4)), Number(lng.toFixed(4)));
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      updateFieldPolygon(map, selectedRegion.lat, selectedRegion.lng);
    } catch (err) {
      console.error('Leaflet initialization error:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (err) {
          // ignore
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when selectedRegion changes
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo([selectedRegion.lat, selectedRegion.lng], 13, {
        duration: 1.2
      });
      markerRef.current.setLatLng([selectedRegion.lat, selectedRegion.lng]);
      updateFieldPolygon(mapInstanceRef.current, selectedRegion.lat, selectedRegion.lng);
    }
  }, [selectedRegion]);

  // Update basemap tiles when baseMapType changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });
    L.tileLayer(TILE_PROVIDERS[baseMapType], {
      maxZoom: 18,
    }).addTo(mapInstanceRef.current);

    if (markerRef.current && typeof markerRef.current.setZIndexOffset === 'function') {
      markerRef.current.setZIndexOffset(1000);
    }
    if (polygonRef.current && typeof polygonRef.current.bringToFront === 'function') {
      polygonRef.current.bringToFront();
    }
  }, [baseMapType]);

  // Helper to draw simulated rectangular farm field boundary parcel
  const updateFieldPolygon = (map, lat, lng) => {
    if (polygonRef.current) {
      map.removeLayer(polygonRef.current);
    }

    // ~800m x 800m parcel = 64 hectares (160 acres)
    const latOffset = 0.0036;
    const lngOffset = 0.0048;

    const bounds = [
      [lat - latOffset, lng - lngOffset],
      [lat - latOffset, lng + lngOffset],
      [lat + latOffset, lng + lngOffset],
      [lat + latOffset, lng - lngOffset]
    ];

    const polygon = L.polygon(bounds, {
      color: '#10B981',
      weight: 2.5,
      dashArray: '6, 6',
      fillColor: '#10B981',
      fillOpacity: 0.18
    }).addTo(map);

    polygonRef.current = polygon;
  };

  const activeLayerInfo = NASA_LAYERS.find(l => l.id === activeNasaLayer) || NASA_LAYERS[0];

  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
      {/* Map DOM node */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Header / Coordinates readout */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 max-w-[calc(100%-2rem)]">
        <div className="glass-panel px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-2 border border-slate-600/60">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono font-semibold text-slate-100">
            {selectedRegion.lat.toFixed(4)}°N, {selectedRegion.lng.toFixed(4)}°W
          </span>
          <span className="text-[11px] text-slate-400 border-l border-slate-700 pl-2">
            Elev: {selectedRegion.elevation}m | Slope: {selectedRegion.slope}%
          </span>
        </div>

        <div className="glass-panel px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-2 border border-slate-600/60">
          <span className="text-xs font-semibold text-slate-200">Field Parcel:</span>
          <span className="text-xs font-mono text-emerald-300 font-bold">{fieldAreaHectares} ha ({(fieldAreaHectares * 2.471).toFixed(0)} acres)</span>
        </div>
      </div>

      {/* Basemap Style Switcher (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center bg-slate-950/80 backdrop-blur-md rounded-xl p-1 border border-slate-700/80 shadow-lg text-xs font-medium">
        <button
          onClick={() => setBaseMapType('satellite')}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            baseMapType === 'satellite' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => setBaseMapType('dark')}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            baseMapType === 'dark' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          NASA Dark
        </button>
        <button
          onClick={() => setBaseMapType('streets')}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            baseMapType === 'streets' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Terrain
        </button>
      </div>

      {/* Bottom Layer Selector Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 glass-panel p-3 rounded-2xl border border-slate-700/80 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Layer toggles */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center mr-1 shrink-0">
              <Layers className="w-3.5 h-3.5 mr-1" />
              NASA Overlays:
            </span>
            {NASA_LAYERS.map((layer) => {
              const isActive = activeNasaLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveNasaLayer(layer.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span>{layer.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Layer Legend Bar */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-2 md:pt-0">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-slate-400 font-mono">{activeLayerInfo.sensor}</span>
              <div className={`w-28 h-2.5 rounded-full bg-gradient-to-r ${activeLayerInfo.gradient} ring-1 ring-white/20`} />
              <span className="text-[11px] text-slate-300 font-mono font-medium">{activeLayerInfo.unit}</span>
            </div>
            <span className="text-[10px] text-slate-400 italic hidden lg:inline">
              {activeLayerInfo.range}
            </span>
          </div>
        </div>

        {/* Informative subtitle */}
        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center">
            <Info className="w-3 h-3 text-cyan-400 mr-1.5 shrink-0" />
            {activeLayerInfo.description}
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Click map or drag pin to relocate farm boundary.
          </span>
        </div>
      </div>
    </div>
  );
}
