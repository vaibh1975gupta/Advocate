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

  // Validation
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
    `[ENQUIRY_RECEIVED] Reference: ${referenceId} | Area: ${practiceAreaLabel} | Preferred: ${preferredTime}`
  );
  console.log(
    `[CLIENT_META_MASKED] Name: ${maskName(trimmedName)} | Phone: ${maskPhone(
      phone
    )} | Email: ${maskEmail(email)}`
  );
  console.log(
    `[QUERY_RECORDED] Outline length: ${trimmedMessage.length} characters (content omitted for privacy)`
  );

  // Server-side dispatch to FormSubmit
  try {
    const emailPayload = {
      _subject: `New Legal Enquiry [Ref: ${referenceId}] - ${trimmedName}`,
      _replyto: email,
      _template: "table",
      "Reference ID": referenceId,
      "Client Name": trimmedName,
      "Contact Number": phone,
      "Client Email": email,
      "Practice Area": practiceAreaLabel,
      "Preferred Time to Call": preferredTime,
      "Legal Query Outline": trimmedMessage,
      "Submission Time (IST)": submissionTimestamp,
    };

    const res = await fetch(
      "https://formsubmit.co/ajax/anilgupta19755@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://www.advocateanilkumargupta.in/contact",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        },
        body: JSON.stringify(emailPayload),
      }
    );

    const responseText = await res.text();
    let providerData: { success?: string | boolean; message?: string } | null = null;
    try {
      providerData = JSON.parse(responseText);
    } catch {
      providerData = null;
    }

    console.log(`[FORMSUBMIT_RESPONSE]`, {
      status: res.status,
      statusText: res.statusText,
      providerSuccess: providerData?.success ?? "non-json",
      providerMessage: providerData?.message ?? responseText.slice(0, 100),
    });

    // Check if provider requires initial email activation
    const providerMessage = providerData?.message || "";
    const needsActivation = /activate/i.test(providerMessage);
    if (needsActivation) {
      console.warn(
        `[FORMSUBMIT_ACTIVATION_REQUIRED] FormSubmit requires initial activation for anilgupta19755@gmail.com.`
      );
      return {
        success: false,
        referenceId,
        message: `Your inquiry Reference ID is ${referenceId}. Our automated email routing is currently awaiting one-time chamber activation. Please contact Advocate Anil Kumar Gupta directly at +91 79837 67392 or anilgupta19755@gmail.com.`,
      };
    }

    // Verify both HTTP OK and provider application-level confirmation
    const isProviderSuccess =
      res.ok && String(providerData?.success).toLowerCase() === "true";

    if (!isProviderSuccess) {
      return {
        success: false,
        referenceId,
        message: `We were unable to confirm delivery of your inquiry to the chamber inbox at this moment (Ref: ${referenceId}). Please reach out directly by telephone at +91 79837 67392 or email anilgupta19755@gmail.com.`,
      };
    }

    // Provider confirmed successful acceptance
    return {
      success: true,
      referenceId,
      message:
        "Your consultation request has been recorded and confirmed by our email service. Advocate Anil Kumar Gupta's chambers will review your matter and contact you at your preferred time.",
    };
  } catch (err) {
    console.error(`[FORMSUBMIT_FETCH_ERROR]`, {
      error: err instanceof Error ? err.message : "Unknown network error",
      referenceId,
    });

    return {
      success: false,
      referenceId,
      message: `A network connection error prevented email delivery (Ref: ${referenceId}). Please call our chambers directly at +91 79837 67392 or email anilgupta19755@gmail.com.`,
    };
  }
}
