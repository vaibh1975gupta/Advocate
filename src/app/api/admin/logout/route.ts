
import { NextResponse } from "next/server";
import { deleteAdminSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    await deleteAdminSession();

    return NextResponse.redirect(
      new URL("/admin/login?loggedOut=1", request.url),
      { status: 303 }
    );
  } catch (error) {
    console.error("Admin logout error:", error);

    return NextResponse.redirect(
      new URL("/admin/login?logoutError=1", request.url),
      { status: 303 }
    );
  }
}
