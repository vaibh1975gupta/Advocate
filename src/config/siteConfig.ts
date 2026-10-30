/**
 * Central Configuration for Advocate Practice Website
 * 
 * Verified Details for Advocate Anil Kumar Gupta
 * 
 * IMPORTANT: In strict compliance with Bar Council of India (BCI) rules,
 * Bar enrolment numbers and promotional solicitations are excluded.
 */

export const siteConfig = {
  // Practice & Advocate Identity
  advocate: {
    fullName: "Advocate Anil Kumar Gupta",
    formalTitle: "Advocate & Legal Consultant",
    courtDesignation: "District & Sessions Court",
    experienceYears: "25+",
    experienceStatement:
      "Over 25 years of dedicated courtroom advocacy, counsel, and representation in the District & Sessions Court.",
    shortBio:
      "Advocate Anil Kumar Gupta brings over 25 years of courtroom experience and legal counsel, specializing in Criminal Matters, Family Law, Section 138 Negotiable Instruments (Cheque Dishonour), and Legal Documentation. His practice is characterized by rigorous procedural compliance, candid merits assessment, and strict professional confidentiality.",
    languages: ["English", "Hindi"],
    portraitImage: "/images/advocate-portrait.jpg",
    portraitAlt: "Portrait of Advocate Anil Kumar Gupta in advocate chamber robes",
    qualifications: [
      {
        degree: "LL.B. (Bachelor of Laws)",
        institution: "Recognized Law Faculty / University",
        year: "25+ Years of Dedicated Legal Practice",
      },
    ],
    courtJurisdictions: [
      "District & Sessions Court",
      "Chief Judicial Magistrate (CJM) & Judicial Magistrate Courts",
      "Special Criminal & Sessions Courts",
      "Revenue Courts & Sub-Divisional Magistrates",
    ],
    coreValues: [
      {
        title: "Absolute Confidentiality",
        description:
          "Strict professional privilege under Section 126 of the Indian Evidence Act, ensuring complete client privacy and discretion.",
      },
      {
        title: "Rigorous Evidentiary Diligence",
        description:
          "Meticulous case research, document examination, and thorough procedural preparation grounded in 25 years of practical courtroom insight.",
      },
      {
        title: "Candid & Realistic Assessment",
        description:
          "Honest, realistic appraisal of legal merits without misleading assurances or unwarranted litigation.",
      },
      {
        title: "Ethical Practice",
        description:
          "Uncompromising adherence to professional ethics and the Standards of Professional Conduct laid down by the Bar Council of India.",
      },
    ],
  },

  // Chamber & Office Contact Information
  contact: {
    mainPhone: "+91 79837 67392",
    displayPhone: "+91 79837 67392",
    secondaryPhone: "+91 79837 67392",
    whatsappNumber: "917983767392",
    officialEmail: "anilgupta19755@gmail.com",
    consultationEmail: "anilgupta19755@gmail.com",

    // Physical Office Address
    officeAddress: {
      title: "Chambers & Main Office",
      line1: "Near SSP Office",
      line2: "District & Sessions Court Area",
      city: "Chamber Complex",
      state: "India",
      pincode: "",
      country: "India",
    },
    chambersAddress: {
      title: "Court Chambers",
      line1: "Near SSP Office",
      line2: "District & Sessions Court Complex",
      city: "Chamber Complex",
      state: "India",
      pincode: "",
      country: "India",
    },

    // Office Timings
    hours: [
      { days: "Monday – Friday", timing: "10:00 AM – 7:30 PM" },
      { days: "Saturday", timing: "10:30 AM – 5:00 PM" },
      { days: "Sunday", timing: "By Prior Appointment Only" },
    ],

    // Google Maps Navigation link
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.79978716303!2d77.10249019999999!3d28.6324294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b0000001%3A0x1d4d84a7e93945a5!2sDistrict%20and%20Sessions%20Court!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Near+SSP+Office+District+and+Sessions+Court",
  },

  // Bar Council Compliance & Disclaimer Notice
  disclaimer: {
    noticeHeading: "Bar Council of India Compliance & Legal Disclaimer",
    modalNotice:
      "As per the rules of the Bar Council of India, advocates are strictly prohibited from soliciting work or advertising their legal services in any form. By accessing this website, the visitor acknowledges and confirms that they are seeking general information regarding Advocate Anil Kumar Gupta's legal practice of their own volition and that there has been no solicitation, invitation, or inducement of any sort.",
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
    siteName: "Advocate Anil Kumar Gupta | District & Sessions Court",
    siteUrl: "https://advocateanilkumar.in",
    defaultTitle: "Advocate Anil Kumar Gupta | District & Sessions Court (25+ Years Experience)",
    defaultDescription:
      "Official professional website of Advocate Anil Kumar Gupta with over 25 years of legal experience in the District & Sessions Court. Practice areas: Criminal Law, Family Matters, NI Act Cheque Dishonour, and Legal Documentation.",
    keywords: [
      "Advocate Anil Kumar Gupta",
      "District and Sessions Court Advocate",
      "Criminal Lawyer near SSP Office",
      "Section 138 NI Act Cheque Bounce Lawyer",
      "Family Court Advocate",
      "Legal Documentation Advocate",
      "25 Years Experience Advocate",
    ],
  },
};
