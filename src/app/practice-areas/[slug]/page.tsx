import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  BookOpen,
  Phone,
} from "lucide-react";
import { practiceAreas } from "@/data/practiceAreas";
import { siteConfig } from "@/config/siteConfig";
import { PracticeIcon } from "@/components/PracticeIcon";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

const practiceAreaSeoMap: Record<
  string,
  { title: string; description: string }
> = {
  "criminal-matters": {
    title:
      "Criminal Matters & Defense Legal Procedure | Advocate Anil Kumar Gupta Bareilly",
    description:
      "Legal representation in criminal defense, regular bail, anticipatory bail, and trials before Bareilly District & Sessions Court and magisterial forums.",
  },
  "family-law-matters": {
    title:
      "Court Marriage & Family Law Proceedings | Advocate Anil Kumar Gupta Bareilly",
    description:
      "Legal counsel for court marriage under Special Marriage Act, mutual consent divorce, maintenance, and matrimonial dispute resolution in Bareilly.",
  },
  "cheque-dishonour-matters": {
    title:
      "Section 138 NI Act Cheque Bounce Defense & Notices | Advocate Anil Kumar Gupta Bareilly",
    description:
      "Statutory legal notices, complaint filing, defense strategy, and trial representation under Section 138 Negotiable Instruments Act in Bareilly courts.",
  },
  "documentation-legal-advice": {
    title:
      "Affidavits, Legal Documentation & Drafting | Advocate Anil Kumar Gupta Bareilly",
    description:
      "Drafting and legal vetting of affidavits, agreements, sale deeds, family settlements, and formal legal opinions in Bareilly, Uttar Pradesh.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = practiceAreas.find((a) => a.slug === slug);
  if (!area) return { title: "Practice Area Not Found" };

  const seoData = practiceAreaSeoMap[slug] || {
    title: `${area.title} | Advocate Anil Kumar Gupta Bareilly`,
    description: area.shortDescription,
  };

  const canonicalUrl = `https://advocateanilkumargupta.in/practice-areas/${area.slug}`;

  return {
    title: {
      absolute: seoData.title,
    },
    description: seoData.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "https://advocateanilkumargupta.in/images/advocate-portrait.jpg",
          width: 1200,
          height: 630,
          alt: `${area.title} - Advocate Anil Kumar Gupta Bareilly`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: ["https://advocateanilkumargupta.in/images/advocate-portrait.jpg"],
    },
  };
}

export default async function PracticeAreaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const area = practiceAreas.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  const otherAreas = practiceAreas.filter((a) => a.slug !== slug);

  const breadcrumbSchema = {
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
        name: "Practice Areas",
        item: "https://advocateanilkumargupta.in/practice-areas",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.title,
        item: `https://advocateanilkumargupta.in/practice-areas/${area.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${area.title} - Legal Counsel`,
    description: area.procedureOverview,
    provider: {
      "@type": ["LegalService", "Attorney"],
      name: siteConfig.advocate.fullName,
      url: "https://advocateanilkumargupta.in",
      telephone: siteConfig.contact.mainPhone,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${siteConfig.contact.officeAddress.line1}, ${siteConfig.contact.officeAddress.line2}`,
        addressLocality: "Bareilly",
        addressRegion: "Uttar Pradesh",
        postalCode: "243001",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bareilly, Uttar Pradesh, India",
    },
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, serviceSchema]),
        }}
      />
      {/* Header Banner */}
      <section className="bg-navy-950 text-ivory-100 py-16 sm:py-20 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Practice Areas</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <PracticeIcon name={area.iconName} className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
                Legal Practice Area
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory-50">
              {area.title}
            </h1>
            <p className="text-base sm:text-lg text-charcoal-200 font-sans leading-relaxed">
              {area.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Scope, Procedure, Statutes */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Procedure */}
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-md space-y-4 relative overflow-hidden">
              <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-600" />
                <span>Procedural Overview & Judicial Approach</span>
              </h2>
              <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-sans">
                {area.procedureOverview}
              </p>
            </div>

            {/* Scope of Legal Work */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-md space-y-4 relative overflow-hidden">
              <h2 className="font-serif text-2xl font-bold text-navy-950">
                Scope of Representation & Advisory Services
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Representative matters handled within this practice domain:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {area.scopeOfWork.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white/70 backdrop-blur-sm rounded-xl border border-charcoal-100 flex items-start gap-2.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-charcoal-800 font-semibold leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Governing Statutes */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-md space-y-4 relative overflow-hidden">
              <h2 className="font-serif text-xl font-bold text-navy-950 flex items-center gap-2">
                <Scale className="w-5 h-5 text-gold-600" />
                <span>Key Statutory Framework</span>
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-charcoal-700">
                {area.keyStatutes.map((statute, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/50 backdrop-blur-xs">
                    <span className="w-2 h-2 rounded-full bg-gold-600 shrink-0 mt-2" />
                    <span>{statute}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Ethical Disclaimer */}
            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-gold-500/40 text-xs text-charcoal-700 leading-relaxed flex items-start gap-3 shadow-xs">
              <ShieldAlert className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950">Ethical Notice & Limitation: </strong>
                {area.importantNote} Indian legal ethics prohibit contingency fees or promises of
                favorable rulings.
              </div>
            </div>
          </div>

          {/* Right Column: Chamber Contact Card & Other Practice Areas */}
          <div className="lg:col-span-4 space-y-6">
            {/* Consultation Card */}
            <div className="glass-dark text-ivory-100 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                Chamber Consultation
              </div>
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                Discuss Your Legal Matter
              </h3>
              <p className="text-xs text-charcoal-200 leading-relaxed">
                Schedule a confidential chamber consultation with {siteConfig.advocate.fullName} to
                review case documents, limitation timelines, and legal options.
              </p>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/contact?area=${area.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:translate-y-[-1px]"
                >
                  <span>Chamber Appointment Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`tel:${siteConfig.contact.mainPhone}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800/80 hover:bg-navy-700/80 backdrop-blur-sm text-ivory-200 text-xs font-semibold border border-navy-700 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Call {siteConfig.contact.displayPhone}</span>
                </a>
              </div>
            </div>

            {/* Other Practice Areas */}
            <div className="glass-panel rounded-3xl p-6 shadow-md space-y-4 relative overflow-hidden">
              <h4 className="font-serif text-base font-bold text-navy-950">
                Other Practice Areas
              </h4>
              <ul className="space-y-2 text-xs">
                {otherAreas.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={`/practice-areas/${other.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/90 text-charcoal-800 hover:text-navy-950 transition-all"
                    >
                      <span className="font-semibold">{other.title}</span>
                      <ArrowRight className="w-3 h-3 text-gold-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
