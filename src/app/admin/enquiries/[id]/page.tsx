
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Types } from "mongoose";

import StatusUpdater from "./StatusUpdater";
import { getAdminSession } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EnquiryDetailsPage({
  params,
}: PageProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectDB();

  const enquiry = await Enquiry.findById(id).lean();

  if (!enquiry) {
    notFound();
  }

  const status = enquiry.status || "New";

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">

        {/* Back to Dashboard */}
        <Link
          href="/admin"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

          {/* Enquiry Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-gray-500">
                Enquiry Details
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                {enquiry.fullName}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Reference: {enquiry.referenceId}
              </p>
            </div>

            {/* Current Status */}
            <span
              className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
                status === "New"
                  ? "bg-blue-100 text-blue-700"
                  : status === "Contacted"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="my-7 border-t border-gray-200" />

          {/* Enquiry Information */}
          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.fullName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <a
                href={`tel:${enquiry.phone}`}
                className="mt-1 block font-medium text-blue-700 hover:underline"
              >
                {enquiry.phone}
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <a
                href={`mailto:${enquiry.email}`}
                className="mt-1 block break-all font-medium text-blue-700 hover:underline"
              >
                {enquiry.email}
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-500">Practice Area</p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.practiceArea}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Preferred Contact Time
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.preferredTime || "Anytime"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Disclaimer Consent
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.disclaimerConsent
                  ? "Accepted"
                  : "Not accepted"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Submission Date
              </p>
              <p className="mt-1 font-medium text-gray-900">
                {enquiry.createdAt
                  ? new Date(enquiry.createdAt).toLocaleString(
                      "en-IN",
                      { timeZone: "Asia/Kolkata" }
                    )
                  : "Not available"}
              </p>
            </div>

          </div>

          <div className="my-7 border-t border-gray-200" />

          {/* Enquiry Message */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Enquiry Message
            </h2>

            <div className="mt-3 whitespace-pre-wrap rounded-lg bg-gray-50 p-5 text-sm leading-7 text-gray-700">
              {enquiry.message}
            </div>
          </div>

          {/* Update Status */}
          <StatusUpdater
            enquiryId={enquiry._id.toString()}
            initialStatus={status}
          />

          {/* Back to Enquiries */}
          <div className="mt-8">
            <Link
              href="/admin"
              className="inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Back to Enquiries
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
