import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  GraduationCap,
  Languages,
  Landmark,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { practiceAreas } from "@/data/practiceAreas";

export const metadata: Metadata = {
  title: `About ${siteConfig.advocate.fullName} | 25+ Years Legal Practice`,
  description:
    "Professional biography, educational background, court jurisdictions, and ethical approach of Advocate Anil Kumar Gupta with over 25 years of practice in District & Sessions Court.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Header */}
      <section className="bg-navy-950 text-ivory-100 py-16 sm:py-20 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Professional Biography</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory-50 mb-4">
              About {siteConfig.advocate.fullName}
            </h1>
            <p className="text-base sm:text-lg text-charcoal-200 font-sans leading-relaxed">
              Grounded in more than 25 years of courtroom advocacy, meticulous evidentiary research,
              and dedicated representation before the District & Sessions Court and specialized
              magisterial forums.
            </p>
          </div>
        </div>
      </section>

      {/* Main Biography & Portrait Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Portrait & Key Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Actual Portrait Frame */}
              <div className="w-56 h-64 mx-auto rounded-2xl bg-navy-900 border-2 border-gold-500/70 overflow-hidden shadow-2xl relative mb-6">
                <Image
                  src={siteConfig.advocate.portraitImage}
                  alt={siteConfig.advocate.portraitAlt}
                  fill
                  sizes="(max-width: 768px) 224px, 224px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 py-1.5 bg-navy-950/85 backdrop-blur-md text-[11px] text-center text-gold-300 font-mono">
                  25+ Years Verified Practice
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-navy-950 text-center">
                {siteConfig.advocate.fullName}
              </h2>
              <p className="text-xs uppercase tracking-widest text-gold-700 text-center font-sans mt-1 font-bold">
                {siteConfig.advocate.formalTitle}
              </p>

              {/* Fast Facts Card */}
              <div className="mt-6 pt-6 border-t border-charcoal-200/50 space-y-3 text-xs">
                <div className="flex items-start justify-between p-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
                  <span className="text-charcoal-600 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-gold-600" />
                    <span>Experience:</span>
                  </span>
                  <span className="font-bold text-navy-950 text-right">
                    More than 25 Years
                  </span>
                </div>

                <div className="flex items-start justify-between p-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
                  <span className="text-charcoal-600 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-gold-600" />
                    <span>Primary Court:</span>
                  </span>
                  <span className="font-bold text-navy-950 text-right">
                    District & Sessions Court
                  </span>
                </div>

                <div className="flex items-start justify-between p-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
                  <span className="text-charcoal-600 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span>Chamber Office:</span>
                  </span>
                  <span className="font-bold text-navy-950 text-right">
                    Near SSP Office
                  </span>
                </div>

                <div className="flex items-start justify-between p-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
                  <span className="text-charcoal-600 flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-gold-600" />
                    <span>Languages:</span>
                  </span>
                  <span className="font-bold text-navy-950 text-right">
                    English, Hindi
                  </span>
                </div>
              </div>

              {/* Strict BCI Compliance Notice regarding Enrolment */}
              <div className="mt-6 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-charcoal-200/50 text-[11px] text-charcoal-600 leading-relaxed italic">
                Notice: In accordance with Bar Council of India guidelines and user privacy
                directives, Bar enrolment numbers are not displayed publicly on this website.
              </div>
            </div>

            {/* Educational Qualifications */}
            <div className="glass-panel rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gold-600" />
                <span>Educational Qualifications</span>
              </h3>
              <div className="space-y-3 text-xs">
                {siteConfig.advocate.qualifications.map((q, idx) => (
                  <div key={idx} className="p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-charcoal-100 shadow-xs">
                    <div className="font-bold text-navy-950 text-sm">{q.degree}</div>
                    <div className="text-charcoal-600 mt-0.5">{q.institution}</div>
                    <div className="text-[11px] text-gold-700 font-mono mt-1 font-semibold">{q.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative Biography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-navy max-w-none space-y-4 text-sm sm:text-base text-charcoal-800 leading-relaxed font-sans">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                A Quarter Century of Courtroom Advocacy & Practical Insight
              </h2>
              <p>
                {siteConfig.advocate.fullName} has devoted more than twenty-five years to the active
                practice of law, with his core litigation and advisory chambers situated near the SSP
                office and serving the District & Sessions Court complex.
              </p>
              <p>
                Having represented clients across thousands of court proceedings, bail applications,
                criminal trials, land boundary and partition disputes, family reconciliations, and
                negotiable instruments litigation, Advocate Gupta has built a reputation centered on
                painstaking evidentiary scrutiny, statutory precision, and dignified advocacy.
              </p>
              <p>
                Over the course of two and a half decades, his practice has navigated landmark statutory
                reforms, evolving evidentiary standards under the Evidence Act / Bharatiya Sakshya
                Adhiniyam, and recent comprehensive overhauls to Indian criminal procedure under the
                Bharatiya Nagarik Suraksha Sanhita (BNSS).
              </p>
              <p>
                The chambers operate on the conviction that effective representation requires candid
                counsel: advising clients with uncompromising honesty on the strengths and limitations
                of their matter, preserving statutory deadlines, and discouraging frivolous litigation.
              </p>
            </div>

            {/* Core Values & Approach */}
            <div className="space-y-4 pt-4 border-t border-charcoal-200">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
                Professional Values & Practice Philosophy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siteConfig.advocate.coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-5 glass-card-interactive rounded-2xl space-y-2"
                  >
                    <div className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{val.title}</span>
                    </div>
                    <p className="text-xs text-charcoal-700 leading-relaxed font-sans">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Practice Handled */}
            <div className="space-y-4 pt-4 border-t border-charcoal-200">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                Dedicated Practice Portfolio
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                Advocate Anil Kumar Gupta exclusively accepts briefs within designated practice
                categories. In compliance with strict professional directives, general civil
                litigation outside specific land/property titles is excluded:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {practiceAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/practice-areas/${area.slug}`}
                    className="p-3.5 bg-white/70 hover:bg-white/95 backdrop-blur-md rounded-xl border border-charcoal-200/60 shadow-xs flex items-center justify-between text-xs font-bold text-navy-950 group transition-all"
                  >
                    <span>{area.title}</span>
                    <ArrowRight className="w-4 h-4 text-gold-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Court Jurisdictions */}
            <div className="p-6 glass-dark text-ivory-100 rounded-3xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="font-serif text-lg font-bold text-ivory-50 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-gold-400" />
                <span>Regular Court Jurisdictions</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-200">
                {siteConfig.advocate.courtJurisdictions.map((court, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{court}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-navy-900 hover:bg-navy-800 text-ivory-50 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Chamber Appointment Enquiry</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>
              <Link
                href="/practice-areas"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-ivory-200 hover:bg-ivory-300 text-navy-900 text-xs font-semibold uppercase tracking-wider border border-gold-500/30 transition-colors"
              >
                <span>View Practice Areas</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
