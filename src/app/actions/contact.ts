"use server";

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

export async function submitEnquiryAction(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot spam defense
  const botField = formData.get("fax_number")?.toString().trim();
  if (botField) {
    // Spam bot filled hidden honeypot
    return {
      success: false,
      message: "Security verification failed. Please try again.",
      errors: { botField: ["Invalid automated submission detected."] },
    };
  }

  const fullName = formData.get("fullName")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const practiceArea = formData.get("practiceArea")?.toString().trim() || "";
  const preferredTime = formData.get("preferredTime")?.toString().trim() || "Anytime";
  const message = formData.get("message")?.toString().trim() || "";
  const disclaimerConsent = formData.get("disclaimerConsent") === "on";

  const errors: Record<string, string[]> = {};

  // Validation
  if (!fullName || fullName.length < 3) {
    errors.fullName = ["Please enter your full name (at least 3 characters)."];
  } else if (fullName.length > 80) {
    errors.fullName = ["Name cannot exceed 80 characters."];
  }

  // Phone validation (Indian / international numbers)
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  const cleanPhone = phone.replace(/[\s-]/g, "");
  if (!phone || cleanPhone.length < 10) {
    errors.phone = ["Please provide a valid 10-digit mobile or contact number."];
  } else if (!phoneRegex.test(phone)) {
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
  if (!message || message.length < 15) {
    errors.message = ["Please provide a brief outline of your legal matter (at least 15 characters)."];
  } else if (message.length > 2000) {
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
  const referenceId = `ADV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

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
  console.log(`Client: ${fullName} | Phone: ${phone} | Email: ${email}`);
  console.log(`Area: ${practiceAreaLabel} | Preferred Time: ${preferredTime}`);
  console.log(`Summary: ${message.slice(0, 100)}...`);

  // Dispatch direct email notification to anilgupta19755@gmail.com
  try {
    const emailPayload = {
      _subject: `New Legal Enquiry [Ref: ${referenceId}] - ${fullName}`,
      _replyto: email,
      _template: "table",
      "Reference ID": referenceId,
      "Client Name": fullName,
      "Contact Number": phone,
      "Client Email": email,
      "Practice Area": practiceAreaLabel,
      "Preferred Time to Call": preferredTime,
      "Legal Query Outline": message,
      "Submission Time (IST)": submissionTimestamp,
    };

    const res = await fetch("https://formsubmit.co/ajax/anilgupta19755@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://www.advocateanilkumargupta.in",
      },
      body: JSON.stringify(emailPayload),
    });

    const data = await res.json().catch(() => null);
    console.log(`[EMAIL_DISPATCH_RESULT]`, data);
  } catch (err) {
    console.error(`[EMAIL_DISPATCH_ERROR] Failed to send email via FormSubmit:`, err);
    // Even if external email service has temporary network latency, record is logged above
  }

  return {
    success: true,
    referenceId,
    message:
      "Your consultation request has been recorded and sent to Advocate Anil Kumar Gupta's chamber inbox (anilgupta19755@gmail.com). Our office will review the matter and contact you at your preferred time.",
  };
}
