
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 8; // 8 hours

function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters long.");
  }

  return new TextEncoder().encode(secret);
}

// Verify admin email and password

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const encodedHash = process.env.ADMIN_PASSWORD_HASH_B64;

  if (!adminEmail || !encodedHash) {
    throw new Error("Admin credentials are not configured.");
  }

  if (
    email.trim().toLowerCase() !==
    adminEmail.trim().toLowerCase()
  ) {
    return false;
  }

  const passwordHash = Buffer.from(
    encodedHash,
    "base64"
  ).toString("utf8");

  if (!/^\$2[aby]\$\d{2}\$/.test(passwordHash)) {
    throw new Error("Invalid bcrypt hash configuration.");
  }

  return bcrypt.compare(password, passwordHash);
}

// Create a secure admin session
export async function createAdminSession(email: string): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuer("advocate-website")
    .setAudience("admin-dashboard")
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSessionSecret());

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

// Read and verify the current admin session

export async function getAdminSessionFromToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      issuer: "advocate-website",
      audience: "admin-dashboard",
      algorithms: ["HS256"],
    });

    if (payload.role !== "admin" || !payload.sub) {
      return null;
    }

    return {
      email: payload.sub,
      role: "admin" as const,
    };
  } catch {
    return null;
  }
}

// Read session in server components where cookies() is available.
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return getAdminSessionFromToken(token);
}


// Destroy the admin session
export async function deleteAdminSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
