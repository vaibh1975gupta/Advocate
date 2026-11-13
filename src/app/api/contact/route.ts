
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

import {
  validateAndSubmitEnquiry,
  ContactInput,
} from "@/lib/contactService";



export async function POST(request: NextRequest) {
  try {
    let input: ContactInput;

    const contentType = request.headers.get("content-type") || "";

    // Extract request data
    if (contentType.includes("application/json")) {
      const body = await request.json();

      input = {
        fullName: body.fullName || "",
        phone: body.phone || "",
        email: body.email || "",
        practiceArea: body.practiceArea || "",
        preferredTime: body.preferredTime || "Anytime",
        message: body.message || "",
        disclaimerConsent:
          body.disclaimerConsent === true ||
          body.disclaimerConsent === "true" ||
          body.disclaimerConsent === "on",
        botField: body.fax_number || body.botField || "",
      };
    } else {
      const formData = await request.formData();

      input = {
        fullName: formData.get("fullName")?.toString() || "",
        phone: formData.get("phone")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        practiceArea: formData.get("practiceArea")?.toString() || "",
        preferredTime:
          formData.get("preferredTime")?.toString() || "Anytime",
        message: formData.get("message")?.toString() || "",
        disclaimerConsent:
          formData.get("disclaimerConsent") === "on" ||
          formData.get("disclaimerConsent") === "true",
        botField: formData.get("fax_number")?.toString() || "",
      };
    }

    // Validate enquiry
    const result = await validateAndSubmitEnquiry(input);

    if (!result.success) {
      return NextResponse.json(result, { status: 422 });
    }

    if (!result.referenceId) {
      throw new Error("Enquiry reference ID missing");
    }

    // Connect to MongoDB
    await connectDB();

    // Save enquiry in MongoDB
    await Enquiry.create({
      referenceId: result.referenceId,
      fullName: input.fullName.trim(),
      phone: input.phone,
      email: input.email,
      practiceArea: input.practiceArea,
      preferredTime: input.preferredTime || "Anytime",
      message: input.message.trim(),
      disclaimerConsent: input.disclaimerConsent,
    });

    // Return success response
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error(
      "[API_CONTACT_ERROR]",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your enquiry right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}
