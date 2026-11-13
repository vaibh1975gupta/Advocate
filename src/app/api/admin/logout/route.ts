
import { deleteAdminSession } from "@/lib/adminAuth";

export async function POST() {
  try {
    await deleteAdminSession();

    return Response.json(
      {
        success: true,
        message: "Logged out successfully.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Admin logout error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to log out.",
      },
      { status: 500 }
    );
  }
}
