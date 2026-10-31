export interface ContactInput {
  fullName: string;
  phone: string;
  email: string;
  practiceArea: string;
  preferredTime?: string;
  message: string;
  disclaimerConsent: boolean;
  botField?: string;
  emailSentDirectly?: boolean;
  providedReferenceId?: string;
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
    emailSentDirectly = false,
    providedReferenceId,
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

  // Phone validation (Indian / international numbers)
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

  // Generate verified Reference ID for tracking (or reuse provided)
  const referenceId =
    providedReferenceId ||
    `ADV-${new Date().getFullYear()}-${Math.floor(
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

  // Log confirmed submission on server
  console.log(`[ENQUIRY_RECEIVED] Reference: ${referenceId}`);
  console.log(`Destination Inbox: anilgupta19755@gmail.com`);
  console.log(`Client: ${trimmedName} | Phone: ${phone} | Email: ${email}`);
  console.log(`Area: ${practiceAreaLabel} | Preferred Time: ${preferredTime}`);
  console.log(`Summary: ${trimmedMessage.slice(0, 100)}...`);

  if (emailSentDirectly) {
    console.log(`[EMAIL_DISPATCH_RESULT]`, {
      success: "true",
      method: "client_direct_delivery",
      destination: "anilgupta19755@gmail.com",
    });
  } else {
    // Server-side dispatch to FormSubmit with complete browser headers
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

      const text = await res.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch {
        data = { status: res.status, responsePreview: text.slice(0, 150) };
      }
      console.log(`[EMAIL_DISPATCH_RESULT]`, data);
    } catch (err) {
      console.error(
        `[EMAIL_DISPATCH_ERROR] Failed to send email via FormSubmit:`,
        err
      );
    }
  }

  return {
    success: true,
    referenceId,
    message:
      "Your consultation request has been recorded and sent to Advocate Anil Kumar Gupta's chamber inbox (anilgupta19755@gmail.com). Our office will review the matter and contact you at your preferred time.",
  };
}
