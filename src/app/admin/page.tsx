
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export const instant = false;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  await connectDB();

  // Fetch latest enquiries and calculate status counts from MongoDB.
  const [enquiryRecords, statusCounts] = await Promise.all([
    Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(),

    Enquiry.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$status", "New"] },
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const totalEnquiries = statusCounts.reduce(
    (total, item) => total + item.count,
    0
  );

  const getCount = (status: string) =>
    statusCounts.find((item) => item._id === status)?.count || 0;

  const newEnquiries = getCount("New");
  const contactedEnquiries = getCount("Contacted");
  const completedEnquiries = getCount("Completed");

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Advocate Anil Kumar Gupta
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome, {session.email}
            </p>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Logout
            </button>
          </form>
        </div>

        {/* Dashboard Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Enquiries</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {totalEnquiries}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              All submitted enquiries
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">New Enquiries</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {newEnquiries}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Awaiting your response
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Admin Account</p>
            <p className="mt-3 break-all text-lg font-semibold text-gray-900">
              {session.email}
            </p>
            <p className="mt-2 text-xs text-green-600">
              Authenticated session
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Contacted Enquiries</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {contactedEnquiries}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Enquiries already contacted
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Completed Enquiries</p>
            <p className="mt-3 text-3xl font-bold text-gray-900">
              {completedEnquiries}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Completed enquiries
            </p>
          </div>
        </div>

        {/* Enquiry Management */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Enquiry Management
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Latest website enquiries from MongoDB.
            </p>
          </div>

          {enquiryRecords.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="font-medium text-gray-700">
                No enquiries found.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                New website enquiries will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="border-b bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Reference ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Practice Area</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {enquiryRecords.map((enquiry) => {
                    const status = enquiry.status || "New";

                    return (
                      <tr
                        key={enquiry._id.toString()}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 font-medium text-gray-900">
                          {enquiry.referenceId}
                        </td>

                        <td className="px-4 py-4 text-gray-700">
                          {enquiry.fullName}
                        </td>

                        <td className="px-4 py-4 text-gray-700">
                          {enquiry.phone}
                        </td>

                        <td className="px-4 py-4 text-gray-700">
                          {enquiry.practiceArea}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              status === "New"
                                ? "bg-blue-100 text-blue-700"
                                : status === "Contacted"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-gray-500">
                          {enquiry.createdAt
                            ? new Date(enquiry.createdAt).toLocaleDateString(
                                "en-IN",
                                { timeZone: "Asia/Kolkata" }
                              )
                            : "N/A"}
                        </td>

                        <td className="px-4 py-4">
                          <Link
                            href={`/admin/enquiries/${enquiry._id.toString()}`}
                            className="whitespace-nowrap font-medium text-blue-700 hover:underline"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 text-xs text-gray-400">
            Showing the latest 50 enquiries.
          </p>
        </div>
      </div>
    </main>
  );
}
