import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  ShieldCheck,
  Award,
  ArrowRight,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Languages,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { practiceAreas } from "@/data/practiceAreas";
import { articles } from "@/data/articles";
import { PracticeIcon } from "@/components/PracticeIcon";
import { GoldParticleCanvas } from "@/components/animations/GoldParticleCanvas";
import { TiltCard } from "@/components/animations/TiltCard";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

export default function HomePage() {
  const featuredArticles = articles.slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 relative overflow-hidden">
      {/* 1. HERO SECTION WITH AMBIENT PARTICLES & 3D GLASS CARDS */}
      <section className="relative bg-navy-950 text-ivory-100 border-b border-gold-500/20 py-20 sm:py-28 overflow-hidden">
        {/* Interactive Floating Gold Particles Canvas */}
        <GoldParticleCanvas />

        {/* Ambient Pulsing Glow Orbs */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/20 rounded-full blur-[110px] pointer-events-none animate-pulse-halo" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-navy-600/30 rounded-full blur-[130px] pointer-events-none animate-float-reverse" />

        {/* Subtle decorative background watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-end -right-20">
          <Scale className="w-[600px] h-[600px] text-gold-400 stroke-[0.7]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Experience Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-md border border-gold-500/50 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg shadow-gold-500/5 animate-float-gentle">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Over <AnimatedCounter end={25} suffix="+" /> Years of Dedicated Legal Practice</span>
            </div>

            {/* Headline with Metallic Shimmer */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory-50 leading-[1.15] mb-6 drop-shadow-sm">
              Legal Guidance Grounded in{" "}
              <span className="text-shimmer-gold">Experience.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-charcoal-200 font-sans leading-relaxed mb-8 max-w-2xl">
              Principled courtroom advocacy, strategic legal counsel, and rigorous drafting
              representing clients before the District & Sessions Court, Special Courts, and
              Judicial Magistrate Courts.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-bold tracking-wide uppercase transition-all shadow-lg shadow-gold-500/25 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-950 hover:translate-y-[-2px]"
              >
                <span>Chamber Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/practice-areas"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-navy-900/60 hover:bg-navy-800/80 backdrop-blur-md text-ivory-100 border border-gold-500/40 text-sm font-semibold tracking-wide uppercase transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-gold-500 hover:translate-y-[-2px]"
              >
                <span>Areas of Practice</span>
              </Link>
            </div>

            {/* Trust Badges: Interactive 3D Tilt Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 pt-8 border-t border-navy-800/80 text-xs text-charcoal-200">
              <TiltCard maxTilt={12}>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-xs hover:border-gold-500/40 transition-colors h-full">
                  <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="font-semibold text-ivory-100">Strict Confidentiality</span>
                </div>
              </TiltCard>

              <TiltCard maxTilt={12}>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-xs hover:border-gold-500/40 transition-colors h-full">
                  <Award className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="font-semibold text-ivory-100">
                    <AnimatedCounter end={25} suffix="+ Years" /> Practice
                  </span>
                </div>
              </TiltCard>

              <TiltCard maxTilt={12}>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-xs hover:border-gold-500/40 transition-colors h-full">
                  <Scale className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="font-semibold text-ivory-100">District & Sessions</span>
                </div>
              </TiltCard>

              <TiltCard maxTilt={12}>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-xs hover:border-gold-500/40 transition-colors h-full">
                  <Languages className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="font-semibold text-ivory-100">English & हिन्दी</span>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRIEF INTRODUCTION HIGHLIGHTING EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle Ambient Refraction */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-gold-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-halo" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs uppercase tracking-widest text-gold-700 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-600 shadow-xs" />
                Professional Creed & Practice Ethos
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-snug">
                More than 25 Years of Legal Advocacy Built on Integrity and Diligence
              </h2>
              <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-sans">
                The practice is founded on an unyielding dedication to constitutional governance,
                meticulous legal research, and principled advocacy. Over 25 years of regular
                courtroom appearances in the District & Sessions Court have cultivated a deep,
                practical understanding of procedural nuances, evidentiary weight, and effective
                dispute resolution.
              </p>
              <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed font-sans">
                Clients receive candid, realistic legal appraisals without unwarranted litigation or
                false expectations. Every brief is approached with thorough scrutiny of facts,
                applicable statutes, and binding precedents.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-navy-950 font-semibold">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-charcoal-200/60 shadow-xs hover:border-gold-500/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  <span>Candid Merits Assessment</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-charcoal-200/60 shadow-xs hover:border-gold-500/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  <span>Statutory Limitation Vigilance</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-charcoal-200/60 shadow-xs hover:border-gold-500/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  <span>Evidence Act Privilege</span>
                </div>
              </div>
            </div>

            {/* 3D Interactive Stats Counter Card */}
            <div className="lg:col-span-4">
              <TiltCard maxTilt={10}>
                <div className="glass-dark text-ivory-50 p-6 sm:p-8 rounded-2xl text-center space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/15 rounded-full blur-2xl pointer-events-none" />
                  <span className="text-5xl sm:text-6xl font-serif font-bold text-shimmer-gold block drop-shadow-sm">
                    <AnimatedCounter end={25} suffix="+" />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-ivory-200 block font-semibold">
                    Years of Legal Practice
                  </span>
                  <p className="text-xs text-charcoal-200 leading-relaxed pt-1">
                    Representing clients in complex criminal defenses, land and property titles, family
                    disputes, cheque dishonour litigations, and commercial documentation.
                  </p>
                  <div className="pt-3">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold underline underline-offset-4"
                    >
                      <span>Read Full Advocate Biography</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AREAS OF PRACTICE (Interactive 3D Tilt Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-widest text-gold-700 font-bold mb-2">
            Practice Portfolio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mb-4">
            Areas of Legal Practice
          </h2>
          <p className="text-sm text-charcoal-600 font-sans leading-relaxed">
            Focused legal counsel in designated practice areas. General civil litigation is
            excluded, ensuring focused attention on core fields of experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area) => (
            <TiltCard key={area.id} maxTilt={9} className="h-full">
              <div className="glass-card-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900/90 text-gold-400 flex items-center justify-center mb-5 border border-gold-500/30 shadow-md group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:scale-110 transition-all duration-300">
                    <PracticeIcon name={area.iconName} className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy-950 mb-2.5">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-sans mb-4">
                    {area.shortDescription}
                  </p>

                  {/* Key Statutes */}
                  <div className="pt-3 border-t border-charcoal-200/50 mb-4">
                    <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-semibold block mb-1.5">
                      Governing Framework:
                    </span>
                    <p className="text-xs text-charcoal-600 line-clamp-2">
                      {area.keyStatutes[0]}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600 group-hover:translate-x-1.5 transition-all pt-2"
                >
                  <span>Detailed Practice Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                </Link>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. ADVOCATE PROFILE PREVIEW (3D Tilt Portrait Card & Specular Glare) */}
      <section className="relative bg-navy-900 text-ivory-100 py-16 sm:py-24 border-y border-gold-500/20 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gold-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-halo" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-navy-600/30 rounded-full blur-[140px] pointer-events-none animate-float-reverse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Portrait Card (Interactive 3D Tilt) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-gold-500/30 via-navy-700/50 to-gold-500/20 blur-md animate-pulse-halo" />
                <TiltCard maxTilt={8}>
                  <div className="relative glass-dark rounded-2xl p-6 sm:p-8 text-center space-y-5">
                    {/* Verified Portrait Image with Rotating Gold Ring Effect */}
                    <div className="w-40 h-40 mx-auto rounded-full bg-navy-900 border-2 border-gold-500/90 overflow-hidden shadow-2xl relative group-hover:border-gold-400 transition-colors">
                      <Image
                        src={siteConfig.advocate.portraitImage}
                        alt={siteConfig.advocate.portraitAlt}
                        fill
                        sizes="(max-width: 768px) 160px, 160px"
                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-ivory-50 tracking-tight">
                        {siteConfig.advocate.fullName}
                      </h3>
                      <p className="text-xs text-gold-400 uppercase tracking-widest font-sans mt-1">
                        {siteConfig.advocate.formalTitle}
                      </p>
                      <p className="text-xs text-charcoal-200 mt-2 font-mono">
                        <AnimatedCounter end={25} suffix="+" /> Years Verified Legal Practice
                      </p>
                    </div>

                    <div className="pt-3 border-t border-navy-800/80 text-left text-xs space-y-2 text-charcoal-200">
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-400">Primary Court:</span>
                        <span className="text-ivory-100 font-medium text-right">
                          District & Sessions Court
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-400">Office Location:</span>
                        <span className="text-ivory-100 font-medium text-right">
                          Near SSP Office
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-400">Languages:</span>
                        <span className="text-ivory-100 font-medium">English, Hindi</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-charcoal-400 italic">
                      Bar Council compliance: Enrolment details excluded per professional regulations.
                    </p>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Profile Narrative & Animated Values */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs uppercase tracking-widest text-gold-400 font-bold">
                Advocate Background & Philosophy
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50 leading-tight">
                Courtroom Tenacity Balanced with Ethical Counsel
              </h2>
              <p className="text-sm sm:text-base text-charcoal-200 leading-relaxed font-sans">
                {siteConfig.advocate.shortBio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {siteConfig.advocate.coreValues.map((val, idx) => (
                  <TiltCard key={idx} maxTilt={6}>
                    <div className="p-4 rounded-xl glass-dark-card space-y-1.5 h-full hover:border-gold-500/40 transition-colors">
                      <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{val.title}</span>
                      </div>
                      <p className="text-xs text-charcoal-300 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </TiltCard>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about"
                  className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold-500/10 hover:translate-y-[-2px]"
                >
                  <span>Read Complete Professional Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEGAL INFORMATION & ARTICLES SECTION (3D Tilt Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-700 font-bold mb-1">
              Legal Education & Procedures
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
              Articles & Procedural Guides
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-xl">
              Published legal information on Indian procedural law, citizen rights, cheque bounce
              timelines, and land documentation in both English and हिन्दी.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-900 hover:text-gold-600 uppercase tracking-wider group"
          >
            <span>View All Legal Articles</span>
            <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredArticles.map((article) => (
            <TiltCard key={article.slug} maxTilt={7} className="h-full">
              <article className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                      {article.category}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-navy-900/90 text-ivory-100 backdrop-blur-sm">
                      {article.languageLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-950 mb-2 leading-snug hover:text-gold-700 transition-colors">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-charcoal-200/50 flex items-center justify-between text-xs text-charcoal-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTimeMinutes} min read</span>
                    </span>
                    <span>•</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="font-semibold text-navy-900 hover:text-gold-600 inline-flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 6. OFFICE LOCATION & CONTACT INFORMATION PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs uppercase tracking-widest text-gold-700 font-bold">
                Office & Chambers
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                Chamber Location & Office Hours
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                Consultations are held at the main office or the Court Chambers by prior appointment
                to accommodate court appearances and scheduled hearings.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-charcoal-800">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-1" />
                  <div>
                    <strong className="text-navy-950">Chambers:</strong>{" "}
                    {siteConfig.contact.officeAddress.line1},{" "}
                    {siteConfig.contact.officeAddress.line2}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
                  <Phone className="w-4 h-4 text-gold-600 shrink-0" />
                  <div>
                    <strong className="text-navy-950">Direct Helpline:</strong>{" "}
                    <a
                      href={`tel:${siteConfig.contact.mainPhone}`}
                      className="hover:text-gold-600 font-semibold"
                    >
                      {siteConfig.contact.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
                  <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                  <div>
                    <strong className="text-navy-950">Working Hours:</strong> Mon – Sat: 10:00 AM –
                    7:30 PM (Prior appointment recommended)
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory-50 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:translate-y-[-2px]"
                >
                  <span>Chamber Appointment Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`tel:${siteConfig.contact.mainPhone}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/80 hover:bg-white text-navy-950 text-xs font-semibold uppercase tracking-wider border border-gold-500/35 backdrop-blur-md transition-all shadow-xs hover:translate-y-[-2px]"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>Click to Call Chamber</span>
                </a>
              </div>
            </div>

            {/* Quick Consultation Assurance Box (3D Tilt) */}
            <div className="lg:col-span-5">
              <TiltCard maxTilt={8}>
                <div className="glass-dark text-ivory-100 rounded-2xl p-6 sm:p-7 space-y-4 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confidentiality Guarantee</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ivory-50">
                    Ethical & Discretionary Legal Counsel
                  </h3>
                  <p className="text-xs text-charcoal-200 leading-relaxed">
                    Under Section 126 of the Indian Evidence Act, all client discussions and documents
                    shared with an advocate enjoy statutory professional privilege and confidentiality.
                  </p>
                  <div className="pt-2 border-t border-navy-800/80 text-xs text-charcoal-300">
                    <span>Direct WhatsApp Contact: </span>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-400 hover:underline font-semibold"
                    >
                      Message Chamber on WhatsApp
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
