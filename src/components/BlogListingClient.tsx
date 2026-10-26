"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Languages, BookOpen, Search } from "lucide-react";
import { Article } from "@/data/articles";

interface BlogListingClientProps {
  articles: Article[];
}

export function BlogListingClient({ articles }: BlogListingClientProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "en" | "hi">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const filteredArticles = articles.filter((article) => {
    const matchesLang =
      selectedLanguage === "all" ? true : article.language === selectedLanguage;
    const matchesCategory =
      selectedCategory === "all" ? true : article.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesLang && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Controls Bar: Language Toggle, Category Filter, Search */}
      <div className="bg-ivory-50 border border-charcoal-200/90 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Language Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-charcoal-600 uppercase tracking-wider flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-gold-600" />
              <span>Language:</span>
            </span>
            <div className="inline-flex rounded-lg bg-ivory-200 p-1 border border-charcoal-200/60">
              <button
                type="button"
                onClick={() => setSelectedLanguage("all")}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  selectedLanguage === "all"
                    ? "bg-navy-900 text-ivory-50 shadow-sm"
                    : "text-charcoal-700 hover:text-navy-900"
                }`}
              >
                All Articles
              </button>
              <button
                type="button"
                onClick={() => setSelectedLanguage("en")}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  selectedLanguage === "en"
                    ? "bg-navy-900 text-ivory-50 shadow-sm"
                    : "text-charcoal-700 hover:text-navy-900"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setSelectedLanguage("hi")}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  selectedLanguage === "hi"
                    ? "bg-navy-900 text-ivory-50 shadow-sm"
                    : "text-charcoal-700 hover:text-navy-900"
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal topics, Section 138, Bail..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-charcoal-200 text-xs text-charcoal-900 bg-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-charcoal-200/60">
          <span className="text-xs text-charcoal-500 font-medium">Category:</span>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-gold-500 text-navy-950 font-bold"
                : "bg-ivory-200/80 text-charcoal-700 hover:bg-ivory-300"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-gold-500 text-navy-950 font-bold"
                  : "bg-ivory-200/80 text-charcoal-700 hover:bg-ivory-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-ivory-50 rounded-2xl border border-charcoal-200/80 p-8">
          <BookOpen className="w-12 h-12 text-charcoal-400 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-navy-900">No articles matched</h3>
          <p className="text-xs text-charcoal-600 mt-1">
            Try clearing your search query or switching filters to view all legal publications.
          </p>
          <button
            onClick={() => {
              setSelectedLanguage("all");
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-navy-900 text-ivory-50 rounded text-xs font-medium"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-ivory-50 border border-charcoal-200/80 hover:border-gold-500/60 rounded-xl p-6 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700 bg-gold-500/10 px-2.5 py-0.5 rounded border border-gold-500/20">
                    {article.category}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-navy-900 text-ivory-100">
                    {article.languageLabel}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-navy-900 mb-2 leading-snug hover:text-gold-700 transition-colors">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-charcoal-600 bg-ivory-200 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-500">
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
                  className="font-semibold text-navy-900 hover:text-gold-600 inline-flex items-center gap-1 group"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
