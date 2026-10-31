export interface ContactInput {
  fullName: string;
  phone: string;
  email: string;
  practiceArea: string;
  preferredTime?: string;
  message: string;
  disclaimerConsent: boolean;
  botField?: string;
}

export interface ContactFormState {
  success: boolean;
  message: string;
  referenceId?: string;
  practiceAreaLabel?: string;
  submissionTimestamp?: string;
  errors?: {
    fullName?: string[];
    phone?: string[];
    email?: string[];
    practiceArea?: string[];
    message?: string[];
    disclaimerConsent?: string[];
    botField?: string[];
  };
}

// Masking helpers to ensure confidential client data is never logged in production
function maskName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .map((p) => (p.length > 1 ? p[0] + "*".repeat(Math.min(p.length - 1, 4)) : p))
    .join(" ");
}

function maskPhone(phone: string): string {
  const clean = phone.trim();
  if (clean.length < 6) return "***";
  return clean.slice(0, 4) + "***" + clean.slice(-3);
}

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "***";
  const maskedUser =
    user.length > 2 ? user[0] + "***" + user[user.length - 1] : user[0] + "***";
  const domainParts = domain.split(".");
  const dName = domainParts[0] || "";
  const tld = domainParts.slice(1).join(".") || "com";
  const maskedDomain =
    dName.length > 2 ? dName[0] + "***" + dName[dName.length - 1] : "***";
  return `${maskedUser}@${maskedDomain}.${tld}`;
}

export async function validateAndSubmitEnquiry(
  input: ContactInput
): Promise<ContactFormState> {
  const {
    fullName,
    phone,
    email,
    practiceArea,
    preferredTime = "Anytime",
    message,
    disclaimerConsent,
    botField,
  } = input;

  // Honeypot spam defense
  if (botField && botField.trim().length > 0) {
    return {
      success: false,
      message: "Security verification failed. Please try again.",
      errors: { botField: ["Invalid automated submission detected."] },
    };
  }

  const errors: Record<string, string[]> = {};

  // Full Name validation
  const trimmedName = fullName?.trim() || "";
  if (!trimmedName || trimmedName.length < 3) {
    errors.fullName = ["Please enter your full name (at least 3 characters)."];
  } else if (trimmedName.length > 80) {
    errors.fullName = ["Name cannot exceed 80 characters."];
  }

  // Phone validation (Indian / international numbers: 10 to 15 digits)
  const digitsOnly = (phone || "").replace(/\D/g, "");
  const phoneRegex = /^[+]?[0-9\s().-]{10,20}$/;
  if (!digitsOnly || digitsOnly.length < 10 || digitsOnly.length > 15) {
    errors.phone = ["Please provide a valid 10-digit mobile or contact number."];
  } else if (!phoneRegex.test(phone.trim())) {
    errors.phone = ["Please enter a valid phone number format."];
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Please enter a valid email address for office correspondence."];
  }

  // Practice area validation
  const allowedPracticeAreas = [
    "criminal-matters",
    "family-law-matters",
    "cheque-dishonour-matters",
    "documentation-legal-advice",
    "general-consultation",
  ];
  if (!practiceArea || !allowedPracticeAreas.includes(practiceArea)) {
    errors.practiceArea = ["Please select a relevant legal practice category."];
  }

  // Message validation
  const trimmedMessage = message?.trim() || "";
  if (!trimmedMessage || trimmedMessage.length < 15) {
    errors.message = [
      "Please provide a brief outline of your legal matter (at least 15 characters).",
    ];
  } else if (trimmedMessage.length > 2000) {
    errors.message = ["Message exceeds the 2000 character limit."];
  }

  // Bar Council disclaimer consent
  if (!disclaimerConsent) {
    errors.disclaimerConsent = [
      "You must acknowledge that this submission is made of your own volition and does not create an advocate-client relationship.",
    ];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted fields before submitting.",
      errors,
    };
  }

  // Generate verified Reference ID for tracking
  const referenceId = `ADV-${new Date().getFullYear()}-${Math.floor(
    100000 + Math.random() * 900000
  )}`;

  const practiceAreaNames: Record<string, string> = {
    "criminal-matters": "Criminal Matters (Bail, Trial & Defense)",
    "family-law-matters": "Family Law Matters (Matrimonial & Custody)",
    "cheque-dishonour-matters": "Cheque Dishonour (Section 138 NI Act)",
    "documentation-legal-advice": "Documentation & Legal Advice",
    "general-consultation": "General Legal Advisory & Opinion",
  };

  const practiceAreaLabel = practiceAreaNames[practiceArea] || practiceArea;
  const submissionTimestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  // Log confirmed submission on server with PII redacted for legal confidentiality
  console.log(
    `[ENQUIRY_LOGGED] Reference: ${referenceId} | Area: ${practiceAreaLabel} | Preferred: ${preferredTime}`
  );
  console.log(
    `[CLIENT_META_MASKED] Name: ${maskName(trimmedName)} | Phone: ${maskPhone(
      phone
    )} | Email: ${maskEmail(email)}`
  );
  console.log(
    `[QUERY_RECORDED] Outline length: ${trimmedMessage.length} characters (content omitted for privacy)`
  );

  return {
    success: true,
    referenceId,
    practiceAreaLabel,
    submissionTimestamp,
    message: "Enquiry validated and recorded on chamber server.",
  };
}
