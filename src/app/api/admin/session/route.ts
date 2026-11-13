
import { connection } from "next/server";
import { getAdminSessionFromToken } from "@/lib/adminAuth";

export async function GET(request: Request) {
  // Tell Next.js to execute this route at request time.
  // Keep this outside try/catch so Next.js can handle prerendering correctly.
  await connection();

  try {
    const cookieHeader = request.headers.get("cookie") || "";

    const token = cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("admin_session="))
      ?.slice("admin_session=".length);

    const session = await getAdminSessionFromToken(token);

    if (!session) {
      return Response.json(
        { authenticated: false },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    return Response.json(
      {
        authenticated: true,
        email: session.email,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("Session check error:", error);

    return Response.json(
      { authenticated: false },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
