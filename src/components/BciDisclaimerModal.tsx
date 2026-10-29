"use client";

import React, { useState, useEffect } from "react";
import { Scale, CheckCircle2, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function BciDisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const accepted = localStorage.getItem("bci_disclaimer_accepted_v1");
        if (!accepted) {
          setIsOpen(true);
        }
      } catch {
        // In case localStorage is blocked in incognito
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("bci_disclaimer_accepted_v1", "true");
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="bg-ivory-50/90 backdrop-blur-2xl border border-white/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-charcoal-900 overflow-hidden">
        {/* Subtle decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-navy-900/10 flex items-center justify-center text-navy-900 border border-gold-500/30 shadow-xs">
            <Scale className="w-5 h-5 text-gold-600" />
          </div>
          <div>
            <h2
              id="disclaimer-title"
              className="font-serif text-lg sm:text-xl font-bold text-navy-900 tracking-tight"
            >
              Bar Council of India Disclaimer
            </h2>
            <p className="text-xs text-charcoal-600 font-sans">
              Rule 36 of Bar Council of India Rules
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-charcoal-700 leading-relaxed font-sans max-h-72 overflow-y-auto pr-2 border-y border-charcoal-200/60 py-4 my-4">
          <p>
            As per the rules of the <strong>Bar Council of India</strong>, advocates are strictly
            prohibited from soliciting work or advertising their legal practice in any form, direct
            or indirect.
          </p>
          <p className="text-xs text-charcoal-700 bg-white/60 backdrop-blur-sm p-3.5 rounded-xl border border-charcoal-200/50">
            By clicking <strong>&quot;I Accept & Proceed&quot;</strong>, the user acknowledges and confirms that:
          </p>
          <ul className="space-y-2 text-xs text-charcoal-700 list-disc list-inside pl-1">
            <li>
              You are seeking information about {siteConfig.advocate.fullName} solely of your own
              accord, for informational and educational purposes only.
            </li>
            <li>
              There has been no advertisement, personal communication, solicitation, invitation, or
              inducement of any kind whatsoever from the advocate or members of their chamber.
            </li>
            <li>
              The information provided on this website does not constitute legal advice, opinion, or
              a legal solicitation.
            </li>
            <li>
              Visiting this website or transmitting an inquiry does not create an advocate-client
              relationship.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-charcoal-600">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>Strict professional compliance</span>
          </div>

          <button
            onClick={handleAccept}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-ivory-100 rounded-xl text-sm font-semibold transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 hover:translate-y-[-1px]"
          >
            <CheckCircle2 className="w-4 h-4 text-gold-400" />
            <span>I Accept & Proceed</span>
          </button>
        </div>
      </div>
    </div>
  );
}
