import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy & Client Confidentiality | Advocate Anil Kumar Gupta",
  },
  description:
    "Client privacy, privilege, and professional confidentiality policy under Section 126 of the Indian Evidence Act for Advocate Anil Kumar Gupta's legal chambers.",
  alternates: {
    canonical: "https://advocateanilkumargupta.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Client Confidentiality | Advocate Anil Kumar Gupta",
    description:
      "Client privacy, privilege, and professional confidentiality policy under Section 126 of the Indian Evidence Act for Advocate Anil Kumar Gupta's legal chambers.",
    url: "https://advocateanilkumargupta.in/privacy",
    type: "website",
    images: [
      {
        url: "https://advocateanilkumargupta.in/images/advocate-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Advocate Anil Kumar Gupta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & Client Confidentiality | Advocate Anil Kumar Gupta",
    description:
      "Client privacy, privilege, and professional confidentiality policy under Section 126 of the Indian Evidence Act for Advocate Anil Kumar Gupta's legal chambers.",
    images: ["https://advocateanilkumargupta.in/images/advocate-portrait.jpg"],
  },
};

export default function PrivacyPage() {
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
            Privacy Policy & Professional Confidentiality
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-200 mt-2 font-mono">
            Protected under Section 126 of the Indian Evidence Act, 1872
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory-50 border border-charcoal-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-sm text-charcoal-800 leading-relaxed font-sans">
          <div className="flex items-center gap-2 text-gold-600 font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5" />
            <span>Absolute Professional Privilege</span>
          </div>

          <h2 className="font-serif text-xl font-bold text-navy-900">1. Commitment to Confidentiality</h2>
          <p>
            The chambers of {siteConfig.advocate.fullName} are bound by the strictest standards of
            professional legal confidentiality. Any factual detail, document, or communication
            conveyed to our office by prospective or existing clients is treated with absolute
            discretion and protected by statutory advocate-client privilege under Indian law.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900">2. Information Collection</h2>
          <p>
            When you submit a consultation request through this website, we collect only necessary
            details (such as your name, contact phone number, email address, and a brief description
            of the legal issue). We do not sell, rent, lease, or share your personal information with
            third parties for commercial marketing under any circumstance.
          </p>

          <h2 className="font-serif text-xl font-bold text-navy-900">3. Purpose of Processing</h2>
          <p>
            Collected details are used solely to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-charcoal-700 pl-2">
            <li>Assess the nature of your inquiry against our practice areas.</li>
            <li>Conduct conflict of interest checks prior to scheduling a consultation.</li>
            <li>Respond to your requested appointment time slot.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-navy-900">4. Retention & Security</h2>
          <p>
            Electronic inquiry logs are stored securely and purged periodically. Physical case files
            for formal clients are maintained in locked chamber facilities accessible only to
            authorized chamber associates.
          </p>
        </div>
      </section>
    </div>
  );
}
