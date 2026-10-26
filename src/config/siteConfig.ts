/**
 * Central Configuration for Advocate Practice Website
 * 
 * Update this file to customize the advocate's details, contact information,
 * office addresses, and practice parameters. All components and pages read
 * directly from this configuration.
 * 
 * IMPORTANT: In compliance with Bar Council of India (BCI) rules,
 * Bar enrolment numbers and subjective promotional claims are strictly excluded.
 */

export const siteConfig = {
  // Practice & Advocate Identity
  advocate: {
    fullName: "Advocate [Full Name]", // Replace with actual verified full name (e.g., "Advocate R. K. Sharma")
    formalTitle: "Advocate & Legal Consultant",
    experienceYears: "20+",
    experienceStatement: "Over two decades of dedicated legal practice, counsel, and representation in Indian courts.",
    shortBio:
      "A seasoned advocate with more than 20 years of courtroom and advisory experience, providing principled, confidential, and rigorous legal counsel across Criminal Law, Land & Property Disputes, Family Matters, Negotiable Instruments (Cheque Dishonour), and Comprehensive Legal Documentation.",
    languages: ["English", "Hindi", "Regional Language / Urdu / Punjabi (As applicable)"],
    portraitImage: "/images/advocate-portrait.jpg", // Drop photo into public/images/advocate-portrait.jpg
    portraitAlt: "Portrait of Advocate [Full Name]",
    qualifications: [
      { degree: "LL.B. (Bachelor of Laws)", institution: "[University Name / Faculty of Law]", year: "Verified Practice" },
      { degree: "LL.M. / M.A. / B.Com / B.A.", institution: "[University Name]", year: "Academic Foundation" },
    ],
    courtJurisdictions: [
      "High Court of Judicature",
      "District & Sessions Courts",
      "Debt Recovery & Appellate Tribunals",
      "Revenue Courts & Sub-Divisional Magistrates",
    ],
    coreValues: [
      {
        title: "Absolute Confidentiality",
        description: "Strict professional privilege under the Indian Evidence Act, ensuring complete client privacy and discretion.",
      },
      {
        title: "Rigorous Legal Diligence",
        description: "Meticulous case research, evidentiary analysis, and thorough drafting grounded in sound jurisprudence.",
      },
      {
        title: "Candid & Realistic Assessment",
        description: "Honest, realistic appraisal of legal merits without misleading assurances or unwarranted litigation.",
      },
      {
        title: "Ethical Practice",
        description: "Uncompromising adherence to legal ethics and the Standards of Professional Conduct laid down by the Bar Council of India.",
      },
    ],
  },

  // Chamber & Office Contact Information
  contact: {
    mainPhone: "+91 98XXX XXXXX", // Replace with official verified chamber phone
    displayPhone: "+91 98XXX XXXXX",
    secondaryPhone: "+91 11 XXXX XXXX", // Landline / Chamber extension
    whatsappNumber: "+9198XXXXXXXX", // Format with country code without spaces or symbols for wa.me link
    officialEmail: "chambers@advocateoffice.in", // Replace with actual verified domain/email
    consultationEmail: "consultations@advocateoffice.in",
    
    // Physical Office & Chamber Addresses
    chambersAddress: {
      title: "Court Chambers",
      line1: "Chamber No. [Chamber Number], Lawyers' Chambers Block",
      line2: "[District / High Court Complex Name]",
      city: "[City Name]",
      state: "[State Name]",
      pincode: "[PIN Code]",
      country: "India",
    },
    officeAddress: {
      title: "Main Office & Consultation Chambers",
      line1: "[Office / House / Suite Number], [Building / Commercial Plaza Name]",
      line2: "[Road / Sector / Landmark Area]",
      city: "[City Name]",
      state: "[State Name]",
      pincode: "[PIN Code]",
      country: "India",
    },

    // Office Timings
    hours: [
      { days: "Monday – Friday", timing: "10:00 AM – 7:30 PM" },
      { days: "Saturday", timing: "10:30 AM – 5:00 PM" },
      { days: "Sunday", timing: "Closed (By Prior Appointment Only)" },
    ],

    // Google Maps Embed & Navigation link (Replace with verified Google Maps Place Link)
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.79978716303!2d77.10249019999999!3d28.6324294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b0000001%3A0x1d4d84a7e93945a5!2sSupreme%20Court%20of%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Advocate+Chambers",
  },

  // Bar Council Compliance & Disclaimer Notice
  disclaimer: {
    noticeHeading: "Bar Council of India Compliance & Legal Disclaimer",
    modalNotice:
      "As per the rules of the Bar Council of India, advocates are strictly prohibited from soliciting work or advertising their legal services in any form. By accessing this website, the visitor acknowledges and confirms that they are seeking general information regarding the advocate's legal practice of their own volition and that there has been no solicitation, invitation, or inducement of any sort by the advocate or their office.",
    shortNotice:
      "This website is designed solely for informational and educational purposes in accordance with the Bar Council of India rules. It does not constitute legal advice, solicitation, or advertisement. Visiting this site or transmitting inquiries does not create an advocate-client relationship.",
    detailedPoints: [
      "No advertisement or solicitation: This website does not seek to solicit work, advertise services, or create any commercial inducement.",
      "Informational purpose only: The contents and legal articles herein provide general educational information on Indian legal procedures and rights.",
      "Not legal advice: Content should not be construed as a formal legal opinion. Professional counsel should be sought for specific legal issues.",
      "No advocate-client privilege created: Merely viewing this website or submitting a general inquiry form does not establish an advocate-client relationship.",
    ],
  },

  // SEO & Metadata Configuration
  seo: {
    siteName: "Advocate [Full Name] | Legal Counsel & Advocate",
    siteUrl: "https://advocateexample.in", // Configure for production domain
    defaultTitle: "Advocate [Full Name] | Experienced Legal Counsel (20+ Years Practice)",
    defaultDescription:
      "Official professional website of Advocate [Full Name] with over 20 years of legal experience in Indian courts. Areas of practice: Criminal Law, Land & Property Disputes, Family Matters, NI Act Cheque Dishonour, and Legal Documentation.",
    keywords: [
      "Advocate in India",
      "Criminal Defense Lawyer India",
      "Property Dispute Advocate",
      "Land Dispute Lawyer",
      "Section 138 NI Act Cheque Bounce Advocate",
      "Family Law Matters Advocate",
      "Legal Documentation Lawyer India",
      "20 Years Legal Experience Advocate",
    ],
  },
};
