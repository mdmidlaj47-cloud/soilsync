import React from 'react';
import { Sprout, Satellite, Mail, Phone, MapPin, Globe, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export default function SoilSyncFooter({
  onNavClick,
  onOpenReport,
  onOpenGlossary,
  onOpenContact
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a1d14] border-t border-[#16A36A]/20 pt-16 pb-12 text-slate-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#16A36A]/15">
          {/* Col 1 & 2: SoilSync Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#123D2A] via-[#16A36A] to-[#3478C9] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#0e271b] rounded-[14px] flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 36 36" fill="none">
                    <ellipse cx="18" cy="18" rx="14" ry="7" stroke="#3478C9" strokeWidth="1.5" strokeDasharray="3 2" transform="rotate(-30 18 18)" opacity="0.85" />
                    <circle cx="28" cy="11" r="2.2" fill="#3478C9" />
                    <path d="M12 24 C12 15, 18 12, 24 12 C24 21, 20 26, 12 24 Z" fill="#16A36A" />
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Soil<span className="text-[#16A36A]">Sync</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#E7F4E9]/80 leading-relaxed max-w-sm">
              Empowering farmers with AI, satellite technology and real-time environmental insights for sustainable agriculture. Fusing NASA Earth observations with ground soil science.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3478C9] block mb-2">
                Mission Statement
              </span>
              <p className="text-xs text-slate-400 italic">
                “Grow Smarter. Farm Better. Protect Tomorrow.”
              </p>
            </div>
          </div>

          {/* Col 3: Navigation & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavClick('smart-farming')} className="hover:text-[#16A36A] transition-colors">
                  Satellite Monitoring
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('smart-farming')} className="hover:text-[#16A36A] transition-colors">
                  AI Crop Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('smart-farming')} className="hover:text-[#16A36A] transition-colors">
                  Weather Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('smart-farming')} className="hover:text-[#16A36A] transition-colors">
                  Soil Monitoring (SMAP)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('smart-farming')} className="hover:text-[#16A36A] transition-colors">
                  Smart Recommendations
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('smart-farming')} className="hover:text-[#16A36A] transition-colors">
                  Sustainable Agriculture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
              Data & Verification
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavClick('resources')} className="hover:text-[#3478C9] transition-colors flex items-center">
                  <span>Data Sources (25 Portals)</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenGlossary} className="hover:text-[#3478C9] transition-colors">
                  NASA Satellite Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenReport} className="hover:text-[#16A36A] font-semibold transition-colors">
                  Agronomic Advisory Report (PDF)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-white transition-colors">
                  About SoilSync
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
              Contact SoilSync
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#16A36A] shrink-0" />
                <span>agronomy@soilsync.ag</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#3478C9] shrink-0" />
                <span>+1 (800) SOIL-SYNC</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Ames, IA & Pasadena, CA</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="w-full py-2 px-3 rounded-xl bg-[#123D2A] hover:bg-[#16A36A] text-white text-xs font-bold transition-all border border-[#16A36A]/40"
              >
                Schedule Agronomy Demo
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Human-in-the-Loop Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-[#16A36A] shrink-0" />
            <span>
              SoilSync is an AI-powered decision-support system. It is designed to assist and enhance—not replace—local farmer judgment and Certified Crop Advisor (CCA) validation.
            </span>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <span>© 2026 SoilSync AgriTech Inc.</span>
            <button
              onClick={scrollToTop}
              title="Back to top"
              className="p-2 rounded-xl bg-[#123D2A] hover:bg-[#16A36A] text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
