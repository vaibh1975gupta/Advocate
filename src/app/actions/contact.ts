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
    "property-land-disputes",
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

  // Log confirmed submission on server
  console.log(`[ENQUIRY_RECEIVED] Reference: ${referenceId}`);
  console.log(`Client: ${fullName} | Phone: ${phone} | Email: ${email}`);
  console.log(`Area: ${practiceArea} | Preferred Time: ${preferredTime}`);
  console.log(`Summary: ${message.slice(0, 100)}...`);

  return {
    success: true,
    referenceId,
    message:
      "Your consultation request has been recorded successfully. Our chambers will review the matter and contact you at your preferred time.",
  };
}
