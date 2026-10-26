import React from "react";
import Link from "next/link";
import { Scale, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { practiceAreas } from "@/data/practiceAreas";

export function Footer() {
  const currentYear = 2025;

  return (
    <footer className="bg-navy-950 text-ivory-100 border-t border-gold-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-800">
          {/* Column 1: Identity & Chambers */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-ivory-50 tracking-wide block">
                  {siteConfig.advocate.fullName}
                </span>
                <span className="text-xs text-gold-400 tracking-wider uppercase font-sans">
                  {siteConfig.advocate.formalTitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-charcoal-200 leading-relaxed font-sans pt-1">
              Grounded in over two decades of courtroom advocacy and ethical legal counsel across
              Indian judicial forums.
            </p>

            <div className="pt-2 text-xs text-charcoal-200 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.officeAddress.line1},{" "}
                  {siteConfig.contact.officeAddress.city},{" "}
                  {siteConfig.contact.officeAddress.state} - {siteConfig.contact.officeAddress.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.mainPhone}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.officialEmail}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {siteConfig.contact.officialEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Practice Areas */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-ivory-50 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
              Practice Areas
            </h3>
            <ul className="space-y-2.5 text-xs text-charcoal-200">
              {practiceAreas.map((area) => (
                <li key={area.id}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="hover:text-gold-400 flex items-center justify-between group transition-colors"
                  >
                    <span>{area.title}</span>
                    <ArrowRight className="w-3 h-3 text-gold-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation & Legal Articles */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-ivory-50 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-charcoal-200">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  About the Advocate & Credentials
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-gold-400 transition-colors">
                  All Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold-400 transition-colors">
                  Legal Articles & Rights Guide (English / हिन्दी)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Chamber Location & Appointment Enquiry
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-gold-400 transition-colors">
                  BCI Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Chamber Hours & Ethical Standards */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold text-ivory-50 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-500" />
              Chamber Timings
            </h3>
            <div className="bg-navy-900/80 p-3.5 rounded border border-navy-800 space-y-2 text-xs">
              {siteConfig.contact.hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center text-charcoal-200">
                  <span className="text-ivory-200 font-medium">{h.days}:</span>
                  <span className="text-gold-400">{h.timing}</span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2.5 pt-1 text-xs text-charcoal-200">
              <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Prior appointment is advised before attending chambers to prevent scheduling
                conflicts with court sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Bar Council Mandatory Compliance Disclaimer */}
        <div className="my-8 p-4 rounded bg-navy-900/60 border border-gold-500/20 text-xs text-charcoal-200 leading-relaxed font-sans">
          <div className="flex items-center gap-2 text-gold-400 font-semibold mb-1">
            <Scale className="w-4 h-4" />
            <span>Bar Council of India Rule 36 Mandatory Notice</span>
          </div>
          <p>
            This website does not constitute an advertisement, personal communication, solicitation,
            invitation or inducement of any sort whatsoever by {siteConfig.advocate.fullName} or
            their office. The content herein is intended exclusively for educational and informational
            purposes to explain general legal rights, procedures, and documentation under Indian law.
            The user acknowledges that visiting this website or submitting an enquiry does not create
            an advocate-client relationship.
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-200 pt-4">
          <div>
            &copy; {currentYear} {siteConfig.advocate.fullName}. All rights reserved. Professional
            website compliant with Bar Council rules.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/disclaimer" className="hover:text-gold-400 transition-colors">
              Legal Disclaimer
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
