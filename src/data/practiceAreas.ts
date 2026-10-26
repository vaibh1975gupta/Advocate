export interface PracticeArea {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  iconName: "ShieldAlert" | "Building2" | "Users" | "ReceiptText" | "FileText";
  keyStatutes: string[];
  scopeOfWork: string[];
  procedureOverview: string;
  importantNote: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    id: "criminal-matters",
    slug: "criminal-matters",
    title: "Criminal Matters",
    shortDescription:
      "Comprehensive representation and defense across investigation, bail, trial, and revision stages in criminal jurisprudence.",
    iconName: "ShieldAlert",
    keyStatutes: [
      "Bharatiya Nagarik Suraksha Sanhita, 2023 / Code of Criminal Procedure, 1973",
      "Bharatiya Nyaya Sanhita, 2023 / Indian Penal Code, 1860",
      "Bharatiya Sakshya Adhiniyam, 2023 / Indian Evidence Act, 1872",
      "Prevention of Corruption Act & Special Criminal Statutes",
    ],
    scopeOfWork: [
      "Regular Bail applications before Judicial Magistrates and Sessions Courts",
      "Anticipatory Bail petitions before Sessions Courts and the High Court",
      "Quashing petitions (under Section 482 CrPC / Section 528 BNSS) before the High Court",
      "Representation in criminal trials, cross-examination, and defense strategy",
      "Criminal appeals, revisions, and suspension of sentences",
      "Handling matters related to economic offenses and statutory offenses",
      "Pre-trial counseling during police inquiry and summon stages",
    ],
    procedureOverview:
      "Criminal procedure in India requires strict adherence to constitutional safeguards, statutory timelines, and evidentiary standards. From initial police station representation to regular trials and appellate remedies, every step is handled with rigorous procedural compliance and evidentiary scrutiny.",
    importantNote:
      "All representation is subject to legal merits and statutory provisions. Indian legal ethics strictly prohibit guarantees of bail, acquittal, or specific judicial outcomes.",
  },
  {
    id: "property-land-disputes",
    slug: "property-land-disputes",
    title: "Property & Land Disputes",
    shortDescription:
      "Legal counsel and litigation regarding immovable property, title verification, partition, tenancy, and revenue disputes.",
    iconName: "Building2",
    keyStatutes: [
      "Transfer of Property Act, 1882",
      "Specific Relief Act, 1963",
      "Registration Act, 1908 & Indian Stamp Act",
      "State Land Revenue Codes & Tenancy Acts",
      "Real Estate (Regulation and Development) Act (RERA)",
    ],
    scopeOfWork: [
      "Partition suits among co-owners and legal heirs",
      "Injunction petitions to restrain unlawful interference or alienation",
      "Declaration of title and recovery of possession proceedings",
      "Revenue court litigation before Tehsildars, SDMs, and Revenue Boards",
      "Tenancy and lease dispute litigation, eviction petitions",
      "Title verification, encumbrance scrutiny, and legal search reports",
      "Matters concerning agricultural land ceiling and mutation corrections",
    ],
    procedureOverview:
      "Immovable property disputes demand thorough investigation of revenue records (Jamabandi, Khasra, Khatoni), registered instruments, chain of title, and boundary identification. We emphasize pre-litigation documentation review to determine the lawful standing and remedies available under property and revenue laws.",
    importantNote:
      "Property litigation depends heavily on authentic documentary evidence and revenue records. General civil litigation outside specific land/property titles is excluded from this practice scope.",
  },
  {
    id: "family-law-matters",
    slug: "family-law-matters",
    title: "Family Law Matters",
    shortDescription:
      "Empathetic, dignified, and confidential legal guidance in matrimonial, custody, guardianship, and maintenance proceedings.",
    iconName: "Users",
    keyStatutes: [
      "Hindu Marriage Act, 1955 & Special Marriage Act, 1954",
      "Protection of Women from Domestic Violence Act, 2005",
      "Section 125 CrPC / Section 144 BNSS (Maintenance Provisions)",
      "Guardians and Wards Act, 1890 & Hindu Minority and Guardianship Act, 1956",
      "Family Courts Act, 1984",
    ],
    scopeOfWork: [
      "Mutual Consent Divorce petitions (First and Second Motion drafting)",
      "Contested matrimonial proceedings and counseling",
      "Child custody and visitation rights applications",
      "Interim and permanent maintenance petitions for spouse and dependent children",
      "Representation in Domestic Violence Act proceedings before Magistrates",
      "Restitution of Conjugal Rights and judicial separation matters",
      "Family settlement agreements and out-of-court reconciliation assistance",
    ],
    procedureOverview:
      "Family disputes involve delicate personal dynamics requiring both legal precision and ethical sensitivity. Prioritizing amicable dispute resolution and statutory mediation wherever feasible, proceedings in Family Courts are handled with confidentiality and commitment to protecting vulnerable family members.",
    importantNote:
      "Family court proceedings encourage reconciliation and settlement. Every matter is guided with discretion, avoiding acrimony and preserving the dignity of all parties involved.",
  },
  {
    id: "cheque-dishonour-matters",
    slug: "cheque-dishonour-matters",
    title: "Cheque Dishonour Matters",
    shortDescription:
      "Specialized representation under Section 138 of the Negotiable Instruments Act for statutory notices, defense, and prosecution.",
    iconName: "ReceiptText",
    keyStatutes: [
      "Negotiable Instruments Act, 1881 (Sections 138 to 148)",
      "Code of Criminal Procedure / Bharatiya Nagarik Suraksha Sanhita",
      "Indian Evidence Act / Bharatiya Sakshya Adhiniyam",
      "Bankers' Books Evidence Act, 1891",
    ],
    scopeOfWork: [
      "Drafting and issuance of statutory demand notices within the 30-day window",
      "Filing and prosecuting criminal complaints under Section 138 NI Act",
      "Strategic defense representation against cheque dishonour allegations",
      "Drafting formal replies to statutory legal notices",
      "Handling interim compensation applications under Section 143A NI Act",
      "Compounding of offenses and negotiated settlements before Lok Adalats",
      "Appeals against conviction and deposit requirement applications under Section 148",
    ],
    procedureOverview:
      "Section 138 proceedings are subject to strict limitation periods: notice within 30 days of the dishonour memo, 15 days cure period, and complaint filing within 30 days thereafter. Meticulous adherence to these statutory windows and rigorous examination of debt enforceability are critical to either prosecution or defense.",
    importantNote:
      "Strict statutory limitation applies to all cheque dishonour matters. Delayed notices or missed filing deadlines can severely prejudice the cause of action.",
  },
  {
    id: "documentation-legal-advice",
    slug: "documentation-legal-advice",
    title: "Documentation & Legal Advice",
    shortDescription:
      "Meticulous drafting of contracts, legal instruments, family settlements, and comprehensive advisory opinions.",
    iconName: "FileText",
    keyStatutes: [
      "Indian Contract Act, 1872",
      "Registration Act, 1908",
      "Indian Stamp Act, 1899 & State Stamp Rules",
      "Power of Attorney Act, 1882",
      "Indian Succession Act, 1925",
    ],
    scopeOfWork: [
      "Drafting Sale Deeds, Agreement to Sell, Gift Deeds, and Relinquishment Deeds",
      "Drafting Commercial and Residential Lease and Tenancy Agreements",
      "Drafting Testamentary Instruments (Wills, Codicils) and Succession Planning",
      "Preparation of General and Special Power of Attorney documents",
      "Family Settlement Deeds and Memorandum of Understanding (MoU)",
      "Vetting of commercial agreements, indemnity bonds, and affidavits",
      "Issuance of formal Written Legal Opinions on statutory compliance and risks",
    ],
    procedureOverview:
      "Preventive lawyering begins with accurate drafting. A carefully structured agreement eliminates ambiguities, safeguards title, ensures correct stamp duty valuation, and prevents future litigation. Every instrument is tailored to the specific factual matrix and legal requirements.",
    importantNote:
      "All documentation is drafted strictly in accordance with local stamp and registration laws. Proper registration and stamp duty payment are essential for evidentiary admissibility.",
  },
];
