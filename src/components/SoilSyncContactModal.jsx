import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, Sprout, Satellite, Mail, Phone, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SoilSyncContactModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    farmName: '',
    farmerName: '',
    email: '',
    phone: '',
    location: '',
    acreage: '320',
    currentRotation: 'Corn - Soybean (with winter fallow)',
    primaryPriority: 'soil_health',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-[#0e271b] border border-[#16A36A]/40 rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-6 bg-gradient-to-r from-[#123D2A] via-[#0e271b] to-[#123D2A] border-b border-[#16A36A]/30">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#16A36A]/20 border border-[#16A36A]/40 text-[#16A36A]">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3478C9]">
                  SOILSYNC AG-AI ONBOARDING
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">Start Your Farm's SoilSync Assessment</h2>
              <p className="text-xs text-[#E7F4E9]/80">Connect your acreage with NASA Earth observations and tailored rotation recommendations.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#123D2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#16A36A]/20 text-[#16A36A] mx-auto flex items-center justify-center border border-[#16A36A]/40">
              <CheckCircle2 className="w-8 h-8 text-[#16A36A]" />
            </div>
            <h3 className="text-2xl font-bold text-white">Assessment Request Received!</h3>
            <p className="text-sm text-[#E7F4E9]/80 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.farmerName || 'Farmer'}</strong>. Our satellite agronomy engine has queued an initial Earth observation scan for <strong>{formData.farmName || 'your acreage'}</strong>. An agronomy specialist will review your NASA SMAP and ECOSTRESS profile within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#16A36A] hover:bg-[#18b577] text-white font-bold text-xs shadow-lg transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Farm Name */}
              <div>
                <label className="block text-xs font-semibold text-[#E7F4E9] mb-1">Farm / Operation Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prairie Ridge Farms"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full bg-[#123D2A]/60 border border-[#16A36A]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#16A36A]"
                />
              </div>

              {/* Farmer Name */}
              <div>
                <label className="block text-xs font-semibold text-[#E7F4E9] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Miller"
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  className="w-full bg-[#123D2A]/60 border border-[#16A36A]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#16A36A]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#E7F4E9] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sarah@prairieridge.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#123D2A]/60 border border-[#16A36A]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#16A36A]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-[#E7F4E9] mb-1">County, State / Region</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Boone County, Iowa, USA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#123D2A]/60 border border-[#16A36A]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#16A36A]"
                />
              </div>

              {/* Acreage */}
              <div>
                <label className="block text-xs font-semibold text-[#E7F4E9] mb-1">Total Acreage</label>
                <input
                  type="number"
                  placeholder="e.g. 320"
                  value={formData.acreage}
                  onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                  className="w-full bg-[#123D2A]/60 border border-[#16A36A]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#16A36A]"
                />
              </div>

              {/* Primary Goal */}
              <div>
                <label className="block text-xs font-semibold text-[#E7F4E9] mb-1">Primary Farming Goal</label>
                <select
                  value={formData.primaryPriority}
                  onChange={(e) => setFormData({ ...formData, primaryPriority: e.target.value })}
                  className="w-full bg-[#123D2A]/80 border border-[#16A36A]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#16A36A] cursor-pointer"
                >
                  <option value="soil_health">Rebuild Soil Organic Matter (SOM)</option>
                  <option value="water">Water Conservation & Drought Defense</option>
                  <option value="fertilizer">Reduce Synthetic Nitrogen Expenses</option>
                  <option value="erosion">Stop Topsoil Slope Runoff & Erosion</option>
                  <option value="weeds">Interrupt Weed & Nematode Resistance</option>
                  <option value="profit">Maximize Risk-Adjusted Gross Margin</option>
                </select>
              </div>
            </div>

            {/* Current Rotation */}
            <div>
              <label className="block text-xs font-semibold text-[#E7F4E9] mb-1">Current Multi-Year Crop Rotation</label>
              <input
                type="text"
                placeholder="e.g. Continuous Corn or 2-Year Corn-Soy with 5-month bare winter fallow"
                value={formData.currentRotation}
                onChange={(e) => setFormData({ ...formData, currentRotation: e.target.value })}
                className="w-full bg-[#123D2A]/60 border border-[#16A36A]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#16A36A]"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-[#E7F4E9] mb-1">Field Specific Challenges / Machinery Limitations (Optional)</label>
              <textarea
                rows={2}
                placeholder="e.g. Looking to interseed clover into standing corn. We have a standard 15-ft no-till drill."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#123D2A]/60 border border-[#16A36A]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#16A36A]"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#16A36A] via-[#18b577] to-[#123D2A] text-white text-xs font-bold shadow-lg shadow-[#16A36A]/25 border border-[#16A36A]/50 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#3478C9]" />
                <span>Submit Field for SoilSync Satellite AI Scan</span>
              </button>
            </div>
          </form>
        )}

        {/* Footer Contact Strip */}
        <div className="p-4 bg-[#0a1d14] border-t border-[#16A36A]/20 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-[#16A36A]" />
            <span>agronomy@soilsync.ag</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-3.5 h-3.5 text-[#3478C9]" />
            <span>1-800-SOIL-SYNC (Ext 2)</span>
          </div>
          <span className="text-slate-400">Response within 24 business hours</span>
        </div>
      </div>
    </div>
  );
}
