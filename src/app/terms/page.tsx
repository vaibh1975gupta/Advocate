import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "Terms of Website Use | Advocate Anil Kumar Gupta",
  },
  description:
    "Terms and conditions governing the informational and educational use of the website of Advocate Anil Kumar Gupta, Bareilly.",
  alternates: {
    canonical: "https://advocateanilkumargupta.in/terms",
  },
  openGraph: {
    title: "Terms of Website Use | Advocate Anil Kumar Gupta",
    description:
      "Terms and conditions governing the informational and educational use of the website of Advocate Anil Kumar Gupta, Bareilly.",
    url: "https://advocateanilkumargupta.in/terms",
    type: "website",
    images: [
      {
        url: "https://advocateanilkumargupta.in/images/advocate-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Terms of Use - Advocate Anil Kumar Gupta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Website Use | Advocate Anil Kumar Gupta",
    description:
      "Terms and conditions governing the informational and educational use of the website of Advocate Anil Kumar Gupta, Bareilly.",
    images: ["https://advocateanilkumargupta.in/images/advocate-portrait.jpg"],
  },
};

export default function TermsPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <section className="bg-navy-950 text-ivory-100 py-16 sm:py-20 border-b border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50">
            Terms of Website Use
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-200 mt-2 font-mono">
            Informational Terms of Service
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory-50 border border-charcoal-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-sm text-charcoal-800 leading-relaxed font-sans">
          <h2 className="font-serif text-xl font-bold text-navy-900">1. Acceptance of Terms</h2>
          <p>
            By visiting or navigating this website, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Use and the Bar Council of India disclaimer.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900">2. No Legal Advice or Guarantee</h2>
          <p>
            The content on this website, including procedural guides and statutory summaries, is
            provided strictly for informational awareness. It does not constitute formal legal counsel
            or substitute for an in-person consultation with an advocate. No outcomes are guaranteed.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900">3. Intellectual Property</h2>
          <p>
            Original legal commentary and educational guides are the intellectual property of the
            chambers of {siteConfig.advocate.fullName}. Reproduction or republication without prior
            written consent is prohibited.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900">4. Applicable Jurisdiction</h2>
          <p>
            Any dispute arising out of or in connection with the access of this website shall be
            subject to the exclusive jurisdiction of the competent courts in India.
          </p>
        </div>
      </section>
    </div>
  );
}
