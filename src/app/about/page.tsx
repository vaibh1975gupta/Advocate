import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  Award,
  GraduationCap,
  Languages,
  Landmark,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { practiceAreas } from "@/data/practiceAreas";

export const metadata: Metadata = {
  title: `About ${siteConfig.advocate.fullName} | 20+ Years Legal Practice`,
  description:
    "Professional biography, educational background, court jurisdictions, and ethical approach of Advocate [Full Name] with over 20 years of practice in Indian courts.",
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
              Grounded in more than 20 years of courtroom advocacy, meticulous evidentiary research,
              and dedicated representation across the Indian judicial system.
            </p>
          </div>
        </div>
      </section>

      {/* Main Biography & Portrait Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Portrait & Key Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory-50 border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Portrait Frame */}
              <div className="w-48 h-48 mx-auto rounded-xl bg-navy-900 border-2 border-gold-500/40 flex items-center justify-center text-gold-400 mb-6 shadow-md relative overflow-hidden">
                <Scale className="w-24 h-24 text-gold-400/80" />
                <div className="absolute inset-x-0 bottom-0 py-1.5 bg-navy-950/90 text-[11px] text-center text-gold-300 font-mono">
                  Verified Advocate Practice
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-navy-900 text-center">
                {siteConfig.advocate.fullName}
              </h2>
              <p className="text-xs uppercase tracking-widest text-gold-600 text-center font-sans mt-1">
                {siteConfig.advocate.formalTitle}
              </p>

              {/* Fast Facts Card */}
              <div className="mt-6 pt-6 border-t border-charcoal-200/60 space-y-3.5 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-charcoal-500 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-gold-600" />
                    <span>Experience:</span>
                  </span>
                  <span className="font-semibold text-navy-900 text-right">
                    More than 20 Years
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-charcoal-500 flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-gold-600" />
                    <span>Languages:</span>
                  </span>
                  <span className="font-semibold text-navy-900 text-right">
                    English, Hindi
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-charcoal-500 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-gold-600" />
                    <span>Primary Forums:</span>
                  </span>
                  <span className="font-semibold text-navy-900 text-right">
                    High Court & District Courts
                  </span>
                </div>
              </div>

              {/* Strict BCI Compliance Notice regarding Enrolment */}
              <div className="mt-6 p-3 bg-ivory-200/80 rounded border border-charcoal-200/60 text-[11px] text-charcoal-600 leading-relaxed italic">
                Notice: In accordance with Bar Council of India guidelines and user privacy
                directives, Bar enrolment numbers are not displayed publicly on this website.
              </div>
            </div>

            {/* Educational Qualifications (Clearly Marked Placeholders) */}
            <div className="bg-ivory-50 border border-charcoal-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-navy-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gold-600" />
                <span>Educational Qualifications</span>
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Academic qualifications subject to individual chamber verification:
              </p>
              <div className="space-y-3 text-xs">
                {siteConfig.advocate.qualifications.map((q, idx) => (
                  <div key={idx} className="p-3 bg-white rounded border border-charcoal-100">
                    <div className="font-semibold text-navy-900">{q.degree}</div>
                    <div className="text-charcoal-600 mt-0.5">{q.institution}</div>
                    <div className="text-[11px] text-gold-700 font-mono mt-1">{q.year}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-charcoal-500 italic">
                * Note: Specific dates and universities may be customized with verified credentials.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Narrative Biography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-navy max-w-none space-y-4 text-sm sm:text-base text-charcoal-800 leading-relaxed font-sans">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                A Practice Rooted in Practical Courtroom Insight
              </h2>
              <p>
                {siteConfig.advocate.fullName} has devoted more than twenty years to the active
                practice of law in India. Commencing his practice with foundational trials before
                Magistrates and Sessions Courts, he has consistently maintained a rigorous litigation
                and consultation calendar, extending representation to the High Court and specialized
                statutory tribunals.
              </p>
              <p>
                Over the course of two decades, the practice has navigated landmark statutory
                reforms, evolving evidentiary standards, and significant legislative transitions,
                including recent comprehensive overhauls to Indian criminal statutes. This sustained
                courtroom exposure allows for a nuanced assessment of judicial discretion, witness
                credibility, and the realistic outcomes of litigation.
              </p>
              <p>
                The chambers operate on the firm belief that effective lawyering requires equal parts
                exhaustive pre-trial preparation and strategic courtroom presentation. Every brief
                is subjected to painstaking factual inquiry, evidentiary cross-checking, and thorough
                precedent analysis before any application is filed or hearing convened.
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
                    className="p-5 bg-ivory-50 rounded-xl border border-charcoal-200/80 space-y-2"
                  >
                    <div className="font-serif font-bold text-navy-900 text-base flex items-center gap-2">
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
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
                Dedicated Practice Portfolio
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                The advocate exclusively accepts briefs within designated practice categories. In
                compliance with specific practice instructions, general civil litigation is not
                entertained, ensuring focused expertise:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {practiceAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/practice-areas/${area.slug}`}
                    className="p-3.5 bg-ivory-50 hover:bg-ivory-200 rounded-lg border border-charcoal-200 flex items-center justify-between text-xs font-semibold text-navy-900 group transition-colors"
                  >
                    <span>{area.title}</span>
                    <ArrowRight className="w-4 h-4 text-gold-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Court Jurisdictions */}
            <div className="p-6 bg-navy-900 text-ivory-100 rounded-2xl border border-gold-500/30 space-y-3">
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
