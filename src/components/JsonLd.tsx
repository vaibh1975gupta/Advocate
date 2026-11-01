import React from "react";
import { siteConfig } from "@/config/siteConfig";

export function JsonLd() {
  const legalServiceId = `${siteConfig.seo.siteUrl}/#legal-service`;
  const advocatePersonId = `${siteConfig.seo.siteUrl}/#advocate`;
  const websiteId = `${siteConfig.seo.siteUrl}/#website`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LegalService", "Attorney"],
        "@id": legalServiceId,
        name: siteConfig.advocate.fullName,
        description: siteConfig.seo.defaultDescription,
        url: siteConfig.seo.siteUrl,
        telephone: siteConfig.contact.mainPhone,
        email: siteConfig.contact.officialEmail,
        image: `${siteConfig.seo.siteUrl}${siteConfig.advocate.portraitImage}`,
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
          latitude: 28.3431614,
          longitude: 79.4181326,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Bareilly, Uttar Pradesh, India",
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
          "Criminal Matters",
          "Court Marriage and Special Marriage Act",
          "Affidavits and Legal Documentation",
          "Section 138 Negotiable Instruments Act (Cheque Dishonour)",
          "Family Law and Matrimonial Proceedings",
          "Bail Jurisprudence (Regular and Anticipatory Bail)",
        ],
      },
      {
        "@type": "Person",
        "@id": advocatePersonId,
        name: siteConfig.advocate.fullName,
        jobTitle: siteConfig.advocate.formalTitle,
        worksFor: {
          "@id": legalServiceId,
        },
        image: `${siteConfig.seo.siteUrl}${siteConfig.advocate.portraitImage}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.contact.officeAddress.city,
          addressRegion: siteConfig.contact.officeAddress.state,
          addressCountry: "IN",
        },
        alumniOf: "Recognized Law Faculty / University",
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.seo.siteUrl,
        name: siteConfig.advocate.fullName,
        description: siteConfig.seo.defaultDescription,
        publisher: {
          "@id": legalServiceId,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
