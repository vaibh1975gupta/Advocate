import { NextRequest, NextResponse } from "next/server";
import {
  validateAndSubmitEnquiry,
  ContactInput,
} from "@/lib/contactService";

export async function POST(request: NextRequest) {
  try {
    let input: ContactInput;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await request.json();
      input = {
        fullName: body.fullName || "",
        phone: body.phone || "",
        email: body.email || "",
        practiceArea: body.practiceArea || "",
        preferredTime: body.preferredTime || "Anytime",
        message: body.message || "",
        disclaimerConsent: Boolean(body.disclaimerConsent),
        botField: body.fax_number || body.botField || "",
      };
    } else {
      const formData = await request.formData();
      input = {
        fullName: formData.get("fullName")?.toString() || "",
        phone: formData.get("phone")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        practiceArea: formData.get("practiceArea")?.toString() || "",
        preferredTime: formData.get("preferredTime")?.toString() || "Anytime",
        message: formData.get("message")?.toString() || "",
        disclaimerConsent:
          formData.get("disclaimerConsent") === "on" ||
          formData.get("disclaimerConsent") === "true",
        botField: formData.get("fax_number")?.toString() || "",
      };
    }

    const result = await validateAndSubmitEnquiry(input);

    const httpStatus = result.success
      ? 200
      : result.errors
      ? 422
      : 502;

    return NextResponse.json(result, { status: httpStatus });
  } catch (error) {
    console.error(
      "[API_CONTACT_CRITICAL_ERROR]",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      {
        success: false,
        message:
          "An unexpected server error occurred while processing your request. Please contact Advocate Anil Kumar Gupta directly at +91 79837 67392 or anilgupta19755@gmail.com.",
      },
      { status: 500 }
    );
  }
}
