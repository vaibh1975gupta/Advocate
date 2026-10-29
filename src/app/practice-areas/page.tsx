import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { practiceAreas } from "@/data/practiceAreas";
import { siteConfig } from "@/config/siteConfig";
import { PracticeIcon } from "@/components/PracticeIcon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxFloatingWatermark } from "@/components/animations/ParallaxFloatingWatermark";

export const metadata: Metadata = {
  title: "Areas of Legal Practice | Dedicated Legal Counsel",
  description:
    "Specialized legal practice areas: Criminal Law, Land & Property Disputes, Family Law Matters, Cheque Dishonour (Section 138 NI Act), and Legal Documentation.",
};

export default function PracticeAreasPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Header */}
      <section className="bg-navy-950 text-ivory-100 py-16 sm:py-20 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Scale className="w-4 h-4 text-gold-400" />
              <span>Practice Portfolio</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory-50 mb-4">
              Areas of Legal Practice
            </h1>
            <p className="text-base sm:text-lg text-charcoal-200 font-sans leading-relaxed">
              Dedicated legal representation and counsel strictly focused on the areas of law
              handled by {siteConfig.advocate.fullName}. General civil litigation is excluded.
            </p>
          </div>
        </div>
      </section>

      {/* Main Practice Areas Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Parallax Floating Legal Watermark */}
        <div className="absolute right-0 top-1/4 pointer-events-none overflow-hidden" aria-hidden="true">
          <ParallaxFloatingWatermark icon="scale" speed={0.12} size={500} className="opacity-10" />
        </div>

        <div className="space-y-10 relative z-10">
          {practiceAreas.map((area, index) => (
            <ScrollReveal key={area.id} animation="fade-up" delay={index * 80}>
              <div
                id={area.slug}
                className="glass-panel-gold rounded-3xl p-6 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-navy-900/90 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/40 shadow-md">
                        <PracticeIcon name={area.iconName} className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest block">
                          Category 0{index + 1}
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                          {area.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-sans pt-1">
                      {area.shortDescription}
                    </p>

                    <div className="pt-2">
                      <span className="text-xs uppercase tracking-wider text-charcoal-500 font-bold block mb-2">
                        Representative Scope of Work:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-800">
                        {area.scopeOfWork.slice(0, 4).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/50 backdrop-blur-xs border border-white/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Governing Statutes */}
                    <div className="p-3.5 bg-white/70 backdrop-blur-md rounded-xl border border-charcoal-200/60 text-xs shadow-xs">
                      <strong className="text-navy-950">Statutory Framework: </strong>
                      <span className="text-charcoal-700">{area.keyStatutes.join("; ")}</span>
                    </div>
                  </div>

                  {/* Right Side Action Card */}
                  <div className="lg:col-span-4 glass-dark text-ivory-100 rounded-2xl p-6 space-y-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-3">
                      <div className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                        Procedural Assessment
                      </div>
                      <p className="text-xs text-charcoal-200 leading-relaxed">
                        {area.procedureOverview.slice(0, 150)}...
                      </p>
                      <div className="text-[11px] text-charcoal-300 italic border-t border-navy-800/80 pt-2">
                        {area.importantNote}
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Link
                        href={`/practice-areas/${area.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:translate-y-[-1px]"
                      >
                        <span>Detailed Scope & Procedure</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/contact?area=${area.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-navy-800/80 hover:bg-navy-700/80 backdrop-blur-sm text-ivory-200 text-xs font-semibold transition-all border border-navy-700"
                      >
                        <span>Inquire About This Area</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Compliance Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-ivory-50 rounded-xl border border-charcoal-200 text-xs text-charcoal-600 leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
          <p>
            <strong>Professional Notice:</strong> The information provided on this page outlines
            the statutory frameworks and nature of legal proceedings routinely handled by the
            chambers. In adherence to the Bar Council of India Rules, no claims of specialization,
            superiority, or guaranteed judicial outcomes are made.
          </p>
        </div>
      </section>
    </div>
  );
}
