"use client";

import React, { useEffect, useRef, useState } from "react";
import { Award, Shield, FileCheck, Scale, CheckCircle2 } from "lucide-react";

interface Milestone {
  year: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
}

const milestones: Milestone[] = [
  {
    year: "2000",
    badge: "Foundation of Practice",
    title: "Commencement at District & Sessions Court",
    description:
      "Initiated regular litigation chambers near the SSP Office, representing individuals in bail matters, criminal proceedings, and fundamental judicial magistrate forums.",
    icon: <Scale className="w-5 h-5 text-gold-400" />,
    highlights: ["Courtroom appearances", "Bail & remand advocacy", "Procedural precision"],
  },
  {
    year: "2007",
    badge: "Trial Defense Focus",
    title: "Rigorous Evidentiary & Criminal Advocacy",
    description:
      "Deepened specialized focus on contested trial defense, detailed witness cross-examinations, statutory rights protection, and Sessions Court trials.",
    icon: <Shield className="w-5 h-5 text-gold-400" />,
    highlights: ["Evidence scrutiny", "Criminal trial defense", "Cross-examination mastery"],
  },
  {
    year: "2014",
    badge: "Land & Property Practice",
    title: "Title Scrutiny & Agricultural Land Disputes",
    description:
      "Expanded strategic advisory to complex landed estates, ancestral partitions, revenue record verifications, mutation disputes, and injunction applications.",
    icon: <FileCheck className="w-5 h-5 text-gold-400" />,
    highlights: ["Revenue records verification", "Partition & boundary suits", "Sale deed drafting"],
  },
  {
    year: "2019",
    badge: "Commercial & Cheque Dishonour",
    title: "Section 138 NI Act Litigation Chambers",
    description:
      "Pioneered structured, time-sensitive compliance protocols for cheque dishonour matters, statutory 30-day legal demand notices, and trial representations.",
    icon: <Award className="w-5 h-5 text-gold-400" />,
    highlights: ["Statutory demand notices", "Speedy trial proceedings", "Mediation & compounding"],
  },
  {
    year: "Present",
    badge: "25+ Years Milestone",
    title: "Trusted Senior Courtroom Counsel",
    description:
      "Celebrating over a quarter century of unwavering advocacy, upholding constitutional integrity and guiding clients through newly codified BNSS and BSA statutes.",
    icon: <CheckCircle2 className="w-5 h-5 text-gold-400" />,
    highlights: ["25+ years verified tenure", "BNSS/BSA procedural expertise", "Strict confidentiality"],
  },
];

export function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // How much of the timeline container has scrolled into view
          const start = windowHeight * 0.75;
          const end = windowHeight * 0.25;
          const totalDistance = rect.height + (start - end);
          const currentDistance = start - rect.top;

          const progress = Math.min(100, Math.max(0, (currentDistance / totalDistance) * 100));
          setLineProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Background Central Track Line */}
      <div className="absolute left-6 md:left-1/2 top-10 bottom-10 w-[3px] -translate-x-1/2 bg-navy-900/10 rounded-full" />

      {/* Dynamic Golden Luminous Fill Line */}
      <div
        className="absolute left-6 md:left-1/2 top-10 w-[3px] -translate-x-1/2 bg-gradient-to-b from-gold-500 via-gold-400 to-ivory-50 rounded-full shadow-[0_0_12px_rgba(185,154,91,0.7)] transition-all duration-100 ease-out"
        style={{ height: `${lineProgress}%`, maxHeight: "calc(100% - 80px)" }}
      >
        {/* Glowing Head Pip */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold-400 shadow-[0_0_10px_#b99a5b,0_0_20px_#b99a5b] animate-ping" />
      </div>

      <div className="space-y-12 sm:space-y-16">
        {milestones.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? "md:flex-row-reverse" : ""
              } group`}
            >
              {/* Center Timeline Node Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 w-11 h-11 rounded-full bg-navy-950 border-2 border-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/20 z-20 group-hover:scale-110 group-hover:border-gold-300 transition-all duration-300">
                {item.icon}
              </div>

              {/* Content Card Side */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-44px)] ${
                  isEven ? "md:pr-10" : "md:pl-10"
                }`}
              >
                <div className="glass-panel-gold rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gold-500/30 group-hover:border-gold-500/60 relative overflow-hidden">
                  {/* Subtle corner shimmer */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold-500/10 rounded-full blur-xl pointer-events-none" />

                  {/* Year Tag & Milestone Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl font-serif font-bold text-shimmer-gold">
                      {item.year}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-navy-950 bg-gold-500/20 px-3 py-1 rounded-full border border-gold-500/30">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-navy-950 mb-2 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-charcoal-700 font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="pt-3 border-t border-charcoal-200/50 flex flex-wrap gap-2">
                    {item.highlights.map((hl, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] font-medium text-navy-900 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-charcoal-200/60"
                      >
                        ✓ {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Empty placeholder on opposite side for desktop grid balancing */}
              <div className="hidden md:block md:w-[calc(50%-44px)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
