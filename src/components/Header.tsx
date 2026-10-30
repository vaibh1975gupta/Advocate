"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Clock,
  MapPin,
  MessageSquare,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { practiceAreas } from "@/data/practiceAreas";
import { PracticeIcon } from "@/components/PracticeIcon";

interface NavLinkItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Areas of Practice", hasDropdown: true },
  { href: "/blog", label: "Legal Articles" },
  { href: "/contact", label: "Contact & Chambers" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false);
  const [phonePopoverOpen, setPhonePopoverOpen] = useState(false);
  const [mobilePracticeAccordion, setMobilePracticeAccordion] = useState(false);
  const [chamberStatus, setChamberStatus] = useState({
    isOpen: true,
    label: "Chamber Active • 10 AM – 7:30 PM",
  });

  const pathname = usePathname();
  const navContainerRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic Scroll Direction & Height Compression
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || document.documentElement.scrollTop;

          // Compression toggle
          setIsScrolled(currentScrollY > 20);

          // Smart auto-hide / reveal
          if (currentScrollY <= 80) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
            // Scrolling DOWN: auto-hide header to give max reading room
            if (!mobileMenuOpen) {
              setIsVisible(false);
              setPracticeDropdownOpen(false);
              setPhonePopoverOpen(false);
            }
          } else if (lastScrollY - currentScrollY > 8) {
            // Scrolling UP: swiftly bring header back
            setIsVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Real-time Chamber Working Status
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const timeInMinutes = hour * 60 + minutes;

      const isWorkingDay = day >= 1 && day <= 6; // Mon-Sat
      const isWorkingHours = timeInMinutes >= 600 && timeInMinutes <= 1170; // 10:00 to 19:30

      if (isWorkingDay && isWorkingHours) {
        setChamberStatus({
          isOpen: true,
          label: "Chamber Open Now • Until 7:30 PM",
        });
      } else if (isWorkingDay && timeInMinutes < 600) {
        setChamberStatus({
          isOpen: false,
          label: "Chamber Opens at 10:00 AM",
        });
      } else {
        setChamberStatus({
          isOpen: false,
          label: "Court Chambers • Mon–Sat: 10 AM – 7:30 PM",
        });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Click outside to dismiss popovers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setPracticeDropdownOpen(false);
        setPhonePopoverOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPracticeDropdownOpen(false);
        setPhonePopoverOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setPracticeDropdownOpen(false);
    setPhonePopoverOpen(false);
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setPracticeDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setPracticeDropdownOpen(false);
    }, 200);
  };

  return (
    <header
      ref={navContainerRef}
      className={`sticky top-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-ivory-50/90 backdrop-blur-xl border-b border-gold-500/30 shadow-[0_10px_30px_-10px_rgba(16,36,58,0.14)]"
          : "bg-ivory-50/75 backdrop-blur-md border-b border-white/60 shadow-[0_4px_20px_-5px_rgba(16,36,58,0.03)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* 1. BRAND LOGO & ADVOCATE TITLE */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-xl p-1 transition-all duration-300 shrink-0"
          >
            <div
              className={`rounded-xl bg-navy-900/95 backdrop-blur-md flex items-center justify-center text-gold-400 border border-gold-500/40 shadow-md group-hover:border-gold-400 group-hover:scale-105 transition-all duration-300 shrink-0 ${
                isScrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-11 h-11"
              }`}
            >
              <Scale
                className={`transition-all duration-300 ${
                  isScrolled ? "w-4.5 h-4.5 sm:w-5 sm:h-5" : "w-6 h-6"
                }`}
              />
            </div>

            <div className="flex flex-col transition-all duration-300">
              <div className="flex items-center gap-2">
                <span
                  className={`font-serif font-bold tracking-tight text-navy-900 group-hover:text-gold-700 transition-all duration-300 ${
                    isScrolled
                      ? "text-base sm:text-lg leading-tight"
                      : "text-lg sm:text-xl leading-snug"
                  }`}
                >
                  {siteConfig.advocate.fullName}
                </span>

                {/* Micro Live Indicator Pill on larger screens */}
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{chamberStatus.isOpen ? "Active" : "Closed"}</span>
                </span>
              </div>

              <span
                className={`font-sans text-charcoal-600 tracking-wider uppercase font-medium transition-all duration-300 ${
                  isScrolled ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs"
                }`}
              >
                {siteConfig.advocate.formalTitle} • {siteConfig.advocate.experienceYears}
              </span>
            </div>
          </Link>

          {/* 2. DYNAMIC DESKTOP NAVIGATION WITH HOVER FLYOUT */}
          <nav
            className={`hidden lg:flex items-center gap-1 rounded-full backdrop-blur-md transition-all duration-300 ${
              isScrolled
                ? "p-1 bg-ivory-200/80 border border-gold-500/25 shadow-xs"
                : "p-1.5 bg-ivory-200/60 border border-white/70 shadow-inner"
            }`}
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <button
                      type="button"
                      onClick={() => setPracticeDropdownOpen(!practiceDropdownOpen)}
                      className={`inline-flex items-center gap-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        isScrolled ? "px-3 py-1" : "px-3.5 py-1.5"
                      } ${
                        isActive || practiceDropdownOpen
                          ? "text-navy-950 bg-white/95 border border-gold-500/40 shadow-xs font-semibold"
                          : "text-charcoal-700 hover:text-navy-950 hover:bg-white/70 border border-transparent"
                      }`}
                      aria-expanded={practiceDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gold-600 transition-transform duration-200 ${
                          practiceDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* DYNAMIC PRACTICE AREAS MEGA DROPDOWN */}
                    {practiceDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] glass-panel-gold rounded-2xl p-5 shadow-2xl border border-gold-500/40 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-charcoal-200/50">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700 flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-gold-600" />
                            <span>Authorized Practice Categories</span>
                          </span>
                          <span className="text-[11px] text-charcoal-500">
                            District & Sessions Court
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {practiceAreas.map((area) => (
                            <Link
                              key={area.id}
                              href={`/practice-areas/${area.slug}`}
                              onClick={handleLinkClick}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/80 border border-transparent hover:border-gold-500/30 transition-all group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-navy-900/90 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors shadow-xs">
                                <PracticeIcon
                                  name={area.iconName}
                                  className="w-4 h-4"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-navy-950 group-hover:text-gold-700 transition-colors truncate">
                                  {area.title}
                                </h4>
                                <p className="text-[11px] text-charcoal-600 line-clamp-1 mt-0.5">
                                  {area.shortDescription}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-charcoal-200/50 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-charcoal-500 italic">
                            Civil disputes strictly excluded
                          </span>
                          <Link
                            href="/practice-areas"
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1 text-gold-700 hover:text-gold-900 font-semibold group"
                          >
                            <span>Explore Complete Practice Portfolio</span>
                            <ArrowRight className="w-3.5 h-3.5 text-gold-600 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full text-xs font-medium transition-all duration-200 ${
                    isScrolled ? "px-3 py-1" : "px-3.5 py-1.5"
                  } ${
                    isActive
                      ? "text-navy-950 bg-white/95 border border-gold-500/40 shadow-xs font-semibold"
                      : "text-charcoal-700 hover:text-navy-950 hover:bg-white/70 border border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. DYNAMIC CHAMBER HELPLINE & FAST CONSULTATION CTA */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 transition-all duration-300">
            {/* Quick Hotline with Popover Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPhonePopoverOpen(!phonePopoverOpen)}
                className={`inline-flex items-center gap-2 rounded-full text-xs font-semibold text-navy-900 bg-white/80 hover:bg-white border border-gold-500/35 shadow-xs backdrop-blur-md transition-all duration-200 hover:border-gold-500/70 ${
                  isScrolled ? "px-3 py-1.5" : "px-3.5 py-2"
                }`}
                title="Chamber Contact Helpline"
                aria-expanded={phonePopoverOpen}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>{siteConfig.contact.displayPhone}</span>
              </button>

              {/* DYNAMIC CHAMBER QUICK-CONTACT POPOVER */}
              {phonePopoverOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 glass-dark text-ivory-100 rounded-2xl p-4 shadow-2xl border border-gold-500/40 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                      Chamber Helpline
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      Direct Official
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <a
                      href={`tel:${siteConfig.contact.mainPhone}`}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-navy-900/90 hover:bg-gold-500 hover:text-navy-950 transition-colors font-bold text-ivory-50 border border-gold-500/30"
                    >
                      <Phone className="w-4 h-4 text-gold-400 group-hover:text-navy-950" />
                      <span>Call: {siteConfig.contact.displayPhone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-700/80 text-emerald-300 hover:text-white transition-colors font-medium border border-emerald-500/30"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Chamber Desk</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-navy-800 text-[11px] text-charcoal-300 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>Mon–Sat: 10:00 AM – 7:30 PM</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>Near SSP Office, District Court</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chamber Consultation Button */}
            <Link
              href="/contact"
              className={`btn-shimmer inline-flex items-center gap-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-ivory-50 bg-navy-900/95 hover:bg-navy-800 backdrop-blur-md transition-all duration-200 shadow-sm border border-gold-500/40 hover:shadow-md hover:translate-y-[-1px] ${
                isScrolled ? "px-3.5 py-1.5" : "px-4 py-2"
              }`}
            >
              <span>Enquiry</span>
              <ChevronRight className="w-3.5 h-3.5 text-gold-400" />
            </Link>
          </div>

          {/* 4. MOBILE MENU TRIGGER & ACTIONS */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${siteConfig.contact.mainPhone}`}
              className={`text-navy-900 hover:text-gold-600 bg-white/80 backdrop-blur-md border border-gold-500/35 rounded-full transition-all duration-200 shadow-xs ${
                isScrolled ? "p-1.5" : "p-2"
              }`}
              aria-label="Call Advocate Chamber"
            >
              <Phone className="w-4 h-4 text-gold-600" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`rounded-full text-charcoal-800 hover:text-navy-900 bg-white/80 backdrop-blur-md border border-charcoal-200/80 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all duration-200 shadow-xs ${
                isScrolled ? "p-1.5" : "p-2"
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. DYNAMIC MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gold-500/25 bg-ivory-50/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Dynamic Live Chamber Banner in Drawer */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-gold-500/30 text-xs mb-3 shadow-xs">
            <span className="flex items-center gap-2 font-semibold text-navy-950">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{chamberStatus.label}</span>
            </span>
            <span className="text-[11px] text-gold-700 font-bold uppercase">
              25+ Yrs Exp
            </span>
          </div>

          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            if (link.hasDropdown) {
              return (
                <div key={link.href} className="space-y-1">
                  <div className="flex items-center justify-between rounded-xl px-4 py-2.5 bg-white/60 border border-charcoal-100">
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`text-sm font-medium ${
                        isActive ? "text-gold-700 font-bold" : "text-charcoal-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setMobilePracticeAccordion(!mobilePracticeAccordion)
                      }
                      className="p-1 rounded text-gold-600 hover:bg-gold-500/10"
                      aria-label="Toggle Practice Areas Submenu"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobilePracticeAccordion ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Accordion Sub-links */}
                  {mobilePracticeAccordion && (
                    <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-gold-500/40 ml-3">
                      {practiceAreas.map((area) => (
                        <Link
                          key={area.id}
                          href={`/practice-areas/${area.slug}`}
                          onClick={handleLinkClick}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-charcoal-800 hover:bg-white/80 hover:text-navy-950 transition-colors"
                        >
                          <PracticeIcon
                            name={area.iconName}
                            className="w-3.5 h-3.5 text-gold-600 shrink-0"
                          />
                          <span className="font-medium">{area.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-navy-900 text-ivory-50 font-semibold shadow-xs"
                    : "text-charcoal-800 hover:bg-white/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Quick Action Contact Cards inside Mobile Drawer */}
          <div className="pt-4 border-t border-charcoal-200/70 flex flex-col gap-2.5">
            <div className="text-xs text-charcoal-600 px-1 font-semibold flex items-center justify-between">
              <span>Chamber Official Contact</span>
              <span className="text-[10px] text-gold-700">Near SSP Office</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${siteConfig.contact.mainPhone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/90 text-navy-900 font-bold text-xs border border-gold-500/40 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>Call Chamber</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/80 text-emerald-300 font-semibold text-xs border border-emerald-500/40 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="btn-shimmer flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-navy-900 text-ivory-50 font-bold text-xs uppercase tracking-wider shadow-md border border-navy-950"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>Chamber Appointment Enquiry</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
