"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Phone, Menu, X, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Areas of Practice" },
  { href: "/blog", label: "Legal Articles" },
  { href: "/contact", label: "Contact & Chambers" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory-50/80 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_25px_-5px_rgba(16,36,58,0.06)] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Advocate Name */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold-500 rounded p-1"
          >
            <div className="w-11 h-11 rounded-lg bg-navy-900/90 backdrop-blur-md flex items-center justify-center text-gold-400 border border-gold-500/40 shadow-md group-hover:border-gold-400 transition-colors">
              <Scale className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-navy-900 group-hover:text-gold-700 transition-colors">
                {siteConfig.advocate.fullName}
              </span>
              <span className="text-[11px] sm:text-xs font-sans text-charcoal-600 tracking-wider uppercase font-medium">
                {siteConfig.advocate.formalTitle} • {siteConfig.advocate.experienceYears} Exp.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 p-1.5 rounded-full bg-ivory-200/50 backdrop-blur-md border border-white/60 shadow-inner" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "text-navy-950 bg-white/90 border border-gold-500/40 shadow-xs font-semibold"
                      : "text-charcoal-700 hover:text-navy-950 hover:bg-white/60 border border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Direct Chamber CTA (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.mainPhone}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-navy-900 bg-white/70 hover:bg-white/95 border border-gold-500/35 shadow-xs backdrop-blur-md transition-all"
              title="Chamber Contact Number"
            >
              <Phone className="w-3.5 h-3.5 text-gold-600" />
              <span>{siteConfig.contact.displayPhone}</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-ivory-50 bg-navy-900/90 hover:bg-navy-800 backdrop-blur-md transition-all shadow-sm border border-navy-950"
            >
              <span>Enquiry</span>
              <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${siteConfig.contact.mainPhone}`}
              className="p-2 text-navy-900 hover:text-gold-600 bg-white/70 backdrop-blur-md border border-gold-500/30 rounded-full"
              aria-label="Call Chamber"
            >
              <Phone className="w-4 h-4 text-gold-600" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-charcoal-800 hover:text-navy-900 bg-white/70 backdrop-blur-md border border-charcoal-200/60 focus:outline-none focus:ring-2 focus:ring-gold-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gold-500/20 bg-ivory-50/90 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`block px-4 py-2.5 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-navy-900 text-ivory-50 font-semibold"
                    : "text-charcoal-800 hover:bg-ivory-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-charcoal-200/60 flex flex-col gap-2">
            <div className="text-xs text-charcoal-600 px-1 font-medium">Chamber Helpline:</div>
            <a
              href={`tel:${siteConfig.contact.mainPhone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded bg-ivory-200 text-navy-900 font-semibold text-sm border border-gold-500/30"
            >
              <Phone className="w-4 h-4 text-gold-600" />
              <span>{siteConfig.contact.displayPhone}</span>
            </a>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded bg-navy-900 text-ivory-50 font-semibold text-sm shadow-sm"
            >
              <span>Consultation Enquiry</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
