import bcrypt from "bcryptjs";
import crypto from "crypto";

export const SESSION_COOKIE_NAME = "admin_session";
const DEFAULT_SESSION_DURATION_MS = 1000 * 60 * 60; // 1 hour

const sessionDurationEnv = Number(process.env.ADMIN_SESSION_DURATION_MS);
const SESSION_DURATION_MS = Number.isFinite(sessionDurationEnv) && sessionDurationEnv > 0
  ? sessionDurationEnv
  : DEFAULT_SESSION_DURATION_MS;

const signingSecret =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.ADMIN_PASSWORD ||
  process.env.ADMIN_PASSWORD_HASH ||
  "change-me";

async function compareWithHash(password, hash) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Failed to compare password hash", error);
    return false;
  }
}

function comparePlaintext(input, expected) {
  if (!input || !expected) return false;
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
}

export async function verifyAdminPassword(password) {
  const hashed = process.env.ADMIN_PASSWORD_HASH;
  const plain = process.env.ADMIN_PASSWORD;

  if (hashed) {
    return compareWithHash(password, hashed);
  }

  if (plain) {
    return comparePlaintext(password, plain);
  }

  throw new Error("Admin password is not configured. Set ADMIN_PASSWORD or ADMIN_PASSWORD_HASH.");
}

function signPayload(payload) {
  return crypto.createHmac("sha256", signingSecret).update(payload).digest("base64url");
}

export function createSessionToken() {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt }), "utf8").toString("base64url");
  const signature = signPayload(payload);

  return {
    token: `${payload}.${signature}`,
    expires: new Date(expiresAt),
  };
}

export function validateSessionToken(token) {
  if (!token) return false;
  const [payloadPart, signature] = token.split(".");
  if (!payloadPart || !signature) return false;

  const expectedSignature = signPayload(payloadPart);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const decoded = Buffer.from(payloadPart, "base64url").toString("utf8");
    const data = JSON.parse(decoded);
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch (error) {
    console.error("Failed to parse session token", error);
    return false;
  }
}

export function clearSessionCookie(response) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });
}
