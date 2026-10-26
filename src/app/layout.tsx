import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import { BciBanner } from "@/components/BciBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BciDisclaimerModal } from "@/components/BciDisclaimerModal";
import { JsonLd } from "@/components/JsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#10243A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s | ${siteConfig.advocate.fullName}`,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.advocate.fullName }],
  creator: siteConfig.advocate.fullName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.seo.siteUrl,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    siteName: siteConfig.seo.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-ivory-100 text-charcoal-900 antialiased selection:bg-gold-500/20 selection:text-navy-950">
        <JsonLd />
        <BciDisclaimerModal />
        <BciBanner />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
