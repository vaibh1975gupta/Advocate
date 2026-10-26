# Professional Advocate & Legal Counsel Website

A modern, elegant, lightweight, and fully responsive website built for an **Advocate in India with over 20 years of legal experience**.

Engineered with Next.js (App Router), TypeScript, Tailwind CSS, and Lucide React. Designed strictly in adherence with the **Bar Council of India (BCI) Rules** (Rule 36 regarding restrictions on legal advertising and solicitation).

---

## 🏛️ Highlights & Features

- **Bar Council of India Compliance**:
  - Strictly **no Bar enrolment numbers** published anywhere.
  - Prominent **BCI Compliance Disclaimer Modal** on first visit with persistent acknowledgment.
  - Mandatory disclaimer banner and footer declarations.
  - Excludes promotional claims, guarantees of judicial outcomes, and fake reviews/ratings.
- **Dedicated Practice Areas (No Civil Disputes)**:
  - Criminal Matters (Bail, BNSS / CrPC, Trials, Revisions)
  - Property and Land Disputes (Title scrutiny, partition, revenue matters, tenancy)
  - Family Law Matters (Mutual consent divorce, custody, maintenance)
  - Cheque Dishonour Matters (Section 138 NI Act, demand notices, prosecution & defense)
  - Documentation & Legal Advice (Sale deeds, wills, PoA, legal opinions)
- **Bilingual Legal Articles & Public Guides**:
  - Publishes informative guides in both **English** and **हिन्दी (Hindi)**.
  - Filterable by language and legal category.
  - Clean reading experience with statutory references, table of contents, and FAQs.
- **Centralized Configuration**:
  - All advocate particulars, addresses, phone numbers, and timings are stored in a single source of truth: `src/config/siteConfig.ts`.
- **Chamber Appointment Enquiry**:
  - Next.js Server Action (`submitEnquiryAction`) with server-side validation.
  - Anti-spam honeypot defense.
  - Generates verifiable inquiry reference numbers (e.g., `ADV-2025-XXXXXX`).
  - Evidence Act privilege disclosure.
- **Refined Legal Design Palette**:
  - Primary: Deep navy blue (`#10243A`)
  - Secondary: Ivory (`#F7F5F0`)
  - Accent: Muted gold (`#B99A5B`)
  - Text: Charcoal (`#242B33`)
  - Serif headings (`Playfair Display`) + Clean sans-serif body (`Plus Jakarta Sans`).
- **SEO & Performance**:
  - Dynamic OpenGraph and Twitter metadata.
  - Schema.org `LegalService` JSON-LD structured data.
  - Auto-generated `sitemap.xml` and `robots.txt`.
  - Custom 404 page with quick recovery navigation.

---

## 📁 Project Architecture

```
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── contact.ts           # Server Action for consultation inquiry validation
│   │   ├── about/
│   │   │   └── page.tsx             # Advocate biography, qualifications, philosophy
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx      # Individual article layout & statutory references
│   │   │   └── page.tsx             # Bilingual legal guides listing & filters
│   │   ├── contact/
│   │   │   └── page.tsx             # Office locations, map, timings & enquiry form
│   │   ├── disclaimer/
│   │   │   └── page.tsx             # Bar Council of India Rule 36 notice
│   │   ├── practice-areas/
│   │   │   ├── [slug]/page.tsx      # Specific practice area details
│   │   │   └── page.tsx             # 5 core practice areas
│   │   ├── privacy/
│   │   │   └── page.tsx             # Evidence Act Section 126 privilege policy
│   │   ├── terms/
│   │   │   └── page.tsx             # Informational terms of service
│   │   ├── globals.css              # Legal theme tokens & Tailwind v4 setup
│   │   ├── layout.tsx               # Root layout, fonts, header, banner & footer
│   │   ├── not-found.tsx            # Custom 404 legal error recovery
│   │   ├── page.tsx                 # Homepage with hero, experience, portfolio preview
│   │   ├── robots.ts                # Robots.txt generator
│   │   └── sitemap.ts               # Sitemap generator
│   ├── components/
│   │   ├── BciBanner.tsx            # Top Bar Council compliance banner
│   │   ├── BciDisclaimerModal.tsx   # Mandatory disclaimer consent modal
│   │   ├── BlogListingClient.tsx    # Interactive English / Hindi filter
│   │   ├── ContactForm.tsx          # Validated enquiry form with status alerts
│   │   ├── Footer.tsx               # Comprehensive footer & compliance statement
│   │   ├── Header.tsx               # Responsive navbar & mobile menu
│   │   ├── JsonLd.tsx               # Schema.org structured data
│   │   └── PracticeIcon.tsx         # Lucide icon mapper
│   ├── config/
│   │   └── siteConfig.ts            # SINGLE SOURCE OF TRUTH for advocate details
│   └── data/
│       ├── articles.ts              # Bilingual educational articles
│       └── practiceAreas.ts         # Strictly verified practice areas
```

---

## 🛠️ Step-by-Step Customization Guide

All advocate details are maintained inside:
👉 `src/config/siteConfig.ts`

### 1. Updating Name, Bio & Experience
Open `src/config/siteConfig.ts` and replace:
- `fullName`: e.g. `"Advocate Rajesh Sharma"`
- `experienceYears`: e.g. `"22+"`
- `qualifications`: update degrees and universities.

### 2. Updating Contact Information & Addresses
In `src/config/siteConfig.ts`:
- `mainPhone`: e.g. `"+91 98110 XXXXX"`
- `whatsappNumber`: e.g. `"9198110XXXXX"` (country code + number, no spaces)
- `officialEmail`: e.g. `"chambers@sharmalaw.in"`
- `officeAddress`: update building, road, city, state, PIN code.
- `googleMapsEmbedUrl`: paste your verified Google Maps Embed iframe URL.

### 3. Adding Advocate Portrait Photo
Place the advocate's professional photo at:
👉 `public/images/advocate-portrait.jpg`
(The site already has styling and alt-text wired to this path).

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Verify linting & build**:
   ```bash
   npm run lint
   npm run build
   ```

---

## ☁️ Deployment to Vercel

The project is built with standard Next.js App Router and is fully optimized for Vercel deployment:

1. Push this repository to **GitHub / GitLab / Bitbucket**.
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**.
3. Import your repository.
4. Set the Framework Preset to **Next.js**.
5. Click **Deploy**. Vercel will build and assign an SSL-secured `.vercel.app` URL immediately.

### Custom Domain Setup on Vercel:
1. In your Vercel Dashboard, go to **Settings → Domains**.
2. Enter your custom domain (e.g. `advocatechambers.in`).
3. Add the required DNS records (A Record: `76.76.21.21` or CNAME: `cname.vercel-dns.com`) at your domain registrar (GoDaddy, Namecheap, Hostinger, etc.).
4. Update `siteUrl` in `src/config/siteConfig.ts` to match your live custom domain.
