import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Scale,
  ShieldAlert,
  BookOpen,
  Calendar,
  HelpCircle,
  Tag,
} from "lucide-react";
import { articles } from "@/data/articles";
import { siteConfig } from "@/config/siteConfig";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  const canonicalUrl = `https://advocateanilkumargupta.in/blog/${article.slug}`;

  return {
    title: {
      absolute: `${article.title} | Advocate Anil Kumar Gupta`,
    },
    description: article.excerpt,
    keywords: [...siteConfig.seo.keywords, ...article.tags],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.publishedDate,
      authors: [article.author],
      tags: article.tags,
      locale: article.language === "hi" ? "hi_IN" : "en_IN",
      images: [
        {
          url: "https://advocateanilkumargupta.in/images/advocate-portrait.jpg",
          width: 1200,
          height: 630,
          alt: `${article.title} - Advocate Anil Kumar Gupta`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["https://advocateanilkumargupta.in/images/advocate-portrait.jpg"],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a) => a.slug !== slug && (a.category === article.category || a.language === article.language))
    .slice(0, 3);

  const articleCanonicalUrl = `https://advocateanilkumargupta.in/blog/${article.slug}`;

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
        name: "Legal Articles",
        item: "https://advocateanilkumargupta.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleCanonicalUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    inLanguage: article.language,
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleCanonicalUrl,
    },
    author: {
      "@type": "Person",
      name: article.author,
      jobTitle: "Advocate & Legal Consultant",
      url: "https://advocateanilkumargupta.in/about",
    },
    publisher: {
      "@type": ["LegalService", "Attorney"],
      name: siteConfig.advocate.fullName,
      url: "https://advocateanilkumargupta.in",
      logo: {
        "@type": "ImageObject",
        url: "https://advocateanilkumargupta.in/images/advocate-portrait.jpg",
      },
    },
    keywords: article.tags.join(", "),
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, articleSchema]),
        }}
      />
      {/* Header Banner */}
      <section className="bg-navy-950 text-ivory-100 py-16 sm:py-20 border-b border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Legal Articles</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 bg-navy-900 border border-gold-500/30 px-3 py-1 rounded">
              {article.category}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-gold-500 text-navy-950">
              {article.languageLabel}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory-50 leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-200 pt-4 border-t border-navy-800">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>Published on {article.publishedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gold-400" />
              <span>{article.readTimeMinutes} min estimated read</span>
            </div>
            <span>•</span>
            <div>
              <span>By {article.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10">
          {/* Article Excerpt Card */}
          <div className="p-6 rounded-2xl glass-panel-gold border-l-4 border-l-gold-500 text-sm sm:text-base text-charcoal-800 font-sans leading-relaxed italic shadow-xs">
            {article.excerpt}
          </div>

          {/* Table of Contents */}
          <nav aria-label="Table of Contents" className="p-6 rounded-2xl glass-panel border border-white/80 shadow-xs">
            <span className="text-xs uppercase tracking-widest text-navy-950 font-bold block mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gold-600" />
              <span>Contents in this Guide</span>
            </span>
            <ul className="space-y-1.5 text-xs text-charcoal-800">
              {article.content.map((sec, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-gold-700 font-mono font-semibold">0{i + 1}.</span>
                  <a
                    href={`#section-${i}`}
                    className="hover:text-gold-700 hover:underline transition-colors font-medium"
                  >
                    {sec.sectionHeading}
                  </a>
                </li>
              ))}
              {article.faqs && article.faqs.length > 0 && (
                <li className="flex items-center gap-2">
                  <span className="text-gold-700 font-mono font-semibold">0{article.content.length + 1}.</span>
                  <a href="#faqs" className="hover:text-gold-700 hover:underline transition-colors font-medium">
                    Frequently Asked Legal Questions
                  </a>
                </li>
              )}
            </ul>
          </nav>

          {/* Article Sections */}
          <div className="space-y-10 text-charcoal-800 font-sans leading-relaxed text-sm sm:text-base">
            {article.content.map((sec, idx) => (
              <section key={idx} id={`section-${idx}`} className="space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 pt-2 border-b border-charcoal-200/60 pb-2">
                  {sec.sectionHeading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* Statutory References */}
          {article.statutoryReferences && article.statutoryReferences.length > 0 && (
            <div className="p-6 glass-panel rounded-2xl border border-white/80 space-y-3">
              <h3 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                <Scale className="w-5 h-5 text-gold-600" />
                <span>Statutory References & Acts</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-charcoal-700">
                {article.statutoryReferences.map((ref, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-1.5 rounded-lg bg-white/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600 shrink-0 mt-1.5" />
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQs (if available) */}
          {article.faqs && article.faqs.length > 0 && (
            <section id="faqs" className="space-y-4 pt-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gold-600" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-4">
                {article.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl glass-card-interactive space-y-2"
                  >
                    <h3 className="font-serif font-bold text-navy-950 text-sm sm:text-base">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-charcoal-200/60">
            <span className="text-xs text-charcoal-500 font-semibold flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Keywords:</span>
            </span>
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs text-charcoal-800 bg-white/80 backdrop-blur-sm border border-charcoal-200/50 px-3 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Educational Disclaimer */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-gold-500/40 text-xs text-charcoal-700 leading-relaxed flex items-start gap-3 shadow-xs">
            <ShieldAlert className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-navy-950">Important Disclaimer: </strong>
              This article is published for educational purposes only and reflects general statutory
              principles under Indian law. It should not be treated as a legal opinion or formal
              legal advice. Individual cases depend heavily on specific documentary evidence and
              dates of cause of action.
            </div>
          </div>

          {/* Chamber Enquiry Box */}
          <div className="p-8 sm:p-10 glass-dark text-ivory-100 rounded-3xl text-center space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="font-serif text-2xl font-bold text-ivory-50">
              Need Specific Legal Clarification?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-200 max-w-xl mx-auto leading-relaxed">
              For matters requiring personalized scrutiny of documents, statutory notices, or
              court representation, request a chamber appointment.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:translate-y-[-1px]"
              >
                <span>Chamber Appointment Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-charcoal-200/60">
              <h3 className="font-serif text-xl font-bold text-navy-950">Related Legal Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="p-4 glass-card-interactive rounded-2xl flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-gold-700 block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-navy-900 group-hover:text-gold-700 leading-snug line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="text-[11px] text-charcoal-500 pt-3 flex items-center justify-between">
                      <span>{rel.readTimeMinutes} min read</span>
                      <ArrowRight className="w-3 h-3 text-gold-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
