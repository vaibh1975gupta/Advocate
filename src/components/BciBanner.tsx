import React from "react";
import Link from "next/link";
import { Scale } from "lucide-react";

export function BciBanner() {
  return (
    <div className="bg-navy-950 text-ivory-200 border-b border-gold-500/20 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Scale className="w-3.5 h-3.5 text-gold-500 shrink-0" aria-hidden="true" />
          <span className="text-ivory-300 font-medium tracking-wide">
            Bar Council of India Compliance Notice:
          </span>
          <span className="text-charcoal-200 hidden md:inline">
            This website is solely for informational and educational purposes. No advertisement or solicitation is intended.
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-gold-400">
          <Link
            href="/disclaimer"
            className="hover:text-gold-300 underline underline-offset-2 transition-colors"
          >
            Read Full BCI Disclaimer
          </Link>
          <span className="text-navy-700">|</span>
          <span className="text-ivory-300">20+ Years Practice</span>
        </div>
      </div>
    </div>
  );
}
