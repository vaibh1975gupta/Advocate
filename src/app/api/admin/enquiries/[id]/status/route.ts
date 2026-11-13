
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import { getAdminSession } from "@/lib/adminAuth";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

const ALLOWED_STATUSES = ["New", "Contacted", "Completed"] as const;

type EnquiryStatus = (typeof ALLOWED_STATUSES)[number];

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized access." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid enquiry ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const status = body?.status;

    if (
      typeof status !== "string" ||
      !ALLOWED_STATUSES.includes(status as EnquiryStatus)
    ) {
      return NextResponse.json(
        { message: "Invalid enquiry status." },
        { status: 400 }
      );
    }

    await connectDB();

    // Update the native MongoDB collection directly.
    // This avoids any stale Mongoose model schema cache.
    const result = await Enquiry.collection.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Enquiry not found." },
        { status: 404 }
      );
    }

    // Verify that MongoDB actually saved the new status.
    const savedEnquiry = await Enquiry.collection.findOne(
      { _id: new Types.ObjectId(id) },
      { projection: { status: 1 } }
    );

    if (savedEnquiry?.status !== status) {
      throw new Error("MongoDB status verification failed.");
    }

    revalidatePath("/admin");
    revalidatePath(`/admin/enquiries/${id}`);

    return NextResponse.json({
      success: true,
      message: "Enquiry status updated successfully.",
      status: savedEnquiry.status,
    });
  } catch (error) {
    console.error("Enquiry status update error:", error);

    return NextResponse.json(
      { message: "Unable to update enquiry status." },
      { status: 500 }
    );
  }
}
