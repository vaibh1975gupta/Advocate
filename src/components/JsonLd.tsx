import React from "react";
import { siteConfig } from "@/config/siteConfig";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.advocate.fullName,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.contact.mainPhone,
    email: siteConfig.contact.officialEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.contact.officeAddress.line1}, ${siteConfig.contact.officeAddress.line2}`,
      addressLocality: siteConfig.contact.officeAddress.city,
      addressRegion: siteConfig.contact.officeAddress.state,
      postalCode: siteConfig.contact.officeAddress.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.6139", // Coordinates placeholder for central jurisdiction
      longitude: "77.2090",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:30",
        closes: "17:00",
      },
    ],
    priceRange: "Professional consultation as per advocate-client agreement",
    knowsAbout: [
      "Criminal Law",
      "Family Law",
      "Section 138 Negotiable Instruments Act",
      "Legal Documentation and Advisory",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
