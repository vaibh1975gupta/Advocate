"use client";

import React, { useActionState } from "react";
import { Send, CheckCircle2, AlertCircle, ShieldAlert, Loader2, RefreshCw, Mail } from "lucide-react";
import { submitEnquiryAction, ContactFormState } from "@/app/actions/contact";
import { practiceAreas } from "@/data/practiceAreas";
import { ConfettiCelebration } from "@/components/animations/ConfettiCelebration";
import { siteConfig } from "@/config/siteConfig";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiryAction, initialState);

  if (state.success) {
    return (
      <div className="glass-panel-gold rounded-2xl p-8 sm:p-10 shadow-xl text-center animate-in zoom-in-95 duration-300 relative overflow-hidden">
        <ConfettiCelebration />
        <div className="w-16 h-16 bg-navy-900/90 backdrop-blur-md text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/50 shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2">
          Consultation Request Confirmed
        </h3>
        <p className="text-sm text-charcoal-700 max-w-md mx-auto mb-6 leading-relaxed font-sans">
          {state.message}
        </p>

        {state.referenceId && (
          <div className="inline-block bg-white/80 backdrop-blur-md border border-gold-500/40 rounded-xl px-6 py-3 mb-6 shadow-xs">
            <span className="text-xs uppercase tracking-wider text-charcoal-600 block font-semibold">
              Inquiry Reference Number
            </span>
            <span className="font-mono text-base font-bold text-navy-950">
              {state.referenceId}
            </span>
          </div>
        )}

        <div className="text-xs text-charcoal-700 bg-white/60 backdrop-blur-sm p-4 rounded-xl max-w-lg mx-auto border border-charcoal-200/60 text-left space-y-1.5 mb-6 shadow-xs">
          <div className="font-semibold text-navy-950 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-gold-600" />
            <span>Confidentiality & Response Protocol:</span>
          </div>
          <p>
            Please note down your reference number. Our chamber assistant will review the matter
            against our court calendar and reach out to you via your provided phone number or email.
            For direct email follow-up, you can write to{" "}
            <a
              href={`mailto:${siteConfig.contact.officialEmail}`}
              className="text-gold-700 hover:text-gold-900 font-bold underline underline-offset-2"
            >
              {siteConfig.contact.officialEmail}
            </a>
            . No advocate-client privilege is formed until a formal vakalatnama or engagement is
            executed.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-navy-900 text-ivory-50 hover:bg-navy-800 transition-all shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Submit Another Enquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Direct Email Consultation Option */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-gold-500/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-navy-900/90 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30">
            <Mail className="w-4 h-4 text-gold-400" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-semibold block">
              Official Email for Direct Enquiry:
            </span>
            <a
              href={`mailto:${siteConfig.contact.officialEmail}?subject=Legal%20Consultation%20Enquiry%20-%20Advocate%20Anil%20Kumar%20Gupta`}
              className="text-xs sm:text-sm font-bold text-navy-950 hover:text-gold-700 transition-colors underline underline-offset-2 break-all"
            >
              {siteConfig.contact.officialEmail}
            </a>
          </div>
        </div>

        <a
          href={`mailto:${siteConfig.contact.officialEmail}?subject=Legal%20Consultation%20Enquiry%20-%20Advocate%20Anil%20Kumar%20Gupta`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold transition-all shadow-xs shrink-0 self-stretch sm:self-auto justify-center"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email Chamber</span>
        </a>
      </div>

      {/* Honeypot field for bot spam trap */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="fax_number">Fax Number</label>
        <input
          type="text"
          id="fax_number"
          name="fax_number"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.message && !state.success && (
        <div className="p-4 rounded-xl bg-red-50/90 backdrop-blur-md border border-red-200 text-red-800 text-sm flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Unable to submit form</div>
            <p className="text-xs text-red-700 mt-0.5">{state.message}</p>
          </div>
        </div>
      )}

      {/* Row 1: Full Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="e.g. Rajesh Kumar"
            className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none transition-all ${
              state.errors?.fullName ? "border-red-500 bg-red-50/30" : ""
            }`}
          />
          {state.errors?.fullName && (
            <p className="text-xs text-red-600 mt-1">{state.errors.fullName[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
            Contact Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="+91 98XXX XXXXX"
            className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none transition-all ${
              state.errors?.phone ? "border-red-500 bg-red-50/30" : ""
            }`}
          />
          {state.errors?.phone && (
            <p className="text-xs text-red-600 mt-1">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email and Practice Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="name@example.com"
            className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none transition-all ${
              state.errors?.email ? "border-red-500 bg-red-50/30" : ""
            }`}
          />
          {state.errors?.email && (
            <p className="text-xs text-red-600 mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="practiceArea" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
            Relevant Practice Area <span className="text-red-600">*</span>
          </label>
          <select
            id="practiceArea"
            name="practiceArea"
            required
            defaultValue=""
            className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-charcoal-900 focus:outline-none transition-all ${
              state.errors?.practiceArea ? "border-red-500 bg-red-50/30" : ""
            }`}
          >
            <option value="" disabled>
              Select legal category
            </option>
            {practiceAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.title}
              </option>
            ))}
            <option value="general-consultation">General Legal Advisory & Opinion</option>
          </select>
          {state.errors?.practiceArea && (
            <p className="text-xs text-red-600 mt-1">{state.errors.practiceArea[0]}</p>
          )}
        </div>
      </div>

      {/* Preferred Timing */}
      <div>
        <label htmlFor="preferredTime" className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-1.5">
          Preferred Time for Office Call
        </label>
        <select
          id="preferredTime"
          name="preferredTime"
          defaultValue="Morning (10:30 AM – 1:00 PM)"
          className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-charcoal-900 focus:outline-none"
        >
          <option value="Morning (10:30 AM – 1:00 PM)">Morning (10:30 AM – 1:00 PM)</option>
          <option value="Afternoon (2:30 PM – 5:00 PM)">Afternoon (2:30 PM – 5:00 PM)</option>
          <option value="Evening (5:00 PM – 7:30 PM)">Evening (5:00 PM – 7:30 PM)</option>
          <option value="Anytime during chamber hours">Anytime during chamber hours</option>
        </select>
      </div>

      {/* Message / Brief Outline */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="message" className="block text-xs font-bold text-navy-950 uppercase tracking-wider">
            Brief Outline of Legal Query <span className="text-red-600">*</span>
          </label>
          <span className="text-[11px] text-charcoal-500">Do not include confidential passwords or OTPs</span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Please outline the nature of your legal question, court jurisdiction (if any), and timeline..."
          className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none transition-all ${
            state.errors?.message ? "border-red-500 bg-red-50/30" : ""
          }`}
        />
        {state.errors?.message && (
          <p className="text-xs text-red-600 mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      {/* Bar Council of India Voluntary Request Consent Checkbox */}
      <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border border-gold-500/40 shadow-xs">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="disclaimerConsent"
            name="disclaimerConsent"
            required
            className="mt-1 h-4 w-4 rounded border-charcoal-300 text-navy-900 focus:ring-gold-500"
          />
          <label htmlFor="disclaimerConsent" className="text-xs text-charcoal-800 leading-relaxed cursor-pointer font-sans">
            <strong className="text-navy-950">BCI Compliance Confirmation:</strong> I confirm that I am seeking
            preliminary information regarding chamber consultation of my own accord, without solicitation or
            inducement. I acknowledge that submitting this form does not establish an advocate-client relationship.
          </label>
        </div>
        {state.errors?.disclaimerConsent && (
          <p className="text-xs text-red-600 mt-1.5 pl-7">{state.errors.disclaimerConsent[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900/95 hover:bg-navy-800 disabled:bg-navy-950/60 text-ivory-50 text-sm font-bold tracking-wider uppercase transition-all shadow-lg shadow-navy-950/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 hover:translate-y-[-1px]"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
            <span>Validating & Recording Request...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-gold-400" />
            <span>Submit Consultation Enquiry</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-charcoal-500">
        All communications remain strictly confidential under the Indian Evidence Act.
      </p>
    </form>
  );
}
