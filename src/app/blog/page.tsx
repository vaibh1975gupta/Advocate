import React from "react";
import type { Metadata } from "next";
import { BookOpen, ShieldCheck } from "lucide-react";
import { articles } from "@/data/articles";
import { BlogListingClient } from "@/components/BlogListingClient";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxFloatingWatermark } from "@/components/animations/ParallaxFloatingWatermark";

export const metadata: Metadata = {
  title: {
    absolute: "Legal Articles & Procedural Guides | Advocate Anil Kumar Gupta",
  },
  description:
    "Educational articles on Indian legal procedures, Section 138 NI Act, criminal bail, court marriage, property verification, and citizen rights in English and हिन्दी.",
  alternates: {
    canonical: "https://advocateanilkumargupta.in/blog",
  },
  openGraph: {
    title: "Legal Articles & Procedural Guides | Advocate Anil Kumar Gupta",
    description:
      "Educational articles on Indian legal procedures, Section 138 NI Act, criminal bail, court marriage, property verification, and citizen rights in English and हिन्दी.",
    url: "https://advocateanilkumargupta.in/blog",
    type: "website",
    images: [
      {
        url: "https://advocateanilkumargupta.in/images/advocate-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Articles & Procedural Guides - Advocate Anil Kumar Gupta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Articles & Procedural Guides | Advocate Anil Kumar Gupta",
    description:
      "Educational articles on Indian legal procedures, Section 138 NI Act, criminal bail, court marriage, property verification, and citizen rights in English and हिन्दी.",
    images: ["https://advocateanilkumargupta.in/images/advocate-portrait.jpg"],
  },
};

export default function BlogPage() {
  const blogBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://advocateanilkumargupta.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Legal Articles",
        item: "https://advocateanilkumargupta.in/blog",
      },
    ],
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumb) }}
      />
      {/* Page Header */}
      <section className="bg-navy-950 text-ivory-100 py-16 sm:py-20 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4 text-gold-400" />
              <span>Legal Literacy & Information</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory-50 mb-4">
              Legal Articles & Procedural Guides
            </h1>
            <p className="text-base sm:text-lg text-charcoal-200 font-sans leading-relaxed">
              General educational guides on Indian laws, procedural requirements, statutory
              deadlines, and citizen rights in English and हिन्दी.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Parallax Floating Legal Book Watermark */}
        <div className="absolute right-0 top-1/3 pointer-events-none overflow-hidden" aria-hidden="true">
          <ParallaxFloatingWatermark icon="book" speed={-0.12} size={480} className="opacity-10" />
        </div>

        <ScrollReveal animation="fade-up">
          <BlogListingClient articles={articles} />
        </ScrollReveal>
      </section>

      {/* Educational Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-ivory-50 rounded-xl border border-charcoal-200 text-xs text-charcoal-600 leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
          <p>
            <strong>Educational Disclaimer:</strong> The articles published above are intended
            exclusively for legal education and public awareness under Article 19(1)(a) of the
            Constitution of India. They do not constitute formal legal opinions or create an
            advocate-client relationship. Citizens facing specific legal proceedings must seek
            independent legal advice from an advocate based on the unique factual circumstances of
            their case.
          </p>
        </div>
      </section>
    </div>
  );
}
