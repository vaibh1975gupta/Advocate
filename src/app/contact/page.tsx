import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  MessageSquare,
  Landmark,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxFloatingWatermark } from "@/components/animations/ParallaxFloatingWatermark";

export const metadata: Metadata = {
  title: "Contact & Chambers | Office Address & Consultation Enquiry",
  description:
    "Official chamber address, contact telephone, working hours, and appointment inquiry form for Advocate [Full Name] in India.",
};

export default function ContactPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Header */}
      <section className="bg-navy-950 text-ivory-100 py-16 sm:py-20 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Landmark className="w-4 h-4 text-gold-400" />
              <span>Chamber & Office Information</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory-50 mb-4">
              Chamber Locations & Consultation
            </h1>
            <p className="text-base sm:text-lg text-charcoal-200 font-sans leading-relaxed">
              Official addresses, direct chamber helplines, working hours, and formal appointment
              enquiry submission for {siteConfig.advocate.fullName}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Details & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Parallax Floating Legal Scales Watermark */}
        <div className="absolute right-0 top-1/3 pointer-events-none overflow-hidden" aria-hidden="true">
          <ParallaxFloatingWatermark icon="scale" speed={-0.12} size={450} className="opacity-10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          {/* Left Column: Chamber Details & Working Hours */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal animation="fade-right">
              {/* Office & Chamber Addresses */}
              <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
                  Chamber Address
                </span>
                <h2 className="font-serif text-xl font-bold text-navy-950">
                  {siteConfig.contact.officeAddress.title}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal-800">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-navy-950 text-sm">
                      {siteConfig.contact.officeAddress.line1}
                    </div>
                    <div className="text-charcoal-600 mt-0.5">
                      {siteConfig.contact.officeAddress.line2}
                    </div>
                    <a
                      href={siteConfig.contact.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-gold-600 hover:text-gold-700 font-semibold underline underline-offset-2 mt-2"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-charcoal-200/50">
                  <span className="text-xs font-bold text-navy-950 block mb-1">
                    {siteConfig.contact.chambersAddress.title}:
                  </span>
                  <div className="text-charcoal-600 pl-2 font-medium">
                    {siteConfig.contact.chambersAddress.line1},{" "}
                    {siteConfig.contact.chambersAddress.line2}
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="pt-4 border-t border-charcoal-200/50 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/50 backdrop-blur-sm border border-white/70">
                  <Phone className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <span className="text-charcoal-500 text-xs block">Official Chamber Helpline:</span>
                    <a
                      href={`tel:${siteConfig.contact.mainPhone}`}
                      className="font-bold text-navy-950 hover:text-gold-600 transition-colors"
                    >
                      {siteConfig.contact.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/50 backdrop-blur-sm border border-white/70">
                  <Mail className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <span className="text-charcoal-500 text-xs block">Official Email Address:</span>
                    <a
                      href={`mailto:${siteConfig.contact.officialEmail}`}
                      className="font-bold text-navy-950 hover:text-gold-600 transition-colors"
                    >
                      {siteConfig.contact.officialEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/50 backdrop-blur-sm border border-white/70">
                  <MessageSquare className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <span className="text-charcoal-500 text-xs block">WhatsApp Direct Link:</span>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-navy-950 hover:text-gold-600 transition-colors"
                    >
                      Send Message on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Chamber Working Hours */}
            <div className="glass-dark text-ivory-100 rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Office & Chamber Hours</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-ivory-50">
                Regular Consultation Schedule
              </h3>
              <div className="space-y-2 text-xs">
                {siteConfig.contact.hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-navy-800/80 last:border-none"
                  >
                    <span className="text-charcoal-300 font-medium">{h.days}:</span>
                    <span className="text-gold-400 font-semibold">{h.timing}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-charcoal-300 leading-relaxed italic pt-1">
                Prior appointment is strictly requested to avoid delays during active court hours.
              </p>
            </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Consultation Enquiry Form */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal animation="fade-left">
              <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-700 block mb-1">
                    Online Consultation Form
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                    Request a Consultation
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1 leading-relaxed">
                    Provide an overview of your legal query. Our chamber assistant will review the
                    request and confirm an appointment slot.
                  </p>
                </div>

                {/* Server Action Form Component */}
                <ContactForm />
              </div>

              {/* Evidence Act Privilege Notice */}
              <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-gold-500/40 text-xs text-charcoal-700 leading-relaxed flex items-start gap-3 shadow-xs mt-6">
                <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-navy-950">Statutory Professional Privilege: </strong>
                  All factual disclosures submitted through this form are protected under Section 126
                  of the Indian Evidence Act. Please do not submit confidential financial pins, bank
                  credentials, or OTPs.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-navy-900">
                Chamber Location Map & Directions
              </h3>
              <p className="text-xs text-charcoal-600">
                Easily accessible via local court complex transport and major city transit.
              </p>
            </div>
            <a
              href={siteConfig.contact.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600 bg-ivory-200 px-3 py-1.5 rounded border border-charcoal-200/80 transition-colors"
            >
              <span>Open in Google Maps Application</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-600" />
            </a>
          </div>

          <div className="w-full h-80 rounded-xl overflow-hidden border border-charcoal-200 shadow-inner bg-charcoal-100 relative">
            <iframe
              src={siteConfig.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Advocate Chambers Location Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </ScrollReveal>
    </section>
  </div>
);
}
