import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ShieldAlert, ArrowLeft, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Bar Council of India Disclaimer & Compliance Notice",
  description:
    "Official Bar Council of India Rule 36 compliance declaration and legal disclaimer for Advocate [Full Name].",
};

export default function DisclaimerPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Page Header */}
      <section className="bg-navy-950 text-ivory-100 py-16 sm:py-20 border-b border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4" />
            <span>Statutory Compliance Notice</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50">
            Bar Council of India Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-200 mt-2 font-mono">
            Compliance under Rule 36, Section IV of Bar Council of India Rules
          </p>
        </div>
      </section>

      {/* Main Notice Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory-50 border border-gold-500/30 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-sm text-charcoal-800 leading-relaxed font-sans">
          <div className="p-4 rounded-xl bg-ivory-200/80 border border-gold-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
            <div className="text-xs text-charcoal-800 leading-relaxed">
              <strong>Mandatory Notice:</strong> As per the rules of the Bar Council of India,
              advocates in India are strictly prohibited from advertising their services, soliciting
              briefs, or making promotional comparisons in any digital or physical medium.
            </div>
          </div>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-2">
            Terms of Access & Acknowledgment
          </h2>
          <p>
            By accessing or browsing this website (<span className="font-mono text-xs">{siteConfig.seo.siteUrl}</span>),
            the user expressly agrees, confirms, and acknowledges the following statements:
          </p>

          <div className="space-y-4 pt-2">
            {siteConfig.disclaimer.detailedPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-white rounded-lg border border-charcoal-100">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span className="text-xs text-charcoal-800 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">
            No Formal Advocate-Client Relationship
          </h2>
          <p>
            Transmitting information through contact forms, emails, or telephone calls does not create
            an advocate-client relationship. Such a relationship is established only upon mutual
            agreement, conflict verification, and formal execution of a Vakalatnama or written
            engagement letter.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900 pt-4">
            Jurisdictional Notice
          </h2>
          <p>
            The legal information and statutory procedures discussed on this website pertain strictly
            to the laws in force within the Republic of India. Courts and tribunals in specific states
            may have local rules or administrative circulars that affect practice.
          </p>

          <div className="pt-6 border-t border-charcoal-200 flex flex-wrap gap-4">
            <Link
              href="/"
              className="px-5 py-2.5 rounded bg-navy-900 text-ivory-50 text-xs font-semibold uppercase tracking-wider hover:bg-navy-800 transition-colors"
            >
              Acknowledge & Return to Home
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded bg-ivory-200 text-navy-900 text-xs font-semibold uppercase tracking-wider hover:bg-ivory-300 border border-gold-500/30 transition-colors"
            >
              Contact Chambers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
