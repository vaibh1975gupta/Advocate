
import {
  verifyAdminCredentials,
  createAdminSession,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return Response.json(
        { success: false, message: "Invalid request format." },
        { status: 415 }
      );
    }

    const body = await request.json();

    const email =
      typeof body.email === "string" ? body.email.trim() : "";

    const password =
      typeof body.password === "string" ? body.password : "";

    if (
      !email ||
      !password ||
      email.length > 254 ||
      password.length > 128
    ) {
      return Response.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 }
      );
    }

    const isValid = await verifyAdminCredentials(email, password);

    if (!isValid) {
      return Response.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    await createAdminSession(email);

    return Response.json(
      {
        success: true,
        message: "Login successful.",
        redirectTo: "/admin",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Admin login error:", error);

    return Response.json(
      { success: false, message: "Unable to process login." },
      { status: 500 }
    );
  }
}
