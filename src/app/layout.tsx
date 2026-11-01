import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import { BciBanner } from "@/components/BciBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BciDisclaimerModal } from "@/components/BciDisclaimerModal";
import { JsonLd } from "@/components/JsonLd";
import { MouseSpotlight } from "@/components/animations/MouseSpotlight";
import { ScrollProgressBar } from "@/components/animations/ScrollProgressBar";
import { ScrollToTop } from "@/components/animations/ScrollToTop";

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
  publisher: siteConfig.advocate.fullName,
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
    url: `${siteConfig.seo.siteUrl}/`,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    siteName: siteConfig.seo.siteName,
    images: [
      {
        url: `${siteConfig.seo.siteUrl}${siteConfig.advocate.portraitImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.advocate.fullName} - Advocate in Bareilly, Uttar Pradesh`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [`${siteConfig.seo.siteUrl}${siteConfig.advocate.portraitImage}`],
  },
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/`,
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
      <body className="min-h-screen flex flex-col bg-ivory-100 text-charcoal-900 antialiased selection:bg-gold-500/20 selection:text-navy-950 relative overflow-x-clip">
        {/* Ambient Refraction Glows for Glassmorphism */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-500/[0.08] rounded-full blur-[140px]" />
          <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-navy-800/[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gold-400/[0.07] rounded-full blur-[160px]" />
        </div>
        <ScrollProgressBar />
        <MouseSpotlight />
        <JsonLd />
        <BciDisclaimerModal />
        <BciBanner />
        <Header />
        <main className="flex-grow relative z-10">{children}</main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
