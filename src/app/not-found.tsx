import React from "react";
import Link from "next/link";
import { Scale, Home, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full text-center bg-ivory-50 border border-gold-500/30 rounded-2xl p-8 sm:p-12 shadow-sm space-y-6">
        <div className="w-20 h-20 rounded-full bg-navy-900 text-gold-400 border border-gold-500/40 flex items-center justify-center mx-auto shadow-md">
          <Scale className="w-10 h-10" />
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-gold-600 font-bold block mb-1">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900">
            Jurisdiction Not Located
          </h1>
          <p className="text-sm text-charcoal-600 mt-3 leading-relaxed font-sans">
            The legal brief, document, or procedural page you are looking for has been moved,
            renamed, or does not exist within the chambers portal.
          </p>
        </div>

        <div className="pt-4 border-t border-charcoal-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/"
            className="p-3 rounded-lg bg-navy-900 text-ivory-50 font-semibold hover:bg-navy-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-gold-400" />
            <span>Homepage</span>
          </Link>

          <Link
            href="/practice-areas"
            className="p-3 rounded-lg bg-ivory-200 text-navy-900 font-semibold hover:bg-ivory-300 border border-charcoal-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5 text-gold-600" />
            <span>Practice Areas</span>
          </Link>

          <Link
            href="/contact"
            className="p-3 rounded-lg bg-ivory-200 text-navy-900 font-semibold hover:bg-ivory-300 border border-charcoal-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-gold-600" />
            <span>Chambers</span>
          </Link>
        </div>

        <p className="text-[11px] text-charcoal-500 pt-2">
          {siteConfig.advocate.fullName} • {siteConfig.advocate.formalTitle}
        </p>
      </div>
    </div>
  );
}
