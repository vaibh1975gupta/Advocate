"use server";

import {
  validateAndSubmitEnquiry,
  ContactFormState,
  ContactInput,
} from "@/lib/contactService";

export type { ContactFormState, ContactInput };

export async function submitEnquiryAction(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const input: ContactInput = {
    fullName: formData.get("fullName")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    practiceArea: formData.get("practiceArea")?.toString() || "",
    preferredTime: formData.get("preferredTime")?.toString() || "Anytime",
    message: formData.get("message")?.toString() || "",
    disclaimerConsent: formData.get("disclaimerConsent") === "on",
    botField: formData.get("fax_number")?.toString() || "",
  };

  return validateAndSubmitEnquiry(input);
}
