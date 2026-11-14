import React from 'react';
import { X, Satellite, CheckCircle, AlertTriangle, HelpCircle, ShieldAlert, Sparkles, UserCheck, BookOpen } from 'lucide-react';

export default function StrategyDetailModal({ strategy, onClose }) {
  if (!strategy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-cyan-700">
                NASA Agronomic Advisory Deep Dive
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                Match Score: {strategy.metrics.compositeScore}%
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5">{strategy.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{strategy.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* 1. Why Was This Strategy Suggested? */}
          <div className="glass-card p-4 rounded-xl border border-blue-900/40 bg-blue-950/20">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center mb-2">
              <Sparkles className="w-4 h-4 mr-2 text-cyan-400 shrink-0" />
              1. Why Was This Strategy Suggested?
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              {strategy.whySuggested}
            </p>
          </div>

          {/* 2. NASA Satellite & Earth Observation Evidence */}
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center mb-2.5">
              <Satellite className="w-4 h-4 mr-2 text-cyan-400 shrink-0" />
              2. Supporting NASA Earth Observation Evidence
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {strategy.nasaEvidence.map((ev, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Anticipated Benefits & Farm ROI */}
          <div className="glass-card p-4 rounded-xl border border-emerald-900/40 bg-emerald-950/20">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center mb-2.5">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
              3. Anticipated Agronomic & Soil Health Benefits
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {strategy.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Information Gaps & Model Uncertainties */}
          <div className="glass-card p-4 rounded-xl border border-amber-900/40 bg-amber-950/20">
            <h3 className="text-sm font-bold text-amber-300 flex items-center mb-2.5">
              <HelpCircle className="w-4 h-4 mr-2 text-amber-400 shrink-0" />
              4. Information Gaps & Satellite Uncertainties
            </h3>
            <p className="text-[11px] text-amber-200/80 mb-2">
              Earth observation satellites capture wide-scale surface radiances, but cannot measure all sub-surface physical and micro-scale farm variables:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              {strategy.informationGaps.map((gap, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold mt-0.5">?</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Risks Needing Local Agronomist / Extension Review */}
          <div className="glass-card p-4 rounded-xl border border-rose-900/40 bg-rose-950/20">
            <h3 className="text-sm font-bold text-rose-300 flex items-center mb-2.5">
              <AlertTriangle className="w-4 h-4 mr-2 text-rose-400 shrink-0" />
              5. Risks Needing Local Review (Agronomist & Farmer Checklist)
            </h3>
            <p className="text-[11px] text-rose-200/80 mb-2">
              Before implementing this rotation on your acreage, verify these critical operational safeguards with your local agronomy provider or extension educator:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              {strategy.risksAndAgronomistChecklist.map((risk, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold mt-0.5">⚠</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Human Judgment Disclaimer Banner */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3 text-xs text-slate-400">
            <UserCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block mb-0.5">
                Human-in-the-Loop Decision Support Notice
              </span>
              Field Shift is an exploratory decision-support platform designed to highlight environmental patterns and options using NASA Earth observations. It is not an automated autopilot and does not replace the nuanced judgment of farmers, certified crop advisors (CCAs), or local university agricultural extension specialists.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
}
