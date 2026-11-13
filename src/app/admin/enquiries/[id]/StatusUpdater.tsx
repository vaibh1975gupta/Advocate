
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type EnquiryStatus = "New" | "Contacted" | "Completed";

interface StatusUpdaterProps {
  enquiryId: string;
  initialStatus: EnquiryStatus;
}

export default function StatusUpdater({
  enquiryId,
  initialStatus,
}: StatusUpdaterProps) {
  const [status, setStatus] = useState<EnquiryStatus>(initialStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newStatus = event.target.value as EnquiryStatus;
    const previousStatus = status;

    setStatus(newStatus);
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/enquiries/${enquiryId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Status update failed.");
      }

      setMessage("Status updated successfully.");
      router.refresh();
    } catch (error) {
      setStatus(previousStatus);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to update status."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
      <label
        htmlFor="enquiry-status"
        className="block text-sm font-semibold text-gray-800"
      >
        Update Enquiry Status
      </label>

      <select
        id="enquiry-status"
        value={status}
        onChange={handleStatusChange}
        disabled={saving}
        className="mt-3 w-full max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Completed">Completed</option>
      </select>

      {saving && (
        <p className="mt-3 text-sm text-gray-500">
          Saving status...
        </p>
      )}

      {!saving && message && (
        <p
          aria-live="polite"
          className={`mt-3 text-sm ${
            message === "Status updated successfully."
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
